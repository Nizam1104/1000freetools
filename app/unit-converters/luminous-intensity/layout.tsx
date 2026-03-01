import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luminous Intensity Converter",
  description: "Convert luminous intensity units — candela, millicandela, candlepower, and more. Accurate online luminous intensity converter for photometry, LED design, and lighting engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/luminous-intensity",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
