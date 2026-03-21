"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Input,
  Output,
  Mp4OutputFormat,
  BufferTarget,
  BlobSource,
  Conversion,
  ALL_FORMATS,
  VideoSample,
} from "mediabunny";
import { Button } from "@/components/ui/button";
import { Input as InputField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

// ─── Video Editor Timeline ────────────────────────────────────────────────────

interface TimelineProps {
  duration: number;
  frameRate: number;
  currentTime: number;
  startFrame: number;
  endFrame: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onStartFrameChange: (f: number) => void;
  onEndFrameChange: (f: number) => void;
  onCurrentTimeChange: (t: number) => void;
}

function VideoTimeline({
  duration,
  frameRate,
  currentTime,
  startFrame,
  endFrame,
  videoRef,
  onStartFrameChange,
  onEndFrameChange,
  onCurrentTimeChange,
}: TimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"start" | "end" | "playhead" | "region" | null>(null);
  const regionDragAnchor = useRef<{
    x: number;
    startF: number;
    endF: number;
  } | null>(null);

  const totalFrames = Math.floor(duration * frameRate);

  const frameToPct = (f: number) =>
    Math.max(0, Math.min(100, (f / totalFrames) * 100));
  const timeToPct = (t: number) =>
    Math.max(0, Math.min(100, (t / duration) * 100));

  const pctToFrame = (pct: number) =>
    Math.round(Math.max(1, Math.min(totalFrames, (pct / 100) * totalFrames)));

  const getTrackPct = (clientX: number) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    return Math.max(
      0,
      Math.min(100, ((clientX - rect.left) / rect.width) * 100),
    );
  };

  const seekVideo = (frame: number) => {
    const t = frame / frameRate;
    if (videoRef.current) videoRef.current.currentTime = t;
    onCurrentTimeChange(t);
  };

  // ── Mouse handlers ──────────────────────────────────────────────────────────

  const handleTrackMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const pct = getTrackPct(e.clientX);
    const frame = pctToFrame(pct);

    // Determine what was clicked based on proximity
    const startPct = frameToPct(startFrame);
    const endPct = frameToPct(endFrame);
    const playPct = timeToPct(currentTime);
    const HANDLE_THRESH = 2.5;

    if (Math.abs(pct - playPct) < HANDLE_THRESH) {
      dragging.current = "playhead";
    } else if (Math.abs(pct - startPct) < HANDLE_THRESH) {
      dragging.current = "start";
    } else if (Math.abs(pct - endPct) < HANDLE_THRESH) {
      dragging.current = "end";
    } else if (pct > startPct && pct < endPct) {
      dragging.current = "region";
      regionDragAnchor.current = {
        x: e.clientX,
        startF: startFrame,
        endF: endFrame,
      };
    } else {
      // Click outside region → move playhead
      dragging.current = "playhead";
      const t = (frame / totalFrames) * duration;
      if (videoRef.current) videoRef.current.currentTime = t;
      onCurrentTimeChange(t);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const pct = getTrackPct(e.clientX);
      const frame = pctToFrame(pct);

      if (dragging.current === "playhead") {
        const t = (pct / 100) * duration;
        if (videoRef.current) videoRef.current.currentTime = t;
        onCurrentTimeChange(t);
      } else if (dragging.current === "start") {
        const clamped = Math.min(frame, endFrame - 1);
        onStartFrameChange(Math.max(1, clamped));
        seekVideo(Math.max(1, clamped));
      } else if (dragging.current === "end") {
        const clamped = Math.max(frame, startFrame + 1);
        onEndFrameChange(Math.min(totalFrames, clamped));
        seekVideo(Math.min(totalFrames, clamped));
      } else if (dragging.current === "region" && regionDragAnchor.current) {
        const rect = trackRef.current?.getBoundingClientRect();
        if (!rect) return;
        const deltaX = e.clientX - regionDragAnchor.current.x;
        const deltaFrames = Math.round((deltaX / rect.width) * totalFrames);
        const span =
          regionDragAnchor.current.endF - regionDragAnchor.current.startF;
        const newStart = Math.max(
          1,
          Math.min(
            totalFrames - span,
            regionDragAnchor.current.startF + deltaFrames,
          ),
        );
        const newEnd = newStart + span;
        onStartFrameChange(newStart);
        onEndFrameChange(newEnd);
      }
    },
    [duration, endFrame, startFrame, totalFrames, frameRate],
  );

  const handleMouseUp = useCallback(() => {
    dragging.current = null;
    regionDragAnchor.current = null;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const pct = getTrackPct(touch.clientX);
    const startPct = frameToPct(startFrame);
    const endPct = frameToPct(endFrame);
    const THRESH = 4;

    if (Math.abs(pct - startPct) < THRESH) dragging.current = "start";
    else if (Math.abs(pct - endPct) < THRESH) dragging.current = "end";
    else dragging.current = "playhead";
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const pct = getTrackPct(touch.clientX);
    const frame = pctToFrame(pct);

    if (dragging.current === "playhead") {
      const t = (pct / 100) * duration;
      if (videoRef.current) videoRef.current.currentTime = t;
      onCurrentTimeChange(t);
    } else if (dragging.current === "start") {
      onStartFrameChange(Math.max(1, Math.min(frame, endFrame - 1)));
    } else if (dragging.current === "end") {
      onEndFrameChange(Math.min(totalFrames, Math.max(frame, startFrame + 1)));
    }
  };

  const startPct = frameToPct(startFrame);
  const endPct = frameToPct(endFrame);
  const playPct = timeToPct(currentTime);
  const selectionWidth = endPct - startPct;

  // Time ruler ticks
  const tickCount = 8;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => ({
    pct: (i / tickCount) * 100,
    time: (i / tickCount) * duration,
  }));

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ userSelect: "none" }}>
      {/* ── Ruler ── */}
      <div style={{ position: "relative", height: 20, marginBottom: 2 }}>
        {ticks.map((t, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${t.pct}%`,
              transform: "translateX(-50%)",
              fontSize: 10,
              color: "var(--color-text-tertiary)",
              fontFamily: "var(--font-mono)",
              whiteSpace: "nowrap",
            }}
          >
            {fmt(t.time)}
          </div>
        ))}
      </div>

      {/* ── Main track ── */}
      <div
        ref={trackRef}
        onMouseDown={handleTrackMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => {
          dragging.current = null;
        }}
        style={{
          position: "relative",
          height: 56,
          borderRadius: 6,
          overflow: "visible",
          cursor: "crosshair",
          background: "var(--color-background-secondary)",
          border: "1px solid var(--color-border-tertiary)",
        }}
      >
        {/* Dimmed outside selection */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--color-background-tertiary)",
            borderRadius: 6,
            opacity: 0.5,
          }}
        />

        {/* Fake waveform bars for visual texture */}
        <WaveformBars totalFrames={totalFrames} />

        {/* Selected region overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${startPct}%`,
            width: `${selectionWidth}%`,
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.5)",
            cursor: "grab",
            zIndex: 2,
          }}
        >
          {/* Frame count badge */}
          {selectionWidth > 8 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "rgba(59,130,246,0.9)",
                  background: "var(--color-background-primary)",
                  border: "1px solid rgba(59,130,246,0.3)",
                  padding: "1px 6px",
                  borderRadius: 4,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {endFrame - startFrame + 1} frames
              </span>
            </div>
          )}
        </div>

        {/* Left trim handle */}
        <TrimHandle pct={startPct} side="left" label={`F${startFrame}`} />

        {/* Right trim handle */}
        <TrimHandle pct={endPct} side="right" label={`F${endFrame}`} />

        {/* Playhead */}
        <div
          style={{
            position: "absolute",
            top: -6,
            bottom: -6,
            left: `${playPct}%`,
            transform: "translateX(-50%)",
            zIndex: 10,
            cursor: "ew-resize",
            pointerEvents: "none",
          }}
        >
          {/* Diamond head */}
          <div
            style={{
              width: 10,
              height: 10,
              background: "#ef4444",
              transform: "rotate(45deg) translateX(-50%)",
              position: "absolute",
              top: 4,
              left: "50%",
            }}
          />
          {/* Stem */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 1.5,
              bottom: 0,
              background: "#ef4444",
            }}
          />
        </div>
      </div>

      {/* ── Info row ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
          fontSize: 11,
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span>
          {fmt(startFrame / frameRate)} – {fmt(endFrame / frameRate)}
        </span>
        <span style={{ color: "#ef4444" }}>{fmt(currentTime)}</span>
        <span>{fmt(duration)}</span>
      </div>
    </div>
  );
}

// Trim handle pill with label
function TrimHandle({
  pct,
  side,
  label,
}: {
  pct: number;
  side: "left" | "right";
  label: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: `${pct}%`,
        transform: "translateX(-50%)",
        zIndex: 5,
        cursor: "ew-resize",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {/* Vertical bar */}
      <div
        style={{
          width: 3,
          height: "100%",
          background: "rgb(59,130,246)",
          borderRadius: 2,
          position: "relative",
        }}
      >
        {/* Grip notches */}
        {[25, 50, 75].map((p) => (
          <div
            key={p}
            style={{
              position: "absolute",
              top: `${p}%`,
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 7,
              height: 2,
              background: "white",
              borderRadius: 1,
            }}
          />
        ))}
      </div>
      {/* Label pill */}
      <div
        style={{
          position: "absolute",
          top: side === "left" ? -22 : undefined,
          bottom: side === "right" ? -22 : undefined,
          background: "rgb(59,130,246)",
          color: "white",
          fontSize: 10,
          fontFamily: "var(--font-mono)",
          padding: "1px 5px",
          borderRadius: 3,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// Decorative waveform-style bars (static, for visual texture)
function WaveformBars({ totalFrames }: { totalFrames: number }) {
  const BARS = 80;
  const heights = React.useMemo(() => {
    // Generate pseudo-random heights seeded by totalFrames for consistency
    return Array.from({ length: BARS }, (_, i) => {
      const seed = (i * 2654435761 + totalFrames * 1234567) >>> 0;
      const h = 20 + ((seed % 256) / 255) * 65;
      return h;
    });
  }, [totalFrames]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        gap: 1,
        padding: "0 2px",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {heights.map((h, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${h}%`,
            background: "var(--color-border-secondary)",
            borderRadius: 1,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}

// ─── Single-frame scrubber ────────────────────────────────────────────────────

interface ScrubberProps {
  duration: number;
  frameRate: number;
  currentTime: number;
  frameNumber: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onCurrentTimeChange: (t: number) => void;
}

function FrameScrubber({
  duration,
  frameRate,
  currentTime,
  frameNumber,
  videoRef,
  onCurrentTimeChange,
}: ScrubberProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const timeToPct = (t: number) => (t / duration) * 100;
  const BARS = 80;

  const heights = React.useMemo(
    () =>
      Array.from({ length: BARS }, (_, i) => {
        const seed = (i * 2654435761) >>> 0;
        return 20 + ((seed % 256) / 255) * 65;
      }),
    [],
  );

  const seek = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const t = pct * duration;
    if (videoRef.current) videoRef.current.currentTime = t;
    onCurrentTimeChange(t);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    seek(e.clientX);
    const move = (e: MouseEvent) => {
      if (dragging.current) seek(e.clientX);
    };
    const up = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const playPct = timeToPct(currentTime);
  const totalFrames = Math.floor(duration * frameRate);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const tickCount = 8;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => ({
    pct: (i / tickCount) * 100,
    time: (i / tickCount) * duration,
  }));

  return (
    <div style={{ userSelect: "none" }}>
      {/* Ruler */}
      <div style={{ position: "relative", height: 20, marginBottom: 2 }}>
        {ticks.map((t, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${t.pct}%`,
              transform: "translateX(-50%)",
              fontSize: 10,
              color: "var(--color-text-tertiary)",
              fontFamily: "var(--font-mono)",
              whiteSpace: "nowrap",
            }}
          >
            {fmt(t.time)}
          </div>
        ))}
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        style={{
          position: "relative",
          height: 56,
          borderRadius: 6,
          overflow: "visible",
          cursor: "crosshair",
          background: "var(--color-background-secondary)",
          border: "1px solid var(--color-border-tertiary)",
        }}
      >
        {/* Waveform bars */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            gap: 1,
            padding: "0 2px",
            pointerEvents: "none",
          }}
        >
          {heights.map((h, i) => {
            const barPct = (i / BARS) * 100;
            const isPast = barPct <= playPct;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background: isPast
                    ? "rgba(59,130,246,0.5)"
                    : "var(--color-border-secondary)",
                  borderRadius: 1,
                  transition: "background 0.05s",
                }}
              />
            );
          })}
        </div>

        {/* Playhead */}
        <div
          style={{
            position: "absolute",
            top: -6,
            bottom: -6,
            left: `${playPct}%`,
            transform: "translateX(-50%)",
            zIndex: 10,
            cursor: "ew-resize",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              background: "#ef4444",
              transform: "rotate(45deg) translateX(-50%)",
              position: "absolute",
              top: 4,
              left: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 1.5,
              bottom: 0,
              background: "#ef4444",
            }}
          />
        </div>
      </div>

      {/* Info row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
          fontSize: 11,
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span>Frame 1</span>
        <span style={{ color: "#ef4444" }}>
          Frame {frameNumber} · {fmt(currentTime)}
        </span>
        <span>Frame {totalFrames}</span>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function VideoFrameExtractor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [frameNumber, setFrameNumber] = useState<number>(1);
  const [extractMode, setExtractMode] = useState<"single" | "range">("single");
  const [startFrame, setStartFrame] = useState<number>(1);
  const [endFrame, setEndFrame] = useState<number>(10);
  const [duration, setDuration] = useState<number | null>(null);
  const [frameRate, setFrameRate] = useState<number>(30);
  const [thumbnailUrls, setThumbnailUrls] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (videoUrl) URL.revokeObjectURL(videoUrl);

    setSelectedFile(file);
    setError(null);
    setThumbnailUrls([]);
    setProgress(0);
    setIsProcessing(true);
    setCurrentTime(0);

    const url = URL.createObjectURL(file);
    setVideoUrl(url);

    try {
      const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
      });
      const fileDuration = await input.computeDuration();
      setDuration(fileDuration);
      const totalFrames = Math.floor(fileDuration * 30);
      setFrameRate(30);
      setStartFrame(1);
      setEndFrame(Math.min(totalFrames, 30));
      input.dispose();
    } catch {
      setError("Failed to read video file");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExtract = async () => {
    if (!selectedFile || duration === null) {
      setError("Please select a video file");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setThumbnailUrls([]);
    setProgress(0);

    try {
      const input = new Input({
        source: new BlobSource(selectedFile),
        formats: ALL_FORMATS,
      });
      const videoTrack = await input.getPrimaryVideoTrack();
      if (!videoTrack) throw new Error("No video track found");

      const totalFrames = Math.floor(duration * frameRate);
      const framesToExtract =
        extractMode === "single"
          ? [frameNumber]
          : Array.from(
              { length: endFrame - startFrame + 1 },
              (_, i) => startFrame + i,
            );

      const urls: string[] = [];
      let frameCount = 0;
      const videoWidth = videoTrack.displayWidth;
      const videoHeight = videoTrack.displayHeight;

      const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
      });
      const conversion = await Conversion.init({
        input,
        output,
        video: {
          process: (sample: VideoSample) => {
            if (framesToExtract.includes(frameCount + 1)) {
              const canvas = document.createElement("canvas");
              canvas.width = 640;
              canvas.height = 640 * (videoHeight / videoWidth);
              const ctx = canvas.getContext("2d");
              if (ctx) {
                const image = sample.toCanvasImageSource();
                if (image) {
                  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                  urls.push(canvas.toDataURL("image/jpeg", 0.9));
                }
              }
            }
            frameCount++;
            setProgress(Math.round((frameCount / totalFrames) * 100));
            return null;
          },
        },
      });

      await conversion.execute();
      setThumbnailUrls(urls);
      input.dispose();
    } catch {
      setError("Failed to extract frames");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = () => {
    thumbnailUrls.forEach((url, i) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = `frame-${extractMode === "single" ? frameNumber : startFrame + i}-${selectedFile?.name.split(".")[0] || "video"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFrameNumber(1);
    setStartFrame(1);
    setEndFrame(10);
    setDuration(null);
    setThumbnailUrls([]);
    setError(null);
    setProgress(0);
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl(null);
    setCurrentTime(0);
    setIsPlaying(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  }, []);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  // Keep frameNumber in sync with scrubber
  useEffect(() => {
    if (duration && extractMode === "single") {
      setFrameNumber(Math.max(1, Math.floor(currentTime * frameRate) + 1));
    }
  }, [currentTime, duration, extractMode, frameRate]);

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-4">
        {/* File input */}
        <div>
          <Label htmlFor="video-file">Video File</Label>
          <InputField
            ref={fileInputRef}
            id="video-file"
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            disabled={isProcessing}
            className="mt-2"
          />
          {selectedFile && (
            <p className="text-sm text-muted-foreground mt-2">
              {selectedFile.name}
              {duration &&
                ` · ${fmt(duration)} · ~${Math.floor(duration * frameRate)} frames @ ${frameRate}fps`}
            </p>
          )}
        </div>

        {duration !== null && videoUrl && (
          <>
            {/* Video preview */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full h-full"
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-2 left-2 h-8 w-8 rounded-full"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </Button>
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white font-mono">
                    {fmt(currentTime)} / {fmt(duration)}
                  </div>
                </div>

                {/* ── Timeline ── */}
                <div style={{ padding: "0 2px" }}>
                  {extractMode === "range" ? (
                    <VideoTimeline
                      duration={duration}
                      frameRate={frameRate}
                      currentTime={currentTime}
                      startFrame={startFrame}
                      endFrame={endFrame}
                      videoRef={videoRef}
                      onStartFrameChange={setStartFrame}
                      onEndFrameChange={setEndFrame}
                      onCurrentTimeChange={setCurrentTime}
                    />
                  ) : (
                    <FrameScrubber
                      duration={duration}
                      frameRate={frameRate}
                      currentTime={currentTime}
                      frameNumber={frameNumber}
                      videoRef={videoRef}
                      onCurrentTimeChange={setCurrentTime}
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Mode selector */}
            <select
              value={extractMode}
              onChange={(e) =>
                setExtractMode(e.target.value as "single" | "range")
              }
              className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <option value="single">Single Frame</option>
              <option value="range">Frame Range</option>
            </select>

            {/* Frame number inputs */}
            {extractMode === "single" ? (
              <div>
                <Label htmlFor="frame-number">Frame Number</Label>
                <InputField
                  id="frame-number"
                  type="number"
                  min={1}
                  max={Math.floor(duration * frameRate)}
                  value={frameNumber}
                  onChange={(e) => {
                    const f = parseInt(e.target.value) || 1;
                    setFrameNumber(f);
                    const t = f / frameRate;
                    if (videoRef.current) videoRef.current.currentTime = t;
                    setCurrentTime(t);
                  }}
                  disabled={isProcessing}
                  className="mt-2"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-frame">Start Frame</Label>
                  <InputField
                    id="start-frame"
                    type="number"
                    min={1}
                    max={Math.floor(duration * frameRate)}
                    value={startFrame}
                    onChange={(e) =>
                      setStartFrame(parseInt(e.target.value) || 1)
                    }
                    disabled={isProcessing}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="end-frame">End Frame</Label>
                  <InputField
                    id="end-frame"
                    type="number"
                    min={startFrame}
                    max={Math.floor(duration * frameRate)}
                    value={endFrame}
                    onChange={(e) =>
                      setEndFrame(parseInt(e.target.value) || startFrame)
                    }
                    disabled={isProcessing}
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {thumbnailUrls.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
              {thumbnailUrls.map((url, i) => (
                <Card key={i}>
                  <CardContent className="p-2">
                    <img
                      src={url}
                      alt={`Frame ${i + 1}`}
                      className="w-full rounded"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button onClick={handleDownloadAll} className="w-full">
              Download All ({thumbnailUrls.length} frames)
            </Button>
          </div>
        )}

        {!thumbnailUrls.length ? (
          <Button
            onClick={handleExtract}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? `Extracting... ${progress}%` : "Extract Frames"}
          </Button>
        ) : (
          <Button onClick={handleReset} variant="outline" className="w-full">
            Extract Another
          </Button>
        )}

        {isProcessing && <Progress value={progress} className="h-2" />}
      </div>
    </div>
  );
}
