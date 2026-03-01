import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rainfall Converter",
  description: "Convert rainfall measurements between millimeters, inches, liters per square meter, and more. Free online precipitation converter for meteorology, hydrology, and agriculture.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/rainfall-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
