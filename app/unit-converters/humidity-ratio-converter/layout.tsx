import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Humidity Ratio Converter",
  description: "Convert between relative humidity, absolute humidity, specific humidity, and humidity ratio. Free online humidity converter for HVAC, meteorology, and building climate control.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/humidity-ratio-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
