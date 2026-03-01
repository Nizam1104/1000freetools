import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moment of Force Converter",
  description: "Convert moment of force units including N·m, lbf·ft, kgf·m, and more. Free online bending moment converter for structural and mechanical engineering calculations.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/moment-of-force",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
