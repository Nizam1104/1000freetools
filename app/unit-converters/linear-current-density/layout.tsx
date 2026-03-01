import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linear Current Density Converter",
  description: "Convert linear current density units — A/m, mA/cm, kA/m, and more. Free online linear current density converter for electromagnetics and electrical engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/linear-current-density",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
