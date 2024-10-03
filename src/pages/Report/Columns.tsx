import type { ColumnsType } from 'antd/es/table';
import { formatMoney } from 'utils/format';
import { ISalesReport, PaymentName } from "interfaces/IReport";

export const getNamePaymentFormated = (paymentName: PaymentName): string => {
    const paymentsNameFormated: Record<PaymentName, string> = {
        total: 'Total',
        cash: 'Cash',
        credit_card: 'Credit Card',
        others: 'Others'
    };
    return paymentsNameFormated[paymentName];
};

const Columns = () => {
    const columns: ColumnsType<ISalesReport> = [
        {
            title: 'Payment',
            dataIndex: 'payment',
            render: (value) => (
                <span className="font-medium">
                    {getNamePaymentFormated(value)}
                </span>
            ),
        },
        {
            title: 'Gross Sales',
            dataIndex: 'gross_sales',
            sorter: false,
            render: (value) => formatMoney(value),
        },
        {
            title: 'Discount',
            dataIndex: 'discounts',
            sorter: false,
            render: (value) => formatMoney(value),
        },
        {
            title: 'Refunds',
            dataIndex: 'refunds',
            sorter: false,
            render: (value) => formatMoney(value),
        },
        {
            title: 'Net Sales',
            dataIndex: 'net_sales',
            sorter: false,
            render: (value) => formatMoney(value),
        },
    ];
    return columns;
};

export default Columns;
