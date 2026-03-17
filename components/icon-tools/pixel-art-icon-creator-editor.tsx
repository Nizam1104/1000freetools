"use client";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Copy, RotateCcw, Grid, Upload, Eraser } from "lucide-react";

const PixelArtIconCreatorEditor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gridSize, setGridSize] = useState(16);
  const [pixelSize, setPixelSize] = useState(20);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);
  const [pixels, setPixels] = useState<{ [key: string]: string }>({});
  const [tool, setTool] = useState<"draw" | "erase" | "fill">("draw");

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelSize);
    const y = Math.floor((e.clientY - rect.top) / pixelSize);
    const key = `${x},${y}`;

    if (tool === "erase") {
      const newPixels = { ...pixels };
      delete newPixels[key];
      setPixels(newPixels);
    } else if (tool === "draw") {
      setPixels({ ...pixels, [key]: currentColor });
    }
  }, [pixelSize, tool, currentColor, pixels]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    handleCanvasClick(e);
  }, [isDrawing, handleCanvasClick]);

  const handleClear = useCallback(() => {
    setPixels({});
  }, []);

  const handleDownload = useCallback(() => {
    const canvas = document.createElement("canvas");
    const size = gridSize * 10;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    
    if (ctx) {
      // Transparent background
      ctx.clearRect(0, 0, size, size);
      
      // Draw pixels
      Object.entries(pixels).forEach(([key, color]) => {
        const [x, y] = key.split(",").map(Number);
        ctx.fillStyle = color;
        ctx.fillRect(x * 10, y * 10, 10, 10);
      });
    }
    
    const link = document.createElement("a");
    link.download = "pixel-art-icon.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [pixels, gridSize]);

  const handleExportSVG = useCallback(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${gridSize}" height="${gridSize}" viewBox="0 0 ${gridSize} ${gridSize}">
${Object.entries(pixels).map(([key, color]) => {
  const [x, y] = key.split(",").map(Number);
  return `  <rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>`;
}).join("\n")}
</svg>`;
    
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.download = "pixel-art-icon.svg";
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [pixels, gridSize]);

  const presetColors = [
    "#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff",
    "#ffff00", "#ff00ff", "#00ffff", "#ff8800", "#8800ff",
    "#0088ff", "#ff0088", "#888888", "#444444", "#aaaaaa",
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Grid className="w-5 h-5" />
            Pixel Art Icon Creator & Editor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="gridSize">Grid Size</Label>
              <select
                id="gridSize"
                value={gridSize}
                onChange={(e) => {
                  setGridSize(Number(e.target.value));
                  setPixels({});
                }}
                className="w-full p-2 border rounded-md"
              >
                <option value={8}>8x8</option>
                <option value={16}>16x16</option>
                <option value={24}>24x24</option>
                <option value={32}>32x32</option>
                <option value={64}>64x64</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pixelSize">Preview Pixel Size</Label>
              <Input
                id="pixelSize"
                type="number"
                value={pixelSize}
                onChange={(e) => setPixelSize(Number(e.target.value))}
                min={10}
                max={50}
              />
            </div>

            <div className="space-y-2">
              <Label>Tool</Label>
              <div className="flex gap-2">
                <Button
                  variant={tool === "draw" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTool("draw")}
                >
                  Draw
                </Button>
                <Button
                  variant={tool === "erase" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTool("erase")}
                >
                  <Eraser className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Color Picker</Label>
            <div className="flex gap-2 flex-wrap">
              <Input
                type="color"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                className="w-16 h-10"
              />
              {presetColors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 border-2 rounded ${currentColor === color ? "border-blue-500" : "border-gray-300"}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCurrentColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              width={gridSize * pixelSize}
              height={gridSize * pixelSize}
              className="border-2 border-gray-300 cursor-crosshair"
              style={{ imageRendering: "pixelated" }}
              onMouseDown={(e) => {
                setIsDrawing(true);
                handleCanvasClick(e);
              }}
              onMouseUp={() => setIsDrawing(false)}
              onMouseLeave={() => setIsDrawing(false)}
              onMouseMove={handleMouseMove}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download PNG
            </Button>
            <Button onClick={handleExportSVG} variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Export SVG
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear Canvas
            </Button>
          </div>

          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm font-semibold mb-2">Instructions:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Click or drag on the canvas to draw pixels</li>
              <li>• Select colors from the palette or use the color picker</li>
              <li>• Use the Eraser tool to remove pixels</li>
              <li>• Choose grid size based on your icon needs</li>
              <li>• Export as PNG or SVG for use in your projects</li>
            </ul>
          </div>

          <div className="text-center text-sm text-gray-500">
            Pixels drawn: {Object.keys(pixels).length} / {gridSize * gridSize}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PixelArtIconCreatorEditor;
