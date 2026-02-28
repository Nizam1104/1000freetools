import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gradient Step Color Generator",
  description: "Generate evenly spaced color steps between two colors. Ideal for building smooth transitions, data visualizations, and gradient-based design tokens.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/gradient-step-generator",
  },
};

export default function GradientStepGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
