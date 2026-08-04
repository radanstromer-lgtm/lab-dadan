"use client";

import { useEffect } from "react";
import { useSectionVisibility } from "@/lib/hooks/use-section-visibility";

import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Courses } from "@/components/courses";
import { LabNotes } from "@/components/lab-notes";
import { TechRadar } from "@/components/tech-radar";
import { Graveyard } from "@/components/graveyard";
import { Footer } from "@/components/footer";

export default function Home() {
  const { visibility } = useSectionVisibility();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-primary/20 selection:text-foreground">
      {/* Paper grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-40 mix-blend-multiply opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <main className="relative z-10">
        <Hero />

        <div className="relative">
          {/* Decorative measuring tape / ruler connecting sections */}
          <div className="absolute left-8 top-0 bottom-0 w-8 border-r border-border hidden md:flex flex-col opacity-30">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-full border-b border-border flex items-end justify-end pr-1 pb-1"
              >
                <span className="text-[8px] font-mono text-muted-foreground">
                  {i * 10}
                </span>
              </div>
            ))}
          </div>

          {visibility.projects && <Projects />}
          {visibility.courses && <Courses />}
          {visibility.tech_radar && <TechRadar />}
          {visibility.lab_notes && <LabNotes />}
          {visibility.graveyard && <Graveyard />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

