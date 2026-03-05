"use client";

import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Check, Copy, Shuffle, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface PastelColor {
  hex: string;
  name: string;
}

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

const generatePastelColor = (hueOffset: number = 0): PastelColor => {
  const hue = Math.floor(Math.random() * 360);
  const adjustedHue = (hue + hueOffset) % 360;
  // Pastel colors: low saturation (25-45%), high lightness (80-95%)
  const saturation = 25 + Math.floor(Math.random() * 20);
  const lightness = 80 + Math.floor(Math.random() * 15);
  const hex = hslToHex(adjustedHue, saturation, lightness);

  const names = [
    "Blush",
    "Mist",
    "Bloom",
    "Cloud",
    "Pearl",
    "Dawn",
    "Soft",
    "Whisper",
    "Frost",
    "Cream",
  ];
  const name = names[Math.floor(Math.random() * names.length)];

  return { hex, name: `${name} ${adjustedHue}` };
};

const generatePastelPalette = (
  size: number,
  harmony: string,
): PastelColor[] => {
  const colors: PastelColor[] = [];
  const baseHue = Math.floor(Math.random() * 360);

  switch (harmony) {
    case "analogous":
      for (let i = 0; i < size; i++) {
        const hueOffset = ((i - Math.floor(size / 2)) * 30) % 360;
        colors.push(generatePastelColor((baseHue + hueOffset + 360) % 360));
      }
      break;
    case "complementary":
      for (let i = 0; i < size; i++) {
        const hueOffset = i % 2 === 0 ? 0 : 180;
        colors.push(generatePastelColor((baseHue + hueOffset) % 360));
      }
      break;
    case "triadic":
      for (let i = 0; i < size; i++) {
        const hueOffset = (i % 3) * 120;
        colors.push(generatePastelColor((baseHue + hueOffset) % 360));
      }
      break;
    case "random":
    default:
      for (let i = 0; i < size; i++) {
        colors.push(generatePastelColor());
      }
      break;
  }

  return colors;
};

const getContrastColor = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "#000000";

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#374151" : "#ffffff";
};

