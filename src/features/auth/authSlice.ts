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
}

const initialState: authStateType = {
    isLogged: false,
    firstname: '',
    lastname: '',
    restaurant_name: '',
    restaurant_address: '',
    restaurant_id: '',
    floor: [],
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateStatusLogin: (state) => {
            state.isLogged = true;
        },
        updateCustomerInfo: (state, action) => {
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.restaurant_name = action.payload.restaurant_name;
            state.restaurant_address = action.payload.restaurant_address;
            state.restaurant_id = action.payload.restaurant_id;
        },
        updateFloor: (state, action) => {
            state.floor = action.payload;
        },
        updateStatusLogout: (state) => {
            state.isLogged = false;
            state = initialState;
            localStorage.removeItem('token');
            localStorage.removeItem('position');
            localStorage.removeItem('tableData');
            sessionStorage.removeItem('isTokenValidated');
        },
    },
});

export const {
    updateStatusLogin,
    updateStatusLogout,
    updateCustomerInfo,
    updateFloor,
} = authSlice.actions;

export default authSlice.reducer;
