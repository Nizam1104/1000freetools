import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Contrast Checker — WCAG Compliance",
  description: "Check the contrast ratio between text and background colors against WCAG AA and AAA accessibility standards. Ensure your designs are readable for all users.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/contrast-checker",
  },
};

export default function ContrastCheckerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
