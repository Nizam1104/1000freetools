import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import AudioTrimmer from "@/components/audio-tools/audio-trimmer";
import AudioTrimmerSEO from "@/components/seo-content/audio-tools/audio-trimmer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Audio Trimmer – Cut & Crop Audio Files Online Free",
  description: "Trim and cut audio files instantly in your browser. Remove unwanted sections, crop to exact length. Supports MP3, WAV, FLAC and more. Free online audio trimmer.",
  alternates: {
    canonical: "https://1000freetools.com/audio-tools/audio-trimmer",
  },
};

const tools = [
  {
    name: "Audio Bitrate Changer",
    description: "Change audio bitrate to control size vs quality. Free online bitrate changer.",
    href: "/audio-tools/audio-bitrate-changer",
  },
  {
    name: "Audio Channel Remover",
    description: "Remove left or right audio channel from stereo files. Free online tool.",
    href: "/audio-tools/audio-channel-remover",
  },
  {
    name: "Audio Channel Splitter",
    description: "Split stereo audio into separate left/right mono channels. Free online splitter.",
    href: "/audio-tools/audio-channel-splitter",
  },
  {
    name: "Audio Clip Maker",
    description: "Create short audio clips from longer files. Free online clip maker.",
    href: "/audio-tools/audio-clip-maker",
  },
  {
    name: "Audio Compressor",
    description: "Compress audio to reduce file size. Free online audio compressor.",
    href: "/audio-tools/audio-compressor",
  },
  {
    name: "Audio Cover Art Adder",
    description: "Add album cover art to MP3 and FLAC files. Free online cover art adder.",
    href: "/audio-tools/audio-cover-art-adder",
  },
  {
    name: "Audio Cover Art Extractor",
    description: "Extract embedded album artwork from audio files. Free online extractor.",
    href: "/audio-tools/audio-cover-art-extractor",
  },
  {
    name: "Audio Equalizer Basic",
    description: "Adjust bass, mid, and treble EQ bands on audio files. Free online equalizer.",
    href: "/audio-tools/audio-equalizer-basic",
  },
];

export default function AudioTrimmerPage() {
  return (
    <div className="flex flex-col gap-y-4 max-w-6xl">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/audio-tools">Audio Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/audio-tools/audio-trimmer">Audio Trimmer</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-3">Audio Trimmer</h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Precisely cut and crop any audio file right in your browser — no installs, no uploads to a server. Select your start and end points, preview the result, and download your trimmed clip in seconds. Supports MP3, WAV, FLAC, OGG, AAC and most common audio formats.
        </p>
      </div>

      <AudioTrimmer />

      <AudioTrimmerSEO />

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
