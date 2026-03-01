import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fuel Efficiency by Volume Converter",
  description: "Convert volumetric fuel efficiency units — L/100km, MPG, km/L, and more. Accurate online fuel economy converter for vehicles, fleet management, and emissions calculations.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/fuel-efficiency-volume",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
