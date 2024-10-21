import { createSlice } from '@reduxjs/toolkit';
import { EStatusTable } from 'graphql/table/table';

export interface globalStateType {
    searchText: {
        order: string;
        table: string;
    };
    filterOrder: {
        is_dine_in: boolean;
        is_eat_out: boolean;
    };
    filterTable: EStatusTable;
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
    filterTable: EStatusTable.ALL,
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        updateSearch: (state, action) => {
            state.searchText = action.payload.searchText;
        },
        updateFilterOrder: (state, action) => {
            state.filterOrder = action.payload.filterOrder;
        },
        updateFilterTable: (state, action) => {
            state.filterTable = action.payload.filterTable;
        },
    },
});

export const { updateSearch, updateFilterOrder, updateFilterTable } =
    globalSlice.actions;

export default globalSlice.reducer;
