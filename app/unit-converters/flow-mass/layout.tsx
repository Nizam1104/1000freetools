import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mass Flow Rate Converter",
  description: "Convert mass flow rate units — kg/s, lb/min, g/h, and more. Accurate online mass flow converter for chemical processing, aerospace, and industrial fluid systems.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/flow-mass",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
