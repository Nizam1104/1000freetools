"use client";

import { useState } from "react";
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
  { name: "Palette Merger", href: "/palette-merger" },
  { name: "Palette Sorter", href: "/palette-sorter" },
  { name: "Color Palette Generator", href: "/color-palette-generator" },
  { name: "Contrast Checker", href: "/contrast-checker" },
];
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Copy, Check, Trash2, Search, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface DuplicateGroup {
  colors: string[];
  indices: number[];
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

  // Weighted distance considering hue circularity
  let dh = Math.abs(hsl1.h - hsl2.h);
  if (dh > 180) dh = 360 - dh;

  const ds = Math.abs(hsl1.s - hsl2.s);
  const dl = Math.abs(hsl1.l - hsl2.l);

  // Normalize and weight the components
  const normalizedDh = dh / 180;
  const normalizedDs = ds / 100;
  const normalizedDl = dl / 100;

  return (
    Math.sqrt(
      normalizedDh * normalizedDh * 0.5 +
        normalizedDs * normalizedDs * 0.25 +
        normalizedDl * normalizedDl * 0.25,
    ) * 100
  );
};

const findDuplicates = (
  colors: string[],
  threshold: number,
): DuplicateGroup[] => {
  const groups: DuplicateGroup[] = [];
  const used = new Set<number>();

  for (let i = 0; i < colors.length; i++) {
    if (used.has(i)) continue;

    const group: DuplicateGroup = { colors: [colors[i]], indices: [i] };
    used.add(i);

    for (let j = i + 1; j < colors.length; j++) {
      if (used.has(j)) continue;

      const distance = colorDistance(colors[i], colors[j]);
      if (distance <= threshold) {
        group.colors.push(colors[j]);
        group.indices.push(j);
        used.add(j);
      }
    }

    if (group.colors.length > 1) {
      groups.push(group);
    }
  }

  return groups;
};

const PRESET_PALETTES = [
  {
    name: "With Duplicates",
    colors: ["#6366f1", "#6366f1", "#8b5cf6", "#8b5cf6", "#a855f7"],
  },
  {
    name: "Similar Colors",
    colors: ["#6366f1", "#6367f2", "#6466f0", "#8b5cf6", "#8c5cf7"],
  },
  {
    name: "Unique",
    colors: ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6"],
  },
];

