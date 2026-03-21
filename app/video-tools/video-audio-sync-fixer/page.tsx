import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import VideoAudioSyncFixer from "@/components/video-tools/video-audio-sync-fixer";
import VideoAudioSyncFixerSEO from "@/components/seo-content/video-tools/video-audio-sync-fixer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Video Audio Sync Fixer – Fix Audio Sync Issues Free Online",
  description: "Fix audio and video sync issues by adjusting audio delay. Free online video audio sync fixer for MP4, MOV, MKV and more.",
  alternates: {
    canonical: "https://1000freetools.com/video-tools/video-audio-sync-fixer",
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

export default function VideoAudioSyncFixerPage() {
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
              <BreadcrumbLink href="/video-tools">Video Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/video-tools/video-audio-sync-fixer">Video Audio Sync Fixer</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-3">Video Audio Sync Fixer</h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Fix annoying lip-sync and audio delay issues without re-encoding your entire video. Nudge the audio track forward or backward by milliseconds until it lines up perfectly with the video. Simple, fast, and free.
        </p>
      </div>

      <VideoAudioSyncFixer />

      <VideoAudioSyncFixerSEO />

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
