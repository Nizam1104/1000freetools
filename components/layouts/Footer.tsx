"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Twitter, Wrench } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const toolsByCategory = [
  {
    categoryName: "Image Tools",
    tools: [
      {
        name: "Image Compressor",
        description:
          "Compress images online - reduce file size while maintaining quality",
        href: "/image-tools/image-compressor",
      },
      {
        name: "Image Editor",
        description: "Edit images online with powerful editing tools",
        href: "/image-tools/image-editor",
      },
      {
        name: "Pick Color Code from Image",
        description:
          "Extract color codes from images - get HEX, RGB, HSL values",
        href: "/image-tools/pick-color-code-from-image",
      },
      {
        name: "Image Format Conversions",
        description:
          "Convert images between different formats - JPEG, PNG, WebP, AVIF and more",
        href: "/image-tools/image-format-conversions",
      },
      {
        name: "Background Remover",
        description: "Remove background from images automatically",
        href: "/image-tools/background-remover",
      },
      {
        name: "Image to GIF",
        description: "Convert images to animated GIF format",
        href: "/image-tools/image-to-gif",
      },
      {
        name: "Image Filters",
        description: "Apply beautiful filters and effects to your images",
        href: "/image-tools/image-filters",
      },
      {
        name: "Crop Image",
        description: "Crop images to your desired size and aspect ratio",
        href: "/image-tools/crop-image",
      },
      {
        name: "Sharpen Image",
        description: "Enhance image sharpness and clarity online",
        href: "/image-tools/sharpen-image",
      },
      {
        name: "Resize Image Dimensions",
        description: "Resize images by changing width and height dimensions",
        href: "/image-tools/resize-image-dimensions",
      },
      {
        name: "Image to PDF",
        description: "Convert images to PDF documents",
        href: "/image-tools/image-to-pdf",
      },
      {
        name: "Add Watermark on Image",
        description: "Add text or image watermarks to protect your photos",
        href: "/image-tools/add-watermark-on-image",
      },
      {
        name: "Blur Image",
        description: "Apply blur effect to images or specific areas",
        href: "/image-tools/blur-image",
      },
    ],
  },
  {
    categoryName: "Design Tools",
    tools: [
      { name: "Favicon Generator", href: "/design-tools/favicon-generator" },
    ],
  },
  {
    categoryName: "Developer Tools",
    tools: [
      {
        name: "Mock Data Generator",
        href: "/developer-tools/mock-data-generator",
      },
    ],
  },
  {
    categoryName: "CSV Tools",
    tools: [
      {
        name: "CSV Viewer",
        href: "/csv-tools/csv-viewer",
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

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Wrench className="h-6 w-6" />
              <span className="font-bold text-lg">1000 Free Tools</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              A great collection of tools for everyday tasks.
            </p>
            <div className="flex space-x-3">
              <Link
                href="https://x.com/1000freetools"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Quick Links Section */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Popular Tools Section */}
        <div className="lg:col-span-3">
          <h3 className="font-semibold mb-4 mt-8">Popular Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsByCategory.map((category, index) => (
              <div key={index}>
                <h4 className="font-medium mb-3 text-foreground">
                  {category.categoryName}
                </h4>
                <ul className="space-y-2">
                  {category.tools.map((tool, toolIndex) => (
                    <li key={toolIndex}>
                      <Link
                        href={tool.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 1000 Free Tools. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
