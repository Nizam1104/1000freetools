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

        {/* What the Tool Does Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                What it Does
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This tool applies color adjustments to every frame of your video
                and writes the results into a new MP4 file. You control six
                parameters: Brightness raises or lowers overall light levels.
                Contrast expands or compresses the range between shadows and
                highlights. Saturation increases or removes color intensity. Hue
                Rotate slides every color around the spectrum wheel. Sepia adds
                warm brownish tones. Invert flips every color to its opposite.
                All processing runs in your browser using your device's CPU, so
                the file is never uploaded to a server and your original stays
                untouched until you download the output.
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
                Load your video
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Open the file picker and select your video. The player shows the
                original file in the preview panel. Review the current color
                quality before adjusting. You can return to this Original view
                at any time to compare against the processed version.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Adjust the sliders
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Move each slider to the value you want. If the video is too
                dark, set Brightness above 1.0. If colors look washed out, set
                Saturation above 1.0. If the image looks flat, increase Contrast
                above 1.0. Use "Reset to Defaults" to return all sliders to
                their starting positions if the result is not what you expected.
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
                Click Apply Transform. The encoder processes each frame with
                your chosen values and writes them into a new MP4. When the
                progress bar reaches 100%, click the Transformed button to
                preview the result. If you are satisfied, click Download to save
                the output file to your device.
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
                  Recovering underexposed footage
                </h3>
                <p className="text-sm text-muted-foreground">
                  A clip recorded in a dim room or against backlight often comes
                  out too dark to share. Set Brightness to 1.3 and Contrast to
                  1.1. The encoder raises the luminance level across every frame
                  and separates the shadows from the midtones, making faces and
                  details visible without a full re-shoot.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Boosting flat marketing footage
                </h3>
                <p className="text-sm text-muted-foreground">
                  Video filmed on a cloudy day or through a window often looks
                  dull and gray. Set Saturation to 1.3 and Contrast to 1.15. The
                  encoder increases color richness and deepens the difference
                  between light and dark areas, making product colors and
                  outdoor scenes look more vivid and inviting.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Creating a sepia or vintage look
                </h3>
                <p className="text-sm text-muted-foreground">
                  Set Sepia to 0.8 and reduce Saturation to 0.6. This
                  combination floods the frame with warm brown tones and removes
                  most of the original color, simulating old film chemistry.
                  Reduce Contrast slightly to 0.9 to soften the shadows and
                  complete the vintage aesthetic.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Building an inverted horror effect
                </h3>
                <p className="text-sm text-muted-foreground">
                  Set Invert to 1.0 to flip every color value to its direct
                  opposite. White areas become black and dark shadows appear
                  bright. This creates an unsettling negative-film look used in
                  trailers, horror cuts, and experimental music videos where a
                  jarring visual break is needed.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Matching footage from two different cameras
                </h3>
                <p className="text-sm text-muted-foreground">
                  When you cut between a high-end camera and a phone or webcam,
                  color temperature differences are visible. Process the weaker
                  camera's footage with small Brightness, Contrast, and
                  Saturation adjustments until the colors match. This closes the
                  visual gap without needing dedicated color grading software.
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
                  <h3 className="font-bold text-lg">Brightness and Contrast</h3>
                  <p className="text-muted-foreground mt-2">
                    Brightness shifts the overall luminance of the frame up or
                    down. A value of 1.0 is neutral. Values above 1.0 lift the
                    entire image toward white. Values below 1.0 push it toward
                    black. Contrast controls the gap between the brightest and
                    darkest parts of the frame. Increasing contrast above 1.0
                    makes highlights brighter and shadows darker. Reducing it
                    below 1.0 compresses the range and makes the image look flat
                    or hazy.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Saturation</h3>
                  <p className="text-muted-foreground mt-2">
                    Saturation controls the intensity of the colors in the
                    frame. A value of 1.0 is neutral and preserves the original
                    colors. Values above 1.0 make colors more vivid. Values
                    below 1.0 reduce color intensity. At 0.0, the encoder
                    removes all color and produces a grayscale image.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Hue Rotate</h3>
                  <p className="text-muted-foreground mt-2">
                    This slider shifts all colors in the video by the number of
                    degrees you set, measured on the 360-degree color wheel. At
                    90 degrees, greens shift toward blue-purple tones. At 180
                    degrees, every color becomes its direct opposite. This
                    control is useful for creative color effects or for
                    correcting footage with a dominant color cast.
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
