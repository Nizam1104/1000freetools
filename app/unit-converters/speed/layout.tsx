import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speed Converter",
  description: "Convert speed and velocity units instantly — km/h, mph, m/s, knots, and more. Free online speed converter for travel, sports, physics, and engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/speed",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
