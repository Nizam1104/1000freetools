import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RGB to CMYK Color Converter",
  description: "Convert RGB color values to CMYK format for print design. Translate your screen colors into the cyan, magenta, yellow, and black values used in printing.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/rgb-to-cmyk-converter",
  },
};

export default function RgbToCmykConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
