import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Temperature Converter",
  description: "Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine instantly. Use our free online temperature converter for weather, cooking, and scientific calculations.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/temperature",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
