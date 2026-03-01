import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electric Conductivity Converter",
  description: "Convert electrical conductivity units — S/m, mS/cm, μS/cm, and more. Free online conductivity converter for water quality testing, material science, and electrochemistry.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/electric-conductivity",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
