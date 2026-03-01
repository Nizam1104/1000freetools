import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Density Converter",
  description: "Convert density units instantly — kg/m³, g/cm³, lb/ft³, lb/in³, and more. Free online density converter for material science, chemistry, and engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/density",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
