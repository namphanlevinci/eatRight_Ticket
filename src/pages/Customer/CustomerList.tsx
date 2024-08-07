import { BASE_ROUTER } from 'constants/router';
import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomerList() {
    return (
        <div>
            CustomerList
            <div />
            <Link to={BASE_ROUTER.CUSTOMER_NEW}>Go Add New Customer</Link>
            <div />
            <Link to={BASE_ROUTER.CUSTOMER_Detail}>Go Customer Detail</Link>
        </div>
    );
}
