import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sourdough Hydration Calculator",
  description: "Calculate sourdough hydration percentage and convert between flour and water ratios instantly. Free online sourdough hydration converter for perfect bread dough consistency every time.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/sourdough-hydration-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
