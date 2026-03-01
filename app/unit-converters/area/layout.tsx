import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Area Converter",
  description: "Convert area units quickly and accurately — square meters, acres, hectares, square feet, square kilometers, and more. Ideal for real estate, land measurement, and construction.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/area",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
