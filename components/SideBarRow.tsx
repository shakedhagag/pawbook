import React from "react";
import Image from "next/image";

type SideBarRowProps = {
  Icon: React.FC<any>;
  title: string;
};

const SideBarRow: React.FC<SideBarRowProps> = ({ Icon, title }) => {
  return (
    <div className="flex space-x-2 p-4 items-center hover:bg-gray-200 rounded-xl cursor-pointer">
      {Icon && <Icon className="h-8 w-8 text-blue-500" />}
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
};

export default SideBarRow;
