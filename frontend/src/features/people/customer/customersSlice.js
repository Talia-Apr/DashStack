import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCustomersContent = createAsyncThunk('/customers/content', async () => {
	const response = await axios.get('/api/users?page=1', {})
	return response.data;
})

export const customersSlice = createSlice({
    name: 'customers',
    initialState: {
        isLoading: false,
        customers: []
    },
    
    reducers: {
        addNewCustomer: (state, action) => {
            const { newCustomerObj } = action.payload;
            state.customers = [...state.customers, newCustomerObj];
        },

        deleteCustomer: (state, action) => {
            const { index } = action.payload;
            state.customers.splice(index, 1);
        },

        editCustomer: (state, action) => {
            const { index, updatedCustomerObj } = action.payload;
            state.customers[index] = { ...state.customers[index], ...updatedCustomerObj };
        }
    },

    extraReducers: {
        [getCustomersContent.pending]: (state) => {
            state.isLoading = true;
        },
        [getCustomersContent.fulfilled]: (state, action) => {
            state.customers = action.payload.data;
            state.isLoading = false;
        },
        [getCustomersContent.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export const { addNewCustomer, deleteCustomer, editCustomer } = customersSlice.actions;

export default customersSlice.reducer;

