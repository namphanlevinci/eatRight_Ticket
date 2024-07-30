import { lazy } from 'react';

export const containers = {
    Home: lazy(() => import('containers/Home')),
    Table: lazy(() => import('containers/Table')),
    About: lazy(() => import('containers/About')),
    Login: lazy(() => import('containers/Login')),
    TableBill: lazy(() => import('containers/TableBill')),
    TableSplitBill: lazy(() => import('containers/TableBill-Checkout')),
    Settings: lazy(() => import('containers/Settings/profile')),
    BillList: lazy(() => import('containers/BillList')),
    BillDetail: lazy(() => import('containers/BillDetail')),
    RequestAccount: lazy(() => import('containers/RequestAccount')),
    SettingsPassword: lazy(() => import('containers/Settings/password')),
    ForgotPassword: lazy(() => import('containers/ForgotPassword')),
    PrinterSetup: lazy(() => import('containers/Settings/printer')),
    TableOrder: lazy(() => import('containers/TableOrder')),
    RestaurentGeneral: lazy(
        () => import('containers/RestaurentManagement/General'),
    ),
    RestaurentTip: lazy(() => import('containers/RestaurentManagement/Tip')),
};

export default containers;
