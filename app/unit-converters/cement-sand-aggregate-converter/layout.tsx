import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cement, Sand & Aggregate Calculator",
  description: "Calculate exact quantities of cement, sand, and aggregate needed for your concrete mix. Enter volume and mix ratio to get material amounts in kg, bags, and cubic meters. Free construction material calculator.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/cement-sand-aggregate-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
