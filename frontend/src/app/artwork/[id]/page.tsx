import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/services/database.service";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArtworkCard } from "@/components/shared/ArtworkCard";
import { CommentForm } from "@/components/shared/CommentForm";
import { 
  Heart, 
  Share2, 
  Maximize2, 
  Monitor, 
  FileText, 
  ShieldAlert, 
  HardDrive, 
  Eye, 
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  ExternalLink
} from "lucide-react";

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

  // Get other artworks by the same artist for the gallery at the bottom
  const allArtworks = await db.getArtworks();
  const artistArtworks = allArtworks
    .filter(a => a.artistId === artwork.artistId && a.id !== artwork.id)
    .slice(0, 4);

  // Fallback to other artworks if this artist has no other pieces listed
  const relativeArtworks = artistArtworks.length > 0 
    ? artistArtworks 
    : allArtworks.filter(a => a.id !== artwork.id).slice(0, 4);

  let comments: any[] = [];
  try {
    const { prisma } = await import("@/lib/prisma");
    const dbComments = await prisma.comment.findMany({
      where: { artworkId: resolvedParams.id },
      include: { user: true },
      orderBy: { createdAt: 'desc' }
    });
    comments = dbComments.map(c => ({
      author: c.user.name,
      time: new Date(c.createdAt).toLocaleDateString(),
      text: c.content,
      avatar: c.user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
    }));
  } catch (error) {
    console.warn("Failed to fetch comments from DB, falling back to mock data", error);
    comments = [
      {
        author: "Julian Vane",
        time: "2 hours ago",
        text: "The lighting in this piece is absolutely phenomenal. You can really feel the glassmorphism influence in the refractions!",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
      },
      {
        author: "Elena Rossi",
        time: "5 hours ago",
        text: "I just purchased the commercial license. Can't wait to use this in my upcoming UI projects!",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80"
      },
      {
        author: "Marcus Thorne",
        time: "Yesterday",
        text: "Are you planning a series of these? The color palette is so soothing and premium.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80"
      }
    ];
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 bg-background text-foreground">
      
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-8">
        <Link href="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="hover:text-primary transition-colors cursor-pointer">{artwork.tag || "Digital Paintings"}</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-bold">{artwork.title}</span>
      </nav>

      {/* 2. Main Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column (Main Details & Comments) */}
        <div className="lg:col-span-7 space-y-10">
          {/* Image Container with Actions */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-card border border-border/40 shadow-xl group">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Top-Right Overlays */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="h-10 w-10 bg-background/80 dark:bg-background/95 hover:bg-background text-foreground flex items-center justify-center rounded-full backdrop-blur-md shadow-md border border-border/20 active:scale-95 transition-all">
                <Maximize2 className="h-4.5 w-4.5" />
              </button>
              <button className="h-10 w-10 bg-background/80 dark:bg-background/95 hover:bg-background text-muted-foreground hover:text-destructive flex items-center justify-center rounded-full backdrop-blur-md shadow-md border border-border/20 active:scale-95 transition-all">
                <Heart className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* The Vision Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-foreground">The Vision</h2>
              <div className="h-1 w-10 bg-primary rounded-full mt-2" />
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {artwork.description || "No vision notes provided by the artist."}
            </p>

            {/* Technical Metadata Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-card border border-border/30 rounded-xl">
                <div className="h-10 w-10 bg-primary/10 text-primary flex items-center justify-center rounded-lg">
                  <Monitor className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Resolution</span>
                  <span className="text-xs font-bold text-foreground block mt-0.5">{artwork.resolution || "4096 x 4096 px"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-card border border-border/30 rounded-xl">
                <div className="h-10 w-10 bg-primary/10 text-primary flex items-center justify-center rounded-lg">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Format</span>
                  <span className="text-xs font-bold text-foreground block mt-0.5">{artwork.format || "High-Res PNG"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-card border border-border/30 rounded-xl">
                <div className="h-10 w-10 bg-primary/10 text-primary flex items-center justify-center rounded-lg">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">License</span>
                  <span className="text-xs font-bold text-foreground block mt-0.5">{artwork.license || "Personal Use License"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-card border border-border/30 rounded-xl">
                <div className="h-10 w-10 bg-primary/10 text-primary flex items-center justify-center rounded-lg">
                  <HardDrive className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Size</span>
                  <span className="text-xs font-bold text-foreground block mt-0.5">{artwork.size || "18.4 MB"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Collector Reviews Section */}
          <div className="space-y-6 pt-6 border-t border-border/20">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Collector Reviews (128)</h2>
            </div>

            {/* Write a comment */}
            <CommentForm artworkId={artwork.id} userId="68c2e21d-1618-4b16-845a-bf6ee1cc3c80" />

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="flex gap-4 items-start p-4 hover:bg-muted/10 rounded-xl transition-all">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted shrink-0">
                    <Image
                      src={comment.avatar}
                      alt={comment.author}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-foreground">{comment.author}</span>
                      <span className="text-[10px] text-muted-foreground font-semibold">{comment.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{comment.text}</p>
                    <div className="flex gap-4 items-center pt-1 text-[11px] text-muted-foreground font-semibold">
                      <button className="hover:text-primary transition-colors">Helpful</button>
                      <button className="hover:text-primary transition-colors">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="text-sm font-bold text-primary hover:text-primary/80 transition-colors block mx-auto pt-2">
              View all 128 comments
            </button>
          </div>
        </div>

        {/* Right Column (Purchase Card & Artist Profile Card) */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          
          {/* Purchase Card */}
          <div className="bg-card border border-border/40 rounded-3xl p-6 shadow-lg space-y-6">
            <div className="flex justify-between items-center">
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                <CheckCircle className="h-3 w-3" /> Available for Mint
              </span>
              <button className="h-8.5 w-8.5 border border-border/40 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center rounded-xl transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-1">
                {artwork.title}
              </h1>
              <span className="text-xs text-muted-foreground">
                Created by{" "}
                <Link href={`/profile/${artwork.artistId}`} className="text-primary font-bold hover:underline">
                  {artwork.artistName}
                </Link>
              </span>
            </div>

            {/* Current Price Box */}
            <div className="bg-muted/40 border border-border/30 p-4.5 rounded-2xl">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Current Price</span>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-2xl sm:text-3xl font-black text-foreground">
                  {artwork.ethPrice ? `${artwork.ethPrice.toFixed(2)} ETH` : `$${artwork.price.toFixed(2)}`}
                </span>
                {artwork.ethPrice && (
                  <span className="text-xs font-semibold text-muted-foreground font-mono">
                    (${artwork.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                  </span>
                )}
              </div>
            </div>

            {/* Buy / Bid Actions */}
            <div className="space-y-3">
              <Button className="w-full h-12 rounded-xl text-sm font-bold shadow-lg shadow-primary/25">
                Purchase Artwork
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-10 rounded-xl text-xs font-bold gap-1.5">
                  <Eye className="h-4 w-4" /> Preview
                </Button>
                <Button variant="outline" className="h-10 rounded-xl text-xs font-bold gap-1.5">
                  <Heart className="h-4 w-4" /> Save
                </Button>
              </div>
            </div>

            {/* Verification and Provenance */}
            <div className="border-t border-border/20 pt-5 space-y-3">
              <h3 className="text-[10px] text-muted-foreground uppercase font-extrabold tracking-wider">
                Verification & Provenance
              </h3>
              
              <div className="space-y-2 text-xs font-semibold">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Contract Address</span>
                  <Link 
                    href={`https://etherscan.io/address/${artwork.contractAddress || "0x71C3b47A5A0b457813a29F1A44E8908B1F8Ca29f"}`}
                    target="_blank"
                    className="text-primary font-mono flex items-center gap-1 hover:underline"
                  >
                    {(artwork.contractAddress || "0x71C3...a29f").substring(0, 6)}...
                    {(artwork.contractAddress || "0x71C3...a29f").substring((artwork.contractAddress || "0x71C3...a29f").length - 4)}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Token Standard</span>
                  <span className="text-foreground">{artwork.tokenStandard || "ERC-721"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Blockchain</span>
                  <span className="text-foreground">{artwork.blockchain || "Ethereum Mainnet"}</span>
                </div>
              </div>
            </div>

            {/* Artist mini-profile card */}
            <div className="border-t border-border/20 pt-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-primary/10 border border-primary/20 shrink-0">
                  <Image
                    src={artwork.artistId === "artist-2" 
                      ? "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80" 
                      : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"}
                    alt={artwork.artistName}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="font-bold text-sm text-foreground block">{artwork.artistName}</span>
                  <span className="text-[10px] text-muted-foreground font-medium block">
                    {artwork.artistId === "artist-2" ? "1.2k" : "12.8k"} Followers • {artwork.artistId === "artist-2" ? "45" : "124"} Creations
                  </span>
                </div>
              </div>
              <Link 
                href={`/profile/${artwork.artistId}`}
                className={`${buttonVariants({ variant: "outline", size: "xs" })} rounded-lg font-bold text-[10px] tracking-wide uppercase px-3 py-1.5`}
              >
                View Portfolio
              </Link>
            </div>

          </div>
        </div>

      </div>

      {/* 3. More by artist gallery */}
      <section className="mt-20 pt-10 border-t border-border/20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
              More by {artwork.artistName}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">Discover other creations from this artist.</p>
          </div>
          <Link 
            href={`/profile/${artwork.artistId}`}
            className="text-xs font-bold text-primary flex items-center gap-0.5 hover:underline"
          >
            Explore All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relativeArtworks.map((art) => (
            <ArtworkCard key={art.id} artwork={art} />
          ))}
        </div>
      </section>

    </div>
  );
}
