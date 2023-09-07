"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type userLoginActivity = {
  loginTime: string;
  logoutTime: string;
};

type Activity = Record<string, userLoginActivity>;

const LoginActivity = () => {
  const fetchLoginActivity = async () => {
    const response = await axios.get(
      "http://localhost:3030/admin/login-activity",
      {
        withCredentials: true,
      }
    );
    setLoginActivity(response.data.userActivity);
  };
  const [loginActivity, setLoginActivity] = useState<Activity>({});
  useEffect(() => {
    fetchLoginActivity();
  }, []);
  return (
    <div className="flex-grow h-[80vh] overflow-y-auto no-scrollbar">
      <Table>
        <TableCaption>A list of all users in the network</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">User ID</TableHead>
            <TableHead>Login Time</TableHead>
            <TableHead>Logout Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(loginActivity).map(([id, activity]) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{id}</TableCell>
              <TableCell>
                {new Date(parseInt(activity.loginTime, 10)).toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(parseInt(activity.loginTime, 10)).toLocaleString()}
              </TableCell>
              <TableCell>
                <Button>Log User Out</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LoginActivity;
