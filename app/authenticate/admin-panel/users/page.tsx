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

type User = {
  id: string;
  dog_img: string;
};

type Users = Record<string, User>;

const Users = () => {
  const handleDeleteUser = async (id: string) => {
    try {
      const response = await axios.delete(
        "http://localhost:3030/admin/remove-user",
        {
          withCredentials: true,
          data: { id: id },
        }
      );
      fetchAllUsers();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllUsers = async () => {
    const response = await axios.get("http://localhost:3030/all-users", {
      withCredentials: true,
    });
    setUsers(response.data);
  };
  const [users, setUsers] = useState<Users>({});
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="flex-grow h-screen overflow-y-auto no-scrollbar">
      <Table>
        <TableCaption>A list of all users in the network</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(users).map(([name, userDetails]) => (
            <TableRow key={userDetails.id}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell>{userDetails.id}</TableCell>
              <TableCell>
                <div className="flex rounded-full">
                  <Image
                    className="rounded-full object-cover cursor-pointer hover:opacity-80 transition duration-150 ease-in-out transform hover:scale-110 hover:rotate-12 w-10 h-10"
                    src={userDetails.dog_img}
                    alt={name}
                    width={40}
                    height={40}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteUser(userDetails.id)}>
                  Delete User
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
