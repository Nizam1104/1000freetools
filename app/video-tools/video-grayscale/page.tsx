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
    question: "How do I convert a video to black and white without software?",
    answer:
      "Open the file picker and select your video. Click Convert to Grayscale and wait for the progress bar to reach 100%. The encoder applies a grayscale filter to every frame in your browser using your device's CPU. When it finishes, click Download to save the black and white MP4. No software installation is required and nothing is uploaded to a server.",
  },
  {
    question: "Does converting to grayscale reduce the file size?",
    answer:
      "Not directly. Grayscale conversion removes color channel data from the visual output but the MP4 container still stores the three color channels at zero saturation internally. The output file size will be close to the same as the original. If you also need a smaller file, run the output through a video compressor after the grayscale conversion.",
  },
  {
    question: "How long does grayscale conversion take?",
    answer:
      "Processing speed depends on your device's processor and the length of your video. A two-minute 1080p clip takes about one to three minutes on a mid-range laptop. A longer 4K recording can take ten minutes or more. Keep the browser tab active and avoid running other heavy tasks while the encoder works.",
  },
  {
    question: "Does the output video have a watermark on it?",
    answer:
      "No watermark is added to the output. All processing runs on your device using your own CPU. There is no cloud server cost involved, so no subscription or payment is required to remove a watermark.",
  },
  {
    question: "Does the grayscale filter affect the audio track?",
    answer:
      "No. The encoder targets only the video frames. The audio data is copied from the source file into the output MP4 unchanged. Your dialogue, music, and any other audio recorded with the video will play back at the same quality in the grayscale output.",
  },
  {
    question: "Is the grayscale effect reversible?",
    answer:
      "No. The encoder rewrites the color information in every frame of the output file. The resulting MP4 contains grayscale pixel data at the file level, not a filter layer that can be switched off. Your original file is not modified. If you need the color version again, use your original source file.",
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

export default function VideoGrayscalePage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"original" | "grayscale">(
    "original",
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const grayscaleVideoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setOutputUrl(null);
      setError(null);
      setPreviewMode("original");
    }
  };

  const handleGrayscale = async () => {
    if (!videoFile) {
      setError("Please select a video to convert to grayscale");
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

      let grayscaleCanvas: OffscreenCanvas | null = null;
      let grayscaleCtx: OffscreenCanvasRenderingContext2D | null = null;

      const conversion = await Conversion.init({
        input,
        output,
        video: {
          process: async (sample) => {
            if (!grayscaleCanvas) {
              grayscaleCanvas = new OffscreenCanvas(
                sample.displayWidth,
                sample.displayHeight,
              );
              grayscaleCtx = grayscaleCanvas.getContext("2d");
              if (grayscaleCtx) {
                grayscaleCtx.filter = "grayscale(100%)";
              }
            }

            if (grayscaleCanvas && grayscaleCtx) {
              sample.draw(grayscaleCtx, 0, 0);
              return grayscaleCanvas;
            }

            return sample;
          },
        },
      });

      conversion.onProgress = (progressValue: number) => {
        setProgress(Math.round(progressValue * 100));
      };

      await conversion.execute();

      const grayscaleBuffer = output.target.buffer;
      if (!grayscaleBuffer) {
        throw new Error("Failed to get grayscale video buffer");
      }
      const grayscaleBlob = new Blob([grayscaleBuffer], { type: "video/mp4" });
      const grayscaleUrl = URL.createObjectURL(grayscaleBlob);
      setOutputUrl(grayscaleUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to convert video to grayscale",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `grayscale-${videoFile?.name || "video.mp4"}`;
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
                Convert Video to Black and White Online Free
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Remove all color from your video and produce a clean grayscale
                MP4 in your browser. The encoder rewrites every frame using
                luminance values only, with no quality loss and no watermarks.
                Your original file stays untouched until you download the
                output.
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
                  Video Grayscale Converter
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
                              previewMode === "grayscale" && outputUrl
                                ? "default"
                                : "outline"
                            }
                            onClick={() => setPreviewMode("grayscale")}
                            className="flex-1"
                            disabled={!outputUrl}
                          >
                            Grayscale
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

                        {/* Grayscale Video Preview */}
                        {outputUrl && previewMode === "grayscale" && (
                          <div>
                            <video
                              ref={grayscaleVideoRef}
                              src={outputUrl}
                              controls
                              className="w-full rounded-md bg-black aspect-video"
                            />
                            <p className="text-sm text-muted-foreground mt-2 text-center">
                              Grayscale Preview
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Conversion Settings */}
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">
                          Conversion Settings
                        </h2>
                        <div className="space-y-4">
                          {/* Info Card */}
                          <div className="p-4 bg-muted rounded-md">
                            <h3 className="font-medium mb-2">
                              About Grayscale Conversion
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              This tool converts your video to black and white
                              by removing all color information while preserving
                              the luminance (brightness) of each pixel.
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
                                onClick={handleGrayscale}
                                disabled={isProcessing}
                                className="flex-1"
                              >
                                {isProcessing
                                  ? "Processing..."
                                  : "Convert to Grayscale"}
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
                                  Your video has been successfully converted to
                                  grayscale.
                                </p>
                              </div>
                              <Button
                                onClick={handleDownload}
                                className="w-full"
                              >
                                Download Grayscale Video
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

        {/* What Grayscale Conversion Does */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                What Grayscale Conversion Does
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Grayscale conversion removes all color information from your video. The tool reads each pixel's red, green, and blue values and replaces them with a single luminance value based on how bright that pixel appears. The result is a video using only shades of gray — from black to white — with no color remaining.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                This isn't a CSS filter or preview effect. The grayscale data is written into every frame of the output MP4. The file plays in black and white on every device, player, and platform — no settings required.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Your original file isn't modified. You get a new grayscale MP4 to download.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* When Grayscale Helps */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">When You'd Use This</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Matching modern footage to archival film</h3>
                <p className="text-sm text-muted-foreground">
                  Documentary makers cutting between new interviews and 1940s footage need them to match. Converting the new clips to grayscale removes the jarring color difference. Both clips sit in the same tonal range.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Fixing unworkable mixed lighting</h3>
                <p className="text-sm text-muted-foreground">
                  Mixed light sources — warm tungsten on one side, cool daylight on the other — create color shifts that are hard to fix. Removing color entirely eliminates the problem. The result looks intentional, not broken.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Creating a stark, dramatic mood</h3>
                <p className="text-sm text-muted-foreground">
                  Color carries emotional warmth. Removing it shifts the mood toward something more formal or timeless. Filmmakers use grayscale for memorial content, dramatic flashbacks, and opening credits.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">High-contrast art or music videos</h3>
                <p className="text-sm text-muted-foreground">
                  Without color to draw the eye, shapes, edges, and lighting become the dominant elements. Musicians and visual artists use grayscale for a raw, stripped-down aesthetic that emphasizes contrast and form.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Preparing for monochrome displays</h3>
                <p className="text-sm text-muted-foreground">
                  Some digital signage, e-ink displays, and print workflows only support grayscale. Converting before export lets you see the actual monochrome appearance — not an approximation by the display driver.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How Grayscale Works */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                How Grayscale Conversion Works
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg">Luminance Calculation</h3>
                  <p className="text-muted-foreground mt-2">
                    The tool reads each pixel's red, green, and blue values. It calculates a weighted average — green counts more (human eyes are more sensitive to it), red counts less, blue counts least. That single luminance value replaces all three color channels. The result preserves the original lighting and contrast, just without hue.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Permanent Encoding</h3>
                  <p className="text-muted-foreground mt-2">
                    The grayscale data is written into every frame of a new MP4 file. This isn't a filter that can be toggled off — the color data is gone from the output file. The video plays in black and white everywhere, on every player and platform.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Browser-Based Processing</h3>
                  <p className="text-muted-foreground mt-2">
                    The tool uses OffscreenCanvas to process frames without freezing your browser. Encoding happens in the background, keeping the interface responsive. Your file stays local — no upload to servers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Using This Tool */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Convert to Grayscale</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="relative font-semibold text-xl">Upload your video</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Select or drag your file. It stays on your device — no server upload. The preview shows the original color footage.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">Convert to grayscale</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click Convert to Grayscale. The encoder processes each frame, calculates luminance values, and writes a new MP4. Keep the tab open during processing.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">Preview and download</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                When done, toggle between Original and Grayscale to compare. The output is a true grayscale MP4 — plays in black and white everywhere. Download when satisfied.
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
            <p className="mt-4 text-muted-foreground">
              Everything you need to know about grayscale conversion
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
