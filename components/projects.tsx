"use client";

import { motion } from "framer-motion";
import { ExternalLink, Paperclip } from "lucide-react";

const PROJECTS = [
  {
    id: "01",
    title: "Focus.exe",
    description:
      "A brutalist task manager that yells at you when you procrastinate. Dark mode only, obviously.",
    tags: ["React", "Zustand", "Tailwind"],
    image: "/images/project-1.png",
    link: "#",
  },
  {
    id: "02",
    title: "Chromatica",
    description:
      "Vector drawing tool with an overly complex generative gradient engine. Runs entirely in the browser.",
    tags: ["Canvas API", "WebGL", "TypeScript"],
    image: "/images/project-2.png",
    link: "#",
  },
  {
    id: "03",
    title: "Neon Void",
    description:
      "8-bit space shooter built to test WASM performance. Warning: extremely addictive and loud.",
    tags: ["Rust", "WASM", "HTML5"],
    image: "/images/project-3.png",
    link: "#",
  },
  {
    id: "04",
    title: "NeuroBabble",
    description:
      "An AI experiment that fine-tunes small language models on my old cringey blog posts.",
    tags: ["Python", "Transformers", "React"],
    image: "/images/project-4.png",
    link: "#",
  },
  {
    id: "05",
    title: "MathArt.js",
    description:
      "Swirling chaotic particles forming geometric patterns based on user audio input.",
    tags: ["Three.js", "WebAudio API"],
    image: "/images/project-5.png",
    link: "#",
  },
  {
    id: "06",
    title: "Pulse Dash",
    description:
      "Over-engineered data visualization dashboard for tracking literally nothing important.",
    tags: ["D3.js", "Vue", "Framer Motion"],
    image: "/images/project-6.png",
    link: "#",
  },
  {
    id: "07",
    title: "ChronoSync",
    description:
      "Sleek timezone converter because scheduling meetings across the globe is a nightmare.",
    tags: ["Svelte", "Luxon"],
    image: "/images/project-7.png",
    link: "#",
  },
  {
    id: "08",
    title: "JellyBlob",
    description:
      "A weird surreal web toy with floating 3D jelly blobs that follow your cursor.",
    tags: ["React Three Fiber", "Cannon.js"],
    image: "/images/project-8.png",
    link: "#",
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="py-32 relative border-b border-border bg-background"
    >
      <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:30px_30px] opacity-10" />

      <div className="container px-6 relative z-10 mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground mb-4">
              Active{" "}
              <span className="text-primary italic font-serif lowercase tracking-normal">
                Projects
              </span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm border-l-4 border-secondary pl-4 bg-muted/30 py-2">
              [Status: Workbench cluttered, progress steady]
            </p>
          </div>
          <div className="hidden md:flex gap-3">
            <div className="masking-tape px-3 py-1 font-mono text-xs font-bold text-black transform rotate-2">
              IN PROGRESS
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="paper-card group relative flex flex-col p-4 bg-card rounded-sm"
            >
              <div className="absolute -top-3 left-4 text-muted-foreground z-30 drop-shadow-md transform -rotate-12">
                <Paperclip className="w-8 h-8" strokeWidth={1.5} />
              </div>

              <div className="relative aspect-[4/3] mb-4 bg-muted border border-border p-2 pb-8 shadow-sm">
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-2 right-3 font-mono text-[10px] text-muted-foreground">
                  FILE_{project.id}
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold uppercase mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground font-sans text-sm mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono bg-muted text-muted-foreground px-2 py-0.5 rounded-sm border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 font-sans font-bold text-sm uppercase text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-colors rounded-sm"
                >
                  <span>Inspect</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
