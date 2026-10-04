"use client";

import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  url: string;
  title?: string;
}

function extractVideoId(url: string): string | null {
  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function YouTubeEmbed({ url, title = "Video" }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const videoId = extractVideoId(url);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div ref={containerRef} className="youtube-embed paper-card rounded-sm overflow-hidden">
      <div className="youtube-embed__wrapper">
        {isLoaded ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="youtube-embed__iframe"
          />
        ) : isVisible ? (
          <button
            onClick={() => setIsLoaded(true)}
            className="youtube-embed__thumbnail"
            aria-label={`Play ${title}`}
          >
            <img
              src={thumbnailUrl}
              alt={title}
              className="youtube-embed__thumbnail-img"
              loading="lazy"
            />
            <div className="youtube-embed__play-overlay">
              <div className="youtube-embed__play-btn">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
            <div className="youtube-embed__label">
              <span className="font-mono text-xs uppercase font-bold">▶ {title}</span>
            </div>
          </button>
        ) : (
          <div className="youtube-embed__placeholder" />
        )}
      </div>
    </div>
  );
}
