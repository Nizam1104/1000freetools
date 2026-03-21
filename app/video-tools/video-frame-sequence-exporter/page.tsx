import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import VideoFrameSequenceExporter from "@/components/video-tools/video-frame-sequence-exporter";
import VideoFrameSequenceExporterSEO from "@/components/seo-content/video-tools/video-frame-sequence-exporter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Video Frame Sequence Exporter – Export Video Frames Free Online",
  description: "Export video frames as an image sequence (PNG/JPG). Free online frame sequence exporter for MP4, MOV, AVI and more.",
  alternates: {
    canonical: "https://1000freetools.com/video-tools/video-frame-sequence-exporter",
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

export default function VideoFrameSequenceExporterPage() {
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
              <BreadcrumbLink href="/video-tools/video-frame-sequence-exporter">Video Frame Sequence Exporter</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-3">Video Frame Sequence Exporter</h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Extract every frame — or a selected range — from a video file and export them as a numbered image sequence. Perfect for animation reference, motion analysis, visual effects work, or creating sprite sheets.
        </p>
      </div>

      <VideoFrameSequenceExporter />

      <VideoFrameSequenceExporterSEO />

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
