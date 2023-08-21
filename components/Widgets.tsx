import React from "react";
import {
  VideoCameraIcon,
  MagnifyingGlassCircleIcon,
  MegaphoneIcon,
} from "@heroicons/react/20/solid";
import Contact from "./Contact";

const contacts = [
  { src: "https://links.papareact.com/kxk", name: "Elon Musk" },
  { src: "https://links.papareact.com/zvy", name: "Bill Gates" },
  { src: "https://links.papareact.com/snf", name: "Mark Zuckerberg" },
  { src: "https://links.papareact.com/d0c", name: "Harry Potter" },
  { src: "https://links.papareact.com/6gg", name: "The Queen" },
  { src: "https://links.papareact.com/r57", name: "James Bond" },
];

const Widgets = () => {
  return (
    <div className="hidden lg:flex flex-col w-60 p-2 mt-5">
      <div className="flex jusify-between items-center text-gray-500 space-x-5">
        <h2 className="text-xl">Contacts</h2>
        <div className="flex items-center space-x-2 mb-2 relative p-2 rounded-xl cursor-pointer hover:bg-gray-200">
          <VideoCameraIcon className="h-6 text-red-500" />
          <MagnifyingGlassCircleIcon className="h-6 text-green-500" />
          <MegaphoneIcon className="h-6 text-blue-500" />
        </div>
      </div>
      {contacts.map((contact) => (
        <Contact key={contact.src} src={contact.src} name={contact.name} />
      ))}
    </div>
  );
};

export default Widgets;
