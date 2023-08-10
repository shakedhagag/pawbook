import React from "react";
import Image from "next/image";
import {
  BellIcon,
  ChatBubbleLeftIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import {
  FlagIcon,
  PlayIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Icon from "./Icon";

const Header = () => {
  return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      <div className="flex items-center">
        <Image
          src="https://seeklogo.com/images/P/paw-paw-logo-9611469C33-seeklogo.com.png"
          width={38}
          height={38}
          layout="fixed"
          alt="PawBook Logo"
          priority={true}
        />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <MagnifyingGlassIcon className="h-6 text-gray-600 " />
          <input
            type="text"
            placeholder="Search Pawbook"
            className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink"
          />
        </div>
      </div>
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <Icon active Icon={HomeIcon} />
          <Icon Icon={FlagIcon} />
          <Icon Icon={PlayIcon} />
          <Icon Icon={ShoppingCartIcon} />
          <Icon Icon={UserGroupIcon} />
        </div>
      </div>
      <div className="flex items-center sm:space-x-2 justify-end">
        <p className="font-semibold pr-3 whitespace-nowrap sm:space-x-2 justify-end">
          Shaked Hagag
        </p>
        <ChatBubbleLeftIcon className="icon" />
        <BellIcon className="icon" />
      </div>
    </div>
  );
};

export default Header;
