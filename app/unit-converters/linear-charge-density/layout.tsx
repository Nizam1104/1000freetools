import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linear Charge Density Converter",
  description: "Convert linear charge density units — C/m, mC/mm, μC/cm, and more. Free online linear charge density converter for electrostatics and electrical engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/linear-charge-density",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
