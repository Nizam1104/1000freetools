import ImageToGif from "@/components/image-tools/image-to-gif/ImageToGif";
import { ImageToGifSEO } from "@/components/seo-content/image-tools/ImageToGif";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convert Images to GIF Online Free | Animated GIF Maker",
  description:
    "Create animated GIFs from multiple images instantly. Free online GIF converter with customizable speed, dimensions, and quality. 100% browser-based.",
  authors: [{ name: "1000freetools" }],
  creator: "1000freetools",
  publisher: "1000freetools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://1000freetools.com"),
  alternates: {
    canonical: "https://1000freetools.com/image-tools/image-to-gif",
  },
  openGraph: {
    title: "Convert Images to GIF Online Free | Animated GIF Maker",
    description:
      "Create animated GIFs from multiple images instantly. Free online GIF converter with customizable speed, dimensions, and quality.",
    url: "https://1000freetools.com/image-tools/image-to-gif",
    siteName: "1000freetools",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image-to-gif.jpg",
        width: 1200,
        height: 630,
        alt: "Convert Images to GIF Online Free Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert Images to GIF Online Free | Animated GIF Maker",
    description:
      "Create animated GIFs from multiple images instantly. Free online GIF converter with customizable speed, dimensions, and quality.",
    images: ["/og-image-to-gif.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ImageToGifPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Convert Images to GIF Online
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Transform multiple static photos into engaging animated sequences.
          Build custom GIFs entirely in your browser.
        </p>
      </div>

      <div className="container mx-auto py-6 w-full">
        <ImageToGif />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert max-w-none">
        <ImageToGifSEO />
      </div>
    </div>
  );
}
