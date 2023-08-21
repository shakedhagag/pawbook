import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./slicers/authSlice";
import thunk, { ThunkDispatch } from "redux-thunk";
import { postsSlice } from "./slicers/postsSlice";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [postsSlice.name]: postsSlice.reducer,
  },
  middleware: [thunk],
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = ThunkDispatch<RootState, any, Action<string>>;
