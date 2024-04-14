import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, AuthState } from '../../types/userTypes';

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

const initialState: AuthState = {
    user: user,
    status: 'idle',
    error: null
};

export const registerUser: any = createAsyncThunk('auth/registerUser', async (userData) => {
    const response = await axios.post<User>('/auth/register', userData);
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));  // Store token in localStorage
    }
    return response.data;
});

export const loginUser: any = createAsyncThunk('auth/loginUser', async (userData: { email: string, password: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post('/auth/login', userData);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));  // Store token in localStorage
        }
        return response.data;
    } catch (error: any) {
        // Check if the error has a response with data
        if (error.response?.data) {
            return rejectWithValue(error.response.data);
        }
        // For errors without response data, return a generic message or error object
        return rejectWithValue('An unexpected error occurred');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            localStorage.removeItem('user'); // Remove user and token from localStorage
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message || null;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message || null;
            });
    }
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;