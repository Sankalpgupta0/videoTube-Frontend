import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
}

const authSlice = createSlice({
    name: "AuthReducer",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
        },
        logout: (state) => {
            state.status = false;
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;