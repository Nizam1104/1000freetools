import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dynamic Viscosity Converter",
  description: "Convert dynamic viscosity units — Pa·s, centipoise, poise, lb/(ft·s), and more. Free online dynamic viscosity converter for fluid mechanics, lubrication, and chemical engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/viscosity-dynamic",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
