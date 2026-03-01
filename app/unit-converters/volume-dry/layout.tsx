import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dry Volume Converter",
  description: "Convert dry volume units including dry pints, dry gallons, bushels, pecks, and more. Accurate online dry measure converter for agriculture, cooking, and commodity trading.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/volume-dry",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
