import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: true,
    
}

const sidebarSlice = createSlice({
    name: "sidebarReducer",
    initialState,
    reducers: {
        toggle : (state) => {
            state.open = !state.open 
        }
    }

})

export const { toggle } = sidebarSlice.actions;

export default sidebarSlice.reducer;