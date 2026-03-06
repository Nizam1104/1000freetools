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
  { name: "Gradient Step Generator", href: "/gradient-step-generator" },
  { name: "Color Scale Generator", href: "/color-scale-generator" },
  { name: "CSS Gradient Generator", href: "/css-gradient-generator" },
  { name: "Shade Tint Tone Generator", href: "/shade-tint-tone-generator" },
];
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Check,
  Copy,
  Download,
  Shuffle,
  RotateCcw,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import GradientStepGeneratorSEO from "@/components/seo-content/color-tools/GradientStepGenerator";
import GradientPaletteGeneratorSEO from "@/components/seo-content/color-tools/GradientPaletteGenerator";

interface GradientStop {
  id: string;
  color: string;
  position: number;
}

interface GradientPalette {
  colors: string[];
  gradient: string;
}

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

const rgbToHex = (r: number, g: number, b: number) => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

const mixColors = (hex1: string, hex2: string, ratio: number): string => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return hex1;

  const r = Math.round(rgb1.r * ratio + rgb2.r * (1 - ratio));
  const g = Math.round(rgb1.g * ratio + rgb2.g * (1 - ratio));
  const b = Math.round(rgb1.b * ratio + rgb2.b * (1 - ratio));

  return rgbToHex(r, g, b);
};

