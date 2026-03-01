import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baking Pan Size Converter",
  description: "Convert between baking pan sizes and find equivalent pan volumes to scale any recipe. Free online baking pan converter for round, square, rectangular, and springform tins.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/baking-pan-size-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
