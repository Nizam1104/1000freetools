import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RGB to HSL Color Converter",
  description: "Convert RGB color values to HSL format instantly. Get the hue, saturation, and lightness representation of any RGB color for use in modern CSS.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/rgb-to-hsl-converter",
  },
};

export default function RgbToHslConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
