"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Trash2,
  Globe,
  Lock,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import type { VideoComment } from "@/lib/hooks/use-video-comments";
import { VideoCommentForm } from "./video-comment-form";

interface VideoCommentCardProps {
  comment: VideoComment;
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
  isReply?: boolean;
}

export function VideoCommentCard({
  comment,
  onToggleVisibility,
  onDelete,
  onUploadReply,
  isReply = false,
}: VideoCommentCardProps) {
  const { data: session } = useSession();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);

  const isOwner = session?.user?.googleId === comment.user_google_id;
  const isPending = !comment.is_approved;

  const handleToggleVisibility = async () => {
    setToggling(true);
    await onToggleVisibility(comment.id, !comment.is_public);
    setToggling(false);
  };

  const handleDelete = async () => {
    if (!confirm("Hapus komentar ini? (Video tetap ada di YouTube Anda)")) return;
    setDeleting(true);
    const success = await onDelete(comment.id);
    if (!success) setDeleting(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isReply ? "ml-8 border-l-2 border-border pl-4" : ""} ${deleting ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="space-y-3">
        {/* User Info + Status Badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {comment.user_avatar_url ? (
              <img
                src={comment.user_avatar_url}
                alt={comment.user_name}
                className="w-8 h-8 rounded-full border border-border"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center font-mono text-xs font-bold text-muted-foreground">
                {comment.user_name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="font-sans text-sm font-semibold text-foreground">
                {comment.user_name}
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                {formatDate(comment.created_at)}
                {comment.duration_seconds &&
                  ` · ${Math.floor(comment.duration_seconds / 60)}:${(comment.duration_seconds % 60).toString().padStart(2, "0")}`}
              </div>
            </div>
          </div>

          {/* Status badges (only for owner) */}
          {isOwner && (
            <div className="flex items-center gap-2 shrink-0">
              {isPending ? (
                <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-sm bg-amber-500/10 text-amber-600 border border-amber-500/20">
                  <Clock className="w-3 h-3" />
                  Menunggu moderasi
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-sm bg-green-500/10 text-green-600 border border-green-500/20">
                  <CheckCircle className="w-3 h-3" />
                  Disetujui
                </span>
              )}
              <span
                className={`inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-sm border ${
                  comment.is_public
                    ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                    : "bg-muted text-muted-foreground border-border"
                }`}
              >
                {comment.is_public ? (
                  <>
                    <Globe className="w-3 h-3" />
                    Public
                  </>
                ) : (
                  <>
                    <Lock className="w-3 h-3" />
                    Private
                  </>
                )}
              </span>
            </div>
          )}
        </div>

        {/* YouTube Embed */}
        <div className="aspect-video bg-black rounded-sm overflow-hidden border border-border">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${comment.youtube_video_id}`}
            title={`Video comment by ${comment.user_name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            loading="lazy"
          />
        </div>

        {/* Comment text */}
        {comment.comment_text && (
          <p className="text-sm font-sans text-foreground leading-relaxed">
            {comment.comment_text}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          {/* Reply button (not on replies themselves) */}
          {!isReply && session && (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Balas
            </button>
          )}

          {/* Toggle visibility (owner only) */}
          {isOwner && (
            <button
              onClick={handleToggleVisibility}
              disabled={toggling}
              className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
            >
              {comment.is_public ? (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  {toggling ? "..." : "Jadikan Private"}
                </>
              ) : (
                <>
                  <Globe className="w-3.5 h-3.5" />
                  {toggling ? "..." : "Tampilkan ke Publik"}
                </>
              )}
            </button>
          )}

          {/* Delete (owner only) */}
          {isOwner && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-1.5 text-xs font-mono text-destructive/70 hover:text-destructive transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {deleting ? "..." : "Hapus"}
            </button>
          )}
        </div>
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="mt-4">
          <VideoCommentForm
            onSubmit={onUploadReply}
            parentId={comment.id}
            isReply
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <VideoCommentCard
              key={reply.id}
              comment={reply}
              onToggleVisibility={onToggleVisibility}
              onDelete={onDelete}
              onUploadReply={onUploadReply}
              isReply
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
