import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getSalesContent = createAsyncThunk('/Users/content', async () => {
	const response = await axios.get('/api/users?page=1', {})
	return response.data;
})

export const SalesSlice = createSlice({
    name: 'Sale',
    initialState: {
        isLoading: false,
        Sales: []
    },
    
    reducers: {
        addNewSales: (state, action) => {
            const { newSalesObj } = action.payload;
            state.Sales = [...state.Sales, newSalesObj];
        },

        deleteSales: (state, action) => {
            const { index } = action.payload;
            state.Sales.splice(index, 1);
        },

        editSales: (state, action) => {
            const { index, updatedSaleObj } = action.payload;
            state.Sales[index] = { ...state.Sales[index], ...updatedSaleObj };
        }
    },

    extraReducers: {
        [getSalesContent.pending]: (state) => {
            state.isLoading = true;
        },
        [getSalesContent.fulfilled]: (state, action) => {
            state.Sales = action.payload.data;
            state.isLoading = false;
        },
        [getSalesContent.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export const { addNewSales, deleteSales, editSale } = SalesSlice.actions;

export default SalesSlice.reducer;

