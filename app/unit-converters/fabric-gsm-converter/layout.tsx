import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fabric GSM Converter",
  description: "Convert fabric weight between GSM, oz/yd², and other textile units. Free online fabric GSM converter for fashion designers, garment manufacturers, and textile buyers.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/fabric-gsm-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
