import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createYouTubeClient, getOrCreateCommentPlaylist } from "@/lib/youtube";

/**
 * GET /api/youtube/playlist
 * Get or create the comment playlist for the authenticated user.
 */
export async function GET() {
  const session = await auth();

  if (!session?.accessToken) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const youtube = createYouTubeClient(session.accessToken);
    const playlistId = await getOrCreateCommentPlaylist(youtube);

    return NextResponse.json({ playlistId });
  } catch (error) {
    console.error("Error getting/creating playlist:", error);
    return NextResponse.json(
      { error: "Failed to manage playlist" },
      { status: 500 }
    );
  }
}

