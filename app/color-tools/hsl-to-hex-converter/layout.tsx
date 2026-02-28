import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HSL to HEX Color Converter",
  description: "Convert HSL color values to HEX format easily. Enter hue, saturation, and lightness values and get the equivalent hex color code.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/hsl-to-hex-converter",
  },
};

export default function HslToHexConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
