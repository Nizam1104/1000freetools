import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Molar Flow Rate Converter",
  description: "Convert molar flow rate units — mol/s, kmol/h, lbmol/min, and more. Free online molar flow converter for chemical engineering, reaction kinetics, and process design.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/flow-molar",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
