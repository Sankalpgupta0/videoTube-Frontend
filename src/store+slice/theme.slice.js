import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDark: true,
}



const themeSlice = createSlice({
    name: "themeReducer",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDark = !state.isDark
            console.log(state.open);
        }
    }

})

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;