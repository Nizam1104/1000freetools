"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, RefreshCw } from "lucide-react";

const fontCategories = {
  serif: ["Georgia", "Times New Roman", "Garamond", "Palatino", "Book Antiqua"],
  sansSerif: ["Arial", "Helvetica", "Verdana", "Tahoma", "Trebuchet MS", "Segoe UI"],
  display: ["Impact", "Comic Sans MS", "Brush Script MT", "Lucida Blackletter"],
  monospace: ["Courier New", "Consolas", "Monaco", "Lucida Console", "Andale Mono"],
  handwriting: ["Comic Sans MS", "Brush Script MT", "Lucida Handwriting", "Segoe Print"],
};

const fontPairingRules = [
  { heading: "serif", body: "sansSerif", description: "Classic contrast - Serif headings with sans-serif body" },
  { heading: "sansSerif", body: "serif", description: "Modern contrast - Sans-serif headings with serif body" },
  { heading: "display", body: "sansSerif", description: "Bold statements - Display headings with clean body" },
  { heading: "sansSerif", body: "sansSerif", description: "Clean consistency - Same category, different weights" },
  { heading: "serif", body: "serif", description: "Traditional elegance - Same category, different styles" },
];

export default function FontPairingTool() {
  const [headingFont, setHeadingFont] = useState("Georgia");
  const [bodyFont, setBodyFont] = useState("Arial");
  const [sampleHeading, setSampleHeading] = useState("Beautiful Typography");
  const [sampleBody, setSampleBody] = useState("The quick brown fox jumps over the lazy dog. Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.");
  const [headingSize, setHeadingSize] = useState("48");
  const [bodySize, setBodySize] = useState("16");
  const [lineHeight, setLineHeight] = useState("1.6");
  const [letterSpacing, setLetterSpacing] = useState("normal");
  const [copied, setCopied] = useState(false);

  const generatePairings = useCallback(() => {
    const pairings: Array<{ heading: string; body: string; description: string }> = [];
    
    fontPairingRules.forEach((rule) => {
      const headingFonts = fontCategories[rule.heading as keyof typeof fontCategories];
      const bodyFonts = fontCategories[rule.body as keyof typeof fontCategories];
      
      pairings.push({
        heading: headingFonts[0],
        body: bodyFonts[0],
        description: rule.description,
      });
    });

    return pairings;
  }, []);

  const applyPairing = useCallback((heading: string, body: string) => {
    setHeadingFont(heading);
    setBodyFont(body);
  }, []);

  const copyCSS = useCallback(async () => {
    const css = `/* Font Pairing CSS */
:root {
  --heading-font: '${headingFont}';
  --body-font: '${bodyFont}';
  --heading-size: ${headingSize}px;
  --body-size: ${bodySize}px;
  --line-height: ${lineHeight};
  --letter-spacing: ${letterSpacing};
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--heading-font);
  font-size: var(--heading-size);
  line-height: var(--line-height);
  letter-spacing: var(--letter-spacing);
}

body, p, li, span {
  font-family: var(--body-font);
  font-size: var(--body-size);
  line-height: var(--line-height);
}`;
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [headingFont, bodyFont, headingSize, bodySize, lineHeight, letterSpacing]);

  const pairings = generatePairings();

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Font Pairing Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="headingFont">Heading Font</Label>
              <select
                id="headingFont"
                value={headingFont}
                onChange={(e) => setHeadingFont(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                {Object.values(fontCategories).flat().map((font) => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="bodyFont">Body Font</Label>
              <select
                id="bodyFont"
                value={bodyFont}
                onChange={(e) => setBodyFont(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                {Object.values(fontCategories).flat().map((font) => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="headingSize">Heading Size (px)</Label>
              <Input
                id="headingSize"
                type="number"
                value={headingSize}
                onChange={(e) => setHeadingSize(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="bodySize">Body Size (px)</Label>
              <Input
                id="bodySize"
                type="number"
                value={bodySize}
                onChange={(e) => setBodySize(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lineHeight">Line Height</Label>
              <Input
                id="lineHeight"
                type="number"
                step="0.1"
                value={lineHeight}
                onChange={(e) => setLineHeight(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="letterSpacing">Letter Spacing</Label>
              <select
                id="letterSpacing"
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                <option value="normal">Normal</option>
                <option value="-0.5px">-0.5px</option>
                <option value="0.5px">0.5px</option>
                <option value="1px">1px</option>
                <option value="2px">2px</option>
              </select>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h2
              style={{
                fontFamily: headingFont,
                fontSize: `${headingSize}px`,
                lineHeight,
                letterSpacing,
              }}
            >
              {sampleHeading}
            </h2>
            <p
              style={{
                fontFamily: bodyFont,
                fontSize: `${bodySize}px`,
                lineHeight,
                letterSpacing,
                marginTop: "1rem",
              }}
            >
              {sampleBody}
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={copyCSS}>
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              Copy CSS
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Suggested Font Pairings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pairings.map((pairing, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                onClick={() => applyPairing(pairing.heading, pairing.body)}
              >
                <p className="text-xs text-muted-foreground mb-2">{pairing.description}</p>
                <h3 style={{ fontFamily: pairing.heading }} className="text-xl mb-2">
                  {sampleHeading}
                </h3>
                <p style={{ fontFamily: pairing.body }} className="text-sm">
                  {sampleBody.substring(0, 80)}...
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 bg-muted rounded">{pairing.heading}</span>
                  <span>+</span>
                  <span className="px-2 py-1 bg-muted rounded">{pairing.body}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full p-2 border rounded-md bg-background ${props.className}`} />;
}
