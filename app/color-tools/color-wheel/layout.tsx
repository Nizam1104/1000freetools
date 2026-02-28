import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Color Wheel",
  description: "Explore an interactive color wheel to visualize relationships between colors. Understand hue, saturation, and how colors interact for better design decisions.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/color-wheel",
  },
};

export default function ColorWheelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
