import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electric Conductance Converter",
  description: "Convert electric conductance units — siemens, millisiemens, microsiemens, mho, and more. Free online conductance converter for electronics, electrochemistry, and electrical circuit analysis.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/electric-conductance",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
