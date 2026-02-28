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
    question: "What does changing the opacity of a video actually do?",
    answer:
      "Opacity controls how transparent the video appears at the pixel level. At 100 percent opacity the video looks fully solid. At 50 percent the video appears translucent, with the background color showing through. At 0 percent the video is completely invisible and you see only the background color. This tool bakes the chosen opacity value directly into each frame of the output file.",
  },
  {
    question:
      "Why does the output file show a solid background color instead of true transparency?",
    answer:
      "Standard MP4 and WebM video formats do not support alpha channel transparency the way PNG images do. Because the format cannot store true transparency, the tool bakes a solid background color behind the semi-transparent video so that the visual result is preserved correctly when the file is played back in any media player.",
  },
  {
    question:
      "What is the best background color to choose for green screen preparation?",
    answer:
      "If you plan to use the output in a compositing application that supports chroma key, set the background color to a solid green (hex #00FF00) or blue (hex #0000FF) that does not appear in the main video content. This gives you a clean keying target in the final footage.",
  },
  {
    question: "Can I use this tool to make a video darker or lighter?",
    answer:
      "Yes, but indirectly. Setting the background to white and reducing opacity mixes white into each pixel, making the video appear brighter. Setting the background to black and reducing opacity makes the video appear darker. However, the Video Color Space Transformation tool gives you more direct control over brightness.",
  },
  {
    question: "Will the audio track be preserved in the output file?",
    answer:
      "Yes. The encoder only processes the video frames. The original audio track is copied into the output file without modification. Volume, timing, and audio quality remain exactly the same as in the source video.",
  },
  {
    question: "Does the output file overwrite my original video?",
    answer:
      "No. The tool generates a new output file in your browser's memory. Your original video file on your device is never modified. You download the output file separately using the Download button.",
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

export default function VideoTransparencyMakerPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"original" | "transparent">(
    "original",
  );

  const [opacity, setOpacity] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [showBackground, setShowBackground] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const transparentVideoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setOutputUrl(null);
      setError(null);
      setPreviewMode("original");
      setOpacity(1);
      setBackgroundColor("#000000");
      setShowBackground(true);
    }
  };

  const handleTransparency = async () => {
    if (!videoFile) {
      setError("Please select a video to process");
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

      let transparencyCanvas: OffscreenCanvas | null = null;
      let transparencyCtx: OffscreenCanvasRenderingContext2D | null = null;

      const conversion = await Conversion.init({
        input,
        output,
        video: {
          process: async (sample) => {
            if (!transparencyCanvas) {
              transparencyCanvas = new OffscreenCanvas(
                sample.displayWidth,
                sample.displayHeight,
              );
              transparencyCtx = transparencyCanvas.getContext("2d");
            }

            if (transparencyCanvas && transparencyCtx) {
              transparencyCtx.clearRect(
                0,
                0,
                transparencyCanvas.width,
                transparencyCanvas.height,
              );

              if (showBackground) {
                transparencyCtx.fillStyle = backgroundColor;
                transparencyCtx.fillRect(
                  0,
                  0,
                  transparencyCanvas.width,
                  transparencyCanvas.height,
                );
              }

              transparencyCtx.globalAlpha = opacity;
              sample.draw(transparencyCtx, 0, 0);
              transparencyCtx.globalAlpha = 1;

              return transparencyCanvas;
            }

            return sample;
          },
        },
      });

      conversion.onProgress = (progressValue: number) => {
        setProgress(Math.round(progressValue * 100));
      };

      await conversion.execute();

      const transparentBuffer = output.target.buffer;
      if (!transparentBuffer) {
        throw new Error("Failed to get transparency video buffer");
      }
      const transparentBlob = new Blob([transparentBuffer], {
        type: "video/mp4",
      });
      const transparentUrl = URL.createObjectURL(transparentBlob);
      setOutputUrl(transparentUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to apply transparency to video",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `transparent-${videoFile?.name || "video.mp4"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setVideoFile(null);
    setVideoUrl(null);
    setOutputUrl(null);
    setError(null);
    setPreviewMode("original");
    setOpacity(1);
    setBackgroundColor("#000000");
    setShowBackground(true);
  };

  const handleResetSettings = () => {
    setOpacity(1);
    setBackgroundColor("#000000");
    setShowBackground(true);
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
      name: "Video Overlays",
      description: "Add watermark or logo to video online",
      href: "/video-tools/video-overlays",
    },
    {
      name: "Video Player",
      description: "Play any video file format instantly",
      href: "/video-tools/video-player",
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
                Video Transparency Maker – Adjust Video Opacity and Background
                Online
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Control the transparency level of your video and blend it over
                any background color. Perfect for creating overlay effects,
                picture-in-picture compositions, and creative visual blending —
                all in your browser.
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
                  Video Transparency Maker
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

                        {/* Preview Mode Toggle */}
                        <div className="mb-4 flex gap-2">
                          <Button
                            variant={
                              previewMode === "original" ? "default" : "outline"
                            }
                            onClick={() => setPreviewMode("original")}
                            className="flex-1"
                          >
                            Original
                          </Button>
                          <Button
                            variant={
                              previewMode === "transparent" && outputUrl
                                ? "default"
                                : "outline"
                            }
                            onClick={() => setPreviewMode("transparent")}
                            className="flex-1"
                            disabled={!outputUrl}
                          >
                            Transparent
                          </Button>
                        </div>

                        {/* Original Video */}
                        {previewMode === "original" && (
                          <div>
                            <video
                              ref={videoRef}
                              src={videoUrl}
                              controls
                              className="w-full rounded-md bg-black aspect-video"
                            />
                            <p className="text-sm text-muted-foreground mt-2 text-center">
                              Original Video
                            </p>
                          </div>
                        )}

                        {/* Transparent Video Preview */}
                        {outputUrl && previewMode === "transparent" && (
                          <div>
                            <video
                              ref={transparentVideoRef}
                              src={outputUrl}
                              controls
                              className="w-full rounded-md bg-black aspect-video"
                            />
                            <p className="text-sm text-muted-foreground mt-2 text-center">
                              Transparent Preview
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Transparency Settings */}
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">
                          Transparency Settings
                        </h2>
                        <div className="space-y-4">
                          {/* Reset Settings Button */}
                          <Button
                            variant="outline"
                            onClick={handleResetSettings}
                            className="w-full"
                          >
                            Reset to Defaults
                          </Button>

                          {/* Opacity Slider */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label>Opacity</Label>
                              <span className="text-sm text-muted-foreground">
                                {opacity.toFixed(2)}
                              </span>
                            </div>
                            <Slider
                              value={[opacity]}
                              min={0}
                              max={1}
                              step={0.05}
                              onValueChange={([value]) => setOpacity(value)}
                            />
                          </div>

                          {/* Background Color Picker */}
                          <div>
                            <Label className="mb-2 block">
                              Background Color
                            </Label>
                            <div className="flex gap-3 items-center">
                              <input
                                type="color"
                                value={backgroundColor}
                                onChange={(e) =>
                                  setBackgroundColor(e.target.value)
                                }
                                className="w-12 h-10 rounded-md cursor-pointer border border-input bg-background"
                              />
                              <input
                                type="text"
                                value={backgroundColor}
                                onChange={(e) =>
                                  setBackgroundColor(e.target.value)
                                }
                                className="flex-1 px-3 py-2 bg-background border border-input rounded-md text-sm font-mono"
                                placeholder="#000000"
                              />
                            </div>
                          </div>

                          {/* Show Background Toggle */}
                          <div>
                            <div className="flex items-center gap-2">
                              <Switch
                                id="show-background"
                                checked={showBackground}
                                onCheckedChange={setShowBackground}
                              />
                              <Label
                                htmlFor="show-background"
                                className="text-sm"
                              >
                                Show Background Preview
                              </Label>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 ml-0">
                              Toggle to preview with/without background color
                            </p>
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
                                onClick={handleTransparency}
                                disabled={isProcessing}
                                className="flex-1"
                              >
                                {isProcessing
                                  ? "Processing..."
                                  : "Apply Transparency"}
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
                              <div className="p-4 bg-muted rounded-md">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-sm font-medium text-green-600 dark:text-green-500">
                                    Conversion Complete
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Your video transparency has been applied
                                  successfully.
                                </p>
                              </div>
                              <Button
                                onClick={handleDownload}
                                className="w-full"
                              >
                                Download Transparent Video
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

        {/* What it Does Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                What it Does
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This tool adjusts the opacity of each video frame and bakes a
                solid background color behind the transparent footage. You set
                the opacity level using the slider, choose a background color,
                and click Apply Transparency. The encoder reads every frame,
                reduces the alpha value of each pixel to the chosen opacity
                level, and composites the result against the background color.
                Because standard MP4 files do not support true transparency, the
                background color fill ensures the output plays correctly in all
                media players. All processing runs locally in your browser.
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
                Upload your video
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click the file picker and select the video you want to process.
                The video loads into the preview area. The file stays on your
                device and is never uploaded to a server.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Set opacity and background color
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Move the Opacity slider to control how transparent the video
                appears. Use the color picker to choose the background color
                that will show behind the semi-transparent video. At full
                opacity the background has no effect on the visual result.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Apply and download
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click Apply Transparency. The encoder processes each frame in
                your browser and shows a progress bar as it works. When it
                finishes, preview the result using the Transparent tab. Click
                Download to save the output file to your drive.
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
                  Creating a fade overlay effect for a film flashback
                </h3>
                <p className="text-sm text-muted-foreground">
                  Indie filmmakers who want a memory or flashback scene to look
                  visually distinct from the main footage can reduce the opacity
                  to 40 to 50 percent and set the background to white. This
                  gives the clip a washed-out, overexposed look that
                  communicates the passage of time without post-production
                  software.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Preparing a VFX element with a solid color background
                </h3>
                <p className="text-sm text-muted-foreground">
                  When testing how a motion graphic or particle effect will
                  composite over a video, setting the background to the target
                  color and reducing the opacity previews how the element will
                  blend. This helps verify edge quality and timing before
                  importing the clip into a compositing application.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Softening a busy background video for a website
                </h3>
                <p className="text-sm text-muted-foreground">
                  A website with a looping background video and text content on
                  top can use a reduced opacity video over a light or dark
                  background to make the text easier to read. The background
                  color fills in the reduced-opacity areas, softening the visual
                  noise from the video.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Adding a visual degradation effect to game UI footage
                </h3>
                <p className="text-sm text-muted-foreground">
                  Game designers creating in-engine cutscenes or UI elements
                  that include corrupted or degraded screens can use reduced
                  opacity over a dark background to simulate aging CRT monitors
                  or low-power display panels with faded output.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Creating a stylized split-tone music video look
                </h3>
                <p className="text-sm text-muted-foreground">
                  Music video directors who want a single-color tint over live
                  footage can set the opacity to around 50 percent, choose a
                  bold background color such as deep red or blue, and export the
                  result. The color blends with the original pixel values to
                  create a stylized tinted look.
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
                  <h3 className="font-bold text-lg">Opacity Slider</h3>
                  <p className="text-muted-foreground mt-2">
                    The Opacity slider sets the global alpha multiplier applied
                    to every pixel in the video. A value of 1.0 leaves the video
                    unchanged. A value of 0.5 makes every pixel 50 percent
                    transparent, allowing the background color to show through
                    equally. A value of 0.0 makes the video completely invisible
                    and the output shows only the background color.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Background Color</h3>
                  <p className="text-muted-foreground mt-2">
                    Because MP4 files cannot hold true transparency, the encoder
                    composites each semi-transparent frame over a solid
                    background color. This color fills the areas where the video
                    would otherwise be transparent. Choosing white produces a
                    washed-out look. Choosing black darkens the footage.
                    Choosing green gives you a keying target for compositing
                    workflows.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    OffscreenCanvas Processing
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Each video frame is decoded and drawn to an OffscreenCanvas
                    at the specified opacity using the Canvas 2D globalAlpha
                    property. The canvas context composites the frame over the
                    chosen background color and returns the resulting pixel data
                    to the encoder. This runs off the main browser thread to
                    keep the page responsive during processing.
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
              Everything you need to know about video transparency
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
