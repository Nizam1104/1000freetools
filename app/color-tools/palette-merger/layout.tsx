import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Merger",
  description: "Merge two or more color palettes into a single unified palette. Useful for combining brand colors, theme tokens, and design system libraries.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/palette-merger",
  },
};

export default function PaletteMergerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
