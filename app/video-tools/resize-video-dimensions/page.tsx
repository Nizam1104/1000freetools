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
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Script from "next/script";

const faqData = [
  {
    question: "How can I resize video free online without losing quality?",
    answer:
      "You can resize video free online right inside your browser window without paying any premium fees. Since your device processes the actual video shrinking locally, it bypasses cloud server requirements, keeping the tool free while ensuring your original file quality isn't compromised by forced server-side compression blocks.",
  },
  {
    question: "What exactly do the Fill, Contain, and Cover scaling modes do?",
    answer:
      "If your target resolution doesn't match your original video shape, you have three options. Fill forcefully stretches the image to fit the new box, potentially warping objects. Contain safely shrinks the video until it fits, generating harmless black bars in the leftover empty space. Cover forcefully zooms the video in until it fills the entire frame, actively cropping away footage that spills outside the boundaries.",
  },
  {
    question:
      "Will typing in a huge 4K pixel size actually make my clip look better?",
    answer:
      "No, stretching a small video into a massive 3840x2160 pixel box does not magically invent high-definition details that were never captured by your camera. It simply pulls the existing pixels further apart, which often makes low-resolution footage look considerably softer or chunkier.",
  },
  {
    question:
      "Why does the height number change automatically when I type a new width?",
    answer:
      "When 'Maintain Aspect Ratio' is turned on, the calculator mechanically locks the proportional relationship between the width and the height. If you cut the total width exactly in half, the tool instantly cuts the height exactly in half to prevent your video subject from looking squished or stretched.",
  },
  {
    question: "Can anyone else download the private footage I upload here?",
    answer:
      "Nobody else can download or even view your video because it never leaves your physical hard drive. The application's encoding engine downloads directly to your device memory and executes the resizing locally, guaranteeing complete privacy for sensitive or unreleased recordings.",
  },
  {
    question:
      "Why does converting a 1080p clip down to 720p take so long on my laptop?",
    answer:
      "To reduce video file size, this browser application must completely deconstruct your original file, recalculate the mathematical pixel values for every single frame to create the smaller size, and then bind it back together into a brand new MP4 file. This demands heavy processing power, so keeping your browser tab focused ensures your operating system allocates maximum power to the task.",
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

export default function ResizeVideoDimensionsPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [newWidth, setNewWidth] = useState<number>(0);
  const [newHeight, setNewHeight] = useState<number>(0);
  const [fitMode, setFitMode] = useState<"fill" | "contain" | "cover">(
    "contain",
  );
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
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
      setNewWidth(0);
      setNewHeight(0);
    }
  };

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const width = video.videoWidth;
      const height = video.videoHeight;
      setVideoDimensions({ width, height });
      setNewWidth(width);
      setNewHeight(height);
    }
  };

  const handleWidthChange = (value: number) => {
    setNewWidth(value);
    if (maintainAspectRatio && videoDimensions.height > 0) {
      const aspectRatio = videoDimensions.height / videoDimensions.width;
      setNewHeight(Math.round(value * aspectRatio));
    }
  };

  const handleHeightChange = (value: number) => {
    setNewHeight(value);
    if (maintainAspectRatio && videoDimensions.width > 0) {
      const aspectRatio = videoDimensions.width / videoDimensions.height;
      setNewWidth(Math.round(value * aspectRatio));
    }
  };

  const handlePresetClick = (preset: string) => {
    const presets: Record<string, { width: number; height: number }> = {
      "4K": { width: 3840, height: 2160 },
      "1080p": { width: 1920, height: 1080 },
      "720p": { width: 1280, height: 720 },
      "480p": { width: 854, height: 480 },
    };
    const dimensions = presets[preset];
    if (dimensions) {
      setNewWidth(dimensions.width);
      setNewHeight(dimensions.height);
    }
  };

  const handleResize = async () => {
    if (!videoFile || !newWidth || !newHeight) {
      setError("Please select a video and specify dimensions");
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
          width: newWidth,
          height: newHeight,
          fit: fitMode,
        },
      });

      conversion.onProgress = (progressValue: number) => {
        setProgress(Math.round(progressValue * 100));
      };

      await conversion.execute();

      const resizedBuffer = output.target.buffer;
      if (!resizedBuffer) {
        throw new Error("Failed to get resized video buffer");
      }
      const resizedBlob = new Blob([resizedBuffer], { type: "video/mp4" });
      const resizedUrl = URL.createObjectURL(resizedBlob);
      setOutputUrl(resizedUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resize video");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `resized-${videoFile?.name || "video.mp4"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const presets = ["4K", "1080p", "720p", "480p"];
  const fitModes: {
    mode: "fill" | "contain" | "cover";
    label: string;
    description: string;
  }[] = [
    {
      mode: "fill",
      label: "Fill",
      description: "Stretches video to fill dimensions (may distort)",
    },
    {
      mode: "contain",
      label: "Contain",
      description: "Fits video within dimensions (may add black bars)",
    },
    {
      mode: "cover",
      label: "Cover",
      description: "Crops video to cover dimensions (may cut edges)",
    },
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
                Video Dimensions Resizer – Scale Video to Any Resolution Online
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Change your video's width and height to any standard resolution
                or custom dimensions. Choose how your video fits the new frame
                with fill, contain, or cover modes — all in your browser.
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
                  Resize Video Dimensions
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
                        <video
                          ref={videoRef}
                          src={videoUrl}
                          onLoadedMetadata={handleVideoLoaded}
                          controls
                          className="w-full rounded-md bg-black aspect-video"
                        />

                        {videoDimensions.width > 0 && (
                          <div className="mt-4 p-3 bg-muted rounded-md space-y-2">
                            <p className="text-sm text-muted-foreground">
                              Original Dimensions:{" "}
                              <span className="text-foreground font-medium">
                                {videoDimensions.width} x{" "}
                                {videoDimensions.height}
                              </span>
                            </p>
                            {newWidth > 0 && newHeight > 0 && (
                              <p className="text-sm text-muted-foreground">
                                New Dimensions:{" "}
                                <span className="text-green-600 dark:text-green-500 font-medium">
                                  {newWidth} x {newHeight}
                                </span>
                              </p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Resize Settings */}
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">
                          Resize Settings
                        </h2>
                        <div className="space-y-4">
                          {/* Preset Buttons */}
                          <div>
                            <Label className="mb-2 block">Quick Presets</Label>
                            <div className="flex flex-wrap gap-2">
                              {presets.map((preset) => (
                                <Button
                                  key={preset}
                                  variant="outline"
                                  onClick={() => handlePresetClick(preset)}
                                  className="text-sm"
                                >
                                  {preset}
                                </Button>
                              ))}
                            </div>
                          </div>

                          {/* Custom Dimensions */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="mb-1 block">Width (px)</Label>
                              <input
                                type="number"
                                value={newWidth || ""}
                                onChange={(e) =>
                                  handleWidthChange(
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                min={1}
                                className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="mb-1 block">Height (px)</Label>
                              <input
                                type="number"
                                value={newHeight || ""}
                                onChange={(e) =>
                                  handleHeightChange(
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                min={1}
                                className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                          </div>

                          {/* Aspect Ratio Toggle */}
                          <div className="flex items-center gap-2">
                            <Switch
                              id="aspect-ratio"
                              checked={maintainAspectRatio}
                              onCheckedChange={setMaintainAspectRatio}
                            />
                            <Label htmlFor="aspect-ratio" className="text-sm">
                              Maintain Aspect Ratio
                            </Label>
                          </div>

                          {/* Fit Mode */}
                          <div>
                            <Label className="mb-2 block">Fit Mode</Label>
                            <div className="flex gap-2">
                              {fitModes.map((fit) => (
                                <Button
                                  key={fit.mode}
                                  variant={
                                    fitMode === fit.mode ? "default" : "outline"
                                  }
                                  onClick={() => setFitMode(fit.mode)}
                                  className="flex-1 text-sm"
                                >
                                  {fit.label}
                                </Button>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {
                                fitModes.find((f) => f.mode === fitMode)
                                  ?.description
                              }
                            </p>
                          </div>

                          <Button
                            onClick={handleResize}
                            disabled={isProcessing || !newWidth || !newHeight}
                            className="w-full"
                          >
                            {isProcessing ? "Processing..." : "Resize Video"}
                          </Button>

                          {/* Progress Bar */}
                          {isProcessing && (
                            <div className="space-y-2">
                              <Progress value={progress} className="h-2" />
                              <p className="text-center text-sm text-muted-foreground">
                                {progress}% complete
                              </p>
                            </div>
                          )}

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
                                Download Resized Video
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
                When a social media platform rejects your upload because the
                resolution is too high or low, you can completely resize video
                free online directly from your browser. This tool physically
                changes the vertical and horizontal pixel measurements of your
                file to shrink massive 4K recordings into manageable web clips,
                or adapt landscape footage into vertical reels. Because all
                rendering happens locally on your own hardware, you do not have
                to wait for large files to upload to a remote server.
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
                Define the new pixel counts
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                After pulling a video clip directly into the browser tool, look
                at the displayed original resolution for context before applying
                a smaller scaling preset like 720p or 480p. If you are targeting
                a very specific digital billboard or display screen, leave the
                preset section alone and manually type the precise pixel width
                and height you require into the custom dimension boxes.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Manage the aspect framing
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                If the new width and height you typed do not neatly match the
                original rectangular shape of your video, you must choose a fit
                mode to tell the encoder what to do. Choose "Contain" if you
                want to protect the entire image by adding black borders around
                it, or choose "Cover" to aggressively zoom the footage to fill
                the dead space, clipping off the edges.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Queue the conversion engine
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click the resize button to engage your processor, which will
                immediately begin mapping the old pixels into your new requested
                boundary dimensions frame by frame. Since reducing a 4K movie
                into a standard MP4 file requires intensive computation, do not
                close the browser tab until the progress hits 100% and hands you
                the final download link.
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
                  Bypassing platform upload restrictions
                </h3>
                <p className="text-sm text-muted-foreground">
                  When trying to post a high-end 4K drone recording to a rigid
                  forum that strictly enforces a maximum 1080p limit, users are
                  immediately stopped. Slapping the 1080p preset cleanly scales
                  the massive file down into the allowed threshold, letting you
                  upload to older platforms without encountering frustrating
                  error messages.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Conforming mixed smartphone footage
                </h3>
                <p className="text-sm text-muted-foreground">
                  Video editors often receive a terrible mix of 720p, 1080p, and
                  4K random clips when crowdsourcing fan footage for a music
                  video. Utilizing manual width and height inputs forces every
                  single clip into the exact same 1920x1080 box, preventing
                  messy timeline errors in professional video editing software.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Converting landscape movies into Reels
                </h3>
                <p className="text-sm text-muted-foreground">
                  Social media managers promoting a standard horizontal YouTube
                  video must aggressively resize the file to fit inside an
                  upright smartphone screen. Swapping the dimensions to
                  1080x1920 and using the Cover fit mode instantly slices the
                  sides off the video, transforming it into a perfect,
                  screen-filling vertical hook.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Drastically shrinking final file sizes
                </h3>
                <p className="text-sm text-muted-foreground">
                  Real estate agents sending giant property walkthrough videos
                  over basic email attachments frequently hit server rejection
                  limits due to massive Mb file sizes. Pulling the footage
                  completely down to the 480p preset destroys the heavy HD data
                  blocks, creating a blurry but tiny file that easily clears
                  strict email limits.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Designing custom website background loops
                </h3>
                <p className="text-sm text-muted-foreground">
                  Web developers building a uniquely slim hero banner on a
                  landing page cannot use a standard 16:9 video because it will
                  overlap the lower content. Turning off aspect ratio locks and
                  typing in a custom 1920x400 dimension mathematically flattens
                  the video into an ultra-wide, panoramic slit that sits
                  perfectly under the navigation bar.
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
                  <h3 className="font-bold text-lg">Target Height and Width</h3>
                  <p className="text-muted-foreground mt-2">
                    These numbers dictate the exact pixel boundaries of the
                    final exported file. Standard widescreen videos are usually
                    1920 pixels wide and 1080 pixels tall, but if you need to
                    create a perfectly square video block for a specific profile
                    picture avatar, you would type identical numbers into both
                    boxes.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    Maintain Aspect Ratio Toggle
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    This safety mechanism binds the width and height boxes
                    together so they maintain their original geometric
                    relationship. Keeping it enabled prevents your video from
                    looking accidentally stretched out or severely squished flat
                    when you try to change just one measurement by mistake.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Fit Mode Selector</h3>
                  <p className="text-muted-foreground mt-2">
                    When squeezing a rectangular video into a square box, the
                    application needs permission on how to handle the mismatch.
                    Selecting "Contain" prioritizes keeping everything visible
                    by heavily bordering the top and bottom with thick black
                    bars, while selecting "Fill" will ruthlessly stretch the
                    image to fit the box, warping faces and circles.
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
