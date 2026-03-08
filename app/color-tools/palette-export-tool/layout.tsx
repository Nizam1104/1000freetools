import { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const tools = [
  {
    "name": "Favorite Colors Manager",
    "description": "Save, organize, and manage your favorite color swatches locally in the browser. Build a personal color library without signing up for anything.",
    "href": "/color-tools/favorite-colors-manager"
  },
  {
    "name": "Color Palette Merger",
    "description": "Merge two or more color palettes into a single unified palette. Useful for combining brand colors, theme tokens, and design system libraries.",
    "href": "/color-tools/palette-merger"
  },
  {
    "name": "CSS Variables Generator from Color Palette",
    "description": "Convert your color palette into ready-to-use CSS custom properties. Generate a clean :root variable block for any design system or theme.",
    "href": "/color-tools/css-variables-generator"
  },
  {
    "name": "Custom Color Palette Generator",
    "description": "Create beautiful, harmonious color palettes for your projects.",
    "href": "/color-tools/custom-color-palette-generator"
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
  }
];

export const metadata: Metadata = {
  title: "Color Palette Export Tool",
  description: "Export your color palette as CSS variables, JSON, or plain text. Seamlessly transfer your colors into code, design tools, or documentation.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/palette-export-tool",
  },
};

export default function PaletteExportToolLayout({ children }: { children: React.ReactNode }) {
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
