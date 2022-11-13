import { configureStore } from "@reduxjs/toolkit";
import customers from './customers';
import transfers from './transfers';

const store = configureStore({
    reducer: {
        customers,
        transfers
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;