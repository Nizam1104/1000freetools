import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weight and Mass Converter",
  description: "Convert weight and mass units instantly — kilograms, pounds, grams, ounces, tons, and more. Accurate and easy-to-use online weight converter for cooking, shipping, and science.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/weight-and-mass",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
