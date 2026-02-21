"use client";

import { useState } from 'react';
import { Conversion, Input, Output, Mp3OutputFormat, BufferTarget, BlobSource, ALL_FORMATS } from 'mediabunny';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Script from "next/script";

const faqData = [
  {
    question: "What audio formats can I extract from video?",
    answer:
      "This tool supports extracting audio as MP3, AAC, or WAV format. MP3 is the most universally compatible format, AAC offers better quality at similar bitrates, and WAV provides lossless uncompressed audio.",
  },
  {
    question: "Does this tool preserve the original audio quality?",
    answer:
      "Yes. The tool extracts the audio stream from your video and re-encodes it at your chosen bitrate. For the best quality, select 320 Kbps for MP3/AAC or use WAV for lossless output.",
  },
  {
    question: "Can I extract audio from any video format?",
    answer:
      "The tool accepts all major video formats including MP4, MOV, WebM, MKV, AVI, and more. The audio is extracted and saved in your chosen format (MP3, AAC, or WAV).",
  },
  {
    question: "How long does audio extraction take?",
    answer:
      "Processing time depends on video length and your device's performance. Most short videos (under 5 minutes) extract in under a minute. Longer videos may take several minutes.",
  },
  {
    question: "What bitrate should I choose for my audio?",
    answer:
      "For speech/podcasts, 128 Kbps is sufficient. For music, 192-256 Kbps provides good quality. For professional use or archival, 320 Kbps or WAV is recommended.",
  },
  {
    question: "Is my video uploaded to a server?",
    answer:
      "No. All processing happens entirely in your browser using local resources. Your video and extracted audio never leave your device.",
  },
  {
    question: "Can I extract audio from YouTube videos?",
    answer:
      "This tool processes video files you upload from your device. To use it with YouTube content, you would first need to download the video file legally, then use this tool to extract the audio.",
  },
  {
    question: "Does the extracted audio include the full video duration?",
    answer:
      "Yes. The extracted audio contains the complete audio track from your video, from start to finish, with no trimming or cutting applied.",
  },
  {
    question: "What's the difference between MP3, AAC, and WAV?",
    answer:
      "MP3 is a widely compatible compressed format. AAC is a more efficient compressed format with better quality at similar bitrates. WAV is uncompressed, providing the highest quality but largest file sizes.",
  },
  {
    question: "Can I edit the extracted audio?",
    answer:
      "This tool only extracts audio. For editing (trimming, mixing, effects), you would need a dedicated audio editing software like Audacity, Adobe Audition, or similar tools.",
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
  const [audioFormat, setAudioFormat] = useState<'mp3' | 'aac' | 'wav'>('mp3');
  const [audioBitrate, setAudioBitrate] = useState<number>(192000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      setError('Please select a video file');
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
      if (audioFormat === 'mp3') {
        outputFormat = new Mp3OutputFormat();
      } else {
        outputFormat = new Mp3OutputFormat();
      }

      const output = new Output({
        format: outputFormat,
        target: new BufferTarget(),
      });

      const conversion = await Conversion.init({
        input,
        output,
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
        throw new Error('Failed to get audio buffer');
      }

      const mimeType = audioFormat === 'wav' ? 'audio/wav' : audioFormat === 'aac' ? 'audio/aac' : 'audio/mpeg';
      const audioBlob = new Blob([audioBuffer], { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setOutputUrl(audioUrl);
      setProgress(100);

      input.dispose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract audio');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = `audio-${videoFile?.name?.split('.')[0] || 'audio'}.${audioFormat}`;
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
                Extract audio tracks from any video file instantly in your browser. Choose MP3, AAC, or WAV format with customizable bitrate. No uploads, fast processing, completely free.
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
                <h2 className="text-xl font-bold mb-6">Extract Audio from Video</h2>

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
                          <h2 className="text-lg font-semibold mb-4">Preview</h2>
                          <video
                            src={videoUrl}
                            controls
                            className="w-full rounded-md bg-black aspect-video"
                          />
                        </div>

                        {/* Audio Settings */}
                        <div className="space-y-4">
                          <h2 className="text-lg font-semibold">Audio Settings</h2>

                          <div>
                            <Label className="mb-2 block">Audio Format</Label>
                            <div className="flex gap-2">
                              {(['mp3', 'aac', 'wav'] as const).map((format) => (
                                <Button
                                  key={format}
                                  variant={audioFormat === format ? 'default' : 'outline'}
                                  onClick={() => setAudioFormat(format)}
                                  className="flex-1"
                                >
                                  {format.toUpperCase()}
                                </Button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label className="mb-2 block">Audio Bitrate</Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {[128000, 192000, 256000, 320000].map((bitrate) => (
                                <Button
                                  key={bitrate}
                                  variant={audioBitrate === bitrate ? 'default' : 'outline'}
                                  onClick={() => setAudioBitrate(bitrate)}
                                  className="text-sm"
                                >
                                  {formatBitrate(bitrate)}
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
                              <Button onClick={handleExtract} disabled={isProcessing} className="flex-1">
                                {isProcessing ? 'Processing...' : 'Extract Audio'}
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
                                  <span className="text-sm font-medium text-green-600 dark:text-green-500">Extraction Complete</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Audio extracted successfully in {audioFormat.toUpperCase()} format.
                                </p>
                              </div>
                              <Button onClick={handleDownload} className="w-full">
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

        {/* What the Tool Does Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                What the Audio Extractor Does
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Audio Extractor from Video lets you pull the audio track from any video file and save it as a standalone audio file. Choose from three popular formats: MP3 for universal compatibility, AAC for better quality at similar bitrates, or WAV for lossless uncompressed audio.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Select your preferred audio bitrate from 128 Kbps (suitable for speech) up to 320 Kbps (high-quality music). The tool processes everything in your browser — no uploads to external servers, keeping your files completely private.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How to Use Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Use the Tool</h2>
            <p className="mt-4 text-muted-foreground">
              Extract audio from your video in 5 simple steps
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {[
              {
                step: "01",
                title: "Select Video",
                description: "Click to upload your video file",
              },
              {
                step: "02",
                title: "Preview",
                description: "Your video loads with a preview player",
              },
              {
                step: "03",
                title: "Choose Format",
                description: "Select MP3, AAC, or WAV output format",
              },
              {
                step: "04",
                title: "Set Bitrate",
                description: "Choose audio quality from 128 to 320 Kbps",
              },
              {
                step: "05",
                title: "Download",
                description: "Extract and download your audio file",
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
              Everything you need to know about audio extraction
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
