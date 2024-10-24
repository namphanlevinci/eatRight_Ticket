import { lazy } from 'react';

export const containers = {
    Home: lazy(() => import('containers/Home')),
    Table: lazy(() => import('containers/Table')),
    About: lazy(() => import('containers/About')),
    Login: lazy(() => import('containers/Login')),
    TableBill: lazy(() => import('containers/TableBill')),
    TableSplitBill: lazy(() => import('containers/TableBill-Checkout')),
    SettingsProfile: lazy(() => import('containers/Settings/profile')),
    Settings: lazy(() => import('containers/Settings')),
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
    Merchant: {
        OrderList: lazy(() => import('containers/Merchant_v2/OrderList')),
        TableView: lazy(() => import('containers/Merchant_v2/TableView')),
        BatchHistory: lazy(
            () =>
                import('containers/Merchant_v2/BatchSettlements/BatchHistory'),
        ),
        Settle: lazy(
            () => import('containers/Merchant_v2/BatchSettlements/Settle'),
        ),
        Transactions: lazy(
            () =>
                import('containers/Merchant_v2/BatchSettlements/Transactions'),
        ),
    },
    Report: lazy(() => import('containers/Merchant_v2/Report')),
    ReportByPayment: lazy(() => import('containers/Merchant_v2/ReportByPayment')),
    MenuPage: lazy(() => import('containers/Merchant_v2/MenuManager/Menu')),
    Menu_Detail_Page: lazy(() => import('containers/Merchant_v2/MenuManager/MenuNew')),
    CategoryPage: lazy(() => import('containers/Merchant_v2/MenuManager/Category')),
    CategoryPage_DETAIL: lazy(() => import('containers/Merchant_v2/MenuManager/CategoryNew')),
    ItemPage_DETAIL: lazy(() => import('containers/Merchant_v2/MenuManager/ItemNew')),
    ItemPage: lazy(() => import('containers/Merchant_v2/MenuManager/Item')),
    RestaurentReservation: lazy(
        () => import('containers/RestaurentManagement/Reservation'),
    ),
    KitchenStationReservation: lazy(
        () => import('containers/RestaurentManagement/KitchenStation'),
    ),
    KitchenStationDetailReservation: lazy(
        () => import('containers/RestaurentManagement/KitchenStationDetail'),
    ),
    Terminal: lazy(
        () => import('containers/RestaurentManagement/TerminalSetting'),
    ),
    TerminalDetail: lazy(
        () => import('containers/RestaurentManagement/TerminalDetailSetting'),
    ),
    RestaurentOrdering: lazy(
        () => import('containers/RestaurentManagement/Ordering'),
    ),
    ReceiptsContainer: lazy(() => import('containers/Receipts')),
};

export default containers;
