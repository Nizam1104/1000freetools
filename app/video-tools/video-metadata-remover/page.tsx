import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import VideoMetadataRemover from "@/components/video-tools/video-metadata-remover";
import VideoMetadataRemoverSEO from "@/components/seo-content/video-tools/video-metadata-remover";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Video Metadata Remover – Strip Video Metadata Free Online",
  description: "Remove metadata from video files to protect privacy. Free online video metadata remover for MP4, MOV, MKV. Strip GPS, camera info, and more.",
  alternates: {
    canonical: "https://1000freetools.com/video-tools/video-metadata-remover",
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

export default function VideoMetadataRemoverPage() {
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
              <BreadcrumbLink href="/video-tools/video-metadata-remover">Video Metadata Remover</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-3">Video Metadata Remover</h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Erase embedded metadata from video files before sharing them publicly. Remove GPS coordinates, camera model, creation date, software info, and other personal data with one click — protecting your privacy without re-encoding the video.
        </p>
      </div>

      <VideoMetadataRemover />

      <VideoMetadataRemoverSEO />

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
