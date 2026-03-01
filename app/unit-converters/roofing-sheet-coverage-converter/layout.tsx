import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roofing Sheet Coverage Calculator",
  description: "Calculate how many roofing sheets you need for your roof area. Enter roof dimensions, sheet size, and overlap to get an accurate sheet count. Free online roofing coverage calculator.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/roofing-sheet-coverage-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
