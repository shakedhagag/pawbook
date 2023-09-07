import React, { useEffect } from "react";
import {
  VideoCameraIcon,
  MagnifyingGlassCircleIcon,
  MegaphoneIcon,
} from "@heroicons/react/20/solid";
import Contact from "./Contact";
import { fetchFriends, selectFriends } from "@/store/slicers/friendsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { selectAuthInfo } from "@/store/slicers/authSlice";

const Widgets = () => {
  const currentUserId = useSelector(selectAuthInfo).id;

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (currentUserId) {
      dispatch(fetchFriends(currentUserId));
    }
  }, [dispatch, currentUserId]);
  const currUserFriends = useSelector(selectFriends);
  console.log(
    "🚀 ~ file: Widgets.tsx:23 ~ Widgets ~ currUserFriends:",
    currUserFriends
  );
  const renderUserFriends = () => {
    if (!currUserFriends) return;
    return currUserFriends.map((contact) => (
      <Contact
        key={contact.friendId}
        src={contact.dog_img}
        name={contact.name}
      />
    ));
  };
  return (
    <div className="hidden lg:flex flex-col w-60 p-2 mt-5">
      <div className="flex jusify-between items-center text-gray-500 space-x-5">
        <h2 className="text-xl">Contacts</h2>
        <div className="flex items-center space-x-2 mb-2 relative p-2 rounded-xl cursor-pointer hover:bg-gray-200">
          <VideoCameraIcon className="h-6 text-red-500" />
          <MagnifyingGlassCircleIcon className="h-6 text-green-500" />
          <MegaphoneIcon className="h-6 text-blue-500" />
        </div>
      </div>
      {renderUserFriends()}
    </div>
  );
};

export default Widgets;
