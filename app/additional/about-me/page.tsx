"use client";
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import AboutMe from "./[about]";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <div className="flex bg-gray-100 overflow-hidden">
          <Sidebar />
          <AboutMe />
          <Widgets />
        </div>
      </main>
    </div>
  );
}
