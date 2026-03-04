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
import { Progress } from "@/components/ui/progress";
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Script from "next/script";

const faqData = [
  {
    question: "How do I permanently fix a sideways video without watermarks?",
    answer:
      "Load your video into the tool, select the 90-degree clockwise or counter-clockwise option, and click Rotate Video. The encoder rewrites every frame in the new orientation and produces a standard MP4 file. The rotation is burned into the pixel data, not stored as a metadata tag, so the file plays correctly on every platform. No watermarks are added because all processing happens on your device at no cost.",
  },
  {
    question: "Why did my phone record the video sideways to begin with?",
    answer:
      "Smartphones record video based on the position of the device at the moment you start recording. If the gyroscope detected landscape mode, the video data is stored horizontally. Some phones attach a metadata rotation tag that tells compatible apps to display it upright, but many websites, video editors, and social platforms ignore that tag and play the raw data orientation instead.",
  },
  {
    question:
      "What is the difference between rotating 90 degrees and 270 degrees?",
    answer:
      "Rotating 90 degrees clockwise spins the video one quarter turn to the right. The top edge of the original image becomes the right edge of the output. Rotating 270 degrees clockwise produces the opposite result, which is the same as rotating 90 degrees counter-clockwise. The top edge of the original image becomes the left edge of the output.",
  },
  {
    question: "Does rotating a 1920x1080 video change its file dimensions?",
    answer:
      "Yes. When you rotate a 1920x1080 video by 90 degrees, the output dimensions become 1080x1920 because the width and height swap. The encoder recalculates the pixel grid to fit the new orientation. A 180-degree rotation keeps the same 1920x1080 dimensions because the image flips upside down without swapping the sides.",
  },
  {
    question: "Can this tool flip a video as a mirror image?",
    answer:
      "No. This tool rotates video in 90-degree increments around the center axis. A mirror flip inverts pixels horizontally or vertically, which is a different operation. You would need a video editor that supports horizontal or vertical flip to achieve a mirror image effect.",
  },
  {
    question:
      "Is this rotation permanent or does it only apply during playback?",
    answer:
      "The rotation is permanent. The encoder reads every frame, rotates the pixel grid to the new orientation, and writes the result into a new MP4 file. This is different from apps that add a rotation metadata tag. A metadata tag only works if the player reads and respects it. This tool changes the actual pixel data, so the video displays correctly in every player and platform regardless of metadata support.",
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

export default function RotateVideoPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [rotation, setRotation] = useState<0 | 90 | 180 | 270>(0);
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
      setRotation(0);
    }
  };

  const handleRotationChange = (degrees: 0 | 90 | 180 | 270) => {
    setRotation(degrees);
  };

  const handleRotate = async () => {
    if (!videoFile || rotation === 0) {
      setError("Please select a video and choose a rotation angle");
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
          rotate: rotation,
          allowRotationMetadata: false,
        },
      });

      conversion.onProgress = (progressValue: number) => {
        setProgress(Math.round(progressValue * 100));
      };

      await conversion.execute();

      const rotatedBuffer = output.target.buffer;
      if (!rotatedBuffer) {
        throw new Error("Failed to get rotated video buffer");
      }
      const rotatedBlob = new Blob([rotatedBuffer], { type: "video/mp4" });
      const rotatedUrl = URL.createObjectURL(rotatedBlob);
      setOutputUrl(rotatedUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to rotate video");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `rotated-${rotation}-${videoFile?.name || "video.mp4"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setRotation(0);
    setOutputUrl(null);
    setError(null);
  };

  const rotationOptions = [
    { degrees: 90, label: "90° Clockwise", icon: "↻" },
    { degrees: 180, label: "180°", icon: "↻↻" },
    { degrees: 270, label: "270° Clockwise", icon: "↺" },
    { degrees: 0, label: "Reset", icon: "↶" },
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
      name: "Resize Video Dimensions",
      description: "Scale video to 4K, 1080p, 720p or custom sizes",
      href: "/video-tools/resize-video-dimensions",
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
                Rotate Video Online Free – Fix Sideways and Upside-Down Videos
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Permanently fix video orientation by rotating 90, 180, or 270
                degrees. The rotation is written into the pixel data, not just
                the metadata. Your video will play correctly on every device,
                app, and platform. No uploads, no watermarks, and no software.
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
                <h2 className="text-xl font-bold mb-6">Rotate Video</h2>

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
                          controls
                          className="w-full rounded-md bg-black aspect-video"
                        />

                        {rotation !== 0 && (
                          <div className="mt-4 p-3 bg-muted rounded-md">
                            <p className="text-sm text-muted-foreground">
                              Rotation:{" "}
                              <span className="text-foreground font-medium">
                                {rotation}°
                              </span>
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Rotation Settings */}
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">
                          Rotation Settings
                        </h2>
                        <div className="space-y-4">
                          {/* Rotation Buttons */}
                          <div>
                            <Label className="mb-2 block">
                              Select Rotation Angle
                            </Label>
                            <div className="grid grid-cols-2 gap-2">
                              {rotationOptions.map((option) => (
                                <Button
                                  key={option.degrees}
                                  variant={
                                    rotation === option.degrees
                                      ? "default"
                                      : "outline"
                                  }
                                  onClick={() =>
                                    handleRotationChange(
                                      option.degrees as 0 | 90 | 180 | 270,
                                    )
                                  }
                                  className="flex items-center justify-center gap-2"
                                >
                                  <span className="text-lg">{option.icon}</span>
                                  <span>{option.label}</span>
                                </Button>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-4 pt-4">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                onClick={handleReset}
                                className="flex-1"
                              >
                                Reset
                              </Button>
                              <Button
                                onClick={handleRotate}
                                disabled={isProcessing || rotation === 0}
                                className="flex-1"
                              >
                                {isProcessing
                                  ? "Processing..."
                                  : "Rotate Video"}
                              </Button>
                            </div>

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
                                Download Rotated Video
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

        {/* Why Videos Play Sideways */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                Why Videos Play Sideways (And How This Fixes It)
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Phones and cameras don't always store video in the orientation you see. They record in a fixed orientation and add a metadata tag telling players how to rotate it. The problem: many platforms and editors ignore that tag and play the raw data — which looks sideways.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                This tool doesn't just change the metadata tag. It rotates every single frame's pixel data and writes a new file. The result plays correctly everywhere because the orientation is baked into the actual image, not stored as a hint that players can ignore.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The rotation is permanent. Your original file isn't modified — you get a new MP4 with the corrected orientation.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* When You Need to Rotate Video */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">When This Fixes Your Problem</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Sideways phone recordings</h3>
                <p className="text-sm text-muted-foreground">
                  You started recording in portrait, rotated to landscape, and now the video plays sideways on YouTube. Rotate 90 degrees clockwise. The output fills the player correctly without viewers tilting their heads.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Upside-down action camera footage</h3>
                <p className="text-sm text-muted-foreground">
                  Helmet or handlebar mounts sometimes require upside-down camera placement. The footage looks inverted. Rotate 180 degrees and the scene appears upright.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <h3 className="font-bold mb-2 p-6">Metadata tags that editors ignore</h3>
              <CardContent className="p-6 pt-0">
                <p className="text-sm text-muted-foreground">
                  Premiere Pro and DaVinci Resolve sometimes import phone footage sideways because they ignore rotation metadata. Rotating the file before importing fixes it permanently.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Vertical digital signage</h3>
                <p className="text-sm text-muted-foreground">
                  Retail screens are often mounted vertically. Rotate a 1920x1080 landscape video 90 degrees and it becomes 1080x1920 portrait — perfect for vertical displays.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Standardizing mixed-orientation clips</h3>
                <p className="text-sm text-muted-foreground">
                  Some clips shot horizontal, some vertical. Rotate them all to match before editing. Your timeline stays consistent and you avoid per-clip rotation fixes in your editor.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Rotation Angle Reference */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                Rotation Angles Explained
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Angle</th>
                      <th className="text-left py-3 px-4 font-medium">What It Does</th>
                      <th className="text-left py-3 px-4 font-medium">Output Dimensions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">90° clockwise</td>
                      <td className="py-3 px-4">Rotates right one quarter turn</td>
                      <td className="py-3 px-4">Swaps (1920x1080 → 1080x1920)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">180°</td>
                      <td className="py-3 px-4">Flips upside down</td>
                      <td className="py-3 px-4">Same as input</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">270° clockwise</td>
                      <td className="py-3 px-4">Rotates left one quarter turn (same as 90° counter-clockwise)</td>
                      <td className="py-3 px-4">Swaps (1920x1080 → 1080x1920)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground mt-6 text-sm">
                Not sure which direction? Try 90° first. If it's still wrong, try 270°. The preview shows the result before you download.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Using This Tool */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Rotate Your Video</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="relative font-semibold text-xl">Upload your video</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Select or drag your file. It stays on your device — no server upload. The preview shows the current orientation so you can see what needs fixing.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">Choose rotation angle</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click 90°, 180°, or 270°. For sideways video, start with 90° clockwise. For upside-down footage, use 180°. The preview updates to show the result.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">Rotate and download</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click rotate and wait. Processing time depends on video length. Keep the tab open. When done, preview the result and download the corrected file.
              </p>
            </div>
          </div>
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
