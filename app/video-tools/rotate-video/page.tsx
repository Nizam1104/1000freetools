"use client";

import { useState, useRef } from 'react';
import { Conversion, Input, Output, Mp4OutputFormat, BufferTarget, BlobSource, ALL_FORMATS } from 'mediabunny';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Script from "next/script";

const faqData = [
  {
    question: "Why does my phone video appear sideways even though it looked fine while recording?",
    answer:
      "Phones store rotation information as metadata, but some video players and platforms ignore that metadata and play the raw frame orientation instead. Rotating the actual pixels with this tool permanently fixes the orientation for all players.",
  },
  {
    question: "What's the difference between 90° clockwise and 270° clockwise?",
    answer:
      "90° clockwise turns a portrait (vertical) video into landscape orientation rotating to the right. 270° clockwise (or 90° counter-clockwise) rotates to the left — useful if your video was recorded with the phone rotated the other way.",
  },
  {
    question: "Does rotating a video reduce its quality?",
    answer:
      "The tool re-encodes the video, which involves a small amount of standard MP4 compression. Visual quality is preserved as closely as possible, but like any re-encode, there is a minimal generation loss.",
  },
  {
    question: "Can I rotate a video 180 degrees to flip it upside down?",
    answer:
      "Yes. Select the 180° option to completely invert the video orientation — useful for footage recorded with a camera mounted upside down.",
  },
  {
    question: "Will rotation change my video's aspect ratio?",
    answer:
      "Yes, for 90° and 270° rotations. A 1920x1080 (landscape) video becomes 1080x1920 (portrait) after a 90° rotation, as width and height swap. A 180° rotation keeps the same dimensions.",
  },
  {
    question: "Does this tool add a watermark to rotated videos?",
    answer:
      "No. There is no watermark added at any time. Your output video is clean and ready to publish.",
  },
  {
    question: "What video formats can I rotate?",
    answer:
      "You can upload MP4, MOV, WebM, MKV, and other common video formats. The output is always MP4.",
  },
  {
    question: "Is my video kept private when I use this tool?",
    answer:
      "Yes. All video processing runs inside your browser. Your video file is never uploaded to any server.",
  },
  {
    question: "Can I flip a video horizontally or vertically with this tool?",
    answer:
      "This tool specifically handles rotation (90°/180°/270°). Horizontal and vertical flipping are separate operations not included in this particular tool.",
  },
  {
    question: "How long does it take to rotate a video?",
    answer:
      "Processing time depends on video length, resolution, and your device's performance. Short clips at standard resolutions typically process in seconds.",
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
      setError('Please select a video and choose a rotation angle');
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
        throw new Error('Failed to get rotated video buffer');
      }
      const rotatedBlob = new Blob([rotatedBuffer], { type: 'video/mp4' });
      const rotatedUrl = URL.createObjectURL(rotatedBlob);
      setOutputUrl(rotatedUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rotate video');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = `rotated-${rotation}-${videoFile?.name || 'video.mp4'}`;
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
    { degrees: 90, label: '90° Clockwise', icon: '↻' },
    { degrees: 180, label: '180°', icon: '↻↻' },
    { degrees: 270, label: '270° Clockwise', icon: '↺' },
    { degrees: 0, label: 'Reset', icon: '↶' },
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
                Fix sideways or upside-down videos instantly. Rotate your footage clockwise or counter-clockwise in exact 90-degree increments — no apps, no watermarks, no uploads to servers.
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
                              Rotation: <span className="text-foreground font-medium">{rotation}°</span>
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Rotation Settings */}
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">Rotation Settings</h2>
                        <div className="space-y-4">
                          {/* Rotation Buttons */}
                          <div>
                            <Label className="mb-2 block">Select Rotation Angle</Label>
                            <div className="grid grid-cols-2 gap-2">
                              {rotationOptions.map((option) => (
                                <Button
                                  key={option.degrees}
                                  variant={rotation === option.degrees ? 'default' : 'outline'}
                                  onClick={() => handleRotationChange(option.degrees as 0 | 90 | 180 | 270)}
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
                              <Button variant="outline" onClick={handleReset} className="flex-1">
                                Reset
                              </Button>
                              <Button
                                onClick={handleRotate}
                                disabled={isProcessing || rotation === 0}
                                className="flex-1"
                              >
                                {isProcessing ? 'Processing...' : 'Rotate Video'}
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
                What the Video Rotator Does
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Video Rotator permanently rotates the pixel content of your video by 90°, 180°, or 270° clockwise. Unlike some tools that only add rotation metadata (which some players ignore), this tool actually re-encodes the frames at the correct orientation so your video looks right in every player and on every platform.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                It's the perfect fix for phone videos recorded in the wrong orientation, drone footage exported sideways, or screen recordings that came out upside down.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How to Use Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Use the Tool</h2>
            <p className="mt-4 text-muted-foreground">
              Rotate your video in 5 simple steps
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {[
              {
                step: "01",
                title: "Select Video",
                description: "Click 'Select Video' to choose your video file",
              },
              {
                step: "02",
                title: "Preview Loads",
                description: "Your original video appears in the preview on the left",
              },
              {
                step: "03",
                title: "Choose Angle",
                description: "Select 90° Clockwise, 180°, or 270° Clockwise",
              },
              {
                step: "04",
                title: "Process",
                description: "Click 'Rotate Video' to process your video",
              },
              {
                step: "05",
                title: "Download",
                description: "Preview the rotated output and download",
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
              Everything you need to know about rotating videos
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
