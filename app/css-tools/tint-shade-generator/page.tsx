"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Copy, Shuffle } from "lucide-react";
import { hexToHsl, hslToHex, generateTints, generateShades, generateTones } from "@/app/color-tools/lib/color-utils";

export default function TintShadeGeneratorPage() {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [steps, setSteps] = useState(5);
  const [activeTab, setActiveTab] = useState<"tints" | "shades" | "tones">("tints");

  const generateVariations = useCallback(() => {
    switch (activeTab) {
      case "tints":
        return generateTints(baseColor, steps);
      case "shades":
        return generateShades(baseColor, steps);
      case "tones":
        return generateTones(baseColor, steps);
    }
  }, [baseColor, steps, activeTab]);

  const variations = generateVariations();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const randomizeColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    setBaseColor(randomColor);
  };

  const getContrastColor = (hex: string) => {
    const hsl = hexToHsl(hex);
    if (!hsl) return "#000000";
    return hsl.l > 50 ? "#000000" : "#ffffff";
  };

  const generateScale = () => {
    const hsl = hexToHsl(baseColor);
    if (!hsl) return [];
    
    const scale = [];
    for (let i = 100; i >= 0; i -= 10) {
      scale.push(hslToHex(hsl.h, hsl.s, i));
    }
    return scale;
  };

  const fullScale = generateScale();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Tint, Shade & Tone Generator</h1>
        <p className="text-muted-foreground">
          Generate color variations by adjusting lightness (tints & shades) or saturation (tones).
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Base Color</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Choose Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="font-mono"
                    placeholder="#000000"
                  />
                  <Button variant="outline" size="icon" onClick={randomizeColor}>
                    <Shuffle className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Number of Steps: {steps}</Label>
                <Slider
                  value={[steps]}
                  onValueChange={([v]) => setSteps(v)}
                  min={3}
                  max={10}
                  step={1}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Variation Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="tints">Tints</TabsTrigger>
                  <TabsTrigger value="shades">Shades</TabsTrigger>
                  <TabsTrigger value="tones">Tones</TabsTrigger>
                </TabsList>
                <TabsContent value="tints" className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Tints</strong> are created by adding white to the base color, making it lighter.
                  </p>
                </TabsContent>
                <TabsContent value="shades" className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Shades</strong> are created by adding black to the base color, making it darker.
                  </p>
                </TabsContent>
                <TabsContent value="tones" className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Tones</strong> are created by adding gray to the base color, reducing saturation.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  const css = `:root {
  --base-color: ${baseColor};
  ${variations.map((v, i) => `--${activeTab}-${i + 1}: ${v};`).join("\n  ")}
}`;
                  copyToClipboard(css, "CSS");
                }}
              >
                Copy CSS Variables
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => copyToClipboard(JSON.stringify([baseColor, ...variations], null, 2), "JSON")}
              >
                Copy JSON
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="capitalize">{activeTab} of {baseColor}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex rounded-lg overflow-hidden h-24 mb-6">
                <div
                  className="flex-1 flex flex-col items-center justify-end pb-3"
                  style={{ backgroundColor: baseColor }}
                >
                  <span className="text-xs font-mono" style={{ color: getContrastColor(baseColor) }}>
                    Base
                  </span>
                </div>
                {variations.map((color, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center justify-end pb-3 group relative"
                    style={{ backgroundColor: color }}
                  >
                    <span
                      className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: getContrastColor(color) }}
                    >
                      {color}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <Card>
                  <CardContent className="pt-4">
                    <div
                      className="w-full h-20 rounded mb-3"
                      style={{ backgroundColor: baseColor }}
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Base</p>
                        <code className="text-sm font-mono">{baseColor}</code>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => copyToClipboard(baseColor, "Color")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {variations.map((color, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div
                        className="w-full h-20 rounded mb-3"
                        style={{ backgroundColor: color }}
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {activeTab} {index + 1}
                          </p>
                          <code className="text-sm font-mono">{color}</code>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => copyToClipboard(color, "Color")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Full Lightness Scale (0-100%)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex rounded-lg overflow-hidden h-16">
                {fullScale.map((color, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center justify-end pb-2 group relative"
                    style={{ backgroundColor: color }}
                    title={`${100 - index * 10}% lightness`}
                  >
                    <span
                      className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: getContrastColor(color) }}
                    >
                      {color}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>0% L</span>
                <span>50% L</span>
                <span>100% L</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CSS Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <code className="flex-1 p-4 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
                  {`:root {
  --base-color: ${baseColor};
  ${variations.map((v, i) => `--${activeTab}-${i + 1}: ${v};`).join("\n  ")}
}`}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const css = `:root {
  --base-color: ${baseColor};
  ${variations.map((v, i) => `--${activeTab}-${i + 1}: ${v};`).join("\n  ")}
}`;
                    copyToClipboard(css, "CSS");
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Tints, Shades, and Tones</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tints</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Created by adding white to a base color. Tints make colors lighter and are perfect for creating 
                subtle backgrounds, hover states, and highlighting elements without overwhelming the design.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Shades</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Created by adding black to a base color. Shades make colors darker and are useful for text colors, 
                borders, shadows, and creating depth in your designs.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tones</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Created by adding gray (reducing saturation) to a base color. Tones create muted, sophisticated 
                colors that work well for professional designs and reducing visual fatigue.
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
