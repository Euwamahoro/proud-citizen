import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { storeToken, removeToken } from '../Services/authService'

export interface User {
  id: string;
  email: string;
  username: string;
  profilePicture?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
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
      console.log('🚀 AuthSlice: loginStart called');
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      console.log('✅ AuthSlice: loginSuccess called');
      console.log('Raw action payload:', action.payload);
      console.log('Token:', action.payload.token ? '✅ Present' : '❌ Missing');
      console.log('User object:', action.payload.user);
      console.log('User type:', typeof action.payload.user);
      
      if (action.payload.user) {
        console.log('User properties:');
        console.log('- id:', action.payload.user.id);
        console.log('- email:', action.payload.user.email);
        console.log('- username:', action.payload.user.username);
        console.log('- profilePicture:', action.payload.user.profilePicture);
      } else {
        console.log('❌ User object is null/undefined in payload');
      }
      
      console.log('🔄 Updating state...');
      storeToken(action.payload.token);
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.loading = false;
      
      console.log('✅ State after update:');
      console.log('- isLoggedIn:', state.isLoggedIn);
      console.log('- user:', state.user);
      console.log('- loading:', state.loading);
    },
    loginFailure(state, action: PayloadAction<string>) {
      console.log('❌ AuthSlice: loginFailure called with:', action.payload);
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      console.log('🚪 AuthSlice: logout called');
      removeToken();
      state.isLoggedIn = false;
      state.user = null;
    },
    clearError(state) {
      console.log('🧹 AuthSlice: clearError called');
      state.error = null;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;