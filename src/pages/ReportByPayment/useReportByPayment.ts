import { useQuery } from '@apollo/client';
import { SorterResult } from 'antd/es/table/interface';
import {
    DATA_REPORTS_BY_PAYMENT,
    GET_REPORTS_BY_PAYMENT,
    MerchantSalesReportByPayment,
    VAR_REPORTS_BY_PAYMENT,
} from 'graphql/salesReport';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import removeTypename from 'utils/removeTypename';

const useReportByPayment = () => {
    const { method } = useParams();
    const navigate = useNavigate();
    const {
        state: { startDate, endDate },
    } = useLocation();

    const [data, setData] = useState<MerchantSalesReportByPayment[]>([]);
    const [sorter, setSorter] = useState<Record<string, string>>({
        field: 'gross_sales',
        direction: 'DESC',
    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const { data: reportResponse, loading } = useQuery<
        DATA_REPORTS_BY_PAYMENT,
        VAR_REPORTS_BY_PAYMENT
    >(GET_REPORTS_BY_PAYMENT, {
        variables: {
            date_from: startDate,
            date_to: endDate,
            method: method?.toUpperCase() as string,
            currentPage,
            pageSize,
            field: sorter?.field as string,
            direction: sorter?.direction as string,
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

    const handleBack = () => {
        navigate('/report', {
            state: {
                startDate,
                endDate,
            },
        });
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

    const handleChangeTable = (
        sorter:
            | SorterResult<MerchantSalesReportByPayment>
            | SorterResult<MerchantSalesReportByPayment>[],
    ) => {
        const { field, order } =
            sorter as SorterResult<MerchantSalesReportByPayment>;
        if (field && order) {
            const direction = order === 'ascend' ? 'ASC' : 'DESC';
            setSorter({ field: field as string, direction });
        }
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
        loading,
        reportResponse,
        methodName: getReportNameFormated(method as string),
        handleBack,
        handlePageChange,
        handlePerPageChange,
        handleChangeTable,
    };
};

export default useReportByPayment;
