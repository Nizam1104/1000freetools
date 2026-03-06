"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Check, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const relatedTools = [
  { name: "Complementary Color Finder", href: "/color-tools/complementary-color-finder", description: "Find opposite colors instantly" },
  { name: "Shade Tint Tone Generator", href: "/color-tools/shade-tint-tone-generator", description: "Create full color ranges" },
  { name: "Color Picker", href: "/color-tools/color-picker", description: "Pick and convert colors" },
  { name: "Advanced Color Picker", href: "/color-tools/advanced-color-picker", description: "Advanced color selection tool" },
];
import {
  hslToHex,
  hslToRgb,
  hexToHsl,
  getComplementaryColor,
  getAnalogousColors,
  getTriadicColors,
  getSplitComplementaryColors,
  getTetradicColors,
} from "@/app/color-tools/lib/color-utils";
import ColorWheelSEO from "@/components/seo-content/color-tools/ColorWheel";

interface ColorHarmony {
  name: string;
  colors: string[];
  description: string;
}

export default function ColorWheelPage() {
  const [color, setColor] = useState({ h: 0, s: 100, l: 50 });
  const [selectedHarmony, setSelectedHarmony] = useState<string>("complementary");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const hex = hslToHex(color.h, color.s, color.l);
  const rgb = hslToRgb(color.h, color.s, color.l);

  // Generate color harmonies
  const harmonies: ColorHarmony[] = [
    {
      name: "complementary",
      colors: [hex, getComplementaryColor(hex) || hex],
      description: "Colors opposite each other on the wheel",
    },
    {
      name: "analogous",
      colors: getAnalogousColors(hex, 2),
      description: "Colors adjacent to each other",
    },
    {
      name: "triadic",
      colors: getTriadicColors(hex),
      description: "Three colors evenly spaced around the wheel",
    },
    {
      name: "split-complementary",
      colors: getSplitComplementaryColors(hex),
      description: "Base color plus two colors adjacent to its complement",
    },
    {
      name: "tetradic",
      colors: getTetradicColors(hex),
      description: "Four colors arranged in two complementary pairs",
    },
  ];

  const currentHarmony = harmonies.find((h) => h.name === selectedHarmony) || harmonies[0];

  const handleWheelClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    // Calculate hue from angle
    let hue = (Math.atan2(y, x) * 180 / Math.PI + 90);
    if (hue < 0) hue += 360;

    // Calculate saturation from distance from center
    const maxRadius = Math.min(centerX, centerY);
    const distance = Math.sqrt(x * x + y * y);
    const saturation = Math.min(100, Math.round((distance / maxRadius) * 100));

    setColor((prev) => ({ ...prev, h: Math.round(hue), s: saturation }));
  }, []);

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

  const ColorSwatch = ({ colorHex, label }: { colorHex: string; label?: string }) => {
    const textRgb = hslToRgb(50, 50, 50);
    const luminance = (0.2126 * (textRgb.r / 255) + 0.7152 * (textRgb.g / 255) + 0.0722 * (textRgb.b / 255));
    const textColor = luminance > 0.179 ? "#000000" : "#FFFFFF";

    return (
      <div className="space-y-2">
        <div
          className="w-full aspect-square rounded-lg border shadow-sm"
          style={{ backgroundColor: colorHex }}
        />
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="font-mono text-sm font-medium truncate">{colorHex}</p>
            {label && <p className="text-xs text-muted-foreground">{label}</p>}
          </div>
          <CopyButton text={colorHex} field={colorHex} />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Interactive Color Wheel</h1>
          <p className="text-muted-foreground">
            Explore an interactive color wheel to visualize relationships between colors. Understand hue, saturation, and how colors interact for better design decisions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Color Wheel */}
          <Card>
            <CardHeader>
              <CardTitle>Color Wheel</CardTitle>
              <CardDescription>
                Click or drag on the wheel to select a color
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Color Wheel Canvas */}
              <div className="flex justify-center">
                <div
                  ref={wheelRef}
                  className="relative w-64 h-64 rounded-full cursor-crosshair overflow-hidden"
                  style={{
                    background: `conic-gradient(
                      from 90deg,
                      red 0deg,
                      yellow 60deg,
                      lime 120deg,
                      cyan 180deg,
                      blue 240deg,
                      magenta 300deg,
                      red 360deg
                    )`,
                  }}
                  onClick={handleWheelClick}
                >
                  {/* Saturation overlay */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "radial-gradient(circle, white 0%, transparent 100%)",
                    }}
                  />
                  {/* Selected color indicator */}
                  <div
                    className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      left: `${50 + (color.s / 100) * 50 * Math.cos((color.h - 90) * Math.PI / 180)}%`,
                      top: `${50 + (color.s / 100) * 50 * Math.sin((color.h - 90) * Math.PI / 180)}%`,
                      backgroundColor: hex,
                    }}
                  />
                </div>
              </div>

              {/* Selected Color Preview */}
              <div
                className="w-full h-24 rounded-lg border shadow-sm"
                style={{ backgroundColor: hex }}
              />

              {/* Sliders */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Hue</Label>
                    <span className="text-sm font-mono">{color.h}°</span>
                  </div>
                  <div className="relative h-6 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                      }}
                    />
                    <Slider
                      value={[color.h]}
                      min={0}
                      max={360}
                      step={1}
                      onValueChange={([v]) => setColor({ ...color, h: v })}
                      className="absolute inset-0 [&>span:first-child]:bg-transparent [&_[role=slider]]:border-white [&_[role=slider]]:shadow-md"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Saturation</Label>
                    <span className="text-sm font-mono">{color.s}%</span>
                  </div>
                  <Slider
                    value={[color.s]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={([v]) => setColor({ ...color, s: v })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Lightness</Label>
                    <span className="text-sm font-mono">{color.l}%</span>
                  </div>
                  <Slider
                    value={[color.l]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={([v]) => setColor({ ...color, l: v })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Values & Harmonies */}
          <div className="space-y-6">
            {/* Color Values */}
            <Card>
              <CardHeader>
                <CardTitle>Color Values</CardTitle>
                <CardDescription>
                  Current color in different formats
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* HEX */}
                <div className="space-y-2">
                  <Label>HEX</Label>
                  <div className="flex gap-2">
                    <Input value={hex} readOnly className="font-mono flex-1" />
                    <CopyButton text={hex} field="HEX" />
                  </div>
                </div>

                {/* RGB */}
                <div className="space-y-2">
                  <Label>RGB</Label>
                  <div className="flex gap-2">
                    <Input
                      value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                      readOnly
                      className="font-mono flex-1"
                    />
                    <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} field="RGB" />
                  </div>
                </div>

                {/* HSL */}
                <div className="space-y-2">
                  <Label>HSL</Label>
                  <div className="flex gap-2">
                    <Input
                      value={`hsl(${color.h}, ${color.s}%, ${color.l}%)`}
                      readOnly
                      className="font-mono flex-1"
                    />
                    <CopyButton text={`hsl(${color.h}, ${color.s}%, ${color.l}%)`} field="HSL" />
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setColor({ h: 0, s: 100, l: 50 })}
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Red
                </Button>
              </CardContent>
            </Card>

            {/* Color Harmonies */}
            <Card>
              <CardHeader>
                <CardTitle>Color Harmonies</CardTitle>
                <CardDescription>
                  Generate color schemes based on color theory
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={selectedHarmony} onValueChange={setSelectedHarmony}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="complementary">Complementary</TabsTrigger>
                    <TabsTrigger value="analogous">Analogous</TabsTrigger>
                    <TabsTrigger value="triadic">Triadic</TabsTrigger>
                    <TabsTrigger value="split-complementary">Split</TabsTrigger>
                    <TabsTrigger value="tetradic">Tetradic</TabsTrigger>
                  </TabsList>

                  <div className="mt-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {currentHarmony.description}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {currentHarmony.colors.map((c, i) => (
                        <ColorSwatch key={c} colorHex={c} label={i === 0 ? "Base" : undefined} />
                      ))}
                    </div>

                    {/* Preview */}
                    <div className="mt-4 p-4 rounded-lg border bg-card">
                      <p className="text-sm font-medium mb-2">Preview</p>
                      <div className="flex h-12 rounded-md overflow-hidden">
                        {currentHarmony.colors.map((c) => (
                          <div
                            key={c}
                            className="flex-1"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Internal Linking Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Related Color Tools</CardTitle>
              <CardDescription>
                Explore more tools to work with color harmonies and palettes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedTools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="group p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tool.description}
                    </p>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content Section */}
        <ColorWheelSEO />
      </div>
    </div>
  );
}
