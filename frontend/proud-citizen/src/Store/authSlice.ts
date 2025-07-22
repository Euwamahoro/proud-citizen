import type {PayloadAction } from '@reduxjs/toolkit';
import  { createSlice} from '@reduxjs/toolkit';
import { storeToken, removeToken } from '../Services/authService'

interface AuthState {
  isLoggedIn: boolean;
  user: null | { email: string; username: string };
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem('authToken'),
  user: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ token: string; email: string }>) {
      storeToken(action.payload.token);
      state.isLoggedIn = true;
      state.user = { email: action.payload.email, username: '' };
      state.loading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      removeToken();
      state.isLoggedIn = false;
      state.user = null;
    },
    clearError(state) {
      state.error = null;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;