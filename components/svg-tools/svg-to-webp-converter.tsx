"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function SvgToWebpConverter() {
  const [svgInput, setSvgInput] = useState("");
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [quality, setQuality] = useState(80);
  const [output, setOutput] = useState("");
  const [preview, setPreview] = useState("");

  const handleConvert = () => {
    if (!svgInput) return;

    // Create preview from SVG
    const svgBlob = new Blob([svgInput], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        // Note: WEBP export depends on browser support
        const webpData = canvas.toDataURL("image/webp", quality / 100);
        setOutput(webpData);
        setPreview(webpData);
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handleDownload = () => {
    if (output) {
      const link = document.createElement("a");
      link.download = "converted.webp";
      link.href = output;
      link.click();
    }
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
        <h2 className="text-2xl font-bold">SVG to WEBP Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert SVG vector graphics to WEBP raster format
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
              placeholder='<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="blue"/></svg>'
              className="w-full min-h-[150px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="width">Width (px)</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value) || 512)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (px)</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value) || 512)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quality">Quality: {quality}%</Label>
              <Input
                id="quality"
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
              />
            </div>
          </div>

          <Button onClick={handleConvert} disabled={!svgInput} className="w-full">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Convert to WEBP
          </Button>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleConvert} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Convert
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!svgInput}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {preview && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">WEBP Preview</h3>
            <div className="border rounded-lg p-4 flex items-center justify-center">
              <img src={preview} alt="Converted WEBP" className="max-w-full" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Output Data URL</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
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
            <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto max-h-[300px] break-all">
              {output.substring(0, 500)}...
            </pre>
          </Card>
        </div>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Benefits of WEBP</h3>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Smaller file sizes compared to PNG and JPEG</li>
          <li>Supports both lossy and lossless compression</li>
          <li>Supports transparency (alpha channel)</li>
          <li>Widely supported in modern browsers</li>
        </ul>
      </Card>
    </div>
  );
}
