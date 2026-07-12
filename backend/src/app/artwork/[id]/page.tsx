import { notFound } from "next/navigation";
import Image from "next/image";
import { db } from "@/services/database.service";
export const dynamic = 'force-dynamic';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2, ShieldCheck, Download } from "lucide-react";

export default async function ArtworkDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const artwork = await db.getArtworkById(resolvedParams.id);

  if (!artwork) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Image Section */}
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted border">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">{artwork.title}</h1>
              <p className="text-lg text-muted-foreground">By {artwork.artistName}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="text-4xl font-bold text-primary mb-8">
            ${artwork.price.toFixed(2)}
          </div>

          <div className="space-y-4 mb-8">
            <Button size="lg" className="w-full h-14 text-lg">
              <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
            </Button>
            <Button size="lg" variant="secondary" className="w-full h-14 text-lg">
              Make Offer
            </Button>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {artwork.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-sm">Authentic</p>
                <p className="text-xs text-muted-foreground">Verified Creator</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Download className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-sm">High-Res</p>
                <p className="text-xs text-muted-foreground">Instant Download</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
