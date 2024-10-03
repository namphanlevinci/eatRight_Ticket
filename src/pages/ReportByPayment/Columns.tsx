import type { ColumnsType } from 'antd/es/table';
import { MerchantSalesReportByPayment } from 'graphql/salesReport';
import { formatMoney } from 'utils/format';

const Columns = () => {
    const columns: ColumnsType<MerchantSalesReportByPayment> = [
        {
            title: 'Bill',
            dataIndex: 'invoice_number',
            render: (value) => value || 'Total',
        },
        {
            title: 'Gross Sales',
            dataIndex: 'gross_sales',
            sorter: false,
            render: (valueObj) =>
                valueObj.value ? formatMoney(valueObj.value) : `$0.00`,
        },
        {
            title: 'Discount',
            dataIndex: 'discounts',
            sorter: false,
            render: (valueObj) =>
                valueObj.value ? formatMoney(valueObj.value) : `$0.00`,
        },
        {
            title: 'Refunds',
            dataIndex: 'refunds',
            sorter: false,
            render: (valueObj) =>
                valueObj.value ? formatMoney(valueObj.value) : `$0.00`,
        },
        {
            title: 'Net Sales',
            dataIndex: 'net_sales',
            sorter: false,
            render: (valueObj) =>
                valueObj.value ? formatMoney(valueObj.value) : `$0.00`,
        },
    ];
    return columns;
};

export default Columns;
