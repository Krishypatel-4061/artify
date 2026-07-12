"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, CheckCircle, Image as ImageIcon, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { db } from "@/services/database.service";
import { storage } from "@/services/storage.service";
import { auth } from "@/services/auth.service";
import { toast } from "sonner";

export default function UploadArtworkPage() {
  const router = useRouter();
  const [dragActive, setDragActive] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("Abstract");
  const [submitting, setSubmitting] = React.useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (selectedFile: File): boolean => {
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Invalid file type. Please upload an image.");
      return false;
    }
    if (selectedFile.size > 4.5 * 1024 * 1024) {
      toast.error("File is too large. Vercel deployment limits uploads to 4.5MB.");
      return false;
    }
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        setPreviewUrl(URL.createObjectURL(droppedFile));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
      }
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !file) return;

    setSubmitting(true);
    
    try {
      // Step 1: Upload file to Azure Blob Storage
      toast.loading("Uploading artwork to cloud storage...");
      const uploadedUrl = await storage.uploadFile(file, "artworks");
      toast.dismiss();

      const currentUser = await auth.getCurrentUser();
      if (!currentUser) throw new Error("Not authenticated");

      // Step 2: Create artwork record in database
      toast.loading("Publishing artwork...");
      await db.createArtwork({
        title,
        description,
        price: parseFloat(price),
        ethPrice: parseFloat(price) / 2500, // mock conversion
        imageUrl: uploadedUrl,
        artistId: currentUser.id,
        artistName: currentUser.name,
        tag: category,
        category: category,
        status: "Published",
        style: "Organic",
        resolution: "4096 x 4096 px",
        format: "PNG",
        license: "Commercial Use",
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
      toast.dismiss();

      toast.success("Artwork published successfully!");
      router.push("/dashboard/artist");
    } catch (error: any) {
      console.error(error);
      toast.dismiss();
      toast.error(error.message || "Failed to publish artwork. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-2xl bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Upload Artwork</h1>
        <p className="text-muted-foreground text-sm">List a new digital masterpiece on the marketplace.</p>
      </div>

      <Card className="border-border/40 rounded-3xl shadow-xl bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold">Artwork Details</CardTitle>
          <CardDescription className="text-xs">Provide catalog details about your digital creation.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5 text-sm font-semibold">
            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs text-foreground font-bold uppercase tracking-wider">Artwork Title</Label>
              <Input 
                id="title" 
                placeholder="e.g. Neon Serenity" 
                required 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="h-10 rounded-xl bg-muted/20 border-border/40 focus-visible:ring-primary/20 text-sm font-medium"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-xs text-foreground font-bold uppercase tracking-wider">Description</Label>
              <textarea 
                id="description" 
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="flex min-h-[100px] w-full rounded-xl border border-border/40 bg-muted/20 px-3 py-2 text-sm font-medium shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="Describe your artwork..."
                required
              />
            </div>

            {/* Price and Category grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="price" className="text-xs text-foreground font-bold uppercase tracking-wider">Price (USD)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  placeholder="150.00" 
                  required 
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className="h-10 rounded-xl bg-muted/20 border-border/40 focus-visible:ring-primary/20 text-sm font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-xs text-foreground font-bold uppercase tracking-wider">Category</Label>
                <select 
                  id="category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="flex h-10 w-full rounded-xl border border-border/40 bg-muted/20 px-3 py-2 text-sm font-medium text-foreground outline-none focus:ring-1 focus:ring-primary/30"
                >
                  <option value="Abstract">Abstract</option>
                  <option value="3D Render">3D Render</option>
                  <option value="Photography">Photography</option>
                  <option value="Minimalism">Minimalism</option>
                  <option value="Cyberpunk">Cyberpunk</option>
                  <option value="Nature">Nature</option>
                  <option value="Surrealism">Surrealism</option>
                </select>
              </div>
            </div>

            {/* File Upload Zone */}
            <div className="space-y-1.5">
              <Label className="text-xs text-foreground font-bold uppercase tracking-wider">Artwork File</Label>
              
              {!previewUrl ? (
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer min-h-[160px] ${
                    dragActive ? "border-primary bg-primary/5" : "border-border/60 hover:bg-muted/15 bg-muted/5"
                  }`}
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <UploadCloud className="h-9 w-9 text-muted-foreground mb-3" />
                  <h3 className="font-bold text-xs text-foreground mb-0.5">Click to upload or drag and drop</h3>
                  <p className="text-[10px] text-muted-foreground font-semibold">PNG, JPG, WEBP, or GIF (max 20MB)</p>
                  <input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    required
                  />
                </div>
              ) : (
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/40 bg-card group shadow-inner">
                   <Image
                    src={previewUrl}
                    alt="Artwork Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-contain p-2"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1.5">
                    <span className="bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm shadow border border-white/10 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      {file ? (file.size / (1024 * 1024)).toFixed(1) + " MB" : ""}
                    </span>
                    <button 
                      onClick={clearFile}
                      className="h-7 w-7 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center backdrop-blur-sm shadow hover:scale-105 active:scale-95 transition-all border border-white/10"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <Link 
                href="/dashboard/artist" 
                className="w-1/3 h-11 border border-border/40 hover:bg-muted text-muted-foreground hover:text-foreground rounded-xl flex items-center justify-center text-xs font-bold transition-colors"
              >
                Cancel
              </Link>
              <Button 
                type="submit" 
                disabled={submitting || !file} 
                className="w-2/3 h-11 rounded-xl text-xs font-bold shadow-lg shadow-primary/20"
              >
                {submitting ? "Publishing Masterpiece..." : "Publish Artwork"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
