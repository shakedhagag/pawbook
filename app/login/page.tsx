"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "@/store/slicers/authSlice";
import { logIn } from "@/store/slicers/authSlice";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3030/login", {
        email: email,
        password: password,
      });

      console.log("Login successful:", response.data);
      if (response.data.token) {
        localStorage.setItem("USER_TOKEN", response.data.token);
      }
      dispatch(logIn(response.data));
    } catch (error) {
      // Insert pop up here
    }
  };
  return (
    <div className="p-20 grid place-items-center bg-gray-50 sm:px-6 lg:px-8 py-12 px-4 ">
      <Image
        src="https://seeklogo.com/images/P/paw-paw-logo-9611469C33-seeklogo.com.png"
        width={200}
        height={200}
        alt="login logo"
        priority={true}
      />
      <div className="flex justify-center">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      <h1 className="p-5 bg-cyan-500 rounded-full text-center cursor-pointer text-white m-10">
        Please Log in
      </h1>
    </div>
  );
}
