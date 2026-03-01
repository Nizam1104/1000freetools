import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Illuminance Converter",
  description: "Convert illuminance units — lux, foot-candles, phot, nox, and more. Free online illumination converter for lighting design, photography, and workplace safety compliance.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/illumination",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
