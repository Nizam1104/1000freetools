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
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Script from "next/script";

const faqData = [
  {
    question:
      "How does the tool enhance video quality online free without an account?",
    answer:
      "This tool allows you to enhance video quality online free directly within your browser window using web assembly technology. Because the processing uses your local device hardware, there are no server costs to pass on, allowing unlimited free usage without requiring you to create an account or provide payment information.",
  },
  {
    question:
      "Can I take a blurry 480p file and upscale the video to 4K resolution?",
    answer:
      "While you can technically force the output resolution to scale up to 3840x2160, you cannot invent new visual data that did not exist in the original 480p file. The upscaler will enlarge the image and the sharpening filter can crisp up the edges, but the result will likely look artificially smoothed rather than possessing true 4K cinematic detail.",
  },
  {
    question: "What exactly does the video bitrate slider change?",
    answer:
      "The video bitrate determines how many megabits of data are allocated to render each second of your footage. Moving the slider to a higher value prevents blocky compression artifacts and color banding, but will significantly increase the final physical file size sitting on your hard drive.",
  },
  {
    question: "Why should I use the denoise filter on my low light clips?",
    answer:
      "Shooting in low light often forces camera sensors to guess pixel values, resulting in an ugly, moving static effect called visual noise. The denoise slider deliberately applies selective smoothing algorithms that blend these noisy artifacts together, resulting in a cleaner and less chaotic image.",
  },
  {
    question: "Is there a limit to how large a file I can enhance?",
    answer:
      "There are no strict file size limits coded into the tool, but the practical limit relies entirely on your personal computer's available RAM. If you attempt to process a massive 10GB raw video file on a standard laptop, your browser tab will likely crash before the local rendering engine can finish the job.",
  },
  {
    question:
      "Will dragging the brightness slider reveal details hidden in pitch black shadows?",
    answer:
      "If the camera sensor recorded true black pixels with no underlying data to distinguish objects, dragging the brightness slider up will only turn those black areas into muddy grey areas. You can successfully brighten dark footage to improve visibility, but you cannot recover details that were completely crushed during filming.",
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

type EnhancementOptions = {
  upscale: boolean;
  targetResolution: string;
  customWidth: number;
  customHeight: number;
  bitrate: number;
  sharpness: number;
  denoise: number;
  brightness: number;
  contrast: number;
  saturation: number;
  hdr: boolean;
};

export default function EnhanceVideoQualityPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [videoDuration, setVideoDuration] = useState(0);
  const [enhancementOptions, setEnhancementOptions] =
    useState<EnhancementOptions>({
      upscale: false,
      targetResolution: "1080p",
      customWidth: 0,
      customHeight: 0,
      bitrate: 5000000,
      sharpness: 0,
      denoise: 0,
      brightness: 0,
      contrast: 1,
      saturation: 1,
      hdr: false,
    });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<OffscreenCanvas | null>(null);
  const ctxRef = useRef<OffscreenCanvasRenderingContext2D | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setOutputUrl(null);
      setError(null);
    }
  };

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      setVideoDimensions({
        width: video.videoWidth,
        height: video.videoHeight,
      });
      setVideoDuration(video.duration);
      setEnhancementOptions((prev) => ({
        ...prev,
        customWidth: video.videoWidth,
        customHeight: video.videoHeight,
      }));
    }
  };

  const handleResolutionChange = (resolution: string) => {
    const resolutions: Record<string, { width: number; height: number }> = {
      "4K": { width: 3840, height: 2160 },
      "1440p": { width: 2560, height: 1440 },
      "1080p": { width: 1920, height: 1080 },
      "720p": { width: 1280, height: 720 },
      "480p": { width: 854, height: 480 },
      Original: {
        width: videoDimensions.width,
        height: videoDimensions.height,
      },
    };
    const dimensions = resolutions[resolution];
    if (dimensions) {
      setEnhancementOptions((prev) => ({
        ...prev,
        targetResolution: resolution,
        customWidth: dimensions.width,
        customHeight: dimensions.height,
      }));
    }
  };

  const handleEnhancementChange = (
    key: keyof EnhancementOptions,
    value: number | boolean | string,
  ) => {
    setEnhancementOptions((prev) => ({ ...prev, [key]: value }));
  };

  const applyImageProcessing = (
    sample: any,
    width: number,
    height: number,
  ): OffscreenCanvas => {
    if (
      !canvasRef.current ||
      canvasRef.current.width !== width ||
      canvasRef.current.height !== height
    ) {
      canvasRef.current = new OffscreenCanvas(width, height);
      ctxRef.current = canvasRef.current.getContext("2d");
    }

    const ctx = ctxRef.current!;
    const canvas = canvasRef.current!;

    ctx.clearRect(0, 0, width, height);

    const { sharpness, brightness, contrast, saturation, denoise } =
      enhancementOptions;

    let filterString = `brightness(${1 + brightness})`;
    filterString += ` contrast(${contrast})`;
    filterString += ` saturate(${saturation})`;

    if (denoise > 0) {
      const blurAmount = denoise * 0.5;
      filterString += ` blur(${blurAmount}px)`;
    }

    ctx.filter = filterString;
    sample.draw(ctx, 0, 0, width, height);

    if (sharpness > 0) {
      const imageData = ctx.getImageData(0, 0, width, height);
      const sharpenedData = applySharpnessFilter(
        imageData,
        width,
        height,
        sharpness,
      );
      ctx.putImageData(sharpenedData, 0, 0);
    }

    return canvas;
  };

  const applySharpnessFilter = (
    imageData: ImageData,
    width: number,
    height: number,
    amount: number,
  ): ImageData => {
    const data = imageData.data;
    const output = new Uint8ClampedArray(data.length);
    const mix = amount * 0.5;

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;

        for (let c = 0; c < 3; c++) {
          const center = data[idx + c];
          const top = data[((y - 1) * width + x) * 4 + c];
          const bottom = data[((y + 1) * width + x) * 4 + c];
          const left = data[(y * width + (x - 1)) * 4 + c];
          const right = data[(y * width + (x + 1)) * 4 + c];

          const edge = center * 4 - top - bottom - left - right;
          output[idx + c] = Math.max(0, Math.min(255, center + edge * mix));
        }

        output[idx + 3] = data[idx + 3];
      }
    }

    for (let x = 0; x < width; x++) {
      output[x * 4] = data[x * 4];
      output[x * 4 + 1] = data[x * 4 + 1];
      output[x * 4 + 2] = data[x * 4 + 2];
      output[x * 4 + 3] = data[x * 4 + 3];

      const bottomIdx = ((height - 1) * width + x) * 4;
      output[bottomIdx] = data[bottomIdx];
      output[bottomIdx + 1] = data[bottomIdx + 1];
      output[bottomIdx + 2] = data[bottomIdx + 2];
      output[bottomIdx + 3] = data[bottomIdx + 3];
    }

    for (let y = 0; y < height; y++) {
      const leftIdx = y * width * 4;
      output[leftIdx] = data[leftIdx];
      output[leftIdx + 1] = data[leftIdx + 1];
      output[leftIdx + 2] = data[leftIdx + 2];
      output[leftIdx + 3] = data[leftIdx + 3];

      const rightIdx = (y * width + (width - 1)) * 4;
      output[rightIdx] = data[rightIdx];
      output[rightIdx + 1] = data[rightIdx + 1];
      output[rightIdx + 2] = data[rightIdx + 2];
      output[rightIdx + 3] = data[rightIdx + 3];
    }

    return new ImageData(output, width, height);
  };

  const handleEnhance = async () => {
    if (!videoFile) {
      setError("Please select a video file");
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

      const targetWidth = enhancementOptions.upscale
        ? enhancementOptions.customWidth
        : videoDimensions.width;
      const targetHeight = enhancementOptions.upscale
        ? enhancementOptions.customHeight
        : videoDimensions.height;

      const needsProcessing =
        enhancementOptions.sharpness > 0 ||
        enhancementOptions.denoise > 0 ||
        enhancementOptions.brightness !== 0 ||
        enhancementOptions.contrast !== 1 ||
        enhancementOptions.saturation !== 1;

      const conversion = await Conversion.init({
        input,
        output,
        video: {
          width: targetWidth,
          height: targetHeight,
          fit: "contain",
          bitrate: enhancementOptions.bitrate,
          hardwareAcceleration: "prefer-hardware",
          ...(needsProcessing && {
            process: async (sample) => {
              return applyImageProcessing(sample, targetWidth, targetHeight);
            },
          }),
        },
      });

      conversion.onProgress = (progressValue: number) => {
        setProgress(Math.round(progressValue * 100));
      };

      await conversion.execute();

      const enhancedBuffer = output.target.buffer;
      if (!enhancedBuffer) {
        throw new Error("Failed to get enhanced video buffer");
      }

      const enhancedBlob = new Blob([enhancedBuffer], { type: "video/mp4" });
      const enhancedUrl = URL.createObjectURL(enhancedBlob);
      setOutputUrl(enhancedUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      console.error("Enhancement error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to enhance video quality",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl || !videoFile) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `enhanced-${videoFile.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formatBitrate = (bitrate: number): string => {
    if (bitrate >= 1000000) {
      return `${(bitrate / 1000000).toFixed(1)} Mbps`;
    }
    return `${(bitrate / 1000).toFixed(0)} Kbps`;
  };

  const calculateRecommendedBitrate = (): number => {
    const resolution = enhancementOptions.targetResolution;
    const bitrates: Record<string, number> = {
      "4K": 20000000,
      "1440p": 12000000,
      "1080p": 5000000,
      "720p": 2500000,
      "480p": 1000000,
    };
    return bitrates[resolution] || 5000000;
  };

  const handleApplyRecommendedBitrate = () => {
    setEnhancementOptions((prev) => ({
      ...prev,
      bitrate: calculateRecommendedBitrate(),
    }));
  };

  const resolutions = ["4K", "1440p", "1080p", "720p", "480p", "Original"];

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
                Video Quality Enhancer – Upscale, Sharpen & Improve Video Online
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Give your videos a professional quality boost. Upscale to 1080p
                or 4K, apply sharpening, reduce noise, and fine-tune color
                directly in your browser — completely free.
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
                  Enhance Video Quality
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
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Video Preview */}
                    <div className="lg:col-span-1 space-y-6">
                      <Card>
                        <CardContent className="pt-6">
                          <h2 className="text-lg font-semibold mb-4">
                            Preview
                          </h2>
                          <video
                            ref={videoRef}
                            src={videoUrl}
                            onLoadedMetadata={handleVideoLoaded}
                            controls
                            className="w-full rounded-md bg-black aspect-video"
                          />

                          {videoDimensions.width > 0 && (
                            <div className="mt-4 space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Resolution:
                                </span>
                                <span className="font-medium">
                                  {videoDimensions.width} x{" "}
                                  {videoDimensions.height}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Duration:
                                </span>
                                <span className="font-medium">
                                  {videoDuration.toFixed(2)}s
                                </span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {outputUrl && (
                        <Card>
                          <CardContent className="pt-6">
                            <h3 className="text-sm font-semibold mb-3 text-green-600 dark:text-green-500">
                              ✓ Enhancement Complete
                            </h3>
                            <video
                              src={outputUrl}
                              controls
                              className="w-full rounded-md bg-black aspect-video mb-4"
                            />
                            <Button onClick={handleDownload} className="w-full">
                              Download Enhanced Video
                            </Button>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Enhancement Settings */}
                    <div className="lg:col-span-2">
                      <Card>
                        <CardContent className="pt-6">
                          <h2 className="text-lg font-semibold mb-6">
                            Enhancement Settings
                          </h2>

                          <div className="space-y-6">
                            {/* Upscaling Section */}
                            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">
                                  Resolution Upscaling
                                </h3>
                                <div className="flex items-center gap-2">
                                  <Label
                                    htmlFor="upscale-toggle"
                                    className="text-sm"
                                  >
                                    Enable
                                  </Label>
                                  <Switch
                                    id="upscale-toggle"
                                    checked={enhancementOptions.upscale}
                                    onCheckedChange={(checked) =>
                                      handleEnhancementChange(
                                        "upscale",
                                        checked,
                                      )
                                    }
                                  />
                                </div>
                              </div>

                              {enhancementOptions.upscale && (
                                <div className="space-y-4">
                                  <div>
                                    <Label className="mb-2 block">
                                      Target Resolution
                                    </Label>
                                    <div className="flex flex-wrap gap-2">
                                      {resolutions.map((res) => (
                                        <Button
                                          key={res}
                                          variant={
                                            enhancementOptions.targetResolution ===
                                            res
                                              ? "default"
                                              : "outline"
                                          }
                                          onClick={() =>
                                            handleResolutionChange(res)
                                          }
                                          className="text-sm"
                                        >
                                          {res}
                                        </Button>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="mb-1 block">
                                        Custom Width (px)
                                      </Label>
                                      <input
                                        type="number"
                                        value={
                                          enhancementOptions.customWidth || ""
                                        }
                                        onChange={(e) =>
                                          handleEnhancementChange(
                                            "customWidth",
                                            parseInt(e.target.value) || 0,
                                          )
                                        }
                                        min={1}
                                        className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                                      />
                                    </div>
                                    <div>
                                      <Label className="mb-1 block">
                                        Custom Height (px)
                                      </Label>
                                      <input
                                        type="number"
                                        value={
                                          enhancementOptions.customHeight || ""
                                        }
                                        onChange={(e) =>
                                          handleEnhancementChange(
                                            "customHeight",
                                            parseInt(e.target.value) || 0,
                                          )
                                        }
                                        min={1}
                                        className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Bitrate Section */}
                            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">
                                  Bitrate (Quality)
                                </h3>
                                <Button
                                  variant="link"
                                  className="text-xs h-auto p-0"
                                  onClick={handleApplyRecommendedBitrate}
                                >
                                  Use Recommended
                                </Button>
                              </div>
                              <div className="space-y-2">
                                <Slider
                                  value={[enhancementOptions.bitrate]}
                                  min={500000}
                                  max={50000000}
                                  step={100000}
                                  onValueChange={([value]) =>
                                    handleEnhancementChange("bitrate", value)
                                  }
                                />
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    500 Kbps
                                  </span>
                                  <span className="font-medium">
                                    {formatBitrate(enhancementOptions.bitrate)}
                                  </span>
                                  <span className="text-muted-foreground">
                                    50 Mbps
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Image Enhancement Section */}
                            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                              <h3 className="font-medium">Image Enhancement</h3>

                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between mb-2">
                                    <Label>Sharpness</Label>
                                    <span className="text-sm text-muted-foreground">
                                      {(
                                        enhancementOptions.sharpness * 100
                                      ).toFixed(0)}
                                      %
                                    </span>
                                  </div>
                                  <Slider
                                    value={[enhancementOptions.sharpness]}
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    onValueChange={([value]) =>
                                      handleEnhancementChange(
                                        "sharpness",
                                        value,
                                      )
                                    }
                                  />
                                </div>

                                <div>
                                  <div className="flex justify-between mb-2">
                                    <Label>Denoise</Label>
                                    <span className="text-sm text-muted-foreground">
                                      {(
                                        enhancementOptions.denoise * 100
                                      ).toFixed(0)}
                                      %
                                    </span>
                                  </div>
                                  <Slider
                                    value={[enhancementOptions.denoise]}
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    onValueChange={([value]) =>
                                      handleEnhancementChange("denoise", value)
                                    }
                                  />
                                </div>

                                <div>
                                  <div className="flex justify-between mb-2">
                                    <Label>Brightness</Label>
                                    <span className="text-sm text-muted-foreground">
                                      {(
                                        enhancementOptions.brightness * 100
                                      ).toFixed(0)}
                                      %
                                    </span>
                                  </div>
                                  <Slider
                                    value={[enhancementOptions.brightness]}
                                    min={-0.5}
                                    max={0.5}
                                    step={0.05}
                                    onValueChange={([value]) =>
                                      handleEnhancementChange(
                                        "brightness",
                                        value,
                                      )
                                    }
                                  />
                                </div>

                                <div>
                                  <div className="flex justify-between mb-2">
                                    <Label>Contrast</Label>
                                    <span className="text-sm text-muted-foreground">
                                      {(
                                        enhancementOptions.contrast * 100
                                      ).toFixed(0)}
                                      %
                                    </span>
                                  </div>
                                  <Slider
                                    value={[enhancementOptions.contrast]}
                                    min={0.5}
                                    max={2}
                                    step={0.05}
                                    onValueChange={([value]) =>
                                      handleEnhancementChange("contrast", value)
                                    }
                                  />
                                </div>

                                <div>
                                  <div className="flex justify-between mb-2">
                                    <Label>Saturation</Label>
                                    <span className="text-sm text-muted-foreground">
                                      {(
                                        enhancementOptions.saturation * 100
                                      ).toFixed(0)}
                                      %
                                    </span>
                                  </div>
                                  <Slider
                                    value={[enhancementOptions.saturation]}
                                    min={0}
                                    max={2}
                                    step={0.05}
                                    onValueChange={([value]) =>
                                      handleEnhancementChange(
                                        "saturation",
                                        value,
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            {/* HDR Effect */}
                            <div className="p-4 bg-muted/50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-medium">HDR Effect</h3>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Enhance dynamic range for better highlights
                                    and shadows
                                  </p>
                                </div>
                                <Switch
                                  checked={enhancementOptions.hdr}
                                  onCheckedChange={(checked) => {
                                    handleEnhancementChange("hdr", checked);
                                    if (checked) {
                                      handleEnhancementChange("contrast", 1.2);
                                      handleEnhancementChange(
                                        "saturation",
                                        1.3,
                                      );
                                      handleEnhancementChange(
                                        "brightness",
                                        0.1,
                                      );
                                    }
                                  }}
                                />
                              </div>
                            </div>

                            {/* Process Button */}
                            <div className="space-y-4">
                              <Button
                                onClick={handleEnhance}
                                disabled={isProcessing}
                                className="w-full"
                              >
                                {isProcessing
                                  ? "Processing..."
                                  : "Enhance Video Quality"}
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
                            </div>

                            {error && (
                              <div className="bg-destructive/15 border border-destructive text-destructive p-3 rounded-md">
                                {error}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* What the Tool Does Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                What it Does
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                When you are dealing with dark, blurry, or low-resolution
                footage, you can enhance video quality online free to repair its
                visual fidelity directly in your browser. This application
                bundles an upscaler, noise reducer, and color correction suite
                into a single interface that processes entirely on your local
                machine. Because it does not upload files to complex cloud
                rendering servers, it provides absolute privacy and eliminates
                the long download times typical of large video file
                manipulation.
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
                Establish target quality targets
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                After dragging your video file into the application area, toggle
                the upscaler and select a target resolution such as 1080p or 4K.
                Use the bitrate slider to instruct the local rendering engine
                how much data it is allowed to use per second, keeping in mind
                that high bitrates look cleaner but result in significantly
                larger final files.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Adjust correction filters
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Move through the individual enhancement sliders to correct
                specific flaws occurring in the imported footage. You can pull
                the denoise slider to smooth out ugly film grain, boost the
                sharpness slider to clarify soft edges, or simply click the HDR
                switch to automatically push the contrast and color saturation
                into a more cinematic appearance.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Render the final master
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click the enhancement button to command your hardware to begin
                calculating the new pixel array for every frame of the video.
                Because applying multiple heavy filters requires intense
                processing power, keep your browser tab active until the
                progress indicator hits 100%, and then download the vastly
                improved MP4 straight to your device.
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
                  Modernizing old family home videos
                </h3>
                <p className="text-sm text-muted-foreground">
                  Archivists pulling video clips off dusty DVDs often discover
                  soft, unappealing 480p footage that looks terrible on modern
                  televisions. Using the upscaler to push the resolution to
                  1080p and applying a mild sharpness filter makes old family
                  memories look far more watchable on large screens.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Rescuing dark smartphone night out footage
                </h3>
                <p className="text-sm text-muted-foreground">
                  Mobile phones heavily compress video shot inside dim
                  restaurants, resulting in clips plagued by chunky visual noise
                  and muddy shadows. Pushing the brightness slider up while
                  heavily applying the denoise filter smooths away the harsh
                  camera struggle, revealing the people hidden in the dark.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Punching up dull corporate talking heads
                </h3>
                <p className="text-sm text-muted-foreground">
                  When marketing teams receive poorly lit webcam recordings from
                  executives sitting in flat grey offices, the footage can bore
                  viewers. Enabling the HDR switch alongside a saturation boost
                  injects artificial vibrancy into the corporate presentation,
                  making the speaker look much healthier and engaged.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Overcoming aggressive social media compression
                </h3>
                <p className="text-sm text-muted-foreground">
                  Downloading a viral clip that has been re-uploaded to multiple
                  chaotic social networks often yields a horribly pixelated
                  final file. Pushing the maximum output bitrate high forces the
                  local encoder to smooth over structural artifact gaps,
                  patching together a solid looking file ready for safe
                  republishing.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Preparing basic assets for heavy editing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Video editors receiving rough cell phone clips to place into
                  professional YouTube documentaries must ensure all sources
                  match a baseline visual standard. Upscaling and correcting
                  colors locally ensures the humble stock footage won't
                  completely shatter the production value of the larger project
                  file.
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
                  <h3 className="font-bold text-lg">Target Bitrate</h3>
                  <p className="text-muted-foreground mt-2">
                    Bitrate measures the exact megabit data allowance given to
                    each passing second of your rendered video clip. Keeping the
                    slider around 8Mbps provides excellent web quality, dragging
                    it to 25Mbps provides a flawless raw archival copy, and
                    dragging it to 2Mbps forces aggressive compression to save
                    maximum hard drive space.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Denoise Percentage</h3>
                  <p className="text-muted-foreground mt-2">
                    The denoise tool intelligently blurs chaotic pixels
                    specifically associated with poor sensor lighting without
                    heavily damaging intended details. A value around 30%
                    handles minor smartphone grain, but dragging the slider
                    beyond 70% will cause your actors to look like they are made
                    out of strangely smooth plastic.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Sharpness Percentage</h3>
                  <p className="text-muted-foreground mt-2">
                    The sharpening filter detects stark transitions between
                    light and dark objects in your footage and aggressively
                    hardens the contrast along those dividing lines. Applying a
                    conservative 20% value successfully crisps up a soft focus
                    lens, while setting it to 100% will create an ugly glowing
                    white aura around every single object.
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
