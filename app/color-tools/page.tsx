import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const colorTools = [
  {
    name: "Color Picker",
    description:
      "Pick a color using a palette or input HEX, RGB, or HSL values and copy instantly.",
    href: "/color-tools/color-picker",
  },
  {
    name: "Advanced Color Picker",
    description:
      "Color wheel with RGB, HSL, HSV sliders, alpha control, and live preview.",
    href: "/color-tools/advanced-color-picker",
  },
  {
    name: "Hex to RGB Converter",
    description: "Convert HEX color codes to RGB values instantly.",
    href: "/color-tools/hex-to-rgb-converter",
  },
  {
    name: "RGB to Hex Converter",
    description: "Convert RGB color values to HEX format.",
    href: "/color-tools/rgb-to-hex-converter",
  },
  {
    name: "Hex to HSL Converter",
    description: "Convert HEX color values into HSL format.",
    href: "/color-tools/hex-to-hsl-converter",
  },
  {
    name: "HSL to Hex Converter",
    description: "Convert HSL color values into HEX format.",
    href: "/color-tools/hsl-to-hex-converter",
  },
  {
    name: "RGB to HSL Converter",
    description: "Convert RGB color values into HSL format.",
    href: "/color-tools/rgb-to-hsl-converter",
  },
  {
    name: "HSL to HSV Converter",
    description: "Convert HSL color values into HSV format.",
    href: "/color-tools/hsl-to-hsv-converter",
  },
  {
    name: "RGB to CMYK Converter",
    description: "Convert RGB color values into CMYK format.",
    href: "/color-tools/rgb-to-cmyk-converter",
  },
  {
    name: "Hex to CMYK Converter",
    description: "Convert HEX color values into CMYK format.",
    href: "/color-tools/hex-to-cmyk-converter",
  },
  {
    name: "CSS Color Name Converter",
    description: "Convert CSS color names to HEX, RGB, and HSL values.",
    href: "/color-tools/css-color-name-converter",
  },
  {
    name: "Color Temperature to RGB",
    description: "Convert color temperature in Kelvin to RGB values.",
    href: "/color-tools/color-temperature-to-rgb",
  },
];

export default function ColorToolsPage() {
  return (
    <div className="min-h-screen bg-background w-full">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Color Tools
          </h1>
          <p className="text-muted-foreground">
            A collection of color utilities for designers and developers
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {colorTools.map((tool) => (
            <Link key={tool.name} href={tool.href}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-primary">Open Tool →</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
