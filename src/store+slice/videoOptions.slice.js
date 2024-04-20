import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    options: localStorage.getItem('select')  || 'uploads',
    
}

const videoOptionsSlice = createSlice({
    name: "videoOptionsReducer",
    initialState,
    reducers: {
        toggleOption : (state, actions) => {
            state.options = actions.payload
            localStorage.setItem("select", actions.payload)
        }
    }

})

export const { toggleOption } = videoOptionsSlice.actions;

export default videoOptionsSlice.reducer;