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
import { Slider } from "@/components/ui/slider";
import { Check, Copy, Shuffle, Download } from "lucide-react";
import { toast } from "sonner";
import ColorPaletteGeneratorSEO from "@/components/seo-content/color-tools/ColorPaletteGenerator";

export const relatedTools = [
  { name: "Shade Tint Tone Generator", href: "/shade-tint-tone-generator" },
  { name: "Complementary Color Finder", href: "/complementary-color-finder" },
  { name: "Palette Export Tool", href: "/palette-export-tool" },
  { name: "CSS Variables Generator", href: "/css-variables-generator" },
];

interface ColorPalette {
  base: string;
  lighter: string;
  light: string;
  dark: string;
  darker: string;
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

const adjustLightness = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const factor = percent / 100;
  const newR = rgb.r + (255 - rgb.r) * factor;
  const newG = rgb.g + (255 - rgb.g) * factor;
  const newB = rgb.b + (255 - rgb.b) * factor;

  return rgbToHex(newR, newG, newB);
};

const darkenColor = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const factor = percent / 100;
  const newR = rgb.r * (1 - factor);
  const newG = rgb.g * (1 - factor);
  const newB = rgb.b * (1 - factor);

  return rgbToHex(newR, newG, newB);
};

const generatePalette = (baseColor: string): ColorPalette => {
  return {
    base: baseColor.toLowerCase(),
    lighter: adjustLightness(baseColor, 60),
    light: adjustLightness(baseColor, 30),
    dark: darkenColor(baseColor, 30),
    darker: darkenColor(baseColor, 60),
  };
};

