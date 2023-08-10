"use client";
import { useEffect } from "react";
import Header from "../components/Header";
import { rehydrateAuth, selectAuthState } from "@/store/slicers/authSlice";
import { useDispatch } from "@/store/hooks";
import AuthBarrier from "../components/AuthBarrier";
import { useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthState);
  console.log(
    "🚀 ~ file: page.tsx:12 ~ Home ~ isAuthenticated:",
    isAuthenticated
  );

  useEffect(() => {
    dispatch(rehydrateAuth());
  }, [dispatch]);
  return (
    <AuthBarrier>
      <div>
        <Header />
        <main>
          {/* SIDEBAR */}
          {/* FEED */}
          {/* WIDGETS */}
        </main>
      </div>
    </AuthBarrier>
  );
}
