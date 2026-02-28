"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, RotateCcw, Search } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CSS_COLORS: Record<string, string> = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32",
};

export default function CssColorNameConverterPage() {
  const [colorName, setColorName] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const hex = selectedColor ? CSS_COLORS[selectedColor.toLowerCase()] : null;

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const cleanHex = hex.replace("#", "").trim();
    if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) return null;
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  };

  const hexToHsl = (hex: string): { h: number; s: number; l: number } | null => {
    const cleanHex = hex.replace("#", "").trim();
    if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) return null;
    
    let r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    let g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    let b = parseInt(cleanHex.substring(4, 6), 16) / 255;
    
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

  const rgb = hex ? hexToRgb(hex) : null;
  const hsl = hex ? hexToHsl(hex) : null;

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
    setColorName("");
    setSelectedColor("");
  };

  const handleSelectChange = (value: string) => {
    setSelectedColor(value);
    setColorName(value);
  };

  const filteredColors = Object.keys(CSS_COLORS).filter((name) =>
    name.toLowerCase().includes(colorName.toLowerCase())
  ).slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">CSS Color Name Converter</h1>
          <p className="text-muted-foreground">
            Convert CSS color names to HEX, RGB, and HSL values
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="colorName" className="text-sm font-medium text-muted-foreground">
                  CSS Color Name
                </Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="colorName"
                      value={colorName}
                      onChange={(e) => setColorName(e.target.value)}
                      placeholder="Search colors..."
                      className="pl-9"
                    />
                  </div>
                  {(colorName || selectedColor) && (
                    <Button variant="outline" size="icon" onClick={handleClear}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {colorName && filteredColors.length > 0 && !selectedColor && (
                  <div className="border rounded-md max-h-48 overflow-y-auto">
                    {filteredColors.map((name) => (
                      <button
                        key={name}
                        className="w-full flex items-center gap-2 p-2 hover:bg-muted text-left"
                        onClick={() => handleSelectChange(name)}
                      >
                        <div
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: CSS_COLORS[name] }}
                        />
                        <span className="font-mono text-sm">{name}</span>
                        <span className="text-xs text-muted-foreground ml-auto">{CSS_COLORS[name]}</span>
                      </button>
                    ))}
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  Type a CSS color name (e.g., "red", "blue", "coral")
                </p>
              </div>

              {selectedColor && hex && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-muted-foreground mb-2 block">Preview</Label>
                      <div
                        className="w-full aspect-video rounded-lg border bg-checkerboard"
                        style={{ backgroundColor: hex }}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-md bg-muted">
                    <p className="text-sm font-medium mb-1">Selected Color</p>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border" style={{ backgroundColor: hex }} />
                      <span className="font-mono">{selectedColor}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold mb-4">Color Values</h2>

              {hex && rgb && hsl ? (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">HEX</Label>
                    <div className="flex gap-2">
                      <Input value={hex.toUpperCase()} readOnly className="font-mono flex-1" />
                      <CopyButton text={hex.toUpperCase()} field="HEX" />
                    </div>
                  </div>

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
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">HSL</Label>
                    <div className="flex gap-2">
                      <Input
                        value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                        readOnly
                        className="font-mono flex-1"
                      />
                      <CopyButton text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} field="HSL" />
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <Label className="text-sm font-medium text-muted-foreground">CSS Usage</Label>
                    <div className="flex gap-2">
                      <Input
                        value={`color: ${selectedColor}; /* or ${hex.toUpperCase()} */`}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <CopyButton text={`color: ${selectedColor};`} field="CSS" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Enter a CSS color name to see its values</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-3">Popular CSS Colors</h3>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan", "black", "white"].map((color) => (
                <button
                  key={color}
                  className="aspect-square rounded-md border-2 border-border hover:border-primary transition-colors bg-checkerboard"
                  style={{ backgroundColor: CSS_COLORS[color] }}
                  onClick={() => handleSelectChange(color)}
                  title={color}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Click a color to select it
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-3">How to use</h3>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Type a CSS color name in the search box (e.g., "coral", "navy", "tomato")</li>
              <li>Select the color from the dropdown suggestions</li>
              <li>View the HEX, RGB, and HSL values instantly</li>
              <li>Click the copy button to copy any format to your clipboard</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
