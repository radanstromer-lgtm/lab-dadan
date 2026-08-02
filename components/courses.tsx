"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Clock,
  Users,
  Play,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { FALLBACK_COURSES, CourseItem } from "@/lib/courses-data";

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

const STATUS_ROTATE: Record<string, string> = {
  Published: "rotate-2",
  "In Progress": "-rotate-1",
  "Coming Soon": "rotate-1",
};

export function Courses() {
  const [courses, setCourses] = useState<CourseItem[]>(FALLBACK_COURSES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("courses_with_stats")
          .select("*")
          .order("id", { ascending: true });

        if (!error && data && data.length > 0) {
          setCourses(data as CourseItem[]);
        }
      } catch (err) {
        console.error("Error fetching courses from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return (
    <section
      id="courses"
      className="py-32 relative border-b border-border bg-card graph-grid"
    >
      <div className="container px-6 relative z-10 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap
                className="w-10 h-10 text-secondary"
                strokeWidth={1.5}
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground mb-4">
              Teaching{" "}
              <span className="text-secondary italic font-serif lowercase tracking-normal">
                Lab
              </span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm border-l-4 border-secondary pl-4 bg-muted/30 py-2">
              [Status: Syllabus brewing, materials ready]
            </p>
          </div>
          <div className="hidden md:flex gap-3">
            <div className="masking-tape px-3 py-1 font-mono text-xs font-bold text-black transform -rotate-2">
              WORKSHOPS & COURSES
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, i) => {
            const levelStyle = LEVEL_STYLES[course.level] || LEVEL_STYLES.Beginner;
            const statusRotate = STATUS_ROTATE[course.status] || "rotate-1";

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="paper-card group relative flex flex-row bg-card rounded-sm overflow-hidden"
              >
                {/* Binder Rings — decorative left edge */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-muted/50 border-r border-border flex flex-col items-center justify-center gap-6 z-20">
                  {[0, 1, 2].map((ring) => (
                    <div
                      key={ring}
                      className="w-4 h-4 rounded-full border-2 border-border bg-background shadow-inner"
                    />
                  ))}
                </div>

                {/* Card Content — shifted right for binder */}
                <div className="flex-1 pl-10 p-5 flex flex-col">
                  {/* Top row: Status badge + Level badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`masking-tape px-2 py-0.5 font-mono text-[10px] font-bold text-black transform ${statusRotate}`}
                    >
                      {course.status.toUpperCase()}
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm border ${levelStyle.bg} ${levelStyle.text} ${levelStyle.border}`}
                    >
                      {course.level}
                    </span>
                  </div>

                  {/* Cover Image — polaroid style */}
                  <div className="relative aspect-[16/9] mb-4 bg-muted border border-border p-1.5 pb-6 shadow-sm">
                    <div className="w-full h-full overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute bottom-1.5 right-2 font-mono text-[9px] text-muted-foreground">
                      COURSE_{course.id}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold uppercase mb-2 text-foreground group-hover:text-secondary transition-colors leading-tight">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground font-sans text-sm mb-4 flex-1 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Info bar: format, modules, duration, enrollments */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 py-2 border-y border-border/50 text-muted-foreground">
                    <span className="inline-flex items-center gap-1 font-mono text-[10px]">
                      <BookOpen className="w-3 h-3" />
                      {course.format}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px]">
                      <Play className="w-3 h-3" />
                      {course.module_count ?? 0} modules
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px]">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                    {(course.enrollment_count ?? 0) > 0 && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px]">
                        <Users className="w-3 h-3" />
                        {course.enrollment_count} enrolled
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {course.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono bg-muted text-muted-foreground px-2 py-0.5 rounded-sm border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/courses/${course.id}`}
                    className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 font-sans font-bold text-sm uppercase text-secondary border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors rounded-sm"
                  >
                    <span>View Syllabus</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
