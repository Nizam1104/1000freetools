import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HEX to CMYK Color Converter",
  description: "Convert HEX color codes to CMYK values for print-ready design. Enter a hex code and get the corresponding CMYK breakdown instantly.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/hex-to-cmyk-converter",
  },
};

export default function HexToCmykConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
