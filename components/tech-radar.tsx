"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";

const RADAR_ITEMS = [
  { name: "Rust", category: "Adopt", angle: 30, distance: 30, color: "primary" },
  { name: "WASM", category: "Adopt", angle: 60, distance: 45, color: "primary" },
  { name: "WebGL", category: "Trial", angle: 120, distance: 65, color: "secondary" },
  { name: "Svelte", category: "Trial", angle: 150, distance: 70, color: "secondary" },
  { name: "WebGPU", category: "Assess", angle: 210, distance: 85, color: "accent" },
  { name: "Solid", category: "Assess", angle: 240, distance: 90, color: "accent" },
  { name: "Redux", category: "Hold", angle: 310, distance: 95, color: "muted-foreground" },
  { name: "Angular", category: "Hold", angle: 340, distance: 80, color: "muted-foreground" },
];

export function TechRadar() {
  return (
    <section className="py-32 relative border-b border-border blueprint-grid bg-muted/20">
      <div className="container px-6 relative z-10 mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <Compass className="w-12 h-12 text-secondary mb-4 drop-shadow-sm" strokeWidth={1.5} />
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground mb-4 bg-background px-4 py-1 border-2 border-foreground transform -rotate-1">
            Tech{" "}
            <span className="text-secondary italic font-serif lowercase tracking-normal">
              Radar
            </span>
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mt-4 bg-background/80 p-2 border border-border backdrop-blur-sm">
            Drafting out new tools, frameworks, and dangerous ideas on the blueprint.
          </p>
        </div>

        <div className="relative w-full max-w-2xl mx-auto aspect-square rounded-full flex items-center justify-center border-2 border-secondary/30 bg-background/50 shadow-inner">
          <svg
            className="absolute inset-0 w-full h-full opacity-30 text-secondary pointer-events-none"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 4" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" />
          </svg>

          {RADAR_ITEMS.map((item, i) => {
            const angleRad = (item.angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * item.distance;
            const y = Math.sin(angleRad) * item.distance;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1, type: "spring" }}
                className="absolute flex items-center justify-center group z-20 cursor-crosshair"
                style={{
                  left: `calc(50% + ${x}%)`,
                  top: `calc(50% + ${y}%)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className={`w-4 h-4 rounded-full bg-${item.color} border-2 border-foreground shadow-sm`} />

                <span className="absolute left-6 font-mono text-xs font-bold text-foreground whitespace-nowrap bg-background px-2 py-1 border-2 border-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] rounded-sm z-30 transition-transform group-hover:scale-105 origin-left">
                  {item.name}{" "}
                  <span className="text-muted-foreground font-normal">
                    [{item.category}]
                  </span>
                </span>
              </motion.div>
            );
          })}

          <div className="absolute bottom-0 right-0 md:-right-12 translate-y-1/2 bg-card border-2 border-foreground p-4 font-mono text-xs hidden sm:block shadow-[4px_4px_0px_0px_hsl(var(--foreground))] rounded-sm transform rotate-1">
            <div className="font-bold mb-2 uppercase border-b-2 border-foreground pb-1">Legend</div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-primary border border-foreground" /> Adopt
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-secondary border border-foreground" /> Trial
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-accent border border-foreground" /> Assess
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground border border-foreground" /> Hold
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
