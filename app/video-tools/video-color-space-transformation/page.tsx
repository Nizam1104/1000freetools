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
    question: "Do I need color grading software to fix a dark video online?",
    answer:
      "No, you don't need to purchase or download confusing timeline software like Premiere Pro. You can adjust video brightness online free right in your browser using this precise slider tool. Because the processing maps directly to your device memory, you can rescue underexposed footage without waiting for massive file uploads.",
  },
  {
    question: "What exactly does the Hue Rotate slider actually do?",
    answer:
      "The Hue Rotation algorithm grabs every single pixel in your video and forcefully slides its color identity across the visual spectrum wheel. If you type in 180 degrees, it perfectly flips your footage into its complete color opposite, successfully turning a red car blue, and a blue sky orange.",
  },
  {
    question: "How do I make my digital video look like an old vintage film?",
    answer:
      "To simulate a classic retro aesthetic, drag the Sepia slider to 1.0 to flood the frame with warm, brownish-yellow tones. To mimic the washed-out chemical fading of old film stock, pull the Saturation slider down to 0.7 to suck out the vibrant colors, and gently reduce the Contrast to 0.9 to flatten the harsh black shadows.",
  },
  {
    question:
      "Will dragging the brightness slider to maximum ruin my footage quality?",
    answer:
      "Yes, aggressively pushing the brightness slider to 2.0 forces the system to artificially blast fake white light into every pixel. Dark shadows will transform into ugly, noisy gray blocks, and bright areas will completely 'blow out' into pure, detail-free white screens.",
  },
  {
    question:
      "Why does the 'Original' and 'Transformed' preview button look the exact same?",
    answer:
      "The preview window relies on the browser's native processing engine to display changes. First ensure you have actually clicked the 'Apply Transform' button and waited for the progress bar to reach 100%. The system must physically re-encode the MP4 before it can generate the Transformed preview file to compare against the Original.",
  },
  {
    question:
      "Are these color space changes permanently burned into the mp4 file?",
    answer:
      "Absolutely. Instead of just adding a temporary color filter layer that might disappear when uploaded to Instagram or TikTok, this tool acts as a destructive encoder. It permanently rewrites the core mathematical color values of every single frame, ensuring the changes stick forever on any platform.",
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
                Video Color Space Transformer – Adjust Video Colors Online for
                Free
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Precisely control the visual look of your video with full color
                adjustment tools. Dial in brightness, contrast, saturation, hue
                rotation, sepia, and invert effects — all processed locally in
                your browser.
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
                When you accidentally record crucial footage in a dim room or
                under terrible fluorescent office lights, you can adjust video
                colors online to rescue the clip. This utility acts as a direct
                line into the raw visual data of your MP4 file, allowing you to
                manipulate six specific atmospheric variables including
                brightness, saturation, and contrast. Instead of applying a
                flimsy, peel-off filter, the application uses local browser
                processing to physically burn the new color values deep into
                every single frame permanently.
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
                Upload your target video
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Drop your dark, washed-out, or poorly white-balanced MP4 file
                into the browser processing grid inside the app. The interface
                will immediately mount your original, unaltered footage into the
                left-hand preview window, ensuring you have a true baseline
                reading before you begin manipulating the visual data.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Slide the visual adjustments
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Grab the variable sliders and push or pull them to alter the
                footage. If the clip is too dark, slowly drag the brightness
                slider above 1.0. If the colors look flat and gray, boost the
                saturation to 1.3 to inject heavy vibrancy back into the pixels.
                If you make a disastrous mistake, click "Reset to Defaults" to
                restart.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Render the final MP4
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click the Apply Transform button to command your computer
                processor to start physically rewriting the math behind millions
                of colored pixels. Once the progress bar hits 100%, hit the
                "Transformed" preview button to verify the new permanent color
                grade, and click download to claim the hard file.
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
                  Rescuing dark smartphone footage
                </h3>
                <p className="text-sm text-muted-foreground">
                  Everyday users often capture incredible concert moments or
                  birthday parties, only to discover the dim room lighting
                  ruined the shot. Sliding the brightness controller from 1.0 up
                  to 1.4 artificially floods the dark clip with light, revealing
                  faces, text, and details that were completely swallowed by
                  black shadows.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Punching up dull marketing clips
                </h3>
                <p className="text-sm text-muted-foreground">
                  Social media marketers filming real estate walkthroughs on
                  cloudy days often end up with dreary, uninviting gray footage.
                  Aggressively bumping the saturation to 1.3 and the contrast to
                  1.2 violently forces the dull, flat colors to pop, making the
                  green grass and blue skies look incredibly vibrant to
                  potential buyers.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Crafting retro sepia flashbacks
                </h3>
                <p className="text-sm text-muted-foreground">
                  Indie filmmakers shooting a sudden flashback scene or a dusty
                  western sequence need to detach the viewer from modern
                  reality. Ramping the Sepia slider up to 1.0 instantly slathers
                  the entire frame in a gritty, yellowish-brown crust, instantly
                  mimicking the chemical wash of 19th-century photography.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Generating horror movie negatives
                </h3>
                <p className="text-sm text-muted-foreground">
                  Creative editors crafting terrifying horror sizzle reels or
                  jarring glitch-art transitions often need highly unnatural
                  aesthetics. Smashing the Invert slider to maximum flips every
                  single color to its absolute opposite, turning bright white
                  skin into demonic pitch black, and dark shadows into screaming
                  white light.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Matching multi-camera colors</h3>
                <p className="text-sm text-muted-foreground">
                  Podcast producers filming with a high-end Sony camera and a
                  cheap webcam at the same time will notice the webcam footage
                  looks sickly and pale. By carefully dialing up the warmth and
                  saturation on just the webcam file, they can forcefully bridge
                  the visual gap and make the two distinct cameras look
                  identical in the final edit.
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
                  <h3 className="font-bold text-lg">
                    Brightness & Contrast Control
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    The Brightness variable strictly controls the overall
                    luminance energy in the frame, allowing you to lift a
                    pitch-black video out of darkness by exceeding 1.0. Contrast
                    dictates the mathematical distance between your brightest
                    whites and darkest blacks; lowering it makes the video look
                    foggy, while raising it makes the image look sharp, glossy,
                    and dramatic.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Saturation Slider</h3>
                  <p className="text-muted-foreground mt-2">
                    Saturation is the volume knob for your colors. Driving the
                    slider above 1.0 injects heavy artificial dyes into the
                    pixels, turning normal red into a blinding laser red.
                    Pulling the slider below 1.0 slowly drains the life out of
                    the frame until the video is reduced to a stark,
                    black-and-white grayscale wasteland at 0.0.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Hue Rotate Mechanism</h3>
                  <p className="text-muted-foreground mt-2">
                    This bizarre tool selects every color value and shifts it
                    across the 360-degree color wheel. A 90-degree shift
                    radically alters the fundamental reality of the footage,
                    turning green grass purple, orange construction cones pink,
                    and blue oceans green. It is generally used for psychedelic
                    music videos rather than standard color correction.
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
