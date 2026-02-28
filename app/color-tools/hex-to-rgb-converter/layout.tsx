import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HEX to RGB Color Converter",
  description: "Convert HEX color codes to RGB values instantly. Simply enter any hex code and get the exact red, green, and blue values for your CSS or design work.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/hex-to-rgb-converter",
  },
};

export default function HexToRgbConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
