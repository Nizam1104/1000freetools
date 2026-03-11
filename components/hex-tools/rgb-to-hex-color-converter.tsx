"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function RgbToHexColorConverter() {
  const [r, setR] = useState("0");
  const [g, setG] = useState("0");
  const [b, setB] = useState("0");
  const [output, setOutput] = useState("#000000");
  const [copied, setCopied] = useState(false);

  const rgbToHex = (red: number, green: number, blue: number) => {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, n)).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`.toUpperCase();
  };

  const getShortHex = (hex: string) => {
    if (
      hex[1] === hex[2] &&
      hex[3] === hex[4] &&
      hex[5] === hex[6]
    ) {
      return `#${hex[1]}${hex[3]}${hex[5]}`;
    }
    return hex;
  };

  const handleConvert = () => {
    const red = parseInt(r) || 0;
    const green = parseInt(g) || 0;
    const blue = parseInt(b) || 0;
    const hex = rgbToHex(red, green, blue);
    setOutput(hex);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClear = () => {
    setR("0");
    setG("0");
    setB("0");
    setOutput("#000000");
  };

  const shortHex = getShortHex(output);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">RGB to Hex Color Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert RGB color values to hexadecimal color codes
        </p>
      </div>

      <Card className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="red">Red (0-255)</Label>
                <Input
                  id="red"
                  type="number"
                  min="0"
                  max="255"
                  value={r}
                  onChange={(e) => setR(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="green">Green (0-255)</Label>
                <Input
                  id="green"
                  type="number"
                  min="0"
                  max="255"
                  value={g}
                  onChange={(e) => setG(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blue">Blue (0-255)</Label>
                <Input
                  id="blue"
                  type="number"
                  min="0"
                  max="255"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleConvert} className="flex-1">
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                Convert
              </Button>
              <Button variant="outline" onClick={handleClear}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Color Preview</Label>
            <div
              className="w-full h-32 rounded-lg border-2 border-border"
              style={{ backgroundColor: output }}
            />
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Hex:</span>
                <span className="font-mono font-bold">{output}</span>
              </div>
              {shortHex !== output && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Short:</span>
                  <span className="font-mono">{shortHex}</span>
                </div>
              )}
              <Button onClick={handleCopy} variant="outline" className="w-full">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Hex Code
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Common RGB to Hex Conversions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: "Black", rgb: "0, 0, 0", hex: "#000000" },
            { name: "White", rgb: "255, 255, 255", hex: "#FFFFFF" },
            { name: "Red", rgb: "255, 0, 0", hex: "#FF0000" },
            { name: "Green", rgb: "0, 255, 0", hex: "#00FF00" },
            { name: "Blue", rgb: "0, 0, 255", hex: "#0000FF" },
            { name: "Yellow", rgb: "255, 255, 0", hex: "#FFFF00" },
            { name: "Cyan", rgb: "0, 255, 255", hex: "#00FFFF" },
            { name: "Magenta", rgb: "255, 0, 255", hex: "#FF00FF" },
          ].map((color) => (
            <button
              key={color.name}
              onClick={() => {
                const [red, green, blue] = color.rgb.split(", ").map(Number);
                setR(red.toString());
                setG(green.toString());
                setB(blue.toString());
                setOutput(color.hex);
              }}
              className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-colors text-left"
            >
              <div
                className="w-8 h-8 rounded border"
                style={{ backgroundColor: color.hex }}
              />
              <div>
                <div className="font-medium text-sm">{color.name}</div>
                <div className="text-xs text-muted-foreground font-mono">{color.hex}</div>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
