import {
  Action,
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

export type FriendProps = {
  friendId: string;
  name: string;
  owner_img: string;
  dog_img: string;
};

interface FriendsState {
  value: {
    friends: FriendProps[];
  };
}

const initialState: FriendsState = {
  value: {
    friends: [],
  },
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    initFriends: (state, action: PayloadAction<FriendProps[]>) => ({
      ...state,
      value: {
        ...state.value,
        friends: action.payload,
      },
    }),
    addFriend: (state, action: PayloadAction<FriendProps>) => ({
      ...state,
      value: {
        ...state.value,
        friends: [...state.value.friends, action.payload],
      },
    }),
    // unfollowFriend: (state, action: PayloadAction<FriendProps>) => ({}),
  },
});

export const { initFriends, addFriend } = friendsSlice.actions;

export const fetchFriends =
  (
    id: string | undefined
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      const response = await axios.get<FriendProps[]>(
        "http://localhost:3030/friends",
        { headers: { id: id } }
      );
      dispatch(initFriends(response.data));
    } catch (err) {
      console.log(err);
    }
  };

export const unfollowFriend =
  (
    friend: FriendProps,
    id: string | undefined
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    if (!id) return;
    const response = await axios.delete<FriendProps>(
      "http://localhost:3030/friends",
      {
        headers: { id: id },
        data: { friendId: friend.friendId },
      }
    );
    if (response.status === 200 && id) dispatch(fetchFriends(id));
  };

export const selectFriends = (state: RootState) => state.friends.value.friends;
export default friendsSlice.reducer;
