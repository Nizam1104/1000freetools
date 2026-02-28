import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advanced Color Picker with RGB, HSL & HSV Sliders",
  description: "Professional color picker featuring a full color wheel, RGB, HSL, and HSV sliders, alpha transparency control, and a live preview — all in one tool.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/advanced-color-picker",
  },
};

export default function AdvancedColorPickerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
