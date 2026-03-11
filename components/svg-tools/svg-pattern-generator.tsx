"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function SvgPatternGenerator() {
  const [patternType, setPatternType] = useState<"stripes" | "dots" | "grid" | "checkerboard" | "zigzag" | "waves">("stripes");
  const [size, setSize] = useState(20);
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#ffffff");
  const [rotation, setRotation] = useState(0);
  const [output, setOutput] = useState("");

  const generatePattern = () => {
    const patternId = `pattern-${patternType}`;
    let patternContent = "";

    switch (patternType) {
      case "stripes":
        patternContent = `
  <rect width="${size}" height="${size}" fill="${color2}"/>
  <line x1="0" y1="0" x2="0" y2="${size}" stroke="${color1}" stroke-width="${size / 4}" />
`;
        break;
      case "dots":
        patternContent = `
  <rect width="${size}" height="${size}" fill="${color2}"/>
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 6}" fill="${color1}" />
`;
        break;
      case "grid":
        patternContent = `
  <rect width="${size}" height="${size}" fill="${color2}"/>
  <line x1="0" y1="0" x2="${size}" y2="0" stroke="${color1}" stroke-width="1" />
  <line x1="0" y1="0" x2="0" y2="${size}" stroke="${color1}" stroke-width="1" />
`;
        break;
      case "checkerboard":
        patternContent = `
  <rect width="${size}" height="${size}" fill="${color2}"/>
  <rect width="${size / 2}" height="${size / 2}" fill="${color1}"/>
  <rect x="${size / 2}" y="${size / 2}" width="${size / 2}" height="${size / 2}" fill="${color1}"/>
`;
        break;
      case "zigzag":
        patternContent = `
  <rect width="${size}" height="${size}" fill="${color2}"/>
  <polyline points="0,${size / 2} ${size / 4},0 ${size * 3 / 4},${size} ${size},${size / 2}" 
            fill="none" stroke="${color1}" stroke-width="${size / 8}" />
`;
        break;
      case "waves":
        patternContent = `
  <rect width="${size}" height="${size}" fill="${color2}"/>
  <path d="M0,${size / 2} Q${size / 4},0 ${size / 2},${size / 2} T${size},${size / 2}" 
        fill="none" stroke="${color1}" stroke-width="${size / 8}" />
`;
        break;
    }

    const svg = `<svg width="${size * 4}" height="${size * 4}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="${patternId}" x="0" y="0" width="${size}" height="${size}" patternUnits="userSpaceOnUse"${rotation !== 0 ? ` patternTransform="rotate(${rotation})"` : ""}>${patternContent}
    </pattern>
  </defs>
  <rect width="${size * 4}" height="${size * 4}" fill="url(#${patternId})"/>
</svg>`;

    setOutput(svg);
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pattern.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">SVG Pattern Generator</h2>
        <p className="text-sm text-muted-foreground">
          Generate SVG pattern definitions for use as fills
        </p>
      </div>

      <Card className="p-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>Pattern Type</Label>
            <div className="flex flex-wrap gap-2">
              {(["stripes", "dots", "grid", "checkerboard", "zigzag", "waves"] as const).map((type) => (
                <Button
                  key={type}
                  variant={patternType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPatternType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Pattern Size: {size}px</Label>
            <Input
              id="size"
              type="range"
              min="10"
              max="100"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rotation">Rotation: {rotation}°</Label>
            <Input
              id="rotation"
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color1">Primary Color</Label>
            <div className="flex gap-2">
              <Input
                id="color1"
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-16 h-10"
              />
              <Input
                type="text"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color2">Background Color</Label>
            <div className="flex gap-2">
              <Input
                id="color2"
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="w-16 h-10"
              />
              <Input
                type="text"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="font-mono"
              />
            </div>
          </div>

          <div className="flex items-end">
            <Button onClick={generatePattern} className="w-full">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Generate Pattern
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={generatePattern} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Generate
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!output}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Preview</h3>
            <div className="border rounded-lg overflow-hidden" dangerouslySetInnerHTML={{ __html: output }} />
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">SVG Code</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleCopy();
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto max-h-[300px]">
              {output}
            </pre>
          </Card>
        </div>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">How to Use</h3>
        <p className="text-sm text-muted-foreground">
          Copy the generated SVG pattern and use it as a fill in your SVG elements.
          Reference the pattern using <code className="bg-muted px-1 rounded">fill="url(#pattern-{patternType})"</code>
        </p>
      </Card>
    </div>
  );
}
