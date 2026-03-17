"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Save, Upload } from "lucide-react";

interface FontMetadata {
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  fontDisplay: string;
  unicodeRange: string;
  fontVariationSettings: string;
  sizeAdjust: string;
  ascentOverride: string;
  descentOverride: string;
  lineGapOverride: string;
}

export default function FontMetadataEditor() {
  const [metadata, setMetadata] = useState<FontMetadata>({
    fontFamily: "MyCustomFont",
    fontWeight: "400",
    fontStyle: "normal",
    fontDisplay: "swap",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    fontVariationSettings: "'wght' 400, 'wdth' 100",
    sizeAdjust: "100%",
    ascentOverride: "normal",
    descentOverride: "normal",
    lineGapOverride: "normal",
  });
  const [cssOutput, setCssOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const updateMetadata = useCallback((field: keyof FontMetadata, value: string) => {
    setMetadata((prev) => ({ ...prev, [field]: value }));
  }, []);

  const generateCSS = useCallback(() => {
    const css = `@font-face {
  font-family: '${metadata.fontFamily}';
  src: url('path/to/font.woff2') format('woff2');
  font-weight: ${metadata.fontWeight};
  font-style: ${metadata.fontStyle};
  font-display: ${metadata.fontDisplay};
  ${metadata.unicodeRange ? `unicode-range: ${metadata.unicodeRange};` : ""}
  ${metadata.fontVariationSettings !== "'wght' 400, 'wdth' 100" ? `font-variation-settings: ${metadata.fontVariationSettings};` : ""}
  ${metadata.sizeAdjust !== "100%" ? `size-adjust: ${metadata.sizeAdjust};` : ""}
  ${metadata.ascentOverride !== "normal" ? `ascent-override: ${metadata.ascentOverride};` : ""}
  ${metadata.descentOverride !== "normal" ? `descent-override: ${metadata.descentOverride};` : ""}
  ${metadata.lineGapOverride !== "normal" ? `line-gap-override: ${metadata.lineGapOverride};` : ""}
}`;
    setCssOutput(css);
  }, [metadata]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cssOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [cssOutput]);

  const downloadCSS = useCallback(() => {
    if (!cssOutput) return;
    const blob = new Blob([cssOutput], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${metadata.fontFamily.toLowerCase().replace(/\s+/g, "-")}.css`;
    a.click();
    URL.revokeObjectURL(url);
  }, [cssOutput, metadata.fontFamily]);

  const loadPreset = useCallback((preset: string) => {
    const presets: Record<string, Partial<FontMetadata>> = {
      google: {
        fontDisplay: "swap",
        unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
        sizeAdjust: "100%",
        ascentOverride: "normal",
        descentOverride: "normal",
        lineGapOverride: "normal",
      },
      variable: {
        fontWeight: "100 900",
        fontVariationSettings: "'wght' 400, 'wdth' 100, 'opsz' 14",
        fontDisplay: "swap",
      },
      minimal: {
        fontDisplay: "swap",
        unicodeRange: "",
        sizeAdjust: "100%",
        ascentOverride: "normal",
        descentOverride: "normal",
        lineGapOverride: "normal",
      },
    };
    setMetadata((prev) => ({ ...prev, ...presets[preset] }));
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Font Metadata Editor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button size="sm" variant="outline" onClick={() => loadPreset("google")}>
                Google Fonts Preset
              </Button>
              <Button size="sm" variant="outline" onClick={() => loadPreset("variable")}>
                Variable Font Preset
              </Button>
              <Button size="sm" variant="outline" onClick={() => loadPreset("minimal")}>
                Minimal Preset
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fontFamily">Font Family Name</Label>
                <Input
                  id="fontFamily"
                  value={metadata.fontFamily}
                  onChange={(e) => updateMetadata("fontFamily", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="fontWeight">Font Weight</Label>
                <Input
                  id="fontWeight"
                  value={metadata.fontWeight}
                  onChange={(e) => updateMetadata("fontWeight", e.target.value)}
                  placeholder="400 or 100 900"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fontStyle">Font Style</Label>
                <select
                  id="fontStyle"
                  value={metadata.fontStyle}
                  onChange={(e) => updateMetadata("fontStyle", e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md bg-background"
                >
                  <option value="normal">Normal</option>
                  <option value="italic">Italic</option>
                  <option value="oblique">Oblique</option>
                </select>
              </div>
              <div>
                <Label htmlFor="fontDisplay">Font Display</Label>
                <select
                  id="fontDisplay"
                  value={metadata.fontDisplay}
                  onChange={(e) => updateMetadata("fontDisplay", e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md bg-background"
                >
                  <option value="auto">Auto</option>
                  <option value="block">Block</option>
                  <option value="swap">Swap</option>
                  <option value="fallback">Fallback</option>
                  <option value="optional">Optional</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="unicodeRange">Unicode Range</Label>
              <Textarea
                id="unicodeRange"
                value={metadata.unicodeRange}
                onChange={(e) => updateMetadata("unicodeRange", e.target.value)}
                className="mt-1 font-mono text-sm"
              />
            </div>

            <div>
              <Label htmlFor="fontVariationSettings">Font Variation Settings</Label>
              <Input
                id="fontVariationSettings"
                value={metadata.fontVariationSettings}
                onChange={(e) => updateMetadata("fontVariationSettings", e.target.value)}
                placeholder="'wght' 400, 'wdth' 100"
                className="mt-1 font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="sizeAdjust">Size Adjust</Label>
                <Input
                  id="sizeAdjust"
                  value={metadata.sizeAdjust}
                  onChange={(e) => updateMetadata("sizeAdjust", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ascentOverride">Ascent Override</Label>
                <Input
                  id="ascentOverride"
                  value={metadata.ascentOverride}
                  onChange={(e) => updateMetadata("ascentOverride", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="descentOverride">Descent Override</Label>
                <Input
                  id="descentOverride"
                  value={metadata.descentOverride}
                  onChange={(e) => updateMetadata("descentOverride", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="lineGapOverride">Line Gap Override</Label>
              <Input
                id="lineGapOverride"
                value={metadata.lineGapOverride}
                onChange={(e) => updateMetadata("lineGapOverride", e.target.value)}
                className="mt-1"
              />
            </div>

            <Button onClick={generateCSS} className="w-full">
              Generate CSS
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="w-5 h-5" />
              CSS Output
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Label>Generated @font-face</Label>
              <Textarea
                value={cssOutput}
                readOnly
                className="mt-1 font-mono text-xs h-96"
                placeholder="Click 'Generate CSS' to see the output"
              />
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={copyToClipboard} disabled={!cssOutput}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button size="sm" variant="outline" onClick={downloadCSS} disabled={!cssOutput}>
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Preview</h4>
              <p style={{ fontFamily: metadata.fontFamily }} className="text-lg">
                The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Note: Font will only display if installed locally or loaded via CSS
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
