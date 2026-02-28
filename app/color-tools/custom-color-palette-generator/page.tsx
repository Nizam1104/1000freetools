"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import {
  Copy,
  Shuffle,
  Download,
  Heart,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Check,
  RotateCcw,
  Palette,
  Save,
  Eye,
} from "lucide-react";

interface Color {
  id: string;
  hex: string;
  locked: boolean;
  name: string;
}

interface SavedPalette {
  id: string;
  name: string;
  colors: string[];
  createdAt: number;
}

const hslToHex = (h: number, s: number, l: number): string => {
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
};

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

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const getLuminance = (hex: string): number => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
  return (
    0.2126 * (r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)) +
    0.7152 * (g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)) +
    0.0722 * (b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4))
  );
};

const getTextColor = (bgColor: string): string => {
  return getLuminance(bgColor) > 0.179 ? "#000000" : "#FFFFFF";
};

const generateHarmoniousColor = (
  baseHue: number,
  harmony: string,
  index: number,
): string => {
  const hueOffsets: Record<string, number[]> = {
    analogous: [-30, 0, 30],
    complementary: [0, 180],
    triadic: [0, 120, 240],
    splitComplementary: [0, 150, 210],
    tetradic: [0, 90, 180, 270],
    monochromatic: [0, 0, 0, 0, 0],
  };

  const offset = hueOffsets[harmony]?.[index % hueOffsets[harmony].length] || 0;
  let hue = (baseHue + offset) % 360;
  if (hue < 0) hue += 360;

  if (harmony === "monochromatic") {
    const lightness = 30 + ((index * 15) % 50);
    const saturation = 60 + ((index * 10) % 30);
    return hslToHex(hue, saturation, lightness);
  }

  const saturation = Math.floor(Math.random() * 30) + 60;
  const lightness = Math.floor(Math.random() * 30) + 40;
  return hslToHex(hue, saturation, lightness);
};

const PRESET_COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#78716c",
  "#0f172a",
  "#ffffff",
  "#000000",
];

