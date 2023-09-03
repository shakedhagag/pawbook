"use client";
import React from "react";
import Widgets from "@/components/Widgets";
import AdminPanel from "./[adminPanel]";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import { SidebarNav } from "./[adminNavbar]";

const sidebarNavItems = [
  {
    title: "Users",
    href: "/authenticate/admin-panel/users",
  },
  {
    title: "Account",
    href: "/examples/forms/account",
  },
  {
    title: "Appearance",
    href: "/examples/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/examples/forms/notifications",
  },
  {
    title: "Display",
    href: "/examples/forms/display",
  },
];

interface Props {
  children: React.ReactNode;
}

export default function AdminPanelLayout({ children }: Props) {
  return (
    <>
      <Header />
      <div className="hidden space-y-6 p-10 pb-16 md:block flex-grow">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
          <p className="text-muted-foreground">
            Manage our community carefully
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
