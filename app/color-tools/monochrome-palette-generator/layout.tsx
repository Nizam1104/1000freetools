import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monochrome Color Palette Generator",
  description: "Generate a full range of shades, tints, and tones from a single color. Build clean, cohesive monochromatic palettes for minimal design systems.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/monochrome-palette-generator",
  },
};

export default function MonochromePaletteGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
