import { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const tools = [
  {
    "name": "Extract Colors from an Image",
    "description": "Upload any image and extract its dominant colors directly in your browser using canvas. No data is sent to a server — 100% private and instant.",
    "href": "/color-tools/extract-colors-from-image"
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
  },
  {
    "name": "Color Contrast Checker — WCAG Compliance",
    "description": "Check the contrast ratio between text and background colors against WCAG AA and AAA accessibility standards. Ensure your designs are readable for all users.",
    "href": "/color-tools/contrast-checker"
  },
  {
    "name": "CSS Gradient Generator",
    "description": "Create beautiful linear and radial CSS gradients with a live preview and export clean, ready-to-use CSS code. No design skills required.",
    "href": "/color-tools/css-gradient-generator"
  }
];

export const metadata: Metadata = {
  title: "Dominant Color Finder from Image",
  description: "Find the single most dominant color in any uploaded image. Great for auto-generating themes, UI accents, or brand colors from photos.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/dominant-color-finder",
  },
};

export default function DominantColorFinderLayout({ children }: { children: React.ReactNode }) {
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
