"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import palettesData from "@/public/json-assets/color-palettes.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColorPalettesSEO } from "@/components/seo-content/color-tools/ColorPalettes";
import { toast } from "sonner";

export const relatedTools = [
  { name: "Color Palette Generator", href: "/color-tools/color-palette-generator", description: "Generate palettes from a base color" },
  { name: "Palette Export Tool", href: "/color-tools/palette-export-tool", description: "Export to CSS, Tailwind, JSON & more" },
  { name: "Favorite Colors Manager", href: "/color-tools/favorite-colors-manager", description: "Save and organize your colors" },
  { name: "CSS Variables Generator", href: "/color-tools/css-variables-generator", description: "Create CSS custom properties" },
  { name: "Contrast Checker", href: "/color-tools/contrast-checker", description: "Verify WCAG accessibility compliance" },
  { name: "Color Harmony Generator", href: "/color-tools/color-harmony-generator", description: "Find complementary & analogous colors" },
];
import {
  Copy,
  Shuffle,
  Download,
  Heart,
  Search,
  Palette,
  Check,
  Lock,
  Unlock,
} from "lucide-react";

interface Palette {
  name: string;
  colors: string[];
}

const palettes = palettesData as Palette[];

export default function ColorPalettesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPalette, setSelectedPalette] = useState<Palette | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("explore");
  const [generatorColors, setGeneratorColors] = useState<string[]>(
    generateRandomColors(5),
  );
  const [lockedColors, setLockedColors] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const filteredPalettes = useMemo(() => {
    if (!searchQuery.trim()) return palettes;
    const query = searchQuery.toLowerCase();
    return palettes.filter((palette) =>
      palette.name.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const favoritePalettes = useMemo(() => {
    return palettes.filter((palette) => favorites.includes(palette.name));
  }, [favorites]);

  function copyToClipboard(text: string, message?: string) {
    navigator.clipboard.writeText(text);
    toast.success(message || "Copied to clipboard!");
  }

  function toggleFavorite(paletteName: string) {
    setFavorites((prev) =>
      prev.includes(paletteName)
        ? prev.filter((name) => name !== paletteName)
        : [...prev, paletteName],
    );
  }

  function generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = Math.floor(Math.random() * 360);
      const saturation = Math.floor(Math.random() * 40) + 60;
      const lightness = Math.floor(Math.random() * 40) + 40;
      colors.push(hslToHex(hue, saturation, lightness));
    }
    return colors;
  }

  function regenerateColor(index: number) {
    if (lockedColors[index]) return;
    const newColors = [...generatorColors];
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 40) + 60;
    const lightness = Math.floor(Math.random() * 40) + 40;
    newColors[index] = hslToHex(hue, saturation, lightness);
    setGeneratorColors(newColors);
  }

  function regenerateAll() {
    const newColors = generatorColors.map((color, index) => {
      if (lockedColors[index]) return color;
      const hue = Math.floor(Math.random() * 360);
      const saturation = Math.floor(Math.random() * 40) + 60;
      const lightness = Math.floor(Math.random() * 40) + 40;
      return hslToHex(hue, saturation, lightness);
    });
    setGeneratorColors(newColors);
  }

  function toggleLock(index: number) {
    const newLocked = [...lockedColors];
    newLocked[index] = !newLocked[index];
    setLockedColors(newLocked);
  }

  function hslToHex(h: number, s: number, l: number): string {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  }

  function getLuminance(hex: string): number {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
    return (
      0.2126 * (r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)) +
      0.7152 * (g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)) +
      0.0722 * (b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4))
    );
  }

  function getTextColor(bgColor: string): string {
    const luminance = getLuminance(bgColor);
    return luminance > 0.179 ? "#000000" : "#FFFFFF";
  }

  function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
      : null;
  }

  function exportPalette(name: string, colors: string[]) {
    const data = { name, colors };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(/\s+/g, "-").toLowerCase()}-palette.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Palette exported!");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Color Palette Explorer
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Discover beautiful color palettes and generate your own.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="favorites">
              Favorites ({favorites.length})
            </TabsTrigger>
          </TabsList>

          {/* Explore Tab */}
          <TabsContent value="explore" className="space-y-6">
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search palettes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Palette Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPalettes.map((palette) => (
                <Card
                  key={palette.name}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedPalette(palette)}
                >
                  <CardContent className="p-0">
                    <div className="flex h-32">
                      {palette.colors.map((color, index) => (
                        <TooltipProvider key={index}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className="flex-1 h-full hover:opacity-80 transition-opacity"
                                style={{ backgroundColor: color }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(color);
                                }}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{color}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{palette.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(palette.name);
                        }}
                      >
                        <Heart
                          className={`h-5 w-5 ${favorites.includes(palette.name)
                            ? "fill-red-500 text-red-500"
                            : "text-slate-400"
                            }`}
                        />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPalettes.length === 0 && (
              <div className="text-center py-12">
                <Palette className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No palettes found</p>
              </div>
            )}
          </TabsContent>

          {/* Generator Tab */}
          <TabsContent value="generator" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Generate Palette</h2>
                  <div className="flex gap-2">
                    <Button onClick={regenerateAll} variant="outline">
                      <Shuffle className="h-4 w-4 mr-2" />
                      Regenerate All
                    </Button>
                    <Button
                      onClick={() =>
                        exportPalette("Generated", generatorColors)
                      }
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="flex h-48 rounded-lg overflow-hidden mb-6">
                  {generatorColors.map((color, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="flex-1 h-full relative group"
                            style={{ backgroundColor: color }}
                          >
                            <div
                              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ color: getTextColor(color) }}
                            >
                              <div className="flex flex-col items-center gap-2">
                                <span className="font-mono font-bold">
                                  {color}
                                </span>
                                <div className="flex gap-1">
                                  <Button
                                    size="icon"
                                    variant="secondary"
                                    className="h-8 w-8"
                                    onClick={() => copyToClipboard(color)}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="secondary"
                                    className="h-8 w-8"
                                    onClick={() => toggleLock(index)}
                                  >
                                    {lockedColors[index] ? (
                                      <Lock className="h-4 w-4" />
                                    ) : (
                                      <Unlock className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="secondary"
                                    className="h-8 w-8"
                                    onClick={() => regenerateColor(index)}
                                    disabled={lockedColors[index]}
                                  >
                                    <Shuffle className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{color}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>

                <div className="flex justify-center gap-2 flex-wrap">
                  {generatorColors.map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800"
                    >
                      <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: color }}
                      />
                      <span className="font-mono text-sm">{color}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard(color)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            {favoritePalettes.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    No favorites yet
                  </h3>
                  <p className="text-slate-500">
                    Click the heart icon on palettes you love to save them here
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {favoritePalettes.map((palette) => (
                  <Card
                    key={palette.name}
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedPalette(palette)}
                  >
                    <CardContent className="p-0">
                      <div className="flex h-32">
                        {palette.colors.map((color, index) => (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className="flex-1 h-full hover:opacity-80 transition-opacity"
                                  style={{ backgroundColor: color }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    copyToClipboard(color);
                                  }}
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{color}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <h3 className="font-semibold text-lg">
                          {palette.name}
                        </h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(palette.name);
                          }}
                        >
                          <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Palette Detail Modal */}
        {selectedPalette && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPalette(null)}
          >
            <Card
              className="max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">{selectedPalette.name}</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => toggleFavorite(selectedPalette.name)}
                    >
                      <Heart
                        className={`h-5 w-5 ${favorites.includes(selectedPalette.name)
                          ? "fill-red-500 text-red-500"
                          : "text-slate-400"
                          }`}
                      />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        exportPalette(
                          selectedPalette.name,
                          selectedPalette.colors,
                        )
                      }
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedPalette(null)}
                    >
                      ✕
                    </Button>
                  </div>
                </div>

                <div className="flex h-40 rounded-lg overflow-hidden mb-6">
                  {selectedPalette.colors.map((color, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="flex-1 h-full hover:opacity-80 transition-opacity cursor-pointer"
                            style={{ backgroundColor: color }}
                            onClick={() => copyToClipboard(color)}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to copy {color}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>

                <div className="grid gap-3">
                  {selectedPalette.colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-800"
                    >
                      <div
                        className="w-12 h-12 rounded-lg shadow"
                        style={{ backgroundColor: color }}
                      />
                      <div className="flex-1">
                        <p className="font-mono font-bold">{color}</p>
                        <p className="text-sm text-slate-500">
                          {hexToRgb(color) &&
                            `RGB(${hexToRgb(color)?.r}, ${hexToRgb(color)?.g}, ${hexToRgb(color)?.b})`}
                        </p>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(color)}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Preview Section */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Preview</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-slate-500 mb-2">
                          Text on colors
                        </p>
                        <div className="space-y-2">
                          {selectedPalette.colors.map((color, index) => (
                            <div
                              key={index}
                              className="p-3 rounded text-center font-medium"
                              style={{
                                backgroundColor: color,
                                color: getTextColor(color),
                              }}
                            >
                              Sample Text
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-slate-500 mb-2">
                          UI Preview
                        </p>
                        <div
                          className="p-4 rounded-lg"
                          style={{
                            backgroundColor: selectedPalette.colors[0],
                          }}
                        >
                          <div
                            className="p-3 rounded mb-2"
                            style={{
                              backgroundColor: selectedPalette.colors[1],
                              color: getTextColor(selectedPalette.colors[1]),
                            }}
                          >
                            <p className="font-semibold">Card Title</p>
                            <p
                              className="text-sm opacity-80"
                              style={{
                                color: getTextColor(selectedPalette.colors[1]),
                              }}
                            >
                              Card content goes here
                            </p>
                          </div>
                          <Button
                            className="w-full"
                            style={{
                              backgroundColor: selectedPalette.colors[2],
                              color: getTextColor(selectedPalette.colors[2]),
                            }}
                          >
                            Action Button
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Copy All */}
                <div className="mt-6 flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() =>
                      copyToClipboard(
                        selectedPalette.colors.join(", "),
                        "All colors copied!",
                      )
                    }
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All Colors
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      copyToClipboard(
                        `--color-1: ${selectedPalette.colors[0]};\n--color-2: ${selectedPalette.colors[1]};\n--color-3: ${selectedPalette.colors[2]};\n--color-4: ${selectedPalette.colors[3]};\n--color-5: ${selectedPalette.colors[4]};`,
                        "CSS variables copied!",
                      )
                    }
                  >
                    Copy as CSS
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Related Tools Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Related Color Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <p className="font-medium">{tool.name}</p>
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <ColorPalettesSEO />
      </div>
    </div>
  );
}
