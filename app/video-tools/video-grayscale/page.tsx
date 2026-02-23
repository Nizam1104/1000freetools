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
    question:
      "Do I need to download video editing software to make my clip black and white?",
    answer:
      "No. You can run a full grayscale conversion directly inside your Chrome or Safari browser window. Because this tool utilizes local memory processing, you bypass terrible cloud upload times and instantly strip color from your footage without downloading an executable desktop program like Premiere Pro.",
  },
  {
    question:
      "Will making my video black and white reduce its actual file size?",
    answer:
      "Surprisingly, no not immediately. A grayscale filter artificially drains color, but it doesn't change the underlying structural MP4 mathematics. The video still maintains a digital slot for color data, even if that slot is visually empty, so your file size will remain largely identical.",
  },
  {
    question:
      "How long does a local browser grayscale conversion actually take?",
    answer:
      "Because this system does not rely on a distant cloud server, your rendering speed is entirely dictated by your own physical processor. A heavy 4K file on an old laptop could take 20 minutes to re-encode, while a short 1080p clip on a modern gaming PC might take exactly five seconds.",
  },
  {
    question:
      "Are there ugly watermarks burned into the center of my final footage?",
    answer:
      "Zero watermarks. This utility acts as a direct, private conversion tool running heavily on your local computer hardware. Since we avoid paying massive cloud computing fees, we don't have to ruin your output footage with transparent logos to force a subscription upgrade.",
  },
  {
    question: "Does converting to grayscale violently destroy my audio track?",
    answer:
      "Not at all. The processing algorithm is strictly configured to exclusively target visual color pixel arrays. Your original dialogue, background music, and overall stereo audio waveform absolutely remain completely untouched and perfectly embedded in the final MP4.",
  },
  {
    question:
      "Are the black and white filters permanently baked into the video?",
    answer:
      "Yes, this acts as a deeply destructive encoder. Rather than adding a flimsy, temporary Instagram filter on top of the clip, it structurally redraws the internal color identity of every single frame, ensuring the black and white aesthetic is violently locked in forever, no matter where you upload it next.",
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
                Video Grayscale Converter – Convert Video to Black & White
                Online
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Transform any color video into a timeless black-and-white film
                with one click. Full grayscale conversion with no quality loss,
                no watermarks, and no software to install.
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

        {/* What the Tool Does Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                What it Does
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                When you need to force a serious, moody tone into a colorful
                clip, you can convert video to grayscale online for free. This
                web application bypasses massive professional software suites
                entirely, reading your MP4 file locally in the browser and
                mathematically stripping out every ounce of RGB saturation. It
                brutally forces the entire visual spectrum down to pure black,
                white, and neutral grays, effectively generating permanent,
                cinematic monochrome footage without destroying the underlying
                resolution or audio fidelity.
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
                Import the colorful file
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Drop your raw, over-saturated video right onto the dashboard
                surface to immediately mount the footage into your computer's
                temporary memory. The system mounts an "Original" preview player
                immediately, granting you a clear baseline reference before you
                utterly destroy the color spectrum.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Execute the grayscale conversion
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Smash the "Convert to Grayscale" trigger to unleash your local
                CPU on the file. Because this does not upload to a distant
                server, you must physically wait while your processor
                systematically recalculates the luminance values and
                mathematically drains the specific color data out of every
                single frame.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Compare and download
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Once the progress line slams 100%, immediately flip back and
                forth between the "Original" and "Grayscale" preview buttons to
                verify the drastic visual tone shift. If you are satisfied with
                the stark visual contrast, hit download to pull the newly
                rendered MP4 down to your local storage drive forever.
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
                  Simulating old documentary footage
                </h3>
                <p className="text-sm text-muted-foreground">
                  Historical vloggers compiling video essays frequently need to
                  insert modern smartphone footage seamlessly next to 1940s
                  archive film. Aggressively processing their vibrant 4K clips
                  completely drains the color, instantly grounding the new
                  footage inside an old, grim, heavily authentic monochrome
                  aesthetic.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Sanitizing corporate surveillance video
                </h3>
                <p className="text-sm text-muted-foreground">
                  Security analysts reviewing bizarre security camera footage
                  often get severely distracted by bright neon clothing or
                  flashy background lights. Running the raw file through a
                  violent grayscale purge flattens the visual field, brutally
                  removing distracting hues so the examiner can focus strictly
                  on pure shapes and mechanical movement.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Generating horror trailer flashbacks
                </h3>
                <p className="text-sm text-muted-foreground">
                  Indie horror directors explicitly require jarring, unsettling
                  transitions right before a jump scare to violently detach the
                  viewer from reality. Ripping the color entirely out of a scene
                  instantly triggers an eerie, sterile, almost dead visual tone
                  that flawlessly signals an impending psychological nightmare
                  to the entire audience.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Crafting edgy punk music videos
                </h3>
                <p className="text-sm text-muted-foreground">
                  Underground musicians shooting aggressive performance clips
                  hate the cheerful look of normal digital video. Rapidly
                  smashing the entire video into stark black and white heavily
                  amplifies harsh shadows and stark lighting, artificially
                  injecting an aggressive, lo-fi punk rock identity permanently
                  into the final master.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Solving terrible mixed lighting
                </h3>
                <p className="text-sm text-muted-foreground">
                  Amateur filmmakers shooting in a desperate location that
                  contains terrible blue LED light and nasty yellow incandescent
                  bulbs simultaneously often end up with an unfixable, ugly
                  color grade. Abandoning the color entirely and forcefully
                  converting to grayscale masks the disastrous lighting mixture
                  completely under a blanket of smooth gray tones.
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
                    The Grayscale 100% Filter
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    This brutal algorithmic filter aggressively isolates the
                    independent Red, Green, and Blue sub-pixel data embedded
                    deeply in the footage. It systematically commands the
                    encoder to average out the individual color intensity
                    values, violently converting every single pixel into an
                    equivalent shade of neutral gray based purely on native
                    luminance.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Offscreen Canvas Engine</h3>
                  <p className="text-muted-foreground mt-2">
                    To prevent your internet browser from instantly hanging and
                    crashing under heavy video crunching, the system triggers a
                    background "Offscreen Canvas." It silently draws and alters
                    millions of pixels invisibly behind the active window,
                    protecting your main web session from intense computer
                    processing stutter.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    Permanent Destructive Export
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    The system relies heavily on the `Mp4OutputFormat` module to
                    completely rewrite the video. It essentially feeds your old
                    MP4 into the shredder and actively burns the newly generated
                    black and white frames into an entirely fresh file, proving
                    this is not just a cheap, reversible aesthetic overlay.
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
