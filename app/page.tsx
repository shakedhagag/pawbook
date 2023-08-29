"use client";
import Header from "../components/Header";
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
