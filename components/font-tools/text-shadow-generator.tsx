"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Type, Droplet } from "lucide-react";

const shadowPresets = [
  { name: "Subtle", h: "1px", v: "1px", blur: "2px", spread: "0", color: "rgba(0,0,0,0.1)" },
  { name: "Medium", h: "2px", v: "2px", "4px": "4px", spread: "0", color: "rgba(0,0,0,0.2)" },
  { name: "Bold", h: "3px", v: "3px", blur: "6px", spread: "0", color: "rgba(0,0,0,0.3)" },
  { name: "Neon", h: "0", v: "0", blur: "10px", spread: "0", color: "#00ffff" },
  { name: "Glow", h: "0", v: "0", blur: "20px", spread: "0", color: "rgba(255,255,255,0.8)" },
  { name: "Retro", h: "4px", v: "4px", blur: "0", spread: "0", color: "rgba(0,0,0,0.5)" },
  { name: "3D", h: "1px", v: "1px", blur: "0", spread: "0", color: "rgba(0,0,0,0.8)" },
  { name: "Double", h: "2px", v: "2px", blur: "4px", spread: "0", color: "rgba(0,0,0,0.3), 4px 4px 8px rgba(0,0,0,0.2)" },
];

export default function TextShadowGenerator() {
  const [text, setText] = useState("Shadow Text");
  const [horizontal, setHorizontal] = useState("2");
  const [vertical, setVertical] = useState("2");
  const [blur, setBlur] = useState("4");
  const [spread, setSpread] = useState("0");
  const [shadowColor, setShadowColor] = useState("rgba(0,0,0,0.3)");
  const [textColor, setTextColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("#1a1a2e");
  const [fontSize, setFontSize] = useState("48");
  const [fontWeight, setFontWeight] = useState("700");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [copied, setCopied] = useState(false);

  const applyPreset = useCallback((preset: typeof shadowPresets[0]) => {
    setHorizontal(preset.h);
    setVertical(preset.v);
    setBlur("blur" in preset ? (preset as any).blur : "0");
    setShadowColor(preset.color);
  }, []);

  const generateCSS = useCallback(() => {
    const shadow = `${horizontal}px ${vertical}px ${blur}px ${spread}px ${shadowColor}`;
    return `.text-shadow {
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  font-family: ${fontFamily};
  color: ${textColor};
  text-shadow: ${shadow};
}`;
  }, [horizontal, vertical, blur, spread, shadowColor, fontSize, fontWeight, fontFamily, textColor]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generateCSS());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [generateCSS]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="w-5 h-5" />
              Shadow Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Shadow Presets</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {shadowPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    size="sm"
                    variant="outline"
                    onClick={() => applyPreset(preset)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="text">Text</Label>
              <Input
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="horizontal">H-Offset (px)</Label>
                <Input
                  id="horizontal"
                  type="number"
                  value={horizontal}
                  onChange={(e) => setHorizontal(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="vertical">V-Offset (px)</Label>
                <Input
                  id="vertical"
                  type="number"
                  value={vertical}
                  onChange={(e) => setVertical(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="blur">Blur (px)</Label>
                <Input
                  id="blur"
                  type="number"
                  value={blur}
                  onChange={(e) => setBlur(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="spread">Spread (px)</Label>
                <Input
                  id="spread"
                  type="number"
                  value={spread}
                  onChange={(e) => setSpread(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shadowColor">Shadow Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="shadowColor"
                    type="color"
                    value={shadowColor.startsWith("#") ? shadowColor : "#000000"}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="flex-1"
                    placeholder="rgba(0,0,0,0.3)"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="textColor">Text Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="textColor"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="backgroundColor">Background Color</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="backgroundColor"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="fontSize">Font Size (px)</Label>
                <Input
                  id="fontSize"
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="fontWeight">Font Weight</Label>
                <select
                  id="fontWeight"
                  value={fontWeight}
                  onChange={(e) => setFontWeight(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md bg-background"
                >
                  <option value="400">Normal</option>
                  <option value="600">Semi Bold</option>
                  <option value="700">Bold</option>
                  <option value="800">Extra Bold</option>
                  <option value="900">Black</option>
                </select>
              </div>
              <div>
                <Label htmlFor="fontFamily">Font Family</Label>
                <select
                  id="fontFamily"
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value || "Arial")}
                  className="w-full mt-1 p-2 border rounded-md bg-background"
                >
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Impact">Impact</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5" />
              Preview & CSS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="p-6 rounded-lg flex items-center justify-center min-h-[150px]"
              style={{ backgroundColor }}
            >
              <h2
                style={{
                  fontSize: `${fontSize}px`,
                  fontWeight,
                  fontFamily,
                  color: textColor,
                  textShadow: `${horizontal}px ${vertical}px ${blur}px ${spread}px ${shadowColor}`,
                }}
              >
                {text}
              </h2>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <Label>Multiple Shadows Example</Label>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  fontFamily: "Arial",
                  color: "#fff",
                  textShadow: `
                    1px 1px 0 #999,
                    2px 2px 0 #999,
                    3px 3px 0 #999,
                    4px 4px 0 #999,
                    5px 5px 10px rgba(0,0,0,0.5)
                  `,
                }}
                className="mt-2"
              >
                Layered Shadow
              </p>
            </div>

            <div className="relative">
              <Label>CSS Code</Label>
              <Textarea
                value={generateCSS()}
                readOnly
                className="mt-1 font-mono text-xs h-40"
              />
              <Button
                size="sm"
                variant="outline"
                className="absolute top-8 right-2"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
