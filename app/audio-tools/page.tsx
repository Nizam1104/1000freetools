import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";

const audioTools = [
  {
    name: "Audio Compressor",
    description: "Compress audio files - reduce file size online",
    href: "/audio-tools/audio-compressor",
  },
  {
    name: "Audio Format Converter",
    description: "Convert between audio formats - MP3, WAV, AAC, FLAC and more",
    href: "/audio-tools/audio-format-converter",
  },
  {
    name: "Audio Trimmer",
    description: "Trim audio files - cut start and end points precisely",
    href: "/audio-tools/audio-trimmer",
  },
  {
    name: "Audio Merger",
    description: "Merge multiple audio files into one",
    href: "/audio-tools/audio-merger",
  },
  {
    name: "Audio Speed Changer",
    description: "Change audio playback speed without affecting pitch",
    href: "/audio-tools/audio-speed-changer",
  },
  {
    name: "Audio Pitch Changer",
    description: "Change audio pitch without affecting speed",
    href: "/audio-tools/audio-pitch-changer",
  },
  {
    name: "Audio Volume Adjuster",
    description: "Increase or decrease audio volume levels",
    href: "/audio-tools/audio-volume-adjuster",
  },
  {
    name: "Audio Normalizer",
    description: "Normalize audio volume to consistent levels",
    href: "/audio-tools/audio-normalizer",
  },
  {
    name: "Audio Fade In Out",
    description: "Add fade in and fade out effects to audio",
    href: "/audio-tools/audio-fade-in-out",
  },
  {
    name: "Audio Equalizer Basic",
    description: "Adjust audio frequencies with basic EQ controls",
    href: "/audio-tools/audio-equalizer-basic",
  },
  {
    name: "Audio Bitrate Changer",
    description: "Change audio bitrate to reduce file size or improve quality",
    href: "/audio-tools/audio-bitrate-changer",
  },
  {
    name: "Audio Sample Rate Converter",
    description: "Convert audio sample rate - 44.1kHz, 48kHz, 96kHz and more",
    href: "/audio-tools/audio-sample-rate-converter",
  },
  {
    name: "Audio Resampler",
    description: "Resample audio to different sample rates",
    href: "/audio-tools/audio-resampler",
  },
  {
    name: "Audio Mono Stereo Converter",
    description: "Convert between mono and stereo audio",
    href: "/audio-tools/audio-mono-stereo-converter",
  },
  {
    name: "Audio Channel Splitter",
    description: "Split stereo audio into left and right channels",
    href: "/audio-tools/audio-channel-splitter",
  },
  {
    name: "Audio Channel Remover",
    description: "Remove left or right channel from stereo audio",
    href: "/audio-tools/audio-channel-remover",
  },
  {
    name: "Audio Silence Remover",
    description: "Remove silent parts from audio automatically",
    href: "/audio-tools/audio-silence-remover",
  },
  {
    name: "Audio Clip Maker",
    description: "Create short audio clips from longer files",
    href: "/audio-tools/audio-clip-maker",
  },
  {
    name: "Audio Loop Maker",
    description: "Create seamless loops from audio files",
    href: "/audio-tools/audio-loop-maker",
  },
  {
    name: "Audio Reverse",
    description: "Reverse audio files - play backwards",
    href: "/audio-tools/audio-reverse",
  },
  {
    name: "Audio Splitter",
    description: "Split audio files into multiple parts",
    href: "/audio-tools/audio-splitter",
  },
  {
    name: "Audio Track Extractor",
    description: "Extract audio tracks from video files",
    href: "/audio-tools/audio-track-extractor",
  },
  {
    name: "Audio Sample Extractor",
    description: "Extract samples from audio files",
    href: "/audio-tools/audio-sample-extractor",
  },
  {
    name: "Audio Metadata Editor",
    description: "Edit ID3 tags and metadata in audio files",
    href: "/audio-tools/audio-metadata-editor",
  },
  {
    name: "Audio Cover Art Adder",
    description: "Add cover art images to audio files",
    href: "/audio-tools/audio-cover-art-adder",
  },
  {
    name: "Audio Cover Art Extractor",
    description: "Extract cover art images from audio files",
    href: "/audio-tools/audio-cover-art-extractor",
  },
  {
    name: "Audio Frequency Analyzer",
    description: "Analyze audio frequency spectrum and distribution",
    href: "/audio-tools/audio-frequency-analyzer",
  },
  {
    name: "Audio Loudness Meter",
    description: "Measure audio loudness levels - LUFS, RMS, Peak",
    href: "/audio-tools/audio-loudness-meter",
  },
  {
    name: "Audio Gain Analyzer",
    description: "Analyze audio gain and dynamic range",
    href: "/audio-tools/audio-gain-analyzer",
  },
  {
    name: "Audio Waveform Generator",
    description: "Generate waveform visualization from audio",
    href: "/audio-tools/audio-waveform-generator",
  },
  {
    name: "Audio Thumbnail Generator",
    description: "Generate thumbnail images from audio files",
    href: "/audio-tools/audio-thumbnail-generator",
  },
];

export const metadata: Metadata = {
  title: "Free Audio Tools",
  description:
    "Free online audio tools. Compress, edit, convert, and optimize audio files with ease.",
  openGraph: {
    title: "Free Audio Tools",
    description:
      "Free online audio tools. Compress, edit, convert, and optimize audio files with ease.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/audio-tools",
  },
};

export default function AudioToolsPage() {
  const faqsData = [
    {
      question: "What audio formats do you support?",
      answer:
        "We support MP3, WAV, AAC, FLAC, OGG, M4A, and other common audio formats. You can compress, convert, edit, and optimize audio in all these formats.",
    },
    {
      question: "Are all these tools Free?",
      answer:
        "Yes! all current and upcoming tools are free to use. No hidden charges, no premium plans, no limits.",
    },
    {
      question: "Do you store my audio files?",
      answer:
        "No! all audio files are processed in your browser and never leaves the device.",
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
              Free Audio Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online audio tools. Compress, edit, convert, and optimize
              audio files with ease. All processing happens directly in your
              browser, so your audio files stay private and never touch our
              servers.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            All Available Tools
          </h2>
          <ToolLinkCards tools={audioTools} />
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Why use 1000freetools?
            </h2>
            <p className="text-muted-foreground mb-6">
              1000freetools is a free online tool that helps you compress, edit,
              convert, and optimize audio files with ease. All processing
              happens directly in your browser, so your audio files stay private
              and never touch our servers.
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
