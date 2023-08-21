import React from "react";

type IconComponentProps = {
  Icon: React.ElementType;
  active: boolean;
  className?: string;
};

const Icon: React.FC<IconComponentProps> = ({ Icon, active, className }) => {
  return (
    <div className="flex rounded-xl cursor-pointer items-center md:px-10 sm:h-14 md: hover:bg-gray-100 active:border-b-2 border-blue-500 group">
      <Icon
        className={`h-6 text-center text-gray-500 sm:h-7 mx-auto group-hover:text-blue-500 ${
          active && "text-blue-400"
        }`}
      />
    </div>
  );
};

export default Icon;
