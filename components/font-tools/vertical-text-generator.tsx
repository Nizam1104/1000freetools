"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Type, ArrowDownToLine } from "lucide-react";

export default function VerticalTextGenerator() {
  const [text, setText] = useState("Vertical Text");
  const [writingMode, setWritingMode] = useState("vertical-rl");
  const [textOrientation, setTextOrientation] = useState("mixed");
  const [fontSize, setFontSize] = useState("32");
  const [fontWeight, setFontWeight] = useState("400");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [letterSpacing, setLetterSpacing] = useState("0");
  const [copied, setCopied] = useState(false);

  const generateCSS = useCallback(() => {
    return `.vertical-text {
  writing-mode: ${writingMode};
  text-orientation: ${textOrientation};
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  font-family: ${fontFamily};
  letter-spacing: ${letterSpacing}px;
}`;
  }, [writingMode, textOrientation, fontSize, fontWeight, fontFamily, letterSpacing]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generateCSS());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [generateCSS]);

  const characterByCharacter = text.split("").join("\n");

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowDownToLine className="w-5 h-5" />
              Vertical Text Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="text">Text</Label>
              <Input
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="writingMode">Writing Mode</Label>
              <select
                id="writingMode"
                value={writingMode}
                onChange={(e) => setWritingMode(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                <option value="vertical-rl">Vertical Right-to-Left (Traditional)</option>
                <option value="vertical-lr">Vertical Left-to-Right</option>
                <option value="horizontal-tb">Horizontal Top-to-Bottom</option>
              </select>
            </div>

            <div>
              <Label htmlFor="textOrientation">Text Orientation</Label>
              <select
                id="textOrientation"
                value={textOrientation}
                onChange={(e) => setTextOrientation(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                <option value="mixed">Mixed (Auto)</option>
                <option value="upright">Upright (All characters upright)</option>
                <option value="sideways">Sideways (All characters rotated)</option>
                <option value="use-glyph-orientation">Use Glyph Orientation</option>
              </select>
            </div>

            <div>
              <Label htmlFor="letterSpacing">Letter Spacing (px)</Label>
              <Input
                id="letterSpacing"
                type="number"
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(e.target.value)}
                className="mt-1"
              />
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
                  <option value="Courier New">Courier New</option>
                  <option value="Impact">Impact</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <Label>Alternative: Character by Character</Label>
              <p className="text-xs text-muted-foreground mt-1">
                For browsers without writing-mode support
              </p>
              <Textarea
                value={characterByCharacter}
                readOnly
                className="mt-2 font-mono text-sm h-24"
              />
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
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg flex items-center justify-center min-h-[200px]">
                <div
                  style={{
                    writingMode,
                    textOrientation,
                    fontSize: `${fontSize}px`,
                    fontWeight,
                    fontFamily,
                    letterSpacing: `${letterSpacing}px`,
                  }}
                >
                  {text}
                </div>
              </div>
              <div className="p-4 border rounded-lg flex items-center justify-center min-h-[200px]">
                <div
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "upright",
                    fontSize: `${fontSize}px`,
                    fontWeight,
                    fontFamily,
                    letterSpacing: `${letterSpacing}px`,
                  }}
                >
                  {text}
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <Label>Comparison of Writing Modes</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="border rounded p-2 text-center">
                  <p className="text-xs text-muted-foreground mb-1">vertical-rl</p>
                  <div style={{ writingMode: "vertical-rl", fontSize: "14px" }}>{text}</div>
                </div>
                <div className="border rounded p-2 text-center">
                  <p className="text-xs text-muted-foreground mb-1">vertical-lr</p>
                  <div style={{ writingMode: "vertical-lr", fontSize: "14px" }}>{text}</div>
                </div>
                <div className="border rounded p-2 text-center">
                  <p className="text-xs text-muted-foreground mb-1">horizontal</p>
                  <div style={{ writingMode: "horizontal-tb", fontSize: "14px" }}>{text}</div>
                </div>
              </div>
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

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Use Cases for Vertical Text</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold mb-2">Asian Languages</h4>
              <p className="text-sm text-muted-foreground">
                Traditional Chinese, Japanese, and Korean text is often written vertically,
                reading from top to bottom, right to left.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold mb-2">Side Labels</h4>
              <p className="text-sm text-muted-foreground">
                Perfect for spine labels, book titles on shelves, or sidebar navigation
                elements in web design.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold mb-2">Creative Design</h4>
              <p className="text-sm text-muted-foreground">
                Use vertical text for artistic layouts, posters, and unique typographic
                treatments in digital and print media.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
