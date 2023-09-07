"use client";
import React from "react";

import { PagesForm } from "./[pagesForm]";

export default function Home() {
  return (
    <div className="space-y-6 flex flex-grow overflow-y-auto no-scrollbar">
      <PagesForm />
    </div>
  );
}
