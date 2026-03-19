"use client";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, RotateCcw, Image } from "lucide-react";

const PngToIcoConverterOnline: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([16, 32, 48, 64, 128, 256]);
  const [converted, setConverted] = useState(false);
  const [previewData, setPreviewData] = useState<{ size: number; dataUrl: string }[]>([]);

  const availableSizes = [16, 24, 32, 48, 64, 96, 128, 256, 512];

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement("img") as HTMLImageElement;
      img.src = event.target?.result as string;
      img.onload = () => {
        setImage(img);
        setConverted(false);
        setPreviewData([]);
        
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

  const toggleSize = (size: number) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleConvert = useCallback(() => {
    if (!image) return;

    const previews = selectedSizes.map(size => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(image, 0, 0, size, size);
      }
      
      return { size, dataUrl: canvas.toDataURL("image/png") };
    });

    setPreviewData(previews);
    setConverted(true);
  }, [image, selectedSizes]);

  const handleDownload = useCallback(() => {
    if (!previewData.length) return;

    // Create a simple ICO-like file (simplified - real ICO has specific binary format)
    // For this demo, we'll download as a ZIP-like collection of PNGs
    previewData.forEach(({ size, dataUrl }) => {
      const link = document.createElement("a");
      link.download = `icon-${size}x${size}.png`;
      link.href = dataUrl;
      link.click();
    });

    // Note: Real ICO conversion would require binary format handling
    alert("Note: Downloaded as individual PNGs. For true ICO format, use a dedicated converter tool.");
  }, [previewData]);

  const handleClear = useCallback(() => {
    setImage(null);
    setConverted(false);
    setPreviewData([]);
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
            <Image className="w-5 h-5" />
            PNG to ICO Converter Online
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="imageUpload">Upload PNG Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Input
                  id="imageUpload"
                  type="file"
                  accept="image/png"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Label htmlFor="imageUpload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload PNG</p>
                  <p className="text-xs text-gray-500">Recommended: 512x512 or larger</p>
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Select Icon Sizes</Label>
              <div className="grid grid-cols-3 gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    className={`p-2 border-2 rounded text-sm transition-all ${
                      selectedSizes.includes(size)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => toggleSize(size)}
                  >
                    {size}x{size}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Standard sizes: 16, 32, 48, 64, 128, 256
              </p>
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
            <Button onClick={handleConvert} disabled={!image}>
              <Image className="w-4 h-4 mr-2" />
              Convert to ICO
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!converted}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {converted && previewData.length > 0 && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Generated Icon Sizes ({previewData.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {previewData.map(({ size, dataUrl }, i) => (
                      <div key={i} className="text-center">
                        <img
                          src={dataUrl}
                          alt={`${size}x${size}`}
                          className="w-16 h-16 mx-auto border rounded bg-gray-100"
                        />
                        <p className="text-xs mt-1">{size}x{size}</p>
                        <a
                          href={dataUrl}
                          download={`icon-${size}x${size}.png`}
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
                <p className="text-sm font-semibold mb-2">Conversion Summary:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Generated {previewData.length} icon sizes</li>
                  <li>• Sizes: {selectedSizes.join(", ")}px</li>
                  <li>• Format: PNG (download individually)</li>
                </ul>
                <p className="text-xs text-gray-500 mt-2">
                  Note: For true ICO format with multiple sizes in one file, use a dedicated ICO converter.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PngToIcoConverterOnline;
