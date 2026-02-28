import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pastel Color Palette Generator",
  description: "Automatically generate soft, soothing pastel color palettes. Ideal for gentle UI designs, children's apps, and lifestyle branding.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/pastel-palette-generator",
  },
};

export default function PastelPaletteGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
