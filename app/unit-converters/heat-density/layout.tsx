import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heat Density Converter",
  description: "Convert heat density units including J/m³, BTU/ft³, and cal/cm³. Free online heat density converter for combustion engineering, fuel analysis, and thermodynamic systems.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/heat-density",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
