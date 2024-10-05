import { useLazyQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { message, TablePaginationConfig } from 'antd';
import {
    gql_BatchHistory,
    data_BatchHistory,
    var_BatchHistory,
} from 'graphql/batchSettlements/batchHistory';
import dayjs from 'dayjs';

const useBatchHistory = () => {
    const [searchText, setSearchText] = useState('');
    const [searchDate, setSearchDate] = useState<string[] | null>(null);

    const [getBatchHistoryAPI, { data, loading }] = useLazyQuery<
        data_BatchHistory,
        var_BatchHistory
    >(gql_BatchHistory, {
        variables: {
            currentPage: 1,
            pageSize: 10,
        },
    });

    const getBatchSettles = async ({
        currentPage = 1,
        pageSize = 10,
        search,
        createdAtFrom,
        createdAtTo,
    }: var_BatchHistory) => {
        try {
            const variables: var_BatchHistory = {
                currentPage,
                pageSize,
                search,
            };
            if (searchText) {
                variables.search = searchText;
            }
            if (createdAtFrom && createdAtTo) {
                variables.createdAtFrom = createdAtFrom;
                variables.createdAtTo = createdAtTo;
            }
            getBatchHistoryAPI({
                variables,
                fetchPolicy: 'no-cache',
            });
        } catch (error) {
            message.error('Something went wrong');
        }
    };

    const handleTableChange = (pagination: TablePaginationConfig) => {
        getBatchSettles({
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
        });
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
        const variables: var_BatchHistory = {};
        const createdAtFrom = dayjs(searchDate?.[0]).format('YYYY-MM-DD');
        const createdAtTo = dayjs(searchDate?.[1]).format('YYYY-MM-DD');

        if (searchDate && searchDate?.length >= 2) {
            variables.createdAtFrom = createdAtFrom;
            variables.createdAtTo = createdAtTo;
        }
        if (searchText) {
            variables.search = searchText;
        }

        getBatchHistoryAPI({
            variables,
        });
    }, [searchText, searchDate, getBatchHistoryAPI]);

    useEffect(() => {
        getBatchSettles({ pageSize: 10, currentPage: 1 });
    }, []);

    return {
        data,
        loading,
        searchText,
        handleDateChange,
        handleTextChange,
        handleSearch,
        handleTableChange,
    };
};

export default useBatchHistory;
