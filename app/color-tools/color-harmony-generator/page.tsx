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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, Download, Shuffle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const relatedTools = [
  { name: "Color Wheel", href: "/color-wheel" },
  { name: "Complementary Color Finder", href: "/complementary-color-finder" },
  { name: "Palette Export Tool", href: "/palette-export-tool" },
  { name: "Color Palette Generator", href: "/color-palette-generator" },
];

interface HarmonyColor {
  hex: string;
  hsl: string;
  name: string;
}

interface HarmonyPalette {
  type: string;
  colors: HarmonyColor[];
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

const generateComplementary = (baseHex: string): HarmonyColor[] => {
  const hsl = hexToHsl(baseHex);
  if (!hsl) return [];

  const { h, s, l } = hsl;
  const compH = (h + 180) % 360;

  return [
    {
      hex: baseHex.toLowerCase(),
      hsl: `hsl(${h}, ${s}%, ${l}%)`,
      name: "Base",
    },
    {
      hex: hslToHex(compH, s, l),
      hsl: `hsl(${compH}, ${s}%, ${l}%)`,
      name: "Complement",
    },
  ];
};

const generateAnalogous = (baseHex: string): HarmonyColor[] => {
  const hsl = hexToHsl(baseHex);
  if (!hsl) return [];

  const { h, s, l } = hsl;

  return [
    {
      hex: hslToHex((h - 30 + 360) % 360, s, l),
      hsl: `hsl(${(h - 30 + 360) % 360}, ${s}%, ${l}%)`,
      name: "Left",
    },
    {
      hex: baseHex.toLowerCase(),
      hsl: `hsl(${h}, ${s}%, ${l}%)`,
      name: "Base",
    },
    {
      hex: hslToHex((h + 30) % 360, s, l),
      hsl: `hsl(${(h + 30) % 360}, ${s}%, ${l}%)`,
      name: "Right",
    },
  ];
};

const generateTriadic = (baseHex: string): HarmonyColor[] => {
  const hsl = hexToHsl(baseHex);
  if (!hsl) return [];

  const { h, s, l } = hsl;

  return [
    {
      hex: baseHex.toLowerCase(),
      hsl: `hsl(${h}, ${s}%, ${l}%)`,
      name: "Base",
    },
    {
      hex: hslToHex((h + 120) % 360, s, l),
      hsl: `hsl(${(h + 120) % 360}, ${s}%, ${l}%)`,
      name: "Triadic 1",
    },
    {
      hex: hslToHex((h + 240) % 360, s, l),
      hsl: `hsl(${(h + 240) % 360}, ${s}%, ${l}%)`,
      name: "Triadic 2",
    },
  ];
};

const generateTetradic = (baseHex: string): HarmonyColor[] => {
  const hsl = hexToHsl(baseHex);
  if (!hsl) return [];

  const { h, s, l } = hsl;

  return [
    {
      hex: baseHex.toLowerCase(),
      hsl: `hsl(${h}, ${s}%, ${l}%)`,
      name: "Base",
    },
    {
      hex: hslToHex((h + 90) % 360, s, l),
      hsl: `hsl(${(h + 90) % 360}, ${s}%, ${l}%)`,
      name: "Tetradic 1",
    },
    {
      hex: hslToHex((h + 180) % 360, s, l),
      hsl: `hsl(${(h + 180) % 360}, ${s}%, ${l}%)`,
      name: "Tetradic 2",
    },
    {
      hex: hslToHex((h + 270) % 360, s, l),
      hsl: `hsl(${(h + 270) % 360}, ${s}%, ${l}%)`,
      name: "Tetradic 3",
    },
  ];
};

const generateSplitComplementary = (baseHex: string): HarmonyColor[] => {
  const hsl = hexToHsl(baseHex);
  if (!hsl) return [];

  const { h, s, l } = hsl;

  return [
    {
      hex: baseHex.toLowerCase(),
      hsl: `hsl(${h}, ${s}%, ${l}%)`,
      name: "Base",
    },
    {
      hex: hslToHex((h + 150) % 360, s, l),
      hsl: `hsl(${(h + 150) % 360}, ${s}%, ${l}%)`,
      name: "Split 1",
    },
    {
      hex: hslToHex((h + 210) % 360, s, l),
      hsl: `hsl(${(h + 210) % 360}, ${s}%, ${l}%)`,
      name: "Split 2",
    },
  ];
};

const generateSquare = (baseHex: string): HarmonyColor[] => {
  const hsl = hexToHsl(baseHex);
  if (!hsl) return [];

  const { h, s, l } = hsl;

  return [
    {
      hex: baseHex.toLowerCase(),
      hsl: `hsl(${h}, ${s}%, ${l}%)`,
      name: "Base",
    },
    {
      hex: hslToHex((h + 90) % 360, s, l),
      hsl: `hsl(${(h + 90) % 360}, ${s}%, ${l}%)`,
      name: "Square 1",
    },
    {
      hex: hslToHex((h + 180) % 360, s, l),
      hsl: `hsl(${(h + 180) % 360}, ${s}%, ${l}%)`,
      name: "Square 2",
    },
    {
      hex: hslToHex((h + 270) % 360, s, l),
      hsl: `hsl(${(h + 270) % 360}, ${s}%, ${l}%)`,
      name: "Square 3",
    },
  ];
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

const downloadPalette = (palette: HarmonyPalette, format: string) => {
  if (format === "css") {
    const cssContent = `/* ${palette.type} Color Harmony */
:root {
${palette.colors.map((c, i) => `  --harmony-${i + 1}: ${c.hex}; /* ${c.name} */`).join("\n")}
}

/* Utility Classes */
${palette.colors.map((c, i) => `.harmony-${i + 1} { background-color: ${c.hex}; }`).join("\n")}
`;
    const blob = new Blob([cssContent], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${palette.type.toLowerCase()}-harmony.css`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else if (format === "json") {
    const json = JSON.stringify(palette, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${palette.type.toLowerCase()}-harmony.json`;
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

    const colorWidth = canvas.width / palette.colors.length;
    palette.colors.forEach((color, i) => {
      ctx.fillStyle = color.hex;
      ctx.fillRect(i * colorWidth, 0, colorWidth, canvas.height);
    });

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${palette.type.toLowerCase()}-harmony.png`;
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

const HARMONY_TYPES = [
  {
    value: "complementary",
    label: "Complementary",
    description: "Two opposite colors",
  },
  {
    value: "analogous",
    label: "Analogous",
    description: "Three adjacent colors",
  },
  {
    value: "triadic",
    label: "Triadic",
    description: "Three evenly spaced colors",
  },
  {
    value: "tetradic",
    label: "Tetradic",
    description: "Four colors in rectangle",
  },
  {
    value: "split",
    label: "Split Comp.",
    description: "Base + two adjacent complements",
  },
  {
    value: "square",
    label: "Square",
    description: "Four evenly spaced colors",
  },
];

export default function ColorHarmonyGeneratorPage() {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [harmonyType, setHarmonyType] = useState("complementary");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState("css");
  const [hexInput, setHexInput] = useState("3b82f6");

  const generatePalette = useCallback((): HarmonyPalette => {
    let colors: HarmonyColor[] = [];

    switch (harmonyType) {
      case "complementary":
        colors = generateComplementary(baseColor);
        break;
      case "analogous":
        colors = generateAnalogous(baseColor);
        break;
      case "triadic":
        colors = generateTriadic(baseColor);
        break;
      case "tetradic":
        colors = generateTetradic(baseColor);
        break;
      case "split":
        colors = generateSplitComplementary(baseColor);
        break;
      case "square":
        colors = generateSquare(baseColor);
        break;
      default:
        colors = generateComplementary(baseColor);
    }

    return { type: harmonyType, colors };
  }, [baseColor, harmonyType]);

  const palette = generatePalette();

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
    toast.success("Random base color generated!");
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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Color Harmony Generator
          </h1>
          <p className="text-muted-foreground">
            Generate complementary, analogous, triadic, and tetradic color
            palettes based on color theory. Build harmonious color schemes for
            any design project.
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

              {/* Harmony Type */}
              <div className="space-y-3 lg:col-span-2">
                <Label className="text-sm font-medium">Harmony Type</Label>
                <div className="grid grid-cols-3 gap-2">
                  {HARMONY_TYPES.map((type) => (
                    <Button
                      key={type.value}
                      variant={
                        harmonyType === type.value ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setHarmonyType(type.value)}
                      className="text-xs flex flex-col h-auto py-2"
                    >
                      <span className="font-medium">{type.label}</span>
                      <span className="text-[10px] opacity-70 hidden xl:inline">
                        {type.description}
                      </span>
                    </Button>
                  ))}
                </div>
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
              <Button
                onClick={() => {
                  setBaseColor("#3b82f6");
                  setHexInput("3b82f6");
                }}
                variant="outline"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={() => downloadPalette(palette, exportFormat)}
                variant="secondary"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Harmony Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">
                  {harmonyType === "complementary" && "🔵"}
                  {harmonyType === "analogous" && "🌈"}
                  {harmonyType === "triadic" && "🔺"}
                  {harmonyType === "tetradic" && "🟦"}
                  {harmonyType === "split" && "🎨"}
                  {harmonyType === "square" && "⬜"}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-lg capitalize">
                  {harmonyType} Harmony
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {harmonyType === "complementary" &&
                    "Creates high contrast by using colors opposite each other on the color wheel. Perfect for making elements stand out."}
                  {harmonyType === "analogous" &&
                    "Uses colors next to each other on the color wheel. Creates serene and comfortable designs with low contrast."}
                  {harmonyType === "triadic" &&
                    "Uses three colors evenly spaced on the color wheel. Offers strong visual contrast while maintaining balance."}
                  {harmonyType === "tetradic" &&
                    "Uses four colors arranged in two complementary pairs. Rich color scheme that offers many variations."}
                  {harmonyType === "split" &&
                    "A variation of complementary harmony. Uses the base color and two colors adjacent to its complement. Less tension than complementary."}
                  {harmonyType === "square" &&
                    "Similar to tetradic but with four colors evenly spaced. Works best when one color dominates."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="wheel">Color Wheel</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-4">
                <Label className="text-sm font-medium text-muted-foreground">
                  {palette.type} Color Harmony
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {palette.colors.map((color, index) => {
                    const contrastColor = getContrastColor(color.hex);
                    return (
                      <div key={index} className="group">
                        <div
                          className="w-full aspect-square rounded-lg border border-border shadow-sm transition-all group-hover:scale-105  relative overflow-hidden"
                          style={{ backgroundColor: color.hex }}
                        >
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
                        <div className="mt-2 space-y-1 text-center">
                          <p className="text-xs font-medium text-muted-foreground">
                            {color.name}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {color.hsl}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="wheel" className="space-y-4">
                <Label className="text-sm font-medium text-muted-foreground">
                  Color Wheel Visualization
                </Label>

                <div className="flex justify-center py-8">
                  <div className="relative w-64 h-64">
                    {/* Color Wheel */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <radialGradient id="wheelGradient">
                          <stop offset="0%" stopColor="white" />
                          <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                      </defs>

                      {/* Color wheel background */}
                      <circle cx="50" cy="50" r="45" fill="url(#colorWheel)" />

                      {/* Create color wheel */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#hueGradient)"
                        strokeWidth="90"
                      />

                      <defs>
                        <linearGradient
                          id="hueGradient"
                          gradientTransform="rotate(90 50 50)"
                        >
                          <stop offset="0%" stopColor="#ff0000" />
                          <stop offset="16.67%" stopColor="#ffff00" />
                          <stop offset="33.33%" stopColor="#00ff00" />
                          <stop offset="50%" stopColor="#00ffff" />
                          <stop offset="66.67%" stopColor="#0000ff" />
                          <stop offset="83.33%" stopColor="#ff00ff" />
                          <stop offset="100%" stopColor="#ff0000" />
                        </linearGradient>
                      </defs>

                      {/* Center circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="25"
                        fill="var(--background)"
                        stroke="var(--border)"
                        strokeWidth="1"
                      />

                      {/* Base color indicator */}
                      {(() => {
                        const hsl = hexToHsl(baseColor);
                        if (!hsl) return null;
                        const angle = (hsl.h - 90) * (Math.PI / 180);
                        const radius = 35;
                        const x = 50 + radius * Math.cos(angle);
                        const y = 50 + radius * Math.sin(angle);
                        return (
                          <circle
                            cx={x}
                            cy={y}
                            r="6"
                            fill={baseColor}
                            stroke="white"
                            strokeWidth="2"
                          />
                        );
                      })()}

                      {/* Harmony color indicators */}
                      {palette.colors.map((color, index) => {
                        if (color.hex === baseColor.toLowerCase()) return null;
                        const hsl = hexToHsl(color.hex);
                        if (!hsl) return null;
                        const angle = (hsl.h - 90) * (Math.PI / 180);
                        const radius = 35;
                        const x = 50 + radius * Math.cos(angle);
                        const y = 50 + radius * Math.sin(angle);
                        return (
                          <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="5"
                            fill={color.hex}
                            stroke="white"
                            strokeWidth="2"
                          />
                        );
                      })}
                    </svg>

                    {/* Legend */}
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2">
                      {palette.colors.map((color, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full border border-border"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-xs text-muted-foreground">
                            {color.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="space-y-4">
                <Label className="text-sm font-medium text-muted-foreground">
                  Design Preview
                </Label>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Card Preview */}
                  <div className="space-y-4">
                    <p className="text-sm font-medium">Card Design</p>
                    <div className="rounded-lg border border-border overflow-hidden">
                      <div
                        className="p-6"
                        style={{ backgroundColor: palette.colors[0]?.hex }}
                      >
                        <h3
                          className="text-lg font-semibold mb-2"
                          style={{
                            color: getContrastColor(
                              palette.colors[0]?.hex || "#fff",
                            ),
                          }}
                        >
                          {palette.type} Card
                        </h3>
                        <p
                          className="text-sm opacity-90"
                          style={{
                            color: getContrastColor(
                              palette.colors[0]?.hex || "#fff",
                            ),
                          }}
                        >
                          Using {palette.colors.length} color harmony
                        </p>
                      </div>
                      <div className="p-4 bg-background space-y-3">
                        <div className="flex gap-2 flex-wrap">
                          {palette.colors.slice(0, 4).map((color, i) => (
                            <Button
                              key={i}
                              size="sm"
                              style={{
                                backgroundColor: color.hex,
                                color: getContrastColor(color.hex),
                              }}
                            >
                              {color.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* UI Elements */}
                  <div className="space-y-4">
                    <p className="text-sm font-medium">UI Elements</p>
                    <div className="space-y-4">
                      {/* Progress Bars */}
                      <div className="space-y-2">
                        {palette.colors.slice(0, 4).map((color, i) => (
                          <div key={i}>
                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${80 - i * 15}%`,
                                  backgroundColor: color.hex,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        {palette.colors.map((color, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: color.hex,
                              color: getContrastColor(color.hex),
                            }}
                          >
                            {color.name}
                          </span>
                        ))}
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
                    const json = JSON.stringify(palette, null, 2);
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
                    const css = palette.colors
                      .map((c, i) => `--harmony-${i + 1}: ${c.hex};`)
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
        harmony: {
${palette.colors.map((c, i) => `          ${c.name.toLowerCase().replace(/\s/g, "-")}: '${c.hex}',`).join("\n")}
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
              About the Color Harmony Generator
            </h2>
            <p className="text-muted-foreground">
              The Color Harmony Generator uses color theory principles to create harmonious color schemes. Choose from complementary, analogous, triadic, tetradic, split-complementary, and square harmony types to generate palettes that work well together.
            </p>
            <p className="text-muted-foreground">
              Each harmony type follows specific rules on the color wheel. Complementary colors sit opposite each other for high contrast, analogous colors sit adjacent for serene designs, and triadic colors are evenly spaced for vibrant balance. Export your harmony palette in CSS, JSON, or PNG format.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
