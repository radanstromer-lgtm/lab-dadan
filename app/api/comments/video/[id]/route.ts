import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createServiceClient } from "@/lib/supabase/service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/comments/video/[id]
 * Toggle comment visibility (is_public). Only the comment owner can do this.
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.googleId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { is_public } = body;

    if (typeof is_public !== "boolean") {
      return NextResponse.json(
        { error: "is_public (boolean) is required" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Verify ownership
    const { data: existing } = await supabase
      .from("video_comments")
      .select("id, user_google_id")
      .eq("id", id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    if (existing.user_google_id !== session.user.googleId) {
      return NextResponse.json(
        { error: "You can only modify your own comments" },
        { status: 403 }
      );
    }

    // Update visibility
    const { data: updated, error } = await supabase
      .from("video_comments")
      .update({ is_public, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating comment:", error);
      return NextResponse.json(
        { error: "Failed to update comment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ comment: updated });
  } catch (error) {
    console.error("Error in PATCH /api/comments/video/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/comments/video/[id]
 * Delete a comment. Only the comment owner can do this.
 * Note: This only removes the database record. The YouTube video remains.
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.googleId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const supabase = createServiceClient();

    // Verify ownership
    const { data: existing } = await supabase
      .from("video_comments")
      .select("id, user_google_id")
      .eq("id", id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    if (existing.user_google_id !== session.user.googleId) {
      return NextResponse.json(
        { error: "You can only delete your own comments" },
        { status: 403 }
      );
    }

    // Delete comment (CASCADE will handle replies)
    const { error } = await supabase
      .from("video_comments")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting comment:", error);
      return NextResponse.json(
        { error: "Failed to delete comment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/comments/video/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
