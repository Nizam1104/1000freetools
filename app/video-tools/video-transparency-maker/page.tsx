"use client";

import { useState, useRef } from 'react';
import { Conversion, Input, Output, Mp4OutputFormat, BufferTarget, BlobSource, ALL_FORMATS } from 'mediabunny';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Script from "next/script";

const faqData = [
  {
    question: "What does video opacity/transparency mean?",
    answer:
      "Opacity controls how see-through your video appears. At full opacity (1.0), the video looks normal. At 50% opacity (0.5), the background color shows through the video at half strength. At 0, the video is invisible and only the background shows.",
  },
  {
    question: "Does MP4 support true alpha transparency?",
    answer:
      "Standard MP4 does not support alpha channel transparency like WebM VP8/VP9 or MOV with ProRes 4444. This tool composites your transparent video over a chosen background color, baking the result into a standard opaque MP4. For true alpha transparency, consider exporting to WebM format using a dedicated tool.",
  },
  {
    question: "What can I use video transparency for?",
    answer:
      "Common uses include creating ghost/fade effects, preparing overlay footage for video editors, making dream-sequence or memory flashback effects, and producing stylized content where video is intentionally blended with a color field.",
  },
  {
    question: "Can I preview the transparency before processing the whole video?",
    answer:
      "You can preview the settings in real time by toggling 'Show Background Preview' before processing. After processing, the before/after player toggle lets you compare original and transparent versions.",
  },
  {
    question: "What background color should I choose?",
    answer:
      "It depends on your use case. Black (default) is standard for dark blending effects. White works for faded, washed-out looks. Green or blue can be used for chroma key reference workflows. Any custom hex color is supported.",
  },
  {
    question: "Will the audio be affected by the transparency setting?",
    answer:
      "No. Opacity changes only affect the video stream. Your audio track is preserved and passed through unchanged.",
  },
  {
    question: "What video formats are supported?",
    answer:
      "The tool accepts all major video formats (MP4, MOV, WebM, MKV) and outputs an MP4 file.",
  },
  {
    question: "Is my video uploaded to process transparency?",
    answer:
      "No. All processing happens locally in your browser. Your video is never sent to any external server or service.",
  },
  {
    question: "What opacity value gives a subtle ghost effect?",
    answer:
      "Values between 0.3 and 0.6 typically give a visible but translucent ghost-like appearance. The exact value depends on the background color you choose and the brightness of your footage.",
  },
  {
    question: "Can I use this to create a double exposure effect?",
    answer:
      "Partially. Setting a low opacity blends your video over a solid background color. For true double exposure with another video, you would need a video editing application that supports blend modes on multiple layers.",
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

export default function VideoTransparencyMakerPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'original' | 'transparent'>('original');

  const [opacity, setOpacity] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [showBackground, setShowBackground] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const transparentVideoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setOutputUrl(null);
      setError(null);
      setPreviewMode('original');
      setOpacity(1);
      setBackgroundColor('#000000');
      setShowBackground(true);
    }
  };

  const handleTransparency = async () => {
    if (!videoFile) {
      setError('Please select a video to process');
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

      let transparencyCanvas: OffscreenCanvas | null = null;
      let transparencyCtx: OffscreenCanvasRenderingContext2D | null = null;

      const conversion = await Conversion.init({
        input,
        output,
        video: {
          process: async (sample) => {
            if (!transparencyCanvas) {
              transparencyCanvas = new OffscreenCanvas(sample.displayWidth, sample.displayHeight);
              transparencyCtx = transparencyCanvas.getContext('2d');
            }

            if (transparencyCanvas && transparencyCtx) {
              transparencyCtx.clearRect(0, 0, transparencyCanvas.width, transparencyCanvas.height);

              if (showBackground) {
                transparencyCtx.fillStyle = backgroundColor;
                transparencyCtx.fillRect(0, 0, transparencyCanvas.width, transparencyCanvas.height);
              }

              transparencyCtx.globalAlpha = opacity;
              sample.draw(transparencyCtx, 0, 0);
              transparencyCtx.globalAlpha = 1;

              return transparencyCanvas;
            }

            return sample;
          },
        },
      });

      conversion.onProgress = (progressValue: number) => {
        setProgress(Math.round(progressValue * 100));
      };

      await conversion.execute();

      const transparentBuffer = output.target.buffer;
      if (!transparentBuffer) {
        throw new Error('Failed to get transparency video buffer');
      }
      const transparentBlob = new Blob([transparentBuffer], { type: 'video/mp4' });
      const transparentUrl = URL.createObjectURL(transparentBlob);
      setOutputUrl(transparentUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply transparency to video');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = `transparent-${videoFile?.name || 'video.mp4'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setVideoFile(null);
    setVideoUrl(null);
    setOutputUrl(null);
    setError(null);
    setPreviewMode('original');
    setOpacity(1);
    setBackgroundColor('#000000');
    setShowBackground(true);
  };

  const handleResetSettings = () => {
    setOpacity(1);
    setBackgroundColor('#000000');
    setShowBackground(true);
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
                Video Transparency Maker – Adjust Video Opacity and Background Online
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Control the transparency level of your video and blend it over any background color. Perfect for creating overlay effects, picture-in-picture compositions, and creative visual blending — all in your browser.
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
                <h2 className="text-xl font-bold mb-6">Video Transparency Maker</h2>

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
                            variant={previewMode === 'original' ? 'default' : 'outline'}
                            onClick={() => setPreviewMode('original')}
                            className="flex-1"
                          >
                            Original
                          </Button>
                          <Button
                            variant={previewMode === 'transparent' && outputUrl ? 'default' : 'outline'}
                            onClick={() => setPreviewMode('transparent')}
                            className="flex-1"
                            disabled={!outputUrl}
                          >
                            Transparent
                          </Button>
                        </div>

                        {/* Original Video */}
                        {previewMode === 'original' && (
                          <div>
                            <video
                              ref={videoRef}
                              src={videoUrl}
                              controls
                              className="w-full rounded-md bg-black aspect-video"
                            />
                            <p className="text-sm text-muted-foreground mt-2 text-center">Original Video</p>
                          </div>
                        )}

                        {/* Transparent Video Preview */}
                        {outputUrl && previewMode === 'transparent' && (
                          <div>
                            <video
                              ref={transparentVideoRef}
                              src={outputUrl}
                              controls
                              className="w-full rounded-md bg-black aspect-video"
                            />
                            <p className="text-sm text-muted-foreground mt-2 text-center">Transparent Preview</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Transparency Settings */}
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">Transparency Settings</h2>
                        <div className="space-y-4">
                          {/* Reset Settings Button */}
                          <Button variant="outline" onClick={handleResetSettings} className="w-full">
                            Reset to Defaults
                          </Button>

                          {/* Opacity Slider */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label>Opacity</Label>
                              <span className="text-sm text-muted-foreground">{opacity.toFixed(2)}</span>
                            </div>
                            <Slider
                              value={[opacity]}
                              min={0}
                              max={1}
                              step={0.05}
                              onValueChange={([value]) => setOpacity(value)}
                            />
                          </div>

                          {/* Background Color Picker */}
                          <div>
                            <Label className="mb-2 block">Background Color</Label>
                            <div className="flex gap-3 items-center">
                              <input
                                type="color"
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)}
                                className="w-12 h-10 rounded-md cursor-pointer border border-input bg-background"
                              />
                              <input
                                type="text"
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)}
                                className="flex-1 px-3 py-2 bg-background border border-input rounded-md text-sm font-mono"
                                placeholder="#000000"
                              />
                            </div>
                          </div>

                          {/* Show Background Toggle */}
                          <div>
                            <div className="flex items-center gap-2">
                              <Switch
                                id="show-background"
                                checked={showBackground}
                                onCheckedChange={setShowBackground}
                              />
                              <Label htmlFor="show-background" className="text-sm">
                                Show Background Preview
                              </Label>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 ml-0">
                              Toggle to preview with/without background color
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-4 pt-4">
                            <div className="flex gap-2">
                              <Button variant="outline" onClick={handleReset} className="flex-1">
                                Reset
                              </Button>
                              <Button
                                onClick={handleTransparency}
                                disabled={isProcessing}
                                className="flex-1"
                              >
                                {isProcessing ? 'Processing...' : 'Apply Transparency'}
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
                                  <span className="text-sm font-medium text-green-600 dark:text-green-500">Conversion Complete</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Your video transparency has been applied successfully.
                                </p>
                              </div>
                              <Button onClick={handleDownload} className="w-full">
                                Download Transparent Video
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
                What the Video Transparency Maker Does
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Video Transparency Maker lets you control the overall opacity of your video and composite it over a custom background color. You set the opacity from fully opaque (1.0) to fully transparent (0.0), choose a background color to blend against, and toggle the background on or off for preview comparison.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The resulting video has the chosen background color baked in behind the semi-transparent footage. This is useful for creating ghost-like overlay effects, preparing videos for compositing workflows, or producing stylized content where footage is intentionally faded.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How to Use Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Use the Tool</h2>
            <p className="mt-4 text-muted-foreground">
              Apply transparency to your video in 6 simple steps
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {[
              {
                step: "01",
                title: "Upload Video",
                description: "Upload your video using the 'Select Video' button",
              },
              {
                step: "02",
                title: "Set Opacity",
                description: "Use the Opacity slider to set transparency level",
              },
              {
                step: "03",
                title: "Choose Background",
                description: "Pick a background color using the color picker",
              },
              {
                step: "04",
                title: "Preview",
                description: "Toggle 'Show Background Preview' to see the blend",
              },
              {
                step: "05",
                title: "Apply",
                description: "Click 'Apply Transparency' to process the video",
              },
              {
                step: "06",
                title: "Download",
                description: "Download your transparency-adjusted output",
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
              Everything you need to know about video transparency
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
