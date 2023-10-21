import { createSlice } from '@reduxjs/toolkit';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const initialState = {
  user: {},
  profile: {},
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: async (state) => {
      state.user = {};
      state.profile = {};
      state.isAuthenticated = false;
      try {
        await SecureStore.deleteItemAsync('biyekorun_token');
        router.push("/")
        // You can also perform any other necessary actions here after deleting the token
      } catch (error) {
        console.error('Error removing token:', error);
      }
    },
  },
});

export const { setProfile, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
