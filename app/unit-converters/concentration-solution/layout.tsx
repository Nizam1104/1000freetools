import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solution Concentration Converter",
  description: "Convert solution concentration units — ppm, ppb, mg/L, percent, g/L, and more. Accurate online concentration converter for chemistry, water treatment, and environmental testing.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/concentration-solution",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
