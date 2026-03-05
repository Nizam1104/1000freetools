"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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

const generateGradientSteps = (
  startColor: string,
  endColor: string,
  steps: number,
): string[] => {
  const start = hexToRgb(startColor);
  const end = hexToRgb(endColor);

  const colors: string[] = [];
  for (let i = 0; i < steps; i++) {
    const ratio = steps === 1 ? 0.5 : i / (steps - 1);
    const r = Math.round(start.r + (end.r - start.r) * ratio);
    const g = Math.round(start.g + (end.g - start.g) * ratio);
    const b = Math.round(start.b + (end.b - start.b) * ratio);
    colors.push(rgbToHex(r, g, b));
  }
  return colors;
};

export default function GradientStepGeneratorPage() {
  const [startColor, setStartColor] = useState("#6366f1");
  const [endColor, setEndColor] = useState("#ec4899");
  const [steps, setSteps] = useState(5);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const gradientSteps = generateGradientSteps(startColor, endColor, steps);

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
    const allColors = gradientSteps.join(", ");
    try {
      await navigator.clipboard.writeText(allColors);
      toast.success("All colors copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const copyAsCSS = async () => {
    const cssVariables = gradientSteps
      .map((color, i) => `--color-${i + 1}: ${color};`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(cssVariables);
      toast.success("CSS variables copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const copyAsArray = async () => {
    const array = `[${gradientSteps.map((c) => `"${c}"`).join(", ")}]`;
    try {
      await navigator.clipboard.writeText(array);
      toast.success("Array copied to clipboard!");
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
            Gradient Step Generator
          </h1>
          <p className="text-muted-foreground">
            Generate evenly spaced color steps between two colors. Ideal for
            building smooth transitions, data visualizations, and gradient-based
            design tokens.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-6 space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Start Color */}
              <div className="space-y-2">
                <Label>Start Color</Label>
                <div className="flex gap-2">
                  <div className="relative w-12 h-10 rounded border overflow-hidden ">
                    <input
                      type="color"
                      value={startColor}
                      onChange={(e) => setStartColor(e.target.value)}
                      className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer border-0 p-0"
                    />
                  </div>
                  <Input
                    type="text"
                    value={startColor}
                    onChange={(e) => setStartColor(e.target.value)}
                    className="font-mono flex-1"
                    maxLength={7}
                  />
                </div>
              </div>

              {/* End Color */}
              <div className="space-y-2">
                <Label>End Color</Label>
                <div className="flex gap-2">
                  <div className="relative w-12 h-10 rounded border overflow-hidden ">
                    <input
                      type="color"
                      value={endColor}
                      onChange={(e) => setEndColor(e.target.value)}
                      className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer border-0 p-0"
                    />
                  </div>
                  <Input
                    type="text"
                    value={endColor}
                    onChange={(e) => setEndColor(e.target.value)}
                    className="font-mono flex-1"
                    maxLength={7}
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Number of Steps</Label>
                  <span className="text-sm font-mono text-muted-foreground">
                    {steps}
                  </span>
                </div>
                <Slider
                  value={[steps]}
                  min={2}
                  max={20}
                  step={1}
                  onValueChange={([v]) => setSteps(v)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>2</span>
                  <span>10</span>
                  <span>20</span>
                </div>
              </div>
            </div>

            {/* Preview Bar */}
            <div className="space-y-2">
              <Label>Gradient Preview</Label>
              <div
                className="w-full h-16 rounded-lg border"
                style={{
                  background: `linear-gradient(to right, ${startColor}, ${endColor})`,
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Generated Steps */}
        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label>Generated Color Steps</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyAllColors}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All
                </Button>
                <Button variant="outline" size="sm" onClick={copyAsCSS}>
                  <Copy className="h-4 w-4 mr-2" />
                  CSS Variables
                </Button>
                <Button variant="outline" size="sm" onClick={copyAsArray}>
                  <Copy className="h-4 w-4 mr-2" />
                  Array
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3">
              {gradientSteps.map((color, index) => (
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
                      Step {index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Color Details */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <Label>Color Details</Label>
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
                      Position
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gradientSteps.map((color, index) => {
                    const rgb = hexToRgb(color);
                    const position = Math.round((index / (steps - 1)) * 100);
                    return (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-2 px-3">{index + 1}</td>
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
                        <td className="py-2 px-3">{position}%</td>
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
