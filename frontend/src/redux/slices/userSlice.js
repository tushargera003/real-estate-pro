import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const userSlice = createSlice({
    name: "user",
    initialState: {
      userInfo: userInfoFromStorage,
    },
    reducers: {
      setUser: (state, action) => {
        state.userInfo = action.payload; // Redux me poora object store ho
        localStorage.setItem("userInfo", JSON.stringify({ token: action.payload.token })); // ✅ Sirf token store ho
      },
      logoutUser: (state) => {
        state.userInfo = null;
        localStorage.removeItem("userInfo");
      },
    },
  });
  

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
