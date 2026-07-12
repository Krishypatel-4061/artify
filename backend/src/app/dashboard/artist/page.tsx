import { db } from "@/services/database.service";
export const dynamic = 'force-dynamic';
import { ArtworkCard } from "@/components/shared/ArtworkCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PlusCircle, DollarSign, Image as ImageIcon, TrendingUp } from "lucide-react";

export default async function ArtistDashboard() {
  // Hardcoded for placeholder auth
  const artistId = "artist-1";
  const artworks = await db.getArtworksByArtist(artistId);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Artist Dashboard</h1>
          <p className="text-muted-foreground">Manage your artworks and track your sales.</p>
        </div>
        <Link href="/dashboard/artist/upload" className={buttonVariants({})}>
          <PlusCircle className="mr-2 h-4 w-4" /> Upload New Artwork
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,250.00</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Artworks</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{artworks.length}</div>
            <p className="text-xs text-muted-foreground">+2 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Your Listed Artworks</h2>
        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed rounded-lg bg-muted/30">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No artworks yet</h3>
            <p className="text-muted-foreground mb-6">Start selling your digital art today.</p>
            <Link href="/dashboard/artist/upload" className={buttonVariants({})}>Upload Your First Piece</Link>
          </div>
        )}
      </div>
    </div>
  );
}
