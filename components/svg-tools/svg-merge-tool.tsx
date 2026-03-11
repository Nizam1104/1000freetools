"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function SvgMergeTool() {
  const [svgInputs, setSvgInputs] = useState<string[]>(["", ""]);
  const [layout, setLayout] = useState<"horizontal" | "vertical" | "grid">("horizontal");
  const [spacing, setSpacing] = useState(20);
  const [output, setOutput] = useState("");

  const addSvgInput = () => {
    setSvgInputs([...svgInputs, ""]);
  };

  const removeSvgInput = (index: number) => {
    if (svgInputs.length > 2) {
      setSvgInputs(svgInputs.filter((_, i) => i !== index));
    }
  };

  const updateSvgInput = (index: number, value: string) => {
    const newInputs = [...svgInputs];
    newInputs[index] = value;
    setSvgInputs(newInputs);
  };

  const parseSvgDimensions = (svgString: string) => {
    const widthMatch = svgString.match(/width="(\d+)"/);
    const heightMatch = svgString.match(/height="(\d+)"/);
    const viewBoxMatch = svgString.match(/viewBox="[\d.]+\s+[\d.]+\s+([\d.]+)\s+([\d.]+)"/);
    
    return {
      width: parseInt(widthMatch?.[1] || viewBoxMatch?.[1] || "100"),
      height: parseInt(heightMatch?.[1] || viewBoxMatch?.[2] || "100"),
    };
  };

  const handleMerge = () => {
    const validSvgs = svgInputs.filter((svg) => svg.trim());
    if (validSvgs.length < 2) return;

    const dimensions = validSvgs.map(parseSvgDimensions);
    const maxWidth = Math.max(...dimensions.map((d) => d.width));
    const maxHeight = Math.max(...dimensions.map((d) => d.height));

    let totalWidth = 0;
    let totalHeight = 0;

    if (layout === "horizontal") {
      totalWidth = dimensions.reduce((sum, d) => sum + d.width + spacing, -spacing);
      totalHeight = maxHeight;
    } else if (layout === "vertical") {
      totalWidth = maxWidth;
      totalHeight = dimensions.reduce((sum, d) => sum + d.height + spacing, -spacing);
    } else {
      // Grid 2x2 for simplicity
      const cols = Math.ceil(Math.sqrt(validSvgs.length));
      totalWidth = cols * maxWidth + (cols - 1) * spacing;
      totalHeight = Math.ceil(validSvgs.length / cols) * maxHeight + (Math.ceil(validSvgs.length / cols) - 1) * spacing;
    }

    let content = "";
    let x = 0;
    let y = 0;
    const cols = layout === "grid" ? Math.ceil(Math.sqrt(validSvgs.length)) : 1;

    validSvgs.forEach((svg, i) => {
      const dim = dimensions[i];
      const svgContent = svg.replace(/<svg[^>]*>|<\/svg>/g, "");
      
      content += `<g transform="translate(${x}, ${y})">${svgContent}</g>\n    `;

      if (layout === "horizontal") {
        x += dim.width + spacing;
      } else if (layout === "vertical") {
        y += dim.height + spacing;
      } else {
        x += maxWidth + spacing;
        if ((i + 1) % cols === 0) {
          x = 0;
          y += maxHeight + spacing;
        }
      }
    });

    const mergedSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}">
    ${content}
</svg>`;

    setOutput(mergedSvg);
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleDownload = () => {
    if (output) {
      const blob = new Blob([output], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.svg";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleClear = () => {
    setSvgInputs(["", ""]);
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">SVG Merge Tool</h2>
        <p className="text-sm text-muted-foreground">
          Combine multiple SVG files into a single SVG
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <Label>Layout</Label>
              <div className="flex gap-2">
                {(["horizontal", "vertical", "grid"] as const).map((l) => (
                  <Button
                    key={l}
                    variant={layout === l ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLayout(l)}
                  >
                    {l}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="spacing">Spacing: {spacing}px</Label>
              <Input
                id="spacing"
                type="range"
                min="0"
                max="100"
                value={spacing}
                onChange={(e) => setSpacing(parseInt(e.target.value))}
                className="w-40"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>SVG Inputs</Label>
              <Button variant="outline" size="sm" onClick={addSvgInput}>
                + Add SVG
              </Button>
            </div>
            <div className="space-y-2">
              {svgInputs.map((svg, i) => (
                <div key={i} className="flex gap-2">
                  <textarea
                    value={svg}
                    onChange={(e) => updateSvgInput(i, e.target.value)}
                    placeholder={`SVG ${i + 1} code...`}
                    className="flex-1 min-h-[80px] p-2 font-mono text-sm rounded-md border border-input"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeSvgInput(i)}
                    disabled={svgInputs.length <= 2}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleMerge} disabled={svgInputs.filter((s) => s.trim()).length < 2} className="w-full">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Merge SVGs
          </Button>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleMerge} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Merge
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!svgInputs.some((s) => s.trim())}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Preview</h3>
            <div className="border rounded-lg p-4 overflow-auto">
              <div dangerouslySetInnerHTML={{ __html: output }} />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Merged SVG Code</h3>
              <div className="flex gap-2">
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
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto max-h-[400px]">
              {output}
            </pre>
          </Card>
        </div>
      )}
    </div>
  );
}
