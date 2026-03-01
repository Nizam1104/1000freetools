import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Height Converter — cm to ft & in",
  description: "Convert height between centimeters, feet and inches, and meters. Free online height converter — instantly see your height in any unit, perfect for profiles, travel, and fitness.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/height-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
