import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warm or Cool Color Detector",
  description: "Detect whether a color has a warm or cool temperature. Useful for designers who want to maintain consistent visual mood across a palette.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/warm-or-cool-color-detector",
  },
};

export default function WarmOrCoolColorDetectorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
