import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Permeability Converter",
  description: "Convert permeability units including darcy, millidarcy, m², and more. Free online permeability converter for petroleum engineering, hydrogeology, and porous media analysis.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/permeability",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
