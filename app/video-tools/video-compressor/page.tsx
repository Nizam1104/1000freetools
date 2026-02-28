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

      {/* What the Tool Does Section */}
      <section className="mb-12">
        <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
          <CardContent className="p-8 sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
              What it Does
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This tool re-encodes your video at a lower bitrate to reduce the
              file size. You set the target bitrate using the slider, and the
              encoder rewrites every frame to fit within that data budget. A
              lower bitrate means a smaller file and some reduction in visual
              detail, particularly in fast-moving scenes. A higher bitrate
              preserves more detail but produces a larger file. The tool also
              lets you change the output codec and resolution, which gives you
              additional control over the final file size. All processing
              happens in your browser so your video data never leaves your
              device.
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
              Upload your video
            </h3>
            <p className="relative mt-2 text-sm text-muted-foreground text-left">
              Click the upload area or drag your MP4, MOV, or WebM file into the
              tool. The original file size is displayed immediately so you have
              a clear baseline before making any changes. The file is read from
              your local drive and never sent to a server.
            </p>
          </div>
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="relative font-semibold text-xl">Set the bitrate</h3>
            <p className="relative mt-2 text-sm text-muted-foreground text-left">
              Move the bitrate slider to choose how much data to allocate per
              second of video. The estimated output file size updates as you
              drag. If you want a smaller file, open the advanced options to
              also change the codec to VP9 or reduce the resolution.
            </p>
          </div>
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="relative font-semibold text-xl">
              Compress and download
            </h3>
            <p className="relative mt-2 text-sm text-muted-foreground text-left">
              Click the Compress button. The tool processes every frame in your
              browser and shows a progress bar as it works. When it finishes,
              the compressed file size and the percentage saved are shown. Click
              the download button to save the output to your drive.
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
                Fitting a video inside an email attachment limit
              </h3>
              <p className="text-sm text-muted-foreground">
                Most email services cap attachments at 10 to 25 MB. A 2-minute
                tutorial recorded at 1080p can produce a file well above that
                limit. Compressing the video to around 2 Mbps reduces a typical
                500 MB file to under 20 MB for a 2-minute clip, which fits
                within the limit while keeping the content clear.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">
                Reducing load time for website background videos
              </h3>
              <p className="text-sm text-muted-foreground">
                A looping background video for a landing page should be well
                under 5 MB to avoid slowing page load on mobile connections.
                Switching to VP9 and reducing the resolution to 720p can reduce
                a 30-second clip from 40 MB down to around 3 to 5 MB while
                keeping the visual quality good enough for background use.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">
                Freeing storage space on a phone
              </h3>
              <p className="text-sm text-muted-foreground">
                A 10-minute 4K video recorded on a phone can be 3 to 5 GB. If
                you want to keep a watchable copy without using that much
                storage, compressing it to 1080p at 4 Mbps reduces the file to
                around 300 MB while keeping the content easy to watch on a
                screen.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">
                Preparing a smaller file for a slow upload connection
              </h3>
              <p className="text-sm text-muted-foreground">
                Uploading a 2 GB raw video over a slow hotel or public Wi-Fi
                connection can take hours. Compressing the file to a draft
                quality at a lower bitrate before uploading can reduce the file
                to a few hundred megabytes, which uploads in minutes and lets
                the recipient review the cut before you send the final version.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">
                Meeting platform upload size limits
              </h3>
              <p className="text-sm text-muted-foreground">
                Discord's free tier limits file uploads to 25 MB. Some Slack
                workspaces cap uploads at 1 GB. Compressing a short clip to fit
                within the specific platform limit means you can share it
                directly in chat without a third-party link or a paid
                subscription.
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
                  Bitrate controls how much data the encoder allocates per
                  second of video, measured in Mbps. Higher bitrates preserve
                  more detail but produce larger files. Lower bitrates produce
                  smaller files but may show visible compression artifacts in
                  fast-moving scenes. For social media sharing, 2 to 4 Mbps at
                  1080p is generally a good starting point. For email
                  attachments, 1 Mbps or lower is often needed.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  Output Format: MP4 vs WebM
                </h3>
                <p className="text-muted-foreground mt-2">
                  MP4 plays on virtually every device, including older phones
                  and TVs. WebM is a browser-optimized container that works well
                  for embedding video on websites but is not supported by all
                  media players. If you are sharing the file with other people
                  on different devices, MP4 is the safer choice. If you are
                  embedding video on a website, WebM with VP9 typically produces
                  a smaller file.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  Codec: H.264 vs VP9 vs VP8
                </h3>
                <p className="text-muted-foreground mt-2">
                  H.264 (avc1) is the most widely compatible codec and plays on
                  essentially all devices made in the last 15 years. VP9 is a
                  more efficient codec that produces smaller files at the same
                  visual quality but requires more time to encode and is not
                  supported by some older media players. VP8 is an older Google
                  codec that is less efficient than VP9 and is rarely the best
                  choice for new files.
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
