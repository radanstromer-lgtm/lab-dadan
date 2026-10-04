"use client";

import { GitCommitHorizontal, ExternalLink } from "lucide-react";
import { CommitEntry } from "@/lib/projects-data";

interface CommitListProps {
  commits: CommitEntry[];
}

export function CommitList({ commits }: CommitListProps) {
  if (!commits || commits.length === 0) return null;

  return (
    <div className="commit-list">
      <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-2 mb-4">
        <GitCommitHorizontal className="w-4 h-4" />
        // Related Commits
      </h3>
      <div className="commit-list__container paper-card rounded-sm border border-border overflow-hidden">
        {commits.map((commit, index) => (
          <div
            key={commit.hash}
            className="commit-list__item"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="commit-list__hash-col">
              {commit.url ? (
                <a
                  href={commit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="commit-list__hash commit-list__hash--link"
                >
                  {commit.hash.slice(0, 7)}
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
              ) : (
                <span className="commit-list__hash">{commit.hash.slice(0, 7)}</span>
              )}
            </div>
            <div className="commit-list__message">{commit.message}</div>
            <div className="commit-list__meta">
              <span className="commit-list__author">{commit.author}</span>
              <span className="commit-list__date">
                {new Date(commit.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
