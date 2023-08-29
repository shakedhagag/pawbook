"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logIn } from "@/store/slicers/authSlice";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
}

export function UserAuthForm({ className, type, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:3030/${type}`, {
        email: email,
        password: password,
        name: name,
      });
      if (response.data.token) {
        const bearerToken = `Bearer ${response.data.token}`;
        localStorage.setItem("USER_TOKEN", bearerToken);
      }
      setTimeout(() => {
        setIsLoading(false);
        dispatch(logIn(response.data));
      }, 2000);
    } catch (error) {
      // Insert pop up here
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              placeholder=""
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {type === "signup" && (
              <Input
                id="name"
                placeholder="Full Name"
                type="text"
                autoCapitalize="words"
                autoCorrect="off"
                disabled={isLoading}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
          </div>
          <Button
            variant={"secondary"}
            disabled={isLoading}
            className="bg-blue-500"
          >
            {isLoading && (
              <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            {type === "login" ? "Sign In" : "Sign Up"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  );
}
