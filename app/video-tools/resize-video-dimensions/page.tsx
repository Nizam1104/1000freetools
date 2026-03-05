"use client";

import { useState, useRef } from "react";
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
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Script from "next/script";

const faqData = [
  {
    question:
      "How do I resize a video to 1080p or 720p without uploading it anywhere?",
    answer:
      "Select your video using the file picker and pick the 1080p or 720p preset button. The encoder runs entirely in your browser using your own CPU, so the file never leaves your device. Your video gets remapped to the new pixel grid frame by frame and downloads directly to your computer when done.",
  },
  {
    question:
      "What is the difference between Contain, Cover, and Fill fit modes?",
    answer:
      "Contain shrinks the video to fit inside your target box while keeping the full image visible. Any empty space gets filled with black bars. Cover zooms the video until it fills the entire frame, which crops the edges. Fill ignores the original proportions and stretches the image to match your exact width and height, which can distort faces and objects.",
  },
  {
    question: "Does typing a larger resolution make the video look sharper?",
    answer:
      "No. Upscaling does not add detail that was never recorded. If you take a 480p clip and resize it to 4K, the encoder spreads the same limited pixels across a much larger canvas, which makes the image look blurrier. Downscaling from a higher resolution to a lower one does work well because you are discarding data rather than inventing it.",
  },
  {
    question:
      "Why does the height field update automatically when I change the width?",
    answer:
      "The Maintain Aspect Ratio toggle is on by default. It calculates the exact ratio between your video's original width and height, then applies that same ratio to whichever dimension you type. This prevents the video from appearing stretched or squashed when you only change one side.",
  },
  {
    question: "Is my video uploaded to a server when I use this tool?",
    answer:
      "Your video is never uploaded. The resizing engine runs inside your browser using WebAssembly. It reads your file from your local drive, processes it frame by frame in your device's memory, and writes the output back to your drive. No data travels over your network connection during this process.",
  },
  {
    question: "How long does it take to resize a long 4K video?",
    answer:
      "Processing time depends on your device's CPU speed and the length of your video. A 4K video that is three minutes long can take several minutes on an average laptop because the encoder must recalculate pixel values for thousands of frames. Keep the browser tab active and avoid other heavy tasks to give the encoder as much CPU bandwidth as possible.",
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

export default function ResizeVideoDimensionsPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [newWidth, setNewWidth] = useState<number>(0);
  const [newHeight, setNewHeight] = useState<number>(0);
  const [fitMode, setFitMode] = useState<"fill" | "contain" | "cover">(
    "contain",
  );
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setOutputUrl(null);
      setError(null);
      setNewWidth(0);
      setNewHeight(0);
    }
  };

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const width = video.videoWidth;
      const height = video.videoHeight;
      setVideoDimensions({ width, height });
      setNewWidth(width);
      setNewHeight(height);
    }
  };

  const handleWidthChange = (value: number) => {
    setNewWidth(value);
    if (maintainAspectRatio && videoDimensions.height > 0) {
      const aspectRatio = videoDimensions.height / videoDimensions.width;
      setNewHeight(Math.round(value * aspectRatio));
    }
  };

  const handleHeightChange = (value: number) => {
    setNewHeight(value);
    if (maintainAspectRatio && videoDimensions.width > 0) {
      const aspectRatio = videoDimensions.width / videoDimensions.height;
      setNewWidth(Math.round(value * aspectRatio));
    }
  };

  const handlePresetClick = (preset: string) => {
    const presets: Record<string, { width: number; height: number }> = {
      "4K": { width: 3840, height: 2160 },
      "1080p": { width: 1920, height: 1080 },
      "720p": { width: 1280, height: 720 },
      "480p": { width: 854, height: 480 },
    };
    const dimensions = presets[preset];
    if (dimensions) {
      setNewWidth(dimensions.width);
      setNewHeight(dimensions.height);
    }
  };

  const handleResize = async () => {
    if (!videoFile || !newWidth || !newHeight) {
      setError("Please select a video and specify dimensions");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      const input = new Input({
        source: new BlobSource(videoFile),
        formats: ALL_FORMATS,
      });

      const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
      });

      const conversion = await Conversion.init({
        input,
        output,
        video: {
          width: newWidth,
          height: newHeight,
          fit: fitMode,
        },
      });

      conversion.onProgress = (progressValue: number) => {
        setProgress(Math.round(progressValue * 100));
      };

      await conversion.execute();

      const resizedBuffer = output.target.buffer;
      if (!resizedBuffer) {
        throw new Error("Failed to get resized video buffer");
      }
      const resizedBlob = new Blob([resizedBuffer], { type: "video/mp4" });
      const resizedUrl = URL.createObjectURL(resizedBlob);
      setOutputUrl(resizedUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resize video");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `resized-${videoFile?.name || "video.mp4"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const presets = ["4K", "1080p", "720p", "480p"];
  const fitModes: {
    mode: "fill" | "contain" | "cover";
    label: string;
    description: string;
  }[] = [
      {
        mode: "fill",
        label: "Fill",
        description: "Stretches video to fill dimensions (may distort)",
      },
      {
        mode: "contain",
        label: "Contain",
        description: "Fits video within dimensions (may add black bars)",
      },
      {
        mode: "cover",
        label: "Cover",
        description: "Crops video to cover dimensions (may cut edges)",
      },
    ];

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
      name: "Video Overlays",
      description: "Add watermark or logo to video online",
      href: "/video-tools/video-overlays",
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
                Resize Video Online Free – Change Video Resolution to Any Size
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Change your video to 4K, 1080p, 720p, 480p, or any custom pixel
                size directly in your browser. Pick a fit mode to control how
                the image fills the new frame. No uploads, no software, no cost.
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
                  Resize Video Dimensions
                </h2>

                {/* File Upload */}
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <Label>Select Video</Label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm
                          file:mr-4 file:py-2 file:px-4
                          file:rounded file:border-0
                          file:text-sm file:font-semibold
                          file:bg-primary file:text-primary-foreground
                          hover:file:bg-primary/90"
                      />
                    </div>
                  </CardContent>
                </Card>

                {videoUrl && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Video Preview */}
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">Preview</h2>
                        <video
                          ref={videoRef}
                          src={videoUrl}
                          onLoadedMetadata={handleVideoLoaded}
                          controls
                          className="w-full rounded-md bg-black aspect-video"
                        />

                        {videoDimensions.width > 0 && (
                          <div className="mt-4 p-3 bg-muted rounded-md space-y-2">
                            <p className="text-sm text-muted-foreground">
                              Original Dimensions:{" "}
                              <span className="text-foreground font-medium">
                                {videoDimensions.width} x{" "}
                                {videoDimensions.height}
                              </span>
                            </p>
                            {newWidth > 0 && newHeight > 0 && (
                              <p className="text-sm text-muted-foreground">
                                New Dimensions:{" "}
                                <span className="text-green-600 dark:text-green-500 font-medium">
                                  {newWidth} x {newHeight}
                                </span>
                              </p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Resize Settings */}
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">
                          Resize Settings
                        </h2>
                        <div className="space-y-4">
                          {/* Preset Buttons */}
                          <div>
                            <Label className="mb-2 block">Quick Presets</Label>
                            <div className="flex flex-wrap gap-2">
                              {presets.map((preset) => (
                                <Button
                                  key={preset}
                                  variant="outline"
                                  onClick={() => handlePresetClick(preset)}
                                  className="text-sm"
                                >
                                  {preset}
                                </Button>
                              ))}
                            </div>
                          </div>

                          {/* Custom Dimensions */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="mb-1 block">Width (px)</Label>
                              <input
                                type="number"
                                value={newWidth || ""}
                                onChange={(e) =>
                                  handleWidthChange(
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                min={1}
                                className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="mb-1 block">Height (px)</Label>
                              <input
                                type="number"
                                value={newHeight || ""}
                                onChange={(e) =>
                                  handleHeightChange(
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                min={1}
                                className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                          </div>

                          {/* Aspect Ratio Toggle */}
                          <div className="flex items-center gap-2">
                            <Switch
                              id="aspect-ratio"
                              checked={maintainAspectRatio}
                              onCheckedChange={setMaintainAspectRatio}
                            />
                            <Label htmlFor="aspect-ratio" className="text-sm">
                              Maintain Aspect Ratio
                            </Label>
                          </div>

                          {/* Fit Mode */}
                          <div>
                            <Label className="mb-2 block">Fit Mode</Label>
                            <div className="flex gap-2">
                              {fitModes.map((fit) => (
                                <Button
                                  key={fit.mode}
                                  variant={
                                    fitMode === fit.mode ? "default" : "outline"
                                  }
                                  onClick={() => setFitMode(fit.mode)}
                                  className="flex-1 text-sm"
                                >
                                  {fit.label}
                                </Button>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {
                                fitModes.find((f) => f.mode === fitMode)
                                  ?.description
                              }
                            </p>
                          </div>

                          <Button
                            onClick={handleResize}
                            disabled={isProcessing || !newWidth || !newHeight}
                            className="w-full"
                          >
                            {isProcessing ? "Processing..." : "Resize Video"}
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
                            <div className="mt-4 space-y-4">
                              <div>
                                <h3 className="text-sm font-semibold mb-2">
                                  Result
                                </h3>
                                <video
                                  src={outputUrl}
                                  controls
                                  className="w-full rounded-md bg-black aspect-video mb-3"
                                />
                              </div>
                              <Button
                                onClick={handleDownload}
                                className="w-full"
                              >
                                Download Resized Video
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* What Resizing Does */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                What Resizing Actually Does
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Resizing changes the pixel dimensions of your video. Downscaling (4K to 1080p) shrinks the image and usually improves perceived quality. Upscaling (480p to 1080p) makes it larger but doesn't add real detail — it just spreads existing pixels across a bigger canvas.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The tool recalculates every frame to match your target dimensions. If aspect ratios don't match, the fit mode determines what happens: contain adds black bars, cover crops the edges, or fill stretches the image (which distorts it).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This runs entirely in your browser. No upload means faster processing and complete privacy. Processing time depends on video length and your computer's speed.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* When Resizing Helps */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">When You Need This</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Meeting platform upload limits</h3>
                <p className="text-sm text-muted-foreground">
                  Some platforms cap uploads at 720p or 1080p. If you shot in 4K, downscaling ensures your file gets accepted. Smaller resolution also means faster upload and smaller file size.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Matching clips from different cameras</h3>
                <p className="text-sm text-muted-foreground">
                  One camera shot 4K, another shot 1080p. Editing them together causes issues. Resize everything to 1080p before importing to your editor for a smooth timeline.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Landscape to vertical for Reels or TikTok</h3>
                <p className="text-sm text-muted-foreground">
                  Set width to 1080 and height to 1920, then use Cover mode. The tool crops the sides to fill the vertical frame. You lose the edges but get a full-screen mobile video.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Reducing file size for email</h3>
                <p className="text-sm text-muted-foreground">
                  Email attachments usually cap at 10-25MB. Resizing 1080p to 480p cuts the pixel count by 75%, often enough to fit under the limit. Quality drops but it's shareable.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Custom banner or display sizes</h3>
                <p className="text-sm text-muted-foreground">
                  Digital signage or web banners need specific dimensions. Turn off aspect ratio lock and type exact values. Use Fill mode to stretch the video to fit — just know it will distort.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resolution Reference */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                Common Video Resolutions
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Name</th>
                      <th className="text-left py-3 px-4 font-medium">Resolution</th>
                      <th className="text-left py-3 px-4 font-medium">Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">4K (UHD)</td>
                      <td className="py-3 px-4">3840 x 2160</td>
                      <td className="py-3 px-4">High-end production, future-proofing</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">1080p (Full HD)</td>
                      <td className="py-3 px-4">1920 x 1080</td>
                      <td className="py-3 px-4">Standard web video, YouTube</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">720p (HD)</td>
                      <td className="py-3 px-4">1280 x 720</td>
                      <td className="py-3 px-4">Faster uploads, smaller screens</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">480p (SD)</td>
                      <td className="py-3 px-4">854 x 480</td>
                      <td className="py-3 px-4">Email attachments, low bandwidth</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">Vertical (9:16)</td>
                      <td className="py-3 px-4">1080 x 1920</td>
                      <td className="py-3 px-4">TikTok, Reels, Shorts</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">Square (1:1)</td>
                      <td className="py-3 px-4">1080 x 1080</td>
                      <td className="py-3 px-4">Instagram feed posts</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Using This Tool */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Resize Your Video</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="relative font-semibold text-xl">Upload your video</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Select or drag your file. It stays local — no server upload. The tool shows your original resolution so you know what you're working with.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">Set target dimensions</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click a preset like 1080p or 720p, or type custom width and height. Keep aspect ratio locked to avoid distortion — unless you specifically need to stretch the image.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">Resize and download</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click resize and wait. Processing time depends on video length and resolution. Keep the tab open. When done, preview and download the resized file.
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
                  Meeting platform resolution limits
                </h3>
                <p className="text-sm text-muted-foreground">
                  Some community forums and older video platforms cap uploads at
                  720p or 1080p. If you filmed in 4K, select the matching preset
                  to scale the clip down to the required ceiling before you
                  upload. The encoder remaps every frame to the smaller grid and
                  produces a file that passes the platform check.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Standardizing clips from multiple cameras
                </h3>
                <p className="text-sm text-muted-foreground">
                  When you receive footage from different phones and cameras for
                  a project, each clip often has a different resolution. Type
                  1920x1080 into the custom fields and process each clip
                  individually. Every file comes out at the same pixel size,
                  which prevents resolution mismatch errors when you bring them
                  into a video editor.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Reformatting landscape video to vertical
                </h3>
                <p className="text-sm text-muted-foreground">
                  YouTube videos filmed in 16:9 do not fit Instagram Reels or
                  TikTok without reformatting. Set the width to 1080 and the
                  height to 1920, then select Cover mode. The encoder zooms the
                  video until it fills the vertical frame and trims the left and
                  right edges, producing a full-screen vertical clip.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Reducing file size for email delivery
                </h3>
                <p className="text-sm text-muted-foreground">
                  Email attachments typically have a size cap between 10MB and
                  25MB. A one-minute 1080p recording can exceed 100MB. Resizing
                  it to 480p cuts the pixel count by more than 75%, which
                  reduces file size enough for most email clients to accept the
                  attachment without a cloud link workaround.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Creating narrow banner video for websites
                </h3>
                <p className="text-sm text-muted-foreground">
                  Hero banners on landing pages often use a custom aspect ratio
                  like 1920x400. Turn off the aspect ratio lock and type your
                  banner dimensions into the width and height fields. The Fill
                  mode stretches the video to match both dimensions so it covers
                  the banner area without black bars on any side.
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
                  <h3 className="font-bold text-lg">Width and Height Fields</h3>
                  <p className="text-muted-foreground mt-2">
                    These two fields define the exact output pixel dimensions.
                    Standard HD video is 1920 pixels wide by 1080 pixels tall.
                    Standard 4K is 3840 by 2160. You can also type any custom
                    number here, such as 1080x1080 for a square post or
                    1080x1920 for a vertical reel. The preset buttons fill these
                    fields automatically for common sizes.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Maintain Aspect Ratio</h3>
                  <p className="text-muted-foreground mt-2">
                    When this toggle is on, changing the width recalculates the
                    height to preserve the original proportions, and vice versa.
                    This prevents the video from looking squashed or stretched.
                    Turn it off when you intentionally want to force a specific
                    aspect ratio that does not match the source, such as
                    converting a 16:9 clip to square format.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Fit Mode</h3>
                  <p className="text-muted-foreground mt-2">
                    Contain scales the video down so the entire image fits
                    inside your target dimensions. Gaps appear as black bars.
                    Cover scales the video up until it fills the frame
                    completely, trimming any content that extends outside the
                    boundary. Fill ignores the original ratio and forces the
                    image to exactly match both your width and height values,
                    which stretches the content.
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
