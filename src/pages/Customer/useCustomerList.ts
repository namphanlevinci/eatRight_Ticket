import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_CUSTOMER_LIST } from 'graphql/customer';
import { checkStringType } from 'utils/validate';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export const useCustomerList = () => {
    const [getCustomerList, { data, loading }] = useLazyQuery(
        GET_CUSTOMER_LIST,
        {
            fetchPolicy: 'cache-and-network',
        },
    );
    const [pageSize, setPageSize] = useState(5);
    const [current_page, setCurrentPage] = useState(1);
    const [customerList, setCustomerList] = useState([]);

    const [search, setSearch] = useState<any>(null);
    const { isMerchant } = useSelector((state: RootState) => state.auth);

    const handleGetCustomerList = async () => {
        let name = '';
        let phone_number = '';
        if (search) {
            if (checkStringType(search) === 'name') {
                name = search;
            } else {
                phone_number = search;
            }
        }
        getCustomerList({
            variables: {
                pageSize: pageSize,
                currentPage: current_page,
                phone_number: phone_number,
                name: name,
            },
        }).then((res) => {
            setCustomerList(res.data?.merchantGetCustomers?.items ?? []);
        });
    };

    useEffect(() => {
        if (isMerchant) {
            handleGetCustomerList();
        }
    }, [pageSize, current_page]);
    useEffect(() => {
        if (search) {
            handleGetCustomerList();
        }
    }, [search]);
    return {
        listOrders: customerList,
        total_count: data?.merchantGetCustomers?.total_count,
        setPageSize,
        pageSize,
        setCurrentPage,
        current_page,
        loading,
        setSearch,
        search,
        handleGetCustomerList,
    };
};
