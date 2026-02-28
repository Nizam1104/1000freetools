import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shade, Tint & Tone Generator",
  description: "Generate shades, tints, and tones of any color. Build a full color range from dark to light for use in design systems, UI components, and brand guides.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/shade-tint-tone-generator",
  },
};

export default function ShadeTintToneGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
