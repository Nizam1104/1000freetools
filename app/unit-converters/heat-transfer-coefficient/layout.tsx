import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heat Transfer Coefficient Converter",
  description: "Convert heat transfer coefficient units — W/(m²·K), BTU/(h·ft²·°F), and more. Accurate online converter for convection, conduction, and HVAC engineering calculations.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/heat-transfer-coefficient",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
