"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Paperclip, Tag, Calendar, Code, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { FALLBACK_PROJECTS, ProjectItem } from "@/lib/projects-data";
import { Footer } from "@/components/footer";
import { VideoCommentSection } from "@/components/video-comments/video-comment-section";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single();

        if (!error && data) {
          setProject(data as ProjectItem);
        } else {
          // Fallback to local data matching ID
          const local = FALLBACK_PROJECTS.find((p) => p.id === id);
          if (local) setProject(local);
        }
      } catch (err) {
        console.error("Error fetching project detail:", err);
        const local = FALLBACK_PROJECTS.find((p) => p.id === id);
        if (local) setProject(local);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center font-mono">
        <div className="masking-tape px-4 py-2 text-black font-bold animate-pulse text-sm">
          [LOADING SPECIFICATION SHEET FILE_{id}...]
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="paper-card p-8 max-w-md bg-card rounded-sm border-2 border-border mb-6">
          <h1 className="text-3xl font-black uppercase mb-4 text-foreground">
            Project Not Found
          </h1>
          <p className="text-muted-foreground font-mono text-sm mb-6">
            FILE_{id} does not exist in the active workbench records.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 font-mono font-bold text-sm uppercase bg-primary text-primary-foreground hover:opacity-90 rounded-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Workbench
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen selection:bg-primary/20 selection:text-foreground bg-background text-foreground">
      {/* Background grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:30px_30px] opacity-10 pointer-events-none" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>[Back to Workbench]</span>
          </Link>
          <div className="masking-tape px-3 py-1 font-mono text-xs font-bold text-black transform rotate-1">
            FILE_{project.id} // SPEC SHEET
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-12"
        >
          {/* Title Header */}
          <div className="border-b-2 border-border pb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="font-mono text-xs bg-muted text-muted-foreground px-3 py-1 rounded-sm border border-border uppercase">
                Project #{project.id}
              </span>
              <span className="font-mono text-xs bg-primary/10 text-primary px-3 py-1 rounded-sm border border-primary/30 uppercase font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Active Record
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground">
              {project.title}
            </h1>
          </div>

          {/* Grid Layout: Left Image Polaroid, Right Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Image Preview Polaroid */}
            <div className="col-span-12">
              <div className="paper-card group relative p-4 bg-card rounded-sm border border-border shadow-md">
                <div className="absolute -top-4 left-6 text-muted-foreground z-30 drop-shadow-md transform -rotate-12">
                  <Paperclip className="w-10 h-10" strokeWidth={1.5} />
                </div>

                <div className="relative aspect-[4/3] bg-muted border border-border p-2 pb-10 shadow-sm">
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-3 right-4 font-mono text-xs text-muted-foreground">
                    IMG_REF_{project.id}.PNG
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specs & Description */}
            <div className="col-span-12 space-y-8">
              {/* Article Content */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-bold">
                  // Article Content
                </h3>
             
                  <div
                    className="article-content prose prose-neutral dark:prose-invert max-w-none text-foreground font-sans leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
               
              </div>

              {/* Long Description if available */}
              {project.long_description && (
                <div className="space-y-3">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-bold">
                    // Detailed Specification
                  </h3>
                  <p className="text-muted-foreground font-sans leading-relaxed text-sm">
                    {project.long_description}
                  </p>
                </div>
              )}

              {/* Tech Stack Tags */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  // Tech Stack & Dependencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono bg-muted text-foreground px-3 py-1 rounded-sm border border-border font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-border">
                <a
                  href={project.link || "#"}
                  target={project.link?.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 w-full py-4 font-sans font-bold text-base uppercase text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 rounded-sm shadow-sm"
                >
                  <span>Launch Live Project</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-16"
        >
          <VideoCommentSection
            contentType="project"
            contentId={project.id}
            commentsEnabled={project.comments_enabled ?? false}
          />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
