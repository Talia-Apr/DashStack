import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getPaymentContent = createAsyncThunk('/Users/content', async () => {
	const response = await axios.get('/api/users?page=1', {})
	return response.data;
})

export const PaymentSlice = createSlice({
    name: 'Payment',
    initialState: {
        isLoading: false,
        Payment: []
    },
    
    reducers: {
        addNewPayment: (state, action) => {
            const { newPaymentObj } = action.payload;
            state.Payment = [...state.Payment, newPaymentObj];
        },

        deletePayment: (state, action) => {
            const { index } = action.payload;
            state.Payment.splice(index, 1);
        },

        editPayment: (state, action) => {
            const { index, updatedSaleObj } = action.payload;
            state.Payment[index] = { ...state.Payment[index], ...updatedSaleObj };
        }
    },

    extraReducers: {
        [getPaymentContent.pending]: (state) => {
            state.isLoading = true;
        },
        [getPaymentContent.fulfilled]: (state, action) => {
            state.Payment = action.payload.data;
            state.isLoading = false;
        },
        [getPaymentContent.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export const { addNewPayment, deletePayment, editSale } = PaymentSlice.actions;

export default PaymentSlice.reducer;

