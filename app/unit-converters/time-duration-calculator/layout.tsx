import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time Duration Calculator",
  description: "Calculate the exact duration between two times or add and subtract time intervals easily. Free online time duration calculator for work hours, project planning, and scheduling.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/time-duration-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
