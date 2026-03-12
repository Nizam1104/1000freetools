import { SharpenImage } from "@/components/image-tools/sharpen-image/SharpenImage";
import { SharpenImageSEO } from "@/components/seo-content/image-tools/SharpenImage";
import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Sharpen Image Online - Fix Blurry Photos Free",
  description:
    "Sharpen blurry photos online instantly. Improve image clarity, enhance edge details, and fix out-of-focus pictures. All processing in your browser.",
  keywords:
    "sharpen image, unblur photo, fix blurry picture, clear up photo online, image enhancer, sharpen photo, enhance edge detail",
  openGraph: {
    title: "Free Image Sharpener - Fix Blurry Photos Online",
    description:
      "Sharpen blurry photos online instantly. Improve image clarity and enhance edge details in your browser.",
    type: "website",
    url: "https://1000freetools.com/image-tools/sharpen-image",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/sharpen-image",
  },
};

export default function SharpenImagePage() {
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
                href="/image-tools/sharpen-image"
                className="text-foreground"
              >
                Sharpen Image
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 mt-4">
          Online Image Sharpening Tool
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Fix blurry photographs and restore lost crispness in your browser.
          Boost edge details without compromising privacy.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="my-8">
          <SharpenImage />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert max-w-none">
        <SharpenImageSEO />
      </div>
    </div>
  );
}
