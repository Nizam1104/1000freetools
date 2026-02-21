import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Video Color Transformer – Adjust Brightness, Contrast & Hue",
  description:
    "Transform video colors online for free. Adjust brightness, contrast, saturation, hue, sepia, and invert effects. No software needed, instant processing.",
  alternates: {
    canonical: "https://1000freetools.com/video-tools/video-color-space-transformation",
  },
};

export default function VideoColorSpaceTransformationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
