import { Metadata } from "next";
import AddWatermarkOnImage from "@/components/image-tools/add-watermark-on-image/AddWatermarkOnImage";
import { AddWatermarkOnImageSEO } from "@/components/seo-content/image-tools/AddWatermarkOnImage";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Add Watermark to Image Online - Free Image Watermark Tool",
  description:
    "Add text or image watermarks to your photos instantly. Protect your images with customizable watermarks. Free online tool, no registration required.",
  keywords:
    "watermark images, add watermark to photos, image watermark tool, text watermark, logo watermark, copyright watermark, protect images, free watermark tool",
  openGraph: {
    title: "Free Image Watermark Tool - Add Watermark to Images Online",
    description:
      "Add text or image watermarks to your photos instantly. Protect your images with customizable watermarks.",
    type: "website",
    url: "https://1000freetools.com/image-tools/add-watermark-on-image",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/add-watermark-on-image",
  },
};

const relatedTools = [
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
    description: "Extract color codes from images - get HEX, RGB, HSL values",
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
    name: "Blur Image",
    description: "Apply blur effect to images or specific areas",
    href: "/image-tools/blur-image",
  },
];

export default function AddWaterMarkOnImagePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Free Image Watermarking Tool Online
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Protect your creative work instantly. Apply customizable text and logo
          watermarks directly in your browser without losing quality.
        </p>
      </div>

      <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 w-full">
        <AddWatermarkOnImage />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert">
        <AddWatermarkOnImageSEO />
        <ToolLinkCards tools={relatedTools} />
      </div>
    </div>
  );
}
