import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.userData = payload;
    },
  },
});

export const { setAuth } = authSlice.actions;
export const authStore = (state) => state.auth;
export default authSlice.reducer;
