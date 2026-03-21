import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";

const videoTools = [
  {
    name: "Video Compressor",
    description: "Compress videos online - reduce file size, No size limit",
    href: "/video-tools/video-compressor",
  },
  {
    name: "Video MetaData Viewer",
    description: "See Video or Audio files metadata",
    href: "/video-tools/video-metadata-viewer",
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
    description: "Change video frame rate to 24fps, 30fps, 60fps or custom FPS",
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
    description: "Adjust video opacity and transparency with custom background",
    href: "/video-tools/video-transparency-maker",
  },
  {
    name: "Video Compressor Simple",
    description: "Simple and fast video compression tool",
    href: "/video-tools/video-compressor-simple",
  },
  {
    name: "Video Frame Rate Analyzer",
    description: "Analyze video frame rate and detect issues",
    href: "/video-tools/video-frame-rate-analyzer",
  },
  {
    name: "Video Resolution Analyzer",
    description: "Check video resolution and aspect ratio details",
    href: "/video-tools/video-resolution-analyzer",
  },
  {
    name: "Video Bitrate Changer",
    description: "Change video bitrate to reduce file size or improve quality",
    href: "/video-tools/video-bitrate-changer",
  },
  {
    name: "Video Metadata Remover",
    description: "Remove metadata and EXIF data from videos",
    href: "/video-tools/video-metadata-remover",
  },
  {
    name: "Video Metadata Editor",
    description: "Edit and update video metadata tags",
    href: "/video-tools/video-metadata-editor",
  },
  {
    name: "Video Fragmenter",
    description: "Split videos into smaller fragments or segments",
    href: "/video-tools/video-fragmenter",
  },
  {
    name: "Video Keyframe Extractor",
    description: "Extract keyframes from video files",
    href: "/video-tools/video-keyframe-extractor",
  },
  {
    name: "Video Track Remover",
    description: "Remove audio or subtitle tracks from videos",
    href: "/video-tools/video-track-remover",
  },
  {
    name: "Video Frame Extractor",
    description: "Extract individual frames from videos as images",
    href: "/video-tools/video-frame-extractor",
  },
  {
    name: "Video Frame Sequence to Video",
    description: "Convert sequence of images/frames into a video",
    href: "/video-tools/video-frame-sequence-to-video",
  },
  {
    name: "Video Audio Sync Fixer",
    description: "Fix audio sync issues in videos",
    href: "/video-tools/video-audio-sync-fixer",
  },
  {
    name: "Video Frame Sequence Exporter",
    description: "Export video as a sequence of frames",
    href: "/video-tools/video-frame-sequence-exporter",
  },
  {
    name: "Video Audio Remover",
    description: "Remove audio track from videos - create silent videos",
    href: "/video-tools/video-audio-remover",
  },
  {
    name: "Video Speed Changer",
    description: "Change video playback speed - slow motion or fast forward",
    href: "/video-tools/video-speed-changer",
  },
  {
    name: "Video Duration Cutter",
    description: "Cut video duration - trim start and end points",
    href: "/video-tools/video-duration-cutter",
  },
  {
    name: "Video Thumbnail Generator",
    description: "Generate thumbnails from videos automatically",
    href: "/video-tools/video-thumbnail-generator",
  },
];

export const metadata: Metadata = {
  title: "Free Video Tools",
  description:
    "Free online video tools. Compress, edit, convert, resize and optimize videos with ease.",
  openGraph: {
    title: "Free Video Tools",
    description:
      "Free online video tools. Compress, edit, convert, resize and optimize videos with ease.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/video-tools",
  },
};

export default function VideoToolsPage() {
  const faqsData = [
    {
      question: "What video formats do you support?",
      answer:
        "We support MP4, MOV, AVI, MKV, WMV, WebM, and other common video formats. You can compress, convert, edit, and optimize videos in all these formats.",
    },
    {
      question: "Are all these tools Free?",
      answer:
        "Yes! all current and upcoming tools are free to use. No hidden charges, no premium plans, no limits.",
    },
    {
      question: "Do you store my videos?",
      answer:
        "No! all videos are processed in your browser and never leaves the device.",
    },
  ];

  // JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Video Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online video tools. Compress, edit, convert, resize and
              optimize videos with ease. All processing happens directly in your browser, so your videos stay private and
              never touch our servers.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            All Available Tools
          </h2>
          <ToolLinkCards tools={videoTools} />
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Why use 1000freetools?
            </h2>
            <p className="text-muted-foreground mb-6">
              1000freetools is a free online tool that helps you compress, edit,
              convert, resize and optimize videos with ease. All processing
              happens directly in your browser, so your videos stay private and
              never touch our servers.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12 mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <Faqs faqs={faqsData} />
        </section>
      </div>
    </>
  );
}
