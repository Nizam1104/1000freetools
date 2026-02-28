"use client";

import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, Download, Copy, Check, Trash2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { extractDominantColors, hexToRgb } from "@/app/color-tools/lib/color-utils";

interface ExtractedColor {
  hex: string;
  percentage: number;
}

export default function ExtractColorsFromImagePage() {
  const [colors, setColors] = useState<ExtractedColor[]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [colorCount, setColorCount] = useState(5);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);
      extractColors(src);
    };
    reader.readAsDataURL(file);
  }, [colorCount]);

  const extractColors = useCallback((src: string) => {
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const extractedColors = extractDominantColors(imageData, colorCount);
      setColors(extractedColors);
      setIsProcessing(false);
    };
    img.onerror = () => {
      toast.error("Failed to load image");
      setIsProcessing(false);
    };
    img.src = src;
  }, [colorCount]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please drop a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);
      extractColors(src);
    };
    reader.readAsDataURL(file);
  }, [extractColors]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedColor(text);
      toast.success(`Color ${text} copied!`);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const exportColors = (format: "css" | "json" | "scss") => {
    let content = "";
    let filename = "colors";
    let mimeType = "text/plain";

    switch (format) {
      case "css":
        content = colors.map((c, i) => `--color-${i + 1}: ${c.hex};`).join("\n");
        filename = "colors.css";
        break;
      case "json":
        content = JSON.stringify(colors, null, 2);
        filename = "colors.json";
        break;
      case "scss":
        content = colors.map((c, i) => `$color-${i + 1}: ${c.hex};`).join("\n");
        filename = "colors.scss";
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported as ${format.toUpperCase()}`);
  };

  const clearAll = () => {
    setColors([]);
    setImageSrc(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Extract Colors from an Image</h1>
          <p className="text-muted-foreground">
            Upload any image and extract its dominant colors directly in your browser using canvas. No data is sent to a server — 100% private and instant.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>
                Drag and drop or click to select an image
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-accent/50 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  {isProcessing ? "Processing..." : "Drop image here or click to upload"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports JPG, PNG, GIF, WebP
                </p>
              </div>

              {imageSrc && (
                <div className="relative">
                  <img
                    src={imageSrc}
                    alt="Uploaded"
                    className="w-full h-64 object-cover rounded-lg bg-checkerboard"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={clearAll}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Color Count Slider */}
              <div className="space-y-2 pt-4">
                <div className="flex items-center justify-between">
                  <Label>Number of Colors</Label>
                  <span className="text-sm font-mono">{colorCount}</span>
                </div>
                <Slider
                  value={[colorCount]}
                  min={2}
                  max={12}
                  step={1}
                  onValueChange={([v]) => setColorCount(v)}
                />
              </div>

              <canvas ref={canvasRef} className="hidden" />
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle>Extracted Colors</CardTitle>
              <CardDescription>
                {colors.length > 0
                  ? `${colors.length} dominant colors found`
                  : "Upload an image to see colors"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {colors.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No colors extracted yet</p>
                  <p className="text-sm mt-1">Upload an image to get started</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {colors.map((color, index) => {
                      const rgb = hexToRgb(color.hex);
                      const luminance = rgb
                        ? (0.2126 * (rgb.r / 255) + 0.7152 * (rgb.g / 255) + 0.0722 * (rgb.b / 255))
                        : 0;
                      const textColor = luminance > 0.179 ? "#000000" : "#FFFFFF";

                      return (
                        <div
                          key={color.hex}
                          className="flex items-center gap-3 p-2 rounded-lg border"
                        >
                          <div
                            className="w-16 h-16 rounded-md border flex-shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-medium">{color.hex}</span>
                              <span className="text-sm text-muted-foreground">
                                {color.percentage}%
                              </span>
                            </div>
                            {rgb && (
                              <p className="text-xs text-muted-foreground">
                                RGB({rgb.r}, {rgb.g}, {rgb.b})
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(color.hex)}
                          >
                            {copiedColor === color.hex ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Export Options */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportColors("css")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      CSS
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportColors("scss")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      SCSS
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportColors("json")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      JSON
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
