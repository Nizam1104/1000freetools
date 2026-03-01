import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concrete Volume Calculator & Converter",
  description: "Calculate concrete volume for slabs, columns, beams, and footings — and convert between cubic meters, cubic feet, and cubic yards. Free online concrete volume calculator for construction projects.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/concrete-volume-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
