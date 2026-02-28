import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Color Palette Generator",
  description: "Generate random color palettes with a customizable number of colors. Great for sparking creative ideas and discovering unexpected color combinations.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/random-color-palette-generator",
  },
};

export default function RandomColorPaletteGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
