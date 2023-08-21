import React from "react";
import Image from "next/image";

type SideBarRowProps = {
  Icon: React.FC<any>;
  title: string;
  src?: string;
};

const SideBarRow: React.FC<SideBarRowProps> = ({ Icon, src, title }) => {
  return (
    <div className="flex space-x-2 p-4 items-center hover:bg-gray-200 rounded-xl cursor-pointer">
      {src && <Image src={src} alt={"user-image"} width={30} height={30} />}
      {Icon && <Icon className="h-8 w-8 text-blue-500" />}
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
};

export default SideBarRow;
