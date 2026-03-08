import { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const tools = [
  {
    "name": "HEX to HSL Color Converter",
    "description": "Convert HEX color codes to HSL (Hue, Saturation, Lightness) values instantly. Perfect for CSS developers who work with HSL color functions.",
    "href": "/color-tools/hex-to-hsl-converter"
  },
  {
    "name": "HSL to HEX Color Converter",
    "description": "Convert HSL color values to HEX format easily. Enter hue, saturation, and lightness values and get the equivalent hex color code.",
    "href": "/color-tools/hsl-to-hex-converter"
  },
  {
    "name": "RGB to HSL Color Converter",
    "description": "Convert RGB color values to HSL format instantly. Get the hue, saturation, and lightness representation of any RGB color for use in modern CSS.",
    "href": "/color-tools/rgb-to-hsl-converter"
  },
  {
    "name": "Color Temperature to RGB Converter",
    "description": "Convert color temperature in Kelvin to RGB values. Ideal for lighting designers, photographers, and developers working with warm or cool light sources.",
    "href": "/color-tools/color-temperature-to-rgb"
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
  title: "HSL to HSV Color Converter",
  description: "Convert HSL (Hue, Saturation, Lightness) color values to HSV (Hue, Saturation, Value) format. Useful for designers working across different color models.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/hsl-to-hsv-converter",
  },
};

export default function HslToHsvConverterLayout({ children }: { children: React.ReactNode }) {
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
