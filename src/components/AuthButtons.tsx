"use client";

import { useHexclaveApp } from "@hexclave/next";
import { LogIn, LogOut } from "lucide-react";
import { buttonVariants } from "./ui/button";

export function AuthButtons({ signedIn }: { signedIn: boolean }) {
  const app = useHexclaveApp();

  if (signedIn) {
    return (
      <button
        type="button"
        onClick={() => app.redirectToSignOut()}
        className={buttonVariants({
          variant: "outline",
          className: "flex items-center gap-2",
        })}
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden lg:inline">Sign Out</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => app.redirectToSignIn()}
      className={buttonVariants({
        variant: "ghost",
        className: "flex items-center gap-2",
      })}
    >
      <LogIn className="w-4 h-4" />
      <span className="hidden lg:inline">Sign In</span>
    </button>
  );
}
