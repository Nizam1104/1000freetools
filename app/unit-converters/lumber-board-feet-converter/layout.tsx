import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lumber Board Feet Calculator",
  description: "Calculate board feet of lumber instantly. Enter thickness, width, and length to get total board footage for any wood project. Free online lumber board feet converter for construction and carpentry.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/lumber-board-feet-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
