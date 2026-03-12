import { BlurImage } from "@/components/image-tools/blur-image/BlurImage";
import { BlurImageSEO } from "@/components/seo-content/image-tools/BlurImage";
import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Blur Image Online - Free Photo Blur Tool",
  description:
    "Blur specific areas of images or the entire photo. Hide sensitive info, protect privacy, or add artistic effects. All processing in your browser.",
  keywords:
    "blur image online, free photo blur, blur picture, gaussian blur, pixelate image, protect privacy online, blur faces",
  openGraph: {
    title: "Free Online Image Blur Tool - Blur Photos Instantly",
    description:
      "Blur specific areas of images or the entire photo. Hide sensitive info, protect privacy, or add artistic effects.",
    type: "website",
    url: "https://1000freetools.com/image-tools/blur-image",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/blur-image",
  },
};

export default function BlurImagePage() {
  return (
    <div className="min-h-screen bg-background">
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
                href="/image-tools/blur-image"
                className="text-foreground"
              >
                Blur Image
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 mt-4">
          Free Online Image Blur Tool
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Obscure sensitive data and add artistic effects in your browser.
          Protect privacy instantly without installing software.
        </p>
      </div>

      <div className="container mx-auto py-8 w-full">
        <BlurImage />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert">
        <BlurImageSEO />
      </div>
    </div>
  );
}
