"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

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

const rgbToHex = (r: number, g: number, b: number) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, "0")}`;
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

const hslToRgb = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4)),
  };
};

const generateColorScale = (
  baseColor: string,
  steps: number,
  scaleType: "lightness" | "saturation" | "hue" | "diverging",
): string[] => {
  const rgb = hexToRgb(baseColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors: string[] = [];

  if (scaleType === "diverging") {
    // Create a diverging scale from dark to light through the base color
    const midPoint = Math.floor(steps / 2);
    for (let i = 0; i < steps; i++) {
      let newLightness: number;
      if (i < midPoint) {
        // Darker than base
        const ratio = i / midPoint;
        newLightness = hsl.l * ratio;
      } else if (i === midPoint) {
        newLightness = hsl.l;
      } else {
        // Lighter than base
        const ratio = (i - midPoint) / (steps - midPoint - 1);
        newLightness = hsl.l + (100 - hsl.l) * ratio;
      }
      const newRgb = hslToRgb(
        hsl.h,
        hsl.s,
        Math.max(5, Math.min(95, newLightness)),
      );
      colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
  } else {
    for (let i = 0; i < steps; i++) {
      const ratio = steps === 1 ? 0.5 : i / (steps - 1);
      let newH = hsl.h;
      let newS = hsl.s;
      let newL = hsl.l;

      switch (scaleType) {
        case "lightness":
          newL = 10 + (90 - 10) * ratio;
          break;
        case "saturation":
          newS = 10 + (100 - 10) * ratio;
          break;
        case "hue":
          newH = (hsl.h + 360 * ratio) % 360;
          break;
      }

      const newRgb = hslToRgb(newH, newS, newL);
      colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
  }

  return colors;
};

export default function ColorScaleGeneratorPage() {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [steps, setSteps] = useState(5);
  const [scaleType, setScaleType] = useState<
    "lightness" | "saturation" | "hue" | "diverging"
  >("lightness");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const colorScale = generateColorScale(baseColor, steps, scaleType);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success("Color copied to clipboard!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const copyAllColors = async () => {
    const allColors = colorScale.join(", ");
    try {
      await navigator.clipboard.writeText(allColors);
      toast.success("All colors copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const copyAsCSS = async () => {
    const cssVariables = colorScale
      .map((color, i) => `--scale-${i + 1}: ${color};`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(cssVariables);
      toast.success("CSS variables copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const copyAsTailwind = async () => {
    const tailwindConfig = colorScale
      .map((color, i) => `'${i + 1}00': '${color}'`)
      .join(",\n      ");
    const config = `colors: {\n  custom: {\n    ${tailwindConfig}\n  }\n}`;
    try {
      await navigator.clipboard.writeText(config);
      toast.success("Tailwind config copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Color Scale Generator
          </h1>
          <p className="text-muted-foreground">
            Generate stepped color scales between two colors for charts, maps,
            and UI usage. Export scales for use in data visualization libraries
            and design systems.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-6 space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Base Color */}
              <div className="space-y-2">
                <Label>Base Color</Label>
                <div className="flex gap-2">
                  <div className="relative w-12 h-10 rounded border overflow-hidden ">
                    <input
                      type="color"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer border-0 p-0"
                    />
                  </div>
                  <Input
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="font-mono flex-1"
                    maxLength={7}
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Steps</Label>
                  <span className="text-sm font-mono text-muted-foreground">
                    {steps}
                  </span>
                </div>
                <Slider
                  value={[steps]}
                  min={3}
                  max={15}
                  step={1}
                  onValueChange={([v]) => setSteps(v)}
                />
              </div>

              {/* Scale Type */}
              <div className="space-y-2">
                <Label>Scale Type</Label>
                <Select
                  value={scaleType}
                  onValueChange={(v) => setScaleType(v as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lightness">Lightness</SelectItem>
                    <SelectItem value="saturation">Saturation</SelectItem>
                    <SelectItem value="hue">Hue</SelectItem>
                    <SelectItem value="diverging">Diverging</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Base Color Info */}
              <div className="space-y-2">
                <Label>Base Color Info</Label>
                <div className="p-3 rounded-lg border bg-muted/50">
                  <p className="text-sm font-mono">{baseColor.toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {(() => {
                      const rgb = hexToRgb(baseColor);
                      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                      return `H: ${hsl.h}° S: ${hsl.s}% L: ${hsl.l}%`;
                    })()}
                  </p>
                </div>
              </div>
            </div>

            {/* Preview Bar */}
            <div className="space-y-2">
              <Label>Scale Preview</Label>
              <div className="flex h-16 rounded-lg border overflow-hidden">
                {colorScale.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1 h-full "
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generated Scale */}
        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label>Generated Color Scale</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyAllColors}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All
                </Button>
                <Button variant="outline" size="sm" onClick={copyAsCSS}>
                  <Copy className="h-4 w-4 mr-2" />
                  CSS Variables
                </Button>
                <Button variant="outline" size="sm" onClick={copyAsTailwind}>
                  <Copy className="h-4 w-4 mr-2" />
                  Tailwind
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-15 gap-3">
              {colorScale.map((color, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className="aspect-square rounded-lg border  cursor-pointer transition-transform hover:scale-105"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color, index)}
                  >
                    <div className="w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      {copiedIndex === index ? (
                        <Check className="h-6 w-6 text-white drop-shadow-lg" />
                      ) : (
                        <Copy className="h-6 w-6 text-white drop-shadow-lg" />
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-mono text-muted-foreground">
                      {color.toUpperCase()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(index + 1) * 100}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scale Details */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <Label>Scale Details</Label>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">
                      Step
                    </th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">
                      Preview
                    </th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">
                      HEX
                    </th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">
                      RGB
                    </th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">
                      HSL
                    </th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">
                      Usage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {colorScale.map((color, index) => {
                    const rgb = hexToRgb(color);
                    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                    const usage =
                      scaleType === "diverging"
                        ? index < steps / 2
                          ? "Negative/Low"
                          : index === Math.floor(steps / 2)
                            ? "Neutral"
                            : "Positive/High"
                        : scaleType === "lightness"
                          ? index < steps / 2
                            ? "Background"
                            : index === Math.floor(steps / 2)
                              ? "Border"
                              : "Text/Accent"
                          : "Variable";
                    return (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-2 px-3">{(index + 1) * 100}</td>
                        <td className="py-2 px-3">
                          <div
                            className="w-8 h-8 rounded border "
                            style={{ backgroundColor: color }}
                          />
                        </td>
                        <td className="py-2 px-3 font-mono">
                          {color.toUpperCase()}
                        </td>
                        <td className="py-2 px-3 font-mono">
                          rgb({rgb.r}, {rgb.g}, {rgb.b})
                        </td>
                        <td className="py-2 px-3 font-mono">
                          hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                        </td>
                        <td className="py-2 px-3 text-muted-foreground">
                          {usage}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
