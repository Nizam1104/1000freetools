import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duotone Color Palette Generator",
  description: "Create striking duotone color combinations using two colors of your choice. Perfect for bold graphic design, posters, and modern web aesthetics.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/duotone-palette-generator",
  },
};

export default function DuotonePaletteGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
