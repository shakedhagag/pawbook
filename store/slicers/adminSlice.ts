import {
  Action,
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

export type AdminProps = {
  friends: boolean;
  editProfile: boolean;
  posts: boolean;
  // comments: boolean;
  // likes: boolean;
  // messages: boolean;
};

// Type for our state
export interface AdminState {
  value: {
    admin: AdminProps;
  };
}

// Initial state
const initialState: AdminState = {
  value: {
    admin: {
      friends: true,
      editProfile: true,
      posts: true,
      // comments: true,
      // likes: true,
      // messages: true,
    },
  },
};

// Actual Slice
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    enablePage: (state, action: PayloadAction<AdminProps>) => ({
      ...state,
      value: {
        ...state.value,
        admin: action.payload,
      },
    }),
    disablePage: (state, action: PayloadAction<AdminProps>) => ({
      ...state,
      value: {
        ...state.value,
        admin: action.payload,
      },
    }),
  },
});

// Actions
export const { enablePage, disablePage } = adminSlice.actions;

// Thunks
export const fetchAdminState =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: (arg0: AnyAction) => void) => {
    try {
      const { data } = await axios.get("http://localhost:3030/admin/pages", {
        withCredentials: true,
      });
      console.log(data);
      dispatch(enablePage(data.pages));
    } catch (error) {
      console.log(error);
    }
  };

export const updateAdminState =
  (admin: AdminProps): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: (arg0: AnyAction) => void) => {
    try {
      await axios.put("/api/admin", admin);
      dispatch(disablePage(admin));
    } catch (error) {
      console.log(error);
    }
  };

// Selectors
export const selectAdminState = (state: RootState) => state.admin.value.admin;
