"use client";
import { useEffect } from "react";
import Header from "../components/Header";
import { selectAuthState } from "@/store/slicers/authSlice";
import { useDispatch } from "@/store/hooks";
import AuthBarrier from "../components/AuthBarrier";
import { useSelector } from "react-redux";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <div className="flex bg-gray-100 overflow-hidden">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
        {/* WIDGETS */}
      </main>
    </div>
  );
}
