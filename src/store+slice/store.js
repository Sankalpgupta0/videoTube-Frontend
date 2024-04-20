import {configureStore} from '@reduxjs/toolkit';
import sidebarSlice from './sidebar.slice';
import videoOptionsSlice from './videoOptions.slice';

const store = configureStore({
    reducer: {
        sidebarReducer : sidebarSlice,
        videoOptionsReducer : videoOptionsSlice
    }   
});


export default store;