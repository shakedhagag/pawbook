import {
  Action,
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

// Type for our state
export interface AuthState {
  value: {
    authState: boolean;
    username: string;
    token: string;
    // uid: string;
    // isAdmin: boolean;
  };
}

// Initial state
const initialState: AuthState = {
  value: {
    authState: false,
    username: "",
    token: "",
    // uid: "",
    // isAdmin: false,
  },
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => initialState,
    logIn: (
      state,
      action: PayloadAction<{ username: string; token: string }>
    ) => ({
      ...state,
      value: {
        ...state.value,
        authState: true,
        username: action.payload.username,
        token: action.payload.token,
        // uid: action.payload.uid, // Add to backend response
        // isAdmin: action.payload.isAdmin, // Add to backend response
      },
    }),
  },
});

export const rehydrateAuth =
  (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(logIn({ username: "", token: token }));
    }
  };

export const { logIn, logOut } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth.value.authState;
export const selectToken = (state: RootState) => state.auth.value.token;

export default authSlice.reducer;