const copyToClipboard = async (text: string, fieldName: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${fieldName} copied to clipboard!`);
  } catch {
    toast.error("Failed to copy");
  }
};

const downloadPalette = (colors: PastelColor[], format: string) => {
  if (format === "css") {
    const cssContent = `:root {
${colors.map((c, i) => `  --pastel-${i + 1}: ${c.hex};`).join("\n")}
}

/* Pastel Color Classes */
${colors.map((c, i) => `.pastel-${i + 1} { background-color: ${c.hex}; }`).join("\n")}
`;
    const blob = new Blob([cssContent], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pastel-palette.css";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else if (format === "json") {
    const json = JSON.stringify(colors, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pastel-palette.json";
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

    const colorWidth = canvas.width / colors.length;
    colors.forEach((color, i) => {
      ctx.fillStyle = color.hex;
      ctx.fillRect(i * colorWidth, 0, colorWidth, canvas.height);
    });

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pastel-palette.png";
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

export default function PastelPaletteGeneratorPage() {
  const [paletteSize, setPaletteSize] = useState(5);
  const [harmony, setHarmony] = useState("random");
  const [softness, setSoftness] = useState(70);
  const [colors, setColors] = useState<PastelColor[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState("css");

  const generatePalette = () => {
    const newColors = generatePastelPalette(paletteSize, harmony);
    // Adjust softness
    const adjustedColors = newColors.map((color) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
        color.hex,
      );
      if (!result) return color;

      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);

      // Blend towards white based on softness
      const blend = softness / 100;
      const newR = Math.round(r + (255 - r) * blend * 0.3);
      const newG = Math.round(g + (255 - g) * blend * 0.3);
      const newB = Math.round(b + (255 - b) * blend * 0.3);

      return {
        ...color,
        hex: `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`,
      };
    });

    setColors(adjustedColors);
    toast.success("New pastel palette generated!");
  };

  const copyColor = async (color: string, index: number) => {
    await copyToClipboard(color, `Color ${index + 1}`);
    setCopiedField(`color-${index}`);
    setTimeout(() => setCopiedField(null), 2000);
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
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Pastel Color Palette Generator
          </h1>
          <p className="text-muted-foreground">
            Automatically generate soft, soothing pastel color palettes. Ideal
            for gentle UI designs, children's apps, and lifestyle branding.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  max={8}
                  step={1}
                  onValueChange={([v]) => setPaletteSize(v)}
                />
              </div>

              {/* Harmony */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Color Harmony</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["random", "analogous", "complementary", "triadic"].map(
                    (h) => (
                      <Button
                        key={h}
                        variant={harmony === h ? "default" : "outline"}
                        size="sm"
                        onClick={() => setHarmony(h)}
                        className="text-xs"
                      >
                        {h.charAt(0).toUpperCase() + h.slice(1)}
                      </Button>
                    ),
                  )}
                </div>
              </div>

              {/* Softness */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Softness</Label>
                  <span className="text-sm font-mono text-muted-foreground">
                    {softness}%
                  </span>
                </div>
                <Slider
                  value={[softness]}
                  min={0}
                  max={100}
                  step={10}
                  onValueChange={([v]) => setSoftness(v)}
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
              <Button onClick={generatePalette} className="flex-1 sm:flex-none">
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate Palette
              </Button>
              <Button
                onClick={() => downloadPalette(colors, exportFormat)}
                variant="secondary"
                disabled={colors.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        {colors.length > 0 ? (
          <Card>
            <CardContent className="p-6">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Generated Pastel Palette
              </Label>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4">
                {colors.map((color, index) => {
                  const contrastColor = getContrastColor(color.hex);
                  return (
                    <div key={index} className="group">
                      <div
                        className="w-full aspect-square rounded-lg border border-border shadow-sm transition-all group-hover:scale-105  relative overflow-hidden"
                        style={{ backgroundColor: color.hex }}
                      >
                        {/* Color Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/30 to-transparent">
                          <div className="flex flex-col items-center gap-1">
                            <code
                              className="text-xs font-mono font-medium"
                              style={{ color: contrastColor }}
                            >
                              {color.hex}
                            </code>
                            <button
                              onClick={() => copyColor(color.hex, index)}
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
                    </div>
                  );
                })}
              </div>

              {/* Preview Section */}
              <div className="mt-8 pt-6 border-t border-border">
                <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                  Preview
                </Label>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Card Preview */}
                  <div className="rounded-lg border border-border overflow-hidden">
                    <div
                      className="p-6"
                      style={{ backgroundColor: colors[0]?.hex }}
                    >
                      <p
                        className="text-sm font-medium mb-2"
                        style={{
                          color: getContrastColor(colors[0]?.hex || "#fff"),
                        }}
                      >
                        Card Title
                      </p>
                      <p
                        className="text-sm opacity-80"
                        style={{
                          color: getContrastColor(colors[0]?.hex || "#fff"),
                        }}
                      >
                        This is a preview of how your pastel colors might look
                        in a design.
                      </p>
                    </div>
                    <div className="p-4 bg-background space-y-3">
                      <div className="flex gap-2">
                        {colors.slice(0, 4).map((color, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full border border-border"
                            style={{ backgroundColor: color.hex }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Badge Preview */}
                  <div className="rounded-lg border border-border p-6 bg-background">
                    <p className="text-sm font-medium text-muted-foreground mb-4">
                      Badge Examples
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: color.hex,
                            color: getContrastColor(color.hex),
                          }}
                        >
                          Badge {i + 1}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

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
                      const json = JSON.stringify(colors, null, 2);
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
                      const css = colors
                        .map((c, i) => `--pastel-${i + 1}: ${c.hex};`)
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
                      const scss = colors
                        .map((c, i) => `$pastel-${i + 1}: ${c.hex};`)
                        .join("\n");
                      copyToClipboard(scss, "SCSS Variables");
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy SCSS
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Empty State */
          <Card>
            <CardContent className="p-12 text-center">
              <div className="max-w-sm mx-auto space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                  <RefreshCw className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No pastel palette yet</h3>
                <p className="text-muted-foreground">
                  Click "Generate Palette" to create soft, dreamy pastel colors
                </p>
                <Button onClick={generatePalette} className="mt-4">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate Palette
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
