"use client";
import React, { useEffect, useState } from "react";
import Post from "./ui/Post";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPosts } from "@/store/slicers/postsSlice";
import { AppDispatch } from "@/store/store";
import { selectAuthInfo } from "@/store/slicers/authSlice";

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
  }, [dispatch]);
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
