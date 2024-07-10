// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {user_name:'', userMeme:'', userAvatar:''},
  isAuthenticated: false,
  role:'toB'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setUserData: (state, action) => {
      state.user = action.payload
    },
    setRole: (state, action) => {
      state.role = action.payload
    }
  },
});

export const { setUser, setUserData, logout, setRole} = userSlice.actions;
export default userSlice.reducer;
