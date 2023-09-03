"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import {
  setAuthState,
  selectAuthState,
  logIn,
  setCurrentUser,
  selectAuthInfo,
} from "@/store/slicers/authSlice";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

type AuthBarrierProps = {
  children: ReactNode;
};

const AuthBarrier: React.FC<AuthBarrierProps> = ({ children }) => {
  const router = useRouter();
  let path: string = usePathname();
  const dispatch = useDispatch();
  let isAuthenticated: boolean = useSelector(selectAuthState);
  let currentUser: any = useRef(null);
  const info = useSelector(selectAuthInfo);

  useEffect(() => {
    const token = localStorage.getItem("USER_TOKEN");
    if (token) {
      verifyToken(token, router, dispatch, path);
    } else {
      router.push("/authenticate/login");
    }
  }, [dispatch, isAuthenticated, path, router]);

  return <>{children}</>;
};

const verifyToken = async (
  token: string | null,
  router: AppRouterInstance,
  dispatch: Dispatch<AnyAction>,
  path: string
) => {
  try {
    const response = await axios.get("http://localhost:3030/verify-token", {
      withCredentials: true,
      headers: {
        Authorization: token,
      },
    });
    let currentUser = response.data.user;

    const currentUserId = response.data.id;
    currentUser["id"] = currentUserId;
    if (currentUser) {
      dispatch(setCurrentUser(currentUser));
      dispatch(setAuthState(true));
    }
    const isOnLoginPage = path === "/authenticate/login";
    isOnLoginPage ? (path = "/") : null;
    router ? router.push(path) : null;
    return currentUser;
  } catch (error) {
    router.push("/authenticate/login");
  }
};

export default AuthBarrier;
