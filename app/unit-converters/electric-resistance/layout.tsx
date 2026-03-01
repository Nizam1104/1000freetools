import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electric Resistance Converter",
  description: "Convert electric resistance units — ohms, kilohms, megaohms, milliohms, and more. Free online resistance converter for circuit design, electronics, and electrical engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/electric-resistance",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
