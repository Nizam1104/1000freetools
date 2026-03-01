import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image DPI Converter",
  description: "Convert image DPI and calculate print size from pixel dimensions. Free online image DPI converter for photographers, designers, and print-ready file preparation.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/image-dpi-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
