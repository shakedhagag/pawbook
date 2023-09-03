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
    email: string;
    token: string;
    ownerImg: string;
    dogImg: string;
    isAdmin?: boolean;
    id?: string;
  };
}

export type AuthPayload = {
  token: string;
  user: {
    email: string;
    name: string;
    owner_img: string;
    dog_img: string;
    isAdmin?: boolean;
  };
};

export type currentUserPayload = {
  email: string;
  name: string;
  owner_img: string;
  dog_img: string;
  password?: string;
  id?: string;
  isAdmin?: boolean;
};

// Initial state
const initialState: AuthState = {
  value: {
    authState: false,
    username: "",
    email: "",
    token: "",
    ownerImg: "",
    dogImg: "",
    isAdmin: false,
  },
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => initialState,
    logIn: (state, action: PayloadAction<AuthPayload>) => ({
      ...state,
      value: {
        ...state.value,
        authState: true,
        username: action.payload.user.name,
        email: action.payload.user.email,
        ownerImg: action.payload.user.owner_img,
        dogImg: action.payload.user.dog_img,
        token: action.payload.token,
        isAdmin: action.payload.user.isAdmin,
      },
    }),
    setAuthState: (state, action: PayloadAction<boolean>) => ({
      ...state,
      value: {
        ...state.value,
        authState: action.payload,
      },
    }),
    setCurrentUser: (state, action: PayloadAction<currentUserPayload>) => ({
      ...state,
      value: {
        ...state.value,
        username: action.payload.name,
        email: action.payload.email,
        ownerImg: action.payload.owner_img,
        dogImg: action.payload.dog_img,
        id: action.payload.id,
        isAdmin: action.payload.isAdmin,
      },
    }),
  },
});

export const { logIn, logOut, setAuthState, setCurrentUser } =
  authSlice.actions;

export const selectAuthInfo = (state: RootState) => state.auth.value;
export const selectAuthState = (state: RootState) => state.auth.value.authState;
export const selectUsername = (state: RootState) => state.auth.value.username;
export const selectToken = (state: RootState) => state.auth.value.token;

export default authSlice.reducer;
