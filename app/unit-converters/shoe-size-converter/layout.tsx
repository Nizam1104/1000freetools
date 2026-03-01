import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shoe Size Converter",
  description: "Convert shoe sizes between US, UK, EU, and international standards for men, women, and kids. Free online shoe size converter for global shopping and footwear retail.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/shoe-size-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
