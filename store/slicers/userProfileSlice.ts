import {
  Action,
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

export type UserProfileProps = {
  id: string | undefined;
  description: string;
  title?: string;
};

// Type for our state
export interface UserProfileState {
  value: {
    userProfile: UserProfileProps;
  };
}

// Initial state
const initialState: UserProfileState = {
  value: {
    userProfile: {
      id: "",
      title: "",
      description: "",
    },
  },
};

// Actual Slice
export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    initUserProfile: (state, action: PayloadAction<UserProfileProps>) => ({
      ...state,
      value: {
        ...state.value,
        userProfile: action.payload,
      },
    }),
    updateUserProfile: (state, action: PayloadAction<UserProfileProps>) => ({
      ...state,
      value: {
        ...state.value,
        userProfile: action.payload,
      },
    }),
  },
});

// Actions
export const { initUserProfile, updateUserProfile } = userProfileSlice.actions;

// Thunks
export const fetchUserProfile =
  (
    id: string | undefined
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      const response = await axios.get<UserProfileProps>(
        `http://localhost:3030/profile`,
        { headers: { id: id } }
      );
      dispatch(initUserProfile(response.data));
    } catch (error) {
      console.log(error);
    }
  };

export const updateUserProfileThunk =
  (
    id: string | undefined,
    title: string | undefined,
    description: string | undefined
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      if (id && description) {
        const response = await axios.put<UserProfileProps>(
          `http://localhost:3030/profile`,
          { id: id, description: description }
        );
        dispatch(updateUserProfile(response.data));
      } else if (id && title) {
        const response = await axios.post<UserProfileProps>(
          `http://localhost:3030/profile`,
          { id: id, title: title }
        );
        dispatch(updateUserProfile(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

// Selectors
export const selectUserProfile = (state: RootState) => state.userProfile.value;
