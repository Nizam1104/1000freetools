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
  title: "RGB to HEX Converter — Convert RGB to Hex Color Code",
  description: "Convert RGB color values to HEX format instantly. Enter red, green, blue values (0-255) and get the corresponding hex code for CSS and web development.",
  keywords: "RGB to hex, RGB to HEX converter, color to hex code, RGB converter, web color format, CSS hex code, RGB translation",
};

export const relatedTools = [
  { name: "Hex to RGB Converter", href: "/color-tools/hex-to-rgb-converter" },
  { name: "RGB to HSL Converter", href: "/color-tools/rgb-to-hsl-converter" },
  { name: "Color Picker", href: "/color-tools/color-picker" },
  { name: "Hex to CMYK Converter", href: "/color-tools/hex-to-cmyk-converter" },
];

export default function RgbToHexConverterPage() {
  const [rgbInput, setRgbInput] = useState({ r: "", g: "", b: "" });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, n)).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
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

  const hex = rgb.r && rgb.g && rgb.b ? rgbToHex(rgb.r, rgb.g, rgb.b) : null;

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
            RGB to HEX Color Converter
          </h1>
          <p className="text-muted-foreground">
            Convert RGB color values to HEX format in one click. Enter your red,
            green, and blue values and get the corresponding hex code ready to
            use.
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

              {isComplete && hex && (
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

              {isComplete && hex ? (
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
                  <p>Enter valid RGB values to see HEX result</p>
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
              <li>The HEX color code will be calculated automatically</li>
              <li>
                Click the copy button to copy the HEX value to your clipboard
              </li>
            </ol>
          </CardContent>
        </Card>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Why Convert RGB to HEX?</h2>
            <p className="text-muted-foreground">
              RGB values are intuitive for adjusting colors programmatically, but HEX codes are more compact and widely used in CSS and HTML. Converting RGB to HEX is essential for web development, especially when working with stylesheets, design systems, or sharing colors with other developers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Understanding RGB Color Values</h2>
            <p className="text-muted-foreground">
              RGB stands for Red, Green, and Blue. Each channel ranges from 0 to 255, representing the intensity of that color. When combined, these three channels can produce over 16 million colors. RGB is the standard color model for screens, digital cameras, and most electronic displays.
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
