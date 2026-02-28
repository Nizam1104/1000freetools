import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Sorter",
  description: "Sort the colors in your palette by hue, brightness, or saturation. Organize your swatches for cleaner presentation and easier design workflow.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/palette-sorter",
  },
};

export default function PaletteSorterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
