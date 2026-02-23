"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Upload, Play, Pause, RotateCcw, Film, X } from "lucide-react";
import { toast } from "sonner";

// Import gif.js safely for Next.js SSR
const GIF: any = null;

interface ImageFrame {
  id: string;
  file: File;
  url: string;
  duration: number;
  isVideo?: boolean;
}

export default function ImageToGif() {
  const [frames, setFrames] = useState<ImageFrame[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [defaultDuration, setDefaultDuration] = useState([500]);
  const [loop, setLoop] = useState(true);
  const [gifQuality, setGifQuality] = useState([80]);

  const gifInstanceRef = useRef<any>(null);

  // ----------------------------------------------------------------------
  // File Handling
  // ----------------------------------------------------------------------

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      const newFrames: ImageFrame[] = [];
      Array.from(files).forEach((file) => {
        const url = URL.createObjectURL(file);
        const isVideo = file.type.startsWith("video/");

        newFrames.push({
          id: Math.random().toString(36).substring(7),
          file,
          url,
          duration: defaultDuration[0],
          isVideo,
        });
      });

      setFrames((prev) => [...prev, ...newFrames]);
      toast.success(`Added ${newFrames.length} frame(s)`);
      e.target.value = "";
    },
    [defaultDuration],
  );

  const removeFrame = useCallback((index: number) => {
    setFrames((prev) => {
      const frameToRemove = prev[index];
      URL.revokeObjectURL(frameToRemove.url);
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const moveFrame = useCallback((fromIndex: number, toIndex: number) => {
    setFrames((prev) => {
      const newFrames = [...prev];
      const [movedFrame] = newFrames.splice(fromIndex, 1);
      newFrames.splice(toIndex, 0, movedFrame);
      return newFrames;
    });
  }, []);

  const updateFrameDuration = useCallback((index: number, duration: number) => {
    setFrames((prev) => {
      const newFrames = [...prev];
      newFrames[index] = { ...newFrames[index], duration };
      return newFrames;
    });
  }, []);

  const clearAll = useCallback(() => {
    frames.forEach((frame) => URL.revokeObjectURL(frame.url));
    setFrames([]);
    setCurrentFrame(0);
    setIsPlaying(false);
    toast.success("All frames cleared");
  }, [frames]);

  // ----------------------------------------------------------------------
  // Animation Logic
  // ----------------------------------------------------------------------

  const playAnimation = useCallback(() => {
    if (frames.length === 0) return;
    setIsPlaying(true);
  }, [frames]);

  const stopAnimation = useCallback(() => {
    setIsPlaying(false);
    setCurrentFrame(0);
  }, []);

  useEffect(() => {
    if (!isPlaying || frames.length === 0) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        const next = prev + 1;
        return loop && next >= frames.length
          ? 0
          : next < frames.length
            ? next
            : prev;
      });
    }, frames[currentFrame]?.duration || 500);

    return () => clearInterval(interval);
  }, [isPlaying, frames, currentFrame, loop]);

  // ----------------------------------------------------------------------
  // Download with proper GIF headers
  // ----------------------------------------------------------------------
  const downloadGif = (blob: Blob, filename: string) => {
    // Create a new blob with explicit image/gif MIME type
    const gifBlob = new Blob([blob], { type: "image/gif" });

    // Create download link
    const url = URL.createObjectURL(gifBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.endsWith(".gif") ? filename : `${filename}.gif`;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  // ----------------------------------------------------------------------
  // Converter Logic
  // ----------------------------------------------------------------------

  const convertVideoToGif = async (
    videoFrame: ImageFrame,
    GIF: any,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.src = videoFrame.url;
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = "anonymous";

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      const gif = new GIF({
        workers: 2,
        quality: 10, // Lower number = better quality (1-30 is good)
        workerScript: "/workers/video-to-gif-worker.js",
        repeat: 0, // Loop forever
        transparent: 0x00000000,
        dither: false, // Better quality
        width: 480,
        height: 270,
      });

      gifInstanceRef.current = gif;

      gif.on("finished", (blob: Blob) => {
        const cleanName =
          videoFrame.file.name.substring(
            0,
            videoFrame.file.name.lastIndexOf("."),
          ) || videoFrame.file.name;
        downloadGif(blob, cleanName);
        resolve();
      });

      gif.on("progress", (p: number) => {
        setConversionProgress(Math.round(p * 100));
      });

      video.onloadedmetadata = async () => {
        // Keep reasonable size for WhatsApp
        const maxWidth = 480;
        const maxHeight = 480;
        const scale = Math.min(
          1,
          maxWidth / video.videoWidth,
          maxHeight / video.videoHeight,
        );

        canvas.width = Math.floor(video.videoWidth * scale);
        canvas.height = Math.floor(video.videoHeight * scale);

        gif.setOptions({
          width: canvas.width,
          height: canvas.height,
        });

        // Process video frames
        const duration = Math.min(video.duration, 6); // Max 6 seconds for WhatsApp
        const fps = 10; // 10 FPS is good for WhatsApp
        const interval = 1 / fps;
        const totalFrames = Math.floor(duration * fps);

        try {
          for (let i = 0; i < totalFrames; i++) {
            const currentTime = i * interval;
            video.currentTime = currentTime;

            await new Promise<void>((seekResolve) => {
              const onSeeked = () => {
                requestAnimationFrame(() => {
                  seekResolve();
                });
              };
              video.addEventListener("seeked", onSeeked, { once: true });
            });

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            gif.addFrame(canvas, {
              copy: true,
              delay: Math.round(interval * 1000), // Delay in milliseconds
            });

            setConversionProgress(Math.round((i / totalFrames) * 50));
          }

          gif.render();
        } catch (err) {
          reject(err);
        }
      };

      video.onerror = () => reject(new Error("Error loading video"));
      video.load();
    });
  };

  const convertImagesToGif = async (imageFrames: ImageFrame[], GIF: any) => {
    return new Promise<void>((resolve, reject) => {
      const gif = new GIF({
        workers: 2,
        quality: 10, // Better quality
        workerScript: "/workers/video-to-gif-worker.js",
        repeat: 0, // Loop forever
        transparent: 0x00000000,
        dither: false,
      });

      gifInstanceRef.current = gif;

      gif.on("finished", (blob: Blob) => {
        downloadGif(blob, "animation");
        resolve();
      });

      gif.on("progress", (p: number) =>
        setConversionProgress(Math.round(p * 100)),
      );

      const processImages = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) throw new Error("Could not get canvas context");

        // Load first image to set dimensions
        const firstImg = new Image();
        firstImg.crossOrigin = "anonymous";
        await new Promise((r, rj) => {
          firstImg.onload = r;
          firstImg.onerror = rj;
          firstImg.src = imageFrames[0].url;
        });

        // Set canvas size (limit for WhatsApp compatibility)
        const maxSize = 480;
        const scale = Math.min(
          1,
          maxSize / firstImg.width,
          maxSize / firstImg.height,
        );
        canvas.width = Math.floor(firstImg.width * scale);
        canvas.height = Math.floor(firstImg.height * scale);

        gif.setOptions({
          width: canvas.width,
          height: canvas.height,
        });

        // Process each frame
        for (let i = 0; i < imageFrames.length; i++) {
          const frame = imageFrames[i];
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = frame.url;

          await new Promise((r, rj) => {
            if (img.complete) r(null);
            img.onload = r;
            img.onerror = rj;
          });

          // Clear and draw
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Add frame with proper delay
          gif.addFrame(canvas, {
            copy: true,
            delay: frame.duration,
          });

          setConversionProgress(Math.round((i / imageFrames.length) * 50));
        }

        gif.render();
      };

      processImages().catch(reject);
    });
  };

  const convertToGif = async () => {
    if (frames.length === 0) {
      toast.error("Please add at least one frame");
      return;
    }

    setIsConverting(true);
    setConversionProgress(0);

    try {
      // Dynamically import gif.js library when needed
      const gifModule = await import("gif.js");
      const GIF = gifModule.default || gifModule;

      const videoFrames = frames.filter((frame) => frame.isVideo);
      const imageFrames = frames.filter((frame) => !frame.isVideo);

      if (videoFrames.length > 0) {
        for (const videoFrame of videoFrames) {
          toast.info(`Processing video: ${videoFrame.file.name}`);
          await convertVideoToGif(videoFrame, GIF);
        }
        toast.success("✅ Video converted! GIF should auto-play on WhatsApp");
      }

      if (imageFrames.length > 0) {
        await convertImagesToGif(imageFrames, GIF);
        toast.success("✅ GIF created! Should auto-play on WhatsApp");
      }
    } catch (error) {
      console.error("Error creating GIF:", error);
      toast.error("Failed to create GIF: " + (error as Error).message);
    } finally {
      setIsConverting(false);
      setConversionProgress(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Media</CardTitle>
            <CardDescription>Supports both images and videos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="file-upload">Upload Media</Label>
              <Input
                id="file-upload"
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="mt-1 cursor-pointer"
              />
              <p className="text-xs text-muted-foreground mt-1">
                For animations: Upload images or videos. For video: Upload 1
                video.
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Frame Duration (Images)</Label>
                <span className="text-sm text-muted-foreground">
                  {defaultDuration[0]}ms
                </span>
              </div>
              <Slider
                value={defaultDuration}
                onValueChange={setDefaultDuration}
                max={2000}
                min={50}
                step={50}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Output Quality</Label>
                <span className="text-sm text-muted-foreground">
                  {gifQuality[0]}%
                </span>
              </div>
              <Slider
                value={gifQuality}
                onValueChange={setGifQuality}
                max={100}
                min={10}
                step={10}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Higher quality = larger file size
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="loop" checked={loop} onCheckedChange={setLoop} />
              <Label htmlFor="loop">Loop Animation (Preview only)</Label>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={convertToGif}
                disabled={frames.length === 0 || isConverting}
                className="flex-1"
              >
                {isConverting ? "Processing..." : "Export GIF"}
              </Button>
              <Button
                variant="outline"
                onClick={clearAll}
                disabled={frames.length === 0 || isConverting}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            {isConverting && (
              <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-top-2">
                <div className="flex justify-between text-xs">
                  <span>Rendering GIF...</span>
                  <span>{conversionProgress}%</span>
                </div>
                <Progress value={conversionProgress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {frames.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {frames.map((frame, index) => (
                <div
                  key={frame.id}
                  className="flex items-center gap-4 p-3 bg-card border rounded-lg shadow-sm"
                >
                  <span className="font-mono text-xs text-muted-foreground w-6">
                    #{index + 1}
                  </span>
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {frame.isVideo ? (
                      <Film className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 bg-primary/20 rounded flex-shrink-0" />
                    )}
                    <span className="text-sm truncate">{frame.file.name}</span>
                  </div>

                  {!frame.isVideo && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={frame.duration}
                        onChange={(e) =>
                          updateFrameDuration(
                            index,
                            parseInt(e.target.value) || 500,
                          )
                        }
                        className="w-20 h-8 text-right"
                        min="50"
                        max="5000"
                        step="50"
                      />
                      <span className="text-xs text-muted-foreground">ms</span>
                    </div>
                  )}

                  <div className="flex gap-1">
                    <Button
                      onClick={() => moveFrame(index, Math.max(0, index - 1))}
                      disabled={index === 0}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      ↑
                    </Button>
                    <Button
                      onClick={() =>
                        moveFrame(index, Math.min(frames.length - 1, index + 1))
                      }
                      disabled={index === frames.length - 1}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      ↓
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
