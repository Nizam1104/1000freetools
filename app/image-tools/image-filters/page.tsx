import { ImageFilters } from "@/components/image-tools/image-filters/ImageFilters";
import { ImageFiltersSEO } from "@/components/seo-content/image-tools/ImageFilters";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Photo Filters - Apply Instagram Style Effects",
  description:
    "Apply stunning photo filters online. Add vintage effects, black and white tones, Instagram-style presets, and artistic enhancements directly in your browser.",
  keywords:
    "photo filters online, image filters, camera effects, vintage filter, black and white photo, instagram filters, free photo effects",
  openGraph: {
    title: "Free Online Photo Filters - Add Instant Effects",
    description:
      "Apply stunning photo filters online. Add vintage effects and artistic enhancements directly in your browser.",
    type: "website",
    url: "https://1000freetools.com/image-tools/image-filters",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/image-filters",
  },
};

export default function ImageFiltersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Free Online Photo Filters
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Transform your pictures with premium visual effects. Apply
          Instagram-style color grading, vintage tones, and dramatic finishes.
        </p>
      </div>

      <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 w-full">
        <ImageFilters />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert">
        <ImageFiltersSEO />
      </div>
    </div>
  );
}
