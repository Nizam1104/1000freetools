import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ring Size Converter",
  description: "Convert ring sizes between US, UK, EU, French, Swiss, and Japanese standards. Free online ring size converter for jewelry shopping, gifting, and custom ring orders worldwide.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/ring-size-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
