import { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const tools = [
  {
    "name": "HEX to HSL Color Converter",
    "description": "Convert HEX color codes to HSL (Hue, Saturation, Lightness) values instantly. Perfect for CSS developers who work with HSL color functions.",
    "href": "/color-tools/hex-to-hsl-converter"
  },
  {
    "name": "RGB to HEX Color Converter",
    "description": "Convert RGB color values to HEX format in one click. Enter your red, green, and blue values and get the corresponding hex code ready to use.",
    "href": "/color-tools/rgb-to-hex-converter"
  },
  {
    "name": "HEX to RGB Color Converter",
    "description": "Convert HEX color codes to RGB values instantly. Simply enter any hex code and get the exact red, green, and blue values for your CSS or design work.",
    "href": "/color-tools/hex-to-rgb-converter"
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
  title: "RGB to HSL Color Converter",
  description: "Convert RGB color values to HSL format instantly. Get the hue, saturation, and lightness representation of any RGB color for use in modern CSS.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/rgb-to-hsl-converter",
  },
};

export default function RgbToHslConverterLayout({ children }: { children: React.ReactNode }) {
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
