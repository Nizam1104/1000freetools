import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heat Flux Density Converter",
  description: "Convert heat flux density units — W/m², BTU/(h·ft²), cal/(s·cm²), and more. Free online heat flux converter for thermal engineering, solar energy, and building insulation.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/heat-flux-density",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