const generateGradientPalette = (
  stops: GradientStop[],
  paletteSize: number,
): GradientPalette => {
  if (stops.length < 2) {
    return { colors: [], gradient: "" };
  }

  const sortedStops = [...stops].sort((a, b) => a.position - b.position);
  const colors: string[] = [];

  for (let i = 0; i < paletteSize; i++) {
    const position = (i / (paletteSize - 1)) * 100;

    // Find the two stops to interpolate between
    let lowerStop = sortedStops[0];
    let upperStop = sortedStops[sortedStops.length - 1];

    for (let j = 0; j < sortedStops.length - 1; j++) {
      if (
        position >= sortedStops[j].position &&
        position <= sortedStops[j + 1].position
      ) {
        lowerStop = sortedStops[j];
        upperStop = sortedStops[j + 1];
        break;
      }
    }

    // Calculate interpolation ratio
    const range = upperStop.position - lowerStop.position;
    const ratio = range === 0 ? 0 : (position - lowerStop.position) / range;

    const color = mixColors(lowerStop.color, upperStop.color, 1 - ratio);
    colors.push(color);
  }

  // Generate CSS gradient
  const gradientStops = sortedStops
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(", ");
  const gradient = `linear-gradient(135deg, ${gradientStops})`;

  return { colors, gradient };
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

const downloadPalette = (palette: GradientPalette, format: string) => {
  if (format === "css") {
    const cssContent = `/* Gradient Palette */
:root {
  --gradient: ${palette.gradient};
${palette.colors.map((c, i) => `  --gradient-color-${i + 1}: ${c};`).join("\n")}
}

/* Gradient Utility Class */
.gradient-bg {
  ${palette.gradient}
}

/* Individual Color Classes */
${palette.colors.map((c, i) => `.gradient-${i + 1} { background-color: ${c}; }`).join("\n")}
`;
    const blob = new Blob([cssContent], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gradient-palette.css";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else if (format === "json") {
    const json = JSON.stringify(
      { gradient: palette.gradient, colors: palette.colors },
      null,
      2,
    );
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gradient-palette.json";
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

    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    const colors = palette.gradient.match(/#[0-9a-fA-F]{6}/g) || [];
    const positions =
      palette.gradient.match(/(\d+)%/g)?.map((s) => parseInt(s) / 100) || [];

    if (colors.length > 0) {
      colors.forEach((color, i) => {
        gradient.addColorStop(positions[i] || i / (colors.length - 1), color);
      });
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "gradient-palette.png";
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

const PRESET_GRADIENTS = [
  { name: "Sunset", colors: ["#f59e0b", "#ef4444", "#ec4899"] },
  { name: "Ocean", colors: ["#06b6d4", "#3b82f6", "#8b5cf6"] },
  { name: "Forest", colors: ["#22c55e", "#14b8a6", "#06b6d4"] },
  { name: "Berry", colors: ["#ec4899", "#8b5cf6", "#6366f1"] },
  { name: "Fire", colors: ["#ef4444", "#f97316", "#f59e0b"] },
  { name: "Night", colors: ["#1e293b", "#3b82f6", "#8b5cf6"] },
];

export default function GradientPaletteGeneratorPage() {
  const [stops, setStops] = useState<GradientStop[]>([
    { id: "1", color: "#3b82f6", position: 0 },
    { id: "2", color: "#8b5cf6", position: 100 },
  ]);
  const [paletteSize, setPaletteSize] = useState(5);
  const [angle, setAngle] = useState(135);
  const [gradientType, setGradientType] = useState("linear");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState("css");

  const palette = generateGradientPalette(stops, paletteSize);

  const addStop = () => {
    const newPosition = Math.floor(Math.random() * 100);
    const newColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    setStops([
      ...stops,
      { id: Date.now().toString(), color: newColor, position: newPosition },
    ]);
    toast.success("Color stop added!");
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) {
      toast.error("Minimum 2 color stops required");
      return;
    }
    setStops(stops.filter((s) => s.id !== id));
    toast.success("Color stop removed!");
  };

  const updateStop = (id: string, updates: Partial<GradientStop>) => {
    setStops(stops.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const copyColor = async (color: string, index: number) => {
    await copyToClipboard(color, `Color ${index + 1}`);
    setCopiedField(`color-${index}`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const applyPreset = (colors: string[]) => {
    const newStops: GradientStop[] = colors.map((color, index) => ({
      id: Date.now().toString() + index,
      color,
      position: (index / (colors.length - 1)) * 100,
    }));
    setStops(newStops);
    toast.success("Preset applied!");
  };

  const randomizeGradient = () => {
    const numStops = 2 + Math.floor(Math.random() * 3);
    const newStops: GradientStop[] = Array.from(
      { length: numStops },
      (_, i) => ({
        id: Date.now().toString() + i,
        color:
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0"),
        position:
          i === 0
            ? 0
            : i === numStops - 1
              ? 100
              : Math.floor(Math.random() * 80) + 10,
      }),
    );
    setStops(newStops);
    toast.success("Random gradient generated!");
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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Gradient-Based Color Palette Generator
          </h1>
          <p className="text-muted-foreground">
            Generate smooth, gradient-inspired color palettes between two or
            more colors. Useful for creating cohesive UI themes and data
            visualization scales.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Gradient Type */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Gradient Type</Label>
                <Select value={gradientType} onValueChange={setGradientType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="radial">Radial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Angle */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Angle</Label>
                  <span className="text-sm font-mono text-muted-foreground">
                    {angle}°
                  </span>
                </div>
                <Slider
                  value={[angle]}
                  min={0}
                  max={360}
                  step={45}
                  onValueChange={([v]) => setAngle(v)}
                  disabled={gradientType !== "linear"}
                />
              </div>

              {/* Palette Size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Palette Size</Label>
                  <span className="text-sm font-mono text-muted-foreground">
                    {paletteSize}
                  </span>
                </div>
                <Slider
                  value={[paletteSize]}
                  min={3}
                  max={12}
                  step={1}
                  onValueChange={([v]) => setPaletteSize(v)}
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
              <Button onClick={randomizeGradient} variant="outline">
                <Shuffle className="h-4 w-4 mr-2" />
                Random
              </Button>
              <Button onClick={addStop} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Stop
              </Button>
              <Button
                onClick={() => downloadPalette(palette, exportFormat)}
                variant="secondary"
                disabled={palette.colors.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Color Stops Editor */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <Label className="text-sm font-medium text-muted-foreground mb-4 block">
              Color Stops
            </Label>

            <div className="space-y-4">
              {/* Visual Editor */}
              <div className="relative h-16 rounded-lg border border-border overflow-hidden ">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      gradientType === "linear"
                        ? `linear-gradient(${angle}deg, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`
                        : `radial-gradient(circle, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`,
                  }}
                />

                {/* Position Markers */}
                {stops.map((stop) => (
                  <div
                    key={stop.id}
                    className="absolute top-0 h-full w-0.5 bg-white/50"
                    style={{ left: `${stop.position}%` }}
                  />
                ))}
              </div>

              {/* Stop Controls */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stops.map((stop, index) => (
                  <div
                    key={stop.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                          Stop {index + 1}
                        </span>
                        {stops.length > 2 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-destructive"
                            onClick={() => removeStop(stop.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <div
                          className="w-8 h-8 rounded border border-border cursor-pointer overflow-hidden"
                          style={{ backgroundColor: stop.color }}
                        >
                          <input
                            type="color"
                            value={stop.color}
                            onChange={(e) =>
                              updateStop(stop.id, { color: e.target.value })
                            }
                            className="w-[150%] h-[150%] -m-[25%] cursor-pointer"
                          />
                        </div>
                        <Input
                          type="number"
                          value={stop.position}
                          onChange={(e) =>
                            updateStop(stop.id, {
                              position: Math.min(
                                100,
                                Math.max(0, Number(e.target.value)),
                              ),
                            })
                          }
                          className="w-20 h-8 text-xs"
                          min={0}
                          max={100}
                        />
                        <span className="text-sm text-muted-foreground self-center">
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Palette Preview */}
        {palette.colors.length > 0 ? (
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="colors" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                  <TabsTrigger value="gradient">Gradient</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="colors" className="space-y-4">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Extracted Colors
                  </Label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
                    {palette.colors.map((color, index) => {
                      const contrastColor = getContrastColor(color);
                      return (
                        <div key={index} className="group">
                          <div
                            className="w-full aspect-square rounded-lg border border-border shadow-sm transition-all group-hover:scale-105  relative overflow-hidden"
                            style={{ backgroundColor: color }}
                          >
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/40 to-transparent">
                              <div className="flex flex-col items-center gap-1">
                                <code
                                  className="text-xs font-mono font-medium"
                                  style={{ color: contrastColor }}
                                >
                                  {color}
                                </code>
                                <button
                                  onClick={() => copyColor(color, index)}
                                  className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors opacity-0 group-hover:opacity-100"
                                  style={{ color: contrastColor }}
                                >
                                  {copiedField === `color-${index}` ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                          <p className="mt-2 text-center text-xs text-muted-foreground">
                            {index + 1}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="gradient" className="space-y-4">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Gradient Preview
                  </Label>

                  <div className="space-y-4">
                    {/* Main Gradient */}
                    <div
                      className="w-full h-48 rounded-lg border border-border overflow-hidden"
                      style={{
                        background:
                          gradientType === "linear"
                            ? `linear-gradient(${angle}deg, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`
                            : `radial-gradient(circle, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`,
                      }}
                    />

                    {/* Gradient Variations */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div
                        className="h-24 rounded-lg border border-border"
                        style={{
                          background: `linear-gradient(to right, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`,
                        }}
                      />
                      <div
                        className="h-24 rounded-lg border border-border"
                        style={{
                          background: `linear-gradient(to bottom, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`,
                        }}
                      />
                      <div
                        className="h-24 rounded-lg border border-border"
                        style={{
                          background: `radial-gradient(circle, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`,
                        }}
                      />
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
                      <div
                        className="rounded-lg border border-border overflow-hidden"
                        style={{
                          background:
                            gradientType === "linear"
                              ? `linear-gradient(${angle}deg, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`
                              : `radial-gradient(circle, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`,
                        }}
                      >
                        <div className="p-6">
                          <h3 className="text-lg font-semibold mb-2 text-white">
                            Gradient Card
                          </h3>
                          <p className="text-sm text-white/90">
                            Beautiful gradient background with {stops.length}{" "}
                            color stops
                          </p>
                        </div>
                        <div className="p-4 bg-background/90 backdrop-blur space-y-3">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              style={{
                                backgroundColor: stops[0]?.color,
                                color: getContrastColor(
                                  stops[0]?.color || "#fff",
                                ),
                              }}
                            >
                              Primary
                            </Button>
                            <Button size="sm" variant="outline">
                              Secondary
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* UI Elements */}
                    <div className="space-y-4">
                      <p className="text-sm font-medium">UI Elements</p>
                      <div className="space-y-4">
                        {/* Progress Bar */}
                        <div>
                          <div className="h-3 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: "70%",
                                background: `linear-gradient(to right, ${stops.map((s) => s.color).join(", ")})`,
                              }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Gradient progress bar
                          </p>
                        </div>

                        {/* Text Gradient */}
                        <div>
                          <h2
                            className="text-2xl font-bold"
                            style={{
                              background: `linear-gradient(to right, ${stops.map((s) => s.color).join(", ")})`,
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            Gradient Text
                          </h2>
                          <p className="text-xs text-muted-foreground mt-1">
                            Gradient text effect
                          </p>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                          {palette.colors.slice(0, 5).map((color, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: color,
                                color: getContrastColor(color),
                              }}
                            >
                              Badge {i + 1}
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
                      const json = JSON.stringify(
                        { gradient: palette.gradient, colors: palette.colors },
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
                      const css = `background: ${palette.gradient};`;
                      copyToClipboard(css, "CSS Gradient");
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy CSS
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const tailwind = `module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': '${palette.gradient}',
      },
      colors: {
        gradient: {
${palette.colors.map((c, i) => `          ${i + 1}: '${c}',`).join("\n")}
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
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="max-w-sm mx-auto space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                  <Shuffle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No gradient yet</h3>
                <p className="text-muted-foreground">
                  Add color stops or click "Random" to create a gradient palette
                </p>
                <Button onClick={randomizeGradient} className="mt-4">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Generate Random
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preset Gradients */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <Label className="text-sm font-medium text-muted-foreground mb-3 block">
              Preset Gradients
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {PRESET_GRADIENTS.map((preset) => (
                <button
                  key={preset.name}
                  className="group relative h-20 rounded-lg border border-border overflow-hidden hover:scale-105 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${preset.colors.join(", ")})`,
                  }}
                  onClick={() => applyPreset(preset.colors)}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity drop-shadow">
                      {preset.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Tools & SEO Content */}
        <GradientPaletteGeneratorSEO />

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
