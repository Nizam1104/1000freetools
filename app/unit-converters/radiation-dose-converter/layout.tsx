import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radiation Dose Converter",
  description: "Convert radiation dose units — gray, rad, sievert, rem, and more. Free online radiation dose converter for medical physics, radiology, nuclear safety, and health physics.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/radiation-dose-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
