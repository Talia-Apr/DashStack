import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUsersContent = createAsyncThunk('/Users/content', async () => {
	const response = await axios.get('/api/users?page=1', {})
	return response.data;
})

export const UsersSlice = createSlice({
    name: 'User',
    initialState: {
        isLoading: false,
        Users: []
    },
    
    reducers: {
        addNewUser: (state, action) => {
            const { newUserObj } = action.payload;
            state.Users = [...state.Users, newUserObj];
        },

        deleteUser: (state, action) => {
            const { index } = action.payload;
            state.Users.splice(index, 1);
        },

        editUser: (state, action) => {
            const { index, updatedUserObj } = action.payload;
            state.Users[index] = { ...state.Users[index], ...updatedUserObj };
        }
    },

    extraReducers: {
        [getUsersContent.pending]: (state) => {
            state.isLoading = true;
        },
        [getUsersContent.fulfilled]: (state, action) => {
            state.Users = action.payload.data;
            state.isLoading = false;
        },
        [getUsersContent.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export const { addNewUser, deleteUser, editUser } = UsersSlice.actions;

export default UsersSlice.reducer;

