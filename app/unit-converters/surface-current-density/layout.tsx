import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surface Current Density Converter",
  description: "Convert surface current density units — A/m², mA/cm², kA/m², and more. Accurate online surface current density converter for electromagnetic field analysis and power systems.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/surface-current-density",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
