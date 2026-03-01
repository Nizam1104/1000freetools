import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surface Charge Density Converter",
  description: "Convert surface charge density units — C/m², mC/cm², μC/mm², and more. Accurate online surface charge density converter for capacitor design and electrostatics.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/surface-charge-density",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
