import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import AudioChannelSplitter from "@/components/audio-tools/audio-channel-splitter";
import AudioChannelSplitterSEO from "@/components/seo-content/audio-tools/audio-channel-splitter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Audio Channel Splitter – Split Stereo to Mono Online Free",
  description: "Split stereo audio into separate left and right mono channels. Free online audio channel splitter for MP3, WAV, FLAC.",
  alternates: {
    canonical: "https://1000freetools.com/audio-tools/audio-channel-splitter",
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
  {
    name: "Audio Fade In Out",
    description: "Add fade-in and fade-out effects to audio. Free online audio fade editor.",
    href: "/audio-tools/audio-fade-in-out",
  },
];

export default function AudioChannelSplitterPage() {
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
              <BreadcrumbLink href="/audio-tools/audio-channel-splitter">Audio Channel Splitter</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-3">Audio Channel Splitter</h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Extract individual channels from a stereo or multi-channel audio file. Split a stereo track into separate left and right mono files — useful for audio editing, remixing, or isolating vocals and instruments.
        </p>
      </div>

      <AudioChannelSplitter />

      <AudioChannelSplitterSEO />

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
