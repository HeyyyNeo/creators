"use client";
import { useEffect, useRef, useState } from "react";

function LazyVideo({
  src,
  className = "",
  title,
}: {
  src: string;
  className?: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3, rootMargin: "100px" }
    );
    const currentVideo = videoRef.current;
    if (currentVideo) observer.observe(currentVideo);
    return () => {
      if (currentVideo) observer.unobserve(currentVideo);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView) return;
    const handleLoadedData = () => setIsLoaded(true);
    video.addEventListener("loadeddata", handleLoadedData);
    if (isInView) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.pause();
    };
  }, [isInView]);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center bg-gray-900"
      role="region"
      aria-label={title}
    >
      {!isLoaded && isInView && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10 bg-black/40"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-sm mt-3 font-medium">
              Loading party vibes...
            </p>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover ${className}`}
        playsInline
        muted
        loop
        controls
        preload="none"
        title={title}
        aria-label={title}
        onLoadedData={() => setIsLoaded(true)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {isInView && !isPlaying && isLoaded && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div className="text-white text-6xl opacity-60">▶️</div>
        </div>
      )}
    </div>
  );
}

export default LazyVideo;
