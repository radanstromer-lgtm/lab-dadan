import { NextRequest, NextResponse } from "next/server";

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

/**
 * GET /api/github-commits?repo=user/repo&since=2026-09-01&per_page=20
 * Fetch recent commits from a public GitHub repo using the REST API.
 * No token required for public repos (rate limit: 60 req/hour for unauthenticated).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get("repo");
  const since = searchParams.get("since");
  const perPage = searchParams.get("per_page") || "20";

  if (!repo) {
    return NextResponse.json(
      { error: "Missing 'repo' query parameter. Expected format: user/repo" },
      { status: 400 }
    );
  }

  // Validate repo format
  if (!/^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/.test(repo)) {
    return NextResponse.json(
      { error: "Invalid repo format. Expected: user/repo" },
      { status: 400 }
    );
  }

  try {
    const apiUrl = new URL(`https://api.github.com/repos/${repo}/commits`);
    apiUrl.searchParams.set("per_page", perPage);
    if (since) {
      apiUrl.searchParams.set("since", since);
    }

    const response = await fetch(apiUrl.toString(), {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "lab-dadan-showcase",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Repository not found or is private" },
          { status: 404 }
        );
      }
      if (response.status === 403) {
        return NextResponse.json(
          { error: "GitHub API rate limit exceeded. Try again later." },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: `GitHub API error: ${response.status}` },
        { status: response.status }
      );
    }

    const commits: GitHubCommit[] = await response.json();

    // Transform to our CommitEntry format
    const formatted = commits.map((c) => ({
      hash: c.sha,
      message: c.commit.message.split("\n")[0], // First line only
      date: c.commit.author.date,
      author: c.commit.author.name,
      url: c.html_url,
    }));

    return NextResponse.json({ commits: formatted });
  } catch (err) {
    console.error("GitHub API fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch commits from GitHub" },
      { status: 500 }
    );
  }
}
