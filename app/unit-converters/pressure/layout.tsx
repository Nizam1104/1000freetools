import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pressure Converter",
  description: "Convert pressure units including pascals, bar, PSI, atmospheres, torr, and more. Free online pressure converter for engineering, science, and industrial applications.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/pressure",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
