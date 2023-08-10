import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { selectAuthState } from "@/store/slicers/authSlice";
import Link from "next/link";

type AuthBarrierProps = {
  children: ReactNode;
};

const AuthBarrier: React.FC<AuthBarrierProps> = ({ children }) => {
  const isAuthenticated = useSelector(selectAuthState);
  const router = useRouter();

  if (!isAuthenticated) {
    <Link href="/login">
      <a>Redirecting to login...</a>
    </Link>;
  }

  return <>{children}</>;
};

export default AuthBarrier;
