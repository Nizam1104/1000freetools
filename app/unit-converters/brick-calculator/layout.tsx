import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brick Calculator",
  description: "Calculate how many bricks you need for any wall or project. Enter wall dimensions and brick size to get an accurate brick count with mortar allowance. Free online brick quantity estimator.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/brick-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
