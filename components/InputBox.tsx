import React, { ReactElement, useRef, useState } from "react";
import Image from "next/image";
import {
  CameraIcon,
  FaceSmileIcon,
  ChatBubbleBottomCenterIcon,
  FaceFrownIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthInfo } from "@/store/slicers/authSlice";
import { AppDispatch } from "@/store/store";
import { fetchPosts } from "@/store/slicers/postsSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import axios from "axios";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

const Feelings = {
  happy: <FaceSmileIcon className="h-7 text-yellow-500" />,
  sad: <FaceFrownIcon className="h-7 text-red-500" />,
};

const longPostAlert = (
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Oops! You post is too long...</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Your post is too long. Please shorten it to 300 characters or less.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => setOpen(false)}
            className="bg-blue-400"
          >
            Ok
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const InputBox = () => {
  const dispatch: AppDispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [feeling, setFeeling] = useState<ReactElement | null>(null);
  const [imgToPost, setImgToPost] = useState<string | undefined>("");
  const currentUser = useSelector(selectAuthInfo);
  const currUserEmail = currentUser.email;
  const currentUserImg = currentUser.dogImg;

  const removeFeeling = () => {
    setFeeling(null);
  };
  const retFeeling = () => {
    if (feeling === Feelings.happy) {
      return "happy";
    } else {
      return "sad";
    }
  };
  const setImg = () => {
    if (imgRef.current) {
      setImgToPost(imgRef.current.innerText);
    }
  };

  const handlePost = async (e: any) => {
    let currFeeling = retFeeling();
    e.preventDefault();
    if (inputRef.current) {
      if (!inputRef.current.value) return;
      if (inputRef.current.value.length > 300) {
        setOpen(true);
        return;
      }
    }

    const post = {
      text: inputRef?.current?.value,
      image: imgToPost,
      feeling: currFeeling,
      email: currUserEmail,
    };
    try {
      await axios.post("http://localhost:3030/create-post", post);
      dispatch(fetchPosts());
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      removeFeeling();
      setImgToPost("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6 ">
      <div className="flex space-x-4 p-4 items-center">
        {longPostAlert(open, setOpen)}
        <Avatar>
          <AvatarImage
            src={
              currentUserImg
                ? currentUserImg
                : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
            }
          />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
        <form action="" className="flex flex-1">
          <input
            type="text"
            placeholder={`What's on your paw today?`}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            ref={inputRef}
          />
          <button hidden type="submit" onClick={handlePost}>
            Submit
          </button>
        </form>
        {feeling && (
          <div
            onClick={removeFeeling}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            {feeling}
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly border-t p-3">
        <HoverCard>
          <div className="flex items-center space-x-1 hover:bg-gray-100 justify-center p-2 flex-grow rounded-xl cursor-pointer">
            <HoverCardTrigger className="flex">
              <CameraIcon className="h-7 text-red-500" />
              <p className="text-xs sm:text-sm xl:text-base">Upload Image</p>
            </HoverCardTrigger>
            <HoverCardContent>
              <Input
                type="text"
                ref={imgRef}
                value={imgToPost}
                onChange={(e) => {
                  setImgToPost(e.target.value);
                }}
              />
              <button hidden type="submit">
                Submit Image
              </button>
            </HoverCardContent>
          </div>
        </HoverCard>
        <HoverCard>
          <div className="flex items-center space-x-1 hover:bg-gray-100 justify-center p-2 flex-grow rounded-xl cursor-pointer ">
            <HoverCardTrigger className="flex items-center">
              <FaceSmileIcon className="h-7 text-yellow-500" />
              <p className="text-xs sm:text-sm xl:text-base">Feeling</p>
            </HoverCardTrigger>
            <HoverCardContent>
              <Button
                variant="outline"
                onClick={() => setFeeling(Feelings.happy)}
              >
                <FaceSmileIcon className="h-7 text-yellow-500" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setFeeling(Feelings.sad)}
              >
                <FaceFrownIcon className="h-7 text-red-500" />
              </Button>
            </HoverCardContent>
          </div>
        </HoverCard>
        <div className="flex items-center space-x-1 hover:bg-gray-100 justify-center p-2 flex-grow rounded-xl cursor-pointer ">
          <ChatBubbleBottomCenterIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Message</p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
