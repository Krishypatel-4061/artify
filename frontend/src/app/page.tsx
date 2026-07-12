import * as React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { db } from "@/services/database.service";
import { ArtworkCard } from "@/components/shared/ArtworkCard";
import { 
  ArrowRight, 
  Paintbrush, 
  ShieldCheck, 
  Zap, 
  Wallet, 
  Compass, 
  TrendingUp, 
  CheckCircle2, 
  Star, 
  ChevronRight,
  Sparkles,
  Users
} from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const artworks = await db.getArtworks();
  const featured = artworks.slice(0, 4);

  const steps = [
    {
      icon: <Wallet className="h-6 w-6 text-primary" />,
      title: "Connect Wallet",
      description: "Securely link your web3 wallet to authorize bidding, buying, and listing artworks."
    },
    {
      icon: <Compass className="h-6 w-6 text-primary" />,
      title: "Discover Art",
      description: "Explore curated collections across diverse genres, digital paintings, and 3D renders."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Place Bids",
      description: "Submit offers or purchase pieces instantly with fully audited smart contracts."
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
      title: "Earn & Collect",
      description: "Own verified original creations, showcase your gallery, and receive creator royalties."
    }
  ];

  const trendingArtists = [
    {
      name: "Alex Rivers",
      handle: "arivers_art",
      artworksCount: 124,
      volume: "142.5 ETH",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      verified: true
    },
    {
      name: "AetherDesign_",
      handle: "aether_design",
      artworksCount: 45,
      volume: "90.2 ETH",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
      verified: true
    },
    {
      name: "CyberPunkDude",
      handle: "cyberpunk_dude",
      artworksCount: 82,
      volume: "75.0 ETH",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      verified: false
    },
    {
      name: "Julia Vane",
      handle: "julia_vane",
      artworksCount: 37,
      volume: "52.4 ETH",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      verified: true
    }
  ];

  const testimonials = [
    {
      quote: "Artify has completely changed how I sell my digital creations. The platform aesthetics, layout options, and swift transaction processing are unmatched.",
      author: "David K.",
      role: "Digital Surrealist",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80"
    },
    {
      quote: "As a collector, I appreciate having verified provenance info directly on the artwork page. The interface makes finding high-fidelity assets a delight.",
      author: "Elena Rossi",
      role: "Fine Art Collector",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80"
    },
    {
      quote: "The 3D render categorization and specific metadata detailing formats like PSD/PNG are extremely helpful for professional creative design workflows.",
      author: "Liam Chen",
      role: "3D Art Director",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80"
    }
  ];

  const categories = ["All", "Abstract", "3D Render", "Surrealism", "Vector", "Illustration", "Photography", "Cyberpunk"];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative px-4 py-20 md:py-28 lg:py-36 bg-gradient-to-b from-primary/5 via-background to-background border-b border-border/20 overflow-hidden">
        {/* Decorative Blurs */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
              <Sparkles className="h-3.5 w-3.5" />
              The Future of Digital Art
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Discover, Buy & Sell <br />
              <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                Digital Art Masterpieces
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Join the leading digital art marketplace where creators showcase their work and collectors find high-fidelity verified assets. Designed for a premium digital experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <Link href="/marketplace" className={`${buttonVariants({ size: "lg" })} h-12 px-8 rounded-xl font-semibold text-sm flex items-center justify-center gap-2`}>
                Explore Marketplace <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/dashboard/artist" className={`${buttonVariants({ size: "lg", variant: "outline" })} h-12 px-8 rounded-xl font-semibold text-sm flex items-center justify-center`}>
                Sell Your Art
              </Link>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center gap-3 border-t border-border/30 pt-6 w-full">
              <div className="flex -space-x-3.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative h-9 w-9 rounded-full border-2 border-background overflow-hidden bg-muted">
                    <Image
                      src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?auto=format&fit=crop&w=80&q=80`}
                      alt="User Avatar"
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary" />
                Joined by <span className="font-bold text-foreground">15,000+</span> creators globally
              </div>
            </div>
          </div>

          {/* Hero Right Card Showcase */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Visual Glassmorphic Showcase card */}
            <div className="relative group w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden bg-muted border border-border/30 shadow-2xl hover:scale-[1.02] hover:-rotate-1 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
                alt="Luminous Etherea Showcase"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Bottom Translucent Info Panel */}
              <div className="absolute bottom-4 left-4 right-4 bg-background/50 dark:bg-black/60 border border-white/10 backdrop-blur-xl p-4.5 rounded-2xl text-white shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="font-bold text-base text-white line-clamp-1">Luminous Etherea</h3>
                    <span className="text-[10px] text-zinc-300 font-medium">By @aetherdesign</span>
                  </div>
                  <div className="bg-primary/25 border border-primary/40 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase">
                    Featured
                  </div>
                </div>
                
                <div className="flex justify-between items-end border-t border-white/10 pt-3">
                  <div>
                    <span className="text-[9px] text-zinc-300 uppercase tracking-wider block">Current Price</span>
                    <span className="text-base font-extrabold text-white block mt-0.5">3.45 ETH</span>
                  </div>
                  <Link href="/artwork/luminous-etherea" className={`${buttonVariants({ size: "xs" })} rounded-lg font-semibold bg-white text-black hover:bg-zinc-200 transition-colors`}>
                    View Bid
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Nav Row */}
      <section className="py-8 bg-card border-b border-border/10 overflow-x-auto scrollbar-none">
        <div className="container mx-auto px-4 flex items-center justify-start md:justify-center gap-3">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-4.5 py-1.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 border ${
                index === 0
                  ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/10"
                  : "bg-background border-border/40 text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Featured Artworks Section */}
      <section className="py-20 px-4 container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">Featured Artworks</h2>
            <p className="text-muted-foreground">Handpicked premium digital assets from top creators.</p>
          </div>
          <Link href="/marketplace" className={`${buttonVariants({ variant: "outline" })} group flex items-center gap-1 text-sm font-semibold rounded-xl`}>
            Explore All <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((artwork, idx) => (
            <ArtworkCard key={artwork.id} artwork={artwork} priority={idx < 4} />
          ))}
        </div>
      </section>

      {/* 4. How Artify Works Section */}
      <section className="py-20 bg-muted/30 border-t border-b border-border/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">How Artify Works</h2>
            <p className="text-muted-foreground text-base">
              Four simple steps to start your journey in hosting a premium digital art collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={step.title} className="flex flex-col items-start p-6 bg-card rounded-2xl border border-border/40 hover:shadow-lg transition-all duration-300 group">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {React.cloneElement(step.icon, { className: "h-5 w-5 text-primary group-hover:text-white transition-colors" })}
                </div>
                <span className="text-[10px] text-primary font-bold tracking-widest uppercase mb-1 font-mono">Step 0{idx + 1}</span>
                <h3 className="text-lg font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trending Artists & Stats Section */}
      <section className="py-20 container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Trending Artists */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">Trending Artists</h2>
            <p className="text-muted-foreground mb-8">Top sales performers across the network this week.</p>
            
            <div className="space-y-4">
              {trendingArtists.map((artist, idx) => (
                <div key={artist.name} className="flex items-center justify-between p-4 bg-card hover:bg-muted/10 border border-border/30 rounded-xl transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-muted-foreground w-4">{idx + 1}</span>
                    <div className="relative h-10 w-10 rounded-full overflow-hidden border border-border/30">
                      <Image
                        src={artist.avatar}
                        alt={artist.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-foreground">{artist.name}</span>
                        {artist.verified && <span className="text-[10px] bg-primary/15 text-primary px-1.5 py-0.5 rounded-full font-bold">✓</span>}
                      </div>
                      <span className="text-xs text-muted-foreground">@{artist.handle}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Volume</span>
                    <span className="text-sm font-extrabold text-primary block mt-0.5">{artist.volume}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className={`${buttonVariants({ variant: "outline" })} w-full mt-6 rounded-xl font-semibold`}>
              Browse More Artists
            </button>
          </div>

          {/* Right Side: Quick Stats Box */}
          <div className="lg:col-span-5">
            <div className="h-full bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-extrabold tracking-tight mb-6 text-foreground leading-snug">
                  Artify is the fastest growing global art hub
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-primary block">150K+</span>
                    <span className="text-xs text-muted-foreground font-semibold mt-1 block">Artworks Listed</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-primary block">85K+</span>
                    <span className="text-xs text-muted-foreground font-semibold mt-1 block">Active Collectors</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-primary block">$4.2M</span>
                    <span className="text-xs text-muted-foreground font-semibold mt-1 block">Trading Volume</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-primary block">2.4s</span>
                    <span className="text-xs text-muted-foreground font-semibold mt-1 block">Average Sale Speed</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-primary/10">
                <Link href="/register" className={`${buttonVariants({})} w-full h-11 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25`}>
                  Get Started Now <ArrowRight className="h-4 w-4" />
                </Link>
                
                <div className="flex gap-4 justify-center items-center mt-5 text-[11px] text-muted-foreground font-semibold">
                  <div className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Artist Program</div>
                  <div className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Buyer Protection</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-20 bg-muted/20 border-t border-b border-border/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-foreground">What Our Community Says</h2>
            <p className="text-muted-foreground">
              Thousands of artists and collectors trust Artify Cloud for high-fidelity digital art transactions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testi, idx) => (
              <div key={idx} className="bg-card border border-border/30 p-6 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                <div>
                  <div className="flex gap-1.5 mb-4">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed italic mb-6">
                    &ldquo;{testi.quote}&rdquo;
                  </p>
                </div>
                
                <div className="flex items-center gap-3 border-t border-border/10 pt-4">
                  <div className="relative h-9 w-9 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={testi.avatar}
                      alt={testi.author}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-foreground block">{testi.author}</span>
                    <span className="text-[10px] text-muted-foreground font-medium block">{testi.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-20 container mx-auto px-4 max-w-5xl">
        <div className="bg-gradient-to-r from-primary to-violet-600 rounded-3xl p-8 md:p-14 text-white text-center relative overflow-hidden shadow-2xl">
          {/* Background circles */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-violet-400/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
              Ready to start your premium art collection?
            </h2>
            <p className="text-zinc-200 text-sm md:text-base mb-8 leading-relaxed max-w-lg">
              Join Artify Cloud today and begin discovering the next wave of digital art. Create your account or contact our sales division.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Link href="/register" className={`${buttonVariants({ size: "lg" })} h-12 px-8 rounded-xl font-bold bg-white text-zinc-900 hover:text-zinc-900 hover:bg-zinc-100 transition-colors flex items-center justify-center`}>
                Create Account
              </Link>
              <Link href="#" className={`${buttonVariants({ size: "lg", variant: "outline" })} h-12 px-8 rounded-xl font-bold border-white/20 text-white hover:bg-white/10 transition-colors flex items-center justify-center`}>
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
