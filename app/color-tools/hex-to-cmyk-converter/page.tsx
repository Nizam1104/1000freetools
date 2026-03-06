"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import HexToCmykConverterSEO from "@/components/seo-content/color-tools/HexToCmykConverter";

export const relatedTools = [
  { name: "RGB to CMYK Converter", href: "/color-tools/rgb-to-cmyk-converter" },
  { name: "Hex to RGB Converter", href: "/color-tools/hex-to-rgb-converter" },
  { name: "Palette Export Tool", href: "/color-tools/palette-export-tool" },
  { name: "CSS Variables Generator", href: "/color-tools/css-variables-generator" },
];

export default function HexToCmykConverterPage() {
  const [hexInput, setHexInput] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const hexToCmyk = (
    hex: string,
  ): { c: number; m: number; y: number; k: number } | null => {
    const cleanHex = hex.replace("#", "").trim();
    if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) return null;

    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    const k = 1 - Math.max(r, g, b);

    if (k === 1) {
      return { c: 0, m: 0, y: 0, k: 100 };
    }

    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    };
  };

  const cmyk = hexToCmyk(hexInput);

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
            HEX to CMYK Color Converter
          </h1>
          <p className="text-muted-foreground">
            Convert HEX color codes to CMYK values for print-ready design. Enter
            a hex code and get the corresponding CMYK breakdown instantly.
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

              {cmyk && (
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
              <h2 className="text-lg font-semibold mb-4">CMYK Result</h2>

              {cmyk ? (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      CMYK Format
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`}
                        readOnly
                        className="font-mono flex-1"
                      />
                      <CopyButton
                        text={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`}
                        field="CMYK"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Individual Values
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          C
                        </Label>
                        <div className="flex gap-1">
                          <Input
                            value={`${cmyk.c}%`}
                            readOnly
                            className="font-mono text-center h-10"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Cyan
                        </p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          M
                        </Label>
                        <div className="flex gap-1">
                          <Input
                            value={`${cmyk.m}%`}
                            readOnly
                            className="font-mono text-center h-10"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Magenta
                        </p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          Y
                        </Label>
                        <div className="flex gap-1">
                          <Input
                            value={`${cmyk.y}%`}
                            readOnly
                            className="font-mono text-center h-10"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Yellow
                        </p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          K
                        </Label>
                        <div className="flex gap-1">
                          <Input
                            value={`${cmyk.k}%`}
                            readOnly
                            className="font-mono text-center h-10"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Key (Black)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <Label className="text-sm font-medium text-muted-foreground">
                      CMYK Color Bars
                    </Label>
                    <div className="grid grid-cols-4 gap-2 h-16">
                      <div
                        className="rounded border flex items-end justify-center pb-1"
                        style={{
                          backgroundColor: `cmyk(${cmyk.c}%, 0%, 0%, 0%)`,
                        }}
                      >
                        <span
                          className="text-xs font-bold"
                          style={{
                            textShadow: cmyk.c > 50 ? "0 0 2px white" : "none",
                          }}
                        >
                          {cmyk.c}%
                        </span>
                      </div>
                      <div
                        className="rounded border flex items-end justify-center pb-1"
                        style={{
                          backgroundColor: `cmyk(0%, ${cmyk.m}%, 0%, 0%)`,
                        }}
                      >
                        <span
                          className="text-xs font-bold"
                          style={{
                            textShadow: cmyk.m > 50 ? "0 0 2px white" : "none",
                          }}
                        >
                          {cmyk.m}%
                        </span>
                      </div>
                      <div
                        className="rounded border flex items-end justify-center pb-1"
                        style={{
                          backgroundColor: `cmyk(0%, 0%, ${cmyk.y}%, 0%)`,
                        }}
                      >
                        <span
                          className="text-xs font-bold"
                          style={{
                            textShadow: cmyk.y > 50 ? "0 0 2px white" : "none",
                          }}
                        >
                          {cmyk.y}%
                        </span>
                      </div>
                      <div
                        className="rounded border flex items-end justify-center pb-1"
                        style={{
                          backgroundColor: `cmyk(0%, 0%, 0%, ${cmyk.k}%)`,
                        }}
                      >
                        <span
                          className="text-xs font-bold"
                          style={{
                            textShadow: cmyk.k > 50 ? "0 0 2px white" : "none",
                          }}
                        >
                          {cmyk.k}%
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Enter a valid HEX color to see CMYK values</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <HexToCmykConverterSEO />
        </div>
      </div>
    </div>
  );
}
