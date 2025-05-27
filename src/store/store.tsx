import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filtersSlice';
import tabsReducer from './tabsSlice';

const store = configureStore({
    reducer: {
        filter: filterReducer,
        tabs: tabsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;