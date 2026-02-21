"use client";

import { useState, useRef } from "react";
import { Conversion, Input, Output, Mp4OutputFormat, BufferTarget, BlobSource, ALL_FORMATS } from "mediabunny";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Script from "next/script";

const faqData = [
  {
    question: "What does changing FPS actually do to my video?",
    answer:
      "Frame rate (FPS) determines how many individual frames are shown per second. Lowering FPS drops frames to reduce file size and create a choppier look; increasing FPS duplicates frames to make motion appear smoother.",
  },
  {
    question: "Will changing the frame rate change the speed of my video?",
    answer:
      "No. This tool changes how many frames are displayed per second without altering your video's duration or playback speed. Your video will play at the same length.",
  },
  {
    question: "What is the best FPS for YouTube videos?",
    answer:
      "YouTube recommends 24, 25, 30, 48, 50, or 60fps. For standard content, 30fps is the sweet spot; for gaming or action footage, 60fps delivers noticeably smoother motion.",
  },
  {
    question: "Why would I convert a video to 24fps?",
    answer:
      "24fps is the standard frame rate used in cinema. Converting your footage to 24fps gives it a natural cinematic, film-like feel that's popular for short films, vlogs, and creative video projects.",
  },
  {
    question: "Can I increase FPS to make my video smoother?",
    answer:
      "You can increase the FPS value, but this tool duplicates existing frames rather than generating new ones through interpolation. For true motion smoothing, dedicated AI tools are needed. Increasing FPS here is mainly useful for compatibility purposes.",
  },
  {
    question: "What video formats does this tool accept?",
    answer:
      "The tool accepts all common video formats including MP4, MOV, WebM, MKV, and AVI. The output file is always exported as MP4.",
  },
  {
    question: "Is my video uploaded to a server when I use this tool?",
    answer:
      "No. All processing happens entirely in your browser using local compute resources. Your video never leaves your device, which keeps your files completely private.",
  },
  {
    question: "What's the difference between 30fps and 60fps?",
    answer:
      "30fps is the standard for most web video and TV content. 60fps doubles the frames per second, making fast motion and action sequences appear significantly smoother — commonly used in gaming content, sports, and slow-motion footage.",
  },
  {
    question: "What FPS should I use for animation?",
    answer:
      "Traditional animation often uses 12fps (classic hand-drawn look) or 24fps for smoother movement. Stop-motion projects typically target 12–15fps.",
  },
  {
    question: "Is there a file size limit for videos I can process?",
    answer:
      "There is no hard limit imposed by the tool, but very large files will take longer to process since everything runs in your browser. For best performance, files under 500MB work most efficiently.",
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
      const fpsChangedBlob = new Blob([fpsChangedBuffer], { type: "video/mp4" });
      const fpsChangedUrl = URL.createObjectURL(fpsChangedBlob);
      setOutputUrl(fpsChangedUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change video FPS");
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
      description: "Convert between video formats, Supports wide range of video formats",
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
                Adjust your video's frame rate to any value — from cinematic 24fps to smooth 60fps — entirely in your browser. No uploads to servers, no waiting, completely free.
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
                            Target FPS: <span className="text-foreground font-medium">{targetFps}</span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* FPS Settings */}
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">Frame Rate Settings</h2>
                        <div className="space-y-4">
                          {/* FPS Preset Buttons */}
                          <div>
                            <Label className="mb-2 block">Quick Presets</Label>
                            <div className="grid grid-cols-3 gap-2">
                              {fpsPresets.map((option) => (
                                <Button
                                  key={option.fps}
                                  variant={targetFps === option.fps ? "default" : "outline"}
                                  onClick={() => setTargetFps(option.fps)}
                                  className="flex flex-col h-auto py-2"
                                >
                                  <span className="font-semibold">{option.label}</span>
                                  <span className="text-xs opacity-75">{option.desc}</span>
                                </Button>
                              ))}
                            </div>
                          </div>

                          {/* Custom FPS Input */}
                          <div>
                            <Label className="mb-2 block">Custom Frame Rate</Label>
                            <div className="flex gap-2">
                              <input
                                type="number"
                                value={targetFps || ""}
                                onChange={(e) => setTargetFps(parseInt(e.target.value) || 0)}
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
                              <Button variant="outline" onClick={handleReset} className="flex-1">
                                Reset
                              </Button>
                              <Button onClick={handleChangeFps} disabled={isProcessing || !targetFps} className="flex-1">
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
                                <h3 className="text-sm font-semibold mb-2">Result</h3>
                                <video
                                  src={outputUrl}
                                  controls
                                  className="w-full rounded-md bg-black aspect-video mb-3"
                                />
                              </div>
                              <Button onClick={handleDownload} className="w-full">
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
                What the Video FPS Changer Does
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Video FPS Changer lets you modify the frame rate of any video file directly in your browser. Whether you need the cinematic look of 24fps, the standard 30fps for web content, silky smooth 60fps for gaming footage, or any custom value between 1 and 120, this tool handles it instantly.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                It works by re-encoding your video's frame timing without sending your file to any external server — your footage stays private on your device. The output is always a clean MP4 file ready to share or upload.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How to Use Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Use the Tool</h2>
            <p className="mt-4 text-muted-foreground">
              Change your video's frame rate in 5 simple steps
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {[
              {
                step: "01",
                title: "Select Video",
                description: "Click 'Select Video' and choose any video file from your device",
              },
              {
                step: "02",
                title: "Preview Loads",
                description: "Your video appears in the preview player on the left",
              },
              {
                step: "03",
                title: "Choose FPS",
                description: "Select a frame rate from Quick Presets or enter a custom value",
              },
              {
                step: "04",
                title: "Process",
                description: "Click 'Change FPS' and wait a few seconds while your video is processed",
              },
              {
                step: "05",
                title: "Download",
                description: "Preview the result and click 'Download FPS-Changed Video' to save",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                {index < 4 && (
                  <div className="absolute left-1/2 top-16 hidden h-0.5 w-full -translate-x-1/2 bg-gradient-to-r from-primary/20 to-primary/5 sm:block" />
                )}
                <div className="relative text-center">
                  <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                    <span className="text-2xl font-bold">{item.step}</span>
                  </div>
                  <h3 className="relative font-semibold text-xl">{item.title}</h3>
                  <p className="relative mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs Section */}
        <section className="container mx-auto max-w-4xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to know about changing video FPS
            </p>
          </div>
          <Faqs faqs={faqData} />
        </section>

        {/* Related Tools Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">More Video Tools</h2>
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
