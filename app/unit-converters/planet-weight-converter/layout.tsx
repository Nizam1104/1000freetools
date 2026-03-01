import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planet Weight Calculator",
  description: "Find out how much you would weigh on Mars, Jupiter, the Moon, and other planets. Free online planet weight calculator based on surface gravity for astronomy and science education.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/planet-weight-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
