import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Video Quality Enhancer – Upscale, Sharpen & Improve Videos",
  description:
    "Enhance video quality online for free. Upscale resolution, adjust sharpness, denoise, and improve brightness/contrast. No software install needed.",
  alternates: {
    canonical: "https://1000freetools.com/video-tools/enhance-video-quality",
  },
};

export default function EnhanceVideoQualityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
