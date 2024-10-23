const url = process.env.REACT_APP_PRINT_URL;

export const Customer_CopyForm = (invoice: string) => {
    return `${url}/media/printer/invoice/invoice-customer-${invoice}.png`;
};
