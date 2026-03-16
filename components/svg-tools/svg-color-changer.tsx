"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function SvgColorChanger() {
  const [svgInput, setSvgInput] = useState("");
  const [oldColor, setOldColor] = useState("#000000");
  const [newColor, setNewColor] = useState("#ff0000");
  const [output, setOutput] = useState("");

  const handleChangeColor = () => {
    if (!svgInput) return;

    // Replace color in SVG
    let result = svgInput;
    
    // Replace fill colors
    result = result.replace(
      new RegExp(`fill="${oldColor}"`, "gi"),
      `fill="${newColor}"`
    );
    
    // Replace stroke colors
    result = result.replace(
      new RegExp(`stroke="${oldColor}"`, "gi"),
      `stroke="${newColor}"`
    );
    
    // Replace stop-color for gradients
    result = result.replace(
      new RegExp(`stop-color="${oldColor}"`, "gi"),
      `stop-color="${newColor}"`
    );

    setOutput(result);
  };

  const handleReplaceAll = () => {
    if (!svgInput) return;

    // Simple find and replace for any color
    const colorRegex = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g;
    const matches = svgInput.match(colorRegex) || [];
    const uniqueColors = [...new Set(matches)];

    let result = svgInput;
    uniqueColors.forEach((color) => {
      result = result.replace(
        new RegExp(color, "gi"),
        newColor
      );
    });

    setOutput(result);
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
      a.download = "color-changed.svg";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleClear = () => {
    setSvgInput("");
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">SVG Color Changer</h2>
        <p className="text-sm text-muted-foreground">
          Batch change colors within SVG files
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
              placeholder='<svg xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#000000"/></svg>'
              className="w-full min-h-[150px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="oldColor">Find Color</Label>
              <div className="flex gap-2">
                <Input
                  id="oldColor"
                  type="color"
                  value={oldColor}
                  onChange={(e) => setOldColor(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={oldColor}
                  onChange={(e) => setOldColor(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newColor">Replace With</Label>
              <div className="flex gap-2">
                <Input
                  id="newColor"
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>

            <div className="flex items-end gap-2">
              <Button onClick={handleChangeColor} disabled={!svgInput} className="flex-1">
                Replace
              </Button>
              <Button onClick={handleReplaceAll} disabled={!svgInput} variant="outline">
                Replace All
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleChangeColor} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Change Color
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!svgInput}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Preview</h3>
            <div className="border rounded-lg p-4 bg-background">
              <div dangerouslySetInnerHTML={{ __html: output }} />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Output SVG</h3>
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
