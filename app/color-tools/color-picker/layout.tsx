import { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const tools = [
  {
    "name": "Advanced Color Picker with RGB, HSL & HSV Sliders",
    "description": "Professional color picker featuring a full color wheel, RGB, HSL, and HSV sliders, alpha transparency control, and a live preview — all in one tool.",
    "href": "/color-tools/advanced-color-picker"
  },
  {
    "name": "Web Safe Color Picker",
    "description": "Pick from the 216 web-safe colors guaranteed to display consistently across all browsers and devices. Ideal for legacy support and cross-platform compatibility.",
    "href": "/color-tools/web-safe-color-picker"
  },
  {
    "name": "Interactive Color Wheel",
    "description": "Explore an interactive color wheel to visualize relationships between colors. Understand hue, saturation, and how colors interact for better design decisions.",
    "href": "/color-tools/color-wheel"
  },
  {
    "name": "HEX to RGB Color Converter",
    "description": "Convert HEX color codes to RGB values instantly. Simply enter any hex code and get the exact red, green, and blue values for your CSS or design work.",
    "href": "/color-tools/hex-to-rgb-converter"
  },
  {
    "name": "Color Palette Generator from Base Color",
    "description": "Generate a beautiful, harmonious color palette from a single base color. Perfect for building consistent UI color schemes and brand identities.",
    "href": "/color-tools/color-palette-generator"
  },
  {
    "name": "Color Harmony Generator",
    "description": "Generate complementary, analogous, triadic, and tetradic color palettes based on color theory. Build harmonious color schemes for any design project.",
    "href": "/color-tools/color-harmony-generator"
  }
];

export const metadata: Metadata = {
  title: "Color Picker",
  description: "Pick any color using an interactive palette or enter HEX, RGB, or HSL values. Copy your color code instantly for use in any design or development project.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/color-picker",
  },
};

export default function ColorPickerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Color Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
