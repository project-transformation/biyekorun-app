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
    logout: async(state) => {
      state.user = {};
      state.profile = {};
      state.isAuthenticated = false;
      await SecureStore.deleteItemAsync("biyekorun_token");
      router.push("/")
    },
  },
});

export const { setProfile, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
