"use client";

import * as React from "react";
import { db, Artwork } from "@/services/database.service";
import { ArtworkCard } from "@/components/shared/ArtworkCard";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  ChevronDown, 
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MarketplacePage() {
  const [artworks, setArtworks] = React.useState<Artwork[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  
  // Filter States
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState<number>(10.0);
  const [availability, setAvailability] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState("latest");
  const [currentPage, setCurrentPage] = React.useState(1);

  // Constants
  const categories = ["Abstract", "3D Render", "Photography", "Minimalism", "Cyberpunk", "Nature", "Surrealism"];
  const styles = ["Cyberpunk", "Surrealism", "Retro-Futurism", "Organic"];
  const itemsPerPage = 20;

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await db.getArtworks();
      setArtworks(data);
      setLoading(false);
    }
    loadData();
  }, []);

  // Filter handlers
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleStyleToggle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style) 
        : [...prev, style]
    );
    setCurrentPage(1);
  };

  const handleAvailabilityToggle = (option: string) => {
    setAvailability(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setSelectedCategories([]);
    setSelectedStyles([]);
    setPriceRange(10.0);
    setAvailability([]);
    setSearchQuery("");
    setSortBy("latest");
    setCurrentPage(1);
  };

  // Filter and Sort Artworks logic
  const filteredArtworks = React.useMemo(() => {
    return artworks.filter(artwork => {
      // Search Match
      const matchesSearch = 
        artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (artwork.description && artwork.description.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category Match
      const matchesCategory = 
        selectedCategories.length === 0 || 
        (artwork.tag && selectedCategories.includes(artwork.tag)) ||
        (artwork.category && selectedCategories.includes(artwork.category));

      // Style Match
      const matchesStyle = 
        selectedStyles.length === 0 || 
        (artwork.style && selectedStyles.includes(artwork.style));

      // Price Match
      const artworkEthPrice = artwork.ethPrice || (artwork.price / 2500); // fallback estimation
      const matchesPrice = artworkEthPrice <= priceRange;

      // Availability Match (simulate with statuses)
      const matchesAvailability = 
        availability.length === 0 ||
        (availability.includes("Buy Now") && artwork.status === "Published") ||
        (availability.includes("On Auction") && artwork.id === "luminous-etherea"); // mock auction item

      // Only show published works in general marketplace
      const isPublished = artwork.status === "Published";

      return matchesSearch && matchesCategory && matchesStyle && matchesPrice && matchesAvailability && isPublished;
    }).sort((a, b) => {
      if (sortBy === "latest") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      if (sortBy === "price-low") {
        return a.price - b.price;
      }
      if (sortBy === "price-high") {
        return b.price - a.price;
      }
      if (sortBy === "popular") {
        return (b.views || 0) - (a.views || 0);
      }
      return 0;
    });
  }, [artworks, searchQuery, selectedCategories, selectedStyles, priceRange, availability, sortBy]);

  // Paginated Results
  const paginatedArtworks = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredArtworks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredArtworks, currentPage]);

  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage) || 1;

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 min-h-screen bg-background">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Marketplace</h1>
        <p className="text-muted-foreground text-sm">Browse and discover premium high-fidelity digital art assets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* 1. Sidebar Filters (Left Column) */}
        <aside className="lg:col-span-1 bg-card border border-border/40 p-6 rounded-2xl sticky top-24 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-border/20">
            <h2 className="font-bold text-base flex items-center gap-2 text-foreground">
              <SlidersHorizontal className="h-4.5 w-4.5 text-primary" /> Filters
            </h2>
            <button 
              onClick={resetAllFilters} 
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Reset All
            </button>
          </div>

          {/* Categories filter */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Category</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2.5 text-sm font-medium text-foreground cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                    className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3 border-t border-border/10 pt-5">
            <div className="flex justify-between items-center text-xs uppercase tracking-wider text-muted-foreground font-bold">
              <span>Max Price</span>
              <span className="text-primary font-mono lowercase">{priceRange.toFixed(1)} eth</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="10.0"
              step="0.1"
              value={priceRange}
              onChange={(e) => setPriceRange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
              <span>0.1 ETH</span>
              <span>10.0 ETH</span>
            </div>
          </div>

          {/* Style Filter */}
          <div className="space-y-3 border-t border-border/10 pt-5">
            <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Style</h3>
            <div className="space-y-2">
              {styles.map((style) => (
                <label key={style} className="flex items-center gap-2.5 text-sm font-medium text-foreground cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedStyles.includes(style)}
                    onChange={() => handleStyleToggle(style)}
                    className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                  />
                  <span>{style}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-3 border-t border-border/10 pt-5">
            <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Availability</h3>
            <div className="space-y-2">
              {["Buy Now", "On Auction"].map((option) => (
                <label key={option} className="flex items-center gap-2.5 text-sm font-medium text-foreground cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={availability.includes(option)}
                    onChange={() => handleAvailabilityToggle(option)}
                    className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* 2. Main Content (Right Column) */}
        <main className="lg:col-span-3 space-y-6">
          {/* Search bar & Sorting toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search artwork title, artist handle..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 h-10 bg-card rounded-xl border-border/40 focus-visible:ring-primary/20 w-full"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Layout switch & sorting options */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Grid Toggle */}
              <div className="inline-flex rounded-xl border border-border/40 bg-card p-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-muted text-primary rounded-lg">
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg">
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Sorting Selection */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-10 pl-3 pr-8 rounded-xl border border-border/40 bg-card text-xs font-semibold text-foreground focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="latest">Latest Drop</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Badges Panel */}
          {(selectedCategories.length > 0 || selectedStyles.length > 0 || availability.length > 0) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-muted-foreground font-semibold">Active filters:</span>
              {selectedCategories.map(cat => (
                <div key={cat} className="inline-flex items-center gap-1 bg-primary/10 border border-primary/20 text-primary text-xs font-medium px-2 py-0.5 rounded-lg">
                  <span>{cat}</span>
                  <button onClick={() => handleCategoryToggle(cat)}><X className="h-3 w-3 hover:scale-110" /></button>
                </div>
              ))}
              {selectedStyles.map(st => (
                <div key={st} className="inline-flex items-center gap-1 bg-violet-500/10 border border-violet-500/20 text-violet-600 text-xs font-medium px-2 py-0.5 rounded-lg">
                  <span>{st}</span>
                  <button onClick={() => handleStyleToggle(st)}><X className="h-3 w-3 hover:scale-110" /></button>
                </div>
              ))}
              {availability.map(o => (
                <div key={o} className="inline-flex items-center gap-1 bg-zinc-500/10 border border-zinc-500/20 text-foreground text-xs font-medium px-2 py-0.5 rounded-lg">
                  <span>{o}</span>
                  <button onClick={() => handleAvailabilityToggle(o)}><X className="h-3 w-3 hover:scale-110" /></button>
                </div>
              ))}
            </div>
          )}

          {/* Artworks display state */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-card border border-border/40 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : paginatedArtworks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedArtworks.map((artwork, idx) => (
                <ArtworkCard key={artwork.id} artwork={artwork} priority={idx < 6} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 border border-dashed border-border/60 rounded-2xl bg-card">
              <SlidersHorizontal className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="font-bold text-lg mb-1 text-foreground">No artworks found</h3>
              <p className="text-sm text-muted-foreground mb-6">Try refining your selection criteria or keywords.</p>
              <Button onClick={resetAllFilters} variant="outline" className="rounded-xl font-bold">
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {filteredArtworks.length > itemsPerPage && (
            <nav className="flex justify-center items-center gap-1.5 pt-6">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="h-9 w-9 rounded-xl"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-9 w-9 text-xs font-bold rounded-xl transition-all duration-200 ${
                      currentPage === pageNum
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
                        : "bg-card border border-border/40 text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="h-9 w-9 rounded-xl"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          )}
        </main>
      </div>
    </div>
  );
}
