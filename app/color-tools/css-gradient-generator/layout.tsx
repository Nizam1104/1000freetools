import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Gradient Generator",
  description: "Create beautiful linear and radial CSS gradients with a live preview and export clean, ready-to-use CSS code. No design skills required.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/css-gradient-generator",
  },
};

export default function CssGradientGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
