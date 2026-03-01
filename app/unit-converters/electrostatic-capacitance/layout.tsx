import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capacitance Converter",
  description: "Convert capacitance units — farads, microfarads, nanofarads, picofarads, and more. Free online capacitance converter for electronics, circuit design, and electrical engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/electrostatic-capacitance",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
