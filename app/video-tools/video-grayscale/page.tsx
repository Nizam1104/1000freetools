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
    question: "How do I convert a video to black and white without software?",
    answer:
      "Open the file picker and select your video. Click Convert to Grayscale and wait for the progress bar to reach 100%. The encoder applies a grayscale filter to every frame in your browser using your device's CPU. When it finishes, click Download to save the black and white MP4. No software installation is required and nothing is uploaded to a server.",
  },
  {
    question: "Does converting to grayscale reduce the file size?",
    answer:
      "Not directly. Grayscale conversion removes color channel data from the visual output but the MP4 container still stores the three color channels at zero saturation internally. The output file size will be close to the same as the original. If you also need a smaller file, run the output through a video compressor after the grayscale conversion.",
  },
  {
    question: "How long does grayscale conversion take?",
    answer:
      "Processing speed depends on your device's processor and the length of your video. A two-minute 1080p clip takes about one to three minutes on a mid-range laptop. A longer 4K recording can take ten minutes or more. Keep the browser tab active and avoid running other heavy tasks while the encoder works.",
  },
  {
    question: "Does the output video have a watermark on it?",
    answer:
      "No watermark is added to the output. All processing runs on your device using your own CPU. There is no cloud server cost involved, so no subscription or payment is required to remove a watermark.",
  },
  {
    question: "Does the grayscale filter affect the audio track?",
    answer:
      "No. The encoder targets only the video frames. The audio data is copied from the source file into the output MP4 unchanged. Your dialogue, music, and any other audio recorded with the video will play back at the same quality in the grayscale output.",
  },
  {
    question: "Is the grayscale effect reversible?",
    answer:
      "No. The encoder rewrites the color information in every frame of the output file. The resulting MP4 contains grayscale pixel data at the file level, not a filter layer that can be switched off. Your original file is not modified. If you need the color version again, use your original source file.",
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
  const [previewMode, setPreviewMode] = useState<"original" | "grayscale">(
    "original",
  );

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
      setPreviewMode("original");
    }
  };

  const handleGrayscale = async () => {
    if (!videoFile) {
      setError("Please select a video to convert to grayscale");
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
              grayscaleCanvas = new OffscreenCanvas(
                sample.displayWidth,
                sample.displayHeight,
              );
              grayscaleCtx = grayscaleCanvas.getContext("2d");
              if (grayscaleCtx) {
                grayscaleCtx.filter = "grayscale(100%)";
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
        throw new Error("Failed to get grayscale video buffer");
      }
      const grayscaleBlob = new Blob([grayscaleBuffer], { type: "video/mp4" });
      const grayscaleUrl = URL.createObjectURL(grayscaleBlob);
      setOutputUrl(grayscaleUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to convert video to grayscale",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `grayscale-${videoFile?.name || "video.mp4"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setVideoFile(null);
    setVideoUrl(null);
    setOutputUrl(null);
    setError(null);
    setPreviewMode("original");
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
                Convert Video to Black and White Online Free
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Remove all color from your video and produce a clean grayscale
                MP4 in your browser. The encoder rewrites every frame using
                luminance values only, with no quality loss and no watermarks.
                Your original file stays untouched until you download the
                output.
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
                  Video Grayscale Converter
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

                        {/* Preview Mode Toggle */}
                        <div className="mb-4 flex gap-2">
                          <Button
                            variant={
                              previewMode === "original" ? "default" : "outline"
                            }
                            onClick={() => setPreviewMode("original")}
                            className="flex-1"
                          >
                            Original
                          </Button>
                          <Button
                            variant={
                              previewMode === "grayscale" && outputUrl
                                ? "default"
                                : "outline"
                            }
                            onClick={() => setPreviewMode("grayscale")}
                            className="flex-1"
                            disabled={!outputUrl}
                          >
                            Grayscale
                          </Button>
                        </div>

                        {/* Original Video */}
                        {previewMode === "original" && (
                          <div>
                            <video
                              ref={videoRef}
                              src={videoUrl}
                              controls
                              className="w-full rounded-md bg-black aspect-video"
                            />
                            <p className="text-sm text-muted-foreground mt-2 text-center">
                              Original Video
                            </p>
                          </div>
                        )}

                        {/* Grayscale Video Preview */}
                        {outputUrl && previewMode === "grayscale" && (
                          <div>
                            <video
                              ref={grayscaleVideoRef}
                              src={outputUrl}
                              controls
                              className="w-full rounded-md bg-black aspect-video"
                            />
                            <p className="text-sm text-muted-foreground mt-2 text-center">
                              Grayscale Preview
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Conversion Settings */}
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">
                          Conversion Settings
                        </h2>
                        <div className="space-y-4">
                          {/* Info Card */}
                          <div className="p-4 bg-muted rounded-md">
                            <h3 className="font-medium mb-2">
                              About Grayscale Conversion
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              This tool converts your video to black and white
                              by removing all color information while preserving
                              the luminance (brightness) of each pixel.
                            </p>
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
                                onClick={handleGrayscale}
                                disabled={isProcessing}
                                className="flex-1"
                              >
                                {isProcessing
                                  ? "Processing..."
                                  : "Convert to Grayscale"}
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
                                  <span className="text-sm font-medium text-green-600 dark:text-green-500">
                                    Conversion Complete
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Your video has been successfully converted to
                                  grayscale.
                                </p>
                              </div>
                              <Button
                                onClick={handleDownload}
                                className="w-full"
                              >
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
                What it Does
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This tool applies a grayscale filter to every frame of your
                video and encodes the result into a new MP4 file. The filter
                works by reading each pixel's individual red, green, and blue
                values and replacing them all with a single luminance value that
                represents how bright that point in the image is. The result is
                a video that uses only shades of gray from black to white, with
                no hue information remaining. All processing runs in your
                browser using your device's CPU, so no file is uploaded to any
                server. Your original video is not modified.
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
                Select your video
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Open the file picker and load your video. The preview panel
                shows the original color footage so you can confirm the file
                loaded correctly. You can return to this Original view after
                processing to compare it side by side with the grayscale output.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Start the conversion
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click Convert to Grayscale. The encoder reads each frame,
                calculates a luminance value for every pixel, and writes the
                result into a new MP4. Keep the browser tab open. The progress
                bar updates as the encoder works through the video from the
                first frame to the last.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Preview and download
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                When the progress bar reaches 100%, click the Grayscale button
                in the preview panel to watch the converted video. Toggle
                between the Original and Grayscale views to confirm the result.
                Click Download to save the black and white MP4 to your device.
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
                  Blending modern footage with archive material
                </h3>
                <p className="text-sm text-muted-foreground">
                  Documentary makers inserting new interviews next to 1940s
                  archival footage need the new clips to match the period look.
                  Converting the modern footage to grayscale lets both clips sit
                  in the same tonal range on the timeline without a visually
                  jarring color difference.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Fixing unworkable mixed lighting
                </h3>
                <p className="text-sm text-muted-foreground">
                  Footage shot in a location with mixed light sources, such as
                  warm tungsten lights on one side and cool daylight on the
                  other, often produces a color shift that is difficult to
                  grade. Removing color entirely eliminates the problem and
                  produces a clean, consistent look across the entire clip.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Setting a serious or cinematic tone
                </h3>
                <p className="text-sm text-muted-foreground">
                  Color carries emotional warmth. Removing it shifts the mood of
                  a video toward something more formal, stark, or timeless.
                  Filmmakers use grayscale for memorial content, dramatic
                  flashback sequences, and opening credits where a neutral,
                  high-contrast look reinforces the subject matter.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Creating high-contrast photo or art video
                </h3>
                <p className="text-sm text-muted-foreground">
                  Musicians and visual artists who want a raw, stripped-down
                  aesthetic use grayscale to bring out the contrast between
                  light and shadow. Without color to draw the eye, shapes,
                  edges, and lighting patterns become the dominant visual
                  elements in the frame.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Preparing video for print or export
                </h3>
                <p className="text-sm text-muted-foreground">
                  Some digital signage screens, e-ink displays, and print
                  workflows only support monochrome output. Converting the
                  source video to grayscale before export ensures you review the
                  actual monochrome appearance rather than relying on the
                  display or print driver to approximate it.
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
                  <h3 className="font-bold text-lg">
                    How the Grayscale Filter Works
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    The grayscale filter reads the red, green, and blue values
                    for every pixel in every frame. It calculates a single
                    luminance value using a weighted average based on how the
                    human eye perceives brightness across the three channels.
                    That single value then replaces the red, green, and blue
                    channels equally, removing all hue information and leaving
                    only brightness data. The result is a true grayscale image
                    where the tonal range mirrors the original lighting in the
                    scene.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    OffscreenCanvas Processing
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    This tool uses the browser's OffscreenCanvas API to process
                    video frames without blocking the browser's main thread. The
                    encoding work happens in a background process, which keeps
                    the interface responsive during conversion. This also means
                    the tool can handle longer videos without the browser
                    appearing to freeze or hang.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    Permanent Pixel-Level Encoding
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    The output is a new MP4 where the grayscale data is written
                    at the pixel level. This is not a CSS filter or a preview
                    overlay. The color data is absent from the output file
                    itself, not just hidden. This means the file will appear in
                    grayscale in every player, editor, and platform without any
                    further settings required.
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
            <p className="mt-4 text-muted-foreground">
              Everything you need to know about grayscale conversion
            </p>
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
