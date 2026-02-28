import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Scale Generator for UI & Charts",
  description: "Generate stepped color scales between two colors for charts, maps, and UI usage. Export scales for use in data visualization libraries and design systems.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/color-scale-generator",
  },
};

export default function ColorScaleGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
