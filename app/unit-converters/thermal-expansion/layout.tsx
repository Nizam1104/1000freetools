import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thermal Expansion Converter",
  description: "Convert thermal expansion coefficient units — per Kelvin, per Celsius, per Fahrenheit, and more. Free online thermal expansion converter for materials science and engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/thermal-expansion",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
