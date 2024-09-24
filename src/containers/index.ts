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
    MerchantPage: lazy(() => import('pages/Merchant/index')),
    MenuPage: lazy(() => import('pages/MenuManager/Menu/index')),
    Menu_Detail_Page: lazy(() => import('pages/MenuManager/MenuNew/index')),
    CategoryPage: lazy(() => import('pages/MenuManager/Category/index')),
    CategoryPage_DETAIL: lazy(
        () => import('pages/MenuManager/CategoryNew/index'),
    ),
    ItemPage_DETAIL: lazy(() => import('pages/MenuManager/ItemNew/index')),
    ItemPage: lazy(() => import('pages/MenuManager/Item/index')),
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
};

export default containers;
