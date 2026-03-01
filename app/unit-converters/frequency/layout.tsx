import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequency Converter",
  description: "Convert frequency units — hertz, kilohertz, megahertz, gigahertz, RPM, and more. Free online frequency converter for electronics, audio engineering, and signal processing.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/frequency",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
