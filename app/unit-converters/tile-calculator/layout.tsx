import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tile Calculator",
  description: "Calculate how many tiles you need for any floor or wall area. Enter room and tile dimensions to get an accurate tile count with waste factor included. Free online tile quantity calculator.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/tile-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
