"use client";
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Friends from "@/components/Friends";
import Widgets from "@/components/Widgets";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthInfo } from "../../store/slicers/authSlice";
import { AppDispatch } from "../../store/store";
import { fetchFriends, selectFriends } from "../../store/slicers/friendsSlice";

export default function Home() {
  const currentUser = useSelector(selectAuthInfo);
  const currUserFriends = useSelector(selectFriends);
  const id = currentUser.id;
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (!id) return;
    dispatch(fetchFriends(id));
  }, [dispatch, id]);

  return (
    <div>
      <Header />
      <main>
        <div className="flex bg-gray-100 overflow-hidden">
          <Sidebar />
          <Friends friendsList={currUserFriends} />
          <Widgets />
        </div>
        {/* WIDGETS */}
      </main>
    </div>
  );
}
