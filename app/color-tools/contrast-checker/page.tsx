"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import {
  hexToRgb,
  getContrastRatio,
  meetsWcagAA,
  meetsWcagAAA,
  getLuminance,
} from "@/app/color-tools/lib/color-utils";
import ContrastCheckerSEO from "@/components/seo-content/color-tools/ContrastChecker";

export const relatedTools = [
  { name: "Text Color Suggestion Tool", href: "/color-tools/text-color-suggestion-tool", description: "Get readable text color suggestions" },
  { name: "Palette Contrast Viewer", href: "/color-tools/palette-contrast-viewer", description: "View contrast matrix for color palettes" },
  { name: "Color Picker", href: "/color-tools/color-picker", description: "Pick and convert colors in multiple formats" },
  { name: "Web Safe Color Picker", href: "/color-tools/web-safe-color-picker", description: "Browse web-safe color palette" },
];

export default function ContrastCheckerPage() {
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [fontSize, setFontSize] = useState<"normal" | "large">("normal");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const calculateContrast = useCallback(() => {
    const textRgb = hexToRgb(textColor);
    const bgRgb = hexToRgb(bgColor);

    if (!textRgb || !bgRgb) return null;

    const ratio = getContrastRatio(textRgb, bgRgb);
    const textLuminance = getLuminance(textRgb.r, textRgb.g, textRgb.b);
    const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

    return {
      ratio: ratio.toFixed(2),
      textLuminance: textLuminance.toFixed(3),
      bgLuminance: bgLuminance.toFixed(3),
      aaNormal: meetsWcagAA(ratio, false),
      aaLarge: meetsWcagAA(ratio, true),
      aaaNormal: meetsWcagAAA(ratio, false),
      aaaLarge: meetsWcagAAA(ratio, true),
    };
  }, [textColor, bgColor]);

  const results = calculateContrast();

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

  const ContrastBadge = ({ pass, label }: { pass: boolean; label: string }) => (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
      <span className="text-sm font-medium">{label}</span>
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${pass
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
      >
        {pass ? "✓ Pass" : "✗ Fail"}
      </span>
    </div>
  );

  const getContrastScore = () => {
    if (!results) return { score: 0, label: "", color: "" };
    const ratio = parseFloat(results.ratio);
    if (ratio >= 7) return { score: 100, label: "Excellent", color: "text-green-600" };
    if (ratio >= 4.5) return { score: 75, label: "Good", color: "text-blue-600" };
    if (ratio >= 3) return { score: 50, label: "Fair", color: "text-yellow-600" };
    return { score: 25, label: "Poor", color: "text-red-600" };
  };

  const score = getContrastScore();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Color Contrast Checker — WCAG Compliance</h1>
          <p className="text-muted-foreground">
            Check the contrast ratio between text and background colors against WCAG AA and AAA accessibility standards. Ensure your designs are readable for all users.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Color Inputs */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Color Selection</CardTitle>
                <CardDescription>
                  Choose text and background colors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Text Color */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Text Color</Label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">#</span>
                      <Input
                        value={textColor.replace("#", "")}
                        onChange={(e) => setTextColor("#" + e.target.value)}
                        className="pl-7 font-mono"
                        maxLength={6}
                        placeholder="000000"
                      />
                    </div>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="h-10 w-16 rounded-md border cursor-pointer"
                    />
                    <CopyButton text={textColor} field="Text Color" />
                  </div>
                  <div
                    className="h-12 rounded-md border flex items-center justify-center text-lg font-medium"
                    style={{
                      backgroundColor: textColor,
                      color: (() => {
                        const rgb = hexToRgb(textColor);
                        if (!rgb) return "#000000";
                        const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
                        return luminance > 0.179 ? "#000000" : "#FFFFFF";
                      })()
                    }}
                  >
                    Preview Text
                  </div>
                </div>

                {/* Background Color */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Background Color</Label>
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
                    <CopyButton text={bgColor} field="Background Color" />
                  </div>
                </div>

                {/* Font Size Toggle */}
                <div className="space-y-2">
                  <Label>Text Size for Testing</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={fontSize === "normal" ? "default" : "outline"}
                      onClick={() => setFontSize("normal")}
                      className="flex-1"
                    >
                      Normal Text (14px)
                    </Button>
                    <Button
                      variant={fontSize === "large" ? "default" : "outline"}
                      onClick={() => setFontSize("large")}
                      className="flex-1"
                    >
                      Large Text (18px+)
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTextColor("#000000");
                      setBgColor("#FFFFFF");
                    }}
                    className="flex-1"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTextColor(bgColor);
                      setBgColor(textColor);
                    }}
                    className="flex-1"
                  >
                    Swap Colors
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                  See how your colors look together
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="rounded-lg p-6 space-y-3"
                  style={{ backgroundColor: bgColor }}
                >
                  <h3
                    className="text-2xl font-semibold"
                    style={{ color: textColor }}
                  >
                    Heading Text
                  </h3>
                  <p
                    className="text-base"
                    style={{ color: textColor }}
                  >
                    This is a preview of how your text will appear on the selected background color. Check if it's easy to read.
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: textColor }}
                  >
                    Smaller text sample for testing readability at different sizes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contrast Analysis</CardTitle>
                <CardDescription>
                  WCAG 2.1 compliance check results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contrast Ratio */}
                <div className="text-center p-6 rounded-lg border bg-card">
                  <div className={`text-5xl font-bold mb-2 ${score.color}`}>
                    {results?.ratio || "--"}
                  </div>
                  <p className="text-sm text-muted-foreground">Contrast Ratio</p>
                  <p className={`text-sm font-medium mt-1 ${score.color}`}>
                    {score.label}
                  </p>
                </div>

                {/* WCAG Levels */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">WCAG Compliance</Label>
                  <ContrastBadge pass={results?.aaNormal ?? false} label="AA Normal Text" />
                  <ContrastBadge pass={results?.aaLarge ?? false} label="AA Large Text" />
                  <ContrastBadge pass={results?.aaaNormal ?? false} label="AAA Normal Text" />
                  <ContrastBadge pass={results?.aaaLarge ?? false} label="AAA Large Text" />
                </div>

                {/* Luminance Values */}
                <div className="space-y-3 pt-4 border-t">
                  <Label className="text-sm font-medium">Luminance Values</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg border bg-card">
                      <p className="text-xs text-muted-foreground mb-1">Text</p>
                      <p className="font-mono text-sm">{results?.textLuminance || "--"}</p>
                    </div>
                    <div className="p-3 rounded-lg border bg-card">
                      <p className="text-xs text-muted-foreground mb-1">Background</p>
                      <p className="font-mono text-sm">{results?.bgLuminance || "--"}</p>
                    </div>
                  </div>
                </div>

                {/* Color Values */}
                <div className="space-y-3 pt-4 border-t">
                  <Label className="text-sm font-medium">Color Values</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded border">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: textColor }}
                        />
                        <span className="text-sm">Text: {textColor}</span>
                      </div>
                      <CopyButton text={textColor} field="Text HEX" />
                    </div>
                    <div className="flex items-center justify-between p-2 rounded border">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: bgColor }}
                        />
                        <span className="text-sm">Background: {bgColor}</span>
                      </div>
                      <CopyButton text={bgColor} field="BG HEX" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle>WCAG Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-600" />
                  <p>
                    <strong>AA Normal:</strong> Minimum 4.5:1 for regular text
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-600" />
                  <p>
                    <strong>AA Large:</strong> Minimum 3:1 for large text (18px+ or 14px+ bold)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-600" />
                  <p>
                    <strong>AAA Normal:</strong> Enhanced 7:1 for regular text
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-600" />
                  <p>
                    <strong>AAA Large:</strong> Enhanced 4.5:1 for large text
                  </p>
                </div>
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
        <ContrastCheckerSEO />
      </div>
    </div>
  );
}
