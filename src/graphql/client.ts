import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
} from '@apollo/client/core';

import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import mitt from 'mitt';

const emitter = mitt();
const httpLink = new HttpLink({
    uri: `${process.env.REACT_APP_URL}/graphql`,
});
const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    const view_code = localStorage.getItem('store_view_code');
    // return the headers to the context so httpLink can read them
    let newHeaders = headers;
    if (view_code) {
        newHeaders = {
            ...headers,
            Store: view_code,
        };
    }

    if (_.operationName === 'getCart') {
        // Thay 'YourOperationName' bằng tên operation của bạn
        return {
            headers: {
                ...newHeaders,
                'Content-Type': 'application/json',
            },
        };
    }
    return {
        headers: {
            ...newHeaders,
            authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
        },
    };
});

const apolloCache = new InMemoryCache();

// Persistor graphql cache
const errorLink = onError((error) => {
    // Xử lý lỗi từ GraphQL
    // ...
    error.graphQLErrors?.map((e) => {
        if (e.message.includes("The current Merchant isn't authorized")) {
            emitter.emit('logout');
            return;
        }
        if (
            e.message.includes('Store not existed' || 'This store is not exist')
        ) {
            emitter.emit('Store_not_existed');
            return;
        }
        if (
            e.message.includes('got invalid value (empty string); Int cannot')
        ) {
            return;
        }
        emitter.emit('error', e.message);
    });
    if (error.networkError) {
        emitter.emit('error', error.networkError.message);
    }
});
const link = ApolloLink.from([errorLink, httpLink]);
// Graphql Client
const setupGraphQlClient = (): ApolloClient<any> =>
    new ApolloClient({
        link: authLink.concat(link),
        cache: apolloCache,
        queryDeduplication: false,
    });
export { emitter, setupGraphQlClient };
