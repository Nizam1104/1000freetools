import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volume Converter",
  description: "Convert volume units effortlessly — liters, gallons, milliliters, cubic feet, fluid ounces, and more. Perfect for cooking, engineering, and everyday volume conversions.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/volume",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
