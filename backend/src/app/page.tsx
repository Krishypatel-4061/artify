import Link from "next/link";
export const dynamic = 'force-dynamic';
import { Button, buttonVariants } from "@/components/ui/button";
import { db } from "@/services/database.service";
import { ArtworkCard } from "@/components/shared/ArtworkCard";
import { ArrowRight, Paintbrush, ShieldCheck, Zap } from "lucide-react";

export default async function Home() {
  const artworks = await db.getArtworks();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-24 md:py-32 lg:py-40 bg-gradient-to-b from-primary/5 via-background to-background border-b overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Discover Premium Digital Art
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            A curated marketplace for artists to showcase their masterpieces and collectors to find exclusive, high-quality digital artworks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace" className={buttonVariants({ size: "lg", className: "h-12 px-8 text-base font-semibold" })}>
              Explore Marketplace <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/dashboard/artist" className={buttonVariants({ size: "lg", variant: "outline", className: "h-12 px-8 text-base font-semibold" })}>Start Selling</Link>
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="py-20 px-4 container mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Artworks</h2>
            <p className="text-muted-foreground">Discover this week's most loved digital creations.</p>
          </div>
          <Link href="/marketplace" className={buttonVariants({ variant: "ghost", className: "hidden sm:flex" })}>View All</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30 border-t border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Artify Cloud?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Paintbrush className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Curated Collection</h3>
              <p className="text-muted-foreground">Every artwork is reviewed to ensure a premium standard and quality.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Transactions</h3>
              <p className="text-muted-foreground">Your payments are secure, and digital ownership is guaranteed.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Access</h3>
              <p className="text-muted-foreground">Download your purchased digital art instantly in high resolution.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
