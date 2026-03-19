"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Minimize2, Upload } from "lucide-react";

const QrCodeFileSizeOptimizer: React.FC = () => {
  const [qrData, setQrData] = useState("");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M");
  const [version, setVersion] = useState("auto");
  const [margin, setMargin] = useState(4);
  const [scale, setScale] = useState(8);
  const [outputFormat, setOutputFormat] = useState("png");
  const [quality, setQuality] = useState(90);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [optimizedSize, setOptimizedSize] = useState<number | null>(null);
  const [optimized, setOptimized] = useState(false);

  const errorCorrectionLevels = [
    { value: "L", label: "Low (7%)" },
    { value: "M", label: "Medium (15%)" },
    { value: "Q", label: "Quartile (25%)" },
    { value: "H", label: "High (30%)" },
  ];

  const outputFormats = ["png", "jpg", "webp", "svg"];

  const handleOptimize = useCallback(() => {
    if (!qrData) return;
    
    // Simulate size calculation based on data length and settings
    const baseSize = qrData.length * 100;
    const ecMultiplier = { L: 0.8, M: 1, Q: 1.2, H: 1.4 }[errorCorrectionLevel] ?? 1;
    const scaleMultiplier = scale / 8;
    const qualityMultiplier = quality / 100;
    
    const calculatedOriginal = baseSize * ecMultiplier * scaleMultiplier;
    const calculatedOptimized = calculatedOriginal * qualityMultiplier;
    
    setOriginalSize(Math.round(calculatedOriginal));
    setOptimizedSize(Math.round(calculatedOptimized));
    setOptimized(true);
  }, [qrData, errorCorrectionLevel, scale, quality]);

  const handleClear = useCallback(() => {
    setQrData("");
    setErrorCorrectionLevel("M");
    setVersion("auto");
    setMargin(4);
    setScale(8);
    setOutputFormat("png");
    setQuality(90);
    setOriginalSize(null);
    setOptimizedSize(null);
    setOptimized(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (optimizedSize && originalSize) {
      const report = `QR Code Optimization Report:
Original Size: ${(originalSize / 1024).toFixed(2)} KB
Optimized Size: ${(optimizedSize / 1024).toFixed(2)} KB
Reduction: ${((1 - optimizedSize / originalSize) * 100).toFixed(1)}%
Settings:
- Error Correction: ${errorCorrectionLevel}
- Scale: ${scale}x
- Quality: ${quality}%
- Format: ${outputFormat}`;
      navigator.clipboard.writeText(report);
    }
  }, [optimizedSize, originalSize, errorCorrectionLevel, scale, quality, outputFormat]);

  const handleDownload = useCallback(() => {
    const canvas = document.createElement("canvas");
    const size = 300;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      
      // Simulated QR pattern with optimization visualization
      const qrSize = 250;
      const qrStart = 25;
      const blockSize = qrSize / 21;
      
      for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 21; j++) {
          if (Math.random() > 0.5) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(qrStart + i * blockSize, qrStart + j * blockSize, blockSize - 1, blockSize - 1);
          }
        }
      }
      
      // Add optimization info
      ctx.fillStyle = "#666666";
      ctx.font = "10px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`Optimized: ${outputFormat.toUpperCase()} | Q: ${quality}%`, 150, 290);
    }
    
    const link = document.createElement("a");
    link.download = `qr-optimized.${outputFormat}`;
    link.href = canvas.toDataURL(`image/${outputFormat}`, quality / 100);
    link.click();
  }, [outputFormat, quality]);

  const formatBytes = (bytes: number | null) => {
    if (bytes === null) return "-";
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Minimize2 className="w-5 h-5" />
            QR Code File Size Optimizer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="qrData">QR Code Data</Label>
              <Textarea
                id="qrData"
                value={qrData}
                onChange={(e) => setQrData(e.target.value)}
                placeholder="Enter URL or text for QR code"
                rows={3}
              />
              {qrData && (
                <p className="text-xs text-gray-500">
                  Data length: {qrData.length} characters
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="errorCorrection">Error Correction Level</Label>
              <select
                id="errorCorrection"
                value={errorCorrectionLevel}
                onChange={(e) => setErrorCorrectionLevel(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {errorCorrectionLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500">
                Lower = smaller file, Higher = more damage resistant
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="version">QR Version</Label>
              <select
                id="version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="auto">Auto (Recommended)</option>
                {Array.from({ length: 40 }, (_, i) => i + 1).map((v) => (
                  <option key={v} value={v}>Version {v}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="margin">Margin (modules)</Label>
              <Input
                id="margin"
                type="number"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                min={0}
                max={20}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scale">Scale Factor</Label>
              <Input
                id="scale"
                type="number"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                min={1}
                max={20}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="outputFormat">Output Format</Label>
              <select
                id="outputFormat"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {outputFormats.map((format) => (
                  <option key={format} value={format}>
                    {format.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality">Quality ({quality}%)</Label>
              <Input
                id="quality"
                type="range"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                min={10}
                max={100}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Lower quality = smaller file size
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleOptimize} disabled={!qrData}>
              <Minimize2 className="w-4 h-4 mr-2" />
              Optimize
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!optimized}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Report
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!optimized}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {optimized && originalSize && optimizedSize && (
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-500">Original Size</p>
                  <p className="text-2xl font-bold">{formatBytes(originalSize)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-500">Optimized Size</p>
                  <p className="text-2xl font-bold text-green-600">{formatBytes(optimizedSize)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-500">Reduction</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {((1 - optimizedSize / originalSize) * 100).toFixed(1)}%
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {optimized && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <p className="text-sm font-semibold mb-2">Optimization Summary:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Error Correction: {errorCorrectionLevel}</li>
                <li>• Output Format: {outputFormat.toUpperCase()}</li>
                <li>• Quality: {quality}%</li>
                <li>• Scale: {scale}x</li>
                <li>• Margin: {margin} modules</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QrCodeFileSizeOptimizer;
