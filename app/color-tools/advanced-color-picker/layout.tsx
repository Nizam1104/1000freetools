import { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const tools = [
  {
    "name": "Color Picker",
    "description": "Pick any color using an interactive palette or enter HEX, RGB, or HSL values. Copy your color code instantly for use in any design or development project.",
    "href": "/color-tools/color-picker"
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
    "name": "Extract Colors from an Image",
    "description": "Upload any image and extract its dominant colors directly in your browser using canvas. No data is sent to a server — 100% private and instant.",
    "href": "/color-tools/extract-colors-from-image"
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
  title: "Advanced Color Picker with RGB, HSL & HSV Sliders",
  description: "Professional color picker featuring a full color wheel, RGB, HSL, and HSV sliders, alpha transparency control, and a live preview — all in one tool.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/advanced-color-picker",
  },
};

export default function AdvancedColorPickerLayout({ children }: { children: React.ReactNode }) {
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
