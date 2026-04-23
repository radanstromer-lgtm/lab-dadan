"use client";

import { motion } from "framer-motion";
import { PackageOpen, AlertTriangle } from "lucide-react";

const DEAD_PROJECTS = [
  {
    name: "SocialSync",
    lifespan: "2022-2022",
    cause: "API rate limits and crushing existential dread.",
    epitaph: "It tried to connect everyone, but died alone.",
  },
  {
    name: "CryptoPets",
    lifespan: "Jan 2021 - Feb 2021",
    cause: "Realized I was part of the problem.",
    epitaph: "RIP to the blockchain tamagotchi.",
  },
  {
    name: "Framework X",
    lifespan: "3 Days in 2023",
    cause: "Scope creep fatal overdose.",
    epitaph: "Another JS framework the world didn't need.",
  },
  {
    name: "SmartToaster",
    lifespan: "2020-2021",
    cause: "Caught fire. Literally.",
    epitaph: "Burnt bread and broken dreams.",
  },
];

export function Graveyard() {
  return (
    <section className="py-32 relative border-b border-border bg-muted/40">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="container px-6 relative z-10 mx-auto">
        <div className="flex items-center gap-4 mb-16 justify-end text-right">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground">
            Abandoned{" "}
            <span className="text-accent italic font-serif lowercase tracking-normal">
              Projects
            </span>
          </h2>
          <PackageOpen className="w-10 h-10 text-muted-foreground" strokeWidth={1.5} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEAD_PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-[#c8bba3] dark:bg-[#4a4233] p-1 border-2 border-[#a39478] dark:border-[#383124] shadow-md flex flex-col group transform hover:rotate-1 transition-transform"
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.02)_50%,transparent_100%)] pointer-events-none" />

              <div className="flex-1 bg-[#d4c7b2] dark:bg-[#564e3f] p-5 flex flex-col border border-[#e5dcce] dark:border-[#635a4a] relative">
                <div className="masking-tape self-start px-3 py-1 font-mono text-xs font-bold mb-4 transform -rotate-2 -ml-2 -mt-2">
                  BOX_ID: {i + 1}
                </div>

                <h3 className="font-sans text-2xl font-black text-foreground/90 mb-1 uppercase tracking-tight">
                  {project.name}
                </h3>
                <p className="font-mono text-xs text-muted-foreground/80 mb-4 pb-2 border-b border-black/10 dark:border-white/10">
                  [{project.lifespan}]
                </p>

                <p className="font-serif text-sm text-foreground/70 italic mb-6 flex-1">
                  &quot;{project.epitaph}&quot;
                </p>

                <div className="w-full bg-red-100/50 dark:bg-red-900/20 border border-red-500/20 p-3 mt-auto flex items-start gap-2 rounded-sm text-left">
                  <AlertTriangle className="w-4 h-4 text-red-600/80 dark:text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] font-mono text-red-600/80 dark:text-red-400 uppercase font-bold mb-1">
                      Reason Shelved:
                    </span>
                    <span className="block text-xs font-sans text-foreground/80">
                      {project.cause}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
