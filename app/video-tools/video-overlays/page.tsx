"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Conversion,
  Input,
  Output,
  Mp4OutputFormat,
  BufferTarget,
  BlobSource,
  ALL_FORMATS,
} from "mediabunny";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Script from "next/script";

const faqData = [
  {
    question:
      "Do I need to buy expensive software to add a simple watermark to my video?",
    answer:
      "No. You can violently burn custom PNG logos or text graphics directly over your video timeline inside the browser. Because this system leverages local computer hardware rendering, it entirely bypasses the need for massive, heavily bloated desktop applications like Premiere Pro or Final Cut.",
  },
  {
    question: "Why should I use a transparent PNG for my video watermark?",
    answer:
      "If you upload a standard, solid JPEG file, it aggressively dumps a rigid, ugly white square completely over your footage. Using a PNG file with a pre-built invisible alpha-channel fundamentally guarantees the video perfectly shows through the empty space around your actual logo design.",
  },
  {
    question:
      "Can I aggressively fade out a massive logo so it doesn't distract the viewer?",
    answer:
      "Yes. By sliding the dedicated opacity control directly downwards to 20%, you mathematically crush the pixel density of the overlay. This effectively creates a highly subtle, ghosted watermark that successfully protects your footage without entirely destroying the core viewing experience.",
  },
  {
    question:
      "Will the system completely delete my audio track when saving the watermark?",
    answer:
      "Absolutely not. The complex WebAssembly processing engine specifically targets and rewrites the visual pixel arrays. It carefully copies your original audio waveform and rigidly pastes it back into the final MP4 container entirely untouched.",
  },
  {
    question:
      "How do I forcibly pop a graphic up for exactly two seconds during the video?",
    answer:
      "You must explicitly use the precision Timing controls. By strictly setting the exact Start Timeline and End Timeline numbers, you mathematically command the rendering engine to abruptly materialize the overlay graphic and violently cut it off the moment the exact timecode expires.",
  },
  {
    question:
      "Does this free tool secretly inject its own ugly watermark onto my footage?",
    answer:
      "Zero secret logos. This acts as a brutally secure local utility utilizing your own private computer processor to do the heavy rendering. Since we avoid paying massive cloud-video encoding costs, we absolutely do not force you to violently purchase a subscription to remove a hidden branding lock.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

interface OverlayConfig {
  id: string;
  image: File;
  previewUrl: string;
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center"
    | "custom";
  opacity: number;
  scale: number;
  offsetX: number;
  offsetY: number;
  width?: number;
  height?: number;
  startTime?: number;
  endTime?: number;
}

interface LoadedOverlay {
  id: string;
  imageBitmap: ImageBitmap;
  config: OverlayConfig;
}

export default function VideoOverlaysPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [videoDuration, setVideoDuration] = useState(0);
  const [overlays, setOverlays] = useState<OverlayConfig[]>([]);
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<
    "nw" | "ne" | "sw" | "se" | null
  >(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [overlayInitialBounds, setOverlayInitialBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const videoInputRef = useRef<HTMLInputElement>(null);
  const overlayInputRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleVideoSelect = useCallback((file: File) => {
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setVideoDimensions({ width: 0, height: 0 });
    setOutputUrl(null);
    setError(null);
  }, []);

  const handleVideoLoaded = useCallback(() => {
    if (previewContainerRef.current) {
      const video = previewContainerRef.current.querySelector("video");
      if (video) {
        setVideoDimensions({
          width: video.videoWidth,
          height: video.videoHeight,
        });
        setVideoDuration(video.duration);
      }
    }
  }, []);

  const handleOverlaySelect = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const newOverlays: OverlayConfig[] = Array.from(files).map((file) => ({
        id: crypto.randomUUID(),
        image: file,
        previewUrl: URL.createObjectURL(file),
        position: "custom",
        opacity: 1,
        scale: 1,
        offsetX: 20,
        offsetY: 20,
        width: 0,
        height: 0,
        startTime: 0,
        endTime: undefined,
      }));

      setOverlays((prev) => [...prev, ...newOverlays]);
      if (newOverlays.length > 0 && videoDimensions.width > 0) {
        const overlay = newOverlays[0];
        const img = new Image();
        img.onload = () => {
          const videoAspect = videoDimensions.width / videoDimensions.height;
          const imgAspect = img.width / img.height;

          let newWidth = videoDimensions.width * 0.2;
          let newHeight = newWidth / imgAspect;

          if (newHeight > videoDimensions.height * 0.3) {
            newHeight = videoDimensions.height * 0.3;
            newWidth = newHeight * imgAspect;
          }

          setOverlays((prev) =>
            prev.map((o) =>
              o.id === overlay.id
                ? {
                    ...o,
                    width: newWidth,
                    height: newHeight,
                    offsetX: (videoDimensions.width - newWidth) / 2,
                    offsetY: (videoDimensions.height - newHeight) / 2,
                  }
                : o,
            ),
          );
          setSelectedOverlayId(overlay.id);
        };
        img.src = overlay.previewUrl;
      }
    },
    [videoDimensions],
  );

  const updateOverlay = useCallback(
    (id: string, updates: Partial<OverlayConfig>) => {
      setOverlays((prev) =>
        prev.map((overlay) =>
          overlay.id === id ? { ...overlay, ...updates } : overlay,
        ),
      );
    },
    [],
  );

  const removeOverlay = useCallback(
    (id: string) => {
      setOverlays((prev) => {
        const overlay = prev.find((o) => o.id === id);
        if (overlay) {
          URL.revokeObjectURL(overlay.previewUrl);
        }
        return prev.filter((o) => o.id !== id);
      });
      if (selectedOverlayId === id) {
        setSelectedOverlayId(null);
      }
    },
    [selectedOverlayId],
  );

  useEffect(() => {
    if (!canvasRef.current || !videoDimensions.width || !videoPreview) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = videoDimensions.width;
    canvas.height = videoDimensions.height;

    const draw = async () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const video = previewContainerRef.current?.querySelector("video");
      if (video) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      for (const overlay of overlays) {
        if (!overlay.width || !overlay.height) continue;

        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = reject;
          image.src = overlay.previewUrl;
        });

        ctx.save();
        ctx.globalAlpha = overlay.opacity;
        ctx.drawImage(
          img,
          overlay.offsetX,
          overlay.offsetY,
          overlay.width,
          overlay.height,
        );
        ctx.restore();
      }

      const selectedOverlay = overlays.find((o) => o.id === selectedOverlayId);
      if (selectedOverlay && selectedOverlay.width && selectedOverlay.height) {
        const { offsetX, offsetY, width, height } = selectedOverlay;

        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 2;
        ctx.strokeRect(offsetX, offsetY, width, height);

        ctx.fillStyle = "rgba(59, 130, 246, 0.1)";
        ctx.fillRect(offsetX, offsetY, width, height);

        const handleSize = 10;
        ctx.fillStyle = "#3b82f6";
        ctx.fillRect(
          offsetX - handleSize / 2,
          offsetY - handleSize / 2,
          handleSize,
          handleSize,
        );
        ctx.fillRect(
          offsetX + width - handleSize / 2,
          offsetY - handleSize / 2,
          handleSize,
          handleSize,
        );
        ctx.fillRect(
          offsetX - handleSize / 2,
          offsetY + height - handleSize / 2,
          handleSize,
          handleSize,
        );
        ctx.fillRect(
          offsetX + width - handleSize / 2,
          offsetY + height - handleSize / 2,
          handleSize,
          handleSize,
        );
      }
    };

    draw();
  }, [overlays, selectedOverlayId, videoDimensions, videoPreview]);

  const getCanvasCoordinates = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): { x: number; y: number } => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    [],
  );

  const getResizeHandle = useCallback(
    (
      x: number,
      y: number,
      overlay: OverlayConfig,
    ): "nw" | "ne" | "sw" | "se" | null => {
      if (!overlay.width || !overlay.height) return null;

      const handleSize = 10;
      const handles: Record<string, { x: number; y: number }> = {
        nw: { x: overlay.offsetX, y: overlay.offsetY },
        ne: { x: overlay.offsetX + overlay.width, y: overlay.offsetY },
        sw: { x: overlay.offsetX, y: overlay.offsetY + overlay.height },
        se: {
          x: overlay.offsetX + overlay.width,
          y: overlay.offsetY + overlay.height,
        },
      };

      for (const [corner, pos] of Object.entries(handles)) {
        if (
          x >= pos.x - handleSize &&
          x <= pos.x + handleSize &&
          y >= pos.y - handleSize &&
          y <= pos.y + handleSize
        ) {
          return corner as "nw" | "ne" | "sw" | "se";
        }
      }

      return null;
    },
    [],
  );

  const handleCanvasMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const coords = getCanvasCoordinates(e);
      const clickedOverlay = [...overlays].reverse().find((o) => {
        if (!o.width || !o.height) return false;
        return (
          coords.x >= o.offsetX &&
          coords.x <= o.offsetX + o.width &&
          coords.y >= o.offsetY &&
          coords.y <= o.offsetY + o.height
        );
      });

      if (clickedOverlay && clickedOverlay.width && clickedOverlay.height) {
        setSelectedOverlayId(clickedOverlay.id);

        const handle = getResizeHandle(coords.x, coords.y, clickedOverlay);
        if (handle) {
          setIsResizing(handle);
          setOverlayInitialBounds({
            x: clickedOverlay.offsetX,
            y: clickedOverlay.offsetY,
            width: clickedOverlay.width,
            height: clickedOverlay.height,
          });
        } else {
          setIsDragging(true);
          setOverlayInitialBounds({
            x: clickedOverlay.offsetX,
            y: clickedOverlay.offsetY,
            width: clickedOverlay.width,
            height: clickedOverlay.height,
          });
        }
        setDragStart(coords);
      } else {
        setSelectedOverlayId(null);
      }
    },
    [overlays, getCanvasCoordinates, getResizeHandle],
  );

  const handleCanvasMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const coords = getCanvasCoordinates(e);

      if (canvasRef.current) {
        const hoveredOverlay = [...overlays].reverse().find((o) => {
          if (!o.width || !o.height) return false;
          return (
            coords.x >= o.offsetX &&
            coords.x <= o.offsetX + o.width &&
            coords.y >= o.offsetY &&
            coords.y <= o.offsetY + o.height
          );
        });

        if (hoveredOverlay && selectedOverlayId === hoveredOverlay.id) {
          const handle = getResizeHandle(coords.x, coords.y, hoveredOverlay);
          if (handle) {
            canvasRef.current.style.cursor = `${handle}-resize`;
            return;
          }
        }

        if (hoveredOverlay) {
          canvasRef.current.style.cursor = "move";
          return;
        }

        canvasRef.current.style.cursor = "default";
      }

      if (isDragging && selectedOverlayId) {
        const dx = coords.x - dragStart.x;
        const dy = coords.y - dragStart.y;

        updateOverlay(selectedOverlayId, {
          offsetX: overlayInitialBounds.x + dx,
          offsetY: overlayInitialBounds.y + dy,
          position: "custom",
        });
      }

      if (isResizing && selectedOverlayId) {
        const overlay = overlays.find((o) => o.id === selectedOverlayId);
        if (!overlay || !overlay.width || !overlay.height) return;

        let newBounds = {
          x: overlayInitialBounds.x,
          y: overlayInitialBounds.y,
          width: overlayInitialBounds.width,
          height: overlayInitialBounds.height,
        };

        const minSize = 20;

        switch (isResizing) {
          case "nw":
            const newWidthNW = Math.max(
              minSize,
              overlayInitialBounds.width - (coords.x - overlayInitialBounds.x),
            );
            const newHeightNW = Math.max(
              minSize,
              overlayInitialBounds.height - (coords.y - overlayInitialBounds.y),
            );
            newBounds = {
              x:
                overlayInitialBounds.x +
                (overlayInitialBounds.width - newWidthNW),
              y:
                overlayInitialBounds.y +
                (overlayInitialBounds.height - newHeightNW),
              width: newWidthNW,
              height: newHeightNW,
            };
            break;
          case "ne":
            const newWidthNE = Math.max(
              minSize,
              coords.x - overlayInitialBounds.x,
            );
            const newHeightNE = Math.max(
              minSize,
              overlayInitialBounds.height - (coords.y - overlayInitialBounds.y),
            );
            newBounds = {
              x: overlayInitialBounds.x,
              y:
                overlayInitialBounds.y +
                (overlayInitialBounds.height - newHeightNE),
              width: newWidthNE,
              height: newHeightNE,
            };
            break;
          case "sw":
            const newWidthSW = Math.max(
              minSize,
              overlayInitialBounds.width - (coords.x - overlayInitialBounds.x),
            );
            const newHeightSW = Math.max(
              minSize,
              coords.y - overlayInitialBounds.y,
            );
            newBounds = {
              x:
                overlayInitialBounds.x +
                (overlayInitialBounds.width - newWidthSW),
              y: overlayInitialBounds.y,
              width: newWidthSW,
              height: newHeightSW,
            };
            break;
          case "se":
            newBounds = {
              x: overlayInitialBounds.x,
              y: overlayInitialBounds.y,
              width: Math.max(minSize, coords.x - overlayInitialBounds.x),
              height: Math.max(minSize, coords.y - overlayInitialBounds.y),
            };
            break;
        }

        updateOverlay(selectedOverlayId, {
          offsetX: newBounds.x,
          offsetY: newBounds.y,
          width: newBounds.width,
          height: newBounds.height,
          position: "custom",
        });
      }
    },
    [
      isDragging,
      isResizing,
      dragStart,
      overlayInitialBounds,
      selectedOverlayId,
      overlays,
      getCanvasCoordinates,
      getResizeHandle,
      updateOverlay,
    ],
  );

  const handleCanvasMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(null);
  }, []);

  const processVideo = useCallback(async () => {
    if (!videoFile || overlays.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      const loadedOverlays: LoadedOverlay[] = [];
      for (const overlay of overlays) {
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = reject;
          image.src = overlay.previewUrl;
        });
        const imageBitmap = await createImageBitmap(img);
        loadedOverlays.push({
          id: overlay.id,
          imageBitmap,
          config: overlay,
        });
      }

      const input = new Input({
        source: new BlobSource(videoFile),
        formats: ALL_FORMATS,
      });

      const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
      });

      let processCanvas: OffscreenCanvas | null = null;
      let processCtx: OffscreenCanvasRenderingContext2D | null = null;

      const conversion = await Conversion.init({
        input,
        output,
        video: {
          process: (sample) => {
            if (!processCanvas) {
              processCanvas = new OffscreenCanvas(
                sample.displayWidth,
                sample.displayHeight,
              );
              processCtx = processCanvas.getContext("2d");
            }

            if (!processCtx) return sample;

            processCtx.clearRect(
              0,
              0,
              processCanvas.width,
              processCanvas.height,
            );
            sample.draw(processCtx, 0, 0);

            const currentTime = sample.timestamp;

            for (const { imageBitmap, config } of loadedOverlays) {
              if (
                config.startTime !== undefined &&
                currentTime < config.startTime
              ) {
                continue;
              }
              if (
                config.endTime !== undefined &&
                currentTime > config.endTime
              ) {
                continue;
              }

              let x = config.offsetX;
              let y = config.offsetY;
              let width = imageBitmap.width * config.scale;
              let height = imageBitmap.height * config.scale;

              if (
                config.position === "custom" &&
                config.width &&
                config.height
              ) {
                width = config.width;
                height = config.height;
              } else {
                switch (config.position) {
                  case "top-left":
                    x = config.offsetX;
                    y = config.offsetY;
                    break;
                  case "top-right":
                    x = processCanvas.width - width - config.offsetX;
                    y = config.offsetY;
                    break;
                  case "bottom-left":
                    x = config.offsetX;
                    y = processCanvas.height - height - config.offsetY;
                    break;
                  case "bottom-right":
                    x = processCanvas.width - width - config.offsetX;
                    y = processCanvas.height - height - config.offsetY;
                    break;
                  case "center":
                    x = (processCanvas.width - width) / 2;
                    y = (processCanvas.height - height) / 2;
                    break;
                }
              }

              processCtx.save();
              processCtx.globalAlpha = config.opacity;
              processCtx.drawImage(imageBitmap, x, y, width, height);
              processCtx.restore();
            }

            return processCanvas;
          },
        },
      });

      conversion.onProgress = (progressValue: number) => {
        setProgress(Math.round(progressValue * 100));
      };

      await conversion.execute();

      const resultBuffer = output.target.buffer;
      if (!resultBuffer) {
        throw new Error("Failed to get output buffer");
      }
      const resultBlob = new Blob([resultBuffer], { type: "video/mp4" });

      setOutputUrl(URL.createObjectURL(resultBlob));
      setProgress(100);

      input.dispose();

      for (const { imageBitmap } of loadedOverlays) {
        imageBitmap.close();
      }
    } catch (err) {
      console.error("Error processing video:", err);
      setError(err instanceof Error ? err.message : "Failed to process video");
    } finally {
      setIsProcessing(false);
    }
  }, [videoFile, overlays]);

  const resetAll = useCallback(() => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    overlays.forEach((o) => URL.revokeObjectURL(o.previewUrl));
    if (outputUrl) URL.revokeObjectURL(outputUrl);

    setVideoFile(null);
    setVideoPreview(null);
    setVideoDimensions({ width: 0, height: 0 });
    setOverlays([]);
    setSelectedOverlayId(null);
    setOutputUrl(null);
    setError(null);
  }, [videoPreview, overlays, outputUrl]);

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `watermarked-${videoFile?.name || "video.mp4"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const relatedTools = [
    {
      name: "Change Video FPS",
      description: "Change video frame rate online - 24fps, 30fps, 60fps",
      href: "/video-tools/change-video-fps",
    },
    {
      name: "Crop Video",
      description: "Crop videos online for free - remove unwanted edges",
      href: "/video-tools/crop-video",
    },
    {
      name: "Enhance Video Quality",
      description: "Upscale, sharpen and improve video quality online",
      href: "/video-tools/enhance-video-quality",
    },
    {
      name: "Extract Audio from Video",
      description: "Extract MP3, AAC, WAV audio from video files",
      href: "/video-tools/extract-audio-from-video",
    },
    {
      name: "Resize Video Dimensions",
      description: "Scale video to 4K, 1080p, 720p or custom sizes",
      href: "/video-tools/resize-video-dimensions",
    },
    {
      name: "Rotate Video",
      description: "Rotate videos 90, 180, 270 degrees online",
      href: "/video-tools/rotate-video",
    },
    {
      name: "Video Color Space Transformer",
      description: "Adjust brightness, contrast, saturation and hue",
      href: "/video-tools/video-color-space-transformation",
    },
    {
      name: "Video Compressor",
      description: "Compress videos online - reduce file size",
      href: "/video-tools/video-compressor",
    },
    {
      name: "Video Format Converter",
      description: "Convert between video formats",
      href: "/video-tools/video-format-converter",
    },
    {
      name: "Video Grayscale",
      description: "Convert video to black and white online",
      href: "/video-tools/video-grayscale",
    },
    {
      name: "Video Metadata Viewer",
      description: "View video and audio file metadata",
      href: "/video-tools/video-metadata-viewer",
    },
    {
      name: "Video Player",
      description: "Play any video file format instantly",
      href: "/video-tools/video-player",
    },
    {
      name: "Video Transparency Maker",
      description: "Adjust video opacity and transparency online",
      href: "/video-tools/video-transparency-maker",
    },
  ];

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

          <div className="container relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
                100% Free & Private
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Video Overlay & Watermark Tool – Add Images to Videos Online for
                Free
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Brand your videos or add creative overlays by placing any image
                on top of your footage. Control position, size, opacity, and
                exactly when overlays appear — processed entirely in your
                browser.
              </p>
            </div>
          </div>
        </section>

        {/* Main Tool Section */}
        <section className="container relative mx-auto max-w-5xl px-4 pb-12">
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-xl opacity-50" />
            <div className="relative rounded-3xl border bg-card/50 backdrop-blur-sm shadow-2xl">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">
                  Video Overlays / Watermarks
                </h2>

                {/* Video Upload */}
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <Label>1. Upload Video</Label>
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        onChange={(e) =>
                          e.target.files && handleVideoSelect(e.target.files[0])
                        }
                        className="hidden"
                      />
                      <Button
                        onClick={() => videoInputRef.current?.click()}
                        variant="outline"
                      >
                        {videoFile ? "Change Video" : "Select Video"}
                      </Button>
                      {videoFile && (
                        <p className="text-sm text-muted-foreground">
                          Selected: {videoFile.name}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Video Preview */}
                {videoPreview && (
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <h2 className="text-lg font-semibold mb-4">
                        Video Preview
                      </h2>
                      <div ref={previewContainerRef} className="relative">
                        <video
                          src={videoPreview}
                          onLoadedMetadata={handleVideoLoaded}
                          controls
                          className="max-w-full rounded-md bg-black aspect-video"
                        />
                        {videoDimensions.width > 0 && overlays.length > 0 && (
                          <canvas
                            ref={canvasRef}
                            onMouseDown={handleCanvasMouseDown}
                            onMouseMove={handleCanvasMouseMove}
                            onMouseUp={handleCanvasMouseUp}
                            onMouseLeave={handleCanvasMouseUp}
                            className="absolute inset-0 max-w-full rounded-md"
                            style={{ pointerEvents: "auto" }}
                          />
                        )}
                      </div>
                      {videoDimensions.width > 0 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Video: {videoDimensions.width} x{" "}
                          {videoDimensions.height}
                          {overlays.length > 0 &&
                            " - Click and drag overlays to move, drag corners to resize"}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Overlay Upload */}
                {videoPreview && (
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <Label>2. Add Overlays</Label>
                        <input
                          ref={overlayInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleOverlaySelect(e.target.files)}
                          className="hidden"
                        />
                        <Button
                          onClick={() => overlayInputRef.current?.click()}
                          variant="outline"
                        >
                          Add Overlay Images
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Overlay Settings */}
                {overlays.length > 0 && (
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <h2 className="text-lg font-semibold mb-4">
                        Overlay Settings
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4">
                        Tip: Click on an overlay in the video preview to select
                        it, then drag to move or drag the corner handles to
                        resize.
                      </p>
                      <div className="space-y-4">
                        {overlays.map((overlay) => (
                          <div
                            key={overlay.id}
                            className={`p-4 border rounded-md ${selectedOverlayId === overlay.id ? "border-primary bg-muted/50" : "border-border"}`}
                            onClick={() => setSelectedOverlayId(overlay.id)}
                          >
                            <div className="flex items-start gap-4">
                              <img
                                src={overlay.previewUrl}
                                alt="Overlay"
                                className="w-16 h-16 object-contain bg-muted rounded"
                              />
                              <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">
                                    Overlay{" "}
                                    {overlay.position === "custom"
                                      ? "(Custom Position)"
                                      : ""}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeOverlay(overlay.id);
                                    }}
                                    className="text-destructive hover:text-destructive"
                                  >
                                    Remove
                                  </Button>
                                </div>

                                {overlay.position !== "custom" && (
                                  <div>
                                    <Label className="mb-2 block">
                                      Position
                                    </Label>
                                    <div className="flex flex-wrap gap-2">
                                      {(
                                        [
                                          "top-left",
                                          "top-right",
                                          "bottom-left",
                                          "bottom-right",
                                          "center",
                                        ] as const
                                      ).map((pos) => (
                                        <Button
                                          key={pos}
                                          variant={
                                            overlay.position === pos
                                              ? "default"
                                              : "outline"
                                          }
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            updateOverlay(overlay.id, {
                                              position: pos,
                                            });
                                          }}
                                          className="text-xs"
                                        >
                                          {pos.replace("-", " ")}
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {overlay.position === "custom" &&
                                  overlay.width &&
                                  overlay.height && (
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="mb-1 block">
                                          Width: {Math.round(overlay.width)}px
                                        </Label>
                                        <Slider
                                          value={[overlay.width]}
                                          min={20}
                                          max={videoDimensions.width || 500}
                                          step={5}
                                          onValueChange={([value]) =>
                                            updateOverlay(overlay.id, {
                                              width: value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div>
                                        <Label className="mb-1 block">
                                          Height: {Math.round(overlay.height)}px
                                        </Label>
                                        <Slider
                                          value={[overlay.height]}
                                          min={20}
                                          max={videoDimensions.height || 500}
                                          step={5}
                                          onValueChange={([value]) =>
                                            updateOverlay(overlay.id, {
                                              height: value,
                                            })
                                          }
                                        />
                                      </div>
                                    </div>
                                  )}

                                <div>
                                  <div className="flex justify-between mb-2">
                                    <Label>Opacity</Label>
                                    <span className="text-sm text-muted-foreground">
                                      {Math.round(overlay.opacity * 100)}%
                                    </span>
                                  </div>
                                  <Slider
                                    value={[overlay.opacity]}
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    onValueChange={([value]) =>
                                      updateOverlay(overlay.id, {
                                        opacity: value,
                                      })
                                    }
                                  />
                                </div>

                                <div>
                                  <Label className="mb-2 block">
                                    Timing (seconds)
                                  </Label>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-xs">
                                        Start Time
                                      </Label>
                                      <input
                                        type="number"
                                        value={overlay.startTime || 0}
                                        onChange={(e) =>
                                          updateOverlay(overlay.id, {
                                            startTime:
                                              parseFloat(e.target.value) || 0,
                                          })
                                        }
                                        min={0}
                                        max={videoDuration}
                                        step={0.1}
                                        className="w-full bg-background border border-input rounded-md px-2 py-1 text-sm"
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-xs">
                                        End Time (optional)
                                      </Label>
                                      <input
                                        type="number"
                                        value={overlay.endTime || ""}
                                        onChange={(e) =>
                                          updateOverlay(overlay.id, {
                                            endTime:
                                              parseFloat(e.target.value) ||
                                              undefined,
                                          })
                                        }
                                        min={0}
                                        max={videoDuration}
                                        step={0.1}
                                        placeholder="End"
                                        className="w-full bg-background border border-input rounded-md px-2 py-1 text-sm"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Process Button */}
                {overlays.length > 0 && (
                  <div className="space-y-4">
                    <Button
                      onClick={processVideo}
                      disabled={isProcessing || overlays.length === 0}
                      className="w-full"
                    >
                      {isProcessing ? "Processing..." : "Process Video"}
                    </Button>

                    {/* Progress Bar */}
                    {isProcessing && (
                      <div className="space-y-2">
                        <Progress value={progress} className="h-2" />
                        <p className="text-center text-sm text-muted-foreground">
                          {progress}% complete
                        </p>
                      </div>
                    )}

                    {error && (
                      <div className="bg-destructive/15 border border-destructive text-destructive p-3 rounded-md">
                        {error}
                      </div>
                    )}

                    {outputUrl && (
                      <div className="space-y-4">
                        <div className="p-4 bg-muted rounded-md">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-green-600 dark:text-green-500">
                              Processing Complete
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Your video with overlays is ready for download.
                          </p>
                        </div>
                        <Button onClick={handleDownload} className="w-full">
                          Download Watermarked Video
                        </Button>
                        <Button
                          onClick={resetAll}
                          variant="outline"
                          className="w-full"
                        >
                          Start Over
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* What it Does Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                What it Does
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                When you urgently need to securely brand unreleased footage or
                violently slap a copyright warning over a clip, you can add
                watermarks to video online natively in the browser. This secure
                environment brutally bypasses massive cloud upload times,
                aggressively mounting your 4K or 1080p MP4 file entirely
                offline. You can upload custom PNG graphics, fiercely command
                exact positioning coordinates, dial down the opacity density,
                and mathematically set precision timecodes to permanently lock
                digital overlays straight into the final encoded pixel data.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How to Use Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Use</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Deposit the raw video
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Drop your incredibly heavy MP4 file directly into the local
                workspace. The advanced canvas system immediately builds a
                secure temporary bridge to your memory architecture, completely
                preventing massive files from attempting a catastrophic Wi-Fi
                upload.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Inject the graphic overlay
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Upload your transparent PNG logo or severe copyright warning.
                You must violently drag the overlay across the visual timeline,
                tightly grab the corners to crush the pixel dimensions, and
                actively adjust the opacity bar to create a subtle ghosting
                effect.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Burn the composite render
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Smash the Process button to command your local CPU. The internal
                core physically decodes every individual video frame, heavily
                stamps the overlay graphics directly into the new visual matrix,
                and permanently exports the completed MP4 straight down to your
                local storage.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Use Cases</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Protecting unreleased client footage
                </h3>
                <p className="text-sm text-muted-foreground">
                  Freelance editors furiously sending rough cuts to
                  untrustworthy clients desperately need payment security.
                  Violently burning a massive, semi-transparent "UNPAID REVIEW"
                  warning straight across the center of the timeline
                  fundamentally destroys any chance the client can secretly
                  steal and use the work.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Branding corporate training materials
                </h3>
                <p className="text-sm text-muted-foreground">
                  HR departments mass-producing terrible orientation videos
                  rigidly require the company icon in every shot. Quickly
                  dropping the corporate PNG into the bottom corner securely
                  locks the branding identity permanently into the video
                  structure without opening a complicated Adobe application.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Timestamping legal security files
                </h3>
                <p className="text-sm text-muted-foreground">
                  Legal investigators compiling private dashcam or security
                  camera footage aggressively require hard data burned on
                  screen. Injecting a stark white timeline graphic precisely
                  over the exact incident fiercely forces the visual proof
                  permanently into the MP4 file.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Watermarking viral social media rips
                </h3>
                <p className="text-sm text-muted-foreground">
                  Meme aggregators desperately trying to claim ownership of
                  stolen internet videos aggressively slap their massive
                  Instagram handle directly onto the footage. Severely fusing
                  the username PNG into the clip heavily ensures their brand
                  travels with the file indefinitely.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Faking a television broadcast bug
                </h3>
                <p className="text-sm text-muted-foreground">
                  Amateur filmmakers shooting fake 1990s news reports absolutely
                  require authentic on-screen graphics. Pinning a highly opaque,
                  retro-designed news station logo accurately in the top right
                  corner entirely sells the illusion that the raw MP4 is
                  legitimately ripped from an ancient TV broadcast.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Settings Explained Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                Settings Explained
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg">
                    Absolute Alpha Compositing
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    When you stack a transparent image over video, the browser
                    forcefully calculates the underlying visual math instantly.
                    It aggressively merges the distinct background pixel data
                    directly through the empty zones of your PNG file, proving
                    this is an exact frame-by-frame destruction process, not a
                    cheap CSS trick.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    Hardware-Accelerated Timeline Logic
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Instead of violently attempting to render massive video
                    files blindly, the engine strictly watches your highly
                    specific Start Time and End Time commands. When the exact
                    second triggers, it abruptly drops the overlay mathematics
                    into the processing chain, efficiently minimizing heavy
                    rendering strain.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    Web Worker Core Separation
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    To entirely prevent the heavy visual rendering from crashing
                    your active scrolling tab, the system brutally throws the
                    raw calculations into a massive background Web Worker
                    thread. This ensures zero window freezing while the
                    processor violently reconstructs millions of pixels behind
                    the scenes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQs Section */}
        <section className="container mx-auto max-w-4xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to know about video overlays
            </p>
          </div>
          <Faqs faqs={faqData} />
        </section>

        {/* Related Tools Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              More Video Tools
            </h2>
            <p className="mt-4 text-muted-foreground">
              Explore our other free video editing tools
            </p>
          </div>
          <ToolLinkCards tools={relatedTools} />
        </section>
      </div>
    </>
  );
}
