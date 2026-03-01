import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fuel Efficiency by Mass Converter",
  description: "Convert fuel efficiency by mass units — km/kg, miles/lb, and more. Free online mass-based fuel efficiency converter for rocket propulsion and alternative fuel vehicles.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/fuel-efficiency-mass",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
