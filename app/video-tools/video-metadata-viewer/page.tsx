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
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const faqData = [
  {
    question:
      "How do I check a video file's true internal resolution and framerate?",
    answer:
      'You simply drag the mysterious video file onto the dashboard surface to instantly rip open its structure. The viewer immediately scans the deeply embedded hex data, accurately revealing whether that supposedly "4K" file is actually a tiny 720p 30fps track deceptively stretched upward.',
  },
  {
    question:
      "Does this metadata viewer upload my massive unreleased movie to your server?",
    answer:
      "Absolutely not. Because the analyzer leverages specific client-side Web APIs, it purely reads the file headers from your local computer's memory. Your gigabyte-scale video never touches a cloud firewall, ensuring complete, impenetrable security for proprietary media.",
  },
  {
    question:
      "Can I find out exactly what secret codec my video is actually using?",
    answer:
      'Yes. Far beyond a generic ".MP4" extension, this tool digs into the specific mathematical architecture utilized, instantly reporting if your video is using a standard H.264 engine, an advanced H.265 (HEVC), or a powerful new VP9 algorithm.',
  },
  {
    question:
      "Why does my supposedly identical video file play badly on certain Apple devices?",
    answer:
      "Your metadata likely contains an invisible audio codec discrepancy. While both files might structurally appear as MP4s, the inspector could successfully reveal one file utilizes a universal AAC audio format, while the other secretly relies on an older AC3 codec that specific Apple mobile processors explicitly refuse to play.",
  },
  {
    question:
      "Can I use this inspector tool to see the metadata of an MP3 audio file?",
    answer:
      "Yes, it fully supports deep audio inspection. Injecting an MP3 or WAV file into the scanner accurately uncovers the core acoustic architecture, exposing the exact audio bitrate, the distinct sample rate (like 44.1kHz), and the total number of stereo or mono channels.",
  },
];

