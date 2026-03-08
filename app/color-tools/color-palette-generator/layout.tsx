import { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const tools = [
  {
    "name": "Custom Color Palette Generator",
    "description": "Create beautiful, harmonious color palettes for your projects.",
    "href": "/color-tools/custom-color-palette-generator"
  },
  {
    "name": "Random Color Palette Generator",
    "description": "Generate random color palettes with a customizable number of colors. Great for sparking creative ideas and discovering unexpected color combinations.",
    "href": "/color-tools/random-color-palette-generator"
  },
  {
    "name": "Gradient-Based Color Palette Generator",
    "description": "Generate smooth, gradient-inspired color palettes between two or more colors. Useful for creating cohesive UI themes and data visualization scales.",
    "href": "/color-tools/gradient-palette-generator"
  },
  {
    "name": "Pastel Color Palette Generator",
    "description": "Automatically generate soft, soothing pastel color palettes. Ideal for gentle UI designs, children",
    "href": "/color-tools/pastel-palette-generator"
  },
  {
    "name": "Color Picker",
    "description": "Pick any color using an interactive palette or enter HEX, RGB, or HSL values. Copy your color code instantly for use in any design or development project.",
    "href": "/color-tools/color-picker"
  },
  {
    "name": "Color Harmony Generator",
    "description": "Generate complementary, analogous, triadic, and tetradic color palettes based on color theory. Build harmonious color schemes for any design project.",
    "href": "/color-tools/color-harmony-generator"
  }
];

export const metadata: Metadata = {
  title: "Color Palette Generator from Base Color",
  description: "Generate a beautiful, harmonious color palette from a single base color. Perfect for building consistent UI color schemes and brand identities.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/color-palette-generator",
  },
};

export default function ColorPaletteGeneratorLayout({ children }: { children: React.ReactNode }) {
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
