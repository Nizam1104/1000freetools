import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luminance Converter",
  description: "Convert luminance units — cd/m² (nits), foot-lamberts, stilb, and more. Free online luminance converter for display technology, photography, and lighting design.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/luminance",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
