"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const relatedTools = [
  { name: "Shade Tint Tone Generator", href: "/shade-tint-tone-generator" },
  { name: "Color Palette Generator", href: "/color-palette-generator" },
  { name: "Complementary Color Finder", href: "/complementary-color-finder" },
  { name: "CSS Variables Generator", href: "/css-variables-generator" },
];
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, Download, RotateCcw, Shuffle } from "lucide-react";
import { toast } from "sonner";

interface MonochromeColor {
  hex: string;
  lightness: number;
  name: string;
}

const hexToHsl = (hex: string): { h: number; s: number; l: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const generateMonochromePalette = (
  baseColor: string,
  shadeCount: number,
  range: number,
): MonochromeColor[] => {
  const hsl = hexToHsl(baseColor);
  if (!hsl) return [];

  const { h, s } = hsl;
  const colors: MonochromeColor[] = [];
  const names = [
    "Lightest",
    "Lighter",
    "Light",
    "Base",
    "Dark",
    "Darker",
    "Darkest",
  ];

  const step = (range * 2) / (shadeCount - 1);
  const startLightness = Math.max(5, hsl.l - range);

  for (let i = 0; i < shadeCount; i++) {
    const lightness = Math.min(95, startLightness + step * i);
    const hex = hslToHex(h, s, lightness);
    const nameIndex = Math.round((i / (shadeCount - 1)) * (names.length - 1));

    colors.push({
      hex,
      lightness: Math.round(lightness),
      name:
        i === Math.floor(shadeCount / 2)
          ? "Base"
          : names[nameIndex] || `Shade ${i + 1}`,
    });
  }

  return colors;
};

const getContrastColor = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "#000000";

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
};

