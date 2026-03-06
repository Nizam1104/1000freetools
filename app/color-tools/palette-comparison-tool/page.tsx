"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Trash2, Plus, Palette } from "lucide-react";
import { toast } from "sonner";
import PaletteComparisonToolSEO from "@/components/seo-content/color-tools/PaletteComparisonTool";

export const relatedTools = [
  { name: "Palette Contrast Viewer", href: "/palette-contrast-viewer" },
  { name: "Contrast Checker", href: "/contrast-checker" },
  { name: "Color Palette Generator", href: "/color-palette-generator" },
  { name: "Dark Light Mode Preview", href: "/dark-light-mode-preview" },
];

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

const getLuminance = (hex: string) => {
  const rgb = hexToRgb(hex);
  const a = [rgb.r, rgb.g, rgb.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const getContrastRatio = (color1: string, color2: string) => {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
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

const PRESET_PALETTES: Palette[] = [
  {
    id: "preset-1",
    name: "Ocean",
    colors: ["#0077b6", "#00b4d8", "#90e0ef", "#caf0f8", "#03045e"],
  },
  {
    id: "preset-2",
    name: "Sunset",
    colors: ["#ff6b6b", "#feca57", "#ff9ff3", "#54a0ff", "#5f27cd"],
  },
  {
    id: "preset-3",
    name: "Forest",
    colors: ["#2d6a4f", "#40916c", "#52b788", "#74c69d", "#95d5b2"],
  },
  {
    id: "preset-4",
    name: "Warm",
    colors: ["#d00000", "#e85d04", "#faa307", "#ffba08", "#ffc300"],
  },
];

export default function PaletteComparisonToolPage() {
  const [palettes, setPalettes] = useState<Palette[]>([
    {
      id: "1",
      name: "Palette 1",
      colors: ["#6366f1", "#8b5cf6", "#a855f7", "#c084fc", "#d8b4fe"],
    },
    {
      id: "2",
      name: "Palette 2",
      colors: ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe"],
    },
  ]);
  const [copiedPalette, setCopiedPalette] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");

  const addPalette = () => {
    const newId = Date.now().toString();
    const colors = parseColors(textInput);
    if (colors.length === 0) {
      toast.error("Please enter valid colors (hex codes)");
      return;
    }
    setPalettes([
      ...palettes,
      { id: newId, name: `Palette ${palettes.length + 1}`, colors },
    ]);
    setTextInput("");
    toast.success("Palette added!");
  };

  const removePalette = (id: string) => {
    if (palettes.length > 2) {
      setPalettes(palettes.filter((p) => p.id !== id));
      toast.success("Palette removed");
    } else {
      toast.error("Minimum 2 palettes required for comparison");
    }
  };

  const updatePaletteName = (id: string, name: string) => {
    setPalettes(palettes.map((p) => (p.id === id ? { ...p, name } : p)));
  };

  const loadPreset = (preset: Palette) => {
    if (palettes.length >= 4) {
      toast.error("Maximum 4 palettes allowed");
      return;
    }
    setPalettes([...palettes, { ...preset, id: Date.now().toString() }]);
    toast.success(`Loaded ${preset.name} palette`);
  };

  const copyPalette = async (palette: Palette) => {
    try {
      await navigator.clipboard.writeText(palette.colors.join(", "));
      setCopiedPalette(palette.id);
      toast.success("Palette copied to clipboard!");
      setTimeout(() => setCopiedPalette(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const getAverageLuminance = (colors: string[]) => {
    const total = colors.reduce((sum, c) => sum + getLuminance(c), 0);
    return total / colors.length;
  };

  const getPaletteStats = (colors: string[]) => {
    const luminances = colors.map(getLuminance);
    const avgLuminance =
      luminances.reduce((a, b) => a + b, 0) / luminances.length;
    const contrast = getContrastRatio(colors[0], colors[colors.length - 1]);
    return { avgLuminance, contrast };
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Palette Comparison Tool
          </h1>
          <p className="text-muted-foreground">
            Compare multiple color palettes side by side to evaluate contrast,
            harmony, and consistency. Ideal for design reviews and A/B palette
            testing.
          </p>
        </div>

        {/* Add Palette */}
        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Plus className="h-5 w-5 text-muted-foreground" />
              <Label>Add New Palette</Label>
            </div>
            <div className="grid lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3 space-y-2">
                <Label className="text-sm text-muted-foreground">
                  Paste colors (hex codes separated by commas or spaces)
                </Label>
                <Textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="#6366f1, #8b5cf6, #a855f7 or paste from Figma, CSS, etc."
                  className="min-h-[80px] font-mono"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addPalette} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Palette
                </Button>
              </div>
            </div>

            {/* Preset Palettes */}
            <div className="pt-4">
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
                    disabled={palettes.length >= 4}
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparison View */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {palettes.map((palette) => {
            const stats = getPaletteStats(palette.colors);
            return (
              <Card key={palette.id}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Input
                      value={palette.name}
                      onChange={(e) =>
                        updatePaletteName(palette.id, e.target.value)
                      }
                      className="w-48 font-medium border-transparent hover:border-input focus:border-input"
                    />
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyPalette(palette)}
                      >
                        {copiedPalette === palette.id ? (
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        Copy
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePalette(palette.id)}
                        disabled={palettes.length <= 2}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Color Preview */}
                  <div className="flex h-24 rounded-lg border overflow-hidden">
                    {palette.colors.map((color, i) => (
                      <div
                        key={i}
                        className="flex-1 h-full "
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>

                  {/* Colors List */}
                  <div className="flex flex-wrap gap-2">
                    {palette.colors.map((color, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-card"
                      >
                        <div
                          className="w-6 h-6 rounded "
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm font-mono">
                          {color.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">
                        Avg. Luminance
                      </p>
                      <p className="text-lg font-semibold">
                        {(stats.avgLuminance * 100).toFixed(0)}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {stats.avgLuminance > 0.5
                          ? "Light palette"
                          : "Dark palette"}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">
                        End-to-End Contrast
                      </p>
                      <p className="text-lg font-semibold">
                        {stats.contrast.toFixed(2)}:1
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {stats.contrast >= 4.5
                          ? "✓ WCAG AA"
                          : stats.contrast >= 3
                            ? "△ WCAG AA Large"
                            : "✗ Not accessible"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Side-by-Side Comparison */}
        {palettes.length >= 2 && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Label>Side-by-Side Comparison</Label>
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${palettes.length}, 1fr)`,
                }}
              >
                {palettes.map((palette) => (
                  <div key={palette.id} className="space-y-2">
                    <p className="text-sm font-medium text-center">
                      {palette.name}
                    </p>
                    <div className="flex h-16 rounded-lg border overflow-hidden">
                      {palette.colors.map((color, i) => (
                        <div
                          key={i}
                          className="flex-1 h-full "
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <PaletteComparisonToolSEO />

        {/* Related Tools */}
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
        </section>
      </div>
    </div>
  );
}
