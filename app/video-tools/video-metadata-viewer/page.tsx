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
      "How do I check the real resolution and frame rate of a video file?",
    answer:
      "Open the file picker or drop your video onto the tool. The analyzer reads the file headers in your browser and displays the width, height, frame rate, codec, and bitrate within a second. No software download is needed and the file is never sent to a server.",
  },
  {
    question: "Does this tool upload my video to read the metadata?",
    answer:
      "No. The analyzer uses browser File APIs to read the file headers from your local device. The video data is processed in your browser's memory and never transferred over your network connection. This means even multi-gigabyte files produce results almost instantly.",
  },
  {
    question: "What codec information does this tool show?",
    answer:
      "The tool reports the codec identifier for both the video and audio tracks. For video, common values are avc1 for H.264, hev1 for H.265, and vp09 for VP9. For audio, common values are mp4a for AAC and ac-3 for Dolby AC3. Knowing the codec helps you identify whether a file will play on a specific device or whether it needs to be transcoded.",
  },
  {
    question: "Why does my video play on one device but not another?",
    answer:
      "The codec identifier in the metadata usually explains this. A file using an H.265 video track or an AC3 audio track will not play on devices that lack a hardware or software decoder for those formats. The metadata viewer shows you the exact codec string, which tells you which format to convert the file to so it plays on the target device.",
  },
  {
    question: "Can I read metadata from audio files like MP3 and WAV?",
    answer:
      "Yes. The tool supports audio files as well as video files. For an MP3 or AAC file, it reports the audio codec, bitrate, sample rate, and number of channels. For a WAV file, it reports the sample rate and bit depth. This is useful for checking audio quality before editing or distribution.",
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
              Read codec, resolution, frame rate, bitrate, sample rate, and
              channel count directly from any video or audio file. Results
              appear in under a second. No uploads, no software, and no account
              required.
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
              This tool reads the header data embedded in your video or audio
              file and displays the technical properties stored there. Those
              properties include the video codec, resolution, frame rate,
              bitrate, duration, audio codec, sample rate, and channel count.
              Understanding these values helps you diagnose playback problems,
              verify delivery specifications before submitting to a broadcaster
              or platform, and decide which settings to use when converting a
              file. All reading happens in your browser so no data leaves your
              device.
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
            <h3 className="relative font-semibold text-xl">Load your file</h3>
            <p className="relative mt-2 text-sm text-muted-foreground text-left">
              Open the file picker or drag your video or audio file onto the
              tool. The analyzer accepts MP4, MOV, MKV, WebM, MP3, WAV, AAC, and
              other common formats. The file is read from your local drive and
              never uploaded to a server.
            </p>
          </div>
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="relative font-semibold text-xl">
              Review the results
            </h3>
            <p className="relative mt-2 text-sm text-muted-foreground text-left">
              The tool reads the file headers and displays the metadata within a
              second. Review the codec identifiers, resolution, frame rate,
              bitrate, and audio properties. If a value looks wrong or
              unexpected, that is often the cause of a playback or compatibility
              problem.
            </p>
          </div>
          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="relative font-semibold text-xl">
              Use the data to take action
            </h3>
            <p className="relative mt-2 text-sm text-muted-foreground text-left">
              Use the codec name to find a compatible converter. Use the
              resolution to confirm the file meets a platform's upload
              requirement. Use the bitrate to estimate whether the file is
              over-compressed. The metadata gives you the specific facts you
              need to decide the next step.
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
                Verifying the actual resolution of delivered footage
              </h3>
              <p className="text-sm text-muted-foreground">
                A client delivers a file labeled as 4K. The metadata viewer
                shows the resolution is 1920x1080 with upscale flags in the
                container. You can confirm the discrepancy before accepting the
                delivery and request the correct source files without needing to
                play the whole video first.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Diagnosing playback errors</h3>
              <p className="text-sm text-muted-foreground">
                A video file plays picture but produces no sound on a specific
                device. The metadata viewer shows the audio track uses AC3
                encoding rather than AAC. Most browsers and mobile devices do
                not have an AC3 decoder, so the audio track is silently dropped.
                Converting the audio to AAC resolves the problem.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">
                Confirming broadcast delivery specs
              </h3>
              <p className="text-sm text-muted-foreground">
                Television and streaming platform deliveries require specific
                frame rates, bitrates, and codec identifiers. Before submitting
                a finished file, check the metadata to confirm the frame rate is
                exactly 23.976fps, the bitrate falls within the required range,
                and the video codec matches the specification sheet.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Auditing an audio archive</h3>
              <p className="text-sm text-muted-foreground">
                A batch of old podcast episodes needs to be re-uploaded at a
                consistent quality level. Check each file's bitrate and sample
                rate using the viewer. Files encoded below 128kbps or at 22kHz
                sample rate can be identified quickly so you know which ones
                need to be sourced from the original recordings rather than
                re-encoded from the existing compressed files.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">
                Checking codec compatibility before embedding
              </h3>
              <p className="text-sm text-muted-foreground">
                WebM files using VP9 video save bandwidth on most browsers but
                do not play in Safari. Before embedding a video on a website,
                check the codec identifier in the metadata. If it shows vp09,
                you need to provide an H.264 MP4 fallback so Safari users see
                the video rather than a blank player.
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
                <h3 className="font-bold text-lg">Codec Identifier</h3>
                <p className="text-muted-foreground mt-2">
                  The codec identifier tells you the specific algorithm used to
                  compress and store the video or audio data. Common video codec
                  identifiers include avc1 for H.264, hev1 or hvc1 for H.265,
                  and vp09 for VP9. Common audio identifiers include mp4a for
                  AAC and ac-3 for Dolby. Knowing the codec lets you find the
                  right converter or decoder when a file will not play on a
                  specific device.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Bitrate</h3>
                <p className="text-muted-foreground mt-2">
                  Bitrate measures how much data is used per second of video or
                  audio, usually expressed in kilobits per second (kbps) or
                  megabits per second (Mbps). A higher bitrate means more data
                  per second, which generally preserves more image or sound
                  detail. A very low bitrate explains visible blockiness during
                  fast motion or heavy compression artifacts in still frames.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Resolution and Frame Rate</h3>
                <p className="text-muted-foreground mt-2">
                  Resolution is the pixel grid size, expressed as width by
                  height. Common values are 1920x1080 for Full HD and 3840x2160
                  for 4K. Frame rate is the number of still images shown per
                  second, expressed in frames per second (fps). Common values
                  are 24fps for film, 30fps for broadcast, and 60fps for sports
                  and gaming. These two values together define the format of the
                  video track.
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
