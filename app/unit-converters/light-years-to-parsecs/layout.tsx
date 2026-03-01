import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Light-Years to Parsecs Converter",
  description: "Convert astronomical distances between light-years, parsecs, astronomical units, and kilometers. Free online space distance converter for astronomy, astrophysics, and science education.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/light-years-to-parsecs",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
