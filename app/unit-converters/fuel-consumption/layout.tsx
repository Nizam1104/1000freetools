import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fuel Consumption Converter",
  description: "Convert fuel consumption and efficiency units — MPG, L/100km, km/L, and more. Free online fuel economy converter for cars, trucks, and fleet management.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/fuel-consumption",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