const copyToClipboard = async (text: string, fieldName: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${fieldName} copied to clipboard!`);
  } catch {
    toast.error("Failed to copy");
  }
};

const downloadPalette = (palette: ColorPalette) => {
  const cssContent = `:root {
  --color-base: ${palette.base};
  --color-lighter: ${palette.lighter};
  --color-light: ${palette.light};
  --color-dark: ${palette.dark};
  --color-darker: ${palette.darker};
}

/* Usage Examples */
.element {
  background-color: var(--color-base);
  color: var(--color-dark);
}

.element-light {
  background-color: var(--color-light);
}

.element-dark {
  background-color: var(--color-darker);
}`;

  const blob = new Blob([cssContent], { type: "text/css" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "color-palette.css";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast.success("Palette downloaded as CSS file!");
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

export default function ColorPaletteGeneratorPage() {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [lightnessAdjust, setLightnessAdjust] = useState(0);

  const palette = generatePalette(baseColor);

  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
        setBaseColor(value || "#000000");
      }
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

  const ColorSwatch = ({
    color,
    name,
    index,
  }: {
    color: string;
    name: string;
    index: number;
  }) => (
    <div className="group relative">
      <div
        className="w-full aspect-square rounded-lg border border-border shadow-sm transition-transform group-hover:scale-105 "
        style={{ backgroundColor: color }}
      />
      <div className="mt-2 space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase">
          {name}
        </p>
        <div className="flex items-center gap-1">
          <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
            {color}
          </code>
          <CopyButton color={color} name={name} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Color Palette Generator from Base Color
          </h1>
          <p className="text-muted-foreground">
            Generate a beautiful, harmonious color palette from a single base
            color. Perfect for building consistent UI color schemes and brand
            identities.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Base Color Input */}
                <div className="space-y-3">
                  <Label htmlFor="base-color" className="text-sm font-medium">
                    Base Color
                  </Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        #
                      </span>
                      <Input
                        id="base-color"
                        value={baseColor.replace("#", "")}
                        onChange={handleColorChange}
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
                        onChange={(e) => setBaseColor(e.target.value)}
                        className="w-[150%] h-[150%] -m-[25%] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Lightness Adjustment */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">
                      Lightness Adjustment
                    </Label>
                    <span className="text-sm font-mono text-muted-foreground">
                      {lightnessAdjust > 0 ? "+" : ""}
                      {lightnessAdjust}%
                    </span>
                  </div>
                  <Slider
                    value={[lightnessAdjust]}
                    min={-50}
                    max={50}
                    step={5}
                    onValueChange={([v]) => setLightnessAdjust(v)}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={randomizeColor}
                    variant="outline"
                    className="flex-1"
                  >
                    <Shuffle className="h-4 w-4 mr-2" />
                    Random
                  </Button>
                  <Button
                    onClick={() => downloadPalette(palette)}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                {/* Preset Colors */}
                <div className="space-y-3 pt-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Quick Select
                  </Label>
                  <div className="grid grid-cols-5 gap-2">
                    {PRESET_COLORS.map((color) => (
                      <button
                        key={color}
                        className={`aspect-square rounded-md border-2 transition-all hover:scale-110  ${baseColor.toLowerCase() === color.toLowerCase()
                          ? "border-primary ring-2 ring-primary ring-offset-2"
                          : "border-border"
                          }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setBaseColor(color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <Label className="text-sm font-medium">Export Formats</Label>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      const json = JSON.stringify(palette, null, 2);
                      copyToClipboard(json, "JSON");
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy as JSON
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      const css = `--base: ${palette.base};
--lighter: ${palette.lighter};
--light: ${palette.light};
--dark: ${palette.dark};
--darker: ${palette.darker};`;
                      copyToClipboard(css, "CSS Variables");
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy as CSS Variables
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Palette Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                  Generated Palette
                </Label>

                {/* Full Palette Grid */}
                <div className="grid grid-cols-5 gap-4 mb-8">
                  <ColorSwatch
                    color={palette.lighter}
                    name="Lighter"
                    index={0}
                  />
                  <ColorSwatch color={palette.light} name="Light" index={1} />
                  <ColorSwatch color={palette.base} name="Base" index={2} />
                  <ColorSwatch color={palette.dark} name="Dark" index={3} />
                  <ColorSwatch color={palette.darker} name="Darker" index={4} />
                </div>

                {/* Preview Cards */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Preview
                  </Label>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Light Theme Preview */}
                    <div className="rounded-lg border border-border overflow-hidden">
                      <div
                        className="p-4"
                        style={{ backgroundColor: palette.lighter }}
                      >
                        <p
                          className="text-sm font-medium"
                          style={{ color: palette.darker }}
                        >
                          Light Theme
                        </p>
                      </div>
                      <div className="p-4 bg-background space-y-3">
                        <Button
                          style={{
                            backgroundColor: palette.base,
                            color: "#fff",
                          }}
                        >
                          Primary Button
                        </Button>
                        <p className="text-sm" style={{ color: palette.dark }}>
                          Sample text with dark color
                        </p>
                      </div>
                    </div>

                    {/* Dark Theme Preview */}
                    <div className="rounded-lg border border-border overflow-hidden">
                      <div
                        className="p-4"
                        style={{ backgroundColor: palette.darker }}
                      >
                        <p
                          className="text-sm font-medium"
                          style={{ color: palette.lighter }}
                        >
                          Dark Theme
                        </p>
                      </div>
                      <div className="p-4 bg-background space-y-3">
                        <Button
                          style={{
                            backgroundColor: palette.light,
                            color: palette.darker,
                          }}
                        >
                          Secondary Button
                        </Button>
                        <p className="text-sm" style={{ color: palette.base }}>
                          Sample text with base color
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Gradient Preview */}
                  <div className="rounded-lg border border-border overflow-hidden">
                    <div className="p-4 bg-background">
                      <p className="text-sm font-medium text-muted-foreground mb-3">
                        Gradient Preview
                      </p>
                      <div
                        className="h-16 rounded-md"
                        style={{
                          background: `linear-gradient(to right, ${palette.lighter}, ${palette.light}, ${palette.base}, ${palette.dark}, ${palette.darker})`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <ColorPaletteGeneratorSEO />
      </div>
    </div >
  );
}
