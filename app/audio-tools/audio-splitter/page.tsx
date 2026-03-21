import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import AudioSplitter from "@/components/audio-tools/audio-splitter";
import AudioSplitterSEO from "@/components/seo-content/audio-tools/audio-splitter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Audio Splitter – Split Audio Files Online Free",
  description: "Split audio files into multiple parts by time or silence. Free online audio splitter for MP3, WAV, FLAC. No installation required.",
  alternates: {
    canonical: "https://1000freetools.com/audio-tools/audio-splitter",
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

export default function AudioSplitterPage() {
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
              <BreadcrumbLink href="/audio-tools/audio-splitter">Audio Splitter</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-3">Audio Splitter</h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Divide a long audio file into multiple parts with precision. Split by time intervals, at specific timestamps, or automatically on silence. Perfect for breaking up podcasts, albums, or long recordings into individual segments.
        </p>
      </div>

      <AudioSplitter />

      <AudioSplitterSEO />

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
