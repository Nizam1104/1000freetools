import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thermal Resistance Converter",
  description: "Convert thermal resistance units including K/W, °C/W, and °F·h/BTU. Accurate online thermal resistance converter for HVAC, insulation, and electronics cooling design.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/thermal-resistance",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
