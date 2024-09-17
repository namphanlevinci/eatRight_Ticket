import { lazy } from 'react';

export const containers = {
    Home: lazy(() => import('containers/Home')),
    Table: lazy(() => import('containers/Table')),
    About: lazy(() => import('containers/About')),
    Login: lazy(() => import('containers/Login')),
    TableBill: lazy(() => import('containers/TableBill')),
    TableSplitBill: lazy(() => import('containers/TableBill-Checkout')),
    SettingsProfile: lazy(() => import('containers/Settings/profile')),
    Settings: lazy(() => import('containers/Settings/index')),
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
    NewCustomer: lazy(() => import('containers/Customer/AddNewCustomer')),
    ListCustomer: lazy(() => import('containers/Customer/ListCustomer')),
    CustomerDetail: lazy(() => import('containers/Customer/CustomerDetail')),
    RestaurentReservation: lazy(
        () => import('containers/RestaurentManagement/Reservation'),
    ),
    KitchenStationReservation: lazy(
        () => import('containers/RestaurentManagement/KitchenStation'),
    ),
    KitchenStationDetailReservation: lazy(
        () => import('containers/RestaurentManagement/KitchenStationDetail'),
    ),
};

export default containers;
