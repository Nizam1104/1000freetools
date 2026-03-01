import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electric Field Strength Converter",
  description: "Convert electric field strength units — V/m, kV/m, N/C, and more. Free online electric field converter for electrostatics, antenna design, and electromagnetic compatibility.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/electric-field-strength",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
