import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { message, TablePaginationConfig } from 'antd';
import dayjs from 'dayjs';
import {
    gql_ReceiptHistory,
    data_ReceiptHistory,
    var_ReceiptHistory,
    ReceiptItem,
    gqlGetReceiptDetail,
    data_MerchantGetReceiptResponse,
    var_ReceiptDetail,
} from 'graphql/receipts';
import { getCurrentMonthDates } from 'utils/date';

const useReceipts = () => {
    const [searchText, setSearchText] = useState('');
    const [searchDate, setSearchDate] = useState<string[] | null>(null);
    const [selectData, setSelectData] = useState<ReceiptItem | undefined>(
        undefined,
    );
    const [pageConfig, setPageConfig] = useState<TablePaginationConfig>();
    const [getReceiptDetail, { data: receiptDetail, loading: loadingReceipt }] =
        useLazyQuery<data_MerchantGetReceiptResponse, var_ReceiptDetail>(
            gqlGetReceiptDetail,
            {
                fetchPolicy: 'no-cache',
            },
        );
    const [getBatchHistoryAPI, { data, loading }] = useLazyQuery<
        data_ReceiptHistory,
        var_ReceiptHistory
    >(gql_ReceiptHistory, {
        variables: {
            currentPage: 1,
            pageSize: 10,
            dateFrom: '',
            dateTo: '',
        },
        fetchPolicy: 'no-cache',
    });

    const getBatchSettles = async ({
        currentPage = 1,
        pageSize = 10,
        search,
        dateFrom,
        dateTo,
    }: var_ReceiptHistory) => {
        try {
            const variables: var_ReceiptHistory = {
                currentPage,
                pageSize,
                search,
                dateFrom,
                dateTo,
            };
            if (searchText) {
                variables.search = searchText;
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
        handleSearch({ pagination });
        setPageConfig(pagination);
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
            handleSearch({ endDate, startDate });
        }
    };

    const handleSearch = ({
        pagination,
        startDate,
        endDate,
    }: {
        pagination?: TablePaginationConfig;
        startDate?: string | null | undefined;
        endDate?: string | null | undefined;
    }) => {
        const variables: var_ReceiptHistory = {
            dateFrom: startDate
                ? dayjs(startDate).format('YYYY-MM-DD')
                : dayjs(searchDate?.[0]).format('YYYY-MM-DD'),
            dateTo: endDate
                ? dayjs(endDate).format('YYYY-MM-DD')
                : dayjs(searchDate?.[1]).format('YYYY-MM-DD'),
            currentPage: pageConfig?.current || 1,
            pageSize: pageConfig?.pageSize || 10,
        };

        if (searchText) {
            variables.search = searchText;
        }
        if (pagination) {
            variables.currentPage = pagination.current;
            variables.pageSize = pagination.pageSize;
        }
        getBatchHistoryAPI({
            variables,
            fetchPolicy: 'no-cache',
        });
    };

    useEffect(() => {
        const dates = getCurrentMonthDates();
        setSearchDate([
            dayjs(dates.firstDay).format('YYYY-MM-DD'),
            dayjs(dates.lastDay).format('YYYY-MM-DD'),
        ]);
        getBatchSettles({
            pageSize: 10,
            currentPage: 1,
            dateFrom: dayjs(dates.firstDay).format('YYYY-MM-DD'),
            dateTo: dayjs(dates.lastDay).format('YYYY-MM-DD'),
        });
    }, []);
    useEffect(() => {
        if (selectData) {
            getReceiptDetail({
                variables: {
                    invoice_number: selectData.invoice_number,
                },
            });
        }
    }, [selectData]);
    return {
        data,
        loading,
        searchText,
        handleDateChange,
        handleTextChange,
        handleSearch,
        handleTableChange,
        setSelectData,
        selectData,
        receiptDetail,
        loadingReceipt,
        getReceiptDetail,
    };
};

export default useReceipts;
