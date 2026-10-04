"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Tag, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { ProjectItem, ProjectUpdate } from "@/lib/projects-data";
import { Footer } from "@/components/footer";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { CommitList } from "@/components/commit-list";
import { VideoCommentSection } from "@/components/video-comments/video-comment-section";

interface PageProps {
  params: Promise<{ id: string; updateId: string }>;
}

const UPDATE_TYPE_LABELS: Record<string, { label: string; className: string }> = {
  release:   { label: "Release",   className: "update-badge--release" },
  feature:   { label: "Feature",   className: "update-badge--feature" },
  fix:       { label: "Fix",       className: "update-badge--fix" },
  milestone: { label: "Milestone", className: "update-badge--milestone" },
  redesign:  { label: "Redesign",  className: "update-badge--redesign" },
};

export default function UpdateDetailPage({ params }: PageProps) {
  const { id, updateId } = use(params);
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [update, setUpdate] = useState<ProjectUpdate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();

        // Fetch project
        const { data: projData } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single();

        if (projData) setProject(projData as ProjectItem);

        // Fetch update
        const { data: updateData } = await supabase
          .from("project_updates")
          .select("*")
          .eq("id", updateId)
          .single();

        if (updateData) {
          setUpdate({
            ...updateData,
            commits: updateData.commits || [],
          } as ProjectUpdate);
        }
      } catch (err) {
        console.error("Error fetching update detail:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, updateId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center font-mono">
        <div className="masking-tape px-4 py-2 text-black font-bold animate-pulse text-sm">
          [LOADING UPDATE LOG...]
        </div>
      </div>
    );
  }

  if (!update) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="paper-card p-8 max-w-md bg-card rounded-sm border-2 border-border mb-6">
          <h1 className="text-3xl font-black uppercase mb-4 text-foreground">
            Update Not Found
          </h1>
          <p className="text-muted-foreground font-mono text-sm mb-6">
            This development log entry does not exist.
          </p>
          <Link
            href={`/projects/${id}`}
            className="inline-flex items-center gap-2 px-6 py-3 font-mono font-bold text-sm uppercase bg-primary text-primary-foreground hover:opacity-90 rounded-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Project
          </Link>
        </div>
      </div>
    );
  }

  const typeInfo = UPDATE_TYPE_LABELS[update.update_type] || UPDATE_TYPE_LABELS.feature;

  return (
    <div className="relative min-h-screen selection:bg-primary/20 selection:text-foreground bg-background text-foreground">
      {/* Background grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:30px_30px] opacity-10 pointer-events-none" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href={`/projects/${id}`}
            className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>[Back to {project?.title || "Project"}]</span>
          </Link>
          <div className="masking-tape px-3 py-1 font-mono text-xs font-bold text-black transform rotate-1">
            UPDATE_LOG // {update.version_label}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-10"
        >
          {/* Version + Title Header */}
          <div className="border-b-2 border-border pb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`update-badge ${typeInfo.className}`}>
                <Tag className="w-3 h-3" />
                {typeInfo.label}
              </span>
              <span className="font-mono text-xs text-muted-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(update.published_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="font-mono text-sm text-primary font-bold mb-2 uppercase">
              {update.version_label}
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground">
              {update.title}
            </h1>
            <p className="mt-4 text-muted-foreground font-sans leading-relaxed">
              {update.summary}
            </p>
          </div>

          {/* YouTube Embed */}
          {update.youtube_url && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <YouTubeEmbed url={update.youtube_url} title={`${update.version_label} — ${update.title}`} />
            </motion.div>
          )}

          {/* Article Content */}
          {update.content && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <div
                className="article-content prose prose-neutral dark:prose-invert max-w-none text-foreground font-sans leading-relaxed"
                dangerouslySetInnerHTML={{ __html: update.content }}
              />
            </motion.div>
          )}

          {/* Related Commits */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <CommitList commits={update.commits} />
          </motion.div>
        </motion.div>

        {/* Video Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-16"
        >
          <VideoCommentSection
            contentType="project_update"
            contentId={update.id}
            commentsEnabled={project?.comments_enabled ?? false}
          />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
