import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Force Converter",
  description: "Convert force units including newtons, pound-force, kilogram-force, dynes, and more. Free online force converter for physics, engineering, and scientific applications.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/force",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
