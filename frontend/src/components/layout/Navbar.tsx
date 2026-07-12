"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Brush, Moon, Sun, Search, User, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/dashboard/artist", label: "Dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between relative">
        {/* Left Side: Navigation Links */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 hover:text-primary ${
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Center: Brand Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-200">
              <Brush className="h-4.5 w-4.5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
              Artify Cloud
            </span>
          </Link>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
            <Search className="h-4.5 w-4.5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          {/* User Profile Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button className="h-9 w-9 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition-colors focus:outline-none">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="User Avatar"
                    width={36}
                    height={36}
                    className="object-cover h-full w-full"
                  />
                </button>
              }
            />
            <DropdownMenuContent align="end" className="w-56 mt-2 p-1.5 border border-border/50 bg-background/95 backdrop-blur-md rounded-xl shadow-xl">
              <div className="px-2.5 py-2 border-b border-border/40 mb-1">
                <p className="text-sm font-semibold">Alex Rivers</p>
                <p className="text-xs text-muted-foreground font-mono font-normal">alex@artify.cloud</p>
              </div>
              <DropdownMenuItem render={<Link href="/profile/68c2e21d-1618-4b16-845a-bf6ee1cc3c80" className="flex items-center w-full gap-2 px-2.5 py-1.5 text-sm rounded-lg hover:bg-muted text-foreground" />}>
                <User className="h-4 w-4 text-muted-foreground" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/dashboard/artist" className="flex items-center w-full gap-2 px-2.5 py-1.5 text-sm rounded-lg hover:bg-muted text-foreground" />}>
                <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                Artist Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/dashboard/artist/upload" className="flex items-center w-full gap-2 px-2.5 py-1.5 text-sm rounded-lg hover:bg-muted text-foreground" />}>
                <Settings className="h-4 w-4 text-muted-foreground" />
                Upload Artwork
              </DropdownMenuItem>
              <DropdownMenuItem className="border-t border-border/40 mt-1" render={<Link href="/login" className="flex items-center w-full gap-2 px-2.5 py-1.5 text-sm text-destructive rounded-lg hover:bg-destructive/10" />}>
                <LogOut className="h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
