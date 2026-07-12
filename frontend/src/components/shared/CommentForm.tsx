"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CommentFormProps {
  artworkId: string;
  userId: string;
  userName: string;
}

export function CommentForm({ artworkId, userId, userName }: CommentFormProps) {
  const router = useRouter();
  const [content, setContent] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artworkId,
          userId,
          userName,
          content: content.trim(),
        }),
      });

      if (res.ok) {
        toast.success("Comment posted!");
        setContent("");
        router.refresh(); // Refresh the server component to load the new comment
      } else {
        toast.error("Failed to post comment.");
      }
    } catch {
      toast.error("Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex gap-4 items-start p-4 bg-card border border-border/30 rounded-2xl">
      <div className="relative h-10 w-10 rounded-full overflow-hidden bg-primary/10 shrink-0">
        <Image
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
          alt="My Avatar"
          fill
          sizes="40px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 space-y-3">
        <textarea
          placeholder="Share your thoughts on this masterpiece..."
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-background border border-border/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl p-3 text-sm text-foreground focus:outline-none placeholder:text-muted-foreground transition-all"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={submitting || !content.trim()}
            className="rounded-xl px-5 py-2 font-bold text-xs"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </div>
    </div>
  );
}
