import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magnetic Field Strength Converter",
  description: "Convert magnetic field strength units — A/m, oersteds, kA/m, and more. Accurate online H-field converter for electromagnetics, motor design, and magnetic material characterization.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/magnetic-field-strength",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
