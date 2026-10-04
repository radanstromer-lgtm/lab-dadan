"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Milestone } from "lucide-react";
import { motion } from "framer-motion";
import { ProjectUpdate } from "@/lib/projects-data";

interface ProjectTimelineProps {
  projectId: string;
  updates: ProjectUpdate[];
}

const UPDATE_TYPE_COLORS: Record<string, { dot: string; bg: string; label: string }> = {
  release:   { dot: "timeline-dot--release",   bg: "timeline-card--release",   label: "Release" },
  feature:   { dot: "timeline-dot--feature",   bg: "timeline-card--feature",   label: "Feature" },
  fix:       { dot: "timeline-dot--fix",       bg: "timeline-card--fix",       label: "Fix" },
  milestone: { dot: "timeline-dot--milestone", bg: "timeline-card--milestone", label: "Milestone" },
  redesign:  { dot: "timeline-dot--redesign",  bg: "timeline-card--redesign",  label: "Redesign" },
};

export function ProjectTimeline({ projectId, updates }: ProjectTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const sorted = [...updates].sort(
    (a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
  );

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [sorted.length]);

  function checkScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  }

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }

  if (sorted.length === 0) return null;

  return (
    <div className="timeline-section">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-2">
          <Milestone className="w-4 h-4" />
          // Development Journey
        </h3>
        {/* Desktop scroll buttons */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="timeline-scroll-btn"
            aria-label="Scroll timeline left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="timeline-scroll-btn"
            aria-label="Scroll timeline right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop horizontal timeline */}
      <div className="timeline-wrapper hidden md:block">
        {canScrollLeft && <div className="timeline-fade timeline-fade--left" />}
        {canScrollRight && <div className="timeline-fade timeline-fade--right" />}

        <div ref={scrollRef} className="timeline-scroll">
          {/* The horizontal line */}
          <div className="timeline-line" />

          <div className="timeline-items">
            {sorted.map((update, index) => {
              const typeStyle = UPDATE_TYPE_COLORS[update.update_type] || UPDATE_TYPE_COLORS.feature;
              const isTop = index % 2 === 0;

              return (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`timeline-node ${isTop ? "timeline-node--top" : "timeline-node--bottom"}`}
                >
                  {/* Connector line */}
                  <div className="timeline-connector" />

                  {/* Dot on the line */}
                  <div className={`timeline-dot ${typeStyle.dot}`} />

                  {/* Card */}
                  <Link
                    href={`/projects/${projectId}/updates/${update.id}`}
                    className={`timeline-card ${typeStyle.bg}`}
                  >
                    <div className="timeline-card__badge">
                      {typeStyle.label}
                    </div>
                    <div className="timeline-card__version">{update.version_label}</div>
                    <div className="timeline-card__title">{update.title}</div>
                    <div className="timeline-card__summary">{update.summary}</div>
                    <div className="timeline-card__date">
                      {new Date(update.published_at).toLocaleDateString("id-ID", {
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="timeline-mobile md:hidden">
        <div className="timeline-mobile__line" />
        {sorted.map((update, index) => {
          const typeStyle = UPDATE_TYPE_COLORS[update.update_type] || UPDATE_TYPE_COLORS.feature;
          return (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="timeline-mobile__item"
            >
              <div className={`timeline-mobile__dot ${typeStyle.dot}`} />
              <Link
                href={`/projects/${projectId}/updates/${update.id}`}
                className={`timeline-card ${typeStyle.bg}`}
              >
                <div className="timeline-card__badge">
                  {typeStyle.label}
                </div>
                <div className="timeline-card__version">{update.version_label}</div>
                <div className="timeline-card__title">{update.title}</div>
                <div className="timeline-card__summary">{update.summary}</div>
                <div className="timeline-card__date">
                  {new Date(update.published_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-6">
        {Object.entries(UPDATE_TYPE_COLORS).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full timeline-dot--legend ${val.dot}`} />
            <span className="font-mono text-[10px] uppercase text-muted-foreground">{val.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
