"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function SvgBackgroundRemover() {
  const [svgInput, setSvgInput] = useState("");
  const [output, setOutput] = useState("");
  const [action, setAction] = useState<"remove" | "change">("remove");
  const [newColor, setNewColor] = useState("#ffffff");

  const handleProcess = () => {
    if (!svgInput) return;

    let result = svgInput;

    if (action === "remove") {
      // Remove background rectangle/circle
      result = result.replace(/<rect[^>]*fill=["'][^"']*fff[^"']*["'][^>]*>/gi, "");
      result = result.replace(/<rect[^>]*fill=["'][^"']*#fff[^"']*["'][^>]*>/gi, "");
      result = result.replace(/<rect[^>]*fill=["']white["'][^>]*>/gi, "");
      
      // Remove background with opacity
      result = result.replace(/<rect[^>]*opacity=["'][^"']*["'][^>]*fill=["'][^"']*fff[^"']*["'][^>]*>/gi, "");
      
      // Add transparency to background
      result = result.replace(/fill=["']#fff["']/gi, 'fill="none"');
      result = result.replace(/fill=["']white["']/gi, 'fill="none"');
    } else {
      // Change background color
      result = result.replace(/fill=["']#fff["']/gi, `fill="${newColor}"`);
      result = result.replace(/fill=["']white["']/gi, `fill="${newColor}"`);
      result = result.replace(/fill=["']#FFF["']/gi, `fill="${newColor}"`);
      result = result.replace(/fill=["']#ffffff["']/gi, `fill="${newColor}"`);
      result = result.replace(/fill=["']#FFFFFF["']/gi, `fill="${newColor}"`);
    }

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
      a.download = "background-modified.svg";
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
        <h2 className="text-2xl font-bold">SVG Background Remover</h2>
        <p className="text-sm text-muted-foreground">
          Remove or change the background of SVG files
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
              placeholder='<svg xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="white"/><circle cx="50" cy="50" r="40" fill="blue"/></svg>'
              className="w-full min-h-[150px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="remove"
                checked={action === "remove"}
                onChange={() => setAction("remove")}
                className="h-4 w-4"
              />
              <Label htmlFor="remove">Remove Background</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="change"
                checked={action === "change"}
                onChange={() => setAction("change")}
                className="h-4 w-4"
              />
              <Label htmlFor="change">Change Background</Label>
            </div>
            {action === "change" && (
              <div className="flex items-center gap-2">
                <Label htmlFor="newColor" className="text-sm">New Color:</Label>
                <Input
                  id="newColor"
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-16 h-8"
                />
              </div>
            )}
          </div>

          <Button onClick={handleProcess} disabled={!svgInput} className="w-full">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            {action === "remove" ? "Remove Background" : "Change Background"}
          </Button>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleProcess} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Process
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!svgInput}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Preview</h3>
            <div className="border rounded-lg p-4" style={{ background: 'repeating-conic-gradient(#eee 0% 25%, #fff 0% 50%) 50% / 20px 20px repeat' }}>
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
