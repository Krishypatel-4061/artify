import { db } from "@/services/database.service";
import { ArtworkCard } from "@/components/shared/ArtworkCard";
import { notFound } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const artistId = resolvedParams.id;
  const artworks = await db.getArtworksByArtist(artistId);

  // In a real app we'd fetch the user profile here. 
  // Using the first artwork's artistName for demonstration.
  const artistName = artworks.length > 0 ? artworks[0].artistName : "Unknown Artist";

  if (artworks.length === 0 && artistId !== "artist-1") {
    // Just a placeholder check for empty states
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="h-32 w-32 rounded-full bg-primary/20 flex items-center justify-center text-4xl font-bold text-primary mb-6">
          {artistName.charAt(0)}
        </div>
        <h1 className="text-4xl font-extrabold mb-2">{artistName}</h1>
        <p className="text-muted-foreground max-w-lg">
          Digital artist exploring the intersection of technology and emotion through vibrant colors and abstract forms.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Artworks by {artistName}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </div>
    </div>
  );
}
