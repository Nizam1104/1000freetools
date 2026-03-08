import { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const tools = [
  {
    "name": "CSS Variables Generator from Color Palette",
    "description": "Convert your color palette into ready-to-use CSS custom properties. Generate a clean :root variable block for any design system or theme.",
    "href": "/color-tools/css-variables-generator"
  },
  {
    "name": "HEX to RGB Color Converter",
    "description": "Convert HEX color codes to RGB values instantly. Simply enter any hex code and get the exact red, green, and blue values for your CSS or design work.",
    "href": "/color-tools/hex-to-rgb-converter"
  },
  {
    "name": "Web Safe Color Picker",
    "description": "Pick from the 216 web-safe colors guaranteed to display consistently across all browsers and devices. Ideal for legacy support and cross-platform compatibility.",
    "href": "/color-tools/web-safe-color-picker"
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
    "name": "Color Harmony Generator",
    "description": "Generate complementary, analogous, triadic, and tetradic color palettes based on color theory. Build harmonious color schemes for any design project.",
    "href": "/color-tools/color-harmony-generator"
  }
];

export const metadata: Metadata = {
  title: "CSS Color Name to HEX, RGB & HSL Converter",
  description: "Convert any CSS color name like 'tomato' or 'steelblue' to its HEX, RGB, and HSL equivalents. Quickly look up and translate named CSS colors.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/css-color-name-converter",
  },
};

export default function CssColorNameConverterLayout({ children }: { children: React.ReactNode }) {
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
