"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const metadata = {
  title: "HEX to HSL Converter — Convert Hex to Hue Saturation Lightness",
  description: "Convert HEX color codes to HSL (Hue, Saturation, Lightness) format. Perfect for CSS developers working with HSL color functions and modern color manipulation.",
  keywords: "hex to HSL, HSL converter, hue saturation lightness, CSS HSL colors, hex color translation, HSL format converter, web color conversion",
};

export const relatedTools = [
  { name: "HSL to Hex Converter", href: "/color-tools/hsl-to-hex-converter" },
  { name: "Hex to RGB Converter", href: "/color-tools/hex-to-rgb-converter" },
  { name: "RGB to HSL Converter", href: "/color-tools/rgb-to-hsl-converter" },
  { name: "Advanced Color Picker", href: "/color-tools/advanced-color-picker" },
];

export default function HexToHslConverterPage() {
  const [hexInput, setHexInput] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const hexToHsl = (
    hex: string,
  ): { h: number; s: number; l: number } | null => {
    const cleanHex = hex.replace("#", "").trim();
    if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) return null;

    let r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    let g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    let b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hsl = hexToHsl(hexInput);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(`${field} copied to clipboard!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const CopyButton = ({
    text,
    field,
    className = "",
  }: {
    text: string;
    field: string;
    className?: string;
  }) => (
    <Button
      variant="ghost"
      size="sm"
      className={`h-8 w-8 p-0 ${className}`}
      onClick={() => copyToClipboard(text, field)}
    >
      {copiedField === field ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );

  const handleClear = () => {
    setHexInput("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            HEX to HSL Color Converter
          </h1>
          <p className="text-muted-foreground">
            Convert HEX color codes to HSL (Hue, Saturation, Lightness) values
            instantly. Perfect for CSS developers who work with HSL color
            functions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="hex"
                  className="text-sm font-medium text-muted-foreground"
                >
                  HEX Color
                </Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      #
                    </span>
                    <Input
                      id="hex"
                      value={hexInput.replace("#", "")}
                      onChange={(e) =>
                        setHexInput(e.target.value.toUpperCase())
                      }
                      placeholder="FF5733"
                      className="pl-7 font-mono uppercase"
                      maxLength={6}
                    />
                  </div>
                  {hexInput && (
                    <Button variant="outline" size="icon" onClick={handleClear}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter a 6-digit HEX color code
                </p>
              </div>

              {hsl && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Preview
                      </Label>
                      <div
                        className="w-full aspect-video rounded-lg border "
                        style={{
                          backgroundColor: `#${hexInput.replace("#", "")}`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold mb-4">HSL Result</h2>

              {hsl ? (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      HSL Format
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                        readOnly
                        className="font-mono flex-1"
                      />
                      <CopyButton
                        text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                        field="HSL"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Individual Values
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          H
                        </Label>
                        <div className="flex gap-1">
                          <Input
                            value={hsl.h}
                            readOnly
                            className="font-mono text-center h-10"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Hue (0-360°)
                        </p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          S
                        </Label>
                        <div className="flex gap-1">
                          <Input
                            value={`${hsl.s}%`}
                            readOnly
                            className="font-mono text-center h-10"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Saturation
                        </p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          L
                        </Label>
                        <div className="flex gap-1">
                          <Input
                            value={`${hsl.l}%`}
                            readOnly
                            className="font-mono text-center h-10"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Lightness
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <Label className="text-sm font-medium text-muted-foreground">
                      CSS Usage
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={`color: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%);`}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <CopyButton
                        text={`color: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%);`}
                        field="CSS"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Enter a valid HEX color to see HSL values</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-3">How to use</h3>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Enter a 6-digit HEX color code (e.g., FF5733 or #FF5733)</li>
              <li>The HSL values will be calculated automatically</li>
              <li>
                Click the copy button to copy the HSL value to your clipboard
              </li>
            </ol>
          </CardContent>
        </Card>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Why Convert HEX to HSL?</h2>
            <p className="text-muted-foreground">
              HSL (Hue, Saturation, Lightness) is a more intuitive color model for designers and developers. Unlike RGB or HEX, HSL lets you think about colors the way humans perceive them. Converting HEX to HSL makes it easier to create color variations, adjust brightness, or build dynamic color schemes in CSS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Understanding HSL Color Format</h2>
            <p className="text-muted-foreground">
              HSL represents colors using three values: Hue (0-360 degrees on the color wheel), Saturation (0-100% intensity of the color), and Lightness (0-100% from black to white). This format is supported natively in CSS through the hsl() function, making it ideal for modern web development.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Related Color Tools</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="p-4 rounded-lg border hover:bg-muted transition-colors block"
                >
                  <p className="font-medium">{tool.name}</p>
                  <p className="text-sm text-muted-foreground">{tool.href}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
