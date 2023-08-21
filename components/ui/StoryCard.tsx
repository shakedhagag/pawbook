import React from "react";
import Image from "next/image";

type StoryCardProps = {
  name: string;
  image: string;
  key: number;
  profilePic: string;
};

const StoryCard: React.FC<StoryCardProps> = ({ image, profilePic }) => {
  return (
    <div className="relative h-14 w-14 md:h-20 md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-x p-3 transition duration-200 transform ease-in hover:scale-105">
      <Image
        className="rounded-full opacity-0 lg:opacity-100 rounded-full z-50 top-2 absolute h-auto w-auto"
        src={profilePic}
        width={40}
        height={40}
        alt="story-image"
      />
      <Image
        className="object-cover filter brightness-75 rounded-full lg:rounded-3xl h-auto w-auto"
        src={image}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt="story-image"
      />
    </div>
  );
};

export default StoryCard;
