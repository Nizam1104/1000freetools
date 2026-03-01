import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clothing Size Converter",
  description: "Convert clothing sizes between US, UK, EU, and Asian standards for men, women, and kids. Free online clothes size converter for international shopping and fashion retail.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/clothing-size-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
