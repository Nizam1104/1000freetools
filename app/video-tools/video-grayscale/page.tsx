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
    question: "Will converting to grayscale reduce my video quality?",
    answer:
      "No. The grayscale conversion preserves pixel luminance values at full fidelity. The only change is removal of color (chroma) information. Output quality closely matches the original.",
  },
  {
    question: "What is the difference between grayscale and black and white?",
    answer:
      "In video editing, these terms are often used interchangeably. Technically, grayscale means the image contains a full range of gray tones from black to white, preserving all luminance variation — as opposed to a pure two-tone black-and-white image.",
  },
  {
    question: "Does grayscale conversion reduce file size?",
    answer:
      "Typically not significantly. The video is still encoded as RGB/YUV data with chroma channels intact — only the color information is zeroed out visually. File size depends more on resolution and bitrate than color.",
  },
  {
    question: "Can I convert only part of my video to grayscale?",
    answer:
      "This tool converts the entire video. For partial conversion, you would need a non-linear editor like DaVinci Resolve or Premiere Pro.",
  },
  {
    question: "What video formats can I convert to grayscale?",
    answer:
      "The tool accepts MP4, MOV, WebM, MKV, AVI, and other common video formats. Output is always MP4.",
  },
  {
    question: "Is there a preview before I download?",
    answer:
      "Yes. After processing, you can toggle between 'Original' and 'Grayscale' preview modes to compare the two versions before downloading.",
  },
  {
    question: "Does the tool preserve the audio?",
    answer:
      "Yes. The audio track is passed through unchanged. Only the video frames are affected by the grayscale conversion.",
  },
  {
    question: "How long does it take to convert a video to grayscale?",
    answer:
      "Processing time depends on video length and resolution. Most short clips (under 2 minutes) at standard resolutions process in under a minute in modern browsers.",
  },
  {
    question: "Is my video safe? Is it uploaded to a server?",
    answer:
      "Your video is never uploaded. All processing runs locally in your browser using your device's resources. Your footage stays completely private.",
  },
  {
    question: "What's a good use case for converting video to grayscale?",
    answer:
      "Black-and-white conversion is popular for documentary style, artistic short films, music videos, adding a retro or historical feel, removing distracting color information from surveillance or reference footage, and social media content with a distinct aesthetic.",
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

export default function VideoGrayscalePage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'original' | 'grayscale'>('original');

  const videoRef = useRef<HTMLVideoElement>(null);
  const grayscaleVideoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setOutputUrl(null);
      setError(null);
      setPreviewMode('original');
    }
  };

  const handleGrayscale = async () => {
    if (!videoFile) {
      setError('Please select a video to convert to grayscale');
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

      let grayscaleCanvas: OffscreenCanvas | null = null;
      let grayscaleCtx: OffscreenCanvasRenderingContext2D | null = null;

      const conversion = await Conversion.init({
        input,
        output,
        video: {
          process: async (sample) => {
            if (!grayscaleCanvas) {
              grayscaleCanvas = new OffscreenCanvas(sample.displayWidth, sample.displayHeight);
              grayscaleCtx = grayscaleCanvas.getContext('2d');
              if (grayscaleCtx) {
                grayscaleCtx.filter = 'grayscale(100%)';
              }
            }

            if (grayscaleCanvas && grayscaleCtx) {
              sample.draw(grayscaleCtx, 0, 0);
              return grayscaleCanvas;
            }

            return sample;
          },
        },
      });

      conversion.onProgress = (progressValue: number) => {
        setProgress(Math.round(progressValue * 100));
      };

      await conversion.execute();

      const grayscaleBuffer = output.target.buffer;
      if (!grayscaleBuffer) {
        throw new Error('Failed to get grayscale video buffer');
      }
      const grayscaleBlob = new Blob([grayscaleBuffer], { type: 'video/mp4' });
      const grayscaleUrl = URL.createObjectURL(grayscaleBlob);
      setOutputUrl(grayscaleUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert video to grayscale');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = `grayscale-${videoFile?.name || 'video.mp4'}`;
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
                Video Grayscale Converter – Convert Video to Black & White Online
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Transform any color video into a timeless black-and-white film with one click. Full grayscale conversion with no quality loss, no watermarks, and no software to install.
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
                <h2 className="text-xl font-bold mb-6">Video Grayscale Converter</h2>

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
                            variant={previewMode === 'grayscale' && outputUrl ? 'default' : 'outline'}
                            onClick={() => setPreviewMode('grayscale')}
                            className="flex-1"
                            disabled={!outputUrl}
                          >
                            Grayscale
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

                        {/* Grayscale Video Preview */}
                        {outputUrl && previewMode === 'grayscale' && (
                          <div>
                            <video
                              ref={grayscaleVideoRef}
                              src={outputUrl}
                              controls
                              className="w-full rounded-md bg-black aspect-video"
                            />
                            <p className="text-sm text-muted-foreground mt-2 text-center">Grayscale Preview</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Conversion Settings */}
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">Conversion Settings</h2>
                        <div className="space-y-4">
                          {/* Info Card */}
                          <div className="p-4 bg-muted rounded-md">
                            <h3 className="font-medium mb-2">About Grayscale Conversion</h3>
                            <p className="text-sm text-muted-foreground">
                              This tool converts your video to black and white by removing all color
                              information while preserving the luminance (brightness) of each pixel.
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-4 pt-4">
                            <div className="flex gap-2">
                              <Button variant="outline" onClick={handleReset} className="flex-1">
                                Reset
                              </Button>
                              <Button
                                onClick={handleGrayscale}
                                disabled={isProcessing}
                                className="flex-1"
                              >
                                {isProcessing ? 'Processing...' : 'Convert to Grayscale'}
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
                                  Your video has been successfully converted to grayscale.
                                </p>
                              </div>
                              <Button onClick={handleDownload} className="w-full">
                                Download Grayscale Video
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
                What the Video Grayscale Converter Does
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Video Grayscale Converter removes all color information from your video by applying a 100% grayscale filter to every frame during re-encoding. The luminance (brightness) of each pixel is preserved, giving you a rich, natural-looking monochrome output rather than a flat or washed-out result.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is perfect for creating cinematic black-and-white films, artistic video content, reducing visual complexity, or preparing footage for platforms or projects that call for a classic monochrome aesthetic.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How to Use Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Use the Tool</h2>
            <p className="mt-4 text-muted-foreground">
              Convert your video to grayscale in 5 simple steps
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {[
              {
                step: "01",
                title: "Select Video",
                description: "Click 'Select Video' to upload any video file",
              },
              {
                step: "02",
                title: "Preview Loads",
                description: "Your original color video appears in the preview player",
              },
              {
                step: "03",
                title: "Convert",
                description: "Click 'Convert to Grayscale' to start processing",
              },
              {
                step: "04",
                title: "Compare",
                description: "Toggle to 'Grayscale' preview to see the result",
              },
              {
                step: "05",
                title: "Download",
                description: "Download your black-and-white output video",
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
              Everything you need to know about grayscale conversion
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
