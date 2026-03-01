import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cups to ml Converter",
  description: "Convert cups to milliliters, tablespoons, fluid ounces, and liters instantly. Free online cups to ml converter for accurate liquid measurements in any recipe or cooking project.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/cups-to-ml",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
