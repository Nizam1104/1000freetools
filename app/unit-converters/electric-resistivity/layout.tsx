import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electric Resistivity Converter",
  description: "Convert electrical resistivity units — Ω·m, Ω·cm, μΩ·in, and more. Accurate online resistivity converter for material science, semiconductor design, and conductor selection.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/electric-resistivity",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
