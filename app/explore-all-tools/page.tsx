import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explore All Tools - 1000 Free Online Tools",
  description:
    "Browse all free online tools including image compressors, design utilities, developer tools and more. All tools run directly in your browser with no registration required.",
  openGraph: {
    title: "Explore All Tools - 1000 Free Online Tools",
    description:
      "Browse all free online tools including image compressors, design utilities, developer tools and more. All tools run directly in your browser with no registration required.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/explore-all-tools",
  },
};

// All tools data grouped by category
const toolsByCategory = [
  {
    categoryName: "Image Tools",
    tools: [
      {
        name: "Image Compressor",
        description:
          "Compress images without losing quality. Supports JPEG, PNG, WebP, AVIF, and more formats.",
        href: "/image-tools/image-compressor",
      },
    ],
  },
  {
    categoryName: "Design Tools",
    tools: [
      {
        name: "Favicon Generator",
        description:
          "Create Professional Looking Favicon for Free, supports text, image, and emojis",
        href: "/design-tools/favicon-generator",
      },
    ],
  },
  {
    categoryName: "Developer Tools",
    tools: [
      {
        name: "Mock Data Generator",
        description:
          "Generate realistic test data for your applications to speed up development and testing.",
        href: "/developer-tools/mock-data-generator",
      },
    ],
  },
  {
    categoryName: "Video Tools",
    tools: [
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
        description:
          "Change video frame rate to 24fps, 30fps, 60fps or custom FPS",
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
        description:
          "Extract audio from video files - save as MP3, AAC, or WAV",
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
        description:
          "Adjust video opacity and transparency with custom background",
        href: "/video-tools/video-transparency-maker",
      },
    ],
  },
];

export default function ExploreAllToolsPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Explore All Tools
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
            Browse our comprehensive collection of free online tools that run
            directly in your browser.
          </p>
        </div>
      </section>

      {/* Loop through each tool category */}
      {toolsByCategory.map((category, categoryIndex) => (
        <section key={categoryIndex} className="container mx-auto px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
            {category.categoryName}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 sm:gap-y-4 md:gap-y-6 gap-x-2 sm:gap-x-4 md:gap-x-6">
            {category.tools.map((tool, toolIndex) => (
              <Link
                href={tool.href}
                key={toolIndex}
                className="bg-card rounded-lg p-4 hover:shadow-xl border transition-shadow duration-300"
              >
                <h3 className="text-primary text-base md:text-xl font-semibold">
                  {tool.name}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
