import Link from "next/link";
import { Brush } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4 md:col-span-2 max-w-sm">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
              <Brush className="h-4.5 w-4.5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
              Artify Cloud
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The world&apos;s premier destination for high-fidelity digital art and glassmorphic assets. Supporting creators globally.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-sm tracking-wide uppercase text-foreground">Company</h3>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Press</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-sm tracking-wide uppercase text-foreground">Support</h3>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Help Center</Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Community Guidelines</Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Safety Center</Link>
        </div>
      </div>

      <div className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} Artify Cloud. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
