import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Color Palette Generator",
  description: "Create beautiful, harmonious color palettes for your projects.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/custom-color-palette-generator",
  },
};

export default function CustomColorPaletteGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
