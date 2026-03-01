import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Specific Heat Capacity Converter",
  description: "Convert specific heat capacity units — J/(kg·K), BTU/(lb·°F), cal/(g·°C), and more. Accurate online specific heat converter for thermodynamics, chemistry, and material science.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/specific-heat-capacity",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
