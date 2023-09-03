import React from "react";
import Image from "next/image";
import { HomeIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import {
  PlayIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Icon from "./ui/Icon";
import { useSelector } from "react-redux";
import { selectAuthInfo, selectUsername } from "@/store/slicers/authSlice";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SearchBar } from "./SearchBar";

const Header = () => {
  const userName = useSelector(selectUsername);
  const currentUserImg = useSelector(selectAuthInfo).dogImg;
  const path = usePathname();
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
          <SearchBar />
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
      <div className="flex items-center sm:space-x-2 justify-end mr-6 cursor-pointer hover:bg-gray-300 rounded-full">
        <Link href={`/profile`} className="flex items-center space-x-2">
          <div className="flex rounded-full h-[38px] w-[38px]">
            <Image
              className="bg-transparent rounded-full cursor-pointer"
              src={
                currentUserImg
                  ? currentUserImg
                  : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
              }
              style={{
                objectFit: "cover",
              }}
              width={40}
              height={40}
              alt="user-image"
            />
          </div>
          <p className="font-semibold pr-3 whitespace-nowrap sm:space-x-2 justify-end">
            {userName}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
