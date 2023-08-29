"use client";
import React from "react";
import Stories from "./Stories";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { unfollowFriend } from "@/store/slicers/friendsSlice";
import { useDispatch, useSelector } from "react-redux";

import { FriendProps } from "@/store/slicers/friendsSlice";
import { AppDispatch } from "@/store/store";
import { selectAuthInfo } from "@/store/slicers/authSlice";
interface FriendsProps {
  friendsList: FriendProps[];
}

const Friends: React.FC<FriendsProps> = ({ friendsList }) => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector(selectAuthInfo);
  console.log("🚀 ~ file: Friends.tsx:20 ~ currentUser:", currentUser);
  const id = currentUser.id;
  console.log("🚀 ~ file: Friends.tsx:22 ~ id:", id);
  return (
    <div className="flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto no-scrollbar">
      <div className="mx-auto max-w-md md:max-w-lg">
        <Stories />
        <div className="mx-auto mt-4 space-y-2">
          {friendsList.map((friend) => (
            <Card key={friend.friendId} className=" hover:bg-gray-100">
              <CardHeader>
                <div className="flex">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage
                        src={
                          friend.dog_img
                            ? friend.dog_img
                            : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                        }
                      />
                      <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                    <CardTitle>{friend.name}</CardTitle>
                  </div>
                  <div className="float-right ml-auto">
                    <Button
                      variant="outline"
                      onClick={() => dispatch(unfollowFriend(friend, id))}
                    >
                      Unfollow
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Friends;
