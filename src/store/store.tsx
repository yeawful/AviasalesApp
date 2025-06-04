import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filtersSlice';
import tabsReducer from './tabsSlice';
import ticketsReducer from './ticketsSlice';

const store = configureStore({
    reducer: {
        filter: filterReducer,
        tabs: tabsReducer,
        tickets: ticketsReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;