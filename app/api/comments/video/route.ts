import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { createServiceClient } from "@/lib/supabase/service";
import {
  createYouTubeClient,
  getOrCreateCommentPlaylist,
  uploadVideoToYouTube,
  addVideoToPlaylist,
} from "@/lib/youtube";

/**
 * GET /api/comments/video
 * Fetch video comments for a specific content.
 * Query params: content_type, content_id
 * If user is authenticated, also returns their own private/pending comments.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const contentType = searchParams.get("content_type");
  const contentId = searchParams.get("content_id");

  if (!contentType || !contentId) {
    return NextResponse.json(
      { error: "content_type and content_id are required" },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);
  const supabase = createServiceClient();

  // Fetch public + approved comments (visible to everyone)
  let query = supabase
    .from("video_comments")
    .select("*")
    .eq("content_type", contentType)
    .eq("content_id", contentId)
    .order("created_at", { ascending: true });

  const { data: allComments, error } = await query;

  if (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }

  const userGoogleId = session?.user?.googleId;

  // Filter comments based on visibility rules:
  // - Public + Approved: visible to everyone
  // - Own comments: always visible to the owner (with status badges)
  const filteredComments = (allComments || []).filter((comment) => {
    // Owner can always see their own comments
    if (userGoogleId && comment.user_google_id === userGoogleId) {
      return true;
    }
    // Everyone else only sees approved + public comments
    return comment.is_approved && comment.is_public;
  });

  // Separate top-level comments and replies
  const topLevel = filteredComments.filter((c) => !c.parent_id);
  const replies = filteredComments.filter((c) => c.parent_id);

  // Nest replies under their parent
  const commentsWithReplies = topLevel.map((comment) => ({
    ...comment,
    replies: replies.filter((r) => r.parent_id === comment.id),
  }));

  return NextResponse.json({ comments: commentsWithReplies });
}

/**
 * POST /api/comments/video
 * Upload a video comment. Requires authentication.
 * Body: FormData with video file + metadata fields.
 */
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken || !session?.user?.googleId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const videoFile = formData.get("video") as File | null;
    const contentType = formData.get("content_type") as string;
    const contentId = formData.get("content_id") as string;
    const parentId = formData.get("parent_id") as string | null;
    const commentText = formData.get("comment_text") as string | null;
    const durationSeconds = parseInt(
      (formData.get("duration_seconds") as string) || "0",
      10
    );

    if (!videoFile || !contentType || !contentId) {
      return NextResponse.json(
        { error: "video, content_type, and content_id are required" },
        { status: 400 }
      );
    }

    // Validate reply: parent must exist and must not be a reply itself
    if (parentId) {
      const supabase = createServiceClient();
      const { data: parent } = await supabase
        .from("video_comments")
        .select("id, parent_id")
        .eq("id", parentId)
        .single();

      if (!parent) {
        return NextResponse.json(
          { error: "Parent comment not found" },
          { status: 404 }
        );
      }
      if (parent.parent_id) {
        return NextResponse.json(
          { error: "Cannot reply to a reply (max 1 level)" },
          { status: 400 }
        );
      }
    }

    // Convert file to buffer for YouTube upload
    const arrayBuffer = await videoFile.arrayBuffer();
    const videoBuffer = Buffer.from(arrayBuffer);

    // 1. Create YouTube client
    const youtube = createYouTubeClient(session.accessToken);

    // 2. Upload video to YouTube
    const { videoId } = await uploadVideoToYouTube(youtube, videoBuffer, {
      title: `Video Comment - ${contentType}/${contentId}`,
      description: `Komentar video untuk ${contentType} ${contentId} di lab.dadan.id${commentText ? `\n\n${commentText}` : ""}`,
      contentType,
      contentId,
    });

    // 3. Get or create comment playlist
    let playlistId: string | null = null;
    try {
      playlistId = await getOrCreateCommentPlaylist(youtube);
      // 4. Add video to playlist
      await addVideoToPlaylist(youtube, videoId, playlistId);
    } catch (playlistError) {
      // Non-fatal: video is uploaded but playlist operation failed
      console.error("Playlist operation failed:", playlistError);
    }

    // 5. Save comment record to Supabase
    const supabase = createServiceClient();
    const { data: comment, error: insertError } = await supabase
      .from("video_comments")
      .insert({
        content_type: contentType,
        content_id: contentId,
        parent_id: parentId || null,
        user_google_id: session.user.googleId,
        user_name: session.user.name || "Anonymous",
        user_avatar_url: session.user.image || null,
        user_email: session.user.email || null,
        youtube_video_id: videoId,
        youtube_playlist_id: playlistId,
        comment_text: commentText || null,
        duration_seconds: durationSeconds,
        is_public: false,
        is_approved: false,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting comment:", insertError);
      return NextResponse.json(
        { error: "Failed to save comment" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      comment,
      message:
        "Komentar video berhasil dikirim! Menunggu moderasi dari admin sebelum ditampilkan.",
    });
  } catch (error) {
    console.error("Error creating video comment:", error);
    return NextResponse.json(
      {
        error: "Failed to create video comment",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
