import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Difference Calculator",
  description: "Calculate the exact number of days, weeks, months, and years between any two dates. Free online date difference calculator for deadlines, anniversaries, and event planning.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/date-difference-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
