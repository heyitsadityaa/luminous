"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { ModeToggle } from "../mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRole } from "@/store/useRole";
import { useIsMobile } from "@/hooks/use-mobile";
import useIsAdmin from "@/hooks/useIsAdmin";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const DashboardNavbar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const role = useRole((state) => state.role);
  const isMobile = useIsMobile();
  const isAdmin = useIsAdmin();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSignOut = async () => {
    localStorage.removeItem("ledger-role");

    const cookieStore = (
      window as unknown as {
        cookieStore?: {
          delete: (options: { name: string; path: string }) => Promise<void>;
        };
      }
    ).cookieStore;

    if (cookieStore) {
      await cookieStore.delete({
        name: "ledger-role",
        path: "/",
      });
    }

    router.push("/");
  };

  return (
    <nav className="h-16 top-0 z-50 sticky">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background gap-4">
        {/* Left side - Logo */}
        <div className="flex-1">
          {isMobile ? (
            <Image
              src="/logo.svg"
              alt="Logo"
              width={24}
              height={24}
              loading="eager"
            />
          ) : theme === "dark" ? (
            <Image
              src="/logo-dark.svg"
              alt="Logo Dark"
              width={150}
              height={150}
              loading="eager"
            />
          ) : (
            <Image
              src="/logo-light.svg"
              alt="Logo Light"
              width={150}
              height={150}
              loading="eager"
            />
          )}
        </div>

        {/* Right side - Theme Toggle and Account */}
        <div className="flex items-center justify-end gap-5">
          <ModeToggle variant="outline" className="rounded-lg" />

          <Button
            variant="outline"
            className="rounded-lg hidden md:inline-flex items-center gap-2 px-3"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={isAdmin ? "default" : "outline"}
                className="border rounded-full size-10 relative"
              >
                <CircleUser className="w-5 h-5 cursor-pointer hover:text-primary transition" />
                <span
                  className={`absolute -top-2 -right-2 text-[9px] font-bold px-1 py-0 rounded-full leading-4 ${
                    isAdmin
                      ? "bg-primary border border-black text-primary-foreground"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  {isAdmin ? "Admin" : "Viewer"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuItem className="py-3">
                  <div className="flex flex-col flex-1">
                    <span className="font-semibold">Aditya Prakash</span>
                    <span className="text-xs text-muted-foreground">
                      {role === "admin" ? "Admin" : "Viewer"}
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3">Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="py-3">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
