import { createSlice } from '@reduxjs/toolkit';
import { TTable } from 'graphql/table/table';

export interface authStateType {
    isLogged: boolean;
    firstname: string;
    lastname: string;
    restaurant_name: string;
    restaurant_address: string;
    restaurant_id: string;
    floor: {
        id: number;
        name: string;
        status: number;
    }[];
    isMerchant: boolean;
    is_dine_in: boolean;
    isTableView: boolean;
    isOpenPrice: boolean;
    isDefaultTableView: boolean;
    isTerminalPrinter: boolean;
    isAutoConfirmItem: boolean;
    counterTable?: TTable;
    isAutoCloseOrder?: boolean;
    isPrintKitchenCopy?: boolean;
    primary_terminal_setting: string | number;
}

const initialState: authStateType = {
    isLogged: false,
    firstname: '',
    lastname: '',
    restaurant_name: '',
    restaurant_address: '',
    restaurant_id: '',
    floor: [],
    isMerchant: false,
    is_dine_in: false,
    isTableView: true,
    isOpenPrice: false,
    isDefaultTableView: false,
    isTerminalPrinter: false,
    isAutoConfirmItem: false,
    counterTable: undefined,
    isAutoCloseOrder: false,
    isPrintKitchenCopy: false,
    primary_terminal_setting: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateStatusLogin: (state) => {
            state.isLogged = true;
        },
        updateStatusLoginForMerchant: (state, action) => {
            state.isLogged = true;
            state.isMerchant = true;
            state.isTableView = action?.payload?.isTableView || false;
        },
        updateCustomerInfo: (state, action) => {
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.restaurant_name = action.payload.restaurant_name;
            state.restaurant_address = action.payload.restaurant_address;
            state.restaurant_id = action.payload.restaurant_id;
            state.is_dine_in = action.payload.is_dine_in;
        },
        updateFloor: (state, action) => {
            state.floor = action.payload;
        },
        updateStatusLogout: (state) => {
            state.isLogged = false;
            state.isMerchant = false;
            state.isTableView = true;
            state = initialState;
            localStorage.removeItem('token');
            localStorage.removeItem('position');
            localStorage.removeItem('tableData');
            sessionStorage.removeItem('isTokenValidated');
            localStorage.removeItem('store_view_code');
        },
        clearStoreData: (state) => {
            state.firstname = '';
            state.lastname = '';
            state.restaurant_name = '';
            state.restaurant_address = '';
            state.restaurant_id = '';
            state.floor = [];
            state.isMerchant = false;
        },
        changeModeTableView: (state) => {
            state.isTableView = !state.isTableView;
        },
        updateIsTerminalPrinter: (state, action) => {
            state.isTerminalPrinter = action.payload;
        },
        updateIsDefaultTableView: (state, action) => {
            state.isDefaultTableView = action.payload;
        },
        updateIsOpenPrice: (state, action) => {
            state.isOpenPrice = action.payload;
        },
        updateAutoConfirmItem: (state, action) => {
            state.isAutoConfirmItem = action.payload;
        },
        updateAutoCloseOrder: (state, action) => {
            state.isAutoCloseOrder = action.payload;
        },
        updatePrintKitchenCopy: (state, action) => {
            state.isPrintKitchenCopy = action.payload;
        },
        updateRestaurantConfig: (state, action) => {
            if (action.payload) {
                state = {
                    ...state,
                    ...action.payload,
                };
            }
        },
        updateTerminalPrimarySetting: (state, action) => {
            state.primary_terminal_setting = action.payload;
        },
        updateCounterTable: (state, action) => {
            state.counterTable = action.payload.counterTable;
        },
    },
});

export const {
    updateStatusLogin,
    updateStatusLogout,
    updateCustomerInfo,
    updateCounterTable,
    updateFloor,
    updateStatusLoginForMerchant,
    clearStoreData,
    changeModeTableView,
    updateIsTerminalPrinter,
    updateIsDefaultTableView,
    updateIsOpenPrice,
    updateAutoConfirmItem,
    updateRestaurantConfig,
    updateAutoCloseOrder,
    updatePrintKitchenCopy,
    updateTerminalPrimarySetting,
} = authSlice.actions;

export default authSlice.reducer;
