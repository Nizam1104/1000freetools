import ImageCompressor from "@/components/image-tools/image-compressor/ImageCompressor";
import { ImageCompressorSEO } from "@/components/seo-content/image-tools/ImageCompressor";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Image Compressor - Reduce File Size Online (Up to 50 Images)",
  description:
    "Compress JPEG, PNG, WebP, and AVIF images online while maintaining quality. Process single images or batch compress up to 50 files at once. All processing happens in your browser.",
  alternates: {
    canonical: "https://1000freetools.com/image-tools/image-compressor",
  },
};

const moreTools = [
  {
    name: "Favicon Generator",
    description: "Create Favicon for your website",
    href: "/design-tools/favicon-generator",
  },
  {
    name: "Video Compressor",
    description: "Compress videos online - reduce file size, No size limit",
    href: "/video-tools/video-compressor",
  },
];

export default function ImageCompressorPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="prose max-w-4xl mx-auto px-4 text-foreground">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-foreground">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/image-tools" className="text-foreground">
                  Image Tools
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/image-tools/image-compressor"
                  className="text-foreground"
                >
                  Image Compressor
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <h1 className="text-2xl font-semibold mt-4 mb-4 text-foreground">
          Compress Images Online
        </h1>
        <p className="mb-6 text-foreground">
          Reduce image file sizes while maintaining quality. Supports JPEG, PNG,
          WebP, and AVIF. Process up to 50 files at once, all in your browser.
        </p>

        <ImageCompressor />

        <ImageCompressorSEO />

        <section className="mt-8">
          <ToolLinkCards tools={moreTools} />
        </section>

        <div className="mt-8 p-4 rounded-lg text-sm border text-foreground">
          <p>
            <strong>Attribution:</strong> This tool uses compression libraries
            from{" "}
            <a
              href="https://github.com/GoogleChromeLabs/squoosh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Squoosh
            </a>
            , an image compression tool developed by Google Chrome Labs.
          </p>
        </div>
      </div>
    </div>
  );
}
