"use client";

import { useState, useEffect } from "react";
import {
  Conversion,
  Input,
  Output,
  Mp3OutputFormat,
  BufferTarget,
  BlobSource,
  ALL_FORMATS,
  canEncodeAudio,
} from "mediabunny";
import { registerMp3Encoder } from "@mediabunny/mp3-encoder";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Script from "next/script";

const faqData = [
  {
    question: "Does extracting the audio track lower its original quality?",
    answer:
      "No, you can choose to extract audio from video online without losing any fidelity. If you select the WAV output format or set the bitrate to 320 Kbps, the resulting sound file will retain all the clarity and detail of the source video's original audio track.",
  },
  {
    question: "How long does it typically take to process a full movie?",
    answer:
      "Because the tool relies entirely on the processing power of your specific device, the exact time varies based on your hardware and the video length. However, since the video track is simply discarded rather than re-encoded, the audio extraction is generally incredibly fast and avoids long upload times.",
  },
  {
    question: "Can anyone access the videos or audio files I process here?",
    answer:
      "Your files remain completely secure because the entire extraction process runs locally within your own web browser. The tool never sends your original video or the extracted audio to an external server, ensuring nobody else can ever see or hear your media.",
  },
  {
    question: "Why would I choose AAC over the more popular MP3 format?",
    answer:
      "AAC generally provides slightly cleaner sound and better detail than MP3 when compared at identical bitrates. If you are extracting music and want to save device storage space without sacrificing too much audio definition, AAC is structurally a more efficient choice.",
  },
  {
    question: "What happens if the original video doesn't actually have audio?",
    answer:
      "The tool will attempt to process the file but will fail to produce a usable audio track, as there is no sound data to extract. You should ensure your source video actually contains audible content in the preview player before starting the extraction step.",
  },
  {
    question: "Can I use this to get individual stems or tracks from a song?",
    answer:
      "This tool pulls the single, mixed audio track directly from the video container and cannot separate individual instruments or vocals from that single mix. If the video only contains one flattened audio track, that combined audio is exactly what you will get in the final file.",
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

export default function ExtractAudioFromVideoPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [audioFormat, setAudioFormat] = useState<"mp3" | "aac" | "wav">("mp3");
  const [audioBitrate, setAudioBitrate] = useState<number>(192000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Register MP3 encoder if not natively supported
  useEffect(() => {
    const initMp3Encoder = async () => {
      if (!(await canEncodeAudio("mp3"))) {
        registerMp3Encoder();
      }
    };
    initMp3Encoder();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setOutputUrl(null);
      setError(null);
    }
  };

  const handleExtract = async () => {
    if (!videoFile) {
      setError("Please select a video file");
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

      let outputFormat;
      if (audioFormat === "mp3") {
        outputFormat = new Mp3OutputFormat();
      } else if (audioFormat === "wav") {
        const { WavOutputFormat } = await import("mediabunny");
        outputFormat = new WavOutputFormat();
      } else {
        // AAC - use MP4 container with AAC codec
        const { Mp4OutputFormat } = await import("mediabunny");
        outputFormat = new Mp4OutputFormat();
      }

      const output = new Output({
        format: outputFormat,
        target: new BufferTarget(),
      });

      const conversion = await Conversion.init({
        input,
        output,
        video: {
          discard: true,
        },
        audio: {
          bitrate: audioBitrate,
        },
      });

      conversion.onProgress = (progressValue: number) => {
        setProgress(Math.round(progressValue * 100));
      };

      await conversion.execute();

      const audioBuffer = output.target.buffer;
      if (!audioBuffer) {
        throw new Error("Failed to get audio buffer");
      }

      const mimeType =
        audioFormat === "wav"
          ? "audio/wav"
          : audioFormat === "aac"
            ? "audio/mp4"
            : "audio/mpeg";
      const audioBlob = new Blob([audioBuffer], { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setOutputUrl(audioUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to extract audio");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    const extension =
      audioFormat === "wav" ? "wav" : audioFormat === "aac" ? "m4a" : "mp3";
    a.download = `audio-${videoFile?.name?.split(".")[0] || "audio"}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setVideoFile(null);
    setVideoUrl(null);
    setOutputUrl(null);
    setError(null);
  };

  const formatBitrate = (bitrate: number): string => {
    return `${bitrate / 1000} Kbps`;
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
                Audio Extractor from Video – Extract MP3, AAC, WAV Online
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Extract audio tracks from any video file instantly in your
                browser. Choose MP3, AAC, or WAV format with customizable
                bitrate. No uploads, fast processing, completely free.
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
                  Extract Audio from Video
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
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        {/* Video Preview */}
                        <div>
                          <h2 className="text-lg font-semibold mb-4">
                            Preview
                          </h2>
                          <video
                            src={videoUrl}
                            controls
                            className="w-full rounded-md bg-black aspect-video"
                          />
                        </div>

                        {/* Audio Settings */}
                        <div className="space-y-4">
                          <h2 className="text-lg font-semibold">
                            Audio Settings
                          </h2>

                          <div>
                            <Label className="mb-2 block">Audio Format</Label>
                            <div className="flex gap-2">
                              {(["mp3", "aac", "wav"] as const).map(
                                (format) => (
                                  <Button
                                    key={format}
                                    variant={
                                      audioFormat === format
                                        ? "default"
                                        : "outline"
                                    }
                                    onClick={() => setAudioFormat(format)}
                                    className="flex-1"
                                  >
                                    {format.toUpperCase()}
                                  </Button>
                                ),
                              )}
                            </div>
                          </div>

                          <div>
                            <Label className="mb-2 block">Audio Bitrate</Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {[128000, 192000, 256000, 320000].map(
                                (bitrate) => (
                                  <Button
                                    key={bitrate}
                                    variant={
                                      audioBitrate === bitrate
                                        ? "default"
                                        : "outline"
                                    }
                                    onClick={() => setAudioBitrate(bitrate)}
                                    className="text-sm"
                                  >
                                    {formatBitrate(bitrate)}
                                  </Button>
                                ),
                              )}
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
                                onClick={handleExtract}
                                disabled={isProcessing}
                                className="flex-1"
                              >
                                {isProcessing
                                  ? "Processing..."
                                  : "Extract Audio"}
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
                                    Extraction Complete
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Audio extracted successfully in{" "}
                                  {audioFormat.toUpperCase()} format.
                                </p>
                              </div>
                              <Button
                                onClick={handleDownload}
                                className="w-full"
                              >
                                Download Audio
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* What Audio Extraction Does */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                What Extraction Actually Does
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Video files contain two streams: video and audio. Extraction pulls out the audio stream and discards the video. The result is a standalone audio file — MP3, AAC, or WAV — that plays in any music player.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The quality depends on the source. If the original video has compressed audio, extraction won't improve it — you're just copying what's already there. If the video has high-quality audio, extracting to WAV preserves it without further compression.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This tool runs locally in your browser. No upload means faster processing and complete privacy. A 10-minute video might take 30 seconds to extract, depending on your computer's speed.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* When You'd Extract Audio */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">When This Is Useful</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Video podcasts to audio</h3>
                <p className="text-sm text-muted-foreground">
                  Video podcasts are huge files. If you just want to listen during your commute, extracting to MP3 cuts the file size by 90% or more. Same content, way less storage.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Lecture recordings for study</h3>
                <p className="text-sm text-muted-foreground">
                  Students recording lectures often only need the audio. Extracting lets you listen while walking, exercising, or doing chores — no need to watch a static slide deck.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Music from live performance videos</h3>
                <p className="text-sm text-muted-foreground">
                  You recorded a concert but the video is shaky and dark. The audio is what matters. Extract to WAV for the best quality, then add it to your music library.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Voiceover extraction for editing</h3>
                <p className="text-sm text-muted-foreground">
                  Need to clean up dialogue or add effects? Extract the audio, edit it in your favorite audio software, then sync it back to video if needed.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Background music from stock videos</h3>
                <p className="text-sm text-muted-foreground">
                  Found a royalty-free video with great music? Extract the audio track and use it in your own projects. Just verify the license covers audio-only use.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Audio Format Guide */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                Choosing the Right Format
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Format</th>
                      <th className="text-left py-3 px-4 font-medium">Best For</th>
                      <th className="text-left py-3 px-4 font-medium">File Size</th>
                      <th className="text-left py-3 px-4 font-medium">Quality</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">MP3</td>
                      <td className="py-3 px-4">Universal compatibility</td>
                      <td className="py-3 px-4">Small</td>
                      <td className="py-3 px-4">Good (lossy)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">AAC (M4A)</td>
                      <td className="py-3 px-4">Apple devices, streaming</td>
                      <td className="py-3 px-4">Small</td>
                      <td className="py-3 px-4">Better than MP3 at same bitrate</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono">WAV</td>
                      <td className="py-3 px-4">Professional editing, archiving</td>
                      <td className="py-3 px-4">Large (10x MP3)</td>
                      <td className="py-3 px-4">Uncompressed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground mt-6 text-sm">
                For most uses, MP3 at 192-256 Kbps is fine. Use WAV only if you plan to edit the audio further or need archival quality.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Using This Tool */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Extract Audio</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="relative font-semibold text-xl">Upload your video</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Select or drag your video file. It stays on your device — no server upload. The preview lets you confirm it's the right file before extracting.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">Choose format and quality</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Pick MP3 for compatibility, AAC for better quality at smaller sizes, or WAV for uncompressed audio. Select bitrate: 128 Kbps for speech, 192-256 Kbps for music, 320 Kbps for maximum quality.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">Extract and download</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click extract and wait for processing to finish. The audio file downloads when ready. Keep the tab open during processing — closing it cancels the job.
              </p>
            </div>
          </div>
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
