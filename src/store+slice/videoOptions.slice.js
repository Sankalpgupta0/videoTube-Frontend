import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    options: localStorage.getItem('select') || 'uploads',
    search : ""
}

const videoOptionsSlice = createSlice({
    name: "videoOptionsReducer",
    initialState,
    reducers: {
        toggleOption: (state, actions) => {
            state.options = actions.payload
            localStorage.setItem("select", actions.payload)
        },
        setSearch: (state, actions) => {
            state.search = actions.payload
        }
    }

})

export const { toggleOption, setSearch } = videoOptionsSlice.actions;

export default videoOptionsSlice.reducer;