import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signin, signout, verifyAuth, signup } from '../apis/authApi';

const AuthErrorTypes = {
    LOGIN : "login",
    REGISTER : "register",
    VERIFY : "verify",
    LOGOUT: "logout"
}

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
        error: {
            type: "",
            message: ""
        }
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error.type = "";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                console.log()
                state.error.message = action.payload.message;
                state.error.type = AuthErrorTypes.LOGIN;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error.type = "";
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
                state.error.type = "";
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.payload.message;
                state.error.type = AuthErrorTypes.REGISTER;
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error.type = "";
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.error.message;
                state.error.type = AuthErrorTypes.VERIFY;
            })
    }
});

export default authSlice.reducer;