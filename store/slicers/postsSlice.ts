import {
  Action,
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

export type PostProps = {
  name: string;
  text: string;
  timestamp: Date;
  image: string;
  postImage: string;
  users_id: string;
  id: string;
};

type PostWithId = PostProps & { id: string };
type ApiResponse = {
  posts: {
    [key: string]: PostProps;
  };
};

// Type for our state
export interface PostsState {
  value: {
    posts: PostProps[];
  };
}

// Initial state
const initialState: PostsState = {
  value: {
    posts: [],
  },
};

// Actual Slice
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    initPosts: (state, action: PayloadAction<PostProps[]>) => ({
      ...state,
      value: {
        ...state.value,
        posts: action.payload,
      },
    }),
    addPost: (state, action: PayloadAction<PostProps>) => ({
      ...state,
      value: {
        ...state.value,
        posts: [...state.value.posts, action.payload],
      },
    }),
    // removePost: (state, action: PayloadAction<string>) => ({
    //   ...state,
    //   value: {
    //     ...state.value,
    //     posts: state.value.posts.filter((post) => post !== action.payload),
    //   },
    // }),
  },
});

export const fetchPosts =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      const response = await axios.get<ApiResponse>(
        "http://localhost:3030/posts"
      );
      const postsArray: PostWithId[] = Object.entries(response.data.posts).map(
        ([id, post]: [string, PostProps]) => ({
          ...(post as PostProps),
          id,
        })
      );

      const sortedPosts: PostProps[] = Object.values(postsArray).sort(
        (a: PostProps, b: PostProps) => {
          return (
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
        }
      );
      dispatch(postsSlice.actions.initPosts(Object.values(sortedPosts)));
    } catch (error) {
      console.log(error);
    }
  };

export const { addPost, initPosts } = postsSlice.actions;
export const selectPosts = (state: RootState) => state.posts.value;

export default postsSlice.reducer;
