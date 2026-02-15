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

export default function VideoCompressionPage() {
  const relatedTools = [
    {
      name: "Image Compressor",
      description: "Single and bulk image compressor, No Limits",
      href: "/image-tools/image-compressor",
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What's the maximum file size I can compress?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "There's no hard limit imposed by the tool itself. The maximum file size depends entirely on your device's available RAM. Users with 8GB RAM have successfully compressed 4GB+ video files. If you encounter memory issues with very large files, try closing other applications or using a device with more RAM.",
        },
      },
      {
        "@type": "Question",
        name: "Will compression reduce video quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Compression always involves some trade-off between file size and quality. However, with the right bitrate settings, you can significantly reduce file size with minimal visible quality loss. Start with 2-3 Mbps for 1080p videos and adjust based on your needs.",
        },
      },
      {
        "@type": "Question",
        name: "Which format should I choose - MP4 or WebM?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MP4 with H.264 offers the best compatibility across devices and platforms. WebM with VP9 provides better compression efficiency (smaller files at the same quality) but may not play on older devices. Choose MP4 for sharing, WebM for web use or when file size is critical.",
        },
      },
      {
        "@type": "Question",
        name: "How long does compression take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Processing time depends on your video length, selected settings, and device performance. A 10-minute 1080p video typically takes 2-5 minutes on modern laptops. Longer videos or 4K content will take proportionally longer. The progress bar shows real-time completion status.",
        },
      },
      {
        "@type": "Question",
        name: "Does this work on mobile devices?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the compressor works on modern mobile browsers, though performance varies by device. Mobile devices with limited RAM may struggle with very large files. For best results on mobile, compress smaller videos or reduce the resolution settings.",
        },
      },
    ],
  };

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
              <BreadcrumbLink href="/design-tools/favicon-generator">
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

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Features</h2>
        <Card className="p-6">
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <div>
                <h3 className="text-lg font-semibold">
                  Browser-Based Processing
                </h3>
                <p className="text-muted-foreground">
                  Everything runs locally in your browser using WebAssembly
                  technology. Your videos stay private and secure on your
                  device, with no server uploads required.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <div>
                <h3 className="text-lg font-semibold">
                  Flexible Compression Settings
                </h3>
                <p className="text-muted-foreground">
                  Control your output quality with adjustable bitrate settings
                  from 0.1 to 10 Mbps. Choose between MP4 and WebM formats, and
                  select from multiple codecs including VP9, VP8, and H.264 for
                  optimal compatibility.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <div>
                <h3 className="text-lg font-semibold">Real-Time Preview</h3>
                <p className="text-muted-foreground">
                  See your original video before compression and preview the
                  compressed result instantly. Monitor the compression progress
                  with a live progress bar showing exact percentage completion.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <div>
                <h3 className="text-lg font-semibold">
                  Smart File Size Estimation
                </h3>
                <p className="text-muted-foreground">
                  View estimated output file size before compressing based on
                  your selected bitrate and video duration. Compare original and
                  compressed file sizes side-by-side with percentage savings
                  calculated automatically.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <div>
                <h3 className="text-lg font-semibold">Advanced Options</h3>
                <p className="text-muted-foreground">
                  Customize resolution settings to reduce dimensions along with
                  file size. Access codec selection and detailed compression
                  parameters for fine-tuned control over your output video.
                </p>
              </div>
            </li>
          </ul>
        </Card>
      </section>

      {/* How to Use Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">How to Use</h2>
        <Card className="p-6">
          <ol className="space-y-4 list-decimal list-inside">
            <li className="flex items-start ml-4">
              <div className="mr-3">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  1
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Upload Your Video</h3>
                <p className="text-muted-foreground">
                  Upload your video by clicking the upload area or dragging and
                  dropping your file. The tool accepts all common video formats
                  including MP4, MOV, AVI, and WebM. Once uploaded, you'll see
                  the original file size and a preview of your video.
                </p>
              </div>
            </li>
            <li className="flex items-start ml-4">
              <div className="mr-3">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  2
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Adjust Settings</h3>
                <p className="text-muted-foreground">
                  Adjust the compression settings using the bitrate slider.
                  Lower bitrates create smaller files but may reduce quality,
                  while higher bitrates preserve quality with less compression.
                  The tool displays an estimated output file size as you adjust
                  settings to help you find the right balance.
                </p>
              </div>
            </li>
            <li className="flex items-start ml-4">
              <div className="mr-3">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  3
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Compress & Download</h3>
                <p className="text-muted-foreground">
                  For more control, click "Show Advanced Options" to access
                  codec selection and resolution settings. Choose VP9 for best
                  compression efficiency, H.264 for maximum compatibility, or
                  VP8 as a middle ground. Click "Compress Video" to start the
                  process. When complete, preview the compressed video to check
                  the quality, review the file size comparison, and download
                  your optimized video with one click.
                </p>
              </div>
            </li>
          </ol>
        </Card>
      </section>

      {/* Why Choose Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Why Choose This Video Compressor
        </h2>
        <Card className="p-6">
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <div>
                <h3 className="text-lg font-semibold">Complete Privacy</h3>
                <p className="text-muted-foreground">
                  Unlike cloud-based tools, all compression happens in your
                  browser. Your videos never get uploaded to external servers,
                  ensuring complete privacy and security for sensitive or
                  personal content.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <div>
                <h3 className="text-lg font-semibold">
                  No File Size Restrictions
                </h3>
                <p className="text-muted-foreground">
                  There are no artificial file size limits imposed by the tool.
                  You can compress videos as large as your device's memory
                  allows, making it perfect for handling 4K footage, long
                  recordings, or large project files.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <div>
                <h3 className="text-lg font-semibold">Works Offline</h3>
                <p className="text-muted-foreground">
                  Once the page loads, you can compress videos without an
                  internet connection. Perfect for working on flights, in areas
                  with poor connectivity, or when you want to preserve
                  bandwidth.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <div>
                <h3 className="text-lg font-semibold">
                  Free Without Limitations
                </h3>
                <p className="text-muted-foreground">
                  No sign-ups, subscriptions, or hidden fees. Compress unlimited
                  videos without watermarks, time limits, or quality
                  restrictions. All features are available to everyone at no
                  cost.
                </p>
              </div>
            </li>
          </ul>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <Faqs
          faqs={[
            {
              question: "What's the maximum file size I can compress?",
              answer:
                "There's no hard limit imposed by the tool itself. The maximum file size depends entirely on your device's available RAM. Users with 8GB RAM have successfully compressed 4GB+ video files. If you encounter memory issues with very large files, try closing other applications or using a device with more RAM.",
            },
            {
              question: "Will compression reduce video quality?",
              answer:
                "Compression always involves some trade-off between file size and quality. However, with the right bitrate settings, you can significantly reduce file size with minimal visible quality loss. Start with 2-3 Mbps for 1080p videos and adjust based on your needs.",
            },
            {
              question: "Which format should I choose - MP4 or WebM?",
              answer:
                "MP4 with H.264 offers the best compatibility across devices and platforms. WebM with VP9 provides better compression efficiency (smaller files at the same quality) but may not play on older devices. Choose MP4 for sharing, WebM for web use or when file size is critical.",
            },
            {
              question: "How long does compression take?",
              answer:
                "Processing time depends on your video length, selected settings, and device performance. A 10-minute 1080p video typically takes 2-5 minutes on modern laptops. Longer videos or 4K content will take proportionally longer. The progress bar shows real-time completion status.",
            },
            {
              question: "Does this work on mobile devices?",
              answer:
                "Yes, the compressor works on modern mobile browsers, though performance varies by device. Mobile devices with limited RAM may struggle with very large files. For best results on mobile, compress smaller videos or reduce the resolution settings.",
            },
          ]}
        />
      </section>

      <section>
        <ToolLinkCards tools={relatedTools} />
      </section>
    </div>
  );
}
