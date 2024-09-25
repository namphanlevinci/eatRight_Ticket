import { useLazyQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { message, TablePaginationConfig } from 'antd';
import {
    gql_Transactions,
    data_Transactions,
    var_Transactions,
} from 'graphql/batchSettlements/transactions';
import dayjs from 'dayjs';

const useTransaction = () => {
    const [searchText, setSearchText] = useState('');
    const [status, setStatus] = useState('');
    const [searchDate, setSearchDate] = useState<string[] | null>(null);

    const [getTransactionsAPI, { data, loading }] = useLazyQuery<
        data_Transactions,
        var_Transactions
    >(gql_Transactions, {
        variables: {
            currentPage: 1,
            pageSize: 10,
        },
    });

    const getTransactions = async ({
        currentPage = 1,
        pageSize = 10,
        search,
        endDate,
        startDate,
        status,
    }: var_Transactions) => {
        try {
            const variables: var_Transactions = {
                currentPage,
                pageSize,
                search,
                endDate,
                startDate,
                status,
            };
            await getTransactionsAPI({
                variables,
            });
        } catch (error) {
            message.error('Something went wrong');
        }
    };

    const handleTableChange = (pagination: TablePaginationConfig) => {
        getTransactions({
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
        });
    };

    const handleChangeSelect = (value: string) => {
        setStatus(value);
    };

    const handleTextChange = (value: string) => {
        setSearchText(value);
    };

    const handleDateChange = (
        startDate: string | null | undefined,
        endDate: string | null | undefined,
    ) => {
        if (startDate && endDate) {
            const dates = [startDate, endDate];
            setSearchDate(dates);
        }
    };

    const handleSearch = useCallback(() => {
        const startDate = searchDate
            ? dayjs(searchDate?.[0]).format('YYYY-MM-DD')
            : '';
        const endDate = searchDate
            ? dayjs(searchDate?.[1]).format('YYYY-MM-DD')
            : '';
        getTransactions({
            currentPage:
                data?.merchantGetTransactions.page_info.current_page || 1,
            pageSize: data?.merchantGetTransactions.page_info.page_size || 10,
            search: searchText,
            startDate,
            endDate,
            status,
        });
    }, [status, searchText, searchDate, getTransactionsAPI]);

    useEffect(() => {
        getTransactions({ pageSize: 10, currentPage: 1 });
    }, []);

    return {
        data,
        loading,
        searchText,
        status,
        handleDateChange,
        handleTextChange,
        handleChangeSelect,
        handleSearch,
        handleTableChange,
    };
};

export default useTransaction;

export const STATUS_TRANSACTIONS = [
    { value: 'UNPAID', label: 'UNPAID' },
    { value: 'PAID', label: 'PAID' },
    { value: 'REFUNDED', label: 'REFUNDED' },
    { value: 'CANCELED', label: 'CANCELED' },
];
