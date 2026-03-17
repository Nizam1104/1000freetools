"use client";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, RotateCcw, Smartphone, Tablet } from "lucide-react";

const IconResizerForAndroidIos: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [platform, setPlatform] = useState<"android" | "ios" | "both">("both");
  const [customSize, setCustomSize] = useState("");
  const [resized, setResized] = useState(false);
  const [generatedSizes, setGeneratedSizes] = useState<{ name: string; size: number; dataUrl: string }[]>([]);

  const androidSizes = [
    { name: "mdpi", size: 48 },
    { name: "hdpi", size: 72 },
    { name: "xhdpi", size: 96 },
    { name: "xxhdpi", size: 144 },
    { name: "xxxhdpi", size: 192 },
    { name: "play-store", size: 512 },
  ];

  const iosSizes = [
    { name: "icon-20", size: 20 },
    { name: "icon-29", size: 29 },
    { name: "icon-40", size: 40 },
    { name: "icon-60", size: 60 },
    { name: "icon-76", size: 76 },
    { name: "icon-83.5", size: 83.5 },
    { name: "icon-1024", size: 1024 },
    { name: "icon-120", size: 120 },
    { name: "icon-152", size: 152 },
    { name: "icon-167", size: 167 },
    { name: "icon-180", size: 180 },
  ];

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setResized(false);
        setGeneratedSizes([]);
        
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = Math.min(img.width, 300);
          canvas.height = Math.min(img.height, 300);
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

  const resizeImage = useCallback((size: number): string => {
    if (!image) return "";
    
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(image, 0, 0, size, size);
    }
    
    return canvas.toDataURL("image/png");
  }, [image]);

  const handleResize = useCallback(() => {
    if (!image) return;

    const sizesToGenerate: { name: string; size: number }[] = [];

    if (platform === "android" || platform === "both") {
      sizesToGenerate.push(...androidSizes);
    }
    if (platform === "ios" || platform === "both") {
      sizesToGenerate.push(...iosSizes);
    }
    if (customSize) {
      const size = parseInt(customSize);
      if (size > 0) {
        sizesToGenerate.push({ name: "custom", size });
      }
    }

    const generated = sizesToGenerate.map(item => ({
      name: item.name,
      size: item.size,
      dataUrl: resizeImage(item.size),
    }));

    setGeneratedSizes(generated);
    setResized(true);
  }, [image, platform, customSize, resizeImage]);

  const handleDownloadAll = useCallback(() => {
    generatedSizes.forEach(item => {
      const link = document.createElement("a");
      link.download = `icon-${item.name}-${item.size}x${item.size}.png`;
      link.href = item.dataUrl;
      link.click();
    });
  }, [generatedSizes]);

  const handleClear = useCallback(() => {
    setImage(null);
    setResized(false);
    setGeneratedSizes([]);
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
            <Smartphone className="w-5 h-5" />
            Icon Resizer for Android & iOS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="imageUpload">Upload Source Icon</Label>
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
                  <p className="text-sm text-gray-600">Click to upload icon</p>
                  <p className="text-xs text-gray-500">Recommended: 1024x1024 PNG</p>
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Target Platform</Label>
              <div className="flex gap-2 mb-3">
                <Button
                  variant={platform === "android" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPlatform("android")}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Android
                </Button>
                <Button
                  variant={platform === "ios" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPlatform("ios")}
                >
                  <Tablet className="w-4 h-4 mr-2" />
                  iOS
                </Button>
                <Button
                  variant={platform === "both" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPlatform("both")}
                >
                  Both
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customSize">Custom Size (Optional)</Label>
                <Input
                  id="customSize"
                  value={customSize}
                  onChange={(e) => setCustomSize(e.target.value)}
                  placeholder="e.g., 256"
                  type="number"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              className="border border-gray-300"
              width={300}
              height={300}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleResize} disabled={!image}>
              <Smartphone className="w-4 h-4 mr-2" />
              Generate All Sizes
            </Button>
            <Button 
              onClick={handleDownloadAll} 
              variant="outline" 
              disabled={!resized}
            >
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {resized && generatedSizes.length > 0 && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Generated Icon Sizes ({generatedSizes.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {generatedSizes.map((item, i) => (
                      <div key={i} className="text-center">
                        <img
                          src={item.dataUrl}
                          alt={item.name}
                          className="w-16 h-16 mx-auto border rounded"
                          style={{ width: Math.min(item.size, 64), height: Math.min(item.size, 64) }}
                        />
                        <p className="text-xs mt-1 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.size}x{item.size}</p>
                        <a
                          href={item.dataUrl}
                          download={`icon-${item.name}.png`}
                          className="text-xs text-blue-500 hover:underline"
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="p-4 border rounded-lg bg-blue-50">
                <p className="text-sm font-semibold mb-2">Output Summary:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {platform === "android" || platform === "both" ? (
                    <li>• Android: {androidSizes.length} sizes (mdpi to xxxhdpi + Play Store)</li>
                  ) : null}
                  {platform === "ios" || platform === "both" ? (
                    <li>• iOS: {iosSizes.length} sizes (20px to 1024px)</li>
                  ) : null}
                  {customSize && (
                    <li>• Custom: {customSize}x{customSize}px</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IconResizerForAndroidIos;
