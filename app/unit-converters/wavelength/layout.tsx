import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wavelength Converter",
  description: "Convert wavelength units and calculate frequency across the electromagnetic spectrum — nanometers, micrometers, angstroms, and more. Free online wavelength converter for optics and physics.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/wavelength",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
