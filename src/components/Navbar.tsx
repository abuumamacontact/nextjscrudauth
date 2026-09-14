import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { HomeIcon, Sprout } from "lucide-react";
import ModeToggle from "./ModxeToggle";
import { hexclaveServerApp } from "@/hexclave/server";
import { UserButton } from "@hexclave/next";
import { AuthButtons } from "./AuthButtons";

async function Navbar() {
  const user =  await hexclaveServerApp.getUser();

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/*Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold font-mono tracking-wider"
            >
              🌱 Plantventory
            </Link>
          </div>

          {/*Navbar components*/}

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/plants"
              className={buttonVariants({
                variant: "ghost",
                className: "flex items-center gap-2",
              })}
            >
              <Sprout className="w-4 h-4" />
              <span className="hidden lg:inline">Plants</span>
            </Link>

            <Link
              href="/"
              className={buttonVariants({
                variant: "ghost",
                className: "flex items-center gap-2",
              })}
            >
              <HomeIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Home</span>
            </Link>

            <ModeToggle />

            {user ? (
              <>
                <AuthButtons signedIn />

                <UserButton />

              </>
            ) : (
              <>
                <AuthButtons signedIn={false} />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;