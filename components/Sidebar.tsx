import {
  UsersIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  CalendarIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import SideBarRow from "./SideBarRow";

const Sidebar = () => {
  return (
    <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px] overflow-y-hidden">
      <SideBarRow Icon={UsersIcon} title="Friends" />
      <SideBarRow Icon={UserGroupIcon} title="Groups" />
      <SideBarRow Icon={ShoppingCartIcon} title="Marketplace" />
      <SideBarRow Icon={CalendarIcon} title="Events" />
    </div>
  );
};

export default Sidebar;
