import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inductance Converter",
  description: "Convert inductance units — henries, millihenries, microhenries, nanohenries, and more. Free online inductance converter for electronics, RF engineering, and coil and transformer design.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/inductance",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
