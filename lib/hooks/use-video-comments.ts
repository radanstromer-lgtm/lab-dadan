"use client";

import { useState, useEffect, useCallback } from "react";

export interface VideoComment {
  id: string;
  content_type: string;
  content_id: string;
  parent_id: string | null;
  user_google_id: string;
  user_name: string;
  user_avatar_url: string | null;
  user_email: string | null;
  youtube_video_id: string;
  youtube_playlist_id: string | null;
  comment_text: string | null;
  duration_seconds: number | null;
  is_public: boolean;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  replies?: VideoComment[];
}

interface UseVideoCommentsOptions {
  contentType: string;
  contentId: string;
}

export function useVideoComments({
  contentType,
  contentId,
}: UseVideoCommentsOptions) {
  const [comments, setComments] = useState<VideoComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `/api/comments/video?content_type=${encodeURIComponent(contentType)}&content_id=${encodeURIComponent(contentId)}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await res.json();
      setComments(data.comments || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [contentType, contentId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const uploadComment = async (
    videoBlob: Blob,
    metadata: {
      commentText?: string;
      parentId?: string;
      durationSeconds?: number;
    }
  ): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const formData = new FormData();
      formData.append("video", videoBlob, "video-comment.webm");
      formData.append("content_type", contentType);
      formData.append("content_id", contentId);

      if (metadata.commentText) {
        formData.append("comment_text", metadata.commentText);
      }
      if (metadata.parentId) {
        formData.append("parent_id", metadata.parentId);
      }
      if (metadata.durationSeconds) {
        formData.append(
          "duration_seconds",
          metadata.durationSeconds.toString()
        );
      }

      const res = await fetch("/api/comments/video", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || "Upload failed" };
      }

      // Refresh comments list
      await fetchComments();

      return { success: true, message: data.message };
    } catch (err) {
      console.error("Error uploading comment:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  };

  const toggleVisibility = async (
    commentId: string,
    isPublic: boolean
  ): Promise<boolean> => {
    try {
      // Optimistic update
      setComments((prev) =>
        prev.map((c) => {
          if (c.id === commentId) {
            return { ...c, is_public: isPublic };
          }
          // Also check replies
          if (c.replies) {
            return {
              ...c,
              replies: c.replies.map((r) =>
                r.id === commentId ? { ...r, is_public: isPublic } : r
              ),
            };
          }
          return c;
        })
      );

      const res = await fetch(`/api/comments/video/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_public: isPublic }),
      });

      if (!res.ok) {
        // Revert optimistic update
        await fetchComments();
        return false;
      }

      return true;
    } catch (err) {
      console.error("Error toggling visibility:", err);
      await fetchComments();
      return false;
    }
  };

  const deleteComment = async (commentId: string): Promise<boolean> => {
    try {
      // Optimistic update
      setComments((prev) =>
        prev
          .filter((c) => c.id !== commentId)
          .map((c) => ({
            ...c,
            replies: c.replies?.filter((r) => r.id !== commentId),
          }))
      );

      const res = await fetch(`/api/comments/video/${commentId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        await fetchComments();
        return false;
      }

      return true;
    } catch (err) {
      console.error("Error deleting comment:", err);
      await fetchComments();
      return false;
    }
  };

  return {
    comments,
    loading,
    error,
    fetchComments,
    uploadComment,
    toggleVisibility,
    deleteComment,
  };
}
