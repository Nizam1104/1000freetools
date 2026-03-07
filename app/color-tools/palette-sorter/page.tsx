"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const relatedTools = [
  { name: "Palette Comparison Tool", href: "/palette-comparison-tool" },
  { name: "Color Palette Generator", href: "/color-palette-generator" },
  { name: "Palette Export Tool", href: "/palette-export-tool" },
  { name: "Color Wheel", href: "/color-wheel" },
];
import { Copy, Check, SortAsc, ArrowUpDown, Palette } from "lucide-react";
import { toast } from "sonner";
import PaletteSorterSEO from "@/components/seo-content/color-tools/PaletteSorter";

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : { r: 0, g: 0, b: 0 };
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
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

const parseColors = (input: string): string[] => {
  const hexMatches = input.match(/#[0-9a-fA-F]{3,6}/g) || [];
  const normalized = hexMatches.map((hex) => {
    if (hex.length === 4) {
      return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`.toLowerCase();
    }
    return hex.toLowerCase();
  });
  return normalized;
};

const sortColors = (
  colors: string[],
  sortBy: "hue" | "brightness" | "saturation" | "lightness",
  order: "asc" | "desc",
) => {
  return [...colors].sort((a, b) => {
    const rgbA = hexToRgb(a);
    const rgbB = hexToRgb(b);
    const hslA = rgbToHsl(rgbA.r, rgbA.g, rgbA.b);
    const hslB = rgbToHsl(rgbB.r, rgbB.g, rgbB.b);

    let valueA: number;
    let valueB: number;

    switch (sortBy) {
      case "hue":
        valueA = hslA.h;
        valueB = hslB.h;
        break;
      case "saturation":
        valueA = hslA.s;
        valueB = hslB.s;
        break;
      case "lightness":
        valueA = hslA.l;
        valueB = hslB.l;
        break;
      case "brightness":
      default:
        valueA = (rgbA.r * 299 + rgbA.g * 587 + rgbA.b * 114) / 1000;
        valueB = (rgbB.r * 299 + rgbB.g * 587 + rgbB.b * 114) / 1000;
        break;
    }

    return order === "asc" ? valueA - valueB : valueB - valueA;
  });
};

const PRESET_PALETTES = [
  {
    name: "Mixed",
    colors: ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6"],
  },
  {
    name: "Pastels",
    colors: ["#fecdd3", "#fed7aa", "#fef3c7", "#d9f99d", "#bbf7d0"],
  },
  {
    name: "Dark",
    colors: ["#18181b", "#27272a", "#3f3f46", "#52525b", "#71717a"],
  },
  {
    name: "Vibrant",
    colors: ["#dc2626", "#ea580c", "#ca8a04", "#16a34a", "#2563eb"],
  },
];

export default function PaletteSorterPage() {
  const [inputText, setInputText] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [sortedColors, setSortedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "hue" | "brightness" | "saturation" | "lightness"
  >("hue");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [copied, setCopied] = useState(false);

  const loadColors = () => {
    const parsed = parseColors(inputText);
    if (parsed.length === 0) {
      toast.error("Please enter valid colors (hex codes)");
      return;
    }
    setColors(parsed);
    setSortedColors(parsed);
    toast.success(`${parsed.length} colors loaded`);
  };

  const loadPreset = (preset: { name: string; colors: string[] }) => {
    setColors(preset.colors);
    setSortedColors(preset.colors);
    setInputText(preset.colors.join(", "));
    toast.success(`Loaded ${preset.name} palette`);
  };

  const sortPalette = () => {
    if (colors.length === 0) {
      toast.error("Please load colors first");
      return;
    }
    const sorted = sortColors(colors, sortBy, order);
    setSortedColors(sorted);
    toast.success(
      `Sorted by ${sortBy} (${order === "asc" ? "ascending" : "descending"})`,
    );
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sortedColors.join(", "));
      setCopied(true);
      toast.success("Colors copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const resetColors = () => {
    setSortedColors(colors);
    toast.success("Reset to original order");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Palette Sorter
          </h1>
          <p className="text-muted-foreground">
            Sort the colors in your palette by hue, brightness, or saturation.
            Organize your swatches for cleaner presentation and easier design
            workflow.
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Enter Colors</Label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste colors here: #ef4444, #3b82f6, #22c55e, #f59e0b, #8b5cf6"
                className="min-h-[100px] font-mono"
              />
              <div className="flex items-center gap-2">
                <Button onClick={loadColors}>Load Colors</Button>
                <Button variant="outline" onClick={() => setInputText("")}>
                  Clear
                </Button>
              </div>
            </div>

            {/* Preset Palettes */}
            <div className="pt-4 border-t">
              <Label className="text-sm text-muted-foreground mb-3 block">
                Or load a preset:
              </Label>
              <div className="flex flex-wrap gap-2">
                {PRESET_PALETTES.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => loadPreset(preset)}
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {colors.length > 0 && (
          <>
            {/* Sort Controls */}
            <Card className="mb-6">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
                  <Label>Sort Options</Label>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Sort By</Label>
                    <Select
                      value={sortBy}
                      onValueChange={(v) => setSortBy(v as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hue">Hue</SelectItem>
                        <SelectItem value="brightness">Brightness</SelectItem>
                        <SelectItem value="saturation">Saturation</SelectItem>
                        <SelectItem value="lightness">Lightness</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Order</Label>
                    <Select
                      value={order}
                      onValueChange={(v) => setOrder(v as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Ascending</SelectItem>
                        <SelectItem value="desc">Descending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end gap-2">
                    <Button onClick={sortPalette} className="flex-1">
                      <SortAsc className="h-4 w-4 mr-2" />
                      Sort
                    </Button>
                    <Button variant="outline" onClick={resetColors}>
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Original Colors */}
            <Card className="mb-6">
              <CardContent className="p-6 space-y-4">
                <Label>Original Order</Label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-card"
                    >
                      <div
                        className="w-8 h-8 rounded "
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm font-mono">
                        {color.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sorted Colors */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Sorted Colors</Label>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    {copied ? (
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    Copy All
                  </Button>
                </div>

                {/* Preview Bar */}
                <div className="flex h-20 rounded-lg border overflow-hidden">
                  {sortedColors.map((color, i) => (
                    <div
                      key={i}
                      className="flex-1 h-full "
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>

                {/* Color Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {sortedColors.map((color, i) => {
                    const rgb = hexToRgb(color);
                    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                    const brightness = Math.round(
                      (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000,
                    );
                    return (
                      <div key={i} className="space-y-2">
                        <div
                          className="aspect-square rounded-lg border "
                          style={{ backgroundColor: color }}
                        />
                        <div className="space-y-1">
                          <p className="text-sm font-mono font-medium">
                            {color.toUpperCase()}
                          </p>
                          <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                            <span>H: {hsl.h}°</span>
                            <span>S: {hsl.s}%</span>
                            <span>L: {hsl.l}%</span>
                            <span>B: {brightness}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Export Options */}
                <div className="pt-4 border-t space-y-3">
                  <Label>Export Options</Label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs">CSS Variables</Label>
                      <pre className="bg-muted p-3 rounded-lg text-xs font-mono overflow-x-auto">
                        {sortedColors
                          .map((c, i) => `--color-${i + 1}: ${c};`)
                          .join("\n")}
                      </pre>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">JavaScript Array</Label>
                      <pre className="bg-muted p-3 rounded-lg text-xs font-mono overflow-x-auto">
                        {`[${sortedColors.map((c) => `"${c}"`).join(", ")}]`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        <PaletteSorterSEO />

        {/* Related Tools */}
        <section className="mt-12 space-y-8">
        </section>
      </div>
    </div>
  );
}
