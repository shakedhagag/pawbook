import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { UserAuthForm } from "@/app/authenticate/components/UserAuthForm";

export const metadata: Metadata = {
  title: "PawBook",
  description: "Register to enjoy our community!",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
        <div className="grid place-items-center lg:p-8">
          <Image
            src="/logo.png"
            width={200}
            height={200}
            alt="logo"
            className="mb-4"
          />
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm type="login" />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Not a member? Sign up{" "}
              <Link
                href="/authenticate/register"
                className="underline underline-offset-4 hover:text-primary"
              >
                here
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
