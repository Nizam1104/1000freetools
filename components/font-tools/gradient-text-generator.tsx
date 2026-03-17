"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Palette } from "lucide-react";

const gradientPresets = [
  { name: "Sunset", from: "#ff6b6b", to: "#feca57" },
  { name: "Ocean", from: "#667eea", to: "#764ba2" },
  { name: "Forest", from: "#11998e", to: "#38ef7d" },
  { name: "Fire", from: "#f12711", to: "#f5af19" },
  { name: "Purple Rain", from: "#667eea", to: "#764ba2" },
  { name: "Pink Flamingo", from: "#f093fb", to: "#f5576c" },
  { name: "Blue Lagoon", from: "#4facfe", to: "#00f2fe" },
  { name: "Golden Hour", from: "#FFD700", to: "#FF6347" },
  { name: "Midnight", from: "#2c3e50", to: "#4ca1af" },
  { name: "Candy", from: "#ff9a9e", to: "#fecfef" },
];

export default function GradientTextGenerator() {
  const [text, setText] = useState("Gradient Text");
  const [fromColor, setFromColor] = useState("#667eea");
  const [toColor, setToColor] = useState("#764ba2");
  const [direction, setDirection] = useState("to right");
  const [fontSize, setFontSize] = useState("48");
  const [fontWeight, setFontWeight] = useState("700");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [copied, setCopied] = useState(false);

  const applyPreset = useCallback((preset: typeof gradientPresets[0]) => {
    setFromColor(preset.from);
    setToColor(preset.to);
  }, []);

  const generateCSS = useCallback(() => {
    return `.gradient-text {
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  font-family: ${fontFamily};
  background: linear-gradient(${direction}, ${fromColor}, ${toColor});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}`;
  }, [fontSize, fontWeight, fontFamily, direction, fromColor, toColor]);

  const generateInlineStyle = useCallback(() => {
    return {
      fontSize: `${fontSize}px`,
      fontWeight,
      fontFamily,
      background: `linear-gradient(${direction}, ${fromColor}, ${toColor})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
    };
  }, [fontSize, fontWeight, fontFamily, direction, fromColor, toColor]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generateCSS());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [generateCSS]);

  const directions = [
    { value: "to right", label: "Left → Right" },
    { value: "to left", label: "Right → Left" },
    { value: "to bottom", label: "Top → Bottom" },
    { value: "to top", label: "Bottom → Top" },
    { value: "45deg", label: "Diagonal ↗" },
    { value: "135deg", label: "Diagonal ↘" },
    { value: "225deg", label: "Diagonal ↙" },
    { value: "315deg", label: "Diagonal ↖" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Gradient Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Gradient Presets</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {gradientPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="w-12 h-12 rounded-lg border-2 hover:scale-110 transition-transform"
                    style={{
                      background: `linear-gradient(135deg, ${preset.from}, ${preset.to})`,
                    }}
                    title={preset.name}
                  />
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fromColor">From Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="fromColor"
                    type="color"
                    value={fromColor}
                    onChange={(e) => setFromColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={fromColor}
                    onChange={(e) => setFromColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="toColor">To Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="toColor"
                    type="color"
                    value={toColor}
                    onChange={(e) => setToColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={toColor}
                    onChange={(e) => setToColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="direction">Gradient Direction</Label>
              <select
                id="direction"
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                {directions.map((dir) => (
                  <option key={dir.value} value={dir.value}>
                    {dir.label}
                  </option>
                ))}
              </select>
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
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md bg-background"
                >
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Impact">Impact</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview & CSS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-6 border rounded-lg flex items-center justify-center min-h-[150px]">
              <h2
                style={generateInlineStyle()}
              >
                {text}
              </h2>
            </div>

            <div className="relative">
              <Label>CSS Code</Label>
              <Textarea
                value={generateCSS()}
                readOnly
                className="mt-1 font-mono text-xs h-48"
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

            <div className="p-4 bg-muted rounded-lg">
              <Label>React Inline Style</Label>
              <code className="text-xs block mt-2 break-all">
                {JSON.stringify(generateInlineStyle(), null, 2)}
              </code>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Multi-Color Gradient</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <h3
                style={{
                  background: "linear-gradient(to right, #ff6b6b, #feca57, #48dbfb)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                Three Colors
              </h3>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <h3
                style={{
                  background: "linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                Four Colors
              </h3>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <h3
                style={{
                  background: "linear-gradient(to bottom, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                Rainbow
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
