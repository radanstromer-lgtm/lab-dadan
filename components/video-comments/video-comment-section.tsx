"use client";

import { Video, LogIn } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { useVideoComments } from "@/lib/hooks/use-video-comments";
import { VideoCommentList } from "./video-comment-list";
import { VideoCommentForm } from "./video-comment-form";

interface VideoCommentSectionProps {
  contentType: string;
  contentId: string;
  commentsEnabled?: boolean;
}

export function VideoCommentSection({
  contentType,
  contentId,
  commentsEnabled = false,
}: VideoCommentSectionProps) {
  const { data: session } = useSession();
  const {
    comments,
    loading,
    error,
    uploadComment,
    toggleVisibility,
    deleteComment,
  } = useVideoComments({ contentType, contentId });

  // Don't render if comments are disabled for this content
  if (!commentsEnabled) return null;

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-t-2 border-border pt-8">
        <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-2">
          <Video className="w-4 h-4" />
          // Video Comments
        </h3>
        <p className="font-sans text-sm text-muted-foreground/70 mt-2">
          Bagikan perspektif Anda melalui video — autentik, tanpa bumbu AI.
        </p>
      </div>

      {/* Comment List */}
      <VideoCommentList
        comments={comments}
        loading={loading}
        error={error}
        onToggleVisibility={toggleVisibility}
        onDelete={deleteComment}
        onUploadReply={uploadComment}
      />

      {/* Comment Form or Sign In */}
      <div className="border-t border-border pt-6">
        {session ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name || ""}
                  className="w-5 h-5 rounded-full"
                />
              )}
              <span>Berkomentar sebagai {session.user?.name}</span>
            </div>
            <VideoCommentForm onSubmit={uploadComment} />
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="flex items-center gap-2 px-5 py-2.5 border-2 border-border text-foreground font-mono text-xs font-bold uppercase rounded-sm hover:border-primary hover:text-primary transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            Sign in with Google untuk berkomentar
          </button>
        )}
      </div>
    </div>
  );
}
