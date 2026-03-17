"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Type } from "lucide-react";

export default function LetterSpacingTool() {
  const [text, setText] = useState("The quick brown fox");
  const [letterSpacing, setLetterSpacing] = useState("0");
  const [fontSize, setFontSize] = useState("32");
  const [fontWeight, setFontWeight] = useState("400");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [copied, setCopied] = useState(false);

  const presets = [
    { name: "Tight", value: "-2" },
    { name: "Normal", value: "0" },
    { name: "Loose", value: "2" },
    { name: "Very Loose", value: "5" },
    { name: "Extra Loose", value: "10" },
  ];

  const generateCSS = useCallback(() => {
    return `.text {
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  font-family: ${fontFamily};
  letter-spacing: ${letterSpacing}px;
}`;
  }, [fontSize, fontWeight, fontFamily, letterSpacing]);

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
              Letter Spacing Configuration
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
              <Label>Presets</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.name}
                    size="sm"
                    variant={letterSpacing === preset.value ? "default" : "outline"}
                    onClick={() => setLetterSpacing(preset.value)}
                  >
                    {preset.name} ({preset.value}px)
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="letterSpacing">Letter Spacing (px)</Label>
              <div className="flex items-center gap-4 mt-1">
                <Input
                  id="letterSpacing"
                  type="range"
                  min="-5"
                  max="20"
                  step="0.5"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(e.target.value)}
                  className="w-24"
                  step="0.5"
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
                  letterSpacing: `${letterSpacing}px`,
                }}
              >
                {text}
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <Label>Comparison</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm text-muted-foreground">Tight:</span>
                  <span style={{ fontFamily, fontSize: `${fontSize}px`, letterSpacing: "-2px" }}>{text}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm text-muted-foreground">Normal:</span>
                  <span style={{ fontFamily, fontSize: `${fontSize}px`, letterSpacing: "0px" }}>{text}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm text-muted-foreground">Loose:</span>
                  <span style={{ fontFamily, fontSize: `${fontSize}px`, letterSpacing: "5px" }}>{text}</span>
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
          <CardTitle>Alphabet Spacing Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <Label className="text-sm">Uppercase</Label>
              <p style={{ fontFamily, fontSize: "24px", letterSpacing: `${letterSpacing}px` }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <Label className="text-sm">Lowercase</Label>
              <p style={{ fontFamily, fontSize: "24px", letterSpacing: `${letterSpacing}px` }}>
                abcdefghijklmnopqrstuvwxyz
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <Label className="text-sm">Numbers</Label>
              <p style={{ fontFamily, fontSize: "24px", letterSpacing: `${letterSpacing}px` }}>
                0123456789
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
