import ChangeImageDimensions from "@/components/image-tools/change-image-dimensions/ChangeImageDimensions";
import { ResizeImageSEO } from "@/components/seo-content/image-tools/ResizeImage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resize Image Dimensions Online - Free Image Resizer",
  description:
    "Resize image dimensions quickly and easily online. Change width and height without losing quality. Supports JPG, PNG, WebP.",
  keywords:
    "resize image, change image dimensions, image resizer online, scale photo, change width and height, free photo resizer, image scalar",
  openGraph: {
    title: "Free Image Resizer - Resize Image Dimensions Online",
    description:
      "Resize image dimensions quickly and easily online. Change image width and height securely in your browser.",
    type: "website",
    url: "https://1000freetools.com/image-tools/resize-image-dimensions",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/resize-image-dimensions",
  },
};

export default function ChangeImageDimensionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Free Online Image Resizer
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Change the width and height of your photos instantly. Scale image
          dimensions directly in your browser while maintaining quality.
        </p>
      </div>

      <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 w-full">
        <ChangeImageDimensions />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert max-w-none">
        <ResizeImageSEO />
      </div>
    </div>
  );
}
