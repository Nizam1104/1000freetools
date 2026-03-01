import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Running Pace to Speed Converter",
  description: "Convert running pace (min/km or min/mile) to speed (km/h or mph) instantly. Free online running pace converter for athletes, marathon runners, and fitness tracking.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/running-pace-to-speed-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
