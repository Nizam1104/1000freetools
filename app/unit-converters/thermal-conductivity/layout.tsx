import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thermal Conductivity Converter",
  description: "Convert thermal conductivity units — W/(m·K), BTU/(h·ft·°F), cal/(s·cm·°C), and more. Free online thermal conductivity converter for insulation, materials, and heat transfer engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/thermal-conductivity",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
