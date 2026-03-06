"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const relatedTools = [
  { name: "Hex to HSL Converter", href: "/color-tools/hex-to-hsl-converter" },
  { name: "RGB to Hex Converter", href: "/color-tools/rgb-to-hex-converter" },
  { name: "HSL to HSV Converter", href: "/color-tools/hsl-to-hsv-converter" },
  { name: "Color Picker", href: "/color-tools/color-picker" },
];

export default function HslToHexConverterPage() {
  const [hslInput, setHslInput] = useState({ h: "", s: "", l: "" });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const hslToHex = (h: number, s: number, l: number): string => {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  };

  const isValidHsl = (h: string, s: string, l: string) => {
    const hNum = parseInt(h, 10);
    const sNum = parseInt(s, 10);
    const lNum = parseInt(l, 10);
    return (
      !isNaN(hNum) &&
      !isNaN(sNum) &&
      !isNaN(lNum) &&
      hNum >= 0 &&
      hNum <= 360 &&
      sNum >= 0 &&
      sNum <= 100 &&
      lNum >= 0 &&
      lNum <= 100
    );
  };

  const hex = isValidHsl(hslInput.h, hslInput.s, hslInput.l)
    ? hslToHex(
        parseInt(hslInput.h, 10),
        parseInt(hslInput.s, 10),
        parseInt(hslInput.l, 10),
      )
    : null;

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
    setHslInput({ h: "", s: "", l: "" });
  };

  const handleInputChange = (channel: "h" | "s" | "l", value: string) => {
    if (value === "" || /^\d+$/.test(value)) {
      setHslInput((prev) => ({ ...prev, [channel]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            HSL to HEX Color Converter
          </h1>
          <p className="text-muted-foreground">
            Convert HSL color values to HEX format easily. Enter hue,
            saturation, and lightness values and get the equivalent hex color
            code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  HSL Values
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label
                      htmlFor="h"
                      className="text-xs text-muted-foreground"
                    >
                      H
                    </Label>
                    <Input
                      id="h"
                      type="text"
                      value={hslInput.h}
                      onChange={(e) => handleInputChange("h", e.target.value)}
                      placeholder="11"
                      className="font-mono text-center h-10"
                      maxLength={3}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="s"
                      className="text-xs text-muted-foreground"
                    >
                      S
                    </Label>
                    <Input
                      id="s"
                      type="text"
                      value={hslInput.s}
                      onChange={(e) => handleInputChange("s", e.target.value)}
                      placeholder="82"
                      className="font-mono text-center h-10"
                      maxLength={3}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="l"
                      className="text-xs text-muted-foreground"
                    >
                      L
                    </Label>
                    <Input
                      id="l"
                      type="text"
                      value={hslInput.l}
                      onChange={(e) => handleInputChange("l", e.target.value)}
                      placeholder="60"
                      className="font-mono text-center h-10"
                      maxLength={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  {(hslInput.h || hslInput.s || hslInput.l) && (
                    <Button variant="outline" size="sm" onClick={handleClear}>
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  H: 0-360°, S: 0-100%, L: 0-100%
                </p>
              </div>

              {hex && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Preview
                      </Label>
                      <div
                        className="w-full aspect-video rounded-lg border "
                        style={{ backgroundColor: hex }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold mb-4">HEX Result</h2>

              {hex ? (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      HEX Format
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={hex}
                        readOnly
                        className="font-mono flex-1"
                      />
                      <CopyButton text={hex} field="HEX" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Short Format (if applicable)
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={
                          hex[1] === hex[2] &&
                          hex[3] === hex[4] &&
                          hex[5] === hex[6]
                            ? `#${hex[1]}${hex[3]}${hex[5]}`
                            : "N/A"
                        }
                        readOnly
                        className="font-mono flex-1"
                      />
                      {hex[1] === hex[2] &&
                        hex[3] === hex[4] &&
                        hex[5] === hex[6] && (
                          <CopyButton
                            text={`#${hex[1]}${hex[3]}${hex[5]}`}
                            field="Short HEX"
                          />
                        )}
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <Label className="text-sm font-medium text-muted-foreground">
                      CSS Usage
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={`color: ${hex};`}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <CopyButton text={`color: ${hex};`} field="CSS" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Enter valid HSL values to see HEX result</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-3">How to use</h3>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Enter HSL values (H: 0-360, S: 0-100, L: 0-100)</li>
              <li>The HEX color code will be calculated automatically</li>
              <li>
                Click the copy button to copy the HEX value to your clipboard
              </li>
            </ol>
          </CardContent>
        </Card>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Why Convert HSL to HEX?</h2>
            <p className="text-muted-foreground">
              While HSL is great for understanding and manipulating colors, HEX codes remain the standard for CSS and web development. Converting HSL to HEX lets you use your carefully adjusted colors in stylesheets, share them with team members, or integrate them into design systems that require hex format.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">When to Use HSL vs HEX</h2>
            <p className="text-muted-foreground">
              Use HSL when you need to create color variations, adjust brightness systematically, or work with color relationships. Use HEX when writing CSS, sharing colors in design tools, or working with legacy codebases. This converter bridges both workflows seamlessly.
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
