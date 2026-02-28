"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function RgbToCmykConverterPage() {
  const [rgbInput, setRgbInput] = useState({ r: "", g: "", b: "" });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const rgbToCmyk = (r: number, g: number, b: number): { c: number; m: number; y: number; k: number } => {
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    
    const k = 1 - Math.max(red, green, blue);
    
    if (k === 1) {
      return { c: 0, m: 0, y: 0, k: 100 };
    }
    
    const c = (1 - red - k) / (1 - k);
    const m = (1 - green - k) / (1 - k);
    const y = (1 - blue - k) / (1 - k);
    
    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
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

  const cmyk = rgb.r !== null && rgb.g !== null && rgb.b !== null
    ? rgbToCmyk(rgb.r, rgb.g, rgb.b)
    : null;

  const isComplete = rgb.r !== null && rgb.g !== null && rgb.b !== null &&
    isValidRgb(rgbInput.r) && isValidRgb(rgbInput.g) && isValidRgb(rgbInput.b);

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

  const CopyButton = ({ text, field, className = "" }: { text: string; field: string; className?: string }) => (
    <Button
      variant="ghost"
      size="sm"
      className={`h-8 w-8 p-0 ${className}`}
      onClick={() => copyToClipboard(text, field)}
    >
      {copiedField === field ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">RGB to CMYK Converter</h1>
          <p className="text-muted-foreground">
            Convert RGB color values into CMYK format for print
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
                    <Label htmlFor="r" className="text-xs text-muted-foreground">R</Label>
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
                    <Label htmlFor="g" className="text-xs text-muted-foreground">G</Label>
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
                    <Label htmlFor="b" className="text-xs text-muted-foreground">B</Label>
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

              {isComplete && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-muted-foreground mb-2 block">Preview</Label>
                      <div
                        className="w-full aspect-video rounded-lg border bg-checkerboard"
                        style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
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

              {isComplete && cmyk ? (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">CMYK Format</Label>
                    <div className="flex gap-2">
                      <Input
                        value={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`}
                        readOnly
                        className="font-mono flex-1"
                      />
                      <CopyButton text={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`} field="CMYK" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Individual Values</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">C</Label>
                        <div className="flex gap-1">
                          <Input value={`${cmyk.c}%`} readOnly className="font-mono text-center h-10" />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">Cyan</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">M</Label>
                        <div className="flex gap-1">
                          <Input value={`${cmyk.m}%`} readOnly className="font-mono text-center h-10" />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">Magenta</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Y</Label>
                        <div className="flex gap-1">
                          <Input value={`${cmyk.y}%`} readOnly className="font-mono text-center h-10" />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">Yellow</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">K</Label>
                        <div className="flex gap-1">
                          <Input value={`${cmyk.k}%`} readOnly className="font-mono text-center h-10" />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">Key (Black)</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <Label className="text-sm font-medium text-muted-foreground">CMYK Color Bars</Label>
                    <div className="grid grid-cols-4 gap-2 h-16">
                      <div className="rounded border flex items-end justify-center pb-1" style={{ backgroundColor: `cmyk(${cmyk.c}%, 0%, 0%, 0%)` }}>
                        <span className="text-xs font-bold" style={{ textShadow: cmyk.c > 50 ? '0 0 2px white' : 'none' }}>{cmyk.c}%</span>
                      </div>
                      <div className="rounded border flex items-end justify-center pb-1" style={{ backgroundColor: `cmyk(0%, ${cmyk.m}%, 0%, 0%)` }}>
                        <span className="text-xs font-bold" style={{ textShadow: cmyk.m > 50 ? '0 0 2px white' : 'none' }}>{cmyk.m}%</span>
                      </div>
                      <div className="rounded border flex items-end justify-center pb-1" style={{ backgroundColor: `cmyk(0%, 0%, ${cmyk.y}%, 0%)` }}>
                        <span className="text-xs font-bold" style={{ textShadow: cmyk.y > 50 ? '0 0 2px white' : 'none' }}>{cmyk.y}%</span>
                      </div>
                      <div className="rounded border flex items-end justify-center pb-1" style={{ backgroundColor: `cmyk(0%, 0%, 0%, ${cmyk.k}%)` }}>
                        <span className="text-xs font-bold" style={{ textShadow: cmyk.k > 50 ? '0 0 2px white' : 'none' }}>{cmyk.k}%</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Enter valid RGB values to see CMYK result</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-3">How to use</h3>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Enter RGB values (0-255) in the Red, Green, and Blue fields</li>
              <li>The CMYK values will be calculated automatically</li>
              <li>Click the copy button to copy the CMYK value to your clipboard</li>
            </ol>
            <div className="mt-4 p-3 rounded-md bg-muted">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> CMYK is used for print design. RGB colors may look different when printed due to the different color gamuts of screens and printers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
