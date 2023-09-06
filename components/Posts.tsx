"use client";
import React, { use, useEffect, useState } from "react";
import Post from "./ui/Post";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPosts } from "@/store/slicers/postsSlice";
import { AppDispatch } from "@/store/store";
import { selectAuthInfo } from "@/store/slicers/authSlice";
import { fetchAdminState, selectAdminState } from "../store/slicers/adminSlice";

type UsersType = {
  [key: string]: UserType;
};

type UserType = {
  name: string;
  email: string;
  dog_img: string;
  owner_img: string;
  password: string;
};

const Posts = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchAdminState());
  }, [dispatch]);
  const adminState = useSelector(selectAdminState);
  const postsState = useSelector(selectPosts);
  const [users, setUsers] = useState({} as UsersType);
  const currentUser = useSelector(selectAuthInfo);
  useEffect(() => {
    Object.entries(postsState.posts).map(([id, post]) => {
      axios
        .get(`http://localhost:3030/user/${post.users_id}`)
        .then((res) => {
          setUsers((prev) => {
            return { ...prev, [post.users_id]: res.data };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [postsState]);
  let user: UserType = {
    name: "",
    email: "",
    dog_img: "",
    owner_img: "",
    password: "",
  };
  if (!adminState.posts) {
    return (
      <div className="flex flex-grow h-screen pb-44 pt-6 xl:mr-40 mx-auto max-w-md md:max-w-lg justify-center">
        Sorry Posts aren't available right now...
      </div>
    );
  }
  return (
    <div>
      {Object.entries(postsState.posts).map(([id, post]) => {
        user = users[post.users_id];
        let isCurrentUser = currentUser.id === post.users_id;
        return (
          <Post
            key={id}
            name={user?.name}
            message={post.text}
            postImage={post?.image}
            image={user?.dog_img}
            timestamp={post.timestamp}
            isCurrentUser={isCurrentUser}
            id={post.id}
          />
        );
      })}
    </div>
  );
};

export default Posts;
