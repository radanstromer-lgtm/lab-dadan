"use client";

import { motion } from "framer-motion";
import { PencilRuler, ArrowDown, Mail, Youtube, Linkedin, Github } from "lucide-react";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 2.226.725 4.283 1.956 5.952L2.5 21.5l3.655-1.424A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.802 0-3.483-.5-4.922-1.37l-.353-.213-2.67.1.8-2.613-.231-.368A7.955 7.955 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
    </svg>
  );
}

function MediumIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden border-b border-border pt-20 pb-16 sm:pt-24 sm:pb-32">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              animate={{ opacity: 1, rotate: -2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="masking-tape inline-flex items-center gap-2 px-4 py-2 mb-6 sm:mb-8 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-black self-start"
            >
              <PencilRuler className="w-4 h-4" />
              Workspace // Dadan
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground mb-5 uppercase leading-[0.95]">
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
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground font-sans max-w-2xl mb-4 sm:mb-8 leading-relaxed border-l-4 border-accent pl-4 sm:pl-6 bg-card/40 p-3 sm:p-4 rounded-r-md backdrop-blur-sm"
            >
              Selamat datang di workshop saya. I&apos;m Dadan, a curious builder exploring weird ideas, new tools, and physical-digital experiments. Some work, some break, all are fun.
            </motion.p>

            {/* MOBILE ONLY: Expansive Full-Bleed Sketch - "Seolah full mengisi" without covering face or identity text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="block lg:hidden relative w-[calc(100%+3rem)] -mx-6 sm:w-full sm:mx-0 my-3 sm:my-5"
            >
              <div className="relative w-full max-w-[460px] mx-auto px-2">
                {/* Subtle warm workshop light glow behind sketch */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent blur-2xl -z-10 rounded-full scale-95 opacity-70 pointer-events-none" />
                <img
                  src="/images/scetch-hero-dadan.png"
                  alt="Dadan Workshop Sketch"
                  className="w-full h-auto object-contain drop-shadow-xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="space-y-4 sm:space-y-5"
            >
              {/* Wording Kolaborasi / Sharing Ide */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-accent/15 border border-accent/40 text-foreground text-xs sm:text-sm font-mono font-semibold backdrop-blur-md shadow-sm w-full sm:w-auto justify-center sm:justify-start">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                </span>
                <span className="text-center sm:text-left">Terbuka untuk kolaborasi proyek, konsultasi, atau sekadar sharing ide!</span>
              </div>

              {/* Contacts & Social Media Buttons: Proportional on Mobile */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                {/* Primary CTA Buttons (50% - 50% on Mobile) */}
                <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
                  <a
                    href="mailto:email@dadan.id"
                    className="group relative inline-flex items-center justify-center px-4 py-3 font-sans font-bold text-primary-foreground bg-primary uppercase tracking-wider transition-all hover:bg-primary/90 hover:scale-[1.02] shadow-[3px_3px_0px_0px_hsl(var(--foreground))] hover:shadow-[1px_1px_0px_0px_hsl(var(--foreground))] hover:translate-x-[1px] hover:translate-y-[1px] rounded-sm text-xs sm:text-sm text-center"
                  >
                    <Mail className="w-4 h-4 mr-1.5 shrink-0" />
                    <span>Email Saya</span>
                  </a>

                  <a
                    href="https://wa.me/6283874917977"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center px-4 py-3 font-sans font-bold text-foreground bg-card border border-border uppercase tracking-wider transition-all hover:bg-muted hover:scale-[1.02] shadow-[3px_3px_0px_0px_hsl(var(--foreground))] hover:shadow-[1px_1px_0px_0px_hsl(var(--foreground))] hover:translate-x-[1px] hover:translate-y-[1px] rounded-sm text-xs sm:text-sm text-center"
                  >
                    <WhatsAppIcon className="w-4 h-4 mr-1.5 text-emerald-500 shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Social Channels Container (Evenly spaced on Mobile) */}
                <div className="flex items-center justify-around sm:justify-center gap-2 text-muted-foreground bg-card/60 p-2 rounded-md border border-border backdrop-blur-sm w-full sm:w-auto">
                  <a
                    href="https://github.com/radanstromer-lgtm"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-2 hover:text-primary hover:bg-muted rounded transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dadan-dadan-b3322a68/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2 hover:text-secondary hover:bg-muted rounded transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.youtube.com/@dadanid3005"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="p-2 hover:text-red-500 hover:bg-muted rounded transition-colors"
                    title="YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a
                    href="https://medium.com/@radan.stromer"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Medium"
                    className="p-2 hover:text-foreground hover:bg-muted rounded transition-colors"
                    title="Medium"
                  >
                    <MediumIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* DESKTOP ONLY: Sketch Column on Right */}
          <div className="hidden lg:flex lg:col-span-6 items-end justify-end w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full max-w-none"
            >
              <img
                src="/images/scetch-hero-dadan.png"
                alt="Dadan Sketch"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-3 sm:bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ArrowDown className="w-5 h-5 sm:w-7 sm:h-7 opacity-40" />
      </motion.div>
    </section>
  );
}
