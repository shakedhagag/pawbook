"use client";
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import FunFacts from "@/app/additional/fun-facts/[facts]";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <div className="flex bg-gray-100 overflow-hidden">
          <Sidebar />
          <FunFacts />
          <Widgets />
        </div>
      </main>
    </div>
  );
}
