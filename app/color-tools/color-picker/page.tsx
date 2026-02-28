"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Check, Copy, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ColorState {
  h: number;
  s: number;
  l: number;
}

interface SavedColor {
  hex: string;
  id: string;
}

const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const hslToRgb = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4)),
  };
};

const hslToCmyk = (h: number, s: number, l: number) => {
  const rgb = hslToRgb(h, s, l);
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
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

const hexToHsl = (hex: string): ColorState | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
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
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const PRESET_COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#22c55e",
  "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6",
  "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
  "#f43f5e", "#78716c", "#0f172a", "#ffffff", "#000000",
];

export default function ColorPickerPage() {
  const [color, setColor] = useState<ColorState>({ h: 260, s: 70, l: 55 });
  const [savedColors, setSavedColors] = useState<SavedColor[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [hexInput, setHexInput] = useState("");
  const [activeTab, setActiveTab] = useState("picker");
  const pickerRef = useRef<HTMLDivElement>(null);

  const hex = hslToHex(color.h, color.s, color.l);
  const rgb = hslToRgb(color.h, color.s, color.l);
  const cmyk = hslToCmyk(color.h, color.s, color.l);

  useEffect(() => {
    setHexInput(hex.toUpperCase());
  }, [hex]);

  const updateColorFromEvent = useCallback((clientX: number, clientY: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    setColor((prev) => ({ ...prev, s: Math.round(x * 100), l: Math.round((1 - y) * 100) }));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    updateColorFromEvent(e.clientX, e.clientY, rect);

    const handleMouseMove = (ev: MouseEvent) => {
      updateColorFromEvent(ev.clientX, ev.clientY, rect);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [updateColorFromEvent]);

  const handleHexChange = (value: string) => {
    setHexInput(value);
    const hsl = hexToHsl(value);
    if (hsl) setColor(hsl);
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

  const saveColor = () => {
    const newColor: SavedColor = { hex: hex, id: Date.now().toString() };
    setSavedColors((prev) => [newColor, ...prev].slice(0, 12));
    toast.success("Color saved to palette!");
  };

  const removeColor = (id: string) => {
    setSavedColors((prev) => prev.filter((c) => c.id !== id));
  };

  const loadSavedColor = (hexValue: string) => {
    const hsl = hexToHsl(hexValue);
    if (hsl) setColor(hsl);
    setActiveTab("picker");
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

  const ColorInput = ({
    label,
    value,
    onChange,
    min,
    max,
    suffix,
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    suffix?: string;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
        <span className="text-sm font-mono">{value}{suffix}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={1} onValueChange={([v]) => onChange(v)} />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Free Online Color Picker</h1>
          <p className="text-muted-foreground">
            Pick any color using an interactive palette or enter HEX, RGB, or HSL values. Copy your color code instantly for use in any design or development project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Main Color Picker */}
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Color Preview */}
              <div
                className="w-full aspect-video rounded-lg bg-checkerboard overflow-hidden"
                style={{ backgroundColor: hex }}
              />

              {/* Saturation/Lightness Picker */}
              <div
                ref={pickerRef}
                className="relative w-full aspect-video rounded-lg cursor-crosshair overflow-hidden"
                style={{
                  background: `linear-gradient(to top, #000 0%, transparent 100%), linear-gradient(to right, #fff 0%, hsl(${color.h}, 100%, 50%) 100%)`,
                }}
                onMouseDown={handleMouseDown}
              >
                <div
                  className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    left: `${color.s}%`,
                    top: `${100 - color.l}%`,
                    backgroundColor: hex,
                  }}
                />
              </div>

              {/* Hue Slider */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Hue</Label>
                <div className="relative h-8 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={color.h}
                    onChange={(e) => setColor({ ...color, h: Number(e.target.value) })}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-gray-300 pointer-events-none"
                    style={{ left: `calc(${(color.h / 360) * 100}% - 8px)` }}
                  />
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-4 pt-2">
                <ColorInput label="Saturation" value={color.s} onChange={(v) => setColor({ ...color, s: v })} min={0} max={100} suffix="%" />
                <ColorInput label="Lightness" value={color.l} onChange={(v) => setColor({ ...color, l: v })} min={0} max={100} suffix="%" />
              </div>
            </CardContent>
          </Card>

          {/* Color Values */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="picker">Color Values</TabsTrigger>
                    <TabsTrigger value="palette">Saved Palette</TabsTrigger>
                  </TabsList>

                  <TabsContent value="picker" className="space-y-4 mt-4">
                    {/* HEX */}
                    <div className="space-y-2">
                      <Label htmlFor="hex" className="text-sm font-medium text-muted-foreground">HEX</Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">#</span>
                          <Input
                            id="hex"
                            value={hexInput.replace("#", "")}
                            onChange={(e) => handleHexChange("#" + e.target.value)}
                            className="pl-7 font-mono"
                            maxLength={6}
                          />
                        </div>
                        <div className="w-12 h-10 rounded border" style={{ backgroundColor: hex }} />
                        <CopyButton text={hex} field="HEX" />
                      </div>
                    </div>

                    {/* RGB */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">RGB</Label>
                      <div className="flex gap-2">
                        <Input
                          value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                          readOnly
                          className="font-mono flex-1"
                        />
                        <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} field="RGB" />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {(["r", "g", "b"] as const).map((channel) => (
                          <div key={channel} className="space-y-1">
                            <Label className="text-xs text-muted-foreground uppercase">{channel}</Label>
                            <Input
                              type="number"
                              value={rgb[channel.toUpperCase() as keyof typeof rgb]}
                              onChange={(e) => {
                                const val = Math.max(0, Math.min(255, Number(e.target.value)));
                                const newColor = { ...rgb, [channel.toUpperCase()]: val };
                                const newHsl = hexToHsl(hslToHex(
                                  Math.round(newColor.r),
                                  Math.round(newColor.g),
                                  Math.round(newColor.b)
                                ).replace("#", "") as any);
                                if (newHsl) setColor(newHsl);
                              }}
                              min={0}
                              max={255}
                              className="h-9 font-mono text-center"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* HSL */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">HSL</Label>
                      <div className="flex gap-2">
                        <Input
                          value={`hsl(${color.h}, ${color.s}%, ${color.l}%)`}
                          readOnly
                          className="font-mono flex-1"
                        />
                        <CopyButton text={`hsl(${color.h}, ${color.s}%, ${color.l}%)`} field="HSL" />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {(["h", "s", "l"] as const).map((channel) => (
                          <div key={channel} className="space-y-1">
                            <Label className="text-xs text-muted-foreground uppercase">{channel}</Label>
                            <Input
                              type="number"
                              value={color[channel]}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                const max = channel === "h" ? 360 : 100;
                                setColor({ ...color, [channel]: Math.max(0, Math.min(max, val)) });
                              }}
                              min={0}
                              max={channel === "h" ? 360 : 100}
                              className="h-9 font-mono text-center"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CMYK */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">CMYK</Label>
                      <div className="flex gap-2">
                        <Input
                          value={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`}
                          readOnly
                          className="font-mono flex-1"
                        />
                        <CopyButton text={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`} field="CMYK" />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                      <Button onClick={saveColor} className="flex-1">
                        Save to Palette
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setColor({ h: 260, s: 70, l: 55 })}
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="palette" className="mt-4">
                    {savedColors.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No saved colors yet</p>
                        <p className="text-sm mt-1">Click "Save to Palette" to add colors</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="grid grid-cols-6 gap-2">
                          {savedColors.map((savedColor) => (
                            <button
                              key={savedColor.id}
                              className="relative aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors bg-checkerboard group"
                              style={{ backgroundColor: savedColor.hex }}
                              onClick={() => loadSavedColor(savedColor.hex)}
                            >
                              <Button
                                variant="destructive"
                                size="sm"
                                className="absolute -top-2 -right-2 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeColor(savedColor.id);
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </button>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          className="w-full mt-4"
                          onClick={() => setSavedColors([])}
                        >
                          Clear All
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Preset Colors */}
            <Card>
              <CardContent className="p-6">
                <Label className="text-sm font-medium text-muted-foreground mb-3 block">
                  Quick Select
                </Label>
                <div className="grid grid-cols-10 gap-2">
                  {PRESET_COLORS.map((presetHex) => (
                    <button
                      key={presetHex}
                      className={`aspect-square rounded-md border-2 transition-all hover:scale-110 bg-checkerboard ${
                        hex.toLowerCase() === presetHex.toLowerCase()
                          ? "border-primary ring-2 ring-primary ring-offset-2"
                          : "border-border"
                      }`}
                      style={{ backgroundColor: presetHex }}
                      onClick={() => {
                        const hsl = hexToHsl(presetHex);
                        if (hsl) setColor(hsl);
                      }}
                      title={presetHex}
                    />
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
