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

        {/* What You Need to Know About Frame Rate */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                What Frame Rate Actually Does
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Frame rate is the number of still images shown each second. Higher numbers mean smoother motion. Lower numbers create a choppier, more stylized look. The thing people get wrong: changing frame rate doesn't add or remove motion information — it just repackages what's already there.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When you convert 60fps footage to 24fps, the tool drops frames. When you go from 24fps to 60fps, it duplicates them. Neither creates new motion data. That's why converting won't make your handheld footage look like it was shot on a gimbal — but it will help you match delivery specs or achieve a specific aesthetic.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* When Frame Rate Conversion Makes Sense */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Real Scenarios Where This Helps</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Your film school project needs 24fps</h3>
                <p className="text-sm text-muted-foreground">
                  You recorded at 30fps because that's what your phone defaults to. Now your professor wants 24fps for the "cinematic look." Converting gives you that standard film frame rate. It won't magically add motion blur, but it will match the playback speed expected in cinema contexts.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Gaming highlights for social media</h3>
                <p className="text-sm text-muted-foreground">
                  You recorded at 120fps for buttery smooth gameplay, but Instagram Reels wants 30fps. Dropping the frame rate reduces file size and ensures the platform doesn't re-encode your video aggressively. The motion stays clear even after compression.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Animation reference at 12fps</h3>
                <p className="text-sm text-muted-foreground">
                  Traditional hand-drawn animation often runs at 12fps — one drawing every two frames at 24fps playback. Converting your reference footage to 12fps lets you study the key poses without getting lost in the in-between motion.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Bandwidth-constrained sharing</h3>
                <p className="text-sm text-muted-foreground">
                  Need to send a video over a slow connection? Dropping from 30fps to 15fps cuts the data roughly in half. The video looks choppier, but for instructional content or quick reviews, it's often acceptable.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Matching mixed camera sources</h3>
                <p className="text-sm text-muted-foreground">
                  One camera shot at 25fps, another at 30fps. Editing them together causes stutter. Converting both to a common frame rate before importing to your editor prevents timing issues down the line.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Legacy system compatibility</h3>
                <p className="text-sm text-muted-foreground">
                  Some older presentation software or digital signage systems demand specific frame rates. Converting to their required 30fps or 25fps prevents playback failures during important moments.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Frame Rate Standards Reference */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                Common Frame Rate Standards
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Frame Rate</th>
                      <th className="text-left py-3 px-4 font-medium">Typical Use</th>
                      <th className="text-left py-3 px-4 font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">24 fps</td>
                      <td className="py-3 px-4">Theatrical films, narrative content</td>
                      <td className="py-3 px-4">The "cinematic" standard since the 1920s</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">25 fps</td>
                      <td className="py-3 px-4">PAL broadcast (Europe, Australia)</td>
                      <td className="py-3 px-4">Standard for 50Hz power regions</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">30 fps</td>
                      <td className="py-3 px-4">NTSC broadcast (US, Japan), web video</td>
                      <td className="py-3 px-4">Actually 29.97 for broadcast</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">60 fps</td>
                      <td className="py-3 px-4">Gaming, sports, high-motion content</td>
                      <td className="py-3 px-4">Smooth motion, larger files</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">120 fps</td>
                      <td className="py-3 px-4">Slow-motion capture, competitive gaming</td>
                      <td className="py-3 px-4">Often played back at 24fps for 5x slow motion</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Using This Tool */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Use This Tool</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="relative font-semibold text-xl">Load your video</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click upload or drag your file. The video stays on your device — nothing gets sent to a server. Large files take longer to process because your browser does all the encoding work.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">Pick your target FPS</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Use the preset buttons for common rates like 24, 30, or 60. Or type a custom value between 1 and 120. If you're unsure, 30fps works for most web platforms.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">Process and download</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Hit the button and wait. Processing time depends on video length and your computer's speed. Keep the tab open — closing it cancels the job. When done, preview and download.
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
