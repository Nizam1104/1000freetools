import { ImageEditor } from "@/components/image-tools/image-editor/ImageEditor";
import { ImageEditorSEO } from "@/components/seo-content/image-tools/ImageEditor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Image Editor - Edit Photos in Browser",
  description:
    "Edit images online with filters, adjustments, and drawing tools. Crop, rotate, apply effects, add text. No download required.",
  keywords:
    "image editor, online image editor, photo editor, free image editor, image editing tools, crop image, rotate image, image filters, photo enhancer, browser image editor",
  openGraph: {
    title: "Free Online Image Editor - Edit Photos & Images",
    description:
      "Edit images online with powerful filters, adjustments, and drawing tools. Crop, rotate, apply effects, and enhance photos directly in your browser.",
    type: "website",
    url: "https://1000freetools.com/image-tools/image-editor",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/image-editor",
  },
};

export default function ImageEditorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Free Online Image Editor
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Edit photos professionally in your browser. Apply filters, crops, and
          color adjustments without downloading software.
        </p>
      </div>

      <div className="w-full">
        <div className="w-[85%] mx-auto py-6 sm:py-8">
          <ImageEditor />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert">
        <ImageEditorSEO />
      </div>
    </div>
  );
}
