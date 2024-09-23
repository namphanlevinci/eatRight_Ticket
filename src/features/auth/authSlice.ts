import { createSlice } from '@reduxjs/toolkit';

export interface authStateType {
    isLogged: boolean;
    firstname: string;
    lastname: string;
    restaurant_name: string;
    restaurant_address: string;
    restaurant_id: string;
    floor: {
        id: string;
        name: string;
        status: string;
    }[];
    isMerchant: boolean;
    is_dine_in: boolean;
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
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateStatusLogin: (state) => {
            state.isLogged = true;
        },
        updateStatusLoginForMerchant: (state) => {
            state.isLogged = true;
            state.isMerchant = true;
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
            state = initialState;
            localStorage.removeItem('token');
            localStorage.removeItem('position');
            localStorage.removeItem('tableData');
            sessionStorage.removeItem('isTokenValidated');
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
    },
});

export const {
    updateStatusLogin,
    updateStatusLogout,
    updateCustomerInfo,
    updateFloor,
    updateStatusLoginForMerchant,
    clearStoreData,
} = authSlice.actions;

export default authSlice.reducer;
