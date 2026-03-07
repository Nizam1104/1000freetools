"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, Copy, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  hexToRgb,
  getContrastRatio,
  getLuminance,
  getReadableTextColor,
  generateShades,
  generateTints,
} from "@/app/color-tools/lib/color-utils";
import TextColorSuggestionToolSEO from "@/components/seo-content/color-tools/TextColorSuggestionTool";

interface TextSuggestion {
  hex: string;
  contrastRatio: number;
  wcagAA: boolean;
  wcagAAA: boolean;
  type: "optimal" | "good" | "minimum";
}

export const relatedTools = [
  { name: "Contrast Checker", href: "/color-tools/contrast-checker", description: "Check contrast ratios for accessibility" },
  { name: "Palette Contrast Viewer", href: "/color-tools/palette-contrast-viewer", description: "View contrast matrix for color palettes" },
  { name: "Color Picker", href: "/color-tools/color-picker", description: "Pick and convert colors in multiple formats" },
  { name: "Dark Light Mode Preview", href: "/color-tools/dark-light-mode-preview", description: "Preview colors in light and dark themes" },
];

export default function TextColorSuggestionToolPage() {
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [suggestions, setSuggestions] = useState<TextSuggestion[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const generateSuggestions = useCallback(() => {
    const bgRgb = hexToRgb(bgColor);
    if (!bgRgb) return;

    const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    const newSuggestions: TextSuggestion[] = [];

    // Generate optimal text colors
    const optimalColors = bgLuminance > 0.5
      ? ["#000000", "#1a1a1a", "#2d2d2d"]  // Dark text for light bg
      : ["#FFFFFF", "#F5F5F5", "#E0E0E0"]; // Light text for dark bg

    for (const hex of optimalColors) {
      const rgb = hexToRgb(hex);
      if (!rgb) continue;
      const ratio = getContrastRatio(rgb, bgRgb);
      newSuggestions.push({
        hex,
        contrastRatio: ratio,
        wcagAA: ratio >= 4.5,
        wcagAAA: ratio >= 7,
        type: ratio >= 7 ? "optimal" : ratio >= 4.5 ? "good" : "minimum",
      });
    }

    // Generate additional suggestions based on shades/tints
    const baseColor = getReadableTextColor(bgColor);
    const variations = bgLuminance > 0.5
      ? generateShades(baseColor, 3)
      : generateTints(baseColor, 3);

    for (const hex of variations) {
      const rgb = hexToRgb(hex);
      if (!rgb) continue;
      const ratio = getContrastRatio(rgb, bgRgb);
      if (ratio >= 3) { // Only include if it has some readability
        newSuggestions.push({
          hex,
          contrastRatio: ratio,
          wcagAA: ratio >= 4.5,
          wcagAAA: ratio >= 7,
          type: ratio >= 7 ? "optimal" : ratio >= 4.5 ? "good" : "minimum",
        });
      }
    }

    // Sort by contrast ratio (highest first)
    newSuggestions.sort((a, b) => b.contrastRatio - a.contrastRatio);
    setSuggestions(newSuggestions.slice(0, 8));
  }, [bgColor]);

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

  const getTypeBadge = (type: TextSuggestion["type"]) => {
    switch (type) {
      case "optimal":
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Optimal
          </span>
        );
      case "good":
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Good
          </span>
        );
      case "minimum":
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Minimum
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Text Color Suggestion Tool</h1>
          <p className="text-muted-foreground">
            Enter a background color and get instant suggestions for readable, accessible text colors. Designed to help you meet contrast requirements effortlessly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Background Color</CardTitle>
                <CardDescription>
                  Select the background color you want to find text colors for
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>HEX Value</Label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">#</span>
                      <Input
                        value={bgColor.replace("#", "")}
                        onChange={(e) => setBgColor("#" + e.target.value)}
                        className="pl-7 font-mono"
                        maxLength={6}
                        placeholder="FFFFFF"
                      />
                    </div>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-10 w-16 rounded-md border cursor-pointer"
                    />
                  </div>
                </div>

                {/* Background Preview */}
                <div
                  className="h-32 rounded-lg border flex items-center justify-center"
                  style={{ backgroundColor: bgColor }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ color: getReadableTextColor(bgColor) }}
                  >
                    Background Preview
                  </span>
                </div>

                <Button onClick={generateSuggestions} className="w-full">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Suggestions
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setBgColor("#FFFFFF");
                    setSuggestions([]);
                  }}
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  This tool analyzes your background color and suggests text colors
                  that meet WCAG accessibility guidelines for readability.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span><strong>Optimal:</strong> 7:1+ contrast (AAA)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span><strong>Good:</strong> 4.5:1+ contrast (AA)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span><strong>Minimum:</strong> 3:1+ contrast (Large text only)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suggestions Section */}
          <Card>
            <CardHeader>
              <CardTitle>Suggested Text Colors</CardTitle>
              <CardDescription>
                {suggestions.length > 0
                  ? `${suggestions.length} readable text colors found`
                  : "Enter a background color to get suggestions"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No suggestions yet</p>
                  <p className="text-sm mt-1">Select a background color and click generate</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion.hex}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                    >
                      <div
                        className="w-14 h-14 rounded-md border flex-shrink-0"
                        style={{ backgroundColor: suggestion.hex }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-medium">{suggestion.hex}</span>
                          {getTypeBadge(suggestion.type)}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>Contrast: {suggestion.contrastRatio.toFixed(2)}:1</span>
                          <span className="flex items-center gap-1">
                            {suggestion.wcagAAA ? (
                              <Check className="h-3 w-3 text-green-600" />
                            ) : suggestion.wcagAA ? (
                              <Check className="h-3 w-3 text-blue-600" />
                            ) : (
                              <span className="text-yellow-600">!</span>
                            )}
                            WCAG {suggestion.wcagAAA ? "AAA" : suggestion.wcagAA ? "AA" : "Large Only"}
                          </span>
                        </div>
                      </div>
                      <CopyButton text={suggestion.hex} field={`Color ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}

              {suggestions.length > 0 && (
                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-2">
                    {suggestions.slice(0, 4).map((s) => (
                      <div
                        key={s.hex}
                        className="h-8 rounded"
                        style={{ backgroundColor: s.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
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
        <TextColorSuggestionToolSEO />
      </div>
    </div>
  );
}
