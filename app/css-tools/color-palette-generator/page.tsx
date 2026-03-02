"use client";

import { useState, useCallback, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Copy, Shuffle, Upload, Download, Palette, Check } from "lucide-react";
import {
  hexToHsl,
  getComplementaryColor,
  getAnalogousColors,
  getTriadicColors,
  getSplitComplementaryColors,
  getTetradicColors,
  generateTints,
  extractDominantColors,
} from "@/app/color-tools/lib/color-utils";

type HarmonyType =
  | "monochromatic"
  | "complementary"
  | "analogous"
  | "triadic"
  | "split-complementary"
  | "tetradic";

export default function ColorPaletteGeneratorPage() {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [harmonyType, setHarmonyType] = useState<HarmonyType>("complementary");
  const [paletteSize, setPaletteSize] = useState(5);
  const [extractedColors, setExtractedColors] = useState<
    { hex: string; percentage: number }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generatePalette = useCallback(() => {
    const hsl = hexToHsl(baseColor);
    if (!hsl) return [baseColor];

    let colors: string[] = [];

    switch (harmonyType) {
      case "monochromatic":
        colors = [baseColor, ...generateTints(baseColor, paletteSize - 1)];
        break;
      case "complementary":
        const comp = getComplementaryColor(baseColor);
        colors = comp
          ? [baseColor, comp, ...generateTints(baseColor, paletteSize - 2)]
          : [baseColor];
        break;
      case "analogous":
        colors = getAnalogousColors(baseColor, paletteSize - 1);
        break;
      case "triadic":
        colors = getTriadicColors(baseColor);
        break;
      case "split-complementary":
        colors = getSplitComplementaryColors(baseColor);
        break;
      case "tetradic":
        colors = getTetradicColors(baseColor);
        break;
    }

    // Ensure we have exactly paletteSize colors
    while (colors.length < paletteSize) {
      const lastColor = colors[colors.length - 1];
      const tints = generateTints(lastColor, paletteSize - colors.length);
      colors = [...colors, ...tints].slice(0, paletteSize);
    }

    return colors.slice(0, paletteSize);
  }, [baseColor, harmonyType, paletteSize]);

  const palette = generatePalette();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const colors = extractDominantColors(imageData, paletteSize);
        setExtractedColors(colors);
        toast.success(`Extracted ${colors.length} colors from image!`);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const randomizeColor = () => {
    const randomColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    setBaseColor(randomColor);
  };

  const exportPalette = (format: "css" | "json" | "tailwind") => {
    const colors =
      extractedColors.length > 0 ? extractedColors.map((c) => c.hex) : palette;

    if (format === "css") {
      const css = colors
        .map((color, i) => `--color-${i + 1}: ${color};`)
        .join("\n");
      copyToClipboard(`:root {\n${css}\n}`, "CSS Variables");
    } else if (format === "json") {
      copyToClipboard(JSON.stringify(colors, null, 2), "JSON");
    } else {
      const tw = colors
        .map((color, i) => `--color-${i + 1}: ${color};`)
        .join("\n");
      copyToClipboard(
        `/* Add to tailwind.config.js */\ncolors: {\n  ${colors.map((c, i) => `palette${i + 1}: '${c}'`).join(",\n  ")}\n}`,
        "Tailwind",
      );
    }
  };

  const getContrastColor = (hex: string) => {
    const hsl = hexToHsl(hex);
    if (!hsl) return "#000000";
    return hsl.l > 50 ? "#000000" : "#ffffff";
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Color Palette Generator</h1>
        <p className="text-muted-foreground">
          Generate beautiful color harmonies and palettes from a base color or
          extract colors from images.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Base Color</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Choose Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="font-mono"
                    placeholder="#000000"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={randomizeColor}
                  >
                    <Shuffle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Harmony Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Color Harmony</Label>
                <Select
                  value={harmonyType}
                  onValueChange={(v) => setHarmonyType(v as HarmonyType)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monochromatic">Monochromatic</SelectItem>
                    <SelectItem value="complementary">Complementary</SelectItem>
                    <SelectItem value="analogous">Analogous</SelectItem>
                    <SelectItem value="triadic">Triadic</SelectItem>
                    <SelectItem value="split-complementary">
                      Split Complementary
                    </SelectItem>
                    <SelectItem value="tetradic">Tetradic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Palette Size: {paletteSize} colors</Label>
                <Slider
                  value={[paletteSize]}
                  onValueChange={([v]) => setPaletteSize(v)}
                  min={2}
                  max={10}
                  step={1}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Extract from Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              {extractedColors.length > 0 && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setExtractedColors([]);
                    toast.info("Cleared extracted colors");
                  }}
                >
                  Clear Extracted Colors
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportPalette("css")}
              >
                CSS
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportPalette("json")}
              >
                JSON
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportPalette("tailwind")}
              >
                Tailwind
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Generated Palette
              </CardTitle>
              <CardDescription>
                {harmonyType.charAt(0).toUpperCase() +
                  harmonyType.slice(1).replace("-", " ")}{" "}
                harmony based on {baseColor}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex rounded-lg overflow-hidden h-32">
                {(extractedColors.length > 0
                  ? extractedColors
                  : palette.map((c) => ({ hex: c, percentage: 0 }))
                ).map((color, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center justify-end pb-4 group relative transition-all hover:flex-[1.5]"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className="text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded bg-black/20 backdrop-blur-sm"
                      style={{ color: getContrastColor(color.hex) }}
                    >
                      {color.hex}
                    </span>
                    {extractedColors.length > 0 && color.percentage > 0 && (
                      <span
                        className="text-xs mt-1"
                        style={{ color: getContrastColor(color.hex) }}
                      >
                        {color.percentage}%
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
                {(extractedColors.length > 0
                  ? extractedColors
                  : palette.map((c) => ({ hex: c, percentage: 0 }))
                ).map((color, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div
                        className="w-full h-16 rounded mb-3"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex items-center justify-between">
                        <code className="text-sm font-mono">{color.hex}</code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => copyToClipboard(color.hex, "Color")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CSS Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <code className="flex-1 p-4 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
                  {`:root {
  ${(extractedColors.length > 0 ? extractedColors : palette.map((c) => ({ hex: c }))).map((c, i) => `--color-${i + 1}: ${c.hex};`).join("\n  ")}
}`}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    copyToClipboard(
                      `:root {\n  ${(extractedColors.length > 0 ? extractedColors : palette.map((c) => ({ hex: c }))).map((c, i) => `--color-${i + 1}: ${c.hex};`).join("\n  ")}\n}`,
                      "CSS Variables",
                    )
                  }
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {extractedColors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Extracted Colors from Image</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Click on any color to copy its HEX value
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Understanding Color Harmonies
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Monochromatic",
                desc: "Uses variations in lightness and saturation of a single color. Creates a clean, elegant look.",
              },
              {
                name: "Complementary",
                desc: "Uses colors opposite each other on the color wheel. Creates high contrast and vibrant designs.",
              },
              {
                name: "Analogous",
                desc: "Uses colors next to each other on the color wheel. Creates harmonious, serene designs.",
              },
              {
                name: "Triadic",
                desc: "Uses three colors equally spaced on the color wheel. Creates vibrant, balanced designs.",
              },
              {
                name: "Split Complementary",
                desc: "Uses a base color and the two colors adjacent to its complement. Less tension than complementary.",
              },
              {
                name: "Tetradic",
                desc: "Uses four colors arranged in two complementary pairs. Rich and varied color schemes.",
              },
            ].map((harmony) => (
              <Card key={harmony.name}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{harmony.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {harmony.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