export default function ShowVideoAudioMetadata() {
  const relatedTools = [
    {
      name: "Video Compressor",
      description: "Compress videos online - reduce file size, No size limit",
      href: "/video-tools/video-compressor",
    },
    {
      name: "Video Player",
      description: "Play any video file format instantly, Supports subtitles",
      href: "/video-tools/video-player",
    },
    {
      name: "Video Format Converter",
      description:
        "Convert between video formats, Supports wide range of video formats",
      href: "/video-tools/video-format-converter",
    },
    {
      name: "Change Video FPS",
      description:
        "Change video frame rate to 24fps, 30fps, 60fps or custom FPS",
      href: "/video-tools/change-video-fps",
    },
    {
      name: "Crop Video",
      description: "Crop videos online - remove unwanted edges and reframe",
      href: "/video-tools/crop-video",
    },
    {
      name: "Enhance Video Quality",
      description: "Upscale, sharpen, denoise and improve video quality",
      href: "/video-tools/enhance-video-quality",
    },
    {
      name: "Extract Audio from Video",
      description: "Extract audio from video files - save as MP3, AAC, or WAV",
      href: "/video-tools/extract-audio-from-video",
    },
    {
      name: "Resize Video Dimensions",
      description: "Resize video to 4K, 1080p, 720p or custom dimensions",
      href: "/video-tools/resize-video-dimensions",
    },
    {
      name: "Rotate Video",
      description: "Rotate videos 90°, 180° or 270° - fix orientation",
      href: "/video-tools/rotate-video",
    },
    {
      name: "Video Color Space Transformation",
      description: "Adjust brightness, contrast, saturation, hue and more",
      href: "/video-tools/video-color-space-transformation",
    },
    {
      name: "Video Grayscale",
      description: "Convert videos to black and white instantly",
      href: "/video-tools/video-grayscale",
    },
    {
      name: "Video Overlays",
      description: "Add watermarks, logos or image overlays to videos",
      href: "/video-tools/video-overlays",
    },
    {
      name: "Video Transparency Maker",
      description:
        "Adjust video opacity and transparency with custom background",
      href: "/video-tools/video-transparency-maker",
    },
  ];
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
              View detailed metadata from video and audio files instantly. No
              uploads, no software, no waiting — everything happens in your
              browser.
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

      {/* What it Does Section */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
          <CardContent className="p-8 sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
              What it Does
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When a shady freelancer delivers an MP4 file that suspiciously
              stutters on your computer, you must instantly verify its internal
              architecture. This powerful browser utility forcibly rips open the
              video file's hidden structural layer, completely ignoring the
              visual images perfectly to scan deeply embedded text codes. By
              analyzing this invisible matrix locally on your hard drive, it
              reveals the absolute truth regarding exact framerates, concealed
              audio codecs, and specific compression bitrates without waiting
              hours for massive files to upload to an external cloud server.
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
              Deposit the mysterious file
            </h3>
            <p className="relative mt-2 text-sm text-muted-foreground text-left">
              Directly drag the problematic MP4, MKV, or audio track straight
              onto the digital scanner. Your browser immediately creates a
              secure, offline bridge to your system's temporary memory,
              guaranteeing that huge mult-gigabyte movie files never
              accidentally trigger a slow Wi-Fi upload block.
            </p>
          </div>
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="relative font-semibold text-xl">
              Let the engine rip
            </h3>
            <p className="relative mt-2 text-sm text-muted-foreground text-left">
              The internal WebAssembly parser brutally hacks through the outer
              video container almost instantly. Instead of attempting to play
              the actual movie, it aggressively hunts down the specialized
              header strings injected heavily into the very first few blocks of
              binary data.
            </p>
          </div>
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="relative font-semibold text-xl">
              Extract the hard data
            </h3>
            <p className="relative mt-2 text-sm text-muted-foreground text-left">
              In under a second, the interface accurately updates to expose the
              naked parameters. Clearly review the rigid frame dimensions,
              double-check the exact audio sample rate, or meticulously verify
              the specific digital codec signature to mathematically prove
              exactly why the file refuses to play correctly.
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
              <h3 className="font-bold mb-2">Exposing fake 4K video</h3>
              <p className="text-sm text-muted-foreground">
                Video editors receiving raw footage often suspect the cameraman
                secretly shot in blurry 1080p and deceptively upscaled the
                timeline export. Directly scanning the raw video file’s metadata
                instantly reveals its true structural dimensions, completely
                verifying the underlying resolution without needing to install
                complicated desktop analysis programs.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">
                Troubleshooting playback errors
              </h3>
              <p className="text-sm text-muted-foreground">
                Digital archivists dealing with a massive hard drive of ancient
                AVIs frequently encounter files that play clean video but
                absolutely zero audio. Utilizing the metadata scanner reliably
                proves that the video features a highly obscure, unsupported
                internal audio codec, giving them the exact technical
                information needed to transcode perfectly.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">
                Verifying rigid broadcast limits
              </h3>
              <p className="text-sm text-muted-foreground">
                Television directors preparing to heavily distribute a
                commercial spot are bound by intensely strict network delivery
                specifications. Passing the final render file through the
                inspector strongly guarantees the frame rate is locked at
                exactly 23.976fps and the bitrate hits the required density,
                totally avoiding a catastrophic rejection.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">
                Auditing massive podcast archives
              </h3>
              <p className="text-sm text-muted-foreground">
                Audio engineers attempting to remaster an enormous backlog of
                five-year-old MP3 podcast episodes desperately need to
                understand their core audio quality baseline. Dropping the files
                into the scanner instantly reveals the bitrate density and the
                channel frequency without opening a heavy audio editing
                application.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">
                Preventing Apple ecosystem failures
              </h3>
              <p className="text-sm text-muted-foreground">
                Designers trying to strictly optimize a web banner video heavily
                target the VP9 codec for massive file size savings, but fear
                alienating Safari users. Scanning the final WebM file securely
                verifies its internal structure, confirming if the file
                genuinely requires a secondary MP4 fallback loop to successfully
                play on older iPhones.
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
                <h3 className="font-bold text-lg">Codec Designation</h3>
                <p className="text-muted-foreground mt-2">
                  The codec is the extremely complex mathematical formula
                  heavily utilized to compress the raw visual information into a
                  manageable size. Identifying complex strings like "avc1"
                  firmly indicates you are using the highly compatible H.264
                  video compression standard, whereas finding "vp09" proves your
                  video requires significant modern processing.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Bitrate Density</h3>
                <p className="text-muted-foreground mt-2">
                  This precise metric heavily dictates exactly how much gigabyte
                  data is physically shoved through the processor every single
                  second. A shockingly low bitrate mathematically guarantees
                  your video will instantly dissolve into ugly pixelated blocks
                  during fast motion, while an intensely high number explains
                  why your short clip requires massive storage capacity.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Resolution Framework</h3>
                <p className="text-muted-foreground mt-2">
                  The specific grid coordinates, like 1920x1080, entirely
                  dictate the literal physical volume of pixels forcibly
                  arranged in horizontal and vertical lines. Knowing your true
                  resolution strongly guarantees you perfectly match the video
                  editing sequence settings inside Premiere Pro or strictly meet
                  harsh YouTube upload requirements.
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
            Everything you need to know about this tool
          </p>
        </div>
        <Faqs faqs={faqData} />
      </section>

      <ToolLinkCards tools={relatedTools} />

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
