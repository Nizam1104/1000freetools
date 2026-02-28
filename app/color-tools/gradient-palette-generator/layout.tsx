import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gradient-Based Color Palette Generator",
  description: "Generate smooth, gradient-inspired color palettes between two or more colors. Useful for creating cohesive UI themes and data visualization scales.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/gradient-palette-generator",
  },
};

export default function GradientPaletteGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
