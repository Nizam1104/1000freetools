"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, Shield, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { hexToRgb, rgbToHex } from "@/app/color-tools/lib/color-utils";

// Web-safe colors are colors that use only these hex values: 00, 33, 66, 99, CC, FF
const webSafeValues = [0, 51, 85, 102, 153, 170, 204, 221, 255];
const webSafeHexValues = ["00", "33", "66", "99", "CC", "FF"];

function isWebSafe(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  return (
    webSafeValues.includes(rgb.r) &&
    webSafeValues.includes(rgb.g) &&
    webSafeValues.includes(rgb.b)
  );
}

function getNearestWebSafe(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#000000";

  const findNearest = (value: number) => {
    return webSafeValues.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
  };

  const r = findNearest(rgb.r);
  const g = findNearest(rgb.g);
  const b = findNearest(rgb.b);

  return rgbToHex(r, g, b);
}

function generateWebSafePalette(): string[] {
  const colors: string[] = [];
  for (const r of webSafeHexValues) {
    for (const g of webSafeHexValues) {
      for (const b of webSafeHexValues) {
        colors.push(`#${r}${g}${b}`);
      }
    }
  }
  return colors;
}

export default function WebSafeColorPickerPage() {
  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const [hexInput, setHexInput] = useState("3B82F6");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showOnlyWebSafe, setShowOnlyWebSafe] = useState(false);

  const webSafePalette = useMemo(() => generateWebSafePalette(), []);

  const filteredPalette = useMemo(() => {
    if (showOnlyWebSafe) {
      return webSafePalette;
    }
    return webSafePalette;
  }, [webSafePalette, showOnlyWebSafe]);

  const nearestWebSafe = getNearestWebSafe(selectedColor);
  const colorIsWebSafe = isWebSafe(selectedColor);

  const rgb = hexToRgb(selectedColor);
  const nearestRgb = hexToRgb(nearestWebSafe);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(`${field} copied!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0"
      onClick={() => copyToClipboard(text, field)}
    >
      {copiedField === field ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setHexInput(color.replace("#", ""));
  };

  const handleHexInput = (value: string) => {
    setHexInput(value);
    const hex = value.startsWith("#") ? value : "#" + value;
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      setSelectedColor(hex.toUpperCase());
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Web Safe Color Picker</h1>
          <p className="text-muted-foreground">
            Pick from the 216 web-safe colors guaranteed to display consistently across all browsers and devices. Ideal for legacy support and cross-platform compatibility.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Color Picker */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Color</CardTitle>
                <CardDescription>Choose a web-safe color</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>HEX Value</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">#</span>
                      <Input
                        value={hexInput.replace("#", "")}
                        onChange={(e) => handleHexInput(e.target.value)}
                        className="pl-7 font-mono uppercase"
                        maxLength={6}
                        placeholder="000000"
                      />
                    </div>
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => handleColorSelect(e.target.value)}
                      className="h-10 w-16 rounded-md border cursor-pointer"
                    />
                  </div>
                </div>

                {/* Color Preview */}
                <div
                  className="h-32 rounded-lg border flex items-center justify-center"
                  style={{ backgroundColor: selectedColor }}
                >
                  <span
                    className="text-lg font-medium"
                    style={{
                      color:
                        rgb && rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 > 150
                          ? "#000"
                          : "#fff",
                    }}
                  >
                    Preview
                  </span>
                </div>

                {/* Web Safe Status */}
                <div
                  className={`p-4 rounded-lg border flex items-center gap-3 ${
                    colorIsWebSafe
                      ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                      : "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800"
                  }`}
                >
                  {colorIsWebSafe ? (
                    <Shield className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  )}
                  <div>
                    <p
                      className={`font-medium ${
                        colorIsWebSafe ? "text-green-800" : "text-yellow-800"
                      }`}
                    >
                      {colorIsWebSafe ? "Web Safe Color" : "Not Web Safe"}
                    </p>
                    {!colorIsWebSafe && (
                      <p className="text-sm text-yellow-700">
                        Nearest: {nearestWebSafe}
                      </p>
                    )}
                  </div>
                </div>

                {/* Color Values */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded border">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: selectedColor }}
                      />
                      <span className="text-sm font-mono">{selectedColor}</span>
                    </div>
                    <CopyButton text={selectedColor} field="HEX" />
                  </div>
                  {rgb && (
                    <div className="flex items-center justify-between p-2 rounded border">
                      <span className="text-sm font-mono">
                        rgb({rgb.r}, {rgb.g}, {rgb.b})
                      </span>
                      <CopyButton
                        text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                        field="RGB"
                      />
                    </div>
                  )}
                </div>

                {/* Nearest Web Safe */}
                {!colorIsWebSafe && nearestRgb && (
                  <div className="space-y-2 pt-2 border-t">
                    <Label className="text-sm">Nearest Web Safe Color</Label>
                    <div
                      className="h-16 rounded-lg border flex items-center justify-center"
                      style={{ backgroundColor: nearestWebSafe }}
                    >
                      <span
                        className="text-sm font-medium"
                        style={{
                          color:
                            nearestRgb.r * 0.299 +
                              nearestRgb.g * 0.587 +
                              nearestRgb.b * 0.114 >
                            150
                              ? "#000"
                              : "#fff",
                        }}
                      >
                        {nearestWebSafe}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleColorSelect(nearestWebSafe)}
                    >
                      Use This Color Instead
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Color Grid */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Web Safe Color Palette</CardTitle>
                    <CardDescription>
                      216 colors that display consistently across devices
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="web-safe-only"
                      checked={showOnlyWebSafe}
                      onChange={(e) => setShowOnlyWebSafe(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="web-safe-only" className="text-sm cursor-pointer">
                      Show web-safe only
                    </Label>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 sm:grid-cols-9 lg:grid-cols-12 gap-1">
                  {filteredPalette.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={`aspect-square rounded-md border transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>About Web Safe Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Web safe colors are a set of 216 colors that were designed to display
                  consistently across different computers, browsers, and operating systems.
                </p>
                <p>
                  These colors use only the hex values{" "}
                  <code className="bg-muted px-1 rounded">00</code>,{" "}
                  <code className="bg-muted px-1 rounded">33</code>,{" "}
                  <code className="bg-muted px-1 rounded">66</code>,{" "}
                  <code className="bg-muted px-1 rounded">99</code>,{" "}
                  <code className="bg-muted px-1 rounded">CC</code>, and{" "}
                  <code className="bg-muted px-1 rounded">FF</code> for each RGB channel.
                </p>
                <p>
                  While modern displays can show millions of colors, using web safe colors
                  can still be beneficial for ensuring maximum compatibility and consistent
                  appearance across all devices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
