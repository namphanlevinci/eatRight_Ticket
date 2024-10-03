import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import {
    DATA_REPORTS_BY_PAYMENT,
    GET_REPORTS_BY_PAYMENT,
    MerchantSalesReportByPayment,
    VAR_REPORTS_BY_PAYMENT,
} from 'graphql/salesReport';
import RangeValue from 'interfaces/RangeValue';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import removeTypename from 'utils/removeTypename';

const useReportByPayment = () => {
    const { method } = useParams();

    const [data, setData] = useState<MerchantSalesReportByPayment[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [rangDate, setRangeDate] = useState<RangeValue>([
        dayjs().subtract(30, 'day'),
        dayjs(),
    ]);

    const { data: reportResponse, loading } = useQuery<
        DATA_REPORTS_BY_PAYMENT,
        VAR_REPORTS_BY_PAYMENT
    >(GET_REPORTS_BY_PAYMENT, {
        variables: {
            date_from: `${dayjs(rangDate?.[0] || Date()).format('YYYY-MM-DD')}`,
            date_to: `${dayjs(rangDate?.[1] || Date()).format('YYYY-MM-DD')}`,
            method: method?.toUpperCase() as string,
            currentPage,
            pageSize,
        },
    });
    const getReportByPayment = (reportResponse: DATA_REPORTS_BY_PAYMENT) => {
        const reportResponseCleaned = removeTypename(reportResponse);
        const totalsItem =
            reportResponseCleaned.merchantSalesReportByPaymentMethods?.totals;
        const items =
            reportResponseCleaned.merchantSalesReportByPaymentMethods?.items ||
            [];
        const reportArr = [totalsItem, ...items];
        setData(reportArr);
    };

    useEffect(() => {
        if (reportResponse) {
            getReportByPayment(reportResponse);
        }
    }, [reportResponse]);

    const handlePerPageChange = (perPage: number) => {
        setPageSize(perPage);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleChangeDate = (value: any) => {
        setCurrentPage(1);
        setPageSize(10);
        setRangeDate(value);
    };

    const getReportNameFormated = (reportName: string) => {
        const keyItem = reportName as keyof typeof namesForted;
        const namesForted = {
            cash: 'Cash',
            credit_card: 'Credit Card',
        };
        return namesForted[keyItem];
    };

    return {
        data,
        rangDate,
        loading,
        reportResponse,
        methodName: getReportNameFormated(method as string),
        handleChangeDate,
        handlePageChange,
        handlePerPageChange,
    };
};

export default useReportByPayment;
