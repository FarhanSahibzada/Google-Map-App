import { configureStore } from "@reduxjs/toolkit";
import locationReducer from './locationSlice'

const Store  = configureStore({
    reducer : locationReducer
})


export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;


export default Store ;