import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concrete Mix Ratio Calculator",
  description: "Convert concrete mix ratios and calculate exact cement, sand, and aggregate quantities for any volume. Free online concrete mix calculator for M10, M15, M20, M25, and custom mix designs.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/concrete-mix-ratio-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
