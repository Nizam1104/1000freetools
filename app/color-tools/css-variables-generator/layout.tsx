import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Variables Generator from Color Palette",
  description: "Convert your color palette into ready-to-use CSS custom properties. Generate a clean :root variable block for any design system or theme.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/css-variables-generator",
  },
};

export default function CssVariablesGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
