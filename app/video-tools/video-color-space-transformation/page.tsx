"use client";

import { useState, useRef } from 'react';
import { Conversion, Input, Output, Mp4OutputFormat, BufferTarget, BlobSource, ALL_FORMATS } from 'mediabunny';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Script from "next/script";

const faqData = [
  {
    question: "What color adjustments can I make to my video?",
    answer:
      "You can adjust brightness (darker/brighter), contrast (flat vs. punchy), saturation (grayscale to vivid color), hue rotation (shift all colors around the color wheel), sepia (warm vintage tone), and invert (negative/inverted colors).",
  },
  {
    question: "How do I give my video a cinematic color grade?",
    answer:
      "A simple cinematic grade: slightly reduce brightness (e.g. 0.9), increase contrast (e.g. 1.2), slightly reduce saturation (e.g. 0.85), and add a very small amount of sepia (e.g. 0.1) for warm tones.",
  },
  {
    question: "What does hue rotation do?",
    answer:
      "Hue rotation shifts every color in your video around the color wheel by the specified degree. At 180°, all colors become their complements (reds become cyan, blues become yellow, etc.).",
  },
  {
    question: "Can I convert a video to grayscale with this tool?",
    answer:
      "Yes. Set the Saturation slider to 0 to fully desaturate the video, producing a black-and-white result. For a dedicated grayscale converter, see the Video Grayscale tool.",
  },
  {
    question: "Does this tool process every single frame?",
    answer:
      "Yes. Each video frame is individually processed with your color settings applied as a CSS filter, then re-encoded into the output MP4 — so the adjustments are permanently embedded in every frame.",
  },
  {
    question: "Will the color changes affect the audio track?",
    answer:
      "No. Color transformations only affect the video stream. Your audio is passed through to the output unchanged.",
  },
  {
    question: "How do I create a sepia vintage look?",
    answer:
      "Increase the Sepia slider toward 1.0, reduce Saturation slightly (e.g. 0.7), and lower Contrast a bit (e.g. 0.9) for an aged, warm film look.",
  },
  {
    question: "Can I preview the color effect before processing the whole video?",
    answer:
      "The sliders update the settings in real time. After you process the video, a before/after toggle lets you compare the original and transformed versions directly in the player.",
  },
  {
    question: "What is the invert effect used for?",
    answer:
      "The Invert filter reverses all color values, creating a negative-film effect. It's used for creative visual effects, accessibility applications, or artistic purposes.",
  },
  {
    question: "Is the output quality the same as the original?",
    answer:
      "The video is re-encoded with the color transformations applied, which involves standard MP4 compression. The visual quality is preserved as closely as the encoding process allows.",
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

export default function VideoColorSpaceTransformationPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'original' | 'transformed'>('original');

  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [hueRotate, setHueRotate] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [invert, setInvert] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const transformedVideoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setOutputUrl(null);
      setError(null);
      setPreviewMode('original');
      setBrightness(1);
      setContrast(1);
      setSaturation(1);
      setHueRotate(0);
      setSepia(0);
      setInvert(0);
    }
  };

  const handleTransform = async () => {
    if (!videoFile) {
      setError('Please select a video to transform');
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

      let transformCanvas: OffscreenCanvas | null = null;
      let transformCtx: OffscreenCanvasRenderingContext2D | null = null;

      const conversion = await Conversion.init({
        input,
        output,
        video: {
          process: async (sample) => {
            if (!transformCanvas) {
              transformCanvas = new OffscreenCanvas(sample.displayWidth, sample.displayHeight);
              transformCtx = transformCanvas.getContext('2d');
            }

            if (transformCanvas && transformCtx) {
              const filter = `
                brightness(${brightness})
                contrast(${contrast})
                saturate(${saturation})
                hue-rotate(${hueRotate}deg)
                sepia(${sepia})
                invert(${invert})
              `.trim();

              transformCtx.filter = filter;
              sample.draw(transformCtx, 0, 0);
              return transformCanvas;
            }

            return sample;
          },
        },
      });

      conversion.onProgress = (progressValue: number) => {
        setProgress(Math.round(progressValue * 100));
      };

      await conversion.execute();

      const transformedBuffer = output.target.buffer;
      if (!transformedBuffer) {
        throw new Error('Failed to get transformed video buffer');
      }
      const transformedBlob = new Blob([transformedBuffer], { type: 'video/mp4' });
      const transformedUrl = URL.createObjectURL(transformedBlob);
      setOutputUrl(transformedUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to transform video colors');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = `color-transformed-${videoFile?.name || 'video.mp4'}`;
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
    setBrightness(1);
    setContrast(1);
    setSaturation(1);
    setHueRotate(0);
    setSepia(0);
    setInvert(0);
  };

  const handleResetSettings = () => {
    setBrightness(1);
    setContrast(1);
    setSaturation(1);
    setHueRotate(0);
    setSepia(0);
    setInvert(0);
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
                Video Color Space Transformer – Adjust Video Colors Online for Free
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Precisely control the visual look of your video with full color adjustment tools. Dial in brightness, contrast, saturation, hue rotation, sepia, and invert effects — all processed locally in your browser.
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
                <h2 className="text-xl font-bold mb-6">Video Color Space Transformer</h2>

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
                            variant={previewMode === 'transformed' && outputUrl ? 'default' : 'outline'}
                            onClick={() => setPreviewMode('transformed')}
                            className="flex-1"
                            disabled={!outputUrl}
                          >
                            Transformed
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

                        {/* Transformed Video Preview */}
                        {outputUrl && previewMode === 'transformed' && (
                          <div>
                            <video
                              ref={transformedVideoRef}
                              src={outputUrl}
                              controls
                              className="w-full rounded-md bg-black aspect-video"
                            />
                            <p className="text-sm text-muted-foreground mt-2 text-center">Transformed Preview</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Color Transformation Settings */}
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">Color Settings</h2>
                        <div className="space-y-4">
                          {/* Reset Settings Button */}
                          <Button variant="outline" onClick={handleResetSettings} className="w-full">
                            Reset to Defaults
                          </Button>

                          {/* Brightness */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label>Brightness</Label>
                              <span className="text-sm text-muted-foreground">{brightness.toFixed(2)}</span>
                            </div>
                            <Slider
                              value={[brightness]}
                              min={0}
                              max={2}
                              step={0.05}
                              onValueChange={([value]) => setBrightness(value)}
                            />
                          </div>

                          {/* Contrast */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label>Contrast</Label>
                              <span className="text-sm text-muted-foreground">{contrast.toFixed(2)}</span>
                            </div>
                            <Slider
                              value={[contrast]}
                              min={0}
                              max={2}
                              step={0.05}
                              onValueChange={([value]) => setContrast(value)}
                            />
                          </div>

                          {/* Saturation */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label>Saturation</Label>
                              <span className="text-sm text-muted-foreground">{saturation.toFixed(2)}</span>
                            </div>
                            <Slider
                              value={[saturation]}
                              min={0}
                              max={2}
                              step={0.05}
                              onValueChange={([value]) => setSaturation(value)}
                            />
                          </div>

                          {/* Hue Rotate */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label>Hue Rotate</Label>
                              <span className="text-sm text-muted-foreground">{hueRotate}°</span>
                            </div>
                            <Slider
                              value={[hueRotate]}
                              min={0}
                              max={360}
                              step={1}
                              onValueChange={([value]) => setHueRotate(value)}
                            />
                          </div>

                          {/* Sepia */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label>Sepia</Label>
                              <span className="text-sm text-muted-foreground">{sepia.toFixed(2)}</span>
                            </div>
                            <Slider
                              value={[sepia]}
                              min={0}
                              max={1}
                              step={0.05}
                              onValueChange={([value]) => setSepia(value)}
                            />
                          </div>

                          {/* Invert */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label>Invert</Label>
                              <span className="text-sm text-muted-foreground">{invert.toFixed(2)}</span>
                            </div>
                            <Slider
                              value={[invert]}
                              min={0}
                              max={1}
                              step={0.05}
                              onValueChange={([value]) => setInvert(value)}
                            />
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-4 pt-4">
                            <div className="flex gap-2">
                              <Button variant="outline" onClick={handleReset} className="flex-1">
                                Reset
                              </Button>
                              <Button
                                onClick={handleTransform}
                                disabled={isProcessing}
                                className="flex-1"
                              >
                                {isProcessing ? 'Processing...' : 'Apply Transform'}
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
                                  Your video has been successfully transformed.
                                </p>
                              </div>
                              <Button onClick={handleDownload} className="w-full">
                                Download Transformed Video
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
                What the Video Color Space Transformer Does
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Video Color Space Transformer applies CSS-based color filter effects directly to every frame of your video. You get independent sliders for six color parameters: Brightness (0–2x), Contrast (0–2x), Saturation (0–2x for grayscale through vivid), Hue Rotation (0–360°), Sepia intensity (0–100%), and Invert (0–100% for a negative effect).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Adjustments are applied per-frame during re-encoding, so the effects are permanently baked into the output MP4. A before/after preview toggle lets you compare the original and transformed video side by side.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How to Use Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Use the Tool</h2>
            <p className="mt-4 text-muted-foreground">
              Transform your video colors in 6 simple steps
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
                title: "Adjust Colors",
                description: "Adjust any combination of the six color sliders",
              },
              {
                step: "03",
                title: "Reset Option",
                description: "Use 'Reset to Defaults' to return all sliders to neutral",
              },
              {
                step: "04",
                title: "Apply Transform",
                description: "Click 'Apply Transform' to process the video",
              },
              {
                step: "05",
                title: "Compare",
                description: "Toggle between Original and Transformed to compare",
              },
              {
                step: "06",
                title: "Download",
                description: "Download your transformed video output",
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
              Everything you need to know about color transformation
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
