import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Image Resolution Converter",
  description: "Convert digital image resolution units — DPI, PPI, dots/cm, pixels/mm, and more. Free online resolution converter for photography, printing, and graphic design.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/digital-image-resolution",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
