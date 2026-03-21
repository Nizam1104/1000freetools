import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import AudioLoudnessMeter from "@/components/audio-tools/audio-loudness-meter";
import AudioLoudnessMeterSEO from "@/components/seo-content/audio-tools/audio-loudness-meter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Audio Loudness Meter – Measure LUFS & Loudness Free Online",
  description: "Measure audio loudness in LUFS, RMS, and peak levels. Free online audio loudness meter for MP3, WAV, FLAC. Instant analysis.",
  alternates: {
    canonical: "https://1000freetools.com/audio-tools/audio-loudness-meter",
  },
};

const tools = [
  {
    name: "Video Track Remover",
    description: "Remove specific tracks from video files. Free online track remover.",
    href: "/video-tools/video-track-remover",
  },
  {
    name: "Video Thumbnail Generator",
    description: "Generate thumbnail images from video frames. Free online thumbnail generator.",
    href: "/video-tools/video-thumbnail-generator",
  },
  {
    name: "Video Speed Changer",
    description: "Speed up or slow down video files. Free online video speed changer.",
    href: "/video-tools/video-speed-changer",
  },
  {
    name: "Video Resolution Analyzer",
    description: "Check video resolution, dimensions, and aspect ratio. Free online analyzer.",
    href: "/video-tools/video-resolution-analyzer",
  },
  {
    name: "Video Metadata Remover",
    description: "Strip metadata from video files to protect privacy. Free online remover.",
    href: "/video-tools/video-metadata-remover",
  },
  {
    name: "Video Metadata Editor",
    description: "Edit video metadata including title, author, and tags. Free online editor.",
    href: "/video-tools/video-metadata-editor",
  },
  {
    name: "Video Keyframe Extractor",
    description: "Extract keyframes from video as images. Free online keyframe extractor.",
    href: "/video-tools/video-keyframe-extractor",
  },
  {
    name: "Video Frame Sequence To Video",
    description: "Convert PNG/JPG frame sequences into video files. Free online converter.",
    href: "/video-tools/video-frame-sequence-to-video",
  },
];

export default function AudioLoudnessMeterPage() {
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
              <BreadcrumbLink href="/audio-tools/audio-loudness-meter">Audio Loudness Meter</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-3">Audio Loudness Meter</h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Analyze the loudness of your audio file and get LUFS, RMS, and peak measurements instantly. Essential for meeting streaming platform loudness standards (Spotify, YouTube, Apple Music) before publishing. No software needed.
        </p>
      </div>

      <AudioLoudnessMeter />

      <AudioLoudnessMeterSEO />

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
