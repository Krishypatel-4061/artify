import { db } from "@/services/database.service";
import { ArtworkCard } from "@/components/shared/ArtworkCard";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { 
  PlusCircle, 
  Share2, 
  Palette,
  Heart,
  Plus,
  Users,
  Wallet,
  Globe,
  SlidersHorizontal,
  BadgeCheck
} from "lucide-react";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const artistId = resolvedParams.id;
  const artworks = await db.getArtworksByArtist(artistId);

  // In a real app we'd fetch the user profile here. 
  // Custom metadata for high-fidelity representation of Alex Rivers
  const isAlex = artistId === "68c2e21d-1618-4b16-845a-bf6ee1cc3c80";
  
  const artist = {
    name: isAlex ? "Alex Rivers" : (artworks.length > 0 ? artworks[0].artistName : "AetherDesign_"),
    handle: isAlex ? "@arivers_art" : "@aether_design",
    role: isAlex ? "Digital Surrealist & Creative Technologist" : "Procedural Generator & 3D Sculptor",
    bio: isAlex 
      ? "Exploring the intersection of generative algorithms and organic forms. Creating high-fidelity assets for the next generation of digital creators."
      : "Visualizing mathematical models, organic systems, and translucent depths. Creating premium glassmorphic digital art masterpieces.",
    avatar: isAlex 
      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      : "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    coverGradient: isAlex
      ? "from-pink-500 via-purple-600 to-indigo-500"
      : "from-blue-600 via-indigo-600 to-purple-600",
    stats: {
      uploaded: isAlex ? 124 : 45,
      followers: isAlex ? "12.8k" : "1.2k",
      revenue: isAlex ? "48.2 ETH" : "15.4 ETH",
      collected: isAlex ? 15 : 4
    }
  };

  // If no artworks and not Alex, just throw a 404
  if (artworks.length === 0 && !isAlex && artistId !== "artist-2") {
    notFound();
  }

  // Filter artworks by status "Published" for profile gallery display
  const publishedArtworks = artworks.filter(a => a.status === "Published");

  return (
    <div className="bg-background text-foreground min-h-screen pb-16">
      
      {/* 1. Header Banner */}
      <div className="container mx-auto px-4 md:px-6 pt-6">
        <div className={`w-full h-52 md:h-64 rounded-3xl bg-gradient-to-r ${artist.coverGradient} relative overflow-hidden shadow-lg`}>
          <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>

      {/* 2. Overlapping Profile Card */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 -mt-20 sm:-mt-24 max-w-3xl">
        <div className="bg-card/85 dark:bg-card/75 border border-border/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-5">
          {/* Avatar Area */}
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-background mx-auto bg-muted shadow-md group">
            <Image
              src={artist.avatar}
              alt={artist.name}
              fill
              sizes="(max-width: 640px) 96px, 112px"
              className="object-cover rounded-full"
            />
            {/* Active status indicator */}
            <span className="absolute bottom-1 right-1 h-4 w-4 bg-green-500 border-2 border-background rounded-full animate-pulse" />
          </div>

          {/* Name & Title */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground flex items-center justify-center gap-1.5">
              {artist.name} <BadgeCheck className="h-6 w-6 text-primary fill-primary/10 shrink-0" />
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-semibold">
              {artist.handle} &bull; <span className="text-primary">{artist.role}</span>
            </p>
          </div>

          {/* Bio text */}
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto font-medium">
            {artist.bio}
          </p>

          {/* Socials & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-3">
              {isAlex && (
                <Link href="/dashboard/artist/upload" className={`${buttonVariants({})} h-9 rounded-xl text-xs font-bold gap-1.5 shadow-lg shadow-primary/20`}>
                  <PlusCircle className="h-4 w-4" /> Upload Work
                </Link>
              )}
              <button className={`${buttonVariants({ variant: "outline" })} h-9 rounded-xl text-xs font-bold gap-1.5`}>
                <Share2 className="h-4 w-4" /> Share Profile
              </button>
            </div>
            
            {/* Social Icons separator */}
            <div className="hidden sm:block h-4 w-px bg-border/40" />

            <div className="flex items-center gap-3 text-muted-foreground">
              <button className="hover:text-primary transition-colors" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button className="hover:text-primary transition-colors" aria-label="Instagram">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </button>
              <button className="hover:text-primary transition-colors" aria-label="Website"><Globe className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Stats Row */}
      <div className="container mx-auto px-4 md:px-6 py-10 max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border/40 p-4 rounded-2xl flex items-center gap-3.5">
          <div className="h-9 w-9 bg-primary/10 text-primary flex items-center justify-center rounded-xl shrink-0">
            <Palette className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Artworks</span>
            <span className="text-base font-black text-foreground block mt-0.5">{artist.stats.uploaded}</span>
          </div>
        </div>

        <div className="bg-card border border-border/40 p-4 rounded-2xl flex items-center gap-3.5">
          <div className="h-9 w-9 bg-blue-500/10 text-blue-600 flex items-center justify-center rounded-xl shrink-0">
            <Users className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Followers</span>
            <span className="text-base font-black text-foreground block mt-0.5">{artist.stats.followers}</span>
          </div>
        </div>

        <div className="bg-card border border-border/40 p-4 rounded-2xl flex items-center gap-3.5">
          <div className="h-9 w-9 bg-violet-500/10 text-violet-600 flex items-center justify-center rounded-xl shrink-0">
            <Wallet className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Sales Revenue</span>
            <span className="text-base font-black text-foreground block mt-0.5">{artist.stats.revenue}</span>
          </div>
        </div>

        <div className="bg-card border border-border/40 p-4 rounded-2xl flex items-center gap-3.5">
          <div className="h-9 w-9 bg-pink-500/10 text-pink-600 flex items-center justify-center rounded-xl shrink-0">
            <Heart className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Collected</span>
            <span className="text-base font-black text-foreground block mt-0.5">{artist.stats.collected}</span>
          </div>
        </div>
      </div>

      {/* 4. Tab Navigation and Sorting */}
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-b border-border/20 pb-4 mb-8">
          {/* Tabs Pill switcher */}
          <div className="inline-flex rounded-xl border border-border/40 bg-muted/40 p-0.5 text-xs font-bold text-muted-foreground self-start">
            <button className="px-4 py-2 rounded-lg bg-background text-primary shadow-sm border border-border/20">Gallery</button>
            <button className="px-4 py-2 rounded-lg hover:text-foreground transition-colors">Purchased Art</button>
            <button className="px-4 py-2 rounded-lg hover:text-foreground transition-colors">Settings</button>
          </div>

          {/* Gallery controls / Sort Pills */}
          <div className="flex items-center gap-2 text-xs font-semibold self-end">
            <span className="text-muted-foreground mr-1.5 flex items-center gap-1"><SlidersHorizontal className="h-3.5 w-3.5" /> Sort:</span>
            <button className="px-3.5 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">Latest</button>
            <button className="px-3.5 py-1.5 rounded-lg bg-card border border-border/40 text-muted-foreground hover:text-foreground">Popular</button>
          </div>
        </div>

        {/* 5. Artwork Grid */}
        {publishedArtworks.length > 0 ? (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {publishedArtworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
            
            <button className="mx-auto block text-sm font-bold text-primary hover:text-primary/80 hover:underline transition-colors pt-4">
              Load More Artworks
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border/50 rounded-3xl bg-card">
            <Palette className="h-10 w-10 text-muted-foreground mb-3 animate-bounce" />
            <h3 className="font-bold text-lg mb-1 text-foreground">No artworks published yet</h3>
            <p className="text-sm text-muted-foreground">List a digital asset on the marketplace to populate this collection.</p>
          </div>
        )}
      </div>

    </div>
  );
}
