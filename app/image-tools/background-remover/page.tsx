"use client";

import RemoveImageBackground from "@/components/image-tools/remove-background/RemoveImageBackground";
import { BackgroundRemoverSEO } from "@/components/seo-content/image-tools/BackgroundRemover";
import Image from "next/image";

export default function BackgroundRemover() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Remove Image Backgrounds Online
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Remove backgrounds from images automatically using AI. Process up to
          25 images at once, all in your browser.
        </p>
      </div>

      <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 w-full">
        <RemoveImageBackground />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-4">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
          Before and After
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <span className="text-lg font-semibold">Original Image:</span>
            <Image
              src="https://static-assets.indeetools.com/images/img-bg-remove-tool-before.jpeg"
              alt="Before background removal with noisy surroundings"
              width={500}
              height={500}
              className="rounded shadow"
            />
          </div>
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <span className="text-lg font-semibold">
              Background Removed Image:
            </span>
            <Image
              src="https://static-assets.indeetools.com/images/img-bg-remove-tool-after.jpeg"
              alt="After background removal with transparent background"
              width={500}
              height={500}
              className="rounded shadow bg-grid-pattern"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert">
        <BackgroundRemoverSEO />
      </div>
    </div>
  );
}
