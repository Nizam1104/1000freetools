import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator",
  description: "Calculate your exact age in years, months, and days from your date of birth. Free online age calculator — also find the age on any past or future date.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/age-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
