import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Floor Area Converter",
  description: "Convert floor area between square meters, square feet, square yards, and more. Free online floor area converter for real estate, interior design, and construction planning.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/floor-area-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
