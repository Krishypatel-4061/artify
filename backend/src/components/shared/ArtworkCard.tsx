import Image from "next/image";
import Link from "next/link";
import { Artwork } from "@/services/database.service";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <Card className="overflow-hidden flex flex-col group">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={artwork.imageUrl}
          alt={artwork.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="p-4 flex-1">
        <CardTitle className="text-xl line-clamp-1">{artwork.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{artwork.description}</p>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">By {artwork.artistName}</span>
          <span className="text-lg font-bold">${artwork.price.toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <Link href={`/artwork/${artwork.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>Details</Link>
          <Button size="icon" className="h-8 w-8">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
