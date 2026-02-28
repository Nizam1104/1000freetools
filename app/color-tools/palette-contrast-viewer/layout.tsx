import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palette Contrast Viewer",
  description: "Visualize contrast levels between every color pair in your palette. Quickly spot inaccessible combinations before they reach production.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/palette-contrast-viewer",
  },
};

export default function PaletteContrastViewerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
