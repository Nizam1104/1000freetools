import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Astronomical Unit (AU) Converter",
  description: "Convert astronomical units to light-years, parsecs, kilometers, miles, and more. Free online AU converter for planetary science, astronomy, and space exploration calculations.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/astronomical-unit-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
