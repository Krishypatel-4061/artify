import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Brush, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Brush className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden sm:inline-block">Artify Cloud</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/marketplace" className="transition-colors hover:text-primary">
            Marketplace
          </Link>
          <Link href="/dashboard/artist" className="transition-colors hover:text-primary">
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2">
            <Link href="/login" className={buttonVariants({ variant: "ghost" })}>Log in</Link>
            <Link href="/register" className={buttonVariants({})}>Sign up</Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem render={<Link href="/marketplace" />}>Marketplace</DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/dashboard/artist" />}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/login" />}>Log in</DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/register" />}>Sign up</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
