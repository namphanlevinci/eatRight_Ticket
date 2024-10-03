import { useLazyQuery, useMutation } from '@apollo/client';
import { message, TablePaginationConfig } from 'antd';
import {
    data_GetBatchInvoices,
    data_ReportByPaymentMethods,
    gql_GetBatchInvoices,
    gql_MerchantSettle,
    gql_ReportByPaymentMethods,
    var_getBatchInvoices,
} from 'graphql/batchSettlements/settle';
import { useEffect, useMemo, useState } from 'react';
import {
    EPaymentMethod,
    TFinalTotal,
    TInvoice,
    TPaymentMethods,
} from './Columns_v2';
import { useNavigate } from 'react-router';
import { BASE_ROUTER } from 'constants/router';

const useSette = () => {
    const navigate = useNavigate();
    const [finalTotal, setFinalTotal] = useState<TFinalTotal[]>();
    const [batchInvoices, setBatchInvoices] = useState<{
        data: TInvoice[];
        total: number;
        lastSettleDate: string;
    }>();
    const [reportPaymentMethods, setReportPaymentMethods] = useState<{
        data: TPaymentMethods[];
        total: number;
    }>();

    const [
        getReportByPaymentMethodsAPI,
        {
            data: dataReportByPaymentMethods,
            loading: loadingReportByPaymentMethods,
        },
    ] = useLazyQuery<data_ReportByPaymentMethods>(gql_ReportByPaymentMethods);

    const [
        getGetBatchInvoicesAPI,
        { data: dataGetBatchInvoices, loading: loadingGetBatchInvoices },
    ] = useLazyQuery<data_GetBatchInvoices, var_getBatchInvoices>(
        gql_GetBatchInvoices,
    );

    const [confirmSettlesAPI, { loading: loadingConfirm }] =
        useMutation(gql_MerchantSettle);

    const isDisabledConfirmSettle = useMemo(
        () =>
            !dataReportByPaymentMethods?.merchantReportByPaymentMethods
                .total_amount.value ||
            !dataGetBatchInvoices?.merchantGetBatchInvoices.total_count,
        [
            dataReportByPaymentMethods,
            dataGetBatchInvoices,
            batchInvoices,
            reportPaymentMethods,
        ],
    );

    const getReportPaymentMethods = async () => {
        try {
            const result = await getReportByPaymentMethodsAPI();
            console.log({ result })
            const data = result?.data?.merchantReportByPaymentMethods;
            if (!data) {
                return message.error('Something went wrong');
            }
            const total = data?.total_amount?.value;
            const objPaymentMethods = data?.items;
            const arrayPeymenMethods = Object.keys(objPaymentMethods)
                .map((key: string) => {
                    return {
                        payments: key,
                        amount: objPaymentMethods[key as EPaymentMethod].value,
                    };
                })
                ?.filter((value) => value.payments !== '__typename');

            setReportPaymentMethods({ data: arrayPeymenMethods, total });
        } catch (error) {
            message.error('Something went wrong');
        }
    };

    const getBatchInvoices = async (page = 1, pageSize = 10) => {
        try {
            const result = await getGetBatchInvoicesAPI({
                variables: {
                    currentPage: page,
                    pageSize,
                },
            });
            const data = result?.data?.merchantGetBatchInvoices;
            if (!data) {
                return message.error('Something went wrong');
            }
            const totalSales = data?.total_subtotal_amount?.value;
            const totalTip = data?.total_tip_amount?.value;
            const totalTax = data?.total_tax_amount?.value;
            const batchInvoices = data.items?.map((item) => {
                return {
                    invoice_number: item?.invoice_number,
                    subtotal: item?.total?.subtotal?.value,
                    total_tax: item?.total?.total_tax?.value,
                    tip_amount: item?.total?.tip_amount?.value,
                    grand_total: item?.total?.grand_total?.value,
                };
            });
            batchInvoices?.push();
            setFinalTotal([
                {
                    subtotal: totalSales,
                    totalTax,
                    totalTip,
                    totalSales: data?.total_amount?.value,
                },
            ]);

            setBatchInvoices({
                data: batchInvoices,
                total: data?.total_amount?.value,
                lastSettleDate: data?.last_settle_date,
            });
            return result;
        } catch (error) {
            message.error('Something went wrong');
        }
    };

    const confirmSettles = async () => {
        try {
            const response = await confirmSettlesAPI();
            if (response?.data?.posSettleMerchant) {
                message.success('Settlement completed successfully');
                navigate(BASE_ROUTER.BATCH_HISTORY);
            } else {
                message.error('Something went wrong');
            }
        } catch (error) {
            message.error('Something went wrong');
        }
    };

    const handleTableChange = (pagination: TablePaginationConfig) => {
        getBatchInvoices(pagination.current, pagination?.pageSize);
    };

    const getInit = async () => {
        try {
            await Promise.all([getReportPaymentMethods(), getBatchInvoices()]);
        } catch (error) {
            message.error('Something went wrong');
        }
    };

    useEffect(() => {
        getInit();
    }, []);

    return {
        isDisabledConfirmSettle,
        isLoading:
            loadingConfirm ||
            loadingGetBatchInvoices ||
            loadingReportByPaymentMethods,
        loadingGetBatchInvoices,
        loadingReportByPaymentMethods,
        batchInvoices,
        reportPaymentMethods,
        finalTotal,
        handleTableChange,
        confirmSettles,
    };
};

export default useSette;
