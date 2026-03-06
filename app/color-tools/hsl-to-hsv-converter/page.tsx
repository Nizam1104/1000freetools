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
  { name: "RGB to HSL Converter", href: "/color-tools/rgb-to-hsl-converter" },
  { name: "Hex to HSL Converter", href: "/color-tools/hex-to-hsl-converter" },
  { name: "Advanced Color Picker", href: "/color-tools/advanced-color-picker" },
  { name: "Color Wheel", href: "/color-tools/color-wheel" },
];

export default function HslToHsvConverterPage() {
  const [hslInput, setHslInput] = useState({ h: "", s: "", l: "" });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const hslToHsv = (
    h: number,
    s: number,
    l: number,
  ): { h: number; s: number; v: number } => {
    s /= 100;
    l /= 100;
    const sv = s * Math.min(l, 1 - l);
    const v = l + sv;
    const newS = v === 0 ? 0 : (2 * sv) / v;
    return {
      h,
      s: Math.round(newS * 100),
      v: Math.round(v * 100),
    };
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

  const hsv = isValidHsl(hslInput.h, hslInput.s, hslInput.l)
    ? hslToHsv(
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
            HSL to HSV Color Converter
          </h1>
          <p className="text-muted-foreground">
            Convert HSL (Hue, Saturation, Lightness) color values to HSV (Hue,
            Saturation, Value) format. Useful for designers working across
            different color models.
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

              {hsv && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Preview
                      </Label>
                      <div
                        className="w-full aspect-video rounded-lg border "
                        style={{
                          backgroundColor: `hsl(${hslInput.h}, ${hslInput.s}%, ${hslInput.l}%)`,
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
              <h2 className="text-lg font-semibold mb-4">HSV Result</h2>

              {hsv ? (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      HSV Format
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`}
                        readOnly
                        className="font-mono flex-1"
                      />
                      <CopyButton
                        text={`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`}
                        field="HSV"
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
                            value={hsv.h}
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
                            value={`${hsv.s}%`}
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
                          V
                        </Label>
                        <div className="flex gap-1">
                          <Input
                            value={`${hsv.v}%`}
                            readOnly
                            className="font-mono text-center h-10"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Value
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Comparison
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-md bg-muted">
                        <p className="text-xs text-muted-foreground mb-1">
                          HSL
                        </p>
                        <p className="font-mono text-sm">
                          {hslInput.h}°, {hslInput.s}%, {hslInput.l}%
                        </p>
                      </div>
                      <div className="p-3 rounded-md bg-muted">
                        <p className="text-xs text-muted-foreground mb-1">
                          HSV
                        </p>
                        <p className="font-mono text-sm">
                          {hsv.h}°, {hsv.s}%, {hsv.v}%
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Enter valid HSL values to see HSV result</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-3">About HSL vs HSV</h3>
            <p className="text-sm text-muted-foreground space-y-2">
              <strong>HSL (Hue, Saturation, Lightness)</strong> and{" "}
              <strong>HSV (Hue, Saturation, Value)</strong> are two different
              ways to represent colors.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              HSL is more intuitive for humans as it represents lightness from
              black to white, while HSV is based on how colors are mixed in
              paint (adding black or white).
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Understanding HSL and HSV</h2>
            <p className="text-muted-foreground">
              HSL and HSV are both cylindrical color models that represent colors in ways more intuitive than RGB. HSL uses Lightness (from black through the hue to white), while HSV uses Value (from black through the hue to full color intensity). Different software and design tools use different models, making conversion essential for consistent workflows.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">When to Use Each Model</h2>
            <p className="text-muted-foreground">
              Use HSL for CSS and web development, as it's natively supported and more intuitive for creating color variations. Use HSV when working with design software like Adobe Photoshop, Illustrator, or when dealing with color pickers that use this model. Understanding both helps you work seamlessly across different tools.
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
