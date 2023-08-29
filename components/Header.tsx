import React from "react";
import Image from "next/image";
import {
  BellIcon,
  ChatBubbleLeftIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import {
  PlayIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Icon from "./ui/Icon";
import { useSelector } from "react-redux";
import { selectUsername } from "@/store/slicers/authSlice";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const userName = useSelector(selectUsername);
  const path = usePathname();
  console.log("🚀 ~ file: Header.tsx:23 ~ Header ~ path:", path);
  return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            width={38}
            height={38}
            alt="PawBook Logo"
            priority={true}
          />
        </Link>
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <MagnifyingGlassIcon className="h-6 text-gray-600 " />
          <input
            type="text"
            placeholder="Search Pawbook"
            className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink text-gray-600"
          />
        </div>
      </div>
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <Link href="/">
            <Icon active={path === "/"} Icon={HomeIcon} />
          </Link>
          <Icon Icon={PlayIcon} />
          <Icon Icon={ShoppingCartIcon} />
          <Icon Icon={UserGroupIcon} />
        </div>
      </div>
      <div className="flex items-center sm:space-x-2 justify-end">
        <p className="font-semibold pr-3 whitespace-nowrap sm:space-x-2 justify-end">
          {userName}
        </p>
        <ChatBubbleLeftIcon className="icon" />
        <BellIcon className="icon" />
      </div>
    </div>
  );
};

export default Header;
