import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electric Potential Converter",
  description: "Convert electric potential and voltage units — volts, millivolts, kilovolts, megavolts, and more. Free online voltage converter for electronics, power systems, and electrical engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/electric-potential",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
