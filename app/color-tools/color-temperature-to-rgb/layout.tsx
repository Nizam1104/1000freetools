import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Temperature to RGB Converter",
  description: "Convert color temperature in Kelvin to RGB values. Ideal for lighting designers, photographers, and developers working with warm or cool light sources.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/color-temperature-to-rgb",
  },
};

export default function ColorTemperatureToRgbLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
