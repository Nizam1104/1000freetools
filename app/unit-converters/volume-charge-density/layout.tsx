import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volume Charge Density Converter",
  description: "Convert volume charge density units — C/m³, mC/cm³, μC/mm³, and more. Free online volume charge density converter for electrostatics, plasma physics, and electrical engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/volume-charge-density",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
