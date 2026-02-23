import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import guidesReducer from "./slices/guidesSlice";

export const store = configureStore({
reducer: {
    auth: authReducer,
    guides: guidesReducer,
},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;