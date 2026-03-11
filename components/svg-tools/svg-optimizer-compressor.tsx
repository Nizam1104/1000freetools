"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function SvgOptimizerCompressor() {
  const [svgInput, setSvgInput] = useState("");
  const [output, setOutput] = useState("");
  const [stats, setStats] = useState<{ original: number; optimized: number; savings: number } | null>(null);
  
  const [options, setOptions] = useState({
    removeComments: true,
    removeMetadata: true,
    removeUnusedDefs: true,
    minify: true,
    precision: 3,
  });

  const optimizeSvg = () => {
    if (!svgInput) return;

    let result = svgInput;
    const originalSize = new Blob([svgInput]).size;

    // Remove comments
    if (options.removeComments) {
      result = result.replace(/<!--[\s\S]*?-->/g, "");
    }

    // Remove metadata
    if (options.removeMetadata) {
      result = result.replace(/<metadata[^>]*>[\s\S]*?<\/metadata>/gi, "");
      result = result.replace(/<desc[^>]*>[\s\S]*?<\/desc>/gi, "");
      result = result.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "");
    }

    // Remove unused defs
    if (options.removeUnusedDefs) {
      result = result.replace(/<defs[^>]*>\s*<\/defs>/gi, "");
    }

    // Reduce precision
    if (options.precision < 7) {
      result = result.replace(/\d+\.\d+/g, (match) => {
        return parseFloat(match).toFixed(options.precision);
      });
    }

    // Minify (remove whitespace)
    if (options.minify) {
      result = result.replace(/>\s+</g, "><");
      result = result.replace(/\s+/g, " ");
      result = result.trim();
    }

    // Remove XML declaration
    result = result.replace(/<\?xml[^>]*\?>/gi, "");

    // Remove default namespace if present
    result = result.replace(/ xmlns="http:\/\/www\.w3\.org\/2000\/svg"/, "");

    setOutput(result);
    
    const optimizedSize = new Blob([result]).size;
    setStats({
      original: originalSize,
      optimized: optimizedSize,
      savings: Math.round(((originalSize - optimizedSize) / originalSize) * 100),
    });
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
      a.download = "optimized.svg";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleClear = () => {
    setSvgInput("");
    setOutput("");
    setStats(null);
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">SVG Optimizer & Compressor</h2>
        <p className="text-sm text-muted-foreground">
          Reduce SVG file size without losing quality
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
              placeholder='<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><!-- comment --><circle cx="50" cy="50" r="40" fill="blue"/></svg>'
              className="w-full min-h-[150px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="removeComments"
                checked={options.removeComments}
                onChange={(e) => setOptions({ ...options, removeComments: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="removeComments" className="text-sm">Remove Comments</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="removeMetadata"
                checked={options.removeMetadata}
                onChange={(e) => setOptions({ ...options, removeMetadata: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="removeMetadata" className="text-sm">Remove Metadata</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="removeUnusedDefs"
                checked={options.removeUnusedDefs}
                onChange={(e) => setOptions({ ...options, removeUnusedDefs: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="removeUnusedDefs" className="text-sm">Remove Empty Defs</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="minify"
                checked={options.minify}
                onChange={(e) => setOptions({ ...options, minify: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="minify" className="text-sm">Minify Whitespace</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="precision">Decimal Precision: {options.precision}</Label>
              <Input
                id="precision"
                type="range"
                min="0"
                max="7"
                value={options.precision}
                onChange={(e) => setOptions({ ...options, precision: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <Button onClick={optimizeSvg} disabled={!svgInput} className="w-full">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Optimize SVG
          </Button>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={optimizeSvg} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Optimize
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!svgInput}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {stats && (
        <Card className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-muted-foreground">Original</div>
              <div className="text-2xl font-bold">{stats.original.toLocaleString()} bytes</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Optimized</div>
              <div className="text-2xl font-bold text-green-600">{stats.optimized.toLocaleString()} bytes</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Savings</div>
              <div className="text-2xl font-bold text-green-600">{stats.savings}%</div>
            </div>
          </div>
        </Card>
      )}

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
              <h3 className="font-semibold">Optimized SVG</h3>
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
