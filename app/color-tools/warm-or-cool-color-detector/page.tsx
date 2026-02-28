"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, Copy, RotateCcw, Palette, Thermometer, Snowflake, Flame } from "lucide-react";
import { toast } from "sonner";
import {
  hexToRgb,
  rgbToHsl,
  getColorTemperature,
  getComplementaryColor,
  getAnalogousColors,
} from "@/app/color-tools/lib/color-utils";

interface ColorTemperatureInfo {
  isWarm: boolean;
  description: string;
  hueRange: string;
}

export default function WarmOrCoolColorDetectorPage() {
  const [baseColor, setBaseColor] = useState("#3B82F6");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const temperatureInfo: ColorTemperatureInfo = getColorTemperature(baseColor);
  const complementaryColor = getComplementaryColor(baseColor) || baseColor;
  const analogousColors = getAnalogousColors(baseColor, 2);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(`${field} copied!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0"
      onClick={() => copyToClipboard(text, field)}
    >
      {copiedField === field ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );

  const handleRandomColor = () => {
    const randomHex = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0").toUpperCase();
    setBaseColor(randomHex);
  };

  const ColorSwatch = ({ colorHex, label }: { colorHex: string; label?: string }) => {
    const rgb = hexToRgb(colorHex);
    const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

    return (
      <div className="space-y-2">
        <div
          className="w-full aspect-square rounded-lg border shadow-sm"
          style={{ backgroundColor: colorHex }}
        />
        <div className="space-y-1">
          {label && <p className="text-xs text-muted-foreground font-medium">{label}</p>}
          <div className="flex items-center justify-between gap-1">
            <span className="font-mono text-xs">{colorHex}</span>
            <CopyButton text={colorHex} field={colorHex} />
          </div>
          {hsl && (
            <p className="text-xs text-muted-foreground">
              {hsl.h}°
            </p>
          )}
        </div>
      </div>
    );
  };

  const getTemperatureIcon = () => {
    if (temperatureInfo.isWarm) {
      return <Flame className="h-8 w-8 text-orange-500" />;
    }
    return <Snowflake className="h-8 w-8 text-blue-500" />;
  };

  const getTemperatureBadge = () => {
    if (temperatureInfo.isWarm) {
      return (
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
          <Flame className="h-4 w-4" />
          Warm Color
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        <Snowflake className="h-4 w-4" />
        Cool Color
      </span>
    );
  };

  const getTemperatureDescription = () => {
    if (temperatureInfo.isWarm) {
      return {
        title: "Warm Colors",
        description: "Warm colors evoke feelings of warmth, energy, and excitement. They remind us of sunlight, fire, and heat.",
        associations: ["Energy", "Passion", "Warmth", "Excitement", "Action"],
        uses: ["Call-to-action buttons", "Attention-grabbing elements", "Food and hospitality", "Sports and entertainment"],
      };
    }
    return {
      title: "Cool Colors",
      description: "Cool colors evoke feelings of calm, tranquility, and professionalism. They remind us of water, sky, and nature.",
      associations: ["Calm", "Trust", "Professionalism", "Nature", "Serenity"],
      uses: ["Corporate designs", "Healthcare", "Technology", "Finance", "Wellness"],
    };
  };

  const tempDesc = getTemperatureDescription();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Warm or Cool Color Detector</h1>
          <p className="text-muted-foreground">
            Detect whether a color has a warm or cool temperature. Useful for designers who want to maintain consistent visual mood across a palette.
          </p>
        </div>

        {/* Base Color Input */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Color Input</CardTitle>
            <CardDescription>
              Enter a color to analyze its temperature
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px] space-y-2">
                <Label>HEX Value</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">#</span>
                    <Input
                      value={baseColor.replace("#", "")}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
                        setBaseColor("#" + value);
                      }}
                      className="pl-7 font-mono"
                      placeholder="3B82F6"
                    />
                  </div>
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="h-10 w-16 rounded-md border cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleRandomColor} variant="outline">
                  <Palette className="h-4 w-4 mr-2" />
                  Random
                </Button>
                <Button
                  onClick={() => setBaseColor("#3B82F6")}
                  variant="outline"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Base Color Preview */}
            <div className="mt-4 flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-lg border shadow-md"
                style={{ backgroundColor: baseColor }}
              />
              <div className="flex-1">
                <p className="font-mono text-lg font-medium">{baseColor}</p>
                {(() => {
                  const rgb = hexToRgb(baseColor);
                  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
                  return (
                    <p className="text-muted-foreground text-sm">
                      RGB({rgb?.r}, {rgb?.g}, {rgb?.b}) • HSL({hsl?.h}°, {hsl?.s}%, {hsl?.l}%)
                    </p>
                  );
                })()}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Temperature Analysis */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Analysis</CardTitle>
                <CardDescription>
                  Color temperature classification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Temperature Badge */}
                <div className="flex items-center justify-center p-6 rounded-lg bg-muted/50">
                  <div className="text-center space-y-4">
                    {getTemperatureIcon()}
                    {getTemperatureBadge()}
                  </div>
                </div>

                {/* Color Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm text-muted-foreground">Color Type</span>
                    <span className="font-medium">{temperatureInfo.description}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm text-muted-foreground">Hue Range</span>
                    <span className="font-medium">{temperatureInfo.hueRange}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm text-muted-foreground">Hue Value</span>
                    <span className="font-mono">
                      {(() => {
                        const rgb = hexToRgb(baseColor);
                        if (!rgb) return "0";
                        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                        return `${hsl.h}°`;
                      })()}
                    </span>
                  </div>
                </div>

                {/* Color Preview with Temperature Context */}
                <div className="p-4 rounded-lg border">
                  <div
                    className="h-24 rounded-lg mb-3 flex items-center justify-center"
                    style={{ backgroundColor: baseColor }}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: (() => {
                          const rgb = hexToRgb(baseColor)!;
                          const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
                          return luminance > 0.179 ? "#000000" : "#FFFFFF";
                        })()
                      }}
                    >
                      {temperatureInfo.isWarm ? "🔥 Warm" : "❄️ Cool"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    {temperatureInfo.isWarm
                      ? "This color has warm undertones"
                      : "This color has cool undertones"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Temperature Info */}
            <Card>
              <CardHeader>
                <CardTitle>{tempDesc.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {tempDesc.description}
                </p>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Common Associations</p>
                  <div className="flex flex-wrap gap-2">
                    {tempDesc.associations.map((assoc) => (
                      <span
                        key={assoc}
                        className="px-3 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
                      >
                        {assoc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Best Used For</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {tempDesc.uses.map((use) => (
                      <li key={use} className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-green-600" />
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Related Colors */}
          <div className="space-y-6">
            {/* Hue Scale */}
            <Card>
              <CardHeader>
                <CardTitle>Color Temperature Scale</CardTitle>
                <CardDescription>
                  Where your color falls on the warm-cool spectrum
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Hue Wheel Visualization */}
                <div className="relative h-12 rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                    }}
                  />
                  {/* Marker for current color */}
                  {(() => {
                    const rgb = hexToRgb(baseColor);
                    if (!rgb) return null;
                    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                    const position = (hsl.h / 360) * 100;
                    return (
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                        style={{ left: `${position}%` }}
                      >
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-gray-400" />
                      </div>
                    );
                  })()}
                </div>

                <div className="flex justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Flame className="h-3 w-3 text-orange-500" />
                    <span>Warm (0°-60°)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Snowflake className="h-3 w-3 text-blue-500" />
                    <span>Cool (60°-300°)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-3 w-3 text-orange-500" />
                    <span>Warm (300°-360°)</span>
                  </div>
                </div>

                {/* Hue Ranges */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-orange-50 dark:bg-orange-900/20">
                    <p className="font-medium text-orange-800 dark:text-orange-200">Warm Hues</p>
                    <p className="text-muted-foreground">Red, Orange, Yellow</p>
                    <p className="font-mono mt-1">0° - 60°</p>
                  </div>
                  <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/20">
                    <p className="font-medium text-blue-800 dark:text-blue-200">Cool Hues</p>
                    <p className="text-muted-foreground">Green, Blue, Purple</p>
                    <p className="font-mono mt-1">60° - 300°</p>
                  </div>
                  <div className="p-2 rounded bg-orange-50 dark:bg-orange-900/20">
                    <p className="font-medium text-orange-800 dark:text-orange-200">Warm Hues</p>
                    <p className="text-muted-foreground">Magenta, Red</p>
                    <p className="font-mono mt-1">300° - 360°</p>
                  </div>
                  <div className="p-2 rounded bg-green-50 dark:bg-green-900/20">
                    <p className="font-medium text-green-800 dark:text-green-200">Your Color</p>
                    <p className="text-muted-foreground">{temperatureInfo.description}</p>
                    <p className="font-mono mt-1">{temperatureInfo.hueRange}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Complementary */}
            <Card>
              <CardHeader>
                <CardTitle>Complementary Color</CardTitle>
                <CardDescription>
                  The opposite temperature color
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <ColorSwatch colorHex={baseColor} label="Original" />
                  <ColorSwatch colorHex={complementaryColor} label="Complement" />
                </div>
                <div className="flex h-12 rounded-lg overflow-hidden border mt-3">
                  <div className="flex-1" style={{ backgroundColor: baseColor }} />
                  <div className="flex-1" style={{ backgroundColor: complementaryColor }} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {temperatureInfo.isWarm
                    ? "The complement of a warm color is cool"
                    : "The complement of a cool color is warm"}
                </p>
              </CardContent>
            </Card>

            {/* Analogous Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Temperature Colors</CardTitle>
                <CardDescription>
                  Analogous colors with similar temperature
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {analogousColors.map((c, i) => (
                    <ColorSwatch
                      key={c}
                      colorHex={c}
                      label={i === 0 ? "Base" : i === 1 ? "+30°" : "-30°"}
                    />
                  ))}
                </div>
                <div className="flex h-10 rounded-lg overflow-hidden border mt-3">
                  {analogousColors.map((c) => (
                    <div key={c} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
