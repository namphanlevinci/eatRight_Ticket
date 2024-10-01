export type PaymentName = 'total' | 'cash' | 'credit_card';

interface IReport {
    discounts: number;
    refunds: number;
    net_sales: number;
    gross_sales: number;
}

export interface ISalesReport extends IReport {
    payment: PaymentName;
}

export interface IReportByPayment extends IReport {
    invoice_number: string;
}
