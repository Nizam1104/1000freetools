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
    question: "How can I rotate video online free without watermarks?",
    answer:
      "You can easily rotate video online free right now without paying anything or downloading a shady application to your hard drive. Because this tool runs entirely through your internet browser window using local processing, we don't have to charge server fees or insert ugly watermarks over your final exported clip.",
  },
  {
    question:
      "Why did my smartphone footage record sideways in the first place?",
    answer:
      "When you quickly flip your smartphone from portrait to landscape mode, the internal gyroscope sometimes fails to log the change before you press the record button. While the phone might add hidden metadata telling its own native gallery app to flip the footage during playback, uploading that raw file to other websites causes them to ignore the metadata and play the video sideways.",
  },
  {
    question:
      "What is the difference between rotating 90 degrees and 270 degrees?",
    answer:
      "Rotating a video 90 degrees clockwise will tilt the top edge of your phone footage down toward the right hand side. Rotating 270 degrees clockwise actually achieves the exact same result as rotating the video 90 degrees counter-clockwise, meaning the top edge falls toward the left hand side.",
  },
  {
    question: "Will rotating a 16:9 widescreen video change its dimensions?",
    answer:
      "Yes, aggressively turning a horizontal 1920x1080 clip by 90 degrees effectively stands the rectangle up on its end. The processing engine swaps the mathematical dimensions, meaning your final exported video size will become a vertical 1080x1920 format.",
  },
  {
    question: "Can I use this tool to flip a video backwards like a mirror?",
    answer:
      "No, this specific rotation engine only spins the two-dimensional plane of the video in a circle using 90-degree increments. Creating a mirror image effect requires a dedicated horizontal or vertical flipping tool to invert the left and right side pixels.",
  },
  {
    question: "Are these rotation changes actually permanent?",
    answer:
      "Yes, unlike basic playback software that simply applies a temporary visual rotation tag on top of the file, this application forces a hard encode. It completely rewrites every single moving pixel in the footage into the new rotated position, ensuring the video will play correctly on every screen, television, and social media platform in the world.",
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
                Video Rotator – Rotate Videos 90°, 180° or 270° Online for Free
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Fix sideways or upside-down videos instantly. Rotate your
                footage clockwise or counter-clockwise in exact 90-degree
                increments — no apps, no watermarks, no uploads to servers.
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

        {/* What the Tool Does Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                What it Does
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                When you accidentally hold your smartphone the wrong way and
                record an incredibly vital moment permanently sideways, you can
                rotate video online free to fix the orientation. Instead of
                simply slapping a metadata tag onto the file that many players
                ignore, this tool mathematically rebuilds the underlying pixel
                structure of your clip and permanently locks it into the correct
                upright position. Because it functions completely inside your
                active web browser window, you never have to waste bandwidth
                uploading bulky files to a remote cloud server.
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
                Insert the broken footage
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Drop your target MP4 or MOV file directly into the application
                space to safely load it into your local browser cache. The
                application will instantly display the video exactly as the raw
                file data dictates, ignoring any deceptive orientation metadata
                tags your phone might have maliciously attached to confuse other
                media players.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Select the rotation increment
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Locate the rotation setting buttons and pick the 90-degree
                increment that actively spins your footage until gravity points
                the correct direction. The user interface does not provide a
                visual live preview of the spin, so you must mentally picture
                whether you need a quick 90-degree twist or a full 180-degree
                flip.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Engage the local encoder
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Press the primary rotation button to order your local machine to
                begin rendering a permanent version of your file using standard
                MP4 formatting. Wait patiently without closing the browser tab
                as the processor painstakingly writes every single frame into
                its new orientation, and then export the finalized file
                immediately to your desktop.
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
                  Rescuing sideways smartphone clips
                </h3>
                <p className="text-sm text-muted-foreground">
                  Everyday users often begin filming an incredible event while
                  holding their phone vertically, then quickly rotate it
                  horizontally mid-recording. Applying a hard 90-degree
                  clockwise encode permanently spins the painfully crooked final
                  footage so viewers don't have to tilt their physical monitors
                  to watch the action.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Flipping upside-down action cameras
                </h3>
                <p className="text-sm text-muted-foreground">
                  Cyclists occasionally have to mount bulky action cameras
                  entirely upside-down underneath their handlebars to fit
                  limited mounting space. Triggering the 180-degree rotation
                  flips the resulting high-speed footage completely right-side
                  up so the sky finally appears at the top of the video.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Erasing false rotation metadata tags
                </h3>
                <p className="text-sm text-muted-foreground">
                  Some Android phones attempt to be helpful by slapping a
                  digital "turn 90 degrees" sticker onto a video file, which
                  confuses desktop editing software. Passing the clip through a
                  tough local re-encoder burns the physical orientation into the
                  actual pixels, stripping the confusing metadata away forever.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Generating creative advertising assets
                </h3>
                <p className="text-sm text-muted-foreground">
                  Marketers handling long tracking shots of towering skyscrapers
                  occasionally want the video to playfully slide horizontally
                  across the viewer's screen for effect. Knocking the building
                  onto its side with a 90-degree spin creates an interesting,
                  disorienting scrolling effect perfect for social media
                  timelines.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Conforming digital sign packages
                </h3>
                <p className="text-sm text-muted-foreground">
                  Store owners deploying looping promotional videos to tall,
                  upright mall kiosks must ensure their horizontal MP4 files
                  properly fit the hardware. Throwing a quick 90-degree twist on
                  the landscape advertisement instantly changes the aspect ratio
                  to a 9:16 vertical pillar that perfectly matches the TV
                  screen.
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
                  <h3 className="font-bold text-lg">90° Clockwise</h3>
                  <p className="text-muted-foreground mt-2">
                    This setting forcefully turns the entire video one quarter
                    of a circle to the right. Use this common command when your
                    landscape footage loads upright as a skinny tower,
                    completely fixing the mistake while simultaneously reversing
                    the width and height dimensions.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">180° Inversion</h3>
                  <p className="text-muted-foreground mt-2">
                    This command tells the engine to flip the entire video frame
                    completely upside down. It leaves the foundational aspect
                    ratio and width pixel dimensions completely unchanged,
                    making it the perfect tool for correcting video recorded
                    holding a phone carelessly backwards.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">270° Clockwise</h3>
                  <p className="text-muted-foreground mt-2">
                    This option rotates the video three quarters of a circle to
                    the right, which acts exactly like turning the footage one
                    single quarter to the left. If a 90-degree clockwise turn
                    results in your footage laying face down in the dirt, click
                    this setting instead.
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
