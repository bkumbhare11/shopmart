import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("userData")) || null;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: user,
    isLoggedIn: user ? true : false,
  },
  reducers: {
    logIn: (state, action) => {
      state.userData = action.payload;
      state.isLoggedIn = true;

      localStorage.setItem("userData", JSON.stringify(state.userData));
    },

    logOut: (state) => {
      state.userData = null;
      state.isLoggedIn = false;
      localStorage.removeItem("userData");
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
