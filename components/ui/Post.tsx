"use client";
import Image from "next/image";
import React from "react";
import {
  ShareIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { HandThumbUpIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { fetchPosts } from "@/store/slicers/postsSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type PostProps = {
  name: string;
  message: string;
  timestamp: Date;
  image: string;
  postImage: string;
  isCurrentUser: boolean;
  id: string;
};

const Post: React.FC<PostProps> = ({
  name,
  message,
  timestamp,
  image,
  postImage,
  isCurrentUser,
  id,
}) => {
  const date = new Date(timestamp);
  const formattedDate = date.toDateString();
  const dispatch: AppDispatch = useDispatch();
  const handleDelete = () => {
    try {
      axios.post("http://localhost:3030/delete-post", {
        id: id,
      });
      dispatch(fetchPosts());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
        {isCurrentUser && (
          <XCircleIcon
            className="float-right h-5 text-gray-500 cursor-pointer"
            onClick={handleDelete}
          />
        )}
        <div className="flex items-center space-x-2">
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-400">
              {formattedDate + " " + date.toTimeString().slice(0, 5)}
            </p>
          </div>
        </div>

        <p className="pt-4">{message}</p>
      </div>
      {postImage && (
        <div className="relative h-56 md:h-96 bg-white">
          <Image
            loader={() => postImage}
            src={postImage}
            alt="post-image"
            className="object-cover"
            fill={true}
          />
        </div>
      )}
      <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
        <div className="flex items-center space-x-1 hover:bg-gray-100 justify-center p-2 flex-grow rounded-xl cursor-pointer rounded-none rounded-bl-2xl">
          <HandThumbUpIcon className="h-4" />
          <p className="text-xs sm:text-base">Like</p>
        </div>
        <div className="flex items-center space-x-1 hover:bg-gray-100 justify-center p-2 flex-grow rounded-xl cursor-pointer rounded-none">
          <ChatBubbleBottomCenterTextIcon className="h-4" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>
        <div className="flex items-center space-x-1 hover:bg-gray-100 justify-center p-2 flex-grow rounded-xl cursor-pointer rounded-none rounded-br-2xl">
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base">Share</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
