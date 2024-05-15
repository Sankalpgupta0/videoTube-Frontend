import {configureStore} from '@reduxjs/toolkit';
import sidebarSlice from './sidebar.slice';
import videoOptionsSlice from './videoOptions.slice';
import themeSlice from './theme.slice';

const store = configureStore({
    reducer: {
        sidebarReducer : sidebarSlice,
        videoOptionsReducer : videoOptionsSlice,
        themeReducer : themeSlice
    }   
});


export default store;