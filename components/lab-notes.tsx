"use client";

import { motion } from "framer-motion";
import { StickyNote, Pin } from "lucide-react";

const NOTES = [
  {
    id: "NOTE_8902",
    date: "2024.03.15",
    content:
      "Rewrote the rendering engine in WebGL. It's faster, but now all the colors are inverted and I can't figure out why. Leaving it for now, it's a 'feature'.",
    tags: ["WebGL", "Bug"],
    color: "bg-yellow-100 dark:bg-yellow-900/50",
    rotate: "-rotate-2",
  },
  {
    id: "NOTE_8891",
    date: "2024.03.12",
    content:
      "Spent 6 hours optimizing a regex that runs once on startup. Peak engineering.",
    tags: ["Optimization", "Regret"],
    color: "bg-blue-50 dark:bg-blue-900/40",
    rotate: "rotate-1",
  },
  {
    id: "NOTE_8845",
    date: "2024.03.01",
    content:
      "Just discovered a new CSS feature. Everything is going to be a grid now. Grid everywhere. You can't stop me.",
    tags: ["CSS", "Grid"],
    color: "bg-orange-50 dark:bg-orange-900/40",
    rotate: "-rotate-1",
  },
  {
    id: "NOTE_8799",
    date: "2024.02.20",
    content:
      "Tried to use a state machine for a simple toggle button. Over-engineering is a disease and I am patient zero.",
    tags: ["State", "Architecture"],
    color: "bg-green-50 dark:bg-green-900/40",
    rotate: "rotate-2",
  },
];

export function LabNotes() {
  return (
    <section className="py-32 relative border-b border-border bg-card graph-grid">
      <div className="container px-6 relative z-10 mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <StickyNote className="w-10 h-10 text-primary" strokeWidth={1.5} />
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground">
            Workshop{" "}
            <span className="text-primary italic font-serif lowercase tracking-normal">
              Notes
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {NOTES.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`group relative ${note.color} border border-border/50 p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-2 hover:scale-105 ${note.rotate} cursor-pointer`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-destructive drop-shadow-sm">
                <Pin className="w-6 h-6 fill-current" />
              </div>

              <div className="flex justify-between items-center mb-4 pb-2 border-b border-black/10 dark:border-white/10">
                <span className="font-mono text-foreground/70 text-xs font-bold">
                  {note.id}
                </span>
                <span className="font-mono text-muted-foreground text-[10px]">
                  {note.date}
                </span>
              </div>

              <p className="font-sans text-foreground/90 leading-relaxed mb-6 text-sm font-medium">
                {note.content}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 bg-black/5 dark:bg-white/10 text-foreground/70 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
