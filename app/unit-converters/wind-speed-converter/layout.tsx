import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wind Speed Converter",
  description: "Convert wind speed between km/h, mph, knots, m/s, and Beaufort scale. Free online wind speed converter for meteorology, sailing, aviation, and weather analysis.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/wind-speed-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
