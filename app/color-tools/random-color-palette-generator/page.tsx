"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Copy, Shuffle, Download, Lock, Unlock } from "lucide-react";

export const metadata = {
  title: "Random Color Palette Generator — Instant Color Inspiration",
  description: "Generate random color palettes for instant design inspiration. Break out of creative ruts with unexpected color combinations.",
  keywords: "random color palette, color inspiration, random colors, palette generator, color ideas, creative color tool, random color scheme",
};

export const relatedTools = [
  { name: "Color Palette Generator", href: "/color-palette-generator" },
  { name: "Color Harmony Generator", href: "/color-harmony-generator" },
  { name: "Complementary Color Finder", href: "/complementary-color-finder" },
  { name: "Color Picker", href: "/color-picker" },
];
import { toast } from "sonner";

interface Color {
  hex: string;
  locked: boolean;
}

const generateRandomColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
};

const getContrastColor = (hex: string) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#000000";

  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
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

const downloadPalette = (colors: Color[], format: string) => {
  if (format === "css") {
    const cssContent = `:root {
${colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join("\n")}
}`;
    const blob = new Blob([cssContent], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "random-palette.css";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else if (format === "json") {
    const json = JSON.stringify(
      colors.map((c) => c.hex),
      null,
      2,
    );
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "random-palette.json";
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
      a.download = "random-palette.png";
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

export default function RandomColorPaletteGeneratorPage() {
  const [paletteSize, setPaletteSize] = useState(5);
  const [colors, setColors] = useState<Color[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState("css");

  const generatePalette = () => {
    const newColors: Color[] = Array.from({ length: paletteSize }, () => ({
      hex: generateRandomColor(),
      locked: false,
    }));
    setColors(newColors);
    toast.success("New random palette generated!");
  };

  const toggleLock = (index: number) => {
    setColors((prev) =>
      prev.map((color, i) =>
        i === index ? { ...color, locked: !color.locked } : color,
      ),
    );
  };

  const regenerateUnlocked = () => {
    setColors((prev) =>
      prev.map((color) =>
        color.locked ? color : { hex: generateRandomColor(), locked: false },
      ),
    );
    toast.success("Unlocked colors regenerated!");
  };

  const copyColor = async (color: string, index: number) => {
    await copyToClipboard(color, `Color ${index + 1}`);
    setCopiedField(`color-${index}`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const CopyButton = ({ color, index }: { color: string; index: number }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 hover:bg-background/50"
      onClick={() => copyColor(color, index)}
    >
      {copiedField === `color-${index}` ? (
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
            Random Color Palette Generator
          </h1>
          <p className="text-muted-foreground">
            Generate random color palettes with a customizable number of colors.
            Great for sparking creative ideas and discovering unexpected color
            combinations.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-6">
              {/* Palette Size */}
              <div className="flex-1 min-w-[200px] space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Palette Size</Label>
                  <span className="text-sm font-mono text-muted-foreground">
                    {paletteSize} colors
                  </span>
                </div>
                <Slider
                  value={[paletteSize]}
                  min={2}
                  max={12}
                  step={1}
                  onValueChange={([v]) => setPaletteSize(v)}
                />
              </div>

              {/* Export Format */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Export Format</Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="css">CSS</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="png">PNG</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={regenerateUnlocked}
                  variant="outline"
                  disabled={colors.length === 0}
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
                <Button onClick={generatePalette}>
                  <Shuffle className="h-4 w-4 mr-2" />
                  Generate New
                </Button>
                <Button
                  onClick={() => downloadPalette(colors, exportFormat)}
                  variant="secondary"
                  disabled={colors.length === 0}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        {colors.length > 0 ? (
          <Card>
            <CardContent className="p-6">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Generated Palette
              </Label>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {colors.map((color, index) => {
                  const contrastColor = getContrastColor(color.hex);
                  return (
                    <div key={index} className="group">
                      <div
                        className="w-full aspect-square rounded-lg border border-border shadow-sm transition-transform group-hover:scale-105  relative overflow-hidden"
                        style={{ backgroundColor: color.hex }}
                      >
                        {/* Lock Button */}
                        <button
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => toggleLock(index)}
                          style={{ color: contrastColor }}
                        >
                          {color.locked ? (
                            <Lock className="h-4 w-4" />
                          ) : (
                            <Unlock className="h-4 w-4" />
                          )}
                        </button>

                        {/* Color Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                          <div className="flex items-center justify-between">
                            <code
                              className="text-xs font-mono font-medium"
                              style={{ color: contrastColor }}
                            >
                              {color.hex}
                            </code>
                            <button
                              onClick={() => copyColor(color.hex, index)}
                              className="p-1 rounded hover:bg-white/20 transition-colors"
                              style={{ color: contrastColor }}
                            >
                              {copiedField === `color-${index}` ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Lock Indicator */}
                      {color.locked && (
                        <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                          <Lock className="h-3 w-3" />
                          <span>Locked</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

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
                        colors.map((c) => c.hex),
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
                      const css = colors
                        .map((c, i) => `--color-${i + 1}: ${c.hex};`)
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
        palette: {
${colors.map((c, i) => `          ${i + 1}: '${c.hex}',`).join("\n")}
        }
      }
    }
  }
}`;
                      copyToClipboard(tailwind, "Tailwind Config");
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Tailwind Config
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Empty State */
          <Card>
            <CardContent className="p-12 text-center">
              <div className="max-w-sm mx-auto space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                  <Shuffle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">
                  No palette generated yet
                </h3>
                <p className="text-muted-foreground">
                  Click the "Generate New" button to create a random color
                  palette
                </p>
                <Button onClick={generatePalette} className="mt-4">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Generate Palette
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium mb-3">Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                • Click the lock icon on any color to keep it while regenerating
                others
              </li>
              <li>
                • Adjust the palette size slider to create palettes with 2-12
                colors
              </li>
              <li>• Download your palette in CSS, JSON, or PNG format</li>
              <li>• Click on any color swatch to copy its hex code</li>
            </ul>
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
              About the Random Color Palette Generator
            </h2>
            <p className="text-muted-foreground">
              The Random Color Palette Generator creates instant color inspiration with the click of a button. Generate completely random palettes or lock colors you like while regenerating the rest.
            </p>
            <p className="text-muted-foreground">
              Perfect for breaking creative blocks, discovering unexpected color combinations, or quickly generating placeholder palettes for mockups. Lock your favorite colors and keep regenerating until you find the perfect combination.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
