import { google, youtube_v3 } from "googleapis";
import { Readable } from "stream";

const COMMENT_PLAYLIST_TITLE = "Website Video Comments";
const COMMENT_PLAYLIST_DESCRIPTION =
  "Playlist otomatis untuk komentar video dari website lab.dadan.id";

/**
 * Create an authenticated YouTube API client
 */
export function createYouTubeClient(accessToken: string): youtube_v3.Youtube {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  return google.youtube({ version: "v3", auth });
}

/**
 * Refresh an expired access token using the refresh token
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<{ accessToken: string; expiresAt: number }> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const tokens = await response.json();
  if (!response.ok) {
    throw new Error(`Failed to refresh token: ${JSON.stringify(tokens)}`);
  }

  return {
    accessToken: tokens.access_token,
    expiresAt: Date.now() + tokens.expires_in * 1000,
  };
}

/**
 * Get or create a dedicated playlist for video comments
 */
export async function getOrCreateCommentPlaylist(
  youtube: youtube_v3.Youtube
): Promise<string> {
  // First, try to find an existing playlist with our title
  const listResponse = await youtube.playlists.list({
    part: ["snippet"],
    mine: true,
    maxResults: 50,
  });

  const existingPlaylist = listResponse.data.items?.find(
    (p) => p.snippet?.title === COMMENT_PLAYLIST_TITLE
  );

  if (existingPlaylist?.id) {
    return existingPlaylist.id;
  }

  // Create a new playlist
  const createResponse = await youtube.playlists.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: {
        title: COMMENT_PLAYLIST_TITLE,
        description: COMMENT_PLAYLIST_DESCRIPTION,
      },
      status: {
        privacyStatus: "private",
      },
    },
  });

  if (!createResponse.data.id) {
    throw new Error("Failed to create comment playlist");
  }

  return createResponse.data.id;
}

/**
 * Upload a video to YouTube as private
 */
export async function uploadVideoToYouTube(
  youtube: youtube_v3.Youtube,
  videoBuffer: Buffer,
  metadata: {
    title: string;
    description: string;
    contentType: string;
    contentId: string;
  }
): Promise<{ videoId: string }> {
  const stream = new Readable();
  stream.push(videoBuffer);
  stream.push(null);

  const response = await youtube.videos.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: {
        title: metadata.title,
        description: metadata.description,
        tags: ["video-comment", metadata.contentType, metadata.contentId],
      },
      status: {
        privacyStatus: "private",
        selfDeclaredMadeForKids: false,
      },
    },
    media: {
      mimeType: "video/webm",
      body: stream,
    },
  });

  if (!response.data.id) {
    throw new Error("Failed to upload video to YouTube");
  }

  return { videoId: response.data.id };
}

/**
 * Add a video to a playlist
 */
export async function addVideoToPlaylist(
  youtube: youtube_v3.Youtube,
  videoId: string,
  playlistId: string
): Promise<void> {
  await youtube.playlistItems.insert({
    part: ["snippet"],
    requestBody: {
      snippet: {
        playlistId,
        resourceId: {
          kind: "youtube#video",
          videoId,
        },
      },
    },
  });
}
