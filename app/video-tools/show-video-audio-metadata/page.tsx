"use client";

import MetaDataViewer from "@/components/video-tools/MetaDataViewer";
import Faqs from "@/components/utils/Faqs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Film,
  Music,
  Shield,
  Zap,
  Upload,
  FileVideo,
  FileAudio,
  Settings,
  Eye,
  Download,
  Globe,
  CheckCircle2,
} from "lucide-react";

const faqData = [
  {
    question: "Is this video metadata viewer really free?",
    answer:
      "Yes, completely. There are no usage limits, no sign-up requirements, and no premium tiers. You can view audio and video file metadata in your browser as many times as you need at no cost.",
  },
  {
    question: "Do my files get uploaded to a server?",
    answer:
      "No. This is one of the key advantages of our tool. All metadata extraction happens locally inside your browser using client-side processing. Your files are never transmitted or stored anywhere — making it ideal for sensitive or proprietary media.",
  },
  {
    question:
      "How do I check video metadata without installing software?",
    answer:
      'Simply open this page in your browser, click "Select a File," and choose your video or audio file. Results appear within seconds — no installation, no plugins, no extensions required.',
  },
  {
    question: "Which file formats are supported?",
    answer:
      "The tool supports all major formats including MP4, MOV, WebM, MKV, MP3, WAV, AAC, FLAC, Ogg, and MPEG-TS. If you need to read MP4 metadata online or check the specs of a lesser-known container, this tool handles it.",
  },
  {
    question: "Can I see the codec and bitrate of my video file?",
    answer:
      "Yes. For every track in your file, you'll get the codec name, codec parameter string, average bitrate, packet count, and packet rate. For video tracks you also get resolution, frame rate, color space, and HDR information — everything you need to check video resolution, codec, and bitrate in one place.",
  },
];

export default function ShowVideoAudioMetadata() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="container relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Film className="h-4 w-4" />
              100% Free & Private
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              Free Online Video & Audio
              <br />
              <span className="text-primary">Metadata Viewer</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              View detailed metadata from video and audio files instantly. No uploads,
              no software, no waiting — everything happens in your browser.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                No Upload Required
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Instant Results
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                All Formats
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tool Section */}
      <section className="container relative mx-auto max-w-6xl px-4 pb-12">
        <div className="relative">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-xl opacity-50" />
          <div className="relative rounded-3xl border bg-card/50 backdrop-blur-sm shadow-2xl">
            <MetaDataViewer />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            What You'll See
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get comprehensive technical details about your media files
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: FileVideo,
              title: "File Info",
              description: "Name, size, format, and full MIME type",
            },
            {
              icon: Settings,
              title: "Track Details",
              description: "Codec, language, duration, time resolution, and browser compatibility",
            },
            {
              icon: Eye,
              title: "Video Properties",
              description: "Resolution, frame rate, color space, HDR status, and rotation",
            },
            {
              icon: Music,
              title: "Audio Properties",
              description: "Sample rate and channel configuration (mono, stereo, etc.)",
            },
            {
              icon: Zap,
              title: "Packet Statistics",
              description: "Average bitrate, packet count, and packet rate per track",
            },
            {
              icon: Download,
              title: "Embedded Tags",
              description: "Title, artist, album, genre, date, and embedded cover art",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-muted/50 bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg hover:border-primary/20"
            >
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* What Is Metadata Section */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
          <CardContent className="p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  What Is Media File Metadata?
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Media metadata is the hidden technical information embedded inside
                  every video and audio file. It describes how a file was encoded,
                  not just what it contains. This includes details like the codec
                  used, resolution, bit rate, frame rate, audio channels, sample
                  rate, and duration.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Metadata is essential for compatibility checks, quality assurance,
                  archiving, and troubleshooting playback issues. For example,
                  knowing that a video file uses H.265 instead of H.264 tells you
                  immediately whether it will play on a given device — without
                  pressing play.
                </p>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 to-primary/5 blur-xl" />
                <div className="relative rounded-2xl border bg-card p-6 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileVideo className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Video Codec</p>
                        <p className="text-xs text-muted-foreground">H.264 / H.265 / VP9</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Music className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Audio Codec</p>
                        <p className="text-xs text-muted-foreground">AAC / MP3 / FLAC</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Settings className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Resolution</p>
                        <p className="text-xs text-muted-foreground">1920x1080 / 3840x2160</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Bitrate</p>
                        <p className="text-xs text-muted-foreground">Variable / Constant</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Why Choose Section */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Why Use Our Free Media Metadata Viewer?
          </h2>
          <p className="mt-4 text-muted-foreground">
            The smart choice for professionals and enthusiasts alike
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Shield,
              title: "100% Private",
              description: "Your files never leave your device — processing happens entirely in your browser",
            },
            {
              icon: Zap,
              title: "Instant Access",
              description: "No software to install — works instantly in any modern browser",
            },
            {
              icon: Globe,
              title: "Broad Format Support",
              description: "MP4, MOV, WebM, MKV, MP3, WAV, AAC, FLAC, Ogg, MPEG-TS, and more",
            },
            {
              icon: CheckCircle2,
              title: "Deep Technical Detail",
              description: "Codec strings, bitrate, color space, and per-track packet stats",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-muted/50 bg-card/50 p-6 text-center transition-all hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
            >
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three simple steps to view your media metadata
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              step: "01",
              icon: Upload,
              title: "Select Your File",
              description: "Click the upload button and choose any video or audio file from your device",
            },
            {
              step: "02",
              icon: Zap,
              title: "Instant Analysis",
              description: "Our tool reads every layer of technical data from your file in seconds",
            },
            {
              step: "03",
              icon: Eye,
              title: "View Results",
              description: "Get a complete technical profile with codec, resolution, bitrate, and more",
            },
          ].map((item, index) => (
            <div key={index} className="relative">
              {index < 2 && (
                <div className="absolute left-1/2 top-16 hidden h-0.5 w-full -translate-x-1/2 bg-gradient-to-r from-primary/20 to-primary/5 sm:block" />
              )}
              <div className="relative text-center">
                <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                  <item.icon className="h-7 w-7" />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-6xl font-bold text-primary/5">
                  {item.step}
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

      {/* Supported Formats */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-muted/30 to-card">
          <CardContent className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                Supported File Formats
              </h2>
              <p className="mt-2 text-muted-foreground">
                Works with all major video and audio formats
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {["MP4", "MOV", "WebM", "MKV", "MP3", "WAV", "AAC", "FLAC", "Ogg", "MPEG-TS", "AVI", "WMV"].map(
                (format) => (
                  <span
                    key={format}
                    className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                  >
                    {format}
                  </span>
                )
              )}
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
            Everything you need to know about this tool
          </p>
        </div>
        <Faqs faqs={faqData} />
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Online Video & Audio Metadata Viewer",
            url: "https://1000freetools.com/video-tools/show-video-audio-metadata",
            description:
              "Free online tool to view detailed metadata from video and audio files. Check codec, resolution, bitrate, frame rate, and more — all in your browser with no uploads required.",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            featureList: [
              "View video and audio metadata",
              "Check codec and bitrate information",
              "See resolution and frame rate details",
              "Extract embedded metadata tags",
              "Preview video thumbnails",
              "100% client-side processing",
              "No file uploads required",
              "Support for MP4, MOV, WebM, MKV, MP3, WAV, and more",
            ],
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
    </div>
  );
}
