"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, RotateCcw, Download, Palette } from "lucide-react";
import { toast } from "sonner";
import {
  hexToRgb,
  rgbToHsl,
  hslToHex,
  generateShades,
  generateTints,
  generateTones,
} from "@/app/color-tools/lib/color-utils";

export default function ShadeTintToneGeneratorPage() {
  const [baseColor, setBaseColor] = useState("#3B82F6");
  const [count, setCount] = useState(5);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("shades");

  const shades = generateShades(baseColor, count);
  const tints = generateTints(baseColor, count);
  const tones = generateTones(baseColor, count);

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

  const ColorSwatch = ({
    colorHex,
    label,
    showValue = true,
  }: {
    colorHex: string;
    label?: string;
    showValue?: boolean;
  }) => {
    const rgb = hexToRgb(colorHex);
    const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

    return (
      <div className="space-y-2">
        <div
          className="w-full aspect-square rounded-lg border shadow-sm"
          style={{ backgroundColor: colorHex }}
        />
        {showValue && (
          <div className="space-y-1">
            {label && <p className="text-xs text-muted-foreground font-medium">{label}</p>}
            <div className="flex items-center justify-between gap-1">
              <span className="font-mono text-xs">{colorHex}</span>
              <CopyButton text={colorHex} field={colorHex} />
            </div>
            {rgb && hsl && (
              <p className="text-xs text-muted-foreground truncate">
                L:{hsl.l}%
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  const exportPalette = (type: string) => {
    const colors = type === "shades" ? shades : type === "tints" ? tints : tones;
    const content = colors.map((c, i) => `${type}-${i + 1}: ${c};`).join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-palette.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${type} palette!`);
  };

  const handleRandomColor = () => {
    const randomHex = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0").toUpperCase();
    setBaseColor(randomHex);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Shade, Tint & Tone Generator</h1>
          <p className="text-muted-foreground">
            Generate shades, tints, and tones of any color. Build a full color range from dark to light for use in design systems, UI components, and brand guides.
          </p>
        </div>

        {/* Base Color Input */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Base Color</CardTitle>
            <CardDescription>
              Select a color to generate variations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px] space-y-2">
                <Label>HEX Value</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">#</span>
                    <Input
                      value={baseColor.replace("#", "")}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
                        setBaseColor("#" + value);
                      }}
                      className="pl-7 font-mono"
                      placeholder="3B82F6"
                    />
                  </div>
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="h-10 w-16 rounded-md border cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-[200px] space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Number of Variations</Label>
                  <span className="text-sm font-mono">{count}</span>
                </div>
                <Slider
                  value={[count]}
                  min={3}
                  max={10}
                  step={1}
                  onValueChange={([v]) => setCount(v)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleRandomColor} variant="outline">
                  <Palette className="h-4 w-4 mr-2" />
                  Random
                </Button>
                <Button
                  onClick={() => setBaseColor("#3B82F6")}
                  variant="outline"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Base Color Preview */}
            <div className="mt-4 flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-lg border shadow-md"
                style={{ backgroundColor: baseColor }}
              />
              <div className="flex-1">
                <p className="font-mono text-lg font-medium">{baseColor}</p>
                {(() => {
                  const rgb = hexToRgb(baseColor);
                  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
                  return (
                    <p className="text-muted-foreground text-sm">
                      RGB({rgb?.r}, {rgb?.g}, {rgb?.b}) • HSL({hsl?.h}°, {hsl?.s}%, {hsl?.l}%)
                    </p>
                  );
                })()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "#1a1a2e" }} />
                  <h3 className="font-semibold">Shades</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Created by adding black to the base color, making it darker.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "#e0e7ff" }} />
                  <h3 className="font-semibold">Tints</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Created by adding white to the base color, making it lighter.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "#6b7280" }} />
                  <h3 className="font-semibold">Tones</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Created by adding gray to the base color, reducing saturation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Variations Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="shades">Shades (Darker)</TabsTrigger>
              <TabsTrigger value="tints">Tints (Lighter)</TabsTrigger>
              <TabsTrigger value="tones">Tones (Desaturated)</TabsTrigger>
            </TabsList>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportPalette(activeTab)}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <TabsContent value="shades" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Shades</CardTitle>
                <CardDescription>
                  Darker versions of {baseColor} by reducing lightness
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Preview Strip */}
                <div className="flex h-16 rounded-lg overflow-hidden border mb-6">
                  {shades.map((c) => (
                    <div key={c} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </div>

                {/* Color Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {shades.map((color, i) => (
                    <ColorSwatch
                      key={color}
                      colorHex={color}
                      label={`Shade ${i + 1}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tints" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Tints</CardTitle>
                <CardDescription>
                  Lighter versions of {baseColor} by increasing lightness
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Preview Strip */}
                <div className="flex h-16 rounded-lg overflow-hidden border mb-6">
                  {tints.map((c) => (
                    <div key={c} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </div>

                {/* Color Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {tints.map((color, i) => (
                    <ColorSwatch
                      key={color}
                      colorHex={color}
                      label={`Tint ${i + 1}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tones" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Tones</CardTitle>
                <CardDescription>
                  Desaturated versions of {baseColor} by reducing saturation
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Preview Strip */}
                <div className="flex h-16 rounded-lg overflow-hidden border mb-6">
                  {tones.map((c) => (
                    <div key={c} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </div>

                {/* Color Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {tones.map((color, i) => (
                    <ColorSwatch
                      key={color}
                      colorHex={color}
                      label={`Tone ${i + 1}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* All Variations Combined */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>All Variations Combined</CardTitle>
            <CardDescription>
              Complete palette with shades, tints, and tones
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Full Preview */}
            <div className="flex h-20 rounded-lg overflow-hidden border mb-6">
              {(() => {
                const allColors = [...shades].reverse().concat([baseColor]).concat(tints);
                return allColors.map((c) => (
                  <div key={c} className="flex-1" style={{ backgroundColor: c }} />
                ));
              })()}
            </div>

            {/* Export All */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  const allColors = [...shades].reverse().concat([baseColor]).concat(tints);
                  const content = allColors.map((c, i) => `color-${i + 1}: ${c};`).join("\n");
                  const blob = new Blob([content], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "full-palette.txt";
                  a.click();
                  URL.revokeObjectURL(url);
                  toast.success("Exported full palette!");
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Full Palette
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
