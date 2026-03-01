import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surface Tension Converter",
  description: "Convert surface tension units — N/m, mN/m, dyne/cm, lbf/ft, and more. Free online surface tension converter for chemistry, materials science, and fluid interface studies.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/surface-tension",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
