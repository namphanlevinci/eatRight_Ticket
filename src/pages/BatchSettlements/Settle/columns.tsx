import { formatNumberWithCommas } from "utils/format";

export const ColumnsBatchInvoices = [
  {
    title: "Name",
    dataIndex: "invoice_number",
    width: 150,
    align: "center",
  },
  {
    title: "Sales",
    dataIndex: "subtotal",
    align: "center",
    render: (value, record) => {
      return (
        <div style={{ fontWeight: record?.invoice_number ? 400 : 700 }}>
          {formatCurrency(value)}
        </div>
      );
    },
  },
  {
    title: "Tax",
    dataIndex: "total_tax",
    align: "center",
    render: (value, record) => {
      return (
        <div style={{ fontWeight: record?.invoice_number ? 400 : 700 }}>
          {formatCurrency(value)}
        </div>
      );
    },
  },
  {
    title: "Tip",
    dataIndex: "tip_amount",
    align: "center",
    width: 125,
    render: (value, record) => {
      return (
        <div style={{ fontWeight: record?.invoice_number ? 400 : 700 }}>
          {formatCurrency(value)}
        </div>
      );
    },
  },
  {
    title: "Total Sales",
    dataIndex: "grand_total",
    align: "center",
    render: (value) => {
      if (!value) return "";
      return <span>{formatCurrency(formatNumberWithCommas(value))}</span>;
    },
  },
];

export const ColumnsTotal = [
  {
    title: "",
    dataIndex: "invoice_number",
    width: 150,
    fixed: "left",
    render: () => <div style={{
      fontWeight: 700,
      fontSize: 16,
      minWidth: 126
    }}>Total</div>
  },
  {
    title: "",
    dataIndex: "subtotal",
    align: "center",
    render: (value, record) => {
      return (
        <div style={{ fontWeight: record?.invoice_number ? 400 : 700 }}>
          {formatCurrency(formatNumberWithCommas(value))}
        </div>
      );
    },
  },
  {
    title: "",
    dataIndex: "totalTax",
    align: "center",
    render: (value, record) => {
      return (
        <div style={{ fontWeight: record?.invoice_number ? 400 : 700 }}>
          {formatCurrency(formatNumberWithCommas(value))}
        </div>
      );
    },
  },
  {
    title: "",
    dataIndex: "totalTip",
    align: "center",
    width: 125,
    render: (value, record) => {
      return (
        <div style={{ fontWeight: record?.invoice_number ? 400 : 700 }}>
          {formatCurrency(formatNumberWithCommas(value))}
        </div>
      );
    },
  },
  {
    title: "",
    dataIndex: "totalSales",
    align: "center",
    render: (value) => {
      if (!value) return "";
      return <span style={{
        fontWeight: 700,
        color: "#389e0d",
        fontSize: 16,
      }}>{formatCurrency(formatNumberWithCommas(value))}</span>;
    },
  },
];

export const ColumnsPaymentMethods = [
  {
    title: "Payments",
    dataIndex: "payments",
    align: "center",
    width: 300,
    render: (value) => (
      <span style={{ fontWeight: 500 }}>{renderTitlePayment(value)}</span>
    ),
  },
  {
    title: "Amount",
    dataIndex: "value",
    render: (value) => (
      <span style={{ fontWeight: 500 }}>{formatCurrency(formatNumberWithCommas(value))}</span>
    ),
  },
];

export const paymentClassNames = {
  credit_card: "row-Credit-Card",
  cash: "row-Cash",
  discount: "row-Discount",
};

export const renderTitlePayment = (value) => {
  const titles = {
    credit_card: "Credit Card",
    cash: "Cash",
    discount: "Discount",
  };
  return titles[value];
};

export const formatCurrency = (value) => {
  if (!value) return "";
  return `$${value}`;
};