export default function PaletteDuplicateFinderPage() {
  const [inputText, setInputText] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [threshold, setThreshold] = useState(5);
  const [duplicateGroups, setDuplicateGroups] = useState<DuplicateGroup[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadColors = () => {
    const parsed = parseColors(inputText);
    if (parsed.length === 0) {
      toast.error("Please enter valid colors (hex codes)");
      return;
    }
    setColors(parsed);
    setDuplicateGroups([]);
    setHasSearched(false);
    toast.success(`${parsed.length} colors loaded`);
  };

  const loadPreset = (preset: { name: string; colors: string[] }) => {
    setColors(preset.colors);
    setInputText(preset.colors.join(", "));
    setDuplicateGroups([]);
    setHasSearched(false);
    toast.success(`Loaded ${preset.name} palette`);
  };

  const findDuplicateColors = () => {
    if (colors.length === 0) {
      toast.error("Please load colors first");
      return;
    }
    const duplicates = findDuplicates(colors, threshold);
    setDuplicateGroups(duplicates);
    setHasSearched(true);
    if (duplicates.length === 0) {
      toast.success("No duplicates found!");
    } else {
      toast.success(`Found ${duplicates.length} duplicate group(s)`);
    }
  };

  const removeDuplicates = () => {
    if (duplicateGroups.length === 0) return;

    const duplicateIndices = new Set(
      duplicateGroups.flatMap((g) => g.indices.slice(1)),
    );
    const uniqueColors = colors.filter((_, i) => !duplicateIndices.has(i));
    setColors(uniqueColors);
    setInputText(uniqueColors.join(", "));
    setDuplicateGroups([]);
    setHasSearched(false);
    toast.success("Duplicates removed!");
  };

  const copyUniqueColors = async () => {
    if (duplicateGroups.length === 0) return;

    const duplicateIndices = new Set(
      duplicateGroups.flatMap((g) => g.indices.slice(1)),
    );
    const uniqueColors = colors.filter((_, i) => !duplicateIndices.has(i));

    try {
      await navigator.clipboard.writeText(uniqueColors.join(", "));
      setCopied(true);
      toast.success("Unique colors copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const duplicateCount = duplicateGroups.reduce(
    (sum, g) => sum + g.colors.length - 1,
    0,
  );
  const uniqueCount = colors.length - duplicateCount;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Palette Duplicate Finder
          </h1>
          <p className="text-muted-foreground">
            Detect duplicate or near-identical colors within a color palette.
            Keep your design system clean and free of redundant swatches.
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
                placeholder="Paste colors here: #6366f1, #6366f1, #8b5cf6, #8b5cf6, #a855f7"
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
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {colors.length > 0 && (
          <>
            {/* Search Options */}
            <Card className="mb-6">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <Label>Detection Settings</Label>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Similarity Threshold: {threshold}%</Label>
                        <span className="text-sm text-muted-foreground">
                          {threshold <= 3
                            ? "Exact match"
                            : threshold <= 8
                              ? "Very similar"
                              : "Similar"}
                        </span>
                      </div>
                      <Slider
                        value={[threshold]}
                        min={0}
                        max={20}
                        step={1}
                        onValueChange={([v]) => setThreshold(v)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Exact (0%)</span>
                        <span>Strict (5%)</span>
                        <span>Loose (20%)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={findDuplicateColors} className="w-full">
                      <Search className="h-4 w-4 mr-2" />
                      Find Duplicates
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="flex-1 p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      Total Colors
                    </p>
                    <p className="text-2xl font-semibold">{colors.length}</p>
                  </div>
                  {hasSearched && (
                    <>
                      <div className="flex-1 p-3 rounded-lg bg-green-500/10">
                        <p className="text-sm text-muted-foreground">Unique</p>
                        <p className="text-2xl font-semibold text-green-600">
                          {uniqueCount}
                        </p>
                      </div>
                      <div className="flex-1 p-3 rounded-lg bg-amber-500/10">
                        <p className="text-sm text-muted-foreground">
                          Duplicates
                        </p>
                        <p className="text-2xl font-semibold text-amber-600">
                          {duplicateCount}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* All Colors Preview */}
            <Card className="mb-6">
              <CardContent className="p-6 space-y-4">
                <Label>All Colors</Label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color, i) => {
                    const isDuplicate = duplicateGroups.some(
                      (g) =>
                        g.indices.includes(i) && g.indices.indexOf(i) !== 0,
                    );
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border bg-card ${
                          isDuplicate ? "ring-2 ring-amber-500" : ""
                        }`}
                        title={isDuplicate ? "Duplicate" : "Unique"}
                      >
                        <div
                          className="w-8 h-8 rounded "
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm font-mono">
                          {color.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          #{i + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Duplicate Groups */}
            {hasSearched && duplicateGroups.length > 0 && (
              <Card className="mb-6">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      <Label>
                        Duplicate Groups Found ({duplicateGroups.length})
                      </Label>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyUniqueColors}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        Copy Unique
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={removeDuplicates}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Duplicates
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {duplicateGroups.map((group, groupIndex) => (
                      <div
                        key={groupIndex}
                        className="p-4 rounded-lg border bg-amber-500/5"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                          <span className="text-sm font-medium">
                            Group {groupIndex + 1} - {group.colors.length}{" "}
                            similar colors
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {group.colors.map((color, i) => (
                            <div
                              key={i}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                                i === 0
                                  ? "bg-green-500/10 border-green-500/30"
                                  : "bg-card"
                              }`}
                            >
                              <div
                                className="w-8 h-8 rounded "
                                style={{ backgroundColor: color }}
                              />
                              <div>
                                <p className="text-sm font-mono">
                                  {color.toUpperCase()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Position #{group.indices[i] + 1}
                                  {i === 0 && " (kept)"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          Max distance:{" "}
                          {colorDistance(
                            group.colors[0],
                            group.colors[group.colors.length - 1],
                          ).toFixed(1)}
                          %
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* No Duplicates Message */}
            {hasSearched && duplicateGroups.length === 0 && (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                      <Check className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      No Duplicates Found!
                    </h3>
                    <p className="text-muted-foreground">
                      All {colors.length} colors in your palette are unique.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
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
              About the Palette Duplicate Finder
            </h2>
            <p className="text-muted-foreground">
              The Palette Duplicate Finder detects exact and near-duplicate colors in your palette. Set a similarity threshold to find colors that are visually similar, helping you clean up redundant swatches.
            </p>
            <p className="text-muted-foreground">
              Duplicate colors can accumulate when merging palettes or working with multiple designers. This tool identifies groups of similar colors, shows which one will be kept, and lets you remove duplicates with a single click.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
