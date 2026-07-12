import Image from "next/image";
import Link from "next/link";
import { Artwork } from "@/services/database.service";
import { Heart } from "lucide-react";
import * as React from "react";

export function ArtworkCard({ artwork, priority }: { artwork: Artwork, priority?: boolean }) {
  const priceDisplay = artwork.ethPrice ? `${artwork.ethPrice.toFixed(2)} ETH` : `$${artwork.price.toFixed(2)}`;
  
  return (
    <div className="group flex flex-col bg-card border border-border/40 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Link href={`/artwork/${artwork.id}`} className="block h-full w-full relative">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Link>
        
        {/* Top-Left Category Badge */}
        {artwork.tag && (
          <div className="absolute top-3 left-3 bg-background/80 dark:bg-background/90 text-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm border border-border/30">
            {artwork.tag}
          </div>
        )}
        
        {/* Top-Right Heart Icon Button */}
        <button 
          className="absolute top-3 right-3 h-8 w-8 bg-background/80 dark:bg-background/90 text-muted-foreground hover:text-destructive flex items-center justify-center rounded-full backdrop-blur-md shadow-sm border border-border/30 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Save artwork"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Info Body */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="flex justify-between items-start gap-2 mb-3">
          <Link href={`/artwork/${artwork.id}`} className="flex-1">
            <h3 className="font-bold text-base text-foreground leading-snug line-clamp-1 group-hover:text-primary transition-colors duration-200">
              {artwork.title}
            </h3>
          </Link>
          <div className="text-right shrink-0">
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-semibold block">Price</span>
            <span className="text-sm font-bold text-primary block mt-0.5">{priceDisplay}</span>
          </div>
        </div>

        {/* Creator Row */}
        <div className="flex items-center gap-2 border-t border-border/20 pt-3 mt-auto">
          <div className="h-5.5 w-5.5 rounded-full overflow-hidden bg-primary/10 border border-primary/20 shrink-0">
            <Image
              src={artwork.artistId === "artist-2" 
                ? "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80" 
                : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"}
              alt={artwork.artistName}
              width={22}
              height={22}
              className="object-cover h-full w-full"
            />
          </div>
          <Link href={`/profile/${artwork.artistId}`} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors line-clamp-1">
            @{artwork.artistName.toLowerCase().replace(/[^a-z0-9]/g, "")}
          </Link>
        </div>
      </div>
    </div>
  );
}
