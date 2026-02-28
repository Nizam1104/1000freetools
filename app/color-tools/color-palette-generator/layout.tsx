import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Generator from Base Color",
  description: "Generate a beautiful, harmonious color palette from a single base color. Perfect for building consistent UI color schemes and brand identities.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/color-palette-generator",
  },
};

export default function ColorPaletteGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
