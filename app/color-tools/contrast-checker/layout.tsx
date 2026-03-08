import { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const tools = [
  {
    "name": "Text Color Suggestion Tool",
    "description": "Enter a background color and get instant suggestions for readable, accessible text colors. Designed to help you meet contrast requirements effortlessly.",
    "href": "/color-tools/text-color-suggestion-tool"
  },
  {
    "name": "Palette Contrast Viewer",
    "description": "Visualize contrast levels between every color pair in your palette. Quickly spot inaccessible combinations before they reach production.",
    "href": "/color-tools/palette-contrast-viewer"
  },
  {
    "name": "Complementary Color Finder",
    "description": "Find the complementary color of any given color instantly. Use complementary pairs to create high-contrast, visually dynamic designs.",
    "href": "/color-tools/complementary-color-finder"
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
  title: "Color Contrast Checker — WCAG Compliance",
  description: "Check the contrast ratio between text and background colors against WCAG AA and AAA accessibility standards. Ensure your designs are readable for all users.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/contrast-checker",
  },
};

export default function ContrastCheckerLayout({ children }: { children: React.ReactNode }) {
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
