"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Copy, Check, Palette } from "lucide-react";
import { toast } from "sonner";
import { hexToRgb, getContrastRatio, getLuminance } from "@/app/color-tools/lib/color-utils";

interface ColorSwatch {
  id: string;
  color: string;
}

export const relatedTools = [
  { name: "Contrast Checker", href: "/color-tools/contrast-checker", description: "Check contrast ratios for accessibility" },
  { name: "Text Color Suggestion Tool", href: "/color-tools/text-color-suggestion-tool", description: "Get readable text color suggestions" },
  { name: "CSS Variables Generator", href: "/color-tools/css-variables-generator", description: "Generate CSS custom properties from colors" },
  { name: "Palette Export Tool", href: "/color-tools/palette-export", description: "Export palettes in multiple formats" },
];

export default function PaletteContrastViewerPage() {
  const [colors, setColors] = useState<ColorSwatch[]>([
    { id: "1", color: "#000000" },
    { id: "2", color: "#FFFFFF" },
  ]);
  const [newColor, setNewColor] = useState("#3B82F6");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const addColor = useCallback(() => {
    if (!newColor.startsWith("#")) {
      setNewColor("#" + newColor);
    }
    const colorToAdd = newColor.startsWith("#") ? newColor : "#" + newColor;
    const rgb = hexToRgb(colorToAdd);
    if (!rgb) {
      toast.error("Invalid color value");
      return;
    }
    setColors((prev) => [...prev, { id: Date.now().toString(), color: colorToAdd }]);
    setNewColor("#3B82F6");
  }, [newColor]);

  const removeColor = useCallback((id: string) => {
    setColors((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateColor = useCallback((id: string, color: string) => {
    setColors((prev) => prev.map((c) => (c.id === id ? { ...c, color } : c)));
  }, []);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Color copied!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const getContrastLevel = (ratio: number): { label: string; color: string } => {
    if (ratio >= 7) return { label: "AAA", color: "text-green-600 bg-green-100 dark:bg-green-900" };
    if (ratio >= 4.5) return { label: "AA", color: "text-blue-600 bg-blue-100 dark:bg-blue-900" };
    if (ratio >= 3) return { label: "Fair", color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900" };
    return { label: "Poor", color: "text-red-600 bg-red-100 dark:bg-red-900" };
  };

  const getTextColor = (bgColor: string): string => {
    const rgb = hexToRgb(bgColor);
    if (!rgb) return "#000000";
    const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
    return luminance > 0.179 ? "#000000" : "#FFFFFF";
  };

  const contrastMatrix = colors.map((color1) =>
    colors.map((color2) => {
      const rgb1 = hexToRgb(color1.color);
      const rgb2 = hexToRgb(color2.color);
      if (!rgb1 || !rgb2) return { ratio: 0, level: getContrastLevel(0) };
      const ratio = getContrastRatio(rgb1, rgb2);
      return { ratio, level: getContrastLevel(ratio) };
    })
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Palette Contrast Viewer</h1>
          <p className="text-muted-foreground">
            Visualize contrast levels between every color pair in your palette. Quickly spot inaccessible combinations before they reach production.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Color Palette Editor */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>Add colors to analyze contrast</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">#</span>
                    <Input
                      value={newColor.replace("#", "")}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="pl-7 font-mono"
                      maxLength={6}
                      placeholder="000000"
                      onKeyDown={(e) => e.key === "Enter" && addColor()}
                    />
                  </div>
                  <input
                    type="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="h-10 w-14 rounded-md border cursor-pointer"
                  />
                  <Button onClick={addColor} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {colors.map((swatch) => (
                    <div
                      key={swatch.id}
                      className="flex items-center gap-2 p-2 rounded-lg border bg-card"
                    >
                      <div
                        className="w-10 h-10 rounded-md border flex-shrink-0"
                        style={{ backgroundColor: swatch.color }}
                      />
                      <div className="relative flex-1">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">#</span>
                        <Input
                          value={swatch.color.replace("#", "")}
                          onChange={(e) =>
                            updateColor(swatch.id, "#" + e.target.value)
                          }
                          className="pl-5 h-8 text-sm font-mono"
                          maxLength={6}
                        />
                      </div>
                      <input
                        type="color"
                        value={swatch.color}
                        onChange={(e) => updateColor(swatch.id, e.target.value)}
                        className="h-8 w-8 rounded border cursor-pointer"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => copyToClipboard(swatch.color, swatch.id)}
                      >
                        {copiedId === swatch.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeColor(swatch.id)}
                        disabled={colors.length <= 2}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                  <span>{colors.length} colors in palette</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setColors([
                        { id: "1", color: "#000000" },
                        { id: "2", color: "#FFFFFF" },
                      ])
                    }
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Contrast Levels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900" />
                  <span>AAA (7:1+) - Excellent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-100 dark:bg-blue-900" />
                  <span>AA (4.5:1+) - Good</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-100 dark:bg-yellow-900" />
                  <span>Fair (3:1+) - Acceptable for large text</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-100 dark:bg-red-900" />
                  <span>Poor (&lt;3:1) - Not recommended</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contrast Matrix */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Contrast Matrix
                </CardTitle>
                <CardDescription>
                  Click any cell to see detailed contrast info
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="w-16 p-2" />
                        {colors.map((color) => (
                          <th key={color.id} className="p-2">
                            <div
                              className="w-12 h-12 rounded-lg border mx-auto"
                              style={{ backgroundColor: color.color }}
                              title={color.color}
                            />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {colors.map((rowColor, rowIndex) => (
                        <tr key={rowColor.id}>
                          <td className="p-2">
                            <div
                              className="w-12 h-12 rounded-lg border mx-auto"
                              style={{ backgroundColor: rowColor.color }}
                              title={rowColor.color}
                            />
                          </td>
                          {contrastMatrix[rowIndex].map((cell, colIndex) => (
                            <td key={colIndex} className="p-2">
                              <div
                                className={`w-12 h-12 rounded-lg border mx-auto flex items-center justify-center text-xs font-bold cursor-pointer transition-transform hover:scale-110 ${cell.level.color}`}
                                title={`${rowColor.color} vs ${colors[colIndex].color}: ${cell.ratio.toFixed(2)}:1`}
                              >
                                {cell.ratio.toFixed(1)}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Color Previews */}
            <Card>
              <CardHeader>
                <CardTitle>Color Previews</CardTitle>
                <CardDescription>
                  See how colors look together in UI elements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {colors.slice(0, 5).map((color, index) => {
                  const textColor = getTextColor(color.color);
                  return (
                    <div
                      key={color.id}
                      className="rounded-lg p-4 flex items-center justify-between"
                      style={{ backgroundColor: color.color }}
                    >
                      <div>
                        <p
                          className="font-semibold"
                          style={{ color: textColor }}
                        >
                          Color {index + 1}
                        </p>
                        <p
                          className="text-sm opacity-80"
                          style={{ color: textColor }}
                        >
                          {color.color}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        style={{
                          backgroundColor: textColor,
                          color: color.color,
                        }}
                      >
                        Button
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Tools - Internal Linking */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Related Color Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-muted-foreground">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="mt-12 grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How to Use the Palette Contrast Viewer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <ol className="list-decimal list-inside space-y-2">
                <li>Add your palette colors using the color picker or by entering HEX values</li>
                <li>The contrast matrix updates automatically, showing ratios between every color pair</li>
                <li>Each cell displays the contrast ratio — click to see detailed information</li>
                <li>Color-coded badges indicate compliance: AAA (green), AA (blue), Fair (yellow), Poor (red)</li>
                <li>Use the color previews at the bottom to see how colors look in UI elements</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Why Use This Tool</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                The Palette Contrast Viewer helps you catch accessibility issues before they reach production. Essential for:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Design system creators building accessible color tokens</li>
                <li>Teams validating entire palettes against WCAG standards</li>
                <li>Quickly spotting problematic color combinations</li>
                <li>Documenting contrast levels for design handoffs</li>
              </ul>
              <p className="pt-2">
                Instead of testing color pairs one at a time, see your entire palette's contrast matrix at once — saving hours of manual testing.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
