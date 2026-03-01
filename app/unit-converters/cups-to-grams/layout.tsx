import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cups to Grams Converter",
  description: "Convert cups to grams for flour, sugar, butter, rice, oats, and 50+ ingredients. Get accurate weight measurements for any recipe with our free online cups to grams converter.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/cups-to-grams",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
