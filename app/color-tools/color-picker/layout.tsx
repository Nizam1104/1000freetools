import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Picker",
  description: "Pick any color using an interactive palette or enter HEX, RGB, or HSL values. Copy your color code instantly for use in any design or development project.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/color-picker",
  },
};

export default function ColorPickerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
