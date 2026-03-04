"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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
    question: "How can I crop a video online free without watermarks?",
    answer:
      "You can crop a video online free using this tool, and it will never add a watermark to your final exported file. Because the processing is handled entirely by your own web browser, there are no hidden fees or premium tiers hiding the unwatermarked output. The video you encode is strictly yours to keep.",
  },
  {
    question:
      "Does drawing a crop box reduce the pixel quality of the remaining video?",
    answer:
      "No, the act of cropping simply discards the pixels sitting outside of your selected boundary without degrading the pixels contained within it. However, the final output file will naturally have a smaller total resolution than your original upload, meaning it will look blurrier if you attempt to stretch it back to a full screen size.",
  },
  {
    question: "Is there a limit to how small I can make the crop area?",
    answer:
      "The tool requires a minimum crop area of 1 pixel by 1 pixel, but practically, you should keep the width and height large enough to see your subject clearly. If you try to create a crop box that exceeds the bounds of the original video width or height, the tool will automatically snap the dimensions to fit within the secure boundary.",
  },
  {
    question:
      "What is the best way to remove black bars from the top and bottom of a movie?",
    answer:
      "To remove black letterboxing bars, play your video in the preview window until you find a brightly lit scene. Use your mouse to drag the blue crop handles inward just enough to cut out the black sections, then verify the preview canvas to ensure the crop matches the actual footage edges.",
  },
  {
    question: "Can anyone else view the private videos I upload to crop?",
    answer:
      "No one else can view your videos because the file never leaves your computer and is never transmitted across the internet to a server. The cropping engine runs entirely inside your local device's memory, guaranteeing absolute privacy for highly sensitive or unreleased footage.",
  },
  {
    question:
      "Why does the browser tab temporarily freeze while cropping a large 4K file?",
    answer:
      "Because this tool relies exclusively on your device's local hardware instead of a remote server farm, processing heavy 4K files demands significant memory and CPU power. Keep the browser tab open and actively focused to ensure the local encoding engine receives priority processing resources from your operating system.",
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

export default function CropVideoPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [cropArea, setCropArea] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartCoords, setDragStartCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setOutputUrl(null);
      setError(null);
      setCropArea({ left: 0, top: 0, width: 0, height: 0 });
      setVideoDimensions({ width: 0, height: 0 });
    }
  };

  const handleVideoLoaded = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      setVideoDimensions({
        width: video.videoWidth,
        height: video.videoHeight,
      });
      setCropArea({
        left: 0,
        top: 0,
        width: video.videoWidth,
        height: video.videoHeight,
      });
    }
  }, []);

  const drawCropRectangle = useCallback(() => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (
      videoDimensions.width === 0 ||
      videoDimensions.height === 0 ||
      cropArea.width === 0 ||
      cropArea.height === 0
    ) {
      return;
    }

    const scaleX = canvas.width / videoDimensions.width;
    const scaleY = canvas.height / videoDimensions.height;

    const displayLeft = cropArea.left * scaleX;
    const displayTop = cropArea.top * scaleY;
    const displayWidth = cropArea.width * scaleX;
    const displayHeight = cropArea.height * scaleY;

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, displayTop);
    ctx.fillRect(
      0,
      displayTop + displayHeight,
      canvas.width,
      canvas.height - (displayTop + displayHeight),
    );
    ctx.fillRect(0, displayTop, displayLeft, displayHeight);
    ctx.fillRect(
      displayLeft + displayWidth,
      displayTop,
      canvas.width - (displayLeft + displayWidth),
      displayHeight,
    );

    ctx.strokeStyle = "#3B82F6";
    ctx.lineWidth = 2;
    ctx.strokeRect(displayLeft, displayTop, displayWidth, displayHeight);
  }, [cropArea, videoDimensions]);

  useEffect(() => {
    drawCropRectangle();
  }, [drawCropRectangle]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (
        !canvasRef.current ||
        !videoRef.current ||
        videoDimensions.width === 0
      )
        return;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setIsDragging(true);
      setDragStartCoords({ x, y });

      const scaleX = videoRef.current.videoWidth / canvas.width;
      const scaleY = videoRef.current.videoHeight / canvas.height;

      setCropArea({
        left: Math.round(x * scaleX),
        top: Math.round(y * scaleY),
        width: 0,
        height: 0,
      });
    },
    [videoDimensions],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (
        !isDragging ||
        !dragStartCoords ||
        !canvasRef.current ||
        !videoRef.current
      )
        return;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const scaleX = videoRef.current.videoWidth / canvas.width;
      const scaleY = videoRef.current.videoHeight / canvas.height;

      const startX = dragStartCoords.x;
      const startY = dragStartCoords.y;
      const endX = currentX;
      const endY = currentY;

      let newLeft = Math.round(Math.min(startX, endX) * scaleX);
      let newTop = Math.round(Math.min(startY, endY) * scaleY);
      let newWidth = Math.round(Math.abs(endX - startX) * scaleX);
      let newHeight = Math.round(Math.abs(endY - startY) * scaleY);

      newLeft = Math.max(0, Math.min(newLeft, videoDimensions.width));
      newTop = Math.max(0, Math.min(newTop, videoDimensions.height));
      newWidth = Math.max(
        0,
        Math.min(newWidth, videoDimensions.width - newLeft),
      );
      newHeight = Math.max(
        0,
        Math.min(newHeight, videoDimensions.height - newTop),
      );

      setCropArea({
        left: newLeft,
        top: newTop,
        width: newWidth,
        height: newHeight,
      });
    },
    [isDragging, dragStartCoords, videoDimensions],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragStartCoords(null);
  }, []);

  const handleDimensionChange = (
    field: keyof typeof cropArea,
    value: number,
  ) => {
    setCropArea((prev) => ({ ...prev, [field]: value }));
  };

  const handleCrop = async () => {
    if (!videoFile || !cropArea.width || !cropArea.height) {
      setError("Please select a video and define a crop area");
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
          crop: cropArea,
        },
      });

      conversion.onProgress = (progressValue: number) => {
        setProgress(Math.round(progressValue * 100));
      };

      await conversion.execute();

      const croppedBuffer = output.target.buffer;
      if (!croppedBuffer) {
        throw new Error("Failed to get cropped video buffer");
      }
      const croppedBlob = new Blob([croppedBuffer], { type: "video/mp4" });
      const croppedUrl = URL.createObjectURL(croppedBlob);
      setOutputUrl(croppedUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to crop video");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `cropped-${videoFile?.name || "video.mp4"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const relatedTools = [
    {
      name: "Change Video FPS",
      description: "Change video frame rate online - 24fps, 30fps, 60fps",
      href: "/video-tools/change-video-fps",
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
                Online Video Cropper – Crop and Reframe Videos in Your Browser
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Precisely crop any video to remove black bars, reframe your
                shot, or prepare footage for social media. Draw your crop area
                visually or enter exact pixel values — no software needed.
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
                <h2 className="text-xl font-bold mb-6">Crop Video</h2>

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
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground mb-2">
                              Drag on the canvas to select the crop area.
                            </p>
                            <canvas
                              ref={canvasRef}
                              width={400}
                              height={
                                videoDimensions.width > 0
                                  ? (400 / videoDimensions.width) *
                                  videoDimensions.height
                                  : 300
                              }
                              onMouseDown={handleMouseDown}
                              onMouseMove={handleMouseMove}
                              onMouseUp={handleMouseUp}
                              onMouseLeave={handleMouseUp}
                              className="border-2 border-primary rounded-md cursor-crosshair w-full"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              Current crop: (L:{cropArea.left}, T:{cropArea.top}
                              , W:{cropArea.width}, H:{cropArea.height})
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Crop Settings */}
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">
                          Crop Settings
                        </h2>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="mb-1 block">Left (px)</Label>
                              <input
                                type="number"
                                value={cropArea.left}
                                onChange={(e) =>
                                  handleDimensionChange(
                                    "left",
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                min={0}
                                max={videoDimensions.width}
                                className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="mb-1 block">Top (px)</Label>
                              <input
                                type="number"
                                value={cropArea.top}
                                onChange={(e) =>
                                  handleDimensionChange(
                                    "top",
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                min={0}
                                max={videoDimensions.height}
                                className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="mb-1 block">Width (px)</Label>
                              <input
                                type="number"
                                value={cropArea.width}
                                onChange={(e) =>
                                  handleDimensionChange(
                                    "width",
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                min={1}
                                max={videoDimensions.width - cropArea.left}
                                className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="mb-1 block">Height (px)</Label>
                              <input
                                type="number"
                                value={cropArea.height}
                                onChange={(e) =>
                                  handleDimensionChange(
                                    "height",
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                min={1}
                                max={videoDimensions.height - cropArea.top}
                                className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                          </div>

                          <div className="text-sm text-muted-foreground">
                            <p>
                              Original: {videoDimensions.width} x{" "}
                              {videoDimensions.height}
                            </p>
                            <p>
                              Cropped: {cropArea.width} x {cropArea.height}
                            </p>
                          </div>

                          <Button
                            onClick={handleCrop}
                            disabled={
                              isProcessing ||
                              cropArea.width === 0 ||
                              cropArea.height === 0
                            }
                            className="w-full"
                          >
                            {isProcessing ? "Processing..." : "Crop Video"}
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
                                Download Cropped Video
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
                When you record a beautiful moment but realize there are
                distracting elements on the edges of the frame, you can crop
                video online free to instantly isolate the subject. This tool
                visually cuts away the unwanted outer borders of your footage,
                narrowing the visible viewing area exactly to your
                specifications. Unlike complex editor programs, it handles the
                framing adjustment locally in your browser so you do not have to
                endure long upload times or risk your privacy on third-party
                servers.
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
                Import your footage
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Select the target video from your device to instantly load it
                into the local preview player. Because this is an entirely
                client-side application, the video will appear immediately
                without uploading, allowing you to quickly scrub through the
                timeline to find the perfect frame to use as a visual reference
                for your adjustments.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Define the viewing area
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Use your mouse to click and drag a blue rectangle precisely over
                the portion of the video you want to keep. The darkened overlay
                will show exactly what will be deleted, and you can fine-tune
                the exact pixel coordinates on the right side if you are trying
                to match a strict platform ratio.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Process the new frame
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click the crop button to instruct your browser to securely
                re-encode the video file, stripping away the discarded pixels
                from every single frame. Once the progress bar reaches 100%,
                review the isolated clip in the results panel and download the
                new MP4 directly to your immediate storage folder.
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
                  Reframing for vertical social media
                </h3>
                <p className="text-sm text-muted-foreground">
                  When marketing teams want to post an older landscape
                  commercial to TikTok, they have to crop the video into a
                  vertical 9:16 layout. Dragging a tall, thin box over the main
                  actor ensures the core message survives the shift to a mobile
                  environment without awkward horizontal shrinking.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Removing embedded watermarks</h3>
                <p className="text-sm text-muted-foreground">
                  If a downloaded stock video features a distracting logo
                  burning permanently into the bottom right corner, trimming the
                  visual bounds solves the problem. Carefully slicing that
                  specific corner out of the frame leaves a clean video canvas
                  ready for professional editing workflows.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Eliminating cinematic letterboxing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Many ripped movie trailers come with thick, hardcoded black
                  bars slapped onto the top and bottom of the file. Narrowing
                  the video crop area securely shaves these bars entirely off
                  the file, preventing your website's video player from
                  displaying an ugly double-letterbox effect on mobile screens.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Isolating a specific interview subject
                </h3>
                <p className="text-sm text-muted-foreground">
                  When a wide webcam recording shows too much messy bedroom
                  background during an important podcast guest appearance,
                  slicing the frame down to just the speaker improves the
                  presentation. Removing the background clutter redirects all
                  the viewer's attention directly onto the person speaking.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Creating matching square feeds
                </h3>
                <p className="text-sm text-muted-foreground">
                  Social media managers overseeing grid-style profile layouts
                  frequently need to crop rectangular event footage into a
                  perfect 1:1 square. Adjusting the pixel width and height to
                  matching values creates a perfectly symmetrical block that
                  slots flawlessly into a curated photo feed.
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
                  <h3 className="font-bold text-lg">Visual Drag Canvas</h3>
                  <p className="text-muted-foreground mt-2">
                    This interactive preview screen lets you rely entirely on
                    your eyes to draw a blue rectangle over the video. The
                    brighter inner section represents the video you will keep,
                    while the heavily dimmed outer perimeter indicates the
                    pixels that will be permanently deleted from the resulting
                    output file.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    Left and Top Positioning
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    These number boxes define the exact starting coordinates of
                    your target box, measured from the top-left corner of the
                    original video. If you are a developer looking to cleanly
                    cut the left half of a 1920x1080 screen recording, setting
                    Left to 960 will cleanly sever the image exactly in half.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    Width and Height Dimensions
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    These inputs dictate the final total resolution of the newly
                    trimmed video file at the end of the extraction process. If
                    you want to guarantee a perfectly square video upload for
                    platforms like Instagram, you must ensure both of these
                    numbers are absolutely identical before hitting the process
                    button.
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
