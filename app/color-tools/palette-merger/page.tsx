"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const relatedTools = [
  { name: "Palette Comparison Tool", href: "/palette-comparison-tool" },
  { name: "Color Palette Generator", href: "/color-palette-generator" },
  { name: "Palette Export Tool", href: "/palette-export-tool" },
  { name: "CSS Variables Generator", href: "/css-variables-generator" },
];
import { Copy, Check, Trash2, Plus, Combine, Palette } from "lucide-react";
import { toast } from "sonner";

interface Palette {
  id: string;
  name: string;
  colors: string[];
}

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

const colorDistance = (color1: string, color2: string) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  const hsl1 = rgbToHsl(rgb1.r, rgb1.g, rgb1.b);
  const hsl2 = rgbToHsl(rgb2.r, rgb2.g, rgb2.b);

  const dh = Math.abs(hsl1.h - hsl2.h);
  const ds = Math.abs(hsl1.s - hsl2.s);
  const dl = Math.abs(hsl1.l - hsl2.l);

  return Math.sqrt(dh * dh + ds * ds + dl * dl);
};

const mergePalettes = (
  palettes: Palette[],
  removeDuplicates: boolean,
  similarityThreshold: number,
): string[] => {
  const allColors = palettes.flatMap((p) => p.colors);

  if (!removeDuplicates) {
    return allColors;
  }

  const unique: string[] = [];
  for (const color of allColors) {
    const isDuplicate = unique.some((existing) => {
      const distance = colorDistance(color, existing);
      return distance < similarityThreshold;
    });
    if (!isDuplicate) {
      unique.push(color);
    }
  }
  return unique;
};

const PRESET_PALETTES: Palette[] = [
  { id: "p1", name: "Ocean", colors: ["#0077b6", "#00b4d8", "#90e0ef"] },
  { id: "p2", name: "Sunset", colors: ["#ff6b6b", "#feca57", "#ff9ff3"] },
  { id: "p3", name: "Forest", colors: ["#2d6a4f", "#40916c", "#52b788"] },
  { id: "p4", name: "Warm", colors: ["#e85d04", "#faa307", "#ffba08"] },
];

