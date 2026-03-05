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
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Script from "next/script";

const faqData = [
  {
    question:
      "Do I need video editing software to fix the brightness or colors in my video?",
    answer:
      "No. You can adjust brightness, contrast, saturation, hue, sepia, and invert directly in your browser using the sliders on this page. Set your values, click Apply Transform, and the encoder rewrites every frame with the new color data. Download the result when the progress bar finishes. No software download or login required.",
  },
  {
    question: "What does the Hue Rotate slider actually do?",
    answer:
      "Hue Rotate shifts every color in the video along the 360-degree color wheel by the number of degrees you set. At 180 degrees, every color flips to its direct complement: red becomes cyan, green becomes magenta, and blue becomes orange. Lower values create subtle color shifts. This is useful for creative effects or for correcting footage with a strong color cast that other adjustments cannot fix.",
  },
  {
    question: "How do I make my video look like vintage film?",
    answer:
      "Set the Sepia slider to around 0.8 to add warm brownish tones to the entire frame. Reduce Contrast to 0.85 to flatten the shadows slightly and reduce Saturation to 0.7 to pull out the vivid colors. These three adjustments together simulate the faded, warm look of old photographic film stock.",
  },
  {
    question: "Will pushing the Brightness slider to maximum damage my video?",
    answer:
      "At values above 1.5 or 2.0, the encoder pushes pixel luminance past the maximum white point. Highlights clip to solid white and lose all detail. Increasing brightness past what your source footage supports creates these blown-out regions, so use the slider gradually. A value of 1.1 or 1.2 is usually enough to lift a dark clip without losing highlight data.",
  },
  {
    question: "Why does the Transformed preview look the same as the Original?",
    answer:
      "The Transformed preview only becomes available after you click Apply Transform and the progress bar reaches 100%. The encoder must process and write the entire new video before the preview file exists. Once processing finishes, click the Transformed button in the preview panel to see the result.",
  },
  {
    question: "Are the color changes permanently saved into the video file?",
    answer:
      "Yes. The encoder rewrites the color math for every pixel in every frame and outputs a new MP4. This is not a filter layer that can be toggled off. The color values are baked into the output file, so the changes persist on every platform, in every player, and through any further editing or uploading.",
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

export default function VideoColorSpaceTransformationPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"original" | "transformed">(
    "original",
  );

  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [hueRotate, setHueRotate] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [invert, setInvert] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const transformedVideoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setOutputUrl(null);
      setError(null);
      setPreviewMode("original");
      setBrightness(1);
      setContrast(1);
      setSaturation(1);
      setHueRotate(0);
      setSepia(0);
      setInvert(0);
    }
  };

  const handleTransform = async () => {
    if (!videoFile) {
      setError("Please select a video to transform");
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

      let transformCanvas: OffscreenCanvas | null = null;
      let transformCtx: OffscreenCanvasRenderingContext2D | null = null;

      const conversion = await Conversion.init({
        input,
        output,
        video: {
          process: async (sample) => {
            if (!transformCanvas) {
              transformCanvas = new OffscreenCanvas(
                sample.displayWidth,
                sample.displayHeight,
              );
              transformCtx = transformCanvas.getContext("2d");
            }

            if (transformCanvas && transformCtx) {
              const filter = `
                brightness(${brightness})
                contrast(${contrast})
                saturate(${saturation})
                hue-rotate(${hueRotate}deg)
                sepia(${sepia})
                invert(${invert})
              `.trim();

              transformCtx.filter = filter;
              sample.draw(transformCtx, 0, 0);
              return transformCanvas;
            }

            return sample;
          },
        },
      });

      conversion.onProgress = (progressValue: number) => {
        setProgress(Math.round(progressValue * 100));
      };

      await conversion.execute();

      const transformedBuffer = output.target.buffer;
      if (!transformedBuffer) {
        throw new Error("Failed to get transformed video buffer");
      }
      const transformedBlob = new Blob([transformedBuffer], {
        type: "video/mp4",
      });
      const transformedUrl = URL.createObjectURL(transformedBlob);
      setOutputUrl(transformedUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to transform video colors",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `color-transformed-${videoFile?.name || "video.mp4"}`;
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
    setBrightness(1);
    setContrast(1);
    setSaturation(1);
    setHueRotate(0);
    setSepia(0);
    setInvert(0);
  };

  const handleResetSettings = () => {
    setBrightness(1);
    setContrast(1);
    setSaturation(1);
    setHueRotate(0);
    setSepia(0);
    setInvert(0);
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
                Adjust Video Colors Online Free – Brightness, Contrast and More
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Fix dark footage, boost flat colors, add a sepia tone, or shift
                hue across the spectrum. Six precision sliders let you control
                brightness, contrast, saturation, hue, sepia, and invert. All
                changes are permanently encoded into the output MP4 in your
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
                  Video Color Space Transformer
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
                              previewMode === "transformed" && outputUrl
                                ? "default"
                                : "outline"
                            }
                            onClick={() => setPreviewMode("transformed")}
                            className="flex-1"
                            disabled={!outputUrl}
                          >
                            Transformed
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

                        {/* Transformed Video Preview */}
                        {outputUrl && previewMode === "transformed" && (
                          <div>
                            <video
                              ref={transformedVideoRef}
                              src={outputUrl}
                              controls
                              className="w-full rounded-md bg-black aspect-video"
                            />
                            <p className="text-sm text-muted-foreground mt-2 text-center">
                              Transformed Preview
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Color Transformation Settings */}
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">
                          Color Settings
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

                          {/* Brightness */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label>Brightness</Label>
                              <span className="text-sm text-muted-foreground">
                                {brightness.toFixed(2)}
                              </span>
                            </div>
                            <Slider
                              value={[brightness]}
                              min={0}
                              max={2}
                              step={0.05}
                              onValueChange={([value]) => setBrightness(value)}
                            />
                          </div>

                          {/* Contrast */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label>Contrast</Label>
                              <span className="text-sm text-muted-foreground">
                                {contrast.toFixed(2)}
                              </span>
                            </div>
                            <Slider
                              value={[contrast]}
                              min={0}
                              max={2}
                              step={0.05}
                              onValueChange={([value]) => setContrast(value)}
                            />
                          </div>

                          {/* Saturation */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label>Saturation</Label>
                              <span className="text-sm text-muted-foreground">
                                {saturation.toFixed(2)}
                              </span>
                            </div>
                            <Slider
                              value={[saturation]}
                              min={0}
                              max={2}
                              step={0.05}
                              onValueChange={([value]) => setSaturation(value)}
                            />
                          </div>

                          {/* Hue Rotate */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label>Hue Rotate</Label>
                              <span className="text-sm text-muted-foreground">
                                {hueRotate}°
                              </span>
                            </div>
                            <Slider
                              value={[hueRotate]}
                              min={0}
                              max={360}
                              step={1}
                              onValueChange={([value]) => setHueRotate(value)}
                            />
                          </div>

                          {/* Sepia */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label>Sepia</Label>
                              <span className="text-sm text-muted-foreground">
                                {sepia.toFixed(2)}
                              </span>
                            </div>
                            <Slider
                              value={[sepia]}
                              min={0}
                              max={1}
                              step={0.05}
                              onValueChange={([value]) => setSepia(value)}
                            />
                          </div>

                          {/* Invert */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label>Invert</Label>
                              <span className="text-sm text-muted-foreground">
                                {invert.toFixed(2)}
                              </span>
                            </div>
                            <Slider
                              value={[invert]}
                              min={0}
                              max={1}
                              step={0.05}
                              onValueChange={([value]) => setInvert(value)}
                            />
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
                                onClick={handleTransform}
                                disabled={isProcessing}
                                className="flex-1"
                              >
                                {isProcessing
                                  ? "Processing..."
                                  : "Apply Transform"}
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
                                  Your video has been successfully transformed.
                                </p>
                              </div>
                              <Button
                                onClick={handleDownload}
                                className="w-full"
                              >
                                Download Transformed Video
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

        {/* What Color Adjustment Can Fix */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                What Color Adjustment Can (And Can't) Fix
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Color adjustments change the luminance and hue values of every pixel. Brightness lifts or darkens the whole image. Contrast spreads tones apart for more punch. Saturation makes colors more or less intense. Hue rotate shifts all colors around the spectrum wheel.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                What this won't do: fix severe white balance errors or recover detail from completely blown highlights or crushed blacks. If the camera recorded pure white or pure black, there's no data to recover. But for footage that's slightly off — too dark, too flat, wrong color temperature — these adjustments can get you close.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This isn't professional color grading. It's quick correction for videos that need to look better without learning DaVinci Resolve.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* When Color Correction Helps */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">When This Helps</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Dark footage from backlit scenes</h3>
                <p className="text-sm text-muted-foreground">
                  Someone recorded in front of a window and their face is a shadow. Brightness at 1.2-1.4 lifts the subject. Contrast at 1.1 keeps it from looking washed out. Not perfect, but watchable.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Flat, gray-looking video</h3>
                <p className="text-sm text-muted-foreground">
                  Cloudy day recording or log profile footage looks dull. Contrast at 1.15-1.25 and Saturation at 1.2-1.3 add punch and color. Instant improvement for otherwise boring footage.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Vintage or sepia effect</h3>
                <p className="text-sm text-muted-foreground">
                  Sepia at 0.7-0.9 adds warm brown tones. Drop Saturation to 0.5-0.6 and you get that aged film look. Works for historical content or stylized social media posts.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Matching cameras with different color</h3>
                <p className="text-sm text-muted-foreground">
                  One camera runs warm, another runs cool. Adjust the warmer one's Saturation down and tweak Brightness until they match. Not frame-accurate grading, but good enough for most edits.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Creative color effects</h3>
                <p className="text-sm text-muted-foreground">
                  Hue Rotate at 180° flips all colors to their opposites — weird psychedelic look. Invert at 1.0 creates a negative film effect. Useful for music videos, horror cuts, or experimental work.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Color Adjustment Quick Reference */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                What Each Slider Does
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-bold mb-2">Brightness</h3>
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">1.0</strong> = Normal<br/>
                      <strong className="text-foreground">&gt;1.0</strong> = Lighter (1.5 = very bright)<br/>
                      <strong className="text-foreground">&lt;1.0</strong> = Darker (0.5 = very dark)<br/>
                      Use when: footage is too dark or too bright
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-bold mb-2">Contrast</h3>
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">1.0</strong> = Normal<br/>
                      <strong className="text-foreground">&gt;1.0</strong> = More punch (1.3 = high contrast)<br/>
                      <strong className="text-foreground">&lt;1.0</strong> = Flatter (0.7 = muted)<br/>
                      Use when: image looks flat or needs more definition
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-bold mb-2">Saturation</h3>
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">1.0</strong> = Normal<br/>
                      <strong className="text-foreground">&gt;1.0</strong> = More vivid (1.5 = very colorful)<br/>
                      <strong className="text-foreground">0.0</strong> = Black and white<br/>
                      Use when: colors look washed out or too intense
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-bold mb-2">Hue Rotate</h3>
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">0°</strong> = Normal<br/>
                      <strong className="text-foreground">180°</strong> = All colors inverted<br/>
                      <strong className="text-foreground">360°</strong> = Back to normal<br/>
                      Use when: creative color shift needed
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-bold mb-2">Sepia</h3>
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">0.0</strong> = Normal<br/>
                      <strong className="text-foreground">0.8</strong> = Vintage brown tone<br/>
                      <strong className="text-foreground">1.0</strong> = Full sepia<br/>
                      Use when: old film / historical look
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-bold mb-2">Invert</h3>
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">0.0</strong> = Normal<br/>
                      <strong className="text-foreground">1.0</strong> = Negative film effect<br/>
                      Use when: psychedelic / horror effect needed
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground mt-6 text-sm">
                Start with small adjustments — 1.1-1.2 for Brightness/Contrast, 1.2-1.3 for Saturation. Big changes look artificial.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Using This Tool */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Adjust Video Colors</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="relative font-semibold text-xl">Upload your video</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Select or drag your file. It stays on your device — no server upload. Watch a few seconds to identify what needs fixing: too dark, too flat, wrong colors.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">Adjust the sliders</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Start with one adjustment at a time. Brightness for dark footage. Contrast for flat footage. Saturation for dull colors. Small changes look more natural than extreme values.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">Apply and download</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click Apply Transform and wait. Processing time depends on video length. When done, toggle between Original and Transformed to compare. Download if satisfied.
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
