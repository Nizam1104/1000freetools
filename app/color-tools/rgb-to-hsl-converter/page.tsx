"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function RgbToHslConverterPage() {
  const [rgbInput, setRgbInput] = useState({ r: "", g: "", b: "" });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const rgbToHsl = (
    r: number,
    g: number,
    b: number,
  ): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

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

  const isValidRgb = (value: string) => {
    const num = parseInt(value, 10);
    return !isNaN(num) && num >= 0 && num <= 255;
  };

  const rgb = {
    r: rgbInput.r ? parseInt(rgbInput.r, 10) : null,
    g: rgbInput.g ? parseInt(rgbInput.g, 10) : null,
    b: rgbInput.b ? parseInt(rgbInput.b, 10) : null,
  };

  const hsl =
    rgb.r !== null && rgb.g !== null && rgb.b !== null
      ? rgbToHsl(rgb.r, rgb.g, rgb.b)
      : null;

  const isComplete =
    rgb.r !== null &&
    rgb.g !== null &&
    rgb.b !== null &&
    isValidRgb(rgbInput.r) &&
    isValidRgb(rgbInput.g) &&
    isValidRgb(rgbInput.b);

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
    setRgbInput({ r: "", g: "", b: "" });
  };

  const handleInputChange = (channel: "r" | "g" | "b", value: string) => {
    if (value === "" || /^\d+$/.test(value)) {
      setRgbInput((prev) => ({ ...prev, [channel]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            RGB to HSL Color Converter
          </h1>
          <p className="text-muted-foreground">
            Convert RGB color values to HSL format instantly. Get the hue,
            saturation, and lightness representation of any RGB color for use in
            modern CSS.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  RGB Values
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label
                      htmlFor="r"
                      className="text-xs text-muted-foreground"
                    >
                      R
                    </Label>
                    <Input
                      id="r"
                      type="text"
                      value={rgbInput.r}
                      onChange={(e) => handleInputChange("r", e.target.value)}
                      placeholder="255"
                      className="font-mono text-center h-10"
                      maxLength={3}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="g"
                      className="text-xs text-muted-foreground"
                    >
                      G
                    </Label>
                    <Input
                      id="g"
                      type="text"
                      value={rgbInput.g}
                      onChange={(e) => handleInputChange("g", e.target.value)}
                      placeholder="87"
                      className="font-mono text-center h-10"
                      maxLength={3}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="b"
                      className="text-xs text-muted-foreground"
                    >
                      B
                    </Label>
                    <Input
                      id="b"
                      type="text"
                      value={rgbInput.b}
                      onChange={(e) => handleInputChange("b", e.target.value)}
                      placeholder="51"
                      className="font-mono text-center h-10"
                      maxLength={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  {(rgbInput.r || rgbInput.g || rgbInput.b) && (
                    <Button variant="outline" size="sm" onClick={handleClear}>
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter values between 0 and 255
                </p>
              </div>

              {isComplete && hsl && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Preview
                      </Label>
                      <div
                        className="w-full aspect-video rounded-lg border "
                        style={{
                          backgroundColor:
                            `#${(rgb.r! | (1 << 8)).toString(16).slice(1)}${(rgb.g! | (1 << 8)).toString(16).slice(1)}${(rgb.b! | (1 << 8)).toString(16).slice(1)}`.toUpperCase(),
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

              {isComplete && hsl ? (
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
                  <p>Enter valid RGB values to see HSL result</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-3">How to use</h3>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>
                Enter RGB values (0-255) in the Red, Green, and Blue fields
              </li>
              <li>The HSL values will be calculated automatically</li>
              <li>
                Click the copy button to copy the HSL value to your clipboard
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
