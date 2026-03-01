import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volumetric Flow Rate Converter",
  description: "Convert volumetric flow rate units — m³/s, liters per minute, gallons per minute, CFM, and more. Free online flow rate converter for plumbing, HVAC, and fluid engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/flow",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
