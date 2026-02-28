import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HSL to HSV Color Converter",
  description: "Convert HSL (Hue, Saturation, Lightness) color values to HSV (Hue, Saturation, Value) format. Useful for designers working across different color models.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/hsl-to-hsv-converter",
  },
};

export default function HslToHsvConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
