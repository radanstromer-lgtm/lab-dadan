"use client";

import { motion } from "framer-motion";
import { VideoCommentCard } from "./video-comment-card";
import type { VideoComment } from "@/lib/hooks/use-video-comments";

interface VideoCommentListProps {
  comments: VideoComment[];
  loading: boolean;
  error: string | null;
  onToggleVisibility: (commentId: string, isPublic: boolean) => Promise<boolean>;
  onDelete: (commentId: string) => Promise<boolean>;
  onUploadReply: (
    videoBlob: Blob,
    metadata: {
      commentText?: string;
      parentId?: string;
      durationSeconds?: number;
    }
  ) => Promise<{ success: boolean; message?: string; error?: string }>;
}

export function VideoCommentList({
  comments,
  loading,
  error,
  onToggleVisibility,
  onDelete,
  onUploadReply,
}: VideoCommentListProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted" />
              <div className="space-y-1.5">
                <div className="h-3 w-24 bg-muted rounded" />
                <div className="h-2.5 w-16 bg-muted rounded" />
              </div>
            </div>
            <div className="aspect-video bg-muted rounded-sm" />
            <div className="h-3 w-3/4 bg-muted rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-destructive font-mono">
          Gagal memuat komentar: {error}
        </p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 border border-dashed border-border rounded-sm"
      >
        <p className="font-mono text-sm text-muted-foreground">
          Belum ada komentar video.
        </p>
        <p className="font-mono text-xs text-muted-foreground/60 mt-1">
          Jadilah yang pertama memberikan perspektif Anda!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {comments.map((comment, index) => (
        <motion.div
          key={comment.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <VideoCommentCard
            comment={comment}
            onToggleVisibility={onToggleVisibility}
            onDelete={onDelete}
            onUploadReply={onUploadReply}
          />
          {index < comments.length - 1 && (
            <div className="border-b border-border mt-8" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
