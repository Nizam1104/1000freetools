import { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const tools = [
  {
    "name": "Pastel Color Palette Generator",
    "description": "Automatically generate soft, soothing pastel color palettes. Ideal for gentle UI designs, children",
    "href": "/color-tools/pastel-palette-generator"
  },
  {
    "name": "Color Scale Generator for UI & Charts",
    "description": "Generate stepped color scales between two colors for charts, maps, and UI usage. Export scales for use in data visualization libraries and design systems.",
    "href": "/color-tools/color-scale-generator"
  },
  {
    "name": "Shade, Tint & Tone Generator",
    "description": "Generate shades, tints, and tones of any color. Build a full color range from dark to light for use in design systems, UI components, and brand guides.",
    "href": "/color-tools/shade-tint-tone-generator"
  },
  {
    "name": "Gradient Step Color Generator",
    "description": "Generate evenly spaced color steps between two colors. Ideal for building smooth transitions, data visualizations, and gradient-based design tokens.",
    "href": "/color-tools/gradient-step-generator"
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
  title: "Monochrome Color Palette Generator",
  description: "Generate a full range of shades, tints, and tones from a single color. Build clean, cohesive monochromatic palettes for minimal design systems.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/monochrome-palette-generator",
  },
};

export default function MonochromePaletteGeneratorLayout({ children }: { children: React.ReactNode }) {
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
