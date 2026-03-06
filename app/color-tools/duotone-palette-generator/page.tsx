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
  { name: "Complementary Color Finder", href: "/complementary-color-finder" },
  { name: "Color Palette Generator", href: "/color-palette-generator" },
  { name: "Palette Export Tool", href: "/palette-export-tool" },
  { name: "Contrast Checker", href: "/contrast-checker" },
];
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, Download, Shuffle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface DuotonePalette {
  primary: string;
  secondary: string;
  mix1: string;
  mix2: string;
  mix3: string;
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

const generateDuotonePalette = (
  primary: string,
  secondary: string,
): DuotonePalette => {
  return {
    primary: primary.toLowerCase(),
    secondary: secondary.toLowerCase(),
    mix1: mixColors(primary, secondary, 0.75),
    mix2: mixColors(primary, secondary, 0.5),
    mix3: mixColors(primary, secondary, 0.25),
  };
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

const downloadPalette = (palette: DuotonePalette, format: string) => {
  if (format === "css") {
    const cssContent = `:root {
  --duotone-primary: ${palette.primary};
  --duotone-secondary: ${palette.secondary};
  --duotone-mix-1: ${palette.mix1};
  --duotone-mix-2: ${palette.mix2};
  --duotone-mix-3: ${palette.mix3};
}

/* Duotone Utility Classes */
.duotone-primary { background-color: var(--duotone-primary); }
.duotone-secondary { background-color: var(--duotone-secondary); }
.duotone-mix-1 { background-color: var(--duotone-mix-1); }
.duotone-mix-2 { background-color: var(--duotone-mix-2); }
.duotone-mix-3 { background-color: var(--duotone-mix-3); }

/* Duotone Gradient */
.duotone-gradient {
  background: linear-gradient(135deg, var(--duotone-primary), var(--duotone-secondary));
}
`;
    const blob = new Blob([cssContent], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "duotone-palette.css";
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
    a.download = "duotone-palette.json";
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
    gradient.addColorStop(0, palette.primary);
    gradient.addColorStop(1, palette.secondary);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "duotone-palette.png";
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

const PRESET_PRIMARY = [
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

const PRESET_SECONDARY = [
  "#1e293b",
  "#334155",
  "#475569",
  "#64748b",
  "#0f172a",
  "#7c3aed",
  "#db2777",
  "#dc2626",
  "#ea580c",
  "#059669",
];

export default function DuotonePaletteGeneratorPage() {
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [secondaryColor, setSecondaryColor] = useState("#1e293b");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState("css");
  const [primaryHex, setPrimaryHex] = useState("3b82f6");
  const [secondaryHex, setSecondaryHex] = useState("1e293b");

  const palette = generateDuotonePalette(primaryColor, secondaryColor);

  const handlePrimaryHexChange = useCallback((value: string) => {
    setPrimaryHex(value);
    const fullHex = value.startsWith("#") ? value : `#${value}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(fullHex)) {
      setPrimaryColor(fullHex.toLowerCase());
    }
  }, []);

  const handleSecondaryHexChange = useCallback((value: string) => {
    setSecondaryHex(value);
    const fullHex = value.startsWith("#") ? value : `#${value}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(fullHex)) {
      setSecondaryColor(fullHex.toLowerCase());
    }
  }, []);

  const copyColor = async (color: string, name: string) => {
    await copyToClipboard(color, name);
    setCopiedField(name);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const randomizeColors = () => {
    const randomPrimary =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    const randomSecondary =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    setPrimaryColor(randomPrimary);
    setSecondaryColor(randomSecondary);
    setPrimaryHex(randomPrimary.replace("#", ""));
    setSecondaryHex(randomSecondary.replace("#", ""));
    toast.success("Random duotone generated!");
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

  const ColorInput = ({
    label,
    value,
    hexValue,
    onChange,
    onHexChange,
  }: {
    label: string;
    value: string;
    hexValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onHexChange: (value: string) => void;
  }) => (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            #
          </span>
          <Input
            value={hexValue}
            onChange={(e) => onHexChange(e.target.value)}
            className="pl-7 font-mono"
            maxLength={6}
            placeholder="000000"
          />
        </div>
        <div
          className="w-12 h-10 rounded border border-border  cursor-pointer overflow-hidden"
          style={{ backgroundColor: value }}
        >
          <input
            type="color"
            value={value}
            onChange={onChange}
            className="w-[150%] h-[150%] -m-[25%] cursor-pointer"
          />
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
            Duotone Color Palette Generator
          </h1>
          <p className="text-muted-foreground">
            Create striking duotone color combinations using two colors of your
            choice. Perfect for bold graphic design, posters, and modern web
            aesthetics.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Primary Color */}
              <ColorInput
                label="Primary Color"
                value={primaryColor}
                hexValue={primaryHex}
                onChange={(e) => {
                  setPrimaryColor(e.target.value);
                  setPrimaryHex(e.target.value.replace("#", ""));
                }}
                onHexChange={handlePrimaryHexChange}
              />

              {/* Secondary Color */}
              <ColorInput
                label="Secondary Color"
                value={secondaryColor}
                hexValue={secondaryHex}
                onChange={(e) => {
                  setSecondaryColor(e.target.value);
                  setSecondaryHex(e.target.value.replace("#", ""));
                }}
                onHexChange={handleSecondaryHexChange}
              />

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
              <Button onClick={randomizeColors} variant="outline">
                <Shuffle className="h-4 w-4 mr-2" />
                Random
              </Button>
              <Button
                onClick={() => {
                  setPrimaryColor("#3b82f6");
                  setSecondaryColor("#1e293b");
                  setPrimaryHex("3b82f6");
                  setSecondaryHex("1e293b");
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

        {/* Palette Preview */}
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
                  Duotone Color Palette
                </Label>
                <div className="grid grid-cols-5 gap-4">
                  {/* Primary */}
                  <div className="group">
                    <div
                      className="w-full aspect-square rounded-lg border border-border shadow-sm transition-all group-hover:scale-105  relative overflow-hidden"
                      style={{ backgroundColor: palette.primary }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/40 to-transparent">
                        <div className="flex flex-col items-center gap-1">
                          <code
                            className="text-xs font-mono font-medium"
                            style={{ color: getContrastColor(palette.primary) }}
                          >
                            {palette.primary}
                          </code>
                          <button
                            onClick={() =>
                              copyColor(palette.primary, "Primary")
                            }
                            className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors opacity-0 group-hover:opacity-100"
                            style={{ color: getContrastColor(palette.primary) }}
                          >
                            {copiedField === "Primary" ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium text-muted-foreground">
                        Primary
                      </p>
                    </div>
                  </div>

                  {/* Mix 1 */}
                  <div className="group">
                    <div
                      className="w-full aspect-square rounded-lg border border-border shadow-sm transition-all group-hover:scale-105  relative overflow-hidden"
                      style={{ backgroundColor: palette.mix1 }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/40 to-transparent">
                        <div className="flex flex-col items-center gap-1">
                          <code
                            className="text-xs font-mono font-medium"
                            style={{ color: getContrastColor(palette.mix1) }}
                          >
                            {palette.mix1}
                          </code>
                          <button
                            onClick={() => copyColor(palette.mix1, "Mix 1")}
                            className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors opacity-0 group-hover:opacity-100"
                            style={{ color: getContrastColor(palette.mix1) }}
                          >
                            {copiedField === "Mix 1" ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium text-muted-foreground">
                        75% Primary
                      </p>
                    </div>
                  </div>

                  {/* Mix 2 */}
                  <div className="group">
                    <div
                      className="w-full aspect-square rounded-lg border border-border shadow-sm transition-all group-hover:scale-105  relative overflow-hidden"
                      style={{ backgroundColor: palette.mix2 }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/40 to-transparent">
                        <div className="flex flex-col items-center gap-1">
                          <code
                            className="text-xs font-mono font-medium"
                            style={{ color: getContrastColor(palette.mix2) }}
                          >
                            {palette.mix2}
                          </code>
                          <button
                            onClick={() => copyColor(palette.mix2, "Mix 2")}
                            className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors opacity-0 group-hover:opacity-100"
                            style={{ color: getContrastColor(palette.mix2) }}
                          >
                            {copiedField === "Mix 2" ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium text-muted-foreground">
                        50% Mix
                      </p>
                    </div>
                  </div>

                  {/* Mix 3 */}
                  <div className="group">
                    <div
                      className="w-full aspect-square rounded-lg border border-border shadow-sm transition-all group-hover:scale-105  relative overflow-hidden"
                      style={{ backgroundColor: palette.mix3 }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/40 to-transparent">
                        <div className="flex flex-col items-center gap-1">
                          <code
                            className="text-xs font-mono font-medium"
                            style={{ color: getContrastColor(palette.mix3) }}
                          >
                            {palette.mix3}
                          </code>
                          <button
                            onClick={() => copyColor(palette.mix3, "Mix 3")}
                            className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors opacity-0 group-hover:opacity-100"
                            style={{ color: getContrastColor(palette.mix3) }}
                          >
                            {copiedField === "Mix 3" ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium text-muted-foreground">
                        25% Primary
                      </p>
                    </div>
                  </div>

                  {/* Secondary */}
                  <div className="group">
                    <div
                      className="w-full aspect-square rounded-lg border border-border shadow-sm transition-all group-hover:scale-105  relative overflow-hidden"
                      style={{ backgroundColor: palette.secondary }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/40 to-transparent">
                        <div className="flex flex-col items-center gap-1">
                          <code
                            className="text-xs font-mono font-medium"
                            style={{
                              color: getContrastColor(palette.secondary),
                            }}
                          >
                            {palette.secondary}
                          </code>
                          <button
                            onClick={() =>
                              copyColor(palette.secondary, "Secondary")
                            }
                            className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors opacity-0 group-hover:opacity-100"
                            style={{
                              color: getContrastColor(palette.secondary),
                            }}
                          >
                            {copiedField === "Secondary" ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium text-muted-foreground">
                        Secondary
                      </p>
                    </div>
                  </div>
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
                      background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
                    }}
                  />

                  {/* Gradient Variations */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div
                      className="h-24 rounded-lg border border-border"
                      style={{
                        background: `linear-gradient(to right, ${palette.primary}, ${palette.secondary})`,
                      }}
                    />
                    <div
                      className="h-24 rounded-lg border border-border"
                      style={{
                        background: `linear-gradient(to bottom, ${palette.primary}, ${palette.secondary})`,
                      }}
                    />
                    <div
                      className="h-24 rounded-lg border border-border"
                      style={{
                        background: `linear-gradient(45deg, ${palette.primary}, ${palette.mix2}, ${palette.secondary})`,
                      }}
                    />
                    <div
                      className="h-24 rounded-lg border border-border"
                      style={{
                        background: `radial-gradient(circle, ${palette.primary}, ${palette.secondary})`,
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
                        background: `linear-gradient(135deg, ${palette.primary}15, ${palette.secondary}15)`,
                      }}
                    >
                      <div
                        className="p-6"
                        style={{
                          background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
                        }}
                      >
                        <h3
                          className="text-lg font-semibold mb-2"
                          style={{ color: getContrastColor(palette.primary) }}
                        >
                          Duotone Card
                        </h3>
                        <p
                          className="text-sm opacity-90"
                          style={{ color: getContrastColor(palette.primary) }}
                        >
                          Beautiful gradient background
                        </p>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            style={{
                              backgroundColor: palette.primary,
                              color: "#fff",
                            }}
                          >
                            Primary
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            style={{
                              borderColor: palette.secondary,
                              color: palette.secondary,
                            }}
                          >
                            Secondary
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Badge Preview */}
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
                              background: `linear-gradient(to right, ${palette.primary}, ${palette.secondary})`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Gradient progress bar
                        </p>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: palette.primary,
                            color: "#fff",
                          }}
                        >
                          Primary
                        </span>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: palette.secondary,
                            color: getContrastColor(palette.secondary),
                          }}
                        >
                          Secondary
                        </span>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: palette.mix2,
                            color: getContrastColor(palette.mix2),
                          }}
                        >
                          Mixed
                        </span>
                      </div>

                      {/* Avatar Stack */}
                      <div className="flex -space-x-2">
                        {[palette.primary, palette.mix2, palette.secondary].map(
                          (color, i) => (
                            <div
                              key={i}
                              className="w-10 h-10 rounded-full border-2 border-background flex items-center justify-center text-xs font-medium"
                              style={{
                                backgroundColor: color,
                                color: getContrastColor(color),
                              }}
                            >
                              {i + 1}
                            </div>
                          ),
                        )}
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
                    const css = `--primary: ${palette.primary};
--secondary: ${palette.secondary};
--mix-1: ${palette.mix1};
--mix-2: ${palette.mix2};
--mix-3: ${palette.mix3};`;
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
                    const gradient = `background: linear-gradient(135deg, ${palette.primary}, ${palette.secondary});`;
                    copyToClipboard(gradient, "CSS Gradient");
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Gradient CSS
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preset Colors */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardContent className="p-6">
              <Label className="text-sm font-medium text-muted-foreground mb-3 block">
                Preset Primary Colors
              </Label>
              <div className="grid grid-cols-5 gap-2">
                {PRESET_PRIMARY.map((color) => (
                  <button
                    key={color}
                    className={`aspect-square rounded-md border-2 transition-all hover:scale-110  ${
                      primaryColor.toLowerCase() === color.toLowerCase()
                        ? "border-primary ring-2 ring-primary ring-offset-2"
                        : "border-border"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setPrimaryColor(color);
                      setPrimaryHex(color.replace("#", ""));
                    }}
                    title={color}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Label className="text-sm font-medium text-muted-foreground mb-3 block">
                Preset Secondary Colors
              </Label>
              <div className="grid grid-cols-5 gap-2">
                {PRESET_SECONDARY.map((color) => (
                  <button
                    key={color}
                    className={`aspect-square rounded-md border-2 transition-all hover:scale-110  ${
                      secondaryColor.toLowerCase() === color.toLowerCase()
                        ? "border-primary ring-2 ring-primary ring-offset-2"
                        : "border-border"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setSecondaryColor(color);
                      setSecondaryHex(color.replace("#", ""));
                    }}
                    title={color}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

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
              About the Duotone Palette Generator
            </h2>
            <p className="text-muted-foreground">
              The Duotone Palette Generator creates elegant two-color schemes with smooth transitions between them. Enter a primary and secondary color to generate a complete duotone palette with intermediate mix shades.
            </p>
            <p className="text-muted-foreground">
              Duotone designs are perfect for minimalist aesthetics, modern branding, and creating visual hierarchy with limited colors. Export your palette as CSS, JSON, or PNG for easy integration into your projects.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
