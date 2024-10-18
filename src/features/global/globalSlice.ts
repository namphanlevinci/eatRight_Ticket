import { createSlice } from '@reduxjs/toolkit';

export interface globalStateType {
    searchText: {
        order: string;
        table: string;
    };
    filterOrder: {
        is_dine_in: boolean;
        is_eat_out: boolean;
    };
}

const initialState: globalStateType = {
    searchText: {
        order: '',
        table: '',
    },
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
            state.searchText = action.payload.searchText;
        },
        updateFilterOrder: (state, action) => {
            state.filterOrder = action.payload.filterOrder;
        },
    },
});

export const { updateSearchOrder, updateFilterOrder } = globalSlice.actions;

export default globalSlice.reducer;
