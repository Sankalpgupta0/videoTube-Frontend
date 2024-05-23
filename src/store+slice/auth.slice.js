import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: localStorage.getItem("isLogin") || false,
};

const authSlice = createSlice({
    name: "AuthReducer",
    initialState,
    reducers: {
        login: (state) => {
            state.status = true;
            localStorage.setItem("isLogin", true);
        },
        logout: (state) => {
            state.status = false;
            localStorage.setItem("isLogin", false);
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
