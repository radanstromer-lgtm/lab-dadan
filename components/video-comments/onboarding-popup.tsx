"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  LogIn,
  Video,
  Eye,
  Upload,
  Shield,
  PlayCircle,
} from "lucide-react";

const ONBOARDING_KEY = "videoCommentOnboarded";

interface OnboardingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  tutorialVideoUrl?: string;
}

const slides = [
  {
    type: "intro" as const,
    icon: null,
    title: null,
    content: null,
  },
  {
    type: "step" as const,
    icon: LogIn,
    title: "Login",
    content: "Masuk dengan akun Google Anda untuk mengizinkan upload ke YouTube",
  },
  {
    type: "step" as const,
    icon: Video,
    title: "Rekam",
    content:
      "Nyalakan kamera, sampaikan pendapat Anda dalam maksimal 2 menit",
  },
  {
    type: "step" as const,
    icon: Eye,
    title: "Preview",
    content: "Tonton kembali rekaman Anda, ulangi jika perlu",
  },
  {
    type: "step" as const,
    icon: Upload,
    title: "Kirim",
    content:
      "Video akan di-upload ke playlist private YouTube Anda, komentar menunggu moderasi",
  },
  {
    type: "step" as const,
    icon: Shield,
    title: "Kontrol",
    content:
      "Setelah disetujui admin, Anda bisa mengatur apakah komentar ditampilkan ke publik atau hanya untuk Anda sendiri — langsung dari website ini",
  },
];

export function OnboardingPopup({
  isOpen,
  onClose,
  tutorialVideoUrl,
}: OnboardingPopupProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    onClose();
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((s) => s + 1);
    } else {
      handleComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((s) => s - 1);
    }
  };

  // Reset slide on open
  useEffect(() => {
    if (isOpen) setCurrentSlide(0);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleComplete}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg bg-card border-2 border-border rounded-sm shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/50">
              <div className="font-mono text-xs font-bold uppercase text-muted-foreground">
                // Cara Kerja Komentar Video
              </div>
              <button
                onClick={handleComplete}
                className="p-1.5 rounded-sm hover:bg-muted transition-colors"
                aria-label="Tutup"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Slide Content */}
            <div className="px-6 py-8 min-h-[280px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {slides[currentSlide].type === "intro" ? (
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-6">
                        <Video className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-foreground font-sans leading-relaxed text-sm">
                        Ini adalah sistem komentar berbasis video — sebuah
                        eksperimen dari saya. Tujuannya sederhana: mendapatkan
                        sudut pandang yang benar-benar orisinil dari pembaca
                        seperti Anda.
                      </p>
                      <p className="text-muted-foreground font-sans leading-relaxed text-sm">
                        Di era dimana AI sudah sangat mudah memoles setiap teks
                        menjadi sempurna, video memberikan ruang untuk
                        berinteraksi secara lebih autentik — tanpa bumbu-bumbu
                        pemanis yang dibuat-buat.
                      </p>
                      <p className="text-muted-foreground font-sans leading-relaxed text-sm italic">
                        Anda memegang kendali penuh. Video akan di-upload ke
                        akun YouTube Anda secara private. Anda yang menentukan
                        apakah komentar ditampilkan ke publik atau tidak.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-5">
                      <div className="shrink-0 w-14 h-14 rounded-sm bg-primary/10 flex items-center justify-center">
                        {(() => {
                          const Icon = slides[currentSlide].icon;
                          return Icon ? <Icon className="w-7 h-7 text-primary" /> : null;
                        })()}
                      </div>
                      <div className="space-y-2 pt-1">
                        <h3 className="font-mono text-base font-bold uppercase text-foreground">
                          {currentSlide}. {slides[currentSlide].title}
                        </h3>
                        <p className="text-muted-foreground font-sans leading-relaxed text-sm">
                          {slides[currentSlide].content}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer: Navigation + Actions */}
            <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-between gap-3">
              {/* Left side: Tutorial video button */}
              <div>
                {tutorialVideoUrl && (
                  <a
                    href={tutorialVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Lihat Video Tutorial
                  </a>
                )}
              </div>

              {/* Right side: Navigation */}
              <div className="flex items-center gap-2">
                {/* Dots indicator */}
                <div className="flex gap-1.5 mr-3">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentSlide
                          ? "bg-primary w-4"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>

                {currentSlide > 0 && (
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-sm border border-border hover:bg-muted transition-colors"
                    aria-label="Sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={nextSlide}
                  className="px-4 py-2 rounded-sm bg-primary text-primary-foreground font-mono text-xs font-bold uppercase hover:opacity-90 transition-opacity flex items-center gap-1.5"
                >
                  {currentSlide === slides.length - 1 ? (
                    "Mulai Berkomentar"
                  ) : (
                    <>
                      Lanjut
                      <ChevronRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Check if the user has seen the onboarding popup before
 */
export function hasSeenOnboarding(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ONBOARDING_KEY) === "true";
}