const copyToClipboard = async (text: string, fieldName: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${fieldName} copied to clipboard!`);
  } catch {
    toast.error("Failed to copy");
  }
};

const downloadPalette = (
  colors: MonochromeColor[],
  baseColor: string,
  format: string,
) => {
  if (format === "css") {
    const cssContent = `:root {
  --monochrome-base: ${baseColor};
${colors.map((c, i) => `  --monochrome-${i + 1}: ${c.hex};`).join("\n")}
}

/* Monochrome Utility Classes */
${colors.map((c, i) => `.mono-${i + 1} { background-color: ${c.hex}; }`).join("\n")}
${colors.map((c, i) => `.text-mono-${i + 1} { color: ${c.hex}; }`).join("\n")}
`;
    const blob = new Blob([cssContent], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "monochrome-palette.css";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else if (format === "json") {
    const json = JSON.stringify({ base: baseColor, shades: colors }, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "monochrome-palette.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else if (format === "png") {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 400;

    const colorWidth = canvas.width / colors.length;
    colors.forEach((color, i) => {
      ctx.fillStyle = color.hex;
      ctx.fillRect(i * colorWidth, 0, colorWidth, canvas.height);
    });

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "monochrome-palette.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Palette downloaded as PNG!");
    });
    return;
  }

  toast.success(`Palette downloaded as ${format.toUpperCase()}!`);
};

const PRESET_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#22c55e",
  "#14b8a6",
  "#06b6d4",
  "#6366f1",
];

export default function MonochromePaletteGeneratorPage() {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [shadeCount, setShadeCount] = useState(7);
  const [range, setRange] = useState(40);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState("css");
  const [hexInput, setHexInput] = useState("3b82f6");

  const palette = generateMonochromePalette(baseColor, shadeCount, range);

  const handleHexChange = useCallback((value: string) => {
    setHexInput(value);
    const fullHex = value.startsWith("#") ? value : `#${value}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(fullHex)) {
      setBaseColor(fullHex.toLowerCase());
    }
  }, []);

  const handleColorPickerChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBaseColor(e.target.value);
      setHexInput(e.target.value.replace("#", ""));
    },
    [],
  );

  const copyColor = async (color: string, name: string) => {
    await copyToClipboard(color, name);
    setCopiedField(name);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const randomizeColor = () => {
    const randomColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    setBaseColor(randomColor);
    setHexInput(randomColor.replace("#", ""));
    toast.success("Random color generated!");
  };

  const CopyButton = ({ color, name }: { color: string; name: string }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 hover:bg-background/50"
      onClick={() => copyColor(color, name)}
    >
      {copiedField === name ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Monochrome Color Palette Generator
          </h1>
          <p className="text-muted-foreground">
            Generate a full range of shades, tints, and tones from a single
            color. Build clean, cohesive monochromatic palettes for minimal
            design systems.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Base Color */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Base Color</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      #
                    </span>
                    <Input
                      value={hexInput}
                      onChange={(e) => handleHexChange(e.target.value)}
                      className="pl-7 font-mono"
                      maxLength={6}
                      placeholder="000000"
                    />
                  </div>
                  <div
                    className="w-12 h-10 rounded border border-border  cursor-pointer overflow-hidden"
                    style={{ backgroundColor: baseColor }}
                  >
                    <input
                      type="color"
                      value={baseColor}
                      onChange={handleColorPickerChange}
                      className="w-[150%] h-[150%] -m-[25%] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Shade Count */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Shade Count</Label>
                  <span className="text-sm font-mono text-muted-foreground">
                    {shadeCount}
                  </span>
                </div>
                <Slider
                  value={[shadeCount]}
                  min={3}
                  max={11}
                  step={2}
                  onValueChange={([v]) => setShadeCount(v)}
                />
              </div>

              {/* Lightness Range */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Lightness Range</Label>
                  <span className="text-sm font-mono text-muted-foreground">
                    ±{range}%
                  </span>
                </div>
                <Slider
                  value={[range]}
                  min={10}
                  max={50}
                  step={5}
                  onValueChange={([v]) => setRange(v)}
                />
              </div>

              {/* Export Format */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Export Format</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["css", "json", "png"].map((f) => (
                    <Button
                      key={f}
                      variant={exportFormat === f ? "default" : "outline"}
                      size="sm"
                      onClick={() => setExportFormat(f)}
                      className="text-xs uppercase"
                    >
                      {f}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-6 pt-6 border-t border-border">
              <Button onClick={randomizeColor} variant="outline">
                <Shuffle className="h-4 w-4 mr-2" />
                Random Color
              </Button>
              <Button onClick={() => setBaseColor("#3b82f6")} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={() =>
                  downloadPalette(palette, baseColor, exportFormat)
                }
                variant="secondary"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="grid" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="strip">Strip View</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="grid" className="space-y-4">
                <Label className="text-sm font-medium text-muted-foreground">
                  Monochrome Shades
                </Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
                  {palette.map((color, index) => {
                    const contrastColor = getContrastColor(color.hex);
                    return (
                      <div key={index} className="group">
                        <div
                          className="w-full aspect-square rounded-lg border border-border shadow-sm transition-all group-hover:scale-105  relative overflow-hidden"
                          style={{ backgroundColor: color.hex }}
                        >
                          {/* Color Info */}
                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/40 to-transparent">
                            <div className="flex flex-col items-center gap-1">
                              <code
                                className="text-xs font-mono font-medium"
                                style={{ color: contrastColor }}
                              >
                                {color.hex}
                              </code>
                              <button
                                onClick={() => copyColor(color.hex, color.name)}
                                className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors opacity-0 group-hover:opacity-100"
                                style={{ color: contrastColor }}
                              >
                                {copiedField === color.name ? (
                                  <Check className="h-3 w-3" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-center">
                          <p className="text-xs font-medium text-muted-foreground">
                            {color.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            L: {color.lightness}%
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="strip" className="space-y-4">
                <Label className="text-sm font-medium text-muted-foreground">
                  Continuous Strip
                </Label>
                <div className="flex rounded-lg border border-border overflow-hidden">
                  {palette.map((color, index) => (
                    <div
                      key={index}
                      className="flex-1 h-32 relative group cursor-pointer"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyColor(color.hex, color.name)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="px-3 py-1.5 rounded-md bg-black/50 backdrop-blur-sm">
                          <code className="text-xs font-mono text-white">
                            {color.hex}
                          </code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground px-2">
                  <span>Lightest</span>
                  <span>Base</span>
                  <span>Darkest</span>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="space-y-4">
                <Label className="text-sm font-medium text-muted-foreground">
                  Design Preview
                </Label>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Card Hierarchy */}
                  <div className="space-y-4">
                    <p className="text-sm font-medium">Card Hierarchy</p>
                    <div className="space-y-3">
                      {palette.slice(0, 5).map((color, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-lg border border-border"
                          style={{ backgroundColor: color.hex }}
                        >
                          <p
                            className="text-sm font-medium"
                            style={{ color: getContrastColor(color.hex) }}
                          >
                            Level {i + 1} - {color.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* UI Elements */}
                  <div className="space-y-4">
                    <p className="text-sm font-medium">UI Elements</p>
                    <div className="space-y-3">
                      {/* Buttons */}
                      <div className="flex flex-wrap gap-2">
                        {palette.slice(0, 4).map((color, i) => (
                          <Button
                            key={i}
                            size="sm"
                            style={{
                              backgroundColor: color.hex,
                              color: getContrastColor(color.hex),
                            }}
                          >
                            Button {i + 1}
                          </Button>
                        ))}
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        {palette.slice(2, 6).map((color, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: color.hex,
                              color: getContrastColor(color.hex),
                            }}
                          >
                            Badge
                          </span>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="h-3 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: "60%",
                              backgroundColor: palette[3]?.hex,
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Progress indicator using base shade
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Export Options */}
            <div className="mt-8 pt-6 border-t border-border">
              <Label className="text-sm font-medium text-muted-foreground mb-3 block">
                Quick Export
              </Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const json = JSON.stringify(
                      { base: baseColor, shades: palette },
                      null,
                      2,
                    );
                    copyToClipboard(json, "JSON");
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy JSON
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const css = palette
                      .map((c, i) => `--mono-${i + 1}: ${c.hex};`)
                      .join("\n");
                    copyToClipboard(css, "CSS Variables");
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy CSS Variables
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const tailwind = `module.exports = {
  theme: {
    extend: {
      colors: {
        monochrome: {
${palette.map((c, i) => `          ${i + 1}: '${c.hex}',`).join("\n")}
        }
      }
    }
  }
}`;
                    copyToClipboard(tailwind, "Tailwind Config");
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Tailwind
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preset Colors */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <Label className="text-sm font-medium text-muted-foreground mb-3 block">
              Quick Select Base Color
            </Label>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  className={`aspect-square rounded-md border-2 transition-all hover:scale-110  ${
                    baseColor.toLowerCase() === color.toLowerCase()
                      ? "border-primary ring-2 ring-primary ring-offset-2"
                      : "border-border"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setBaseColor(color);
                    setHexInput(color.replace("#", ""));
                  }}
                  title={color}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Tools & SEO Content */}
        <section className="mt-12 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              Related Color Tools
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <p className="font-medium">{tool.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {tool.href.replace(/^\//, "")}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              About the Monochrome Palette Generator
            </h2>
            <p className="text-muted-foreground">
              The Monochrome Palette Generator creates a full range of shades from a single base color. Adjust the shade count and lightness range to generate a cohesive monochromatic palette perfect for minimal, elegant designs.
            </p>
            <p className="text-muted-foreground">
              Monochromatic color schemes are inherently harmonious since all colors share the same hue. Use them for clean UIs, sophisticated branding, and designs where simplicity and cohesion are priorities.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
