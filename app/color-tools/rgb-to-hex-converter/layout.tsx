import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RGB to HEX Color Converter",
  description: "Convert RGB color values to HEX format in one click. Enter your red, green, and blue values and get the corresponding hex code ready to use.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/rgb-to-hex-converter",
  },
};

export default function RgbToHexConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
