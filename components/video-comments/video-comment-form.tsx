"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, HelpCircle, CheckCircle, AlertCircle } from "lucide-react";
import { VideoRecorder } from "./video-recorder";
import { OnboardingPopup, hasSeenOnboarding } from "./onboarding-popup";

interface VideoCommentFormProps {
  onSubmit: (
    videoBlob: Blob,
    metadata: {
      commentText?: string;
      parentId?: string;
      durationSeconds?: number;
    }
  ) => Promise<{ success: boolean; message?: string; error?: string }>;
  parentId?: string;
  isReply?: boolean;
  onCancel?: () => void;
}

type FormState =
  | "idle"
  | "recording"
  | "compose"
  | "uploading"
  | "success"
  | "error";

export function VideoCommentForm({
  onSubmit,
  parentId,
  isReply = false,
  onCancel,
}: VideoCommentFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleStartRecording = () => {
    // Check if user has seen onboarding
    if (!hasSeenOnboarding()) {
      setShowOnboarding(true);
      return;
    }
    setFormState("recording");
  };

  const handleRecordingComplete = (blob: Blob, durationSeconds: number) => {
    setVideoBlob(blob);
    setVideoDuration(durationSeconds);
    setFormState("compose");
  };

  const handleSubmit = async () => {
    if (!videoBlob) return;

    setFormState("uploading");
    setUploadProgress(0);

    // Simulate progress (since we can't track actual upload progress with fetch)
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    const result = await onSubmit(videoBlob, {
      commentText: commentText.trim() || undefined,
      parentId,
      durationSeconds: videoDuration,
    });

    clearInterval(progressInterval);
    setUploadProgress(100);

    if (result.success) {
      setResultMessage(
        result.message || "Komentar berhasil dikirim! Menunggu moderasi."
      );
      setFormState("success");
      // Reset after delay
      setTimeout(() => {
        resetForm();
      }, 5000);
    } else {
      setResultMessage(result.error || "Gagal mengirim komentar.");
      setFormState("error");
    }
  };

  const resetForm = () => {
    setFormState("idle");
    setVideoBlob(null);
    setVideoDuration(0);
    setCommentText("");
    setUploadProgress(0);
    setResultMessage("");
  };

  return (
    <div className={`${isReply ? "ml-8 mt-4" : ""}`}>
      <OnboardingPopup
        isOpen={showOnboarding}
        onClose={() => {
          setShowOnboarding(false);
          setFormState("recording");
        }}
      />

      <AnimatePresence mode="wait">
        {/* Idle state: Show record button */}
        {formState === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={handleStartRecording}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase rounded-sm hover:opacity-90 transition-opacity"
            >
              <Upload className="w-3.5 h-3.5" />
              {isReply ? "Balas dengan Video" : "Rekam Komentar Video"}
            </button>
            {!isReply && (
              <button
                onClick={() => setShowOnboarding(true)}
                className="p-2 rounded-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                title="Cara kerja"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            )}
            {onCancel && (
              <button
                onClick={onCancel}
                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                Batal
              </button>
            )}
          </motion.div>
        )}

        {/* Recording state */}
        {formState === "recording" && (
          <motion.div
            key="recording"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="paper-card p-4 bg-card border border-border rounded-sm"
          >
            <VideoRecorder
              onRecordingComplete={handleRecordingComplete}
              onCancel={() => setFormState("idle")}
            />
          </motion.div>
        )}

        {/* Compose state: Add optional text before submit */}
        {formState === "compose" && (
          <motion.div
            key="compose"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="paper-card p-4 bg-card border border-border rounded-sm space-y-4"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground font-bold uppercase">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Video siap ({Math.floor(videoDuration / 60)}:
              {(videoDuration % 60).toString().padStart(2, "0")})
            </div>

            <div>
              <label
                htmlFor="comment-text"
                className="block font-mono text-xs text-muted-foreground mb-2"
              >
                Teks pendamping (opsional):
              </label>
              <textarea
                id="comment-text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Tambahkan catatan singkat untuk pendamping video..."
                className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:border-primary transition-colors"
                rows={3}
                maxLength={500}
              />
              <div className="text-right font-mono text-xs text-muted-foreground mt-1">
                {commentText.length}/500
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase rounded-sm hover:opacity-90 transition-opacity"
              >
                <Upload className="w-3.5 h-3.5" />
                Kirim Komentar
              </button>
              <button
                onClick={resetForm}
                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                Batal
              </button>
            </div>
          </motion.div>
        )}

        {/* Uploading state */}
        {formState === "uploading" && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="paper-card p-6 bg-card border border-border rounded-sm space-y-4"
          >
            <div className="font-mono text-xs text-muted-foreground font-bold uppercase text-center">
              Mengupload ke YouTube...
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-center font-mono text-xs text-muted-foreground">
              {Math.round(uploadProgress)}%
            </div>
          </motion.div>
        )}

        {/* Success state */}
        {formState === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="paper-card p-6 bg-card border border-green-500/30 rounded-sm text-center space-y-2"
          >
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
            <p className="text-sm font-sans text-foreground">{resultMessage}</p>
            <p className="text-xs font-mono text-muted-foreground">
              Anda bisa mengatur visibilitas komentar ini setelah di-approve
              admin.
            </p>
          </motion.div>
        )}

        {/* Error state */}
        {formState === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="paper-card p-6 bg-card border border-destructive/30 rounded-sm text-center space-y-3"
          >
            <AlertCircle className="w-8 h-8 text-destructive mx-auto" />
            <p className="text-sm font-sans text-destructive">{resultMessage}</p>
            <button
              onClick={resetForm}
              className="text-xs font-mono font-bold text-primary hover:underline"
            >
              Coba lagi
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
