import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signin, signout, verifyAuth, signup } from '../apis/authApi';

export const login = createAsyncThunk('auth/login', async (user, { rejectWithValue }) => {
    try {
        const response = await signin(user);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
    const response = await verifyAuth();
    return response.data;
})

export const logout = createAsyncThunk('auth/logout', async () => {
    const response = await signout();
    return response.data;
})

export const register = createAsyncThunk('auth/register', async (user, { rejectWithValue }) => {
    try {
        const response = await signup(user);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                console.log()
                state.error = action.payload.message;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.msg;
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export default authSlice.reducer;