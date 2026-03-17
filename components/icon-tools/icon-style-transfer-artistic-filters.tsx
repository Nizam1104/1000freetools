"use client";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, RotateCcw, Palette, Wand2 } from "lucide-react";

const IconStyleTransferArtisticFilters: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [filter, setFilter] = useState("none");
  const [intensity, setIntensity] = useState(100);
  const [processed, setProcessed] = useState(false);
  const [previewData, setPreviewData] = useState("");

  const filters = [
    { value: "none", label: "Original" },
    { value: "grayscale", label: "Grayscale" },
    { value: "sepia", label: "Sepia" },
    { value: "invert", label: "Invert" },
    { value: "blur", label: "Blur" },
    { value: "sharpen", label: "Sharpen" },
    { value: "edge", label: "Edge Detect" },
    { value: "emboss", label: "Emboss" },
    { value: "pixelate", label: "Pixelate" },
    { value: "posterize", label: "Posterize" },
    { value: "vintage", label: "Vintage" },
    { value: "neon", label: "Neon" },
    { value: "duotone", label: "Duotone" },
    { value: "threshold", label: "Threshold" },
  ];

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setProcessed(false);
        setPreviewData("");
        
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

  const applyFilter = useCallback(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    const factor = intensity / 100;

    switch (filter) {
      case "grayscale":
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i] + (avg - data[i]) * factor;
          data[i + 1] = data[i + 1] + (avg - data[i + 1]) * factor;
          data[i + 2] = data[i + 2] + (avg - data[i + 2]) * factor;
        }
        break;

      case "sepia":
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          data[i] = Math.min(255, r + (0.393 * r + 0.769 * g + 0.189 * b - r) * factor);
          data[i + 1] = Math.min(255, g + (0.349 * r + 0.686 * g + 0.168 * b - g) * factor);
          data[i + 2] = Math.min(255, b + (0.272 * r + 0.534 * g + 0.131 * b - b) * factor);
        }
        break;

      case "invert":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = data[i] + ((255 - data[i]) - data[i]) * factor;
          data[i + 1] = data[i + 1] + ((255 - data[i + 1]) - data[i + 1]) * factor;
          data[i + 2] = data[i + 2] + ((255 - data[i + 2]) - data[i + 2]) * factor;
        }
        break;

      case "posterize":
        const levels = Math.max(2, Math.floor(10 - factor * 8));
        const step = 255 / (levels - 1);
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.round(Math.round(data[i] / step) * step);
          data[i + 1] = Math.round(Math.round(data[i + 1] / step) * step);
          data[i + 2] = Math.round(Math.round(data[i + 2] / step) * step);
        }
        break;

      case "threshold":
        const threshold = 128;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const val = avg > threshold ? 255 : 0;
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
        }
        break;

      case "pixelate":
        const pixelSize = Math.max(2, Math.floor(10 - factor * 8));
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = Math.floor(width / pixelSize);
        tempCanvas.height = Math.floor(height / pixelSize);
        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
          tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, width, height);
        }
        setProcessed(true);
        setPreviewData(canvas.toDataURL("image/png"));
        return;

      case "vintage":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.1 + 20);
          data[i + 1] = Math.min(255, data[i + 1] * 0.9 + 10);
          data[i + 2] = Math.min(255, data[i + 2] * 0.7);
          data[i + 3] = Math.min(255, data[i + 3] * 0.9);
        }
        break;

      case "neon":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.5);
          data[i + 1] = Math.min(255, data[i + 1] * 1.2);
          data[i + 2] = Math.min(255, data[i + 2] * 1.5);
        }
        break;

      case "duotone":
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg * 0.8;
          data[i + 1] = avg * 0.6 + 50;
          data[i + 2] = avg * 0.4 + 100;
        }
        break;

      default:
        break;
    }

    ctx.putImageData(imageData, 0, 0);
    setProcessed(true);
    setPreviewData(canvas.toDataURL("image/png"));
  }, [image, filter, intensity]);

  const handleDownload = useCallback(() => {
    if (!previewData) return;
    
    const link = document.createElement("a");
    link.download = `icon-${filter}-${Date.now()}.png`;
    link.href = previewData;
    link.click();
  }, [previewData, filter]);

  const handleClear = useCallback(() => {
    setImage(null);
    setFilter("none");
    setIntensity(100);
    setProcessed(false);
    setPreviewData("");
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
            <Palette className="w-5 h-5" />
            Icon Style Transfer & Artistic Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="imageUpload">Upload Icon/Image</Label>
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
                  <p className="text-sm text-gray-600">Click to upload</p>
                  <p className="text-xs text-gray-500">PNG, JPG, SVG</p>
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filter">Select Filter</Label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {filters.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>

              <div className="space-y-2">
                <Label htmlFor="intensity">Intensity ({intensity}%)</Label>
                <Input
                  id="intensity"
                  type="range"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  min={0}
                  max={100}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              className="border border-gray-300"
              width={400}
              height={400}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={applyFilter} disabled={!image}>
              <Wand2 className="w-4 h-4 mr-2" />
              Apply Filter
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!processed}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {processed && previewData && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm font-semibold mb-2">Filtered Preview:</p>
                <div className="flex justify-center">
                  <img
                    src={previewData}
                    alt="Filtered"
                    className="border rounded max-w-full"
                  />
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">
                  Filter: {filters.find(f => f.value === filter)?.label} | Intensity: {intensity}%
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {filters.slice(0, 8).map((f) => (
                  <button
                    key={f.value}
                    className={`p-2 border rounded text-xs ${filter === f.value ? "border-blue-500 bg-blue-50" : ""}`}
                    onClick={() => setFilter(f.value)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IconStyleTransferArtisticFilters;
