import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Image Sharpening Tool - Enhance Photo Clarity",
  description:
    "Sharpen your images instantly with our free online tool. Adjust sharpness intensity, enhance details, and download results with no watermarks or registration needed.",
  keywords: [
    "image sharpen",
    "photo sharpening tool",
    "online image sharpen",
    "enhance image clarity",
    "photo editing",
    "image processing",
  ],
  openGraph: {
    title: "Free Online Image Sharpening Tool - Enhance Photo Clarity",
    description:
      "Sharpen your images instantly with our free online tool. Adjust sharpness intensity, enhance details, and download results with no watermarks or registration needed.",
    type: "website",
    url: "https://1000freetools.com/image-tools/sharpen-image",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Image Sharpening Tool - Enhance Photo Clarity",
    description:
      "Sharpen your images instantly with our free online tool. Adjust sharpness intensity, enhance details, and download results with no watermarks or registration needed.",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/sharpen-image",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
