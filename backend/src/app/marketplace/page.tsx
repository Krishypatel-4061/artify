import { db } from "@/services/database.service";
export const dynamic = 'force-dynamic';
import { ArtworkCard } from "@/components/shared/ArtworkCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default async function MarketplacePage() {
  const artworks = await db.getArtworks();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Marketplace</h1>
          <p className="text-muted-foreground text-lg">Browse and discover premium digital artworks.</p>
        </div>
        
        <div className="w-full md:w-auto relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search artworks..." 
            className="pl-9 h-11 bg-muted/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
}
