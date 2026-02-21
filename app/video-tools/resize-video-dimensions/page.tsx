"use client";

import { useState, useRef } from 'react';
import { Conversion, Input, Output, Mp4OutputFormat, BufferTarget, BlobSource, ALL_FORMATS } from 'mediabunny';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Script from "next/script";

const faqData = [
  {
    question: "What is the difference between Fill, Contain, and Cover fit modes?",
    answer:
      "Fill stretches your video to exactly match the new dimensions regardless of aspect ratio. Contain shrinks or scales the video to fit inside the new dimensions while keeping the aspect ratio, adding black bars in empty areas. Cover scales the video so it fills the entire frame, cropping parts of the video that extend beyond the edges.",
  },
  {
    question: "How do I resize a video without distorting it?",
    answer:
      "Enable 'Maintain Aspect Ratio' and use the Contain fit mode. This ensures the video scales proportionally without stretching, filling any empty space with black bars.",
  },
  {
    question: "Can I resize a video to 1920x1080 (Full HD)?",
    answer:
      "Yes. Simply click the '1080p' quick preset, or manually type 1920 in the width field and 1080 in the height field.",
  },
  {
    question: "Will resizing a video to a larger size improve quality?",
    answer:
      "No. Upscaling beyond the original resolution does not add detail — it only stretches existing pixels. For true quality improvement, use the Video Quality Enhancer tool with a higher bitrate setting.",
  },
  {
    question: "What does maintaining the aspect ratio mean?",
    answer:
      "Aspect ratio is the proportional relationship between width and height (e.g., 16:9). When this option is enabled, changing the width automatically recalculates the correct height to preserve the original proportions.",
  },
  {
    question: "Can I resize a video to a vertical format for TikTok?",
    answer:
      "Yes. Enter a height greater than your width (e.g., 1080x1920 for 9:16) and use the Contain fit mode if your source is landscape video.",
  },
  {
    question: "Does resizing change the video duration?",
    answer:
      "No. Resizing only affects the visual dimensions of the video frame. The duration and audio remain unchanged.",
  },
  {
    question: "What formats does the resizer accept and output?",
    answer:
      "It accepts all major video formats (MP4, MOV, WebM, MKV) and outputs an MP4 file.",
  },
  {
    question: "Is there a minimum or maximum resolution I can resize to?",
    answer:
      "You can enter any width and height value above 1 pixel. For practical purposes, most browsers handle resolutions up to 4K (3840x2160) comfortably.",
  },
  {
    question: "Does this tool process my video on a server?",
    answer:
      "No. All video resizing happens in your browser. Your files are never uploaded or shared externally.",
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
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });
  const [newWidth, setNewWidth] = useState<number>(0);
  const [newHeight, setNewHeight] = useState<number>(0);
  const [fitMode, setFitMode] = useState<'fill' | 'contain' | 'cover'>('contain');
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
      '4K': { width: 3840, height: 2160 },
      '1080p': { width: 1920, height: 1080 },
      '720p': { width: 1280, height: 720 },
      '480p': { width: 854, height: 480 },
    };
    const dimensions = presets[preset];
    if (dimensions) {
      setNewWidth(dimensions.width);
      setNewHeight(dimensions.height);
    }
  };

  const handleResize = async () => {
    if (!videoFile || !newWidth || !newHeight) {
      setError('Please select a video and specify dimensions');
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
        throw new Error('Failed to get resized video buffer');
      }
      const resizedBlob = new Blob([resizedBuffer], { type: 'video/mp4' });
      const resizedUrl = URL.createObjectURL(resizedBlob);
      setOutputUrl(resizedUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resize video');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = `resized-${videoFile?.name || 'video.mp4'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const presets = ['4K', '1080p', '720p', '480p'];
  const fitModes: { mode: 'fill' | 'contain' | 'cover'; label: string; description: string }[] = [
    { mode: 'fill', label: 'Fill', description: 'Stretches video to fill dimensions (may distort)' },
    { mode: 'contain', label: 'Contain', description: 'Fits video within dimensions (may add black bars)' },
    { mode: 'cover', label: 'Cover', description: 'Crops video to cover dimensions (may cut edges)' },
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
                Change your video's width and height to any standard resolution or custom dimensions. Choose how your video fits the new frame with fill, contain, or cover modes — all in your browser.
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
                <h2 className="text-xl font-bold mb-6">Resize Video Dimensions</h2>

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
                              Original Dimensions: <span className="text-foreground font-medium">{videoDimensions.width} x {videoDimensions.height}</span>
                            </p>
                            {newWidth > 0 && newHeight > 0 && (
                              <p className="text-sm text-muted-foreground">
                                New Dimensions: <span className="text-green-600 dark:text-green-500 font-medium">{newWidth} x {newHeight}</span>
                              </p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Resize Settings */}
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">Resize Settings</h2>
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
                                value={newWidth || ''}
                                onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                                min={1}
                                className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="mb-1 block">Height (px)</Label>
                              <input
                                type="number"
                                value={newHeight || ''}
                                onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
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
                                  variant={fitMode === fit.mode ? 'default' : 'outline'}
                                  onClick={() => setFitMode(fit.mode)}
                                  className="flex-1 text-sm"
                                >
                                  {fit.label}
                                </Button>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {fitModes.find(f => f.mode === fitMode)?.description}
                            </p>
                          </div>

                          <Button
                            onClick={handleResize}
                            disabled={isProcessing || !newWidth || !newHeight}
                            className="w-full"
                          >
                            {isProcessing ? 'Processing...' : 'Resize Video'}
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
                                <h3 className="text-sm font-semibold mb-2">Result</h3>
                                <video
                                  src={outputUrl}
                                  controls
                                  className="w-full rounded-md bg-black aspect-video mb-3"
                                />
                              </div>
                              <Button onClick={handleDownload} className="w-full">
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
                What the Video Dimensions Resizer Does
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Video Dimensions Resizer lets you scale any video to a new width and height. You can choose from common presets like 4K (3840x2160), 1080p (1920x1080), 720p (1280x720), and 480p, or enter completely custom pixel dimensions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Three fit modes give you control over how your video adapts to the new frame: Fill stretches the video to exactly match (may distort), Contain fits the entire video within the frame with black bars if needed, and Cover fills the frame by cropping the edges. A maintain aspect ratio option automatically calculates the correct height when you change width, and vice versa.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How to Use Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Use the Tool</h2>
            <p className="mt-4 text-muted-foreground">
              Resize your video in 6 simple steps
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {[
              {
                step: "01",
                title: "Select Video",
                description: "Select your video file using the upload button",
              },
              {
                step: "02",
                title: "View Dimensions",
                description: "Your video loads with original dimensions displayed",
              },
              {
                step: "03",
                title: "Choose Preset",
                description: "Click a Quick Preset or manually enter custom dimensions",
              },
              {
                step: "04",
                title: "Set Fit Mode",
                description: "Toggle Maintain Aspect Ratio and select Fit Mode",
              },
              {
                step: "05",
                title: "Process",
                description: "Click 'Resize Video' to process your video",
              },
              {
                step: "06",
                title: "Download",
                description: "Download the resized output when complete",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                {index < 5 && (
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
              Everything you need to know about resizing videos
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
