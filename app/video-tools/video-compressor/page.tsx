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
    question: "How can I compress a video online for free without watermarks?",
    answer:
      "Open the tool, upload your video, set a lower bitrate using the slider, and click Compress. The tool runs entirely in your browser using your own device hardware. There are no watermarks, no account required, and the file never leaves your device.",
  },
  {
    question: "What does the bitrate slider control?",
    answer:
      "Bitrate is the amount of data used per second of video, measured in megabits per second (Mbps). Reducing the bitrate lowers the file size. At very low bitrates, the encoder starts merging nearby pixel values, which causes visible blockiness or blurring in fast-moving scenes. For web sharing, a bitrate between 1 and 4 Mbps is usually a good balance.",
  },
  {
    question: "Why does compression take a long time on my computer?",
    answer:
      "Compression requires your device to decode every frame of the original video and then re-encode it at the new bitrate. This is CPU-intensive work. Older processors take longer than newer ones. Closing other applications during compression gives your processor more resources to work with and can reduce the time significantly.",
  },
  {
    question: "Is there a maximum file size I can compress?",
    answer:
      "There is no server-side file size limit because the tool runs entirely in your browser. The practical limit is your device's available RAM. A standard laptop can typically handle files up to several gigabytes. Very large files, such as raw 4K footage above 10GB, may cause the browser tab to run out of memory before finishing.",
  },
  {
    question: "Can anyone else see the videos I compress with this tool?",
    answer:
      "No. The file is read from your local drive and processed inside your browser's memory. It is never uploaded to a server. No third party, including us, has access to your video at any point during or after compression.",
  },
  {
    question: "Which codec produces smaller files: VP9 or H.264?",
    answer:
      "VP9 generally produces smaller files at the same visual quality compared to H.264, because it uses a more efficient compression algorithm. However, H.264 plays on a wider range of devices, including older phones and TVs. If your target device supports VP9, use it for a smaller file. If you are unsure, H.264 is the safer choice.",
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
          Compress Video Online Free — Reduce File Size Without Uploading
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Reduce your video file size directly in your browser. Set a target
          bitrate, choose a codec, and download the compressed file. No uploads,
          no watermarks, and no account required.
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

      {/* What Compression Does */}
      <section className="mb-12">
        <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
          <CardContent className="p-8 sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
              What Compression Does (And What It Costs)
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Compression reduces file size by lowering the bitrate — the amount of data used per second of video. Lower bitrate = smaller file = some quality loss. That's the trade-off. There's no way around it.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The encoder rewrites every frame to fit within your chosen data budget. At moderate compression (4-6 Mbps for 1080p), most people won't notice much difference. At aggressive compression (1-2 Mbps), fast motion gets blocky and colors band. But the file is tiny.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This tool runs locally in your browser. No upload means faster processing and complete privacy. A 100 MB video might compress to 20-30 MB depending on your settings.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* When Compression Helps */}
      <section className="mb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">When You Need This</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Email attachments</h3>
              <p className="text-sm text-muted-foreground">
                Email caps attachments at 10-25 MB. A 2-minute 1080p video can be 500 MB+. Compress to 1-2 Mbps and that same video fits under 20 MB. Quality drops but it's shareable via email.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Website background videos</h3>
              <p className="text-sm text-muted-foreground">
                Landing page backgrounds should be under 5 MB for fast loading. Compress a 30-second clip to VP9 at 720p and you get 3-5 MB. Good enough for background use, loads fast on mobile.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Freeing phone storage</h3>
              <p className="text-sm text-muted-foreground">
                4K phone videos eat storage — 3-5 GB for 10 minutes. Compress to 1080p at 4 Mbps and you get ~300 MB. Still watchable, way less space. Keep the compressed version, delete the original.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Slow upload connections</h3>
              <p className="text-sm text-muted-foreground">
                Hotel Wi-Fi uploading 2 GB takes forever. Compress to draft quality (1-2 Mbps) first — file drops to a few hundred MB. Uploads in minutes. Send the full quality version later if needed.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Platform upload limits</h3>
              <p className="text-sm text-muted-foreground">
                Discord free tier: 25 MB limit. Some Slack workspaces: 1 GB. Compress your clip to fit the platform's cap. Share directly in chat instead of using cloud links.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Compression Settings Reference */}
      <section className="mb-12">
        <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
          <CardContent className="p-8 sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
              Settings That Affect File Size
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg">Bitrate (Most Important)</h3>
                <p className="text-muted-foreground mt-2">
                  Bitrate controls data per second of video. Higher = better quality, larger file. Lower = worse quality, smaller file.
                </p>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/50 rounded-lg text-sm">
                    <strong className="text-foreground">1 Mbps</strong> — Small files, visible artifacts. Good for email, previews.
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-sm">
                    <strong className="text-foreground">2-4 Mbps</strong> — Good web quality. YouTube, social media.
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-sm">
                    <strong className="text-foreground">5-8 Mbps</strong> — High quality 1080p. Minimal visible loss.
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-sm">
                    <strong className="text-foreground">10+ Mbps</strong> — Near-original quality. Large files.
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Codec: H.264 vs VP9</h3>
                <p className="text-muted-foreground mt-2">
                  H.264 plays everywhere — phones, TVs, old computers. VP9 produces ~30% smaller files at the same quality but doesn't play on some older devices. Use H.264 for sharing, VP9 for web embedding.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Resolution</h3>
                <p className="text-muted-foreground mt-2">
                  Halving resolution (4K to 1080p, or 1080p to 720p) cuts file size significantly. 720p looks fine on phones and small screens. 4K is overkill for most uses anyway.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Format: MP4 vs WebM</h3>
                <p className="text-muted-foreground mt-2">
                  MP4 = universal compatibility. WebM = smaller files, browser-optimized. If you're embedding on a website, WebM. If you're sending to people, MP4.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Using This Tool */}
      <section className="mb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">How to Compress Video</h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="relative font-semibold text-xl">Upload your video</h3>
            <p className="relative mt-2 text-sm text-muted-foreground text-left">
              Drag or select your file. It stays on your device — no server upload. You'll see the original file size immediately.
            </p>
          </div>
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="relative font-semibold text-xl">Set compression level</h3>
            <p className="relative mt-2 text-sm text-muted-foreground text-left">
              Drag the bitrate slider. The estimated output size updates as you move it. For smaller files, open Advanced Options and switch to VP9 or reduce resolution.
            </p>
          </div>
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="relative font-semibold text-xl">Compress and download</h3>
            <p className="relative mt-2 text-sm text-muted-foreground text-left">
              Click Compress and wait. Processing time depends on video length. When done, you'll see the new file size and savings percentage. Download if satisfied.
            </p>
          </div>
        </div>
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
