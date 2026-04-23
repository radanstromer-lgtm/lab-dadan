"use client";

import { motion } from "framer-motion";
import { Wrench, PencilRuler, Hammer, ClipboardEdit, ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden border-b border-border pt-20 pb-32">
      {/* Background Image with Warm Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/85 z-10 backdrop-blur-sm" />
        <img
          src="/images/hero-bg.png"
          alt="Home garage workbench"
          className="w-full h-full object-cover opacity-60 sepia-[0.3]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] bg-[size:20px_20px] opacity-50 z-20" />
      </div>

      <div className="container relative z-30 px-6 mx-auto">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: -2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="masking-tape inline-flex items-center gap-2 px-4 py-2 mb-10 font-mono text-sm font-bold uppercase tracking-wider text-black"
          >
            <PencilRuler className="w-4 h-4" />
            Workspace // Dadan
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground mb-6 uppercase leading-[0.9]">
              <span className="block text-foreground drop-shadow-sm">I make things</span>
              <span className="block text-primary drop-shadow-sm">Because I</span>
              <span
                className="block text-secondary drop-shadow-sm"
                style={{
                  fontFamily: "var(--app-font-serif)",
                  textTransform: "none",
                  fontStyle: "italic",
                }}
              >
                Can&apos;t Stop.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground font-sans max-w-2xl mb-12 leading-relaxed border-l-4 border-accent pl-6 bg-card/40 p-4 rounded-r-md backdrop-blur-sm"
          >
            Selamat datang di workshop saya. I&apos;m Dadan, a curious builder exploring weird ideas, new tools, and physical-digital experiments. Some work, some break, all are fun.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-wrap items-center gap-6"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-sans font-bold text-primary-foreground bg-primary uppercase tracking-widest transition-all hover:bg-primary/90 hover:scale-[1.02] shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:translate-x-[2px] hover:translate-y-[2px] rounded-sm"
            >
              <Wrench className="w-5 h-5 mr-2" />
              Open Toolbox
            </a>

            <div className="flex gap-4 text-muted-foreground bg-card/50 p-3 rounded-full border border-border backdrop-blur-sm">
              <Hammer className="w-6 h-6 hover:text-accent transition-colors cursor-help" />
              <ClipboardEdit className="w-6 h-6 hover:text-secondary transition-colors cursor-help" />
              <Wrench className="w-6 h-6 hover:text-primary transition-colors cursor-help" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute right-0 top-1/4 hidden lg:block select-none opacity-10 text-secondary pointer-events-none">
        <svg
          width="400"
          height="400"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="rotate-12"
        >
          <circle cx="100" cy="100" r="80" strokeDasharray="4 4" />
          <path d="M20 100 H180 M100 20 V180" strokeDasharray="2 2" />
          <rect x="60" y="60" width="80" height="80" />
          <path d="M60 60 L140 140 M60 140 L140 60" strokeDasharray="1 3" />
        </svg>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ArrowDown className="w-8 h-8 opacity-40" />
      </motion.div>
    </section>
  );
}
