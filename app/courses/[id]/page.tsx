"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  GraduationCap,
  BookOpen,
  Clock,
  Users,
  Play,
  FileText,
  HelpCircle,
  Code2,
  Lock,
  Unlock,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import {
  FALLBACK_COURSES,
  FALLBACK_MODULES,
  CourseItem,
  CourseModule,
} from "@/lib/courses-data";
import { Footer } from "@/components/footer";

const LEVEL_STYLES: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Beginner: {
    bg: "bg-green-100/60 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-400",
    border: "border-green-300/50 dark:border-green-700/50",
  },
  Intermediate: {
    bg: "bg-yellow-100/60 dark:bg-yellow-900/30",
    text: "text-yellow-700 dark:text-yellow-400",
    border: "border-yellow-300/50 dark:border-yellow-700/50",
  },
  Advanced: {
    bg: "bg-red-100/60 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-300/50 dark:border-red-700/50",
  },
};

const CONTENT_TYPE_ICON: Record<string, React.ReactNode> = {
  video: <Play className="w-3.5 h-3.5" />,
  article: <FileText className="w-3.5 h-3.5" />,
  quiz: <HelpCircle className="w-3.5 h-3.5" />,
  exercise: <Code2 className="w-3.5 h-3.5" />,
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [course, setCourse] = useState<CourseItem | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourse() {
      try {
        const supabase = createClient();

        // Fetch course
        const { data: courseData, error: courseError } = await supabase
          .from("courses_with_stats")
          .select("*")
          .eq("id", id)
          .single();

        if (!courseError && courseData) {
          setCourse(courseData as CourseItem);
        } else {
          const local = FALLBACK_COURSES.find((c) => c.id === id);
          if (local) setCourse(local);
        }

        // Fetch modules
        const { data: moduleData, error: moduleError } = await supabase
          .from("course_modules")
          .select("*")
          .eq("course_id", id)
          .order("sort_order", { ascending: true });

        if (!moduleError && moduleData && moduleData.length > 0) {
          setModules(moduleData as CourseModule[]);
        } else {
          setModules(
            FALLBACK_MODULES.filter((m) => m.course_id === id)
          );
        }
      } catch (err) {
        console.error("Error fetching course detail:", err);
        const local = FALLBACK_COURSES.find((c) => c.id === id);
        if (local) setCourse(local);
        setModules(FALLBACK_MODULES.filter((m) => m.course_id === id));
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center font-mono">
        <div className="masking-tape px-4 py-2 text-black font-bold animate-pulse text-sm">
          [LOADING SYLLABUS {id.toUpperCase()}...]
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="paper-card p-8 max-w-md bg-card rounded-sm border-2 border-border mb-6">
          <h1 className="text-3xl font-black uppercase mb-4 text-foreground">
            Course Not Found
          </h1>
          <p className="text-muted-foreground font-mono text-sm mb-6">
            SYLLABUS_{id} does not exist in the teaching lab records.
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

  const levelStyle = LEVEL_STYLES[course.level] || LEVEL_STYLES.Beginner;

  return (
    <div className="relative min-h-screen selection:bg-secondary/20 selection:text-foreground bg-background text-foreground">
      {/* Background grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:30px_30px] opacity-10 pointer-events-none" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/#courses"
            className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase text-muted-foreground hover:text-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>[Back to Workbench]</span>
          </Link>
          <div className="masking-tape px-3 py-1 font-mono text-xs font-bold text-black transform rotate-1">
            {course.id.toUpperCase()} // SYLLABUS
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
                {course.format}
              </span>
              <span
                className={`text-xs font-mono font-bold px-3 py-1 rounded-sm border ${levelStyle.bg} ${levelStyle.text} ${levelStyle.border}`}
              >
                {course.level}
              </span>
              {course.status !== "Published" && (
                <span className="font-mono text-xs bg-accent/20 text-accent-foreground px-3 py-1 rounded-sm border border-accent/30 uppercase font-bold">
                  {course.status}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground mb-4">
              {course.title}
            </h1>

            {/* Meta info row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-mono text-sm">
                <BookOpen className="w-4 h-4" />
                {course.module_count ?? modules.length} modules
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-sm">
                <Clock className="w-4 h-4" />
                {course.duration}
              </span>
              {(course.enrollment_count ?? 0) > 0 && (
                <span className="inline-flex items-center gap-1.5 font-mono text-sm">
                  <Users className="w-4 h-4" />
                  {course.enrollment_count} enrolled
                </span>
              )}
            </div>
          </div>

          {/* Cover Image — Polaroid */}
          <div className="paper-card group relative p-4 bg-card rounded-sm border border-border shadow-md">
            <div className="absolute -top-4 left-6 text-secondary z-30 drop-shadow-md">
              <GraduationCap className="w-10 h-10" strokeWidth={1.5} />
            </div>

            <div className="relative aspect-[16/9] bg-muted border border-border p-2 pb-10 shadow-sm">
              <div className="w-full h-full overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-3 right-4 font-mono text-xs text-muted-foreground">
                COVER_{course.id.toUpperCase()}.PNG
              </div>
            </div>
          </div>

          {/* Two-column: Description + Tech Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-8 space-y-8">
              {/* Description */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-bold">
                  // Course Overview
                </h3>
                <p className="text-foreground font-sans leading-relaxed">
                  {course.description}
                </p>
                {course.long_description && (
                  <p className="text-muted-foreground font-sans leading-relaxed text-sm">
                    {course.long_description}
                  </p>
                )}
              </div>

              {/* Syllabus / Module List */}
              {modules.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    // Syllabus — {modules.length} Modules
                  </h3>

                  <div className="relative">
                    {/* Timeline connector line */}
                    <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />

                    <div className="space-y-0">
                      {modules.map((mod, i) => (
                        <motion.div
                          key={mod.id}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: i * 0.05,
                          }}
                          className="relative flex items-start gap-4 py-4 group/mod"
                        >
                          {/* Timeline dot */}
                          <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-card border-2 border-border flex items-center justify-center shadow-sm group-hover/mod:border-secondary transition-colors">
                            <span className="font-mono text-xs font-bold text-muted-foreground group-hover/mod:text-secondary transition-colors">
                              {String(mod.sort_order).padStart(2, "0")}
                            </span>
                          </div>

                          {/* Module content */}
                          <div className="flex-1 bg-card border border-border rounded-sm p-4 shadow-sm hover:shadow-md transition-shadow group-hover/mod:border-secondary/30">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <h4 className="font-sans font-bold text-foreground text-sm uppercase tracking-tight group-hover/mod:text-secondary transition-colors">
                                  {mod.title}
                                </h4>
                                {mod.description && (
                                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                                    {mod.description}
                                  </p>
                                )}
                              </div>

                              {/* Free / Locked indicator */}
                              <div className="flex-shrink-0 mt-0.5">
                                {mod.is_free ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-green-600 dark:text-green-400 bg-green-100/60 dark:bg-green-900/30 px-2 py-0.5 rounded-sm border border-green-300/50 dark:border-green-700/50">
                                    <Unlock className="w-3 h-3" />
                                    FREE
                                  </span>
                                ) : (
                                  <Lock className="w-3.5 h-3.5 text-muted-foreground/40" />
                                )}
                              </div>
                            </div>

                            {/* Meta row */}
                            <div className="flex items-center gap-3 mt-3 text-muted-foreground">
                              <span className="inline-flex items-center gap-1 font-mono text-[10px] capitalize">
                                {CONTENT_TYPE_ICON[mod.content_type] || (
                                  <Play className="w-3 h-3" />
                                )}
                                {mod.content_type}
                              </span>
                              {mod.duration && (
                                <span className="inline-flex items-center gap-1 font-mono text-[10px]">
                                  <Clock className="w-3 h-3" />
                                  {mod.duration}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar: Tech Stack + CTA */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Tech Stack Tags */}
              <div className="paper-card p-5 bg-card rounded-sm space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  // Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono bg-muted text-foreground px-3 py-1 rounded-sm border border-border font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Course Info Card */}
              <div className="paper-card p-5 bg-card rounded-sm space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-bold">
                  // Course Info
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-muted-foreground">Format</span>
                    <span className="text-foreground font-bold">
                      {course.format}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="text-foreground font-bold">
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-muted-foreground">Level</span>
                    <span
                      className={`font-bold ${levelStyle.text}`}
                    >
                      {course.level}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-muted-foreground">Modules</span>
                    <span className="text-foreground font-bold">
                      {course.module_count ?? modules.length}
                    </span>
                  </div>
                  {(course.enrollment_count ?? 0) > 0 && (
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-muted-foreground">Enrolled</span>
                      <span className="text-foreground font-bold">
                        {course.enrollment_count}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <a
                href={course.link || "#"}
                target={course.link?.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full py-4 font-sans font-bold text-base uppercase text-secondary border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 rounded-sm shadow-sm"
              >
                <span>
                  {course.status === "Coming Soon"
                    ? "Notify Me"
                    : "Start Learning"}
                </span>
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
