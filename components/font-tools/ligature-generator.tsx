"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Type } from "lucide-react";

const ligatureExamples = [
  { chars: "fi", ligature: "ﬁ", description: "f + i ligature" },
  { chars: "fl", ligature: "ﬂ", description: "f + l ligature" },
  { chars: "ff", ligature: "ﬀ", description: "f + f ligature" },
  { chars: "ffi", ligature: "ﬃ", description: "f + f + i ligature" },
  { chars: "ffl", ligature: "ﬄ", description: "f + f + l ligature" },
  { chars: "ft", ligature: "ﬅ", description: "f + t ligature" },
  { chars: "st", ligature: "ﬆ", description: "s + t ligature" },
  { chars: "ct", ligature: "ꜩ", description: "c + t ligature" },
];

export default function LigatureGenerator() {
  const [text, setText] = useState("office efficient fly");
  const [enableLigatures, setEnableLigatures] = useState(true);
  const [fontSize, setFontSize] = useState("48");
  const [fontFamily, setFontFamily] = useState("Georgia");
  const [copied, setCopied] = useState(false);

  const fontsSupportingLigatures = [
    "Georgia",
    "Times New Roman",
    "Palatino",
    "Garamond",
    "Book Antiqua",
    "Hoefler Text",
    "Didot",
    "Andale Mono",
  ];

  const generateCSS = useCallback(() => {
    return `.text-with-ligatures {
  font-size: ${fontSize}px;
  font-family: ${fontFamily};
  font-variant-ligatures: ${enableLigatures ? "common-ligatures contextual" : "no-common-ligatures"};
  font-feature-settings: "liga" ${enableLigatures ? "1" : "0"}, "clig" ${enableLigatures ? "1" : "0"};
}`;
  }, [fontSize, fontFamily, enableLigatures]);

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
              Ligature Configuration
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
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Try words like: office, efficient, fly, affect, staff
              </p>
            </div>

            <div>
              <Label htmlFor="fontFamily">Font Family</Label>
              <select
                id="fontFamily"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                {fontsSupportingLigatures.map((font) => (
                  <option key={font} value={font}>{font}</option>
                ))}
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

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={enableLigatures}
                  onChange={(e) => setEnableLigatures(e.target.checked)}
                />
                Enable Ligatures
              </label>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <Label>Font Feature Settings</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={enableLigatures} readOnly />
                  <span className="text-sm">liga (Common Ligatures)</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={enableLigatures} readOnly />
                  <span className="text-sm">clig (Contextual Ligatures)</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={enableLigatures} readOnly />
                  <span className="text-sm">dlig (Discretionary Ligatures)</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={enableLigatures} readOnly />
                  <span className="text-sm">hlig (Historical Ligatures)</span>
                </div>
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
                  fontFamily,
                  fontVariantLigatures: enableLigatures ? "common-ligatures contextual" : "no-common-ligatures",
                  fontFeatureSettings: enableLigatures ? '"liga" 1, "clig" 1' : '"liga" 0, "clig" 0',
                }}
              >
                {text}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <Label className="text-sm">With Ligatures</Label>
                <p
                  style={{
                    fontSize: "24px",
                    fontFamily,
                    fontVariantLigatures: "common-ligatures",
                  }}
                >
                  office efficient
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <Label className="text-sm">Without Ligatures</Label>
                <p
                  style={{
                    fontSize: "24px",
                    fontFamily,
                    fontVariantLigatures: "no-common-ligatures",
                  }}
                >
                  office efficient
                </p>
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
          <CardTitle>Common Ligatures Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ligatureExamples.map((item, index) => (
              <div key={index} className="p-3 border rounded-lg text-center">
                <div className="text-3xl mb-2" style={{ fontFamily }}>{item.ligature}</div>
                <div className="text-sm text-muted-foreground">{item.chars}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
