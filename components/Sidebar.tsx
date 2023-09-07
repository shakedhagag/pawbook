import {
  UsersIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  CalendarIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import SideBarRow from "./SideBarRow";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px] overflow-y-hidden">
      <Link href={"/friends"}>
        <SideBarRow Icon={UsersIcon} title="Friends" />
      </Link>
      <Link href={"/additional/fun-facts"}>
        <SideBarRow Icon={UserGroupIcon} title="Fun Facts" />
      </Link>
      <Link href={"/additional/about-me"}>
        <SideBarRow Icon={ShoppingCartIcon} title="About Me" />
      </Link>
      <SideBarRow Icon={CalendarIcon} title="Events" />
    </div>
  );
};

export default Sidebar;
