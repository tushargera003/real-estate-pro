import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const user = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user ? user : null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      toast.success("Login Successful!");
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Logged out successfully!"); // Toastify Notification
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
