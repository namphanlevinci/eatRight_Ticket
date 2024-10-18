import { createSlice } from '@reduxjs/toolkit';

export interface globalStateType {
    searchTextOrder: string;
    filterOrder: {
        is_dine_in: boolean;
        is_eat_out: boolean;
    };
}

const initialState: globalStateType = {
    searchTextOrder: '',
    filterOrder: {
        is_dine_in: true,
        is_eat_out: true,
    },
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        updateSearchOrder: (state, action) => {
            state.searchTextOrder = action.payload.searchTextOrder;
        },
        updateFilterOrder: (state, action) => {
            state.filterOrder = action.payload.filterOrder;
        },
    },
});

export const { updateSearchOrder, updateFilterOrder } = globalSlice.actions;

export default globalSlice.reducer;
