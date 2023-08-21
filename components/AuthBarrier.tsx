"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
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
  const dispatch = useDispatch();
  let isAuthenticated: boolean = useSelector(selectAuthState);
  let currentUser: any = useRef(null);
  const info = useSelector(selectAuthInfo);

  useEffect(() => {
    const token = localStorage.getItem("USER_TOKEN");
    if (token) {
      verifyToken(token, router, dispatch);
    } else {
      router.push("/login");
    }
  }, [dispatch, isAuthenticated, router]);

  return <>{children}</>;
};

const verifyToken = async (
  token: string | null,
  router: AppRouterInstance,
  dispatch: Dispatch<AnyAction>
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
    router ? router.push("/") : null;
    return currentUser;
  } catch (error) {
    router.push("/login");
  }
};

export default AuthBarrier;
