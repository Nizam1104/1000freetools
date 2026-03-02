"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Copy, Check, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { hexToRgb, getContrastRatio, meetsWcagAA, meetsWcagAAA, getReadableTextColor } from "@/app/color-tools/lib/color-utils";

export default function ColorContrastCheckerPage() {
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [isLargeText, setIsLargeText] = useState(false);

  const checkContrast = useCallback(() => {
    const fgRgb = hexToRgb(foregroundColor);
    const bgRgb = hexToRgb(backgroundColor);
    
    if (!fgRgb || !bgRgb) return null;

    const ratio = getContrastRatio(fgRgb, bgRgb);
    const aaNormal = meetsWcagAA(ratio, false);
    const aaLarge = meetsWcagAA(ratio, true);
    const aaaNormal = meetsWcagAAA(ratio, false);
    const aaaLarge = meetsWcagAAA(ratio, true);

    return {
      ratio,
      aaNormal,
      aaLarge,
      aaaNormal,
      aaaLarge,
    };
  }, [foregroundColor, backgroundColor]);

  const result = checkContrast();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const swapColors = () => {
    setForegroundColor(backgroundColor);
    setBackgroundColor(foregroundColor);
  };

  const getContrastLevel = () => {
    if (!result) return "unknown";
    if (result.ratio >= 7) return "AAA";
    if (result.ratio >= 4.5) return "AA";
    if (result.ratio >= 3) return "AA Large";
    return "Fail";
  };

  const getContrastColor = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return "#000000";
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Color Contrast Checker</h1>
        <p className="text-muted-foreground">
          Check if your color combinations meet WCAG accessibility standards for text readability.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Foreground (Text) Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="font-mono"
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div>
                <Label>Background Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="font-mono"
                    placeholder="#ffffff"
                  />
                </div>
              </div>

              <Button variant="outline" onClick={swapColors} className="w-full">
                Swap Colors
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Text Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Large Text (18pt+ or 14pt+ bold)</Label>
                  <p className="text-sm text-muted-foreground">
                    WCAG has lower requirements for large text
                  </p>
                </div>
                <Switch
                  checked={isLargeText}
                  onCheckedChange={setIsLargeText}
                />
              </div>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Contrast Ratio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">
                    {result.ratio.toFixed(2)}:1
                  </div>
                  <Badge
                    variant={
                      getContrastLevel() === "AAA" ? "default" :
                      getContrastLevel() === "AA" ? "secondary" :
                      getContrastLevel() === "AA Large" ? "outline" : "destructive"
                    }
                    className="text-lg px-4 py-2"
                  >
                    {getContrastLevel()}
                  </Badge>
                </div>

                <Progress
                  value={(result.ratio / 21) * 100}
                  className="h-3"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1:1</span>
                  <span>4.5:1 (AA)</span>
                  <span>7:1 (AAA)</span>
                  <span>21:1</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>WCAG Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    {result?.aaNormal ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-semibold">AA Normal</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ratio ≥ 4.5:1
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {result?.aaNormal ? "Passes" : "Fails"} for normal text
                  </p>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    {result?.aaLarge ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-semibold">AA Large</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ratio ≥ 3:1
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {result?.aaLarge ? "Passes" : "Fails"} for large text
                  </p>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    {result?.aaaNormal ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-semibold">AAA Normal</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ratio ≥ 7:1
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {result?.aaaNormal ? "Passes" : "Fails"} for normal text
                  </p>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    {result?.aaaLarge ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-semibold">AAA Large</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ratio ≥ 4.5:1
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {result?.aaaLarge ? "Passes" : "Fails"} for large text
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="p-6 rounded-lg"
                style={{ backgroundColor, color: foregroundColor }}
              >
                <h3 className="text-2xl font-bold mb-2">Sample Heading</h3>
                <p className="mb-4">
                  This is sample text to preview how your color combination will look.
                  The quick brown fox jumps over the lazy dog.
                </p>
                <p className="text-sm opacity-75">
                  Small text with reduced opacity
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className="p-4 rounded-lg text-center"
                  style={{ backgroundColor, color: foregroundColor }}
                >
                  <p className="text-4xl font-bold">Aa</p>
                  <p className="text-xs mt-2">Large Text (24px)</p>
                </div>
                <div
                  className="p-4 rounded-lg text-center"
                  style={{ backgroundColor, color: foregroundColor }}
                >
                  <p className="text-base">Aa</p>
                  <p className="text-xs mt-2">Normal Text (16px)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Color Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: foregroundColor }}
                  />
                  <div>
                    <p className="font-semibold text-sm">Foreground</p>
                    <code className="text-xs">{foregroundColor}</code>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(foregroundColor, "Foreground color")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: backgroundColor }}
                  />
                  <div>
                    <p className="font-semibold text-sm">Background</p>
                    <code className="text-xs">{backgroundColor}</code>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(backgroundColor, "Background color")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CSS Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                  {`color: ${foregroundColor}; background-color: ${backgroundColor};`}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(
                    `color: ${foregroundColor}; background-color: ${backgroundColor};`,
                    "CSS"
                  )}
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
          <h2 className="text-2xl font-semibold mb-4">Understanding WCAG Contrast Requirements</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              The Web Content Accessibility Guidelines (WCAG) define minimum contrast requirements to ensure 
              text is readable for all users, including those with visual impairments.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Level AA (Minimum)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Normal text:</span>
                  <span className="font-semibold">4.5:1</span>
                </div>
                <div className="flex justify-between">
                  <span>Large text (18pt+):</span>
                  <span className="font-semibold">3:1</span>
                </div>
                <div className="flex justify-between">
                  <span>Large bold text (14pt+):</span>
                  <span className="font-semibold">3:1</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Level AAA ( Enhanced)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Normal text:</span>
                  <span className="font-semibold">7:1</span>
                </div>
                <div className="flex justify-between">
                  <span>Large text (18pt+):</span>
                  <span className="font-semibold">4.5:1</span>
                </div>
                <div className="flex justify-between">
                  <span>Large bold text (14pt+):</span>
                  <span className="font-semibold">4.5:1</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Tips for Better Contrast</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "Dark on Light", desc: "Use dark text on light backgrounds for maximum readability." },
              { title: "Avoid Pure Black", desc: "Use #1a1a1a or #333 instead of #000 for reduced eye strain." },
              { title: "Test in Grayscale", desc: "If it works in grayscale, it'll work for colorblind users." },
            ].map((tip) => (
              <Card key={tip.title}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
