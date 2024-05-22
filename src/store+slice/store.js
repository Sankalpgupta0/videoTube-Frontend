import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebar.slice";
import videoOptionsSlice from "./videoOptions.slice";
import themeSlice from "./theme.slice";
import authSlice from "./auth.slice";

const store = configureStore({
    reducer: {
        sidebarReducer: sidebarSlice,
        videoOptionsReducer: videoOptionsSlice,
        themeReducer: themeSlice,
        AuthReducer: authSlice,
    },
});

export default store;
