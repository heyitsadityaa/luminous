"use client"

import Image from "next/image";
import { useTheme } from "next-themes";
import { ModeToggle } from "./mode-toggle";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, LogOut, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";
import useIsAdmin from "@/hooks/useIsAdmin";

const DashboardNavbar = () => {
    const { theme } = useTheme();
    const router = useRouter();
    const role = useStore((state) => state.role);
    const isMobile = useIsMobile()
    const isAdmin = useIsAdmin()

    const handleSignOut = () => {
        localStorage.removeItem("ledger-role");
        document.cookie = "ledger-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        router.push("/");
    };

    return (
        <nav className="h-16">
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

                {/* Search in the center - centered on md and lg */}
                <div className="flex-1 px-2 flex justify-center">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search transactions..."
                            className="h-9 rounded-lg pl-9 w-full"
                        />
                    </div>
                </div>

                {/* Right side - Theme Toggle and Account */}
                <div className="flex items-center justify-end gap-3">
                    <ModeToggle variant="outline" className="rounded-lg" />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={isAdmin ? "default" : "outline"} className="border rounded-full size-10">
                                <CircleUser className="w-5 h-5 cursor-pointer hover:text-primary transition" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>
                                    Account
                                </DropdownMenuLabel>
                                <DropdownMenuItem className="py-3">
                                    <div className="flex flex-col flex-1">
                                        <span className="font-semibold">Aditya Prakash</span>
                                        <span className="text-xs text-muted-foreground">{role === "admin" ? "Admin" : "Viewer"}</span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="py-3">
                                    Settings
                                </DropdownMenuItem>
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
