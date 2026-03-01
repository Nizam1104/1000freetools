import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radiation Exposure Dose Converter",
  description: "Convert radiation exposure dose units — roentgens, coulombs/kg, milliroentgens, and more. Free online exposure dose converter for radiology, health physics, and radiation protection.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/exposure-dose-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
