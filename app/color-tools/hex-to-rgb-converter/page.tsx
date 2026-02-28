"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function HexToRgbConverterPage() {
  const [hexInput, setHexInput] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const cleanHex = hex.replace("#", "").trim();
    if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) return null;
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  };

  const rgb = hexToRgb(hexInput);

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
    setHexInput("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">HEX to RGB Color Converter</h1>
          <p className="text-muted-foreground">
            Convert HEX color codes to RGB values instantly. Simply enter any hex code and get the exact red, green, and blue values for your CSS or design work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="hex" className="text-sm font-medium text-muted-foreground">
                  HEX Color
                </Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">#</span>
                    <Input
                      id="hex"
                      value={hexInput.replace("#", "")}
                      onChange={(e) => setHexInput(e.target.value.toUpperCase())}
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

              {rgb && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-muted-foreground mb-2 block">Preview</Label>
                      <div
                        className="w-full aspect-video rounded-lg border bg-checkerboard"
                        style={{ backgroundColor: `#${hexInput.replace("#", "")}` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold mb-4">RGB Result</h2>

              {rgb ? (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">RGB Format</Label>
                    <div className="flex gap-2">
                      <Input
                        value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                        readOnly
                        className="font-mono flex-1"
                      />
                      <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} field="RGB" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Individual Values</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">R</Label>
                        <div className="flex gap-1">
                          <Input value={rgb.r} readOnly className="font-mono text-center h-10" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">G</Label>
                        <div className="flex gap-1">
                          <Input value={rgb.g} readOnly className="font-mono text-center h-10" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">B</Label>
                        <div className="flex gap-1">
                          <Input value={rgb.b} readOnly className="font-mono text-center h-10" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <Label className="text-sm font-medium text-muted-foreground">CSS Usage</Label>
                    <div className="flex gap-2">
                      <Input
                        value={`color: rgb(${rgb.r}, ${rgb.g}, ${rgb.b});`}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <CopyButton text={`color: rgb(${rgb.r}, ${rgb.g}, ${rgb.b});`} field="CSS" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Enter a valid HEX color to see RGB values</p>
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
              <li>The RGB values will be calculated automatically</li>
              <li>Click the copy button to copy the RGB value to your clipboard</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
