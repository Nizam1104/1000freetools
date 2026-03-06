"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

export const relatedTools = [
  { name: "Color Picker", href: "/color-tools/color-picker" },
  { name: "Warm or Cool Color Detector", href: "/color-tools/warm-cool-color-detector" },
  { name: "RGB to Hex Converter", href: "/color-tools/rgb-to-hex-converter" },
  { name: "Advanced Color Picker", href: "/color-tools/advanced-color-picker" },
];

export default function ColorTemperatureToRgbConverterPage() {
  const [temperature, setTemperature] = useState<number>(6500);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const kelvinToRgb = (kelvin: number): { r: number; g: number; b: number } => {
    const temp = kelvin / 100;
    let r: number, g: number, b: number;

    if (temp <= 66) {
      r = 255;
    } else {
      r = 329.698727446 * Math.pow(temp - 60, -0.1332047592);
      r = Math.max(0, Math.min(255, r));
    }

    if (temp <= 66) {
      g = 99.4708025861 * Math.log(temp) - 161.1195681661;
    } else {
      g = 288.1221695283 * Math.pow(temp - 60, -0.0755148492);
    }
    g = Math.max(0, Math.min(255, g));

    if (temp >= 66) {
      b = 255;
    } else if (temp <= 19) {
      b = 0;
    } else {
      b = 138.5177312231 * Math.log(temp - 10) - 305.0447927307;
      b = Math.max(0, Math.min(255, b));
    }

    return {
      r: Math.round(r),
      g: Math.round(g),
      b: Math.round(b),
    };
  };

  const rgb = kelvinToRgb(temperature);

  const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, n)).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

  const getTemperatureDescription = (kelvin: number): string => {
    if (kelvin < 2000) return "Candlelight";
    if (kelvin < 3000) return "Warm White";
    if (kelvin < 4000) return "Soft White";
    if (kelvin < 5000) return "Neutral White";
    if (kelvin < 6000) return "Daylight";
    if (kelvin < 7000) return "Cool Daylight";
    return "Overcast Sky";
  };

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

  const presetTemperatures = [
    { label: "Candle", value: 1850 },
    { label: "Sunrise", value: 3000 },
    { label: "Incandescent", value: 2700 },
    { label: "Halogen", value: 3200 },
    { label: "Fluorescent", value: 4200 },
    { label: "Noon Sun", value: 5500 },
    { label: "Daylight", value: 6500 },
    { label: "Overcast", value: 7500 },
    { label: "Shade", value: 9000 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Color Temperature to RGB Converter
          </h1>
          <p className="text-muted-foreground">
            Convert color temperature in Kelvin to RGB values. Ideal for
            lighting designers, photographers, and developers working with warm
            or cool light sources.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Color Temperature
                  </Label>
                  <span className="text-sm font-mono">{temperature} K</span>
                </div>

                <Slider
                  value={[temperature]}
                  min={1000}
                  max={15000}
                  step={100}
                  onValueChange={([v]) => setTemperature(v)}
                />

                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={temperature}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val) && val >= 1000 && val <= 15000) {
                        setTemperature(val);
                      }
                    }}
                    className="font-mono"
                    min={1000}
                    max={15000}
                  />
                  <span className="text-muted-foreground">K</span>
                </div>

                <div className="p-3 rounded-md bg-muted">
                  <p className="text-xs text-muted-foreground mb-1">Type</p>
                  <p className="font-medium">
                    {getTemperatureDescription(temperature)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium text-muted-foreground">
                  Quick Presets
                </Label>
                <div className="flex flex-wrap gap-2">
                  {presetTemperatures.map((preset) => (
                    <Button
                      key={preset.value}
                      variant={
                        temperature === preset.value ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setTemperature(preset.value)}
                      className="text-xs"
                    >
                      {preset.label} ({preset.value}K)
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium text-muted-foreground">
                  Preview
                </Label>
                <div
                  className="w-full aspect-video rounded-lg border "
                  style={{ backgroundColor: hex }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold mb-4">RGB Result</h2>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  RGB Format
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                    readOnly
                    className="font-mono flex-1"
                  />
                  <CopyButton
                    text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                    field="RGB"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  HEX Format
                </Label>
                <div className="flex gap-2">
                  <Input value={hex} readOnly className="font-mono flex-1" />
                  <CopyButton text={hex} field="HEX" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Individual Values
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">R</Label>
                    <div className="flex gap-1">
                      <Input
                        value={rgb.r}
                        readOnly
                        className="font-mono text-center h-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">G</Label>
                    <div className="flex gap-1">
                      <Input
                        value={rgb.g}
                        readOnly
                        className="font-mono text-center h-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">B</Label>
                    <div className="flex gap-1">
                      <Input
                        value={rgb.b}
                        readOnly
                        className="font-mono text-center h-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Label className="text-sm font-medium text-muted-foreground">
                  RGB Color Bars
                </Label>
                <div className="grid grid-cols-3 gap-2 h-12">
                  <div
                    className="rounded border flex items-center justify-center"
                    style={{ backgroundColor: `rgb(${rgb.r}, 0, 0)` }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{
                        textShadow: rgb.r > 128 ? "0 0 2px white" : "none",
                      }}
                    >
                      {rgb.r}
                    </span>
                  </div>
                  <div
                    className="rounded border flex items-center justify-center"
                    style={{ backgroundColor: `rgb(0, ${rgb.g}, 0)` }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{
                        textShadow: rgb.g > 128 ? "0 0 2px white" : "none",
                      }}
                    >
                      {rgb.g}
                    </span>
                  </div>
                  <div
                    className="rounded border flex items-center justify-center"
                    style={{ backgroundColor: `rgb(0, 0, ${rgb.b})` }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{
                        textShadow: rgb.b > 128 ? "0 0 2px white" : "none",
                      }}
                    >
                      {rgb.b}
                    </span>
                  </div>
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
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-3">
              About Color Temperature
            </h3>
            <p className="text-sm text-muted-foreground space-y-2">
              Color temperature is measured in <strong>Kelvin (K)</strong> and
              describes the color of light emitted by a theoretical black body
              radiator at that temperature.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 rounded-md bg-muted">
                <p className="text-xs text-muted-foreground mb-1">
                  Lower Kelvin (&lt;3000K)
                </p>
                <p className="font-medium text-sm">
                  Warm, yellowish light (cozy, relaxing)
                </p>
              </div>
              <div className="p-3 rounded-md bg-muted">
                <p className="text-xs text-muted-foreground mb-1">
                  Higher Kelvin (&gt;5000K)
                </p>
                <p className="font-medium text-sm">
                  Cool, bluish light (energizing, focused)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-3">How to use</h3>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>
                Use the slider or input field to set the color temperature in
                Kelvin (1000K - 15000K)
              </li>
              <li>
                Or click one of the preset temperature buttons for common light
                sources
              </li>
              <li>The RGB and HEX values will be calculated automatically</li>
              <li>
                Click the copy button to copy any format to your clipboard
              </li>
            </ol>
          </CardContent>
        </Card>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Understanding Color Temperature</h2>
            <p className="text-muted-foreground">
              Color temperature describes the color characteristics of light, measured in Kelvin (K). Lower temperatures (2000K-3000K) produce warm, yellowish light similar to candlelight or sunrise. Higher temperatures (5000K-10000K) produce cool, bluish light like daylight or overcast skies. This concept is essential for lighting design, photography, and display calibration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Applications of Color Temperature</h2>
            <p className="text-muted-foreground">
              Photographers use color temperature to white balance images. Lighting designers select appropriate temperatures for different spaces warm light for cozy environments, cool light for workspaces. Web developers can use color temperature to create realistic lighting effects, simulate time of day, or build ambient UI themes that match natural light cycles.
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
