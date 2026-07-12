import Link from "next/link";
import { Brush } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 mt-auto">
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-4 max-w-sm">
          <Link href="/" className="flex items-center space-x-2">
            <Brush className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Artify Cloud</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            A premium digital art marketplace for creators and collectors to discover, buy, and sell exclusive digital artworks.
          </p>
        </div>
        
        <div className="flex gap-12">
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">Platform</h3>
            <Link href="/marketplace" className="text-sm text-muted-foreground hover:text-primary transition-colors">Marketplace</Link>
            <Link href="/dashboard/artist" className="text-sm text-muted-foreground hover:text-primary transition-colors">For Artists</Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">Company</h3>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
      <div className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Artify Cloud. All rights reserved.
      </div>
    </footer>
  );
}
