import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calorie Burn Rate Calculator",
  description: "Estimate calories burned per hour for running, cycling, swimming, walking, and more. Free online calorie burn rate converter based on activity type and body weight.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/calorie-burn-rate-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
