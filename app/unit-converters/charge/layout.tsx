import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electric Charge Converter",
  description: "Convert electric charge units — coulombs, millicoulombs, microcoulombs, ampere-hours, and more. Free online electric charge converter for electronics, electrochemistry, and physics.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/charge",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
