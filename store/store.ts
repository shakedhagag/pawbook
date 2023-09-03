import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./slicers/authSlice";
import thunk, { ThunkDispatch } from "redux-thunk";
import { postsSlice } from "./slicers/postsSlice";
import { friendsSlice } from "./slicers/friendsSlice";
import { userProfileSlice } from "./slicers/userProfileSlice";
import { adminSlice } from "./slicers/adminSlice";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [postsSlice.name]: postsSlice.reducer,
    [friendsSlice.name]: friendsSlice.reducer,
    [userProfileSlice.name]: userProfileSlice.reducer,
    [adminSlice.name]: adminSlice.reducer,
  },
  middleware: [thunk],
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = ThunkDispatch<RootState, any, Action<string>>;
