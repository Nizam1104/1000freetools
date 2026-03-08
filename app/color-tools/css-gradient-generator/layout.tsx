import { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const tools = [
  {
    "name": "CSS Variables Generator from Color Palette",
    "description": "Convert your color palette into ready-to-use CSS custom properties. Generate a clean :root variable block for any design system or theme.",
    "href": "/color-tools/css-variables-generator"
  },
  {
    "name": "Gradient-Based Color Palette Generator",
    "description": "Generate smooth, gradient-inspired color palettes between two or more colors. Useful for creating cohesive UI themes and data visualization scales.",
    "href": "/color-tools/gradient-palette-generator"
  },
  {
    "name": "Gradient Step Color Generator",
    "description": "Generate evenly spaced color steps between two colors. Ideal for building smooth transitions, data visualizations, and gradient-based design tokens.",
    "href": "/color-tools/gradient-step-generator"
  },
  {
    "name": "Color Scale Generator for UI & Charts",
    "description": "Generate stepped color scales between two colors for charts, maps, and UI usage. Export scales for use in data visualization libraries and design systems.",
    "href": "/color-tools/color-scale-generator"
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
  title: "CSS Gradient Generator",
  description: "Create beautiful linear and radial CSS gradients with a live preview and export clean, ready-to-use CSS code. No design skills required.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/css-gradient-generator",
  },
};

export default function CssGradientGeneratorLayout({ children }: { children: React.ReactNode }) {
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
