import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Comparison Tool",
  description: "Compare multiple color palettes side by side to evaluate contrast, harmony, and consistency. Ideal for design reviews and A/B palette testing.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/palette-comparison-tool",
  },
};

export default function PaletteComparisonToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
