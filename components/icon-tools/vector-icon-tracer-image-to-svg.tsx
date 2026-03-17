"use client";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, RotateCcw, Image, Wand2 } from "lucide-react";

const VectorIconTracerImageToSvg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [threshold, setThreshold] = useState(128);
  const [smoothing, setSmoothing] = useState(2);
  const [colorMode, setColorMode] = useState<"black-white" | "color" | "grayscale">("black-white");
  const [processed, setProcessed] = useState(false);
  const [svgPath, setSvgPath] = useState("");

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setProcessed(false);
        
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = Math.min(img.width, 400);
          canvas.height = Math.min(img.height, 400);
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const processImage = useCallback(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const width = canvas.width;
    const height = canvas.height;

    // Simple edge detection and vectorization
    let paths: string[] = [];
    
    for (let y = 0; y < height; y += smoothing) {
      let path = "";
      for (let x = 0; x < width; x += smoothing) {
        const i = (y * width + x) * 4;
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        
        if (colorMode === "black-white") {
          if (brightness < threshold) {
            path += `M${x},${y} `;
          }
        } else if (colorMode === "grayscale") {
          const gray = brightness < threshold ? "#000000" : "#ffffff";
          path += `M${x},${y} L${x + smoothing},${y} L${x + smoothing},${y + smoothing} L${x},${y + smoothing} Z `;
        }
      }
      if (path) paths.push(path);
    }

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
  <path d="${paths.join("")}" fill="${colorMode === "black-white" ? "#000000" : "none"}" stroke="#000000" stroke-width="1"/>
</svg>`;

    setSvgPath(svgContent);
    setProcessed(true);
  }, [image, threshold, smoothing, colorMode]);

  const handleDownload = useCallback(() => {
    if (!svgPath) return;
    
    const blob = new Blob([svgPath], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.download = "traced-icon.svg";
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [svgPath]);

  const handleClear = useCallback(() => {
    setImage(null);
    setProcessed(false);
    setSvgPath("");
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5" />
            Vector Icon Tracer (Image to SVG)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="imageUpload">Upload Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Label htmlFor="imageUpload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF (max 5MB)</p>
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Processing Options</Label>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="colorMode" className="text-xs">Color Mode</Label>
                  <select
                    id="colorMode"
                    value={colorMode}
                    onChange={(e) => setColorMode(e.target.value as typeof colorMode)}
                    className="w-full p-2 border rounded-md text-sm"
                  >
                    <option value="black-white">Black & White</option>
                    <option value="grayscale">Grayscale</option>
                    <option value="color">Color (Basic)</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="threshold" className="text-xs">Threshold ({threshold})</Label>
                  <Input
                    id="threshold"
                    type="range"
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    min={0}
                    max={255}
                  />
                </div>

                <div>
                  <Label htmlFor="smoothing" className="text-xs">Smoothing ({smoothing}px)</Label>
                  <Input
                    id="smoothing"
                    type="range"
                    value={smoothing}
                    onChange={(e) => setSmoothing(Number(e.target.value))}
                    min={1}
                    max={10}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              className="border border-gray-300 max-w-full"
              width={400}
              height={400}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={processImage} disabled={!image}>
              <Wand2 className="w-4 h-4 mr-2" />
              Trace to Vector
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!processed}>
              <Download className="w-4 h-4 mr-2" />
              Download SVG
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {processed && svgPath && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm font-semibold mb-2">SVG Preview:</p>
                <div className="bg-white p-4 border rounded">
                  <div dangerouslySetInnerHTML={{ __html: svgPath }} className="w-full flex justify-center" />
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-blue-50">
                <p className="text-sm font-semibold mb-2">SVG Code:</p>
                <pre className="text-xs bg-white p-3 rounded overflow-auto max-h-40">
                  {svgPath}
                </pre>
              </div>
            </div>
          )}

          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm font-semibold mb-2">Tips for Best Results:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use high-contrast images for better tracing</li>
              <li>• Simple icons work better than complex images</li>
              <li>• Adjust threshold to capture more or less detail</li>
              <li>• Higher smoothing creates simpler paths</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VectorIconTracerImageToSvg;
