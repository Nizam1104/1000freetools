import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oven Temperature Converter",
  description: "Convert oven temperatures between Celsius, Fahrenheit, and gas marks instantly. Free online oven temperature converter for baking — perfect for following recipes from any country.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/oven-temperature-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
