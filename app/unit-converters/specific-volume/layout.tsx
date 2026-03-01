import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Specific Volume Converter",
  description: "Convert specific volume units including m³/kg, L/kg, ft³/lb, and more. Accurate online specific volume converter for thermodynamics and fluid mechanics.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/specific-volume",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
