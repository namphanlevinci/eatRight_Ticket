import { BaseRouter } from './router';
import { ApolloProvider } from '@apollo/client';
import { setupGraphQlClient } from 'graphql/client';
import { Provider } from 'react-redux';
import store, { persistor } from 'store';
import { PersistGate } from 'redux-persist/integration/react';
import './reset.css';
import { CartProvider } from 'context/cartContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { App as AppProvider } from 'antd';
import { SocketProvider } from 'context/noticationContext';
import { ThemeProvider } from 'context/themeContext';
import { AlertProvider } from 'context/alertContext';
import './themes/style.css';

function App() {
    const client = setupGraphQlClient();
    return (
        <PersistGate loading={null} persistor={persistor}>
            <Provider store={store}>
                <AppProvider>
                    <ApolloProvider client={client}>
                        <Router>
                            <ThemeProvider>
                                <CartProvider>
                                    <SocketProvider>
                                        <AlertProvider>
                                            <BaseRouter />
                                        </AlertProvider>
                                    </SocketProvider>
                                </CartProvider>
                            </ThemeProvider>
                        </Router>
                    </ApolloProvider>
                </AppProvider>
            </Provider>
        </PersistGate>
    );
}

export default App;
