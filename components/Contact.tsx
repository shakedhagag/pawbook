import Image from "next/image";
import React from "react";

type ContactProps = {
  src: string;
  name: string;
};

const Contact: React.FC<ContactProps> = ({ src, name }) => {
  return (
    <div className="flex items-center space-x-3 mb-2 relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl">
      <Image
        src={src}
        width={40}
        height={40}
        className="rounded-full object-cover cursor-pointer hover:opacity-80 transition duration-150 ease-in-out transform hover:scale-110 hover:rotate-12 w-auto h-auto"
        alt="user-image"
      />
      <p>{name}</p>
      <div className="absolute bottom-2 left-7 bg-green-400 h-3 w-3 rounded-full" />
    </div>
  );
};

export default Contact;
