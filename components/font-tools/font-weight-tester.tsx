"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Type } from "lucide-react";

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "How vexingly quick daft zebras jump!",
  "Sphinx of black quartz, judge my vow.",
  "Two driven jocks help fax my big quiz.",
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "abcdefghijklmnopqrstuvwxyz",
  "0123456789",
  "Illil1lL O0oQ S5s B8",
];

export default function FontWeightTester() {
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [fontSize, setFontSize] = useState("24");
  const [sampleText, setSampleText] = useState(sampleTexts[0]);
  const [customText, setCustomText] = useState("");
  const [copied, setCopied] = useState(false);

  const fontWeights = [
    { value: "100", label: "100 - Thin", preview: "Thin" },
    { value: "200", label: "200 - Extra Light", preview: "Extra Light" },
    { value: "300", label: "300 - Light", preview: "Light" },
    { value: "400", label: "400 - Normal", preview: "Normal" },
    { value: "500", label: "500 - Medium", preview: "Medium" },
    { value: "600", label: "600 - Semi Bold", preview: "Semi Bold" },
    { value: "700", label: "700 - Bold", preview: "Bold" },
    { value: "800", label: "800 - Extra Bold", preview: "Extra Bold" },
    { value: "900", label: "900 - Black", preview: "Black" },
  ];

  const copyToClipboard = useCallback(async () => {
    const text = fontWeights.map((w) => 
      `${w.label}: ${sampleText || customText}`
    ).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [sampleText, customText]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            Font Weight Tester Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="font">Font Family</Label>
              <select
                id="font"
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
                <option value="Courier New">Courier New</option>
                <option value="Impact">Impact</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Garamond">Garamond</option>
                <option value="Palatino">Palatino</option>
              </select>
            </div>
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
              <Label htmlFor="sampleText">Sample Text</Label>
              <select
                id="sampleText"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                {sampleTexts.map((text, index) => (
                  <option key={index} value={text}>
                    {text.length > 40 ? text.substring(0, 40) + "..." : text}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="customText">Or Enter Custom Text</Label>
            <Input
              id="customText"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Type your own text..."
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Font Weight Comparison</h2>
        <Button variant="outline" onClick={copyToClipboard}>
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
          Copy All
        </Button>
      </div>

      <div className="space-y-4">
        {fontWeights.map((weight) => (
          <Card key={weight.value}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-32 flex-shrink-0">
                  <span className="text-sm font-semibold">{weight.label}</span>
                </div>
                <div
                  style={{
                    fontFamily: selectedFont,
                    fontSize: `${fontSize}px`,
                    fontWeight: weight.value,
                  }}
                  className="flex-1"
                >
                  {customText || sampleText}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Font Weight Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold mb-2">Light Weights (100-300)</h4>
              <p className="text-sm text-muted-foreground">
                Best for large display text, elegant designs, and when you want a light, airy feel.
                Avoid for body text or small sizes.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold mb-2">Regular Weights (400-500)</h4>
              <p className="text-sm text-muted-foreground">
                Ideal for body text and general content. Provides good readability at all sizes.
                The standard choice for most text.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold mb-2">Bold Weights (600-900)</h4>
              <p className="text-sm text-muted-foreground">
                Perfect for headings, emphasis, and call-to-action elements. Use sparingly for
                maximum impact.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
