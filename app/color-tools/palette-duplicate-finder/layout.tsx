import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palette Duplicate Color Finder",
  description: "Detect duplicate or near-identical colors within a color palette. Keep your design system clean and free of redundant swatches.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/palette-duplicate-finder",
  },
};

export default function PaletteDuplicateFinderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
