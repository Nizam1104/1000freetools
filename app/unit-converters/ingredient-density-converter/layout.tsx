import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ingredient Density Converter",
  description: "Convert between volume and weight for common cooking ingredients using accurate density values. Free online ingredient converter for baking, cooking, and precise recipe scaling.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/ingredient-density-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