export default function CustomColorPaletteGeneratorPage() {
  const [colors, setColors] = useState<Color[]>(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: `color-${i}-${Date.now()}`,
      hex: hslToHex(Math.floor(Math.random() * 360), 70, 55),
      locked: false,
      name: `Color ${i + 1}`,
    })),
  );
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [paletteName, setPaletteName] = useState("My Palette");
  const [activeTab, setActiveTab] = useState("generator");
  const [harmonyMode, setHarmonyMode] = useState<string>("random");
  const [baseColor, setBaseColor] = useState<string>("#3b82f6");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string | null>(null);

  const copyToClipboard = async (
    text: string,
    id: string,
    message?: string,
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success(message || "Copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const generateColor = useCallback(
    (index: number): string => {
      if (harmonyMode === "random") {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 40) + 60;
        const lightness = Math.floor(Math.random() * 40) + 40;
        return hslToHex(hue, saturation, lightness);
      }
      const baseHsl = hexToHsl(baseColor);
      if (!baseHsl) {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 40) + 60;
        const lightness = Math.floor(Math.random() * 40) + 40;
        return hslToHex(hue, saturation, lightness);
      }
      return generateHarmoniousColor(baseHsl.h, harmonyMode, index);
    },
    [harmonyMode, baseColor],
  );

  const regenerateAll = useCallback(() => {
    setColors((prev) =>
      prev.map((color) =>
        color.locked
          ? color
          : { ...color, hex: generateColor(colors.indexOf(color)) },
      ),
    );
  }, [generateColor, colors]);

  const regenerateColor = useCallback(
    (index: number) => {
      if (colors[index].locked) return;
      setColors((prev) =>
        prev.map((color, i) =>
          i === index ? { ...color, hex: generateColor(i) } : color,
        ),
      );
    },
    [generateColor, colors],
  );

  const toggleLock = (index: number) => {
    setColors((prev) =>
      prev.map((color, i) =>
        i === index ? { ...color, locked: !color.locked } : color,
      ),
    );
  };

  const updateColorHex = (index: number, hex: string) => {
    const hsl = hexToHsl(hex.startsWith("#") ? hex : `#${hex}`);
    if (hsl) {
      const newHex = hslToHex(hsl.h, hsl.s, hsl.l);
      setColors((prev) =>
        prev.map((color, i) =>
          i === index ? { ...color, hex: newHex.toUpperCase() } : color,
        ),
      );
    }
  };

  const updateColorName = (index: number, name: string) => {
    setColors((prev) =>
      prev.map((color, i) => (i === index ? { ...color, name } : color)),
    );
  };

  const addColor = () => {
    if (colors.length >= 10) {
      toast.error("Maximum 10 colors allowed");
      return;
    }
    setColors((prev) => [
      ...prev,
      {
        id: `color-${Date.now()}`,
        hex: generateColor(prev.length),
        locked: false,
        name: `Color ${prev.length + 1}`,
      },
    ]);
  };

  const removeColor = (index: number) => {
    if (colors.length <= 2) {
      toast.error("Minimum 2 colors required");
      return;
    }
    setColors((prev) => prev.filter((_, i) => i !== index));
  };

  const savePalette = () => {
    const newPalette: SavedPalette = {
      id: `palette-${Date.now()}`,
      name: paletteName || "Untitled Palette",
      colors: colors.map((c) => c.hex),
      createdAt: Date.now(),
    };
    setSavedPalettes((prev) => [newPalette, ...prev]);
    toast.success("Palette saved!");
  };

  const loadPalette = (palette: SavedPalette) => {
    setColors(
      palette.colors.map((hex, i) => ({
        id: `color-${i}-${Date.now()}`,
        hex,
        locked: false,
        name: `Color ${i + 1}`,
      })),
    );
    setPaletteName(palette.name);
    setActiveTab("generator");
    toast.success("Palette loaded!");
  };

  const deletePalette = (id: string) => {
    setSavedPalettes((prev) => prev.filter((p) => p.id !== id));
    toast.success("Palette deleted!");
  };

  const exportPalette = (format: string) => {
    const colorHexes = colors.map((c) => c.hex);
    let content = "";
    let mimeType = "text/plain";
    let extension = "txt";

    if (format === "json") {
      content = JSON.stringify(
        { name: paletteName, colors: colorHexes },
        null,
        2,
      );
      mimeType = "application/json";
      extension = "json";
    } else if (format === "css") {
      content = `:root {\n${colorHexes.map((hex, i) => `  --color-${i + 1}: ${hex};`).join("\n")}\n}`;
      mimeType = "text/css";
      extension = "css";
    } else if (format === "scss") {
      content = colorHexes
        .map((hex, i) => `$color-${i + 1}: ${hex};`)
        .join("\n");
      mimeType = "text/scss";
      extension = "scss";
    } else if (format === "tailwind") {
      content = `colors: {\n  custom: {\n${colorHexes.map((hex, i) => `    ${i + 1}: "${hex}",`).join("\n")}\n  }\n}`;
      mimeType = "text/plain";
      extension = "txt";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${paletteName.replace(/\s+/g, "-").toLowerCase()}-palette.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported as ${format.toUpperCase()}!`);
  };

  const CopyButton = ({
    text,
    id,
    className = "",
  }: {
    text: string;
    id: string;
    className?: string;
  }) => (
    <Button
      variant="ghost"
      size="sm"
      className={`h-8 w-8 p-0 ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        copyToClipboard(text, id);
      }}
    >
      {copiedId === id ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Custom Color Palette Generator
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Create beautiful, harmonious color palettes for your projects.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="saved">Saved Palettes</TabsTrigger>
            <TabsTrigger value="presets">Quick Presets</TabsTrigger>
          </TabsList>

          {/* Generator Tab */}
          <TabsContent value="generator" className="space-y-6">
            {/* Controls */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-4 items-end">
                  <div className="flex-1 min-w-[200px]">
                    <Label htmlFor="palette-name">Palette Name</Label>
                    <Input
                      id="palette-name"
                      value={paletteName}
                      onChange={(e) => setPaletteName(e.target.value)}
                      placeholder="My Palette"
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <Label>Harmony Mode</Label>
                    <div className="flex gap-2 flex-wrap">
                      <select
                        value={harmonyMode}
                        onChange={(e) => setHarmonyMode(e.target.value)}
                        className="flex-1 h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="random">Random</option>
                        <option value="analogous">Analogous</option>
                        <option value="complementary">Complementary</option>
                        <option value="triadic">Triadic</option>
                        <option value="splitComplementary">
                          Split Complementary
                        </option>
                        <option value="tetradic">Tetradic</option>
                        <option value="monochromatic">Monochromatic</option>
                      </select>
                    </div>
                  </div>
                  {harmonyMode !== "random" && (
                    <div className="flex-1 min-w-[200px]">
                      <Label>Base Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={baseColor}
                          onChange={(e) => setBaseColor(e.target.value)}
                          className="w-12 h-10 p-1 cursor-pointer"
                        />
                        <Input
                          value={baseColor}
                          onChange={(e) => setBaseColor(e.target.value)}
                          className="flex-1 font-mono"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button onClick={regenerateAll} variant="outline">
                      <Shuffle className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button onClick={savePalette}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Palette Display */}
            <Card>
              <CardContent className="p-0">
                <div className="flex h-64 md:h-80">
                  <TooltipProvider>
                    {colors.map((color, index) => (
                      <Tooltip key={color.id}>
                        <TooltipTrigger asChild>
                          <div
                            className="flex-1 h-full relative group transition-all duration-300"
                            style={{ backgroundColor: color.hex }}
                          >
                            {/* Overlay with controls */}
                            <div
                              className="absolute z-20 inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{ color: getTextColor(color.hex) }}
                            >
                              <span className="font-mono font-bold text-lg drop-shadow-lg">
                                {color.hex}
                              </span>
                              <div className="flex flex-col gap-1 items-center">
                                <input
                                  type="color"
                                  value={color.hex}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    updateColorHex(index, e.target.value);
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                  aria-label={`Pick color for ${color.name}`}
                                />
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="h-8 w-8"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    copyToClipboard(color.hex, color.id);
                                  }}
                                >
                                  {copiedId === color.id ? (
                                    <Check className="h-4 w-4" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="h-8 w-8"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLock(index);
                                  }}
                                >
                                  {color.locked ? (
                                    <Lock className="h-4 w-4" />
                                  ) : (
                                    <Unlock className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="h-8 w-8"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    regenerateColor(index);
                                  }}
                                  disabled={color.locked}
                                >
                                  <Shuffle className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="h-8 w-8"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeColor(index);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Lock indicator */}
                            {color.locked && (
                              <div className="absolute top-2 right-2">
                                <Lock
                                  className="h-4 w-4 opacity-50"
                                  style={{ color: getTextColor(color.hex) }}
                                />
                              </div>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{color.name} - Click to copy</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </div>

                {/* Add color button */}
                <div className="p-4 flex justify-center">
                  <Button
                    onClick={addColor}
                    variant="outline"
                    disabled={colors.length >= 10}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Color ({colors.length}/10)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Color Details */}
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {colors.map((color, index) => (
                    <div
                      key={color.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-slate-50 dark:bg-slate-900"
                    >
                      <div
                        className="w-16 h-16 rounded-lg shadow-md cursor-pointer flex-shrink-0 relative overflow-hidden"
                        style={{ backgroundColor: color.hex }}
                        onClick={() => {
                          const input = document.createElement("input");
                          input.type = "color";
                          input.value = color.hex;
                          input.onchange = (e) => {
                            updateColorHex(
                              index,
                              (e.target as HTMLInputElement).value,
                            );
                          };
                          input.click();
                        }}
                      >
                        <input
                          type="color"
                          value={color.hex}
                          onChange={(e) =>
                            updateColorHex(index, e.target.value)
                          }
                          className="absolute inset-0 w-[150%] h-[150%] -m-[25%] opacity-0 cursor-pointer"
                          aria-label={`Pick color for ${color.name}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {editingName === color.id ? (
                            <Input
                              value={color.name}
                              onChange={(e) =>
                                updateColorName(index, e.target.value)
                              }
                              onBlur={() => setEditingName(null)}
                              onKeyDown={(e) =>
                                e.key === "Enter" && setEditingName(null)
                              }
                              className="h-7 text-sm"
                              autoFocus
                            />
                          ) : (
                            <span
                              className="font-medium text-sm cursor-pointer hover:underline"
                              onClick={() => setEditingName(color.id)}
                            >
                              {color.name}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={color.hex}
                            onChange={(e) =>
                              updateColorHex(index, e.target.value)
                            }
                            className="w-8 h-7 p-0 border rounded cursor-pointer"
                            aria-label={`Pick color for ${color.name}`}
                          />
                          <Input
                            value={color.hex.replace("#", "")}
                            onChange={(e) =>
                              updateColorHex(index, e.target.value)
                            }
                            className="h-7 w-20 text-xs font-mono"
                            maxLength={6}
                          />
                          <CopyButton text={color.hex} id={color.id} />
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {(() => {
                            const rgb = hexToRgb(color.hex);
                            return rgb ? (
                              <span className="text-xs text-slate-500">
                                RGB({rgb.r}, {rgb.g}, {rgb.b})
                              </span>
                            ) : null;
                          })()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Export Options</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      onClick={() => exportPalette("json")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      JSON
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => exportPalette("css")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      CSS
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => exportPalette("scss")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      SCSS
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => exportPalette("tailwind")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Tailwind
                    </Button>
                  </div>
                </div>

                {/* Preview */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">UI Preview</h4>
                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: colors[0]?.hex }}
                    >
                      <div
                        className="p-3 rounded mb-2"
                        style={{
                          backgroundColor: colors[1]?.hex || "#fff",
                          color: getTextColor(colors[1]?.hex || "#fff"),
                        }}
                      >
                        <p className="font-semibold">Card Title</p>
                        <p className="text-sm opacity-80">
                          Card content goes here
                        </p>
                      </div>
                      <Button
                        className="w-full"
                        style={{
                          backgroundColor: colors[2]?.hex || "#000",
                          color: getTextColor(colors[2]?.hex || "#000"),
                        }}
                      >
                        Action Button
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Text Samples</h4>
                    <div className="space-y-2">
                      {colors.map((color, i) => (
                        <div
                          key={i}
                          className="p-2 rounded text-center text-sm font-medium"
                          style={{
                            backgroundColor: color.hex,
                            color: getTextColor(color.hex),
                          }}
                        >
                          Sample Text - {color.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Palettes Tab */}
          <TabsContent value="saved" className="space-y-6">
            {savedPalettes.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Palette className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    No saved palettes
                  </h3>
                  <p className="text-slate-500">
                    Create and save your custom palettes to access them here
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {savedPalettes.map((palette) => (
                  <Card key={palette.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex h-24">
                        {palette.colors.map((color, index) => (
                          <div
                            key={index}
                            className="flex-1 h-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">{palette.name}</h3>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => loadPalette(palette)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => deletePalette(palette.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {palette.colors.map((color, index) => (
                            <TooltipProvider key={index}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className="w-6 h-6 rounded cursor-pointer border border-slate-200"
                                    style={{ backgroundColor: color }}
                                    onClick={() =>
                                      copyToClipboard(
                                        color,
                                        `saved-${palette.id}-${index}`,
                                      )
                                    }
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{color}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Quick Presets Tab */}
          <TabsContent value="presets" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">
                  Quick Select Colors
                </h3>
                <div className="grid grid-cols-10 gap-2 mb-6">
                  {PRESET_COLORS.map((presetHex) => (
                    <TooltipProvider key={presetHex}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className={`aspect-square rounded-md border-2 transition-all hover:scale-110 ${
                              colors.some(
                                (c) =>
                                  c.hex.toLowerCase() ===
                                  presetHex.toLowerCase(),
                              )
                                ? "border-primary ring-2 ring-primary ring-offset-2"
                                : "border-slate-200"
                            }`}
                            style={{ backgroundColor: presetHex }}
                            onClick={() => {
                              const unlockedIndex = colors.findIndex(
                                (c) => !c.locked,
                              );
                              if (unlockedIndex !== -1) {
                                updateColorHex(unlockedIndex, presetHex);
                                toast.success("Color applied!");
                              } else {
                                toast.error(
                                  "All colors are locked. Unlock one first.",
                                );
                              }
                            }}
                            title={presetHex}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{presetHex}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>

                <h3 className="font-semibold text-lg mb-4">Harmony Examples</h3>
                <div className="grid gap-4">
                  {[
                    "analogous",
                    "complementary",
                    "triadic",
                    "splitComplementary",
                    "tetradic",
                    "monochromatic",
                  ].map((mode) => (
                    <Card key={mode}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium capitalize">
                            {mode.replace(/([A-Z])/g, " $1").trim()}
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setHarmonyMode(mode);
                              setBaseColor(colors[0]?.hex || "#3b82f6");
                              setActiveTab("generator");
                              toast.success(`Loaded ${mode} harmony mode!`);
                            }}
                          >
                            Use This
                          </Button>
                        </div>
                        <div className="flex h-12 rounded-lg overflow-hidden">
                          {Array.from({ length: 5 }, (_, i) => (
                            <div
                              key={i}
                              className="flex-1"
                              style={{
                                backgroundColor: generateHarmoniousColor(
                                  hexToHsl("#3b82f6")?.h || 0,
                                  mode,
                                  i,
                                ),
                              }}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
