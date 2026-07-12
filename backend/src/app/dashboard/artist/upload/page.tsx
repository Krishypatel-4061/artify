"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function UploadArtworkPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Invalid file type", { description: "Please upload an image file (PNG, JPG, WEBP, GIF)." });
      return;
    }
    if (selectedFile.size > 20 * 1024 * 1024) {
      toast.error("File too large", { description: "Maximum file size is 20MB." });
      return;
    }
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !price || !file) {
      toast.error("Missing fields", { description: "Please fill out all fields and select an artwork file." });
      return;
    }

    setIsUploading(true);

    try {
      // 1. Upload to Azure Blob Storage
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload image to Azure Blob Storage");
      }

      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.url;

      // 2. Create Artwork Record in Azure SQL Database
      // Using a hardcoded artistId for demonstration since auth isn't fully wired here
      const artistId = "demo-artist";

      const artworkRes = await fetch("/api/artworks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price: parseFloat(price),
          imageUrl,
          artistId,
        }),
      });

      if (!artworkRes.ok) {
        throw new Error("Failed to save artwork record to database");
      }

      toast.success("Artwork published!", { description: "Your digital masterpiece is now live." });

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      removeFile();

    } catch (error: any) {
      console.error(error);
      toast.error("Upload failed", { description: error.message || "An unexpected error occurred." });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Upload Artwork</h1>
        <p className="text-muted-foreground">List a new digital masterpiece on the marketplace.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Artwork Details</CardTitle>
          <CardDescription>Provide details about your digital creation.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Neon Dreams"
                disabled={isUploading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe your artwork..."
                disabled={isUploading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
                placeholder="99.00"
                disabled={isUploading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Artwork File</Label>
              {!file ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${isDragging ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted/50'}`}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud className={`h-10 w-10 mb-4 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
                  <h3 className="font-semibold mb-1">Click to upload or drag and drop</h3>
                  <p className="text-sm text-muted-foreground">PNG, JPG, WEBP, or GIF (max 20MB)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleFile(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="border rounded-lg p-4 flex items-center justify-between bg-muted/30">
                  <div className="flex items-center space-x-4">
                    {previewUrl ? (
                      <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <p className="font-medium truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={removeFile}
                    disabled={isUploading}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full h-12 text-base" disabled={isUploading || !file}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Artwork"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