export default function PaletteMergerPage() {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [similarityThreshold, setSimilarityThreshold] = useState(15);
  const [mergedColors, setMergedColors] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const addPalette = () => {
    const colors = parseColors(currentInput);
    if (colors.length === 0) {
      toast.error("Please enter valid colors (hex codes)");
      return;
    }
    const newPalette: Palette = {
      id: Date.now().toString(),
      name: currentName || `Palette ${palettes.length + 1}`,
      colors,
    };
    setPalettes([...palettes, newPalette]);
    setCurrentInput("");
    setCurrentName("");
    toast.success("Palette added!");
  };

  const removePalette = (id: string) => {
    setPalettes(palettes.filter((p) => p.id !== id));
    toast.success("Palette removed");
  };

  const loadPreset = (preset: Palette) => {
    setPalettes([...palettes, { ...preset, id: Date.now().toString() }]);
    toast.success(`Loaded ${preset.name} palette`);
  };

  const mergeAll = () => {
    if (palettes.length === 0) {
      toast.error("Please add at least one palette");
      return;
    }
    const merged = mergePalettes(
      palettes,
      removeDuplicates,
      similarityThreshold,
    );
    setMergedColors(merged);
    toast.success(
      `Merged ${merged.length} colors from ${palettes.length} palettes`,
    );
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mergedColors.join(", "));
      setCopied(true);
      toast.success("Merged colors copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const clearAll = () => {
    setPalettes([]);
    setMergedColors([]);
    toast.success("All cleared");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Palette Merger
          </h1>
          <p className="text-muted-foreground">
            Merge two or more color palettes into a single unified palette.
            Useful for combining brand colors, theme tokens, and design system
            libraries.
          </p>
        </div>

        {/* Add Palette */}
        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Plus className="h-5 w-5 text-muted-foreground" />
              <Label>Add Palette</Label>
            </div>
            <div className="grid sm:grid-cols-4 gap-4">
              <div className="sm:col-span-1 space-y-2">
                <Label>Palette Name</Label>
                <Input
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  placeholder="My Palette"
                />
              </div>
              <div className="sm:col-span-3 space-y-2">
                <Label>Colors</Label>
                <Textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="#6366f1, #8b5cf6, #a855f7"
                  className="min-h-[80px] font-mono"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={addPalette}>
                <Plus className="h-4 w-4 mr-2" />
                Add Palette
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentInput("");
                  setCurrentName("");
                }}
              >
                Clear
              </Button>
            </div>

            {/* Preset Palettes */}
            <div className="pt-4 border-t">
              <Label className="text-sm text-muted-foreground mb-3 block">
                Or load a preset:
              </Label>
              <div className="flex flex-wrap gap-2">
                {PRESET_PALETTES.map((preset) => (
                  <Button
                    key={preset.id}
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

        {/* Added Palettes */}
        {palettes.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label>Added Palettes ({palettes.length})</Label>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {palettes.map((palette) => (
                  <div
                    key={palette.id}
                    className="p-4 rounded-lg border bg-card space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{palette.name}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePalette(palette.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex h-10 rounded-md border overflow-hidden">
                      {palette.colors.map((color, i) => (
                        <div
                          key={i}
                          className="flex-1 h-full "
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {palette.colors.map((color, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono text-muted-foreground"
                        >
                          {color.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Merge Options */}
        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Combine className="h-5 w-5 text-muted-foreground" />
              <Label>Merge Options</Label>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Remove Duplicates</Label>
                <Select
                  value={removeDuplicates ? "yes" : "no"}
                  onValueChange={(v) => setRemoveDuplicates(v === "yes")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Similarity Threshold: {similarityThreshold}%</Label>
                <Select
                  value={similarityThreshold.toString()}
                  onValueChange={(v) => setSimilarityThreshold(Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Very Strict (5%)</SelectItem>
                    <SelectItem value="10">Strict (10%)</SelectItem>
                    <SelectItem value="15">Moderate (15%)</SelectItem>
                    <SelectItem value="20">Loose (20%)</SelectItem>
                    <SelectItem value="30">Very Loose (30%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={mergeAll}
                  className="w-full"
                  disabled={palettes.length === 0}
                >
                  <Combine className="h-4 w-4 mr-2" />
                  Merge Palettes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Merged Result */}
        {mergedColors.length > 0 && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label>Merged Palette ({mergedColors.length} colors)</Label>
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
              <div className="flex h-16 rounded-lg border overflow-hidden">
                {mergedColors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1 h-full "
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>

              {/* Color Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {mergedColors.map((color, i) => {
                  const rgb = hexToRgb(color);
                  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                  return (
                    <div key={i} className="space-y-2">
                      <div
                        className="aspect-square rounded-lg border "
                        style={{ backgroundColor: color }}
                      />
                      <div className="text-center">
                        <p className="text-xs font-mono">
                          {color.toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          L: {hsl.l}%
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Export */}
              <div className="pt-4 border-t space-y-3">
                <Label>Export</Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Comma Separated</Label>
                    <pre className="bg-muted p-3 rounded-lg text-xs font-mono overflow-x-auto">
                      {mergedColors.join(", ")}
                    </pre>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">CSS Variables</Label>
                    <pre className="bg-muted p-3 rounded-lg text-xs font-mono overflow-x-auto">
                      {mergedColors
                        .map((c, i) => `--color-${i + 1}: ${c};`)
                        .join("\n")}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
              About the Palette Merger
            </h2>
            <p className="text-muted-foreground">
              The Palette Merger combines multiple color palettes into a single unified system. Add palettes by pasting hex codes or loading presets, then merge them with optional duplicate removal based on color similarity.
            </p>
            <p className="text-muted-foreground">
              Perfect for consolidating brand colors, combining design system tokens, or finding common tones across multiple projects. Set a similarity threshold to automatically remove near-duplicate colors.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
