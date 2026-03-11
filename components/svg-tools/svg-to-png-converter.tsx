"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function SvgToPngConverter() {
  const [svgInput, setSvgInput] = useState("");
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [scale, setScale] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [transparent, setTransparent] = useState(true);
  const [output, setOutput] = useState("");
  const [preview, setPreview] = useState("");

  const handleConvert = () => {
    if (!svgInput) return;

    const svgBlob = new Blob([svgInput], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const finalWidth = width * scale;
      const finalHeight = height * scale;
      canvas.width = finalWidth;
      canvas.height = finalHeight;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        if (!transparent) {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, finalWidth, finalHeight);
        }
        ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
        
        const pngData = canvas.toDataURL("image/png");
        setOutput(pngData);
        setPreview(pngData);
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handleDownload = () => {
    if (output) {
      const link = document.createElement("a");
      link.download = "converted.png";
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
        <h2 className="text-2xl font-bold">SVG to PNG Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert SVG vector images to PNG raster format
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
              <Label htmlFor="scale">Scale: {scale}x</Label>
              <Input
                id="scale"
                type="number"
                min="1"
                max="4"
                value={scale}
                onChange={(e) => setScale(parseInt(e.target.value) || 1)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="transparent"
                checked={transparent}
                onChange={(e) => setTransparent(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="transparent" className="text-sm">Transparent Background</Label>
            </div>
            {!transparent && (
              <div className="flex items-center gap-2">
                <Label htmlFor="bgColor" className="text-sm">Background:</Label>
                <Input
                  id="bgColor"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-16 h-8"
                />
              </div>
            )}
          </div>

          <Button onClick={handleConvert} disabled={!svgInput} className="w-full">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Convert to PNG
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
            <h3 className="font-semibold mb-3">PNG Preview</h3>
            <div className={`border rounded-lg p-4 flex items-center justify-center ${transparent ? 'bg-checkerboard' : ''}`} style={{ background: transparent ? 'repeating-conic-gradient(#eee 0% 25%, #fff 0% 50%) 50% / 20px 20px repeat' : backgroundColor }}>
              <img src={preview} alt="Converted PNG" className="max-w-full" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Output</h3>
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
            <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto max-h-[300px] break-all">
              {output.substring(0, 500)}...
            </pre>
          </Card>
        </div>
      )}
    </div>
  );
}
