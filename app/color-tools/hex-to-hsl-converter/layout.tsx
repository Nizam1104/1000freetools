import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HEX to HSL Color Converter",
  description: "Convert HEX color codes to HSL (Hue, Saturation, Lightness) values instantly. Perfect for CSS developers who work with HSL color functions.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/hex-to-hsl-converter",
  },
};

export default function HexToHslConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
