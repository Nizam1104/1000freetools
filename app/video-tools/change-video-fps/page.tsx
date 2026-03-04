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
import { Progress } from "@/components/ui/progress";
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Script from "next/script";

const faqData = [
  {
    question:
      "Why doesn't increasing the frame rate make my existing video smoother?",
    answer:
      "When you change video fps online to a higher number using this tool, it duplicates existing frames to reach the target rate rather than inventing new motion data. For genuine motion smoothing, you would need an AI interpolation tool that analyzes the video and draws entirely new frames between the existing ones.",
  },
  {
    question: "Does modifying the frame rate change my video's total duration?",
    answer:
      "No, the duration and audio sync remain exactly the same. The tool adjusts how many frames are packed into each second of playback, skipping or duplicating frames as needed to fit the new speed without stretching or squishing the timeline.",
  },
  {
    question: "Will my video lose quality if I lower the frame rate?",
    answer:
      "Lowering the frame rate will make the motion appear less fluid and choppier, but the visual clarity of the individual frames remains intact. This is often an acceptable trade-off when you urgently need to reduce data usage or meet strict platform requirements.",
  },
  {
    question: "Can anyone else see the video I am processing?",
    answer:
      "Everything happens locally inside your web browser, meaning the video file is never uploaded or transmitted to a server. You can process highly sensitive or private footage offline, and nobody else will ever have access to it.",
  },
  {
    question: "What happens if I convert a 60fps gaming clip to 30fps?",
    answer:
      "The tool will simply discard every other frame, effectively halving the visual smoothness. This is a very common workflow for creators who record gameplay at 60fps but want to upload a smaller, more standard 30fps file to social media.",
  },
  {
    question: "Why does the video processing take longer for longer videos?",
    answer:
      "Because the tool relies entirely on the processing power of your own device, larger and longer files take more time to encode. Closing other demanding applications on your computer can help speed up the conversion process significantly.",
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

export default function ChangeVideoFpsPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [targetFps, setTargetFps] = useState<number>(30);
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
      setTargetFps(30);
    }
  };

  const handleChangeFps = async () => {
    if (!videoFile || !targetFps) {
      setError("Please select a video and choose a target frame rate");
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
          frameRate: targetFps,
        },
      });

      conversion.onProgress = (progressValue: number) => {
        setProgress(Math.round(progressValue * 100));
      };

      await conversion.execute();

      const fpsChangedBuffer = output.target.buffer;
      if (!fpsChangedBuffer) {
        throw new Error("Failed to get FPS-changed video buffer");
      }
      const fpsChangedBlob = new Blob([fpsChangedBuffer], {
        type: "video/mp4",
      });
      const fpsChangedUrl = URL.createObjectURL(fpsChangedBlob);
      setOutputUrl(fpsChangedUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to change video FPS",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `fps-${targetFps}-${videoFile?.name || "video.mp4"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setTargetFps(30);
    setOutputUrl(null);
    setError(null);
  };

  const fpsPresets = [
    { fps: 60, label: "60 FPS", desc: "Ultra smooth" },
    { fps: 30, label: "30 FPS", desc: "Standard" },
    { fps: 24, label: "24 FPS", desc: "Cinematic" },
    { fps: 15, label: "15 FPS", desc: "Low bandwidth" },
    { fps: 12, label: "12 FPS", desc: "Animation" },
    { fps: 10, label: "10 FPS", desc: "Minimal" },
  ];

  const relatedTools = [
    {
      name: "Video Compressor",
      description: "Compress videos online - reduce file size, No size limit",
      href: "/video-tools/video-compressor",
    },
    {
      name: "Video Format Converter",
      description:
        "Convert between video formats, Supports wide range of video formats",
      href: "/video-tools/video-format-converter",
    },
    {
      name: "Video Player",
      description: "Play any video file format instantly, Supports subtitles",
      href: "/video-tools/video-player",
    },
    {
      name: "Video MetaData Viewer",
      description: "See Video or Audio files metadata",
      href: "/video-tools/video-metadata-viewer",
    },
    {
      name: "Crop Video",
      description: "Crop videos online for free - remove unwanted edges",
      href: "/video-tools/crop-video",
    },
    {
      name: "Rotate Video",
      description: "Rotate videos 90°, 180° or 270° online for free",
      href: "/video-tools/rotate-video",
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
                Video FPS Changer – Change Frame Rate Instantly Online
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Adjust your video's frame rate to any value — from cinematic
                24fps to smooth 60fps — entirely in your browser. No uploads to
                servers, no waiting, completely free.
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
                <h2 className="text-xl font-bold mb-6">Change Video FPS</h2>

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
                        <div className="mt-4 p-3 bg-muted rounded-md">
                          <p className="text-sm text-muted-foreground">
                            Target FPS:{" "}
                            <span className="text-foreground font-medium">
                              {targetFps}
                            </span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* FPS Settings */}
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">
                          Frame Rate Settings
                        </h2>
                        <div className="space-y-4">
                          {/* FPS Preset Buttons */}
                          <div>
                            <Label className="mb-2 block">Quick Presets</Label>
                            <div className="grid grid-cols-3 gap-2">
                              {fpsPresets.map((option) => (
                                <Button
                                  key={option.fps}
                                  variant={
                                    targetFps === option.fps
                                      ? "default"
                                      : "outline"
                                  }
                                  onClick={() => setTargetFps(option.fps)}
                                  className="flex flex-col h-auto py-2"
                                >
                                  <span className="font-semibold">
                                    {option.label}
                                  </span>
                                  <span className="text-xs opacity-75">
                                    {option.desc}
                                  </span>
                                </Button>
                              ))}
                            </div>
                          </div>

                          {/* Custom FPS Input */}
                          <div>
                            <Label className="mb-2 block">
                              Custom Frame Rate
                            </Label>
                            <div className="flex gap-2">
                              <input
                                type="number"
                                value={targetFps || ""}
                                onChange={(e) =>
                                  setTargetFps(parseInt(e.target.value) || 0)
                                }
                                min={1}
                                max={120}
                                placeholder="Enter FPS (1-120)"
                                className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-sm"
                              />
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
                                onClick={handleChangeFps}
                                disabled={isProcessing || !targetFps}
                                className="flex-1"
                              >
                                {isProcessing ? "Processing..." : "Change FPS"}
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
                                Download FPS-Changed Video
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
                When your video looks too choppy or doesn't match the required
                frame rate for a specific platform, you can change video fps
                online to fix it directly in your browser. This tool adjusts how
                many frames your video displays every second without altering
                its playback speed or sending your file to an external server.
                By modifying the frame rate locally, you maintain complete
                privacy while preparing your video for web standard 30fps,
                cinematic 24fps, or even lowering the fps to reduce the overall
                file size when bandwidth is tight.
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
                Select your video
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click the upload button to load your video into the browser.
                This process happens instantly without any uploading because the
                tool reads the file directly from your local storage, keeping
                your media secure and saving you time on slow connections.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Choose your target FPS
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Use the quick presets or type a custom number between 1 and 120
                in the input field. Lowering the frame rate will drop frames and
                can save bandwidth, while increasing it duplicates frames to
                meet specific platform requirements without actually inventing
                new motion data.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Process and download
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Hit the process button to start the local re-encoding phase.
                Once the progress bar finishes, you will see a preview of the
                adjusted video right next to your original, allowing you to
                verify the frame rate change before downloading the final file
                to your device.
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
                <h3 className="font-bold mb-2">Matching cinema standards</h3>
                <p className="text-sm text-muted-foreground">
                  If you shot a video at 30fps or 60fps but want it to feel more
                  like a traditional movie, converting it to 24fps will give it
                  that natural cinematic look. This is especially helpful for
                  short films or creative vlog segments.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Reducing file bandwidth</h3>
                <p className="text-sm text-muted-foreground">
                  When you need to send a video over a slow connection, dropping
                  the frame rate down to 15fps or even 10fps severely reduces
                  the amount of data the video requires. The video will look
                  choppier, but it becomes much easier to share.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Meeting platform requirements
                </h3>
                <p className="text-sm text-muted-foreground">
                  Sometimes specific upload portals or legacy software strictly
                  require a 30fps file to process correctly. Changing your frame
                  rate to the standard 30fps ensures maximum compatibility
                  across almost all modern and older systems.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Creating animation references
                </h3>
                <p className="text-sm text-muted-foreground">
                  If you are animating a sequence and need a reference video,
                  lowering the frame rate to 12fps matches the standard timing
                  for classic hand-drawn animation. This lets you study the
                  motion exactly as you would draw it.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Standardizing mixed footage</h3>
                <p className="text-sm text-muted-foreground">
                  When editing a project using clips from different cameras with
                  varying frame rates, modifying them all to share the same FPS
                  prevents playback glitches in your editing timeline. This tool
                  provides a quick way to unify your media before you start
                  editing.
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
                  <h3 className="font-bold text-lg">Quick Presets</h3>
                  <p className="text-muted-foreground mt-2">
                    These buttons offer the most common frame rates like 24, 30,
                    and 60, allowing you to instantly set the target without
                    typing. Use these if you are aiming for standard web,
                    cinema, or gaming frame rates to save time.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Custom Frame Rate</h3>
                  <p className="text-muted-foreground mt-2">
                    This input lets you specify exactly how many frames per
                    second the output video should have, ranging from 1 to 120.
                    This is useful for very specific technical requirements,
                    like matching an unusual legacy format or creating an
                    extremely low frame rate for a stylistic choice.
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
