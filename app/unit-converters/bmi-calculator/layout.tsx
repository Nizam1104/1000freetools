import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator — Body Mass Index",
  description: "Calculate your Body Mass Index (BMI) from height and weight. Find out if you're underweight, normal weight, overweight, or obese. Free online BMI calculator for adults and children.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/bmi-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
