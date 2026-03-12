import CropImage from "@/components/image-tools/crop-image/CropImage";
import { CropImageSEO } from "@/components/seo-content/image-tools/CropImage";
import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Crop Image Online - Free Image Cropper Tool",
  description:
    "Crop images online quickly and perfectly. Remove unwanted edges, reframe pictures, and focus on the main subject. Supports JPG, PNG, WebP.",
  keywords:
    "crop image, photo cropper online, free image cropper, resize image, trim photo, frame image, remove borders",
  openGraph: {
    title: "Free Image Cropper Tool - Crop Photos Online",
    description:
      "Crop your images online quickly and perfectly. Remove unwanted edges, reframe pictures, and focus on the main subject.",
    type: "website",
    url: "https://1000freetools.com/image-tools/crop-image",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/crop-image",
  },
};

export default function CropImagePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
                href="/image-tools/crop-image"
                className="text-foreground"
              >
                Crop Image
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 mt-4">
          Free Online Image Cropper
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Reframe your photos instantly in your browser. Remove unwanted edges,
          focus on specific subjects, and compose perfect images.
        </p>
      </div>

      <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 w-full">
        <CropImage />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert">
        <CropImageSEO />
      </div>
    </div>
  );
}
