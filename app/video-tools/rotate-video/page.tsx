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
    question: "How do I permanently fix a sideways video without watermarks?",
    answer:
      "Load your video into the tool, select the 90-degree clockwise or counter-clockwise option, and click Rotate Video. The encoder rewrites every frame in the new orientation and produces a standard MP4 file. The rotation is burned into the pixel data, not stored as a metadata tag, so the file plays correctly on every platform. No watermarks are added because all processing happens on your device at no cost.",
  },
  {
    question: "Why did my phone record the video sideways to begin with?",
    answer:
      "Smartphones record video based on the position of the device at the moment you start recording. If the gyroscope detected landscape mode, the video data is stored horizontally. Some phones attach a metadata rotation tag that tells compatible apps to display it upright, but many websites, video editors, and social platforms ignore that tag and play the raw data orientation instead.",
  },
  {
    question:
      "What is the difference between rotating 90 degrees and 270 degrees?",
    answer:
      "Rotating 90 degrees clockwise spins the video one quarter turn to the right. The top edge of the original image becomes the right edge of the output. Rotating 270 degrees clockwise produces the opposite result, which is the same as rotating 90 degrees counter-clockwise. The top edge of the original image becomes the left edge of the output.",
  },
  {
    question: "Does rotating a 1920x1080 video change its file dimensions?",
    answer:
      "Yes. When you rotate a 1920x1080 video by 90 degrees, the output dimensions become 1080x1920 because the width and height swap. The encoder recalculates the pixel grid to fit the new orientation. A 180-degree rotation keeps the same 1920x1080 dimensions because the image flips upside down without swapping the sides.",
  },
  {
    question: "Can this tool flip a video as a mirror image?",
    answer:
      "No. This tool rotates video in 90-degree increments around the center axis. A mirror flip inverts pixels horizontally or vertically, which is a different operation. You would need a video editor that supports horizontal or vertical flip to achieve a mirror image effect.",
  },
  {
    question:
      "Is this rotation permanent or does it only apply during playback?",
    answer:
      "The rotation is permanent. The encoder reads every frame, rotates the pixel grid to the new orientation, and writes the result into a new MP4 file. This is different from apps that add a rotation metadata tag. A metadata tag only works if the player reads and respects it. This tool changes the actual pixel data, so the video displays correctly in every player and platform regardless of metadata support.",
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
                Rotate Video Online Free – Fix Sideways and Upside-Down Videos
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Permanently fix video orientation by rotating 90, 180, or 270
                degrees. The rotation is written into the pixel data, not just
                the metadata. Your video will play correctly on every device,
                app, and platform. No uploads, no watermarks, and no software.
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
                This tool permanently rotates the pixel data inside your video
                file. Most phones and cameras store video in a fixed orientation
                and use a metadata rotation tag to tell compatible players how
                to display it. Many platforms and video editors ignore that tag
                and play the raw data, causing the video to appear sideways or
                upside down. This encoder reads every frame, rotates the actual
                pixel grid by the angle you choose, and writes a new MP4 where
                the orientation is correct at the data level. The entire process
                runs in your browser so no file is uploaded to any server.
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
                Load the video file
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Open the file picker and select your MP4, MOV, or other video
                file. The player shows the video in its raw data orientation. If
                your phone recorded it sideways and added a metadata rotation
                tag, the player may show it correctly here, but many platforms
                will ignore that tag. The encoder fixes the actual pixel data
                regardless.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Pick the rotation angle
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Select 90 degrees clockwise to rotate the video one quarter turn
                to the right. Select 180 degrees to flip the video upside down.
                Select 270 degrees clockwise, which is the same as 90 degrees
                counter-clockwise, to rotate one quarter turn to the left. If
                you are unsure, try 90 degrees first and re-process if needed.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Process and save the file
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click the Rotate Video button and wait for the progress bar to
                reach 100%. The encoder processes each frame and writes the
                rotated pixels into a new MP4. Keep the tab open during
                processing. When it finishes, click the download button to save
                the corrected file to your device.
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
                  Fixing sideways smartphone recordings
                </h3>
                <p className="text-sm text-muted-foreground">
                  You start recording in portrait mode, rotate the phone to
                  landscape, and stop. The resulting video often has the wrong
                  orientation when you upload it to a website. Select 90 degrees
                  clockwise and process the file. The output plays correctly in
                  every browser and social media player without the viewer
                  needing to tilt their screen.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Correcting upside-down action camera footage
                </h3>
                <p className="text-sm text-muted-foreground">
                  Some handlebar and helmet mounts require mounting a camera
                  upside down to get the right angle. The recorded video appears
                  flipped. Select 180 degrees to correct it. The encoder rotates
                  every frame and the output shows the road or scene in the
                  correct upright position.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Removing problematic metadata rotation tags
                </h3>
                <p className="text-sm text-muted-foreground">
                  Some cameras embed a rotation tag in the video metadata rather
                  than storing the image in the correct orientation. Video
                  editors like DaVinci Resolve or Premiere Pro may ignore this
                  tag and import the footage sideways. Running it through this
                  tool encodes the correct orientation into the pixel data and
                  removes the dependency on the metadata tag.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Preparing video for vertical digital signage
                </h3>
                <p className="text-sm text-muted-foreground">
                  Retail displays and kiosk screens are often mounted vertically
                  in portrait orientation. If your promotional video is a
                  standard 1920x1080 horizontal clip, select 90 degrees to
                  rotate it. The output becomes 1080x1920, which fills the kiosk
                  screen without black bars on the sides.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Pre-processing clips for a video editor
                </h3>
                <p className="text-sm text-muted-foreground">
                  When building a timeline in a video editor, mixing clips with
                  different orientations creates layout problems. Rotate each
                  sideways clip before importing so every file enters the editor
                  with consistent horizontal orientation. This lets you set one
                  sequence resolution and avoid per-clip transform corrections
                  inside the editor.
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
                  <h3 className="font-bold text-lg">90 Degrees Clockwise</h3>
                  <p className="text-muted-foreground mt-2">
                    This rotates the video one quarter turn to the right. The
                    top edge of the original image becomes the right edge of the
                    output. The output dimensions swap: a 1920x1080 source
                    produces a 1080x1920 output. Use this when a video recorded
                    in landscape plays as a tall vertical strip.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">180 Degrees</h3>
                  <p className="text-muted-foreground mt-2">
                    This rotates the video half a turn and flips the image
                    upside down. The top edge becomes the bottom edge and the
                    left edge becomes the right edge. The output dimensions
                    remain the same as the source. Use this when an action
                    camera mounted upside down records the sky at the bottom of
                    the frame.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">270 Degrees Clockwise</h3>
                  <p className="text-muted-foreground mt-2">
                    This rotates three quarter turns to the right, which is
                    equivalent to one quarter turn to the left. The top edge of
                    the original image becomes the left edge of the output.
                    Output dimensions swap from the source. Use this when 90
                    degrees clockwise produces the wrong result and you need the
                    rotation in the opposite direction.
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
