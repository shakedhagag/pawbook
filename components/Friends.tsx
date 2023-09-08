"use client";
import React, { useEffect } from "react";
import Stories from "./Stories";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { FriendProps } from "@/store/slicers/friendsSlice";
import { selectAuthInfo } from "@/store/slicers/authSlice";
import { UnfollowAlert } from "./UnfollowAlert";
import { AppDispatch } from "../store/store";
import { fetchAdminState, selectAdminState } from "../store/slicers/adminSlice";
interface FriendsProps {
  friendsList: FriendProps[];
}

const Friends: React.FC<FriendsProps> = ({ friendsList }) => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAdminState());
  }, [dispatch]);
  const adminState = useSelector(selectAdminState);
  const currentUser = useSelector(selectAuthInfo);
  const id = currentUser.id;
  useEffect(() => {
    const enableFriends = () => {
      if (!adminState.friends) {
        return (
          <div className="flex flex-grow h-screen pb-44 pt-6 xl:mr-40 mx-auto max-w-md md:max-w-lg justify-center items-center">
            Sorry Friends arent available right now...
          </div>
        );
      }
    };
    enableFriends();
  }, [adminState]);
  return (
    <div className="flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto no-scrollbar">
      <div className="mx-auto max-w-md md:max-w-lg">
        <Stories />
        <div className="mx-auto mt-4 space-y-2">
          {friendsList &&
            friendsList.map((friend) => (
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
                    <div className="flex float-right ml-auto">
                      <UnfollowAlert friend={friend} id={id} />
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
