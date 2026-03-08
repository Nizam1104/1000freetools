import { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const tools = [
  {
    "name": "Palette Duplicate Color Finder",
    "description": "Detect duplicate or near-identical colors within a color palette. Keep your design system clean and free of redundant swatches.",
    "href": "/color-tools/palette-duplicate-finder"
  },
  {
    "name": "Color Palette Merger",
    "description": "Merge two or more color palettes into a single unified palette. Useful for combining brand colors, theme tokens, and design system libraries.",
    "href": "/color-tools/palette-merger"
  },
  {
    "name": "Favorite Colors Manager",
    "description": "Save, organize, and manage your favorite color swatches locally in the browser. Build a personal color library without signing up for anything.",
    "href": "/color-tools/favorite-colors-manager"
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
  title: "Color Palette Sorter",
  description: "Sort the colors in your palette by hue, brightness, or saturation. Organize your swatches for cleaner presentation and easier design workflow.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/palette-sorter",
  },
};

export default function PaletteSorterLayout({ children }: { children: React.ReactNode }) {
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
