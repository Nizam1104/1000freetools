"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function SvgToIcoConverter() {
  const [svgInput, setSvgInput] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<number[]>([16, 32, 48, 64, 128, 256]);
  const [output, setOutput] = useState("");
  const [preview, setPreview] = useState("");

  const availableSizes = [16, 24, 32, 48, 64, 96, 128, 256, 512];

  const toggleSize = (size: number) => {
    if (selectedSizes.includes(size)) {
      if (selectedSizes.length > 1) {
        setSelectedSizes(selectedSizes.filter((s) => s !== size));
      }
    } else {
      setSelectedSizes([...selectedSizes, size].sort((a, b) => a - b));
    }
  };

  const generateIcoPreview = () => {
    if (!svgInput) return;
    
    // For ICO, we generate a preview showing different sizes
    const sizesXml = selectedSizes.map((size) => `
      <div style="display: inline-block; margin: 10px; text-align: center;">
        <div style="border: 1px solid #ccc; padding: 5px;">${size}x${size}</div>
        <svg width="${size}" height="${size}" style="border: 1px solid #eee;">
          ${svgInput.replace(/<svg[^>]*>|<\/svg>/g, "")}
        </svg>
      </div>
    `).join("");

    setPreview(`<div style="font-family: Arial; padding: 20px;">
      <h3>ICO Preview (${selectedSizes.length} sizes)</h3>
      ${sizesXml}
    </div>`);

    // Generate SVG representation of ICO
    setOutput(`<!-- ICO file would contain ${selectedSizes.length} icon sizes: ${selectedSizes.join(", ")} -->
<!-- To create actual .ico file, use a conversion tool or library -->
<!-- This SVG represents the multi-size icon structure -->
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  ${svgInput.replace(/<svg[^>]*>|<\/svg>/g, "")}
</svg>`);
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleClear = () => {
    setSvgInput("");
    setOutput("");
    setPreview("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">SVG to ICO Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert SVG to ICO format with multiple sizes for favicons
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="svg">SVG Input</Label>
            <textarea
              id="svg"
              value={svgInput}
              onChange={(e) => setSvgInput(e.target.value)}
              placeholder='<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="14" fill="blue"/></svg>'
              className="w-full min-h-[150px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="space-y-2">
            <Label>ICO Sizes to Include</Label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSizes.includes(size) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSize(size)}
                >
                  {size}x{size}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={generateIcoPreview} disabled={!svgInput} className="w-full">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Generate ICO Preview
          </Button>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={generateIcoPreview} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Generate
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!svgInput}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {preview && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Preview</h3>
            <div className="border rounded-lg p-4 overflow-auto" dangerouslySetInnerHTML={{ __html: preview }} />
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Output SVG</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleCopy();
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto max-h-[300px]">
              {output}
            </pre>
          </Card>
        </div>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Note</h3>
        <p className="text-sm text-muted-foreground">
          This tool generates a preview of how your SVG will look at different ICO sizes.
          To create an actual .ico file, you'll need to use a dedicated conversion tool or library.
          Common ICO sizes for favicons: 16x16, 32x32, 48x48.
        </p>
      </Card>
    </div>
  );
}
