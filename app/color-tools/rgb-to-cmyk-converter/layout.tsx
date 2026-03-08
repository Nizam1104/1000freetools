import { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const tools = [
  {
    "name": "HEX to CMYK Color Converter",
    "description": "Convert HEX color codes to CMYK values for print-ready design. Enter a hex code and get the corresponding CMYK breakdown instantly.",
    "href": "/color-tools/hex-to-cmyk-converter"
  },
  {
    "name": "RGB to HEX Color Converter",
    "description": "Convert RGB color values to HEX format in one click. Enter your red, green, and blue values and get the corresponding hex code ready to use.",
    "href": "/color-tools/rgb-to-hex-converter"
  },
  {
    "name": "Color Temperature to RGB Converter",
    "description": "Convert color temperature in Kelvin to RGB values. Ideal for lighting designers, photographers, and developers working with warm or cool light sources.",
    "href": "/color-tools/color-temperature-to-rgb"
  },
  {
    "name": "CSS Color Name to HEX, RGB & HSL Converter",
    "description": "Convert any CSS color name like ",
    "href": "/color-tools/css-color-name-converter"
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
  title: "RGB to CMYK Color Converter",
  description: "Convert RGB color values to CMYK format for print design. Translate your screen colors into the cyan, magenta, yellow, and black values used in printing.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/rgb-to-cmyk-converter",
  },
};

export default function RgbToCmykConverterLayout({ children }: { children: React.ReactNode }) {
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
