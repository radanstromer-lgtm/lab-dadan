"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Video,
  Square,
  RotateCcw,
  Camera,
  Mic,
  AlertCircle,
} from "lucide-react";

interface VideoRecorderProps {
  maxDurationSeconds?: number;
  onRecordingComplete: (blob: Blob, durationSeconds: number) => void;
  onCancel?: () => void;
}

export function VideoRecorder({
  maxDurationSeconds = 120,
  onRecordingComplete,
  onCancel,
}: VideoRecorderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [state, setState] = useState<
    "idle" | "ready" | "recording" | "preview" | "error"
  >("idle");
  const [elapsed, setElapsed] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedDuration, setRecordedDuration] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [devices, setDevices] = useState<{
    cameras: MediaDeviceInfo[];
    mics: MediaDeviceInfo[];
  }>({ cameras: [], mics: [] });
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [selectedMic, setSelectedMic] = useState<string>("");
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Load available devices
  useEffect(() => {
    async function loadDevices() {
      try {
        // Request permission first so labels are available
        const tempStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        tempStream.getTracks().forEach((t) => t.stop());

        const allDevices = await navigator.mediaDevices.enumerateDevices();
        const cameras = allDevices.filter((d) => d.kind === "videoinput");
        const mics = allDevices.filter((d) => d.kind === "audioinput");

        setDevices({ cameras, mics });
        if (cameras.length > 0) setSelectedCamera(cameras[0].deviceId);
        if (mics.length > 0) setSelectedMic(mics[0].deviceId);
        setState("ready");
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setErrorMsg(
          "Tidak bisa mengakses kamera/mikrofon. Pastikan izin sudah diberikan."
        );
        setState("error");
      }
    }
    loadDevices();
  }, []);

  // Start camera preview
  const startPreviewStream = useCallback(async () => {
    try {
      // Stop existing stream
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: selectedCamera
          ? { deviceId: { exact: selectedCamera } }
          : true,
        audio: selectedMic ? { deviceId: { exact: selectedMic } } : true,
      });

      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err) {
      console.error("Error starting preview:", err);
      setErrorMsg("Gagal memulai kamera preview.");
      setState("error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCamera, selectedMic]);

  useEffect(() => {
    if (state === "ready") {
      startPreviewStream();
    }
  }, [state, startPreviewStream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRecording = () => {
    if (!stream) return;

    chunksRef.current = [];
    setElapsed(0);

    // Determine supported MIME type
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
      ? "video/webm;codecs=vp9,opus"
      : MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")
        ? "video/webm;codecs=vp8,opus"
        : "video/webm";

    const recorder = new MediaRecorder(stream, { mimeType });
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType });
      setRecordedBlob(blob);
      setRecordedDuration(elapsed);
      setState("preview");

      // Show recorded video in preview element
      if (previewRef.current) {
        previewRef.current.src = URL.createObjectURL(blob);
      }

      // Stop live stream
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    };

    recorder.start(1000); // Collect data every second
    setState("recording");

    // Timer
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
      setElapsed(elapsedSec);

      if (elapsedSec >= maxDurationSeconds) {
        stopRecording();
      }
    }, 200);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const reRecord = async () => {
    setRecordedBlob(null);
    setRecordedDuration(0);
    setElapsed(0);
    setState("ready");
  };

  const confirmRecording = () => {
    if (recordedBlob) {
      onRecordingComplete(recordedBlob, recordedDuration);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent = (elapsed / maxDurationSeconds) * 100;

  if (state === "error") {
    return (
      <div className="bg-destructive/10 border border-destructive/30 rounded-sm p-6 text-center">
        <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-3" />
        <p className="text-sm text-destructive font-sans">{errorMsg}</p>
        <button
          onClick={() => {
            setState("idle");
            setErrorMsg("");
          }}
          className="mt-3 text-xs font-mono font-bold text-primary hover:underline"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Device selectors (only when ready/idle) */}
      {(state === "ready" || state === "idle") &&
        (devices.cameras.length > 1 || devices.mics.length > 1) && (
          <div className="flex flex-wrap gap-3">
            {devices.cameras.length > 1 && (
              <div className="flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-muted-foreground" />
                <select
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  className="text-xs font-mono bg-muted border border-border rounded-sm px-2 py-1 text-foreground"
                >
                  {devices.cameras.map((cam) => (
                    <option key={cam.deviceId} value={cam.deviceId}>
                      {cam.label || `Camera ${cam.deviceId.slice(0, 8)}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {devices.mics.length > 1 && (
              <div className="flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-muted-foreground" />
                <select
                  value={selectedMic}
                  onChange={(e) => setSelectedMic(e.target.value)}
                  className="text-xs font-mono bg-muted border border-border rounded-sm px-2 py-1 text-foreground"
                >
                  {devices.mics.map((mic) => (
                    <option key={mic.deviceId} value={mic.deviceId}>
                      {mic.label || `Mic ${mic.deviceId.slice(0, 8)}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

      {/* Video Preview / Recording Area */}
      <div className="relative aspect-video bg-black rounded-sm overflow-hidden border border-border">
        {/* Live camera preview */}
        {(state === "ready" || state === "recording") && (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {/* Recorded preview */}
        {state === "preview" && (
          <video
            ref={previewRef}
            controls
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {/* Loading state */}
        {state === "idle" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-muted-foreground font-mono text-xs animate-pulse">
              Memuat kamera...
            </div>
          </div>
        )}

        {/* Recording indicator */}
        {state === "recording" && (
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <motion.div
              className="w-3 h-3 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <span className="font-mono text-xs text-white bg-black/60 px-2 py-0.5 rounded-sm">
              REC {formatTime(elapsed)} / {formatTime(maxDurationSeconds)}
            </span>
          </div>
        )}

        {/* Progress bar during recording */}
        {state === "recording" && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
            <motion.div
              className="h-full bg-red-500"
              style={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {state === "ready" && (
          <>
            <button
              onClick={startRecording}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-mono text-sm font-bold uppercase rounded-sm hover:bg-red-700 transition-colors"
            >
              <Video className="w-4 h-4" />
              Mulai Rekam
            </button>
            {onCancel && (
              <button
                onClick={onCancel}
                className="px-4 py-3 border border-border text-muted-foreground font-mono text-sm rounded-sm hover:bg-muted transition-colors"
              >
                Batal
              </button>
            )}
          </>
        )}

        {state === "recording" && (
          <button
            onClick={stopRecording}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-mono text-sm font-bold uppercase rounded-sm hover:bg-red-700 transition-colors animate-pulse"
          >
            <Square className="w-4 h-4" />
            Stop Rekaman
          </button>
        )}

        {state === "preview" && (
          <>
            <button
              onClick={reRecord}
              className="flex items-center gap-2 px-4 py-3 border border-border text-muted-foreground font-mono text-sm rounded-sm hover:bg-muted transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Rekam Ulang
            </button>
            <button
              onClick={confirmRecording}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-sm font-bold uppercase rounded-sm hover:opacity-90 transition-opacity"
            >
              Gunakan Video Ini
            </button>
          </>
        )}
      </div>
    </div>
  );
}
