import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ISalesReport } from 'interfaces/IReport';
import RangeValue from 'interfaces/RangeValue';
import removeTypename from 'utils/removeTypename';
import dayjs from 'dayjs';
import {
    DATA_SALES_REPORT,
    GET_SALES_REPORTS,
    VAR_SALES_REPORTS,
} from 'graphql/salesReport';
import { useLocation } from 'react-router';

const useReport = () => {
    const location = useLocation();

    const [data, setData] = useState<ISalesReport[]>([]);
    const [rangDate, setRangeDate] = useState<RangeValue>([
        location.state?.startDate
            ? dayjs(location.state?.startDate)
            : dayjs().subtract(0, 'day'),
        location.state?.endDate ? dayjs(location.state?.endDate) : dayjs(),
    ]);

    const { data: reportResponse, loading } = useQuery<
        DATA_SALES_REPORT,
        VAR_SALES_REPORTS
    >(GET_SALES_REPORTS, {
        variables: {
            date_from: `${dayjs(rangDate?.[0] || Date()).format('YYYY-MM-DD')}`,
            date_to: `${dayjs(rangDate?.[1] || Date()).format('YYYY-MM-DD')}`,
        },
    });

    const getSalesReport = (reportResponse: DATA_SALES_REPORT) => {
        const reportResponseCleaned = removeTypename(reportResponse);
        const reportArr: ISalesReport[] = [];
        Object.keys(reportResponseCleaned.merchantSalesReport).map((key) => {
            const keyItem =
                key as keyof typeof reportResponseCleaned.merchantSalesReport;
            const reportItem: ISalesReport = {
                payment: keyItem,
                discounts:
                    reportResponseCleaned.merchantSalesReport[keyItem].discounts
                        .value,
                gross_sales:
                    reportResponseCleaned.merchantSalesReport[keyItem]
                        .gross_sales.value,
                net_sales:
                    reportResponseCleaned.merchantSalesReport[keyItem].net_sales
                        .value,
                refunds:
                    reportResponseCleaned.merchantSalesReport[keyItem].refunds
                        .value,
            };
            reportArr.push(reportItem);
        });

        setData(reportArr);
    };

    const handleChangeDate = (value: any) => {
        setRangeDate(value);
    };

    useEffect(() => {
        if (reportResponse) {
            getSalesReport(reportResponse);
        }
    }, [reportResponse]);

    return {
        data,
        rangDate,
        loading,
        handleChangeDate,
    };
};

export default useReport;
