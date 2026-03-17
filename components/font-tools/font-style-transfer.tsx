"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Sparkles } from "lucide-react";

export default function FontStyleTransfer() {
  const [sourceText, setSourceText] = useState("Hello World");
  const [targetStyle, setTargetStyle] = useState("bold");
  const [fontSize, setFontSize] = useState("32");
  const [fontWeight, setFontWeight] = useState("400");
  const [fontStyle, setFontStyle] = useState("normal");
  const [textTransform, setTextTransform] = useState("none");
  const [textDecoration, setTextDecoration] = useState("none");
  const [letterSpacing, setLetterSpacing] = useState("0");
  const [wordSpacing, setWordSpacing] = useState("0");
  const [fontVariant, setFontVariant] = useState("normal");
  const [copied, setCopied] = useState(false);

  const stylePresets = [
    { name: "Bold", weight: "700", style: "normal", transform: "none", decoration: "none" },
    { name: "Italic", weight: "400", style: "italic", transform: "none", decoration: "none" },
    { name: "Bold Italic", weight: "700", style: "italic", transform: "none", decoration: "none" },
    { name: "Uppercase", weight: "400", style: "normal", transform: "uppercase", decoration: "none" },
    { name: "Underline", weight: "400", style: "normal", transform: "none", decoration: "underline" },
    { name: "Strikethrough", weight: "400", style: "normal", transform: "none", decoration: "line-through" },
    { name: "Small Caps", weight: "400", style: "normal", transform: "none", decoration: "none", variant: "small-caps" },
    { name: "Wide", weight: "400", style: "normal", transform: "none", decoration: "none", spacing: "5" },
  ];

  const applyPreset = useCallback((preset: typeof stylePresets[0]) => {
    setFontWeight(preset.weight);
    setFontStyle(preset.style);
    setTextTransform(preset.transform);
    setTextDecoration(preset.decoration);
    if (preset.variant) setFontVariant(preset.variant);
    if (preset.spacing) setLetterSpacing(preset.spacing);
  }, []);

  const generateCSS = useCallback(() => {
    return `.custom-text {
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  font-style: ${fontStyle};
  text-transform: ${textTransform};
  text-decoration: ${textDecoration};
  letter-spacing: ${letterSpacing}px;
  word-spacing: ${wordSpacing}px;
  font-variant: ${fontVariant};
}`;
  }, [fontSize, fontWeight, fontStyle, textTransform, textDecoration, letterSpacing, wordSpacing, fontVariant]);

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
              <Sparkles className="w-5 h-5" />
              Style Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {stylePresets.map((preset) => (
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

            <div>
              <Label htmlFor="sourceText">Text</Label>
              <Input
                id="sourceText"
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                  <option value="100">100 - Thin</option>
                  <option value="200">200 - Extra Light</option>
                  <option value="300">300 - Light</option>
                  <option value="400">400 - Normal</option>
                  <option value="500">500 - Medium</option>
                  <option value="600">600 - Semi Bold</option>
                  <option value="700">700 - Bold</option>
                  <option value="800">800 - Extra Bold</option>
                  <option value="900">900 - Black</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fontStyle">Font Style</Label>
                <select
                  id="fontStyle"
                  value={fontStyle}
                  onChange={(e) => setFontStyle(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md bg-background"
                >
                  <option value="normal">Normal</option>
                  <option value="italic">Italic</option>
                  <option value="oblique">Oblique</option>
                </select>
              </div>
              <div>
                <Label htmlFor="textTransform">Text Transform</Label>
                <select
                  id="textTransform"
                  value={textTransform}
                  onChange={(e) => setTextTransform(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md bg-background"
                >
                  <option value="none">None</option>
                  <option value="uppercase">Uppercase</option>
                  <option value="lowercase">Lowercase</option>
                  <option value="capitalize">Capitalize</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="textDecoration">Text Decoration</Label>
                <select
                  id="textDecoration"
                  value={textDecoration}
                  onChange={(e) => setTextDecoration(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md bg-background"
                >
                  <option value="none">None</option>
                  <option value="underline">Underline</option>
                  <option value="overline">Overline</option>
                  <option value="line-through">Line-through</option>
                  <option value="underline line-through">Underline + Line-through</option>
                </select>
              </div>
              <div>
                <Label htmlFor="fontVariant">Font Variant</Label>
                <select
                  id="fontVariant"
                  value={fontVariant}
                  onChange={(e) => setFontVariant(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md bg-background"
                >
                  <option value="normal">Normal</option>
                  <option value="small-caps">Small Caps</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <Label htmlFor="wordSpacing">Word Spacing (px)</Label>
                <Input
                  id="wordSpacing"
                  type="number"
                  value={wordSpacing}
                  onChange={(e) => setWordSpacing(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview & CSS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-6 border rounded-lg text-center">
              <p
                style={{
                  fontSize: `${fontSize}px`,
                  fontWeight,
                  fontStyle,
                  textTransform,
                  textDecoration,
                  letterSpacing: `${letterSpacing}px`,
                  wordSpacing: `${wordSpacing}px`,
                  fontVariant,
                }}
              >
                {sourceText}
              </p>
            </div>

            <div className="relative">
              <Label>Generated CSS</Label>
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
              <Label>Inline Style</Label>
              <code className="text-xs block mt-2 break-all">
                {`style={{ fontSize: '${fontSize}px', fontWeight: '${fontWeight}', fontStyle: '${fontStyle}', textTransform: '${textTransform}', textDecoration: '${textDecoration}', letterSpacing: '${letterSpacing}px', wordSpacing: '${wordSpacing}px', fontVariant: '${fontVariant}' }}`}
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
