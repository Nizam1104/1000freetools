import { PickColorCodeFromImage } from "@/components/image-tools/pick-color-code-from-image/PickColorCodeFromImage";
import { PickColorCodeFromImageSEO } from "@/components/seo-content/image-tools/PickColorCodeFromImage";
import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Pick Color Code from Image - Get HEX and RGB Values Online",
  description:
    "Extract exact HEX and RGB color codes from any image instantly. Upload an image, click any pixel, and copy the precise color code.",
  keywords:
    "pick color from image, image color picker, get hex code from image, extract rgb from picture, find color in image online, free color picker",
  openGraph: {
    title: "Free Image Color Picker - Extract Hex/RGB Codes",
    description:
      "Extract exact HEX and RGB color codes from any image instantly. Click a pixel and copy the precise color data directly in your browser.",
    type: "website",
    url: "https://1000freetools.com/image-tools/pick-color-code-from-image",
  },
  alternates: {
    canonical:
      "https://1000freetools.com/image-tools/pick-color-code-from-image",
  },
};

export default function PickColorCodeFromImagePage() {
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
                href="/image-tools/pick-color-code-from-image"
                className="text-foreground"
              >
                Pick Color Code from Image
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 mt-4">
          Online Image Color Picker
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Extract precise HEX and RGB color codes from any image. Click any
          pixel and copy the color value instantly.
        </p>
      </div>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <PickColorCodeFromImage />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert max-w-none">
        <PickColorCodeFromImageSEO />
      </div>
    </div>
  );
}
