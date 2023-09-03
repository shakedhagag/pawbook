"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PencilIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { FriendProps } from "@/store/slicers/friendsSlice";
import { selectAuthInfo } from "@/store/slicers/authSlice";
import { AppDispatch } from "../../store/store";
import {
  fetchUserProfile,
  selectUserProfile,
  updateUserProfileThunk,
} from "../../store/slicers/userProfileSlice";
interface FriendsProps {
  friendsList: FriendProps[];
}
import { Input } from "../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

const Profile: React.FC<FriendsProps> = ({ friendsList }) => {
  const currentUser = useSelector(selectAuthInfo);
  const id = currentUser.id;
  const dogImg = currentUser.dogImg;
  const ownerImg = currentUser.ownerImg;
  const name = currentUser.username;
  const isAdmin = currentUser.isAdmin;
  console.log("🚀 ~ file: [profile].tsx:44 ~ isAdmin:", isAdmin);
  const dispatch: AppDispatch = useDispatch();
  const currProfile = useSelector(selectUserProfile);
  const [edit, setEdit] = useState(false);
  const [imgEdit, setImgEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editValue, setEditValue] = useState<string | undefined>(
    currProfile.userProfile.description
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchUserProfile(id));
  }, [dispatch, id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputRef.current) {
      if (!inputRef.current.value) return;
      setEdit(false);
      dispatch(updateUserProfileThunk(id, undefined, inputRef.current?.value));
      dispatch(fetchUserProfile(id));
    }
  };

  const handleUpload = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", event.target.image.files[0]);

    try {
      const response = await axios.post(
        "http://localhost:3030/upload",
        formData,
        {
          headers: {
            id: id,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSubmit(event); // Submit form
      event.preventDefault();
    }
  };

  const handleTitleChange = (e: any) => {
    e.preventDefault();
    if (titleRef.current) {
      if (!titleRef.current.value) return;
      setEditTitle(false);
      dispatch(updateUserProfileThunk(id, titleRef.current?.value, undefined));
      dispatch(fetchUserProfile(id));
    }
  };

  return (
    <div className="flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto no-scrollbar">
      <div className="mx-auto max-w-md md:max-w-lg">
        <div className="mx-auto mt-4 space-y-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                {!imgEdit ? (
                  <Dialog>
                    <DialogTrigger>
                      <div className="flex rounded-full object-cover overflow-hidden h-[100px] w-[100px]">
                        <Image
                          src={
                            dogImg
                              ? dogImg
                              : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                          }
                          width={100}
                          height={100}
                          className="rounded-full object-cover cursor-pointer hover:opacity-80 transition duration-150 ease-in-out transform hover:scale-110 hover:rotate-12"
                          alt="user-image"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload an image of your dog!</DialogTitle>
                        <DialogDescription>
                          <form
                            encType="multipart/form-data"
                            onSubmit={handleUpload}
                            className="flex  items-center justify-center mt-2 space-x-2"
                          >
                            <Input type="file" name="image" />
                            <Button
                              type="submit"
                              onClick={() => setImgEdit(false)}
                            >
                              Upload
                            </Button>
                          </form>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ) : null}
                <div className="space-y-2">
                  <CardTitle>{name}</CardTitle>
                  <CardDescription>
                    {editTitle ? (
                      <form onSubmit={handleTitleChange}>
                        <input
                          type="text"
                          name="title"
                          placeholder={`Describe your dog title`}
                          className="border-none outline-none"
                          ref={titleRef}
                        />
                      </form>
                    ) : null}
                  </CardDescription>

                  {!editTitle && (
                    <div className="flex gap-1 items-center text-gray-500">
                      {currProfile.userProfile.title}
                      <PencilIcon
                        size={10}
                        className="cursor-pointer"
                        onClick={() => setEditTitle(true)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!edit ? (
                `${currProfile.userProfile.description}`
              ) : (
                <form className="flex flex-1" onSubmit={handleSubmit}>
                  <textarea
                    placeholder={`Tell us about your dog! whoof!`}
                    className="rounded-sm h-[300px] bg-gray-100 flex-grow px-5 focus:outline-none"
                    ref={inputRef}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <button hidden type="submit">
                    Submit
                  </button>
                </form>
              )}
            </CardContent>
            <CardFooter>
              {" "}
              <div
                className="flex items-center gap-2 text-xs cursor-pointer"
                onClick={() => setEdit(true)}
              >
                <PencilIcon size={10} />
                <p>Edit Description!</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Profile;
