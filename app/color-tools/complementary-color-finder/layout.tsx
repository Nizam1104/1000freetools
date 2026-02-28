import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complementary Color Finder",
  description: "Find the complementary color of any given color instantly. Use complementary pairs to create high-contrast, visually dynamic designs.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/complementary-color-finder",
  },
};

export default function ComplementaryColorFinderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
