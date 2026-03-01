import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rebar Weight Calculator",
  description: "Calculate the total weight of steel rebar for your construction project. Enter bar diameter, length, and quantity to get accurate rebar weight in kg or lbs. Free online rebar weight calculator.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/rebar-weight-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
