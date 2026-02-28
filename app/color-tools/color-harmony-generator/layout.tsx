import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Harmony Generator",
  description: "Generate complementary, analogous, triadic, and tetradic color palettes based on color theory. Build harmonious color schemes for any design project.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/color-harmony-generator",
  },
};

export default function ColorHarmonyGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
