import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Explorer",
  description: "Discover beautiful color palettes and generate your own.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/color-palettes",
  },
};

export default function ColorPalettesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
