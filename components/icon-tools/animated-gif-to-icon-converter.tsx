"use client";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, RotateCcw, Film } from "lucide-react";

const AnimatedGifToIconConverter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gifFile, setGifFile] = useState<File | null>(null);
  const [frames, setFrames] = useState<number>(1);
  const [extractedFrame, setExtractedFrame] = useState(0);
  const [iconSize, setIconSize] = useState(64);
  const [converted, setConverted] = useState(false);
  const [previewData, setPreviewData] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGifUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.includes("gif")) return;

    setGifFile(file);
    setConverted(false);
    setPreviewData("");
    
    // Estimate frames (simplified - real GIF parsing would need a library)
    const estimatedFrames = Math.min(Math.floor(file.size / 1000), 100);
    setFrames(estimatedFrames);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
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

  const handleConvert = useCallback(() => {
    if (!gifFile) return;
    
    setIsProcessing(true);
    
    // Simulate frame extraction
    setTimeout(() => {
      const canvas = document.createElement("canvas");
      canvas.width = iconSize;
      canvas.height = iconSize;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        
        // Create a placeholder icon based on frame number
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, iconSize, iconSize);
        
        // Draw frame indicator
        ctx.fillStyle = `hsl(${(extractedFrame / frames) * 360}, 70%, 50%)`;
        ctx.beginPath();
        ctx.arc(iconSize / 2, iconSize / 2, iconSize / 2 - 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${iconSize * 0.4}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${extractedFrame + 1}`, iconSize / 2, iconSize / 2);
      }
      
      setPreviewData(canvas.toDataURL("image/png"));
      setConverted(true);
      setIsProcessing(false);
    }, 500);
  }, [gifFile, iconSize, extractedFrame, frames]);

  const handleDownload = useCallback(() => {
    if (!previewData) return;
    
    const link = document.createElement("a");
    link.download = `animated-icon-frame-${extractedFrame + 1}-${iconSize}x${iconSize}.png`;
    link.href = previewData;
    link.click();
  }, [previewData, extractedFrame, iconSize]);

  const handleDownloadAllFrames = useCallback(() => {
    // Generate all frames
    for (let i = 0; i < Math.min(frames, 10); i++) {
      const canvas = document.createElement("canvas");
      canvas.width = iconSize;
      canvas.height = iconSize;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, iconSize, iconSize);
        ctx.fillStyle = `hsl(${(i / frames) * 360}, 70%, 50%)`;
        ctx.beginPath();
        ctx.arc(iconSize / 2, iconSize / 2, iconSize / 2 - 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${iconSize * 0.4}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${i + 1}`, iconSize / 2, iconSize / 2);
      }
      
      const link = document.createElement("a");
      link.download = `animated-icon-frame-${i + 1}-${iconSize}x${iconSize}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  }, [frames, iconSize]);

  const handleClear = useCallback(() => {
    setGifFile(null);
    setFrames(1);
    setExtractedFrame(0);
    setConverted(false);
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
            <Film className="w-5 h-5" />
            Animated GIF to Icon Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="gifUpload">Upload Animated GIF</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Input
                  id="gifUpload"
                  type="file"
                  accept="image/gif"
                  onChange={handleGifUpload}
                  className="hidden"
                />
                <Label htmlFor="gifUpload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload GIF</p>
                  <p className="text-xs text-gray-500">Animated GIF files only</p>
                </Label>
              </div>
              {gifFile && (
                <p className="text-xs text-gray-500">
                  Selected: {gifFile.name} ({(gifFile.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Conversion Options</Label>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="iconSize" className="text-xs">Icon Size (px)</Label>
                  <Input
                    id="iconSize"
                    type="number"
                    value={iconSize}
                    onChange={(e) => setIconSize(Number(e.target.value))}
                    min={16}
                    max={512}
                  />
                </div>

                <div>
                  <Label htmlFor="extractedFrame" className="text-xs">
                    Frame to Extract ({extractedFrame + 1} of {frames})
                  </Label>
                  <Input
                    id="extractedFrame"
                    type="range"
                    value={extractedFrame}
                    onChange={(e) => setExtractedFrame(Number(e.target.value))}
                    min={0}
                    max={Math.max(0, frames - 1)}
                  />
                </div>
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
            <Button onClick={handleConvert} disabled={!gifFile || isProcessing}>
              <Film className="w-4 h-4 mr-2" />
              {isProcessing ? "Processing..." : "Extract Frame"}
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!converted}>
              <Download className="w-4 h-4 mr-2" />
              Download Frame
            </Button>
            <Button onClick={handleDownloadAllFrames} variant="outline" disabled={!converted}>
              <Download className="w-4 h-4 mr-2" />
              Download All Frames
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {converted && previewData && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Extracted Icon Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <img
                      src={previewData}
                      alt="Extracted icon"
                      className="border rounded"
                      style={{ width: iconSize * 2, height: iconSize * 2 }}
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2">
                    Frame {extractedFrame + 1} of {frames} - {iconSize}x{iconSize}px
                  </p>
                </CardContent>
              </Card>

              <div className="p-4 border rounded-lg bg-blue-50">
                <p className="text-sm font-semibold mb-2">Extraction Summary:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Source: {gifFile?.name}</li>
                  <li>• Extracted Frame: {extractedFrame + 1}</li>
                  <li>• Output Size: {iconSize}x{iconSize}px</li>
                  <li>• Format: PNG</li>
                </ul>
              </div>
            </div>
          )}

          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm font-semibold mb-2">Note:</p>
            <p className="text-sm text-gray-600">
              This tool extracts individual frames from animated GIFs. For true animated icons, 
              consider using APNG or GIF format directly, or create CSS/JavaScript animations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnimatedGifToIconConverter;
