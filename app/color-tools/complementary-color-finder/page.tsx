"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, Copy, RotateCcw, Palette } from "lucide-react";
import { toast } from "sonner";

export const relatedTools = [
  { name: "Color Wheel", href: "/color-tools/color-wheel", description: "Visualize color relationships" },
  { name: "Shade Tint Tone Generator", href: "/color-tools/shade-tint-tone-generator", description: "Create full color ranges" },
  { name: "Warm or Cool Color Detector", href: "/color-tools/warm-or-cool-color-detector", description: "Analyze color temperature" },
  { name: "Palette Export Tool", href: "/color-tools/palette-export-tool", description: "Export colors in multiple formats" },
];
import {
  hexToRgb,
  rgbToHsl,
  hslToRgb,
  getComplementaryColor,
  getAnalogousColors,
  getTriadicColors,
  getSplitComplementaryColors,
} from "@/app/color-tools/lib/color-utils";
import ComplementaryColorFinderSEO from "@/components/seo-content/color-tools/ComplementaryColorFinder";

export default function ComplementaryColorFinderPage() {
  const [baseColor, setBaseColor] = useState("#3B82F6");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const complementaryColor = getComplementaryColor(baseColor) || baseColor;
  const analogousColors = getAnalogousColors(baseColor, 2);
  const triadicColors = getTriadicColors(baseColor);
  const splitComplementaryColors = getSplitComplementaryColors(baseColor);

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
    showCopy = true,
  }: {
    colorHex: string;
    label?: string;
    showCopy?: boolean;
  }) => {
    const rgb = hexToRgb(colorHex);
    const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

    return (
      <div className="space-y-2">
        <div
          className="w-full aspect-video rounded-lg border shadow-sm"
          style={{ backgroundColor: colorHex }}
        />
        <div className="space-y-1">
          {label && <p className="text-xs text-muted-foreground font-medium">{label}</p>}
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm">{colorHex}</span>
            {showCopy && <CopyButton text={colorHex} field={colorHex} />}
          </div>
          {rgb && hsl && (
            <p className="text-xs text-muted-foreground">
              RGB({rgb.r}, {rgb.g}, {rgb.b}) • HSL({hsl.h}°, {hsl.s}%, {hsl.l}%)
            </p>
          )}
        </div>
      </div>
    );
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Complementary Color Finder</h1>
          <p className="text-muted-foreground">
            Find the complementary color of any given color instantly. Use complementary pairs to create high-contrast, visually dynamic designs.
          </p>
        </div>

        {/* Base Color Input */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Base Color</CardTitle>
            <CardDescription>
              Enter or select a color to find its complement
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
                className="w-24 h-24 rounded-lg border shadow-md"
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Main Complementary Color */}
          <Card>
            <CardHeader>
              <CardTitle>Complementary Color</CardTitle>
              <CardDescription>
                The color opposite on the color wheel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <ColorSwatch colorHex={baseColor} label="Base Color" showCopy={false} />
                <ColorSwatch colorHex={complementaryColor} label="Complementary" />
              </div>

              {/* Side by Side Preview */}
              <div className="mt-4">
                <Label className="text-sm font-medium mb-2 block">Preview</Label>
                <div className="flex h-20 rounded-lg overflow-hidden border">
                  <div
                    className="flex-1 flex items-center justify-center"
                    style={{ backgroundColor: baseColor }}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: (() => {
                          const rgb = hexToRgb(baseColor);
                          if (!rgb) return "#000000";
                          const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
                          return luminance > 0.179 ? "#000000" : "#FFFFFF";
                        })()
                      }}
                    >
                      Base
                    </span>
                  </div>
                  <div
                    className="flex-1 flex items-center justify-center"
                    style={{ backgroundColor: complementaryColor }}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: (() => {
                          const rgb = hexToRgb(complementaryColor);
                          if (!rgb) return "#000000";
                          const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
                          return luminance > 0.179 ? "#000000" : "#FFFFFF";
                        })()
                      }}
                    >
                      Complement
                    </span>
                  </div>
                </div>
              </div>

              {/* Usage Tips */}
              <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <p className="text-sm font-medium">When to Use Complementary Colors</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Create high contrast and visual interest</li>
                  <li>Draw attention to important elements</li>
                  <li>Create dynamic and vibrant designs</li>
                  <li>Use in small doses to avoid overwhelming</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Related Color Schemes */}
          <div className="space-y-6">
            {/* Analogous Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Analogous Colors</CardTitle>
                <CardDescription>
                  Colors adjacent to the base color
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {analogousColors.map((c, i) => (
                    <ColorSwatch key={c} colorHex={c} label={i === 0 ? "Base" : i === 1 ? "+30°" : "-30°"} />
                  ))}
                </div>
                <div className="flex h-8 rounded-md overflow-hidden mt-3 border">
                  {analogousColors.map((c) => (
                    <div key={c} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Triadic Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Triadic Colors</CardTitle>
                <CardDescription>
                  Three colors evenly spaced (120° apart)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {triadicColors.map((c, i) => (
                    <ColorSwatch key={c} colorHex={c} label={i === 0 ? "Base" : i === 1 ? "+120°" : "+240°"} />
                  ))}
                </div>
                <div className="flex h-8 rounded-md overflow-hidden mt-3 border">
                  {triadicColors.map((c) => (
                    <div key={c} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Split Complementary */}
            <Card>
              <CardHeader>
                <CardTitle>Split Complementary</CardTitle>
                <CardDescription>
                  Base color plus two colors adjacent to complement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {splitComplementaryColors.map((c, i) => (
                    <ColorSwatch key={c} colorHex={c} label={i === 0 ? "Base" : i === 1 ? "+150°" : "+210°"} />
                  ))}
                </div>
                <div className="flex h-8 rounded-md overflow-hidden mt-3 border">
                  {splitComplementaryColors.map((c) => (
                    <div key={c} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </div>
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
                Explore more tools to work with complementary colors and palettes
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
        <ComplementaryColorFinderSEO />
      </div>
    </div>
  );
}
