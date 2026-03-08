import { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const tools = [
  {
    "name": "Color Temperature to RGB Converter",
    "description": "Convert color temperature in Kelvin to RGB values. Ideal for lighting designers, photographers, and developers working with warm or cool light sources.",
    "href": "/color-tools/color-temperature-to-rgb"
  },
  {
    "name": "Color Harmony Generator",
    "description": "Generate complementary, analogous, triadic, and tetradic color palettes based on color theory. Build harmonious color schemes for any design project.",
    "href": "/color-tools/color-harmony-generator"
  },
  {
    "name": "Interactive Color Wheel",
    "description": "Explore an interactive color wheel to visualize relationships between colors. Understand hue, saturation, and how colors interact for better design decisions.",
    "href": "/color-tools/color-wheel"
  },
  {
    "name": "Color Picker",
    "description": "Pick any color using an interactive palette or enter HEX, RGB, or HSL values. Copy your color code instantly for use in any design or development project.",
    "href": "/color-tools/color-picker"
  },
  {
    "name": "Color Palette Generator from Base Color",
    "description": "Generate a beautiful, harmonious color palette from a single base color. Perfect for building consistent UI color schemes and brand identities.",
    "href": "/color-tools/color-palette-generator"
  },
  {
    "name": "Color Contrast Checker — WCAG Compliance",
    "description": "Check the contrast ratio between text and background colors against WCAG AA and AAA accessibility standards. Ensure your designs are readable for all users.",
    "href": "/color-tools/contrast-checker"
  }
];

export const metadata: Metadata = {
  title: "Warm or Cool Color Detector",
  description: "Detect whether a color has a warm or cool temperature. Useful for designers who want to maintain consistent visual mood across a palette.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/warm-or-cool-color-detector",
  },
};

export default function WarmOrCoolColorDetectorLayout({ children }: { children: React.ReactNode }) {
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
