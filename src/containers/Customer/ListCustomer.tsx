import { DarkLayout } from 'layouts/DarkLayout';
import CustomerList from 'pages/Customer/CustomerList';
import React from 'react';

export default function ListCustomerContainer() {
    return (
        <DarkLayout>
            <CustomerList />
        </DarkLayout>
    );
}
