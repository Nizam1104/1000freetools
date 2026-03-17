"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Type } from "lucide-react";

export default function LineHeightGenerator() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog. This is a sample text to demonstrate different line height values. Multiple lines help visualize the spacing between lines of text.");
  const [lineHeight, setLineHeight] = useState("1.5");
  const [fontSize, setFontSize] = useState("18");
  const [fontWeight, setFontWeight] = useState("400");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [copied, setCopied] = useState(false);

  const presets = [
    { name: "Tight", value: "1.0" },
    { name: "Normal", value: "1.5" },
    { name: "Relaxed", value: "1.75" },
    { name: "Loose", value: "2.0" },
    { name: "Very Loose", value: "2.5" },
  ];

  const generateCSS = useCallback(() => {
    return `.text {
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  font-family: ${fontFamily};
  line-height: ${lineHeight};
}`;
  }, [fontSize, fontWeight, fontFamily, lineHeight]);

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
              <Type className="w-5 h-5" />
              Line Height Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="text">Text</Label>
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-1"
                rows={4}
              />
            </div>

            <div>
              <Label>Presets</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.name}
                    size="sm"
                    variant={lineHeight === preset.value ? "default" : "outline"}
                    onClick={() => setLineHeight(preset.value)}
                  >
                    {preset.name} ({preset.value})
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="lineHeight">Line Height</Label>
              <div className="flex items-center gap-4 mt-1">
                <Input
                  id="lineHeight"
                  type="range"
                  min="0.8"
                  max="3"
                  step="0.1"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(e.target.value)}
                  className="w-24"
                  step="0.1"
                  min="0.5"
                  max="4"
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
                  <option value="300">Light</option>
                  <option value="400">Normal</option>
                  <option value="600">Semi Bold</option>
                  <option value="700">Bold</option>
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
                  <option value="Courier New">Courier New</option>
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
            <div className="p-6 border rounded-lg">
              <p
                style={{
                  fontSize: `${fontSize}px`,
                  fontWeight,
                  fontFamily,
                  lineHeight,
                }}
              >
                {text}
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <Label>Comparison</Label>
              <div className="space-y-4 mt-2">
                <div>
                  <span className="text-xs text-muted-foreground">Tight (1.0):</span>
                  <p style={{ fontSize: "14px", fontFamily, lineHeight: 1.0 }}>{text}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Normal (1.5):</span>
                  <p style={{ fontSize: "14px", fontFamily, lineHeight: 1.5 }}>{text}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Loose (2.0):</span>
                  <p style={{ fontSize: "14px", fontFamily, lineHeight: 2 }}>{text}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Label>CSS Code</Label>
              <Textarea
                value={generateCSS()}
                readOnly
                className="mt-1 font-mono text-xs h-32"
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

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Line Height Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold mb-2">Tight (1.0 - 1.2)</h4>
              <p className="text-sm text-muted-foreground">
                Best for headlines and short text. Can cause readability issues with longer content.
                Use sparingly for impact.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold mb-2">Normal (1.4 - 1.6)</h4>
              <p className="text-sm text-muted-foreground">
                Ideal for body text. Provides good balance between readability and space efficiency.
                Default for most content.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold mb-2">Loose (1.8 - 2.5+)</h4>
              <p className="text-sm text-muted-foreground">
                Great for elegant designs and improved readability. Use for quotes, poetry, or
                when you want an airy feel.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
