import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Temperature Interval Converter",
  description: "Convert temperature interval and difference units between Celsius, Fahrenheit, Kelvin, and Rankine scales. Free online temperature difference converter for thermodynamics and HVAC.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/temperature-interval",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
