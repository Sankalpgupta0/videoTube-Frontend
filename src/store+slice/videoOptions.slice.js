import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    options: localStorage.getItem('select') || 'uploads',
    search : "",
    currentUrl : "/",
    enableSeacher : true
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
            // console.log(state.enableSeacher);
        },
        setCurrentUrl: (state) => {
                state.currentUrl = window.location.pathname.slice(1)
                localStorage.setItem('currentUrl', window.location.pathname.slice(1))
                if(localStorage.getItem('currentUrl') != 'home'){
                    state.enableSeacher = false
                }else{
                    state.enableSeacher = true
                }
        }
    }

})

export const { toggleOption, setSearch, setCurrentUrl } = videoOptionsSlice.actions;

export default videoOptionsSlice.reducer;