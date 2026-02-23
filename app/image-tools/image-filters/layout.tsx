import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Filters Online - Free Photo Filter Tool",
  description:
    "Apply professional image filters online for free. Transform photos with vintage, cinematic, artistic effects and more. No download required.",
  keywords: [
    "image filters",
    "photo filters",
    "online image editor",
    "free photo effects",
    "vintage filter",
    "cinematic filter",
    "image editing",
    "photo enhancement",
  ],
  authors: [{ name: "1000freetools" }],
  creator: "1000freetools",
  publisher: "1000freetools",
  robots: "index, follow",
  openGraph: {
    title: "Image Filters Online - Free Photo Filter Tool",
    description:
      "Apply professional image filters online for free. Transform photos with vintage, cinematic, artistic effects and more.",
    type: "website",
    url: "https://1000freetools.com/image-tools/image-filters",
    images: [
      {
        url: "/og-image-filters.jpg",
        width: 1200,
        height: 630,
        alt: "Image Filters Tool - Apply professional photo filters online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Filters Online - Free Photo Filter Tool",
    description:
      "Apply professional image filters online for free. Transform photos with vintage, cinematic, artistic effects.",
    images: ["/og-image-filters.jpg"],
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/image-filters",
  },
};

export default function ImageFiltersPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <main>{children}</main>
    </div>
  );
}
