"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Download, Upload } from "lucide-react";
import {
  compressVideo,
  CompressionSettings,
} from "@/utils/video-utils/videoCompressor";
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const faqData = [
  {
    question: "How can I compress video online free without watermarks?",
    answer:
      "You can compress video free online using this local browser tool. It immediately crunches your large video files using your own device hardware, allowing you to bypass strict cloud upload server limits and avoid ugly premium watermarks.",
  },
  {
    question: "What exactly does the Bitrate slider actually control?",
    answer:
      "Bitrate dictates how much digital data is allocated to every single second of your video. Pulling the bitrate down aggressively starves the video of data, which drastically shrinks the total file size but eventually causes the footage to look blurry or pixelated.",
  },
  {
    question: "Why does the compression take so long on my older laptop?",
    answer:
      "To reduce video file size, your computer must systematically deconstruct your entire video, recalculate massive amounts of pixel math to create smaller data chunks, and then rebuild the MP4. This heavily taxes your CPU, so older laptops will naturally decode and re-encode frames slower than modern gaming PCs.",
  },
  {
    question: "Is there a maximum Mb file size limit I can upload?",
    answer:
      "Because this application never uploads your files to a distant cloud server, there is no hard cap. However, your local internet browser does have a strict internal RAM limitation, meaning if you try to process an absolutely massive 10GB raw movie file, the browser tab itself might crash.",
  },
  {
    question: "Can anyone else view the private videos I compress here?",
    answer:
      "No. The entire compression sequence executes securely inside the sandboxed environment of your internet browser. Your videos never leave your local hard drive, meaning they are completely invisible to external servers or other users.",
  },
  {
    question: "Which video codec is better for minimizing file size?",
    answer:
      "VP9 generally offers a vastly superior compression ratio, meaning it creates significantly smaller files that look just as good. However, if you are attempting to text the final video to someone with a very old smartphone, selecting H.264 (AVC1) guarantees they will actually be able to play the MP4.",
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

export default function VideoCompressionPage() {
  const relatedTools = [
    {
      name: "Video Metadata Viewer",
      description: "See Video or Audio files metadata",
      href: "/video-tools/video-metadata-viewer",
    },
    {
      name: "Video Player",
      description: "Play any video file format instantly, Supports subtitles",
      href: "/video-tools/video-player",
    },
    {
      name: "Video Format Converter",
      description:
        "Convert between video formats, Supports wide range of video formats",
      href: "/video-tools/video-format-converter",
    },
    {
      name: "Change Video FPS",
      description:
        "Change video frame rate to 24fps, 30fps, 60fps or custom FPS",
      href: "/video-tools/change-video-fps",
    },
    {
      name: "Crop Video",
      description: "Crop videos online - remove unwanted edges and reframe",
      href: "/video-tools/crop-video",
    },
    {
      name: "Enhance Video Quality",
      description: "Upscale, sharpen, denoise and improve video quality",
      href: "/video-tools/enhance-video-quality",
    },
    {
      name: "Extract Audio from Video",
      description: "Extract audio from video files - save as MP3, AAC, or WAV",
      href: "/video-tools/extract-audio-from-video",
    },
    {
      name: "Resize Video Dimensions",
      description: "Resize video to 4K, 1080p, 720p or custom dimensions",
      href: "/video-tools/resize-video-dimensions",
    },
    {
      name: "Rotate Video",
      description: "Rotate videos 90°, 180° or 270° - fix orientation",
      href: "/video-tools/rotate-video",
    },
    {
      name: "Video Color Space Transformation",
      description: "Adjust brightness, contrast, saturation, hue and more",
      href: "/video-tools/video-color-space-transformation",
    },
    {
      name: "Video Grayscale",
      description: "Convert videos to black and white instantly",
      href: "/video-tools/video-grayscale",
    },
    {
      name: "Video Overlays",
      description: "Add watermarks, logos or image overlays to videos",
      href: "/video-tools/video-overlays",
    },
    {
      name: "Video Transparency Maker",
      description:
        "Adjust video opacity and transparency with custom background",
      href: "/video-tools/video-transparency-maker",
    },
  ];
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedFileSize, setCompressedFileSize] = useState<number | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null); // Duration in seconds
  const originalVideoUrl = useRef<string | null>(null);

  // Compression settings
  const [compressionSettings, setCompressionSettings] =
    useState<CompressionSettings>({
      width: 1280,
      height: 720,
      bitrate: 2000000, // 2 Mbps
      codec: "vp9", // Default to VP9
      format: "mp4", // Default to MP4
    });
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Clean up object URLs when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (originalVideoUrl.current) {
        URL.revokeObjectURL(originalVideoUrl.current);
      }
      if (compressedUrl) {
        URL.revokeObjectURL(compressedUrl);
      }
    };
  }, [compressedUrl]);

  // Handle original video URL and reset compression results when selectedFile changes
  useEffect(() => {
    if (originalVideoUrl.current) {
      URL.revokeObjectURL(originalVideoUrl.current);
      originalVideoUrl.current = null;
    }

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      originalVideoUrl.current = url;

      // Get video duration
      const video = document.createElement("video");
      video.src = url;
      video.onloadedmetadata = () => {
        setVideoDuration(video.duration);
      };
    }

    // Reset compression results when file changes
    setCompressedUrl(null);
    setCompressedFileSize(null);

    return () => {
      if (originalVideoUrl.current) {
        URL.revokeObjectURL(originalVideoUrl.current);
        originalVideoUrl.current = null;
      }
    };
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      setError(null);
    } else {
      setError("Please select a valid video file");
    }
  };

  const handleSettingChange = (
    field: keyof CompressionSettings,
    value: string | number,
  ) => {
    setCompressionSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Calculate the approximate output size based on bitrate and duration
  const calculateApproximateSize = (): string => {
    if (!videoDuration || videoDuration <= 0) {
      return "Calculate after loading video";
    }

    // Bitrate is in bits per second, duration is in seconds
    // Total bits = bitrate * duration
    // Convert to MB: (bits * seconds) / 8 bits per byte / 1024^2 bytes per MB
    const totalBits = compressionSettings.bitrate * videoDuration;
    const sizeInMB = totalBits / 8 / (1024 * 1024);

    return `${sizeInMB.toFixed(2)} MB`;
  };

  const handleCompress = async () => {
    if (!selectedFile) {
      setError("Please select a video file first");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const url = await compressVideo(
        selectedFile,
        compressionSettings,
        (progressValue: number) => {
          setProgress(progressValue);
        },
      );

      // Get the size of the compressed file
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        setCompressedFileSize(blob.size);
      } catch (sizeErr) {
        console.error("Could not determine compressed file size:", sizeErr);
        setCompressedFileSize(null);
      }

      setCompressedUrl(url);
    } catch (err) {
      console.error("Compression error:", err);
      setError(
        `Compression failed: ${(err as Error).message || "Unknown error"}`,
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (compressedUrl) {
      const a = document.createElement("a");
      a.href = compressedUrl;
      a.download = `compressed_video.${compressionSettings.format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const faqJsonLd = faqSchema;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl 2xl:max-w-5xl">
      <div className="mb-2 sm:mb-4 md:mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/video-tools">Video Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/video-tools/video-compressor">
                Video Compressor
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">
          Video Compressor - Reduce Video File Size Online Free
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Free online video compressor to reduce file size without losing
          quality. Compress MP4, WebM videos instantly in your browser. No
          upload limits, works offline.
        </p>
      </div>

      <Card className="w-full mb-12 max">
        <CardContent className="space-y-6">
          {/* File Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="video-upload">Select Video File</Label>
            <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-input rounded-lg p-4 transition-colors hover:border-accent">
              <Upload className="h-8 w-8 text-muted-foreground mb-1" />
              <Input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                disabled={isProcessing}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Label
                htmlFor="video-upload"
                className="cursor-pointer text-center w-full py-2"
              >
                <span className="text-muted-foreground text-sm">
                  {selectedFile
                    ? `Selected: ${selectedFile.name}`
                    : "Click to upload a video file or drag and drop"}
                </span>
              </Label>
            </div>
            {selectedFile && (
              <div className="text-sm text-muted-foreground mt-2">
                Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Main Content Area */}
          {selectedFile && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Settings Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Compression Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Output Format</Label>
                    <Select
                      value={compressionSettings.format}
                      onValueChange={(value) =>
                        handleSettingChange("format", value)
                      }
                      disabled={isProcessing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="webm">WebM</SelectItem>
                        <SelectItem value="mp4">MP4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>
                        Bitrate:{" "}
                        {(compressionSettings.bitrate / 1000000).toFixed(2)}{" "}
                        Mbps
                      </Label>
                      <span className="text-sm font-mono">
                        ~{calculateApproximateSize()} estimated
                      </span>
                    </div>
                    <Slider
                      min={100000}
                      max={10000000}
                      step={100000}
                      value={[compressionSettings.bitrate]}
                      onValueChange={(value) =>
                        handleSettingChange("bitrate", value[0])
                      }
                      disabled={isProcessing}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground italic">
                      Low bitrate → low quality video, high compression
                    </p>
                    <p className="text-xs text-muted-foreground italic">
                      High bitrate → high quality video, less compression
                    </p>
                  </div>

                  {/* Advanced Options Toggle */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        setShowAdvancedOptions(!showAdvancedOptions)
                      }
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      {showAdvancedOptions
                        ? "Hide Advanced Options"
                        : "Show Advanced Options"}
                    </button>
                  </div>

                  {/* Advanced Options */}
                  {showAdvancedOptions && (
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <div className="space-y-2">
                        <Label>Video Codec</Label>
                        <Select
                          value={compressionSettings.codec}
                          onValueChange={(value) =>
                            handleSettingChange("codec", value)
                          }
                          disabled={isProcessing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vp9">VP9</SelectItem>
                            <SelectItem value="vp8">VP8</SelectItem>
                            <SelectItem value="avc1">H.264</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>
                          Resolution: {compressionSettings.width} x{" "}
                          {compressionSettings.height}
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label className="text-xs">Width</Label>
                            <Input
                              type="number"
                              value={compressionSettings.width}
                              onChange={(e) =>
                                handleSettingChange(
                                  "width",
                                  Number(e.target.value),
                                )
                              }
                              disabled={isProcessing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Height</Label>
                            <Input
                              type="number"
                              value={compressionSettings.height}
                              onChange={(e) =>
                                handleSettingChange(
                                  "height",
                                  Number(e.target.value),
                                )
                              }
                              disabled={isProcessing}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Preview Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedFile && originalVideoUrl.current && (
                    <div className="space-y-4">
                      <video
                        src={originalVideoUrl.current}
                        controls
                        className="w-full h-auto rounded-md bg-muted"
                      />
                      <p className="text-sm text-muted-foreground text-center">
                        Original video preview
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Compress Button */}
          <div className="flex flex-col items-center space-y-4">
            <Button
              onClick={handleCompress}
              disabled={!selectedFile || isProcessing}
              className="w-full max-w-xs"
            >
              {isProcessing ? "Compressing..." : "Compress Video"}
            </Button>

            {/* Progress Bar */}
            {isProcessing && (
              <div className="w-full max-w-md space-y-2">
                <Progress value={progress} className="w-full" />
                <div className="text-center text-sm text-muted-foreground">
                  {Math.round(progress)}% complete
                </div>
              </div>
            )}
          </div>

          {/* Result Display */}
          {compressedUrl && !isProcessing && (
            <div className="space-y-4">
              <video
                src={compressedUrl}
                controls
                className="w-full h-auto rounded-md bg-muted"
              />
              {/* File Size Information */}
              <div className="bg-gray-50 p-3 rounded-md border">
                <h3 className="font-medium text-sm mb-2">
                  File Size Information
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  {/* Original */}
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Original</p>
                    <p className="text-sm font-semibold">
                      {selectedFile
                        ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
                        : "N/A"}
                    </p>
                  </div>

                  {/* Compressed */}
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Compressed</p>
                    <p className="text-sm font-semibold text-green-600">
                      {compressedFileSize !== null
                        ? `${(compressedFileSize / (1024 * 1024)).toFixed(2)} MB`
                        : "…"}
                    </p>
                  </div>

                  {/* Savings */}
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Savings</p>
                    <p className="text-sm font-semibold text-blue-600">
                      {selectedFile && compressedFileSize !== null
                        ? `${(
                            (1 - compressedFileSize / selectedFile.size) *
                            100
                          ).toFixed(1)}%`
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {selectedFile && compressedFileSize !== null && (
                  <p className="mt-2 text-xs text-center text-muted-foreground">
                    Reduced by{" "}
                    <span className="font-medium">
                      {(
                        (selectedFile.size - compressedFileSize) /
                        (1024 * 1024)
                      ).toFixed(2)}{" "}
                      MB
                    </span>
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <Button onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Compressed Video
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* What the Tool Does Section */}
      <section className="mb-12">
        <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
          <CardContent className="p-8 sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
              What it Does
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When a bloated 4K video file refuses to attach to an email due to
              strict data limits, you can easily compress video online free.
              This browser application physically crushes heavy, unoptimized
              video segments into a sleek, streamlined MP4 format to
              dramatically reduce video file size. It operates completely
              locally on your hardware, completely bypassing web upload speed
              bottlenecks so you never have to sit watching a progress bar
              painfully upload a massive 5GB file to an unfamiliar cloud server.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* How to Use Section */}
      <section className="mb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">How to Use</h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="relative font-semibold text-xl">
              Deposit your heavy footage
            </h3>
            <p className="relative mt-2 text-sm text-muted-foreground text-left">
              Drop the gigantic MP4, MOV, or WEBM file directly onto the
              dashboard to load it into your local memory. The tool immediately
              scans the structural metadata to reveal the original file size,
              providing a clear starting point so you understand exactly how
              much heavy data needs to be stripped out.
            </p>
          </div>
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="relative font-semibold text-xl">
              Starve the bitrate slider
            </h3>
            <p className="relative mt-2 text-sm text-muted-foreground text-left">
              Drag the bitrate controller downwards to drastically slash the
              amount of data fed to the video output. The live estimator will
              predict exactly how tiny your final file will be. For maximum
              crushing power, expand the advanced options to select the VP9
              format and manually shrink the rigid pixel dimensions.
            </p>
          </div>
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="relative font-semibold text-xl">
              Execute local compression
            </h3>
            <p className="relative mt-2 text-sm text-muted-foreground text-left">
              Hit the compress button to force your processor to break the heavy
              video down and re-wrap it tightly. Stay anchored to the browser
              tab until the progress hits 100%, review the final calculated
              percentage of data saved, and download your remarkably compact new
              file to your drive.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Use Cases</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">
                Bypassing email attachment blocks
              </h3>
              <p className="text-sm text-muted-foreground">
                Office workers frantically trying to send a vital 500MB software
                tutorial to a remote client will predictably bounce off a rigid
                25MB email server restriction. Slashing the bitrate down
                entirely crushes the heavy HD data into a messy but totally
                passable 20MB file that securely slides through the strictest
                firewalls.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">
                Optimizing website hero banners
              </h3>
              <p className="text-sm text-muted-foreground">
                Web designers embedding a gorgeous looping video banner often
                accidentally cripple loading speeds for mobile users. Swapping
                to the VP9 codec and aggressively downsizing the resolution to
                720p drastically reduces the web payload, guaranteeing the heavy
                background plays instantly without buffer freezing.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">
                Clearing overflowing smartphone storage
              </h3>
              <p className="text-sm text-muted-foreground">
                Parents documenting entire piano recitals in 4K frequently
                trigger critical "Phone Storage Full" errors mid-performance.
                Passing old, monolithic recordings through the compressor
                effectively shrinks their data footprint by 80%, instantly
                reclaiming gigabytes of precious hard drive space without
                entirely deleting the memories.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">
                Speeding up unstable cloud uploads
              </h3>
              <p className="text-sm text-muted-foreground">
                Freelance videographers trapped at a cheap hotel with a
                painfully slow Wi-Fi connection cannot afford to spend eight
                hours uploading raw footage. Brutally compressing the daily
                review dailies down into a lightweight MP4 effectively
                guarantees they can successfully upload the draft within 15
                minutes.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">
                Circumventing Discord Nitro limits
              </h3>
              <p className="text-sm text-muted-foreground">
                Gamers attempting to drop a massive 45-minute multiplayer
                victory recording into a Discord chat instantly face the
                infamous free-tier upload block. Dialing down the bitrate and
                switching the audio format brutally forces the sprawling
                gameplay video nicely under the limit, saving them from paying a
                monthly premium subscription.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Settings Explained Section */}
      <section className="mb-12">
        <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
          <CardContent className="p-8 sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
              Settings Explained
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg">Target Bitrate</h3>
                <p className="text-muted-foreground mt-2">
                  Bitrate is the lifeblood of your video quality, dictating the
                  total mega-bits of visual data permitted per second. If you
                  slash the bitrate down to a tiny number, the encoder becomes
                  starved for data and is forced to blend pixels together,
                  destroying crisp details to successfully create a very small
                  file size.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Format (MP4 vs. WEBM)</h3>
                <p className="text-muted-foreground mt-2">
                  This dictates the rigid digital wrapper holding your footage.
                  MP4 is universally accepted, ensuring your compressed file
                  will flawlessly play on an ancient iPhone or an old
                  television. Conversely, WEBM is highly specialized for modern
                  internet browsers, often producing smaller file loops but
                  frequently failing to play on basic desktop media software.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Advanced Codec Selection</h3>
                <p className="text-muted-foreground mt-2">
                  The codec instructs the processor exactly how to demolish and
                  mathematically repack the pixels. H.264 is the incredibly
                  reliable industry standard that simply works everywhere. VP9
                  acts as a remarkably powerful modern algorithm that can
                  squeeze details tighter and smaller than H.264, but requires
                  significantly more processing power to encode.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQs Section */}
      <section className="mb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>
        <Faqs faqs={faqData} />
      </section>

      <section>
        <ToolLinkCards tools={relatedTools} />
      </section>
    </div>
  );
}
