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
  title: "Free Audio Tools – Compress, edit, convert in your browser",
  description:
    "Use 25+ free audio tools that run in your browser: trim, compress, convert formats, change speed or pitch, analyze LUFS, and more. Files never leave your device.",
  openGraph: {
    title: "Free Audio Tools – Compress, edit, convert in your browser",
    description:
      "Use 25+ free audio tools that run in your browser: trim, compress, convert formats, change speed or pitch, analyze LUFS, and more. Files never leave your device.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/audio-tools",
  },
};

export default function AudioToolsPage() {
  const faqsData = [
    {
      question: "What audio formats work here?",
      answer:
        "MP3, WAV, FLAC, OGG/Opus, AAC/M4A are supported for most tools. Some actions export MP3 by default; others can export WAV or WebM Opus depending on the tool.",
    },
    {
      question: "Are these tools free to use?",
      answer:
        "Yes. Everything on this page is free with no accounts and no usage caps.",
    },
    {
      question: "Do files upload to a server?",
      answer:
        "No. Processing happens in your browser using web APIs and the Mediabunny library. Your files do not leave your device.",
    },
    {
      question: "Will it work on my phone?",
      answer:
        "Modern mobile browsers work, but long files can hit memory limits on older devices. If a tab reloads during processing, try a shorter clip or use a desktop browser.",
    },
    {
      question: "Why does MP3 export sometimes fail elsewhere but works here?",
      answer:
        "MP3 encoding needs a small encoder module. These tools load it once per session so MP3 export is available without extra setup.",
    },
    {
      question: "What are realistic file size limits?",
      answer:
        "There is no hard limit set by the site. Practical limits depend on browser memory. A 1–2 hour stereo WAV may be too large for some laptops; MP3/Opus files of the same length usually work.",
    },
    {
      question: "Does changing speed keep the pitch the same?",
      answer:
        "The speed tool has a toggle. With preserve pitch on, it time-stretches without shifting key. With it off, speed and pitch change together.",
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
              25+ browser-based audio tools for everyday work: trim, compress,
              convert, change speed or pitch, split by silence, analyze LUFS,
              and more. Everything runs locally in your tab, so your audio
              stays on your device.
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
            <h2>How it works</h2>
            <p>
              The tools run client-side using modern web APIs (WebCodecs, Web
              Audio) through the Mediabunny library. You load a file, choose an
              action, and the page decodes small chunks, applies the
              transformation, and re-encodes the result. For MP3 export, a tiny
              encoder module loads in the tab and is registered once per
              session.
            </p>
            <p>
              Typical flow: pick a file, set options like bitrate, sample rate,
              trim points, or semitones, then process and download. Nothing is
              sent to a server.
            </p>

            <h2>Where these tools help</h2>
            <p>
              You want to cut two minutes from a lecture before sharing it with
              your class, but you do not want to install a DAW. Use the audio
              trimmer and export an MP3 in under a minute.
            </p>
            <p>
              You are practicing a solo and need it slower but in the same key.
              The speed changer can time-stretch while preserving pitch.
            </p>
            <p>
              You recorded a podcast that peaks too high in a few spots. Run it
              through the loudness and gain analyzers, then normalize to a
              target level before publishing.
            </p>
            <p>
              A client sent an M4A but your editor wants WAV. Convert formats in
              the browser, no round-trips to a server.
            </p>
            <p>
              You need a quick waveform image for a thumbnail. Generate a PNG
              from the audio without opening design software.
            </p>

            <h2>What to know before using it</h2>
            <p>
              Processing time scales with file length and your device. Long
              uncompressed WAV files consume more memory than MP3 or Opus.
              Mobile Safari can reload tabs on very large jobs; a desktop
              browser is more forgiving.
            </p>
            <p>
              Supported inputs cover common formats (MP3, WAV, FLAC, OGG/Opus,
              AAC/M4A). Some exports default to MP3 or WAV depending on the
              tool. Metadata editing works for common tags; embedded cover art
              support varies by format.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12 mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-center">Frequently asked questions</h2>
          <Faqs faqs={faqsData} />
        </section>
      </div>
    </>
  );
}
