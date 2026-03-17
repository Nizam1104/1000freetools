"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Palette, Square } from "lucide-react";

const QrCodeFrameBorderDesigner: React.FC = () => {
  const [qrData, setQrData] = useState("https://example.com");
  const [frameStyle, setFrameStyle] = useState("rounded");
  const [borderWidth, setBorderWidth] = useState(10);
  const [borderColor, setBorderColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [frameColor, setFrameColor] = useState("#333333");
  const [caption, setCaption] = useState("");
  const [captionPosition, setCaptionPosition] = useState("bottom");
  const [logoUrl, setLogoUrl] = useState("");
  const [generated, setGenerated] = useState(false);

  const frameStyles = ["rounded", "square", "circle", "dots", "custom"];

  const handleGenerate = useCallback(() => {
    setGenerated(true);
  }, []);

  const handleClear = useCallback(() => {
    setQrData("https://example.com");
    setFrameStyle("rounded");
    setBorderWidth(10);
    setBorderColor("#000000");
    setBackgroundColor("#ffffff");
    setForegroundColor("#000000");
    setFrameColor("#333333");
    setCaption("");
    setCaptionPosition("bottom");
    setLogoUrl("");
    setGenerated(false);
  }, []);

  const handleCopy = useCallback(() => {
    const config = JSON.stringify({
      qrData,
      frameStyle,
      borderWidth,
      borderColor,
      backgroundColor,
      foregroundColor,
      frameColor,
      caption,
      captionPosition,
      logoUrl,
    }, null, 2);
    navigator.clipboard.writeText(config);
  }, [qrData, frameStyle, borderWidth, borderColor, backgroundColor, foregroundColor, frameColor, caption, captionPosition, logoUrl]);

  const handleDownload = useCallback(() => {
    const canvas = document.createElement("canvas");
    const size = 300 + (borderWidth * 2);
    canvas.width = size;
    canvas.height = size + (caption ? 40 : 0);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      
      if (frameStyle === "rounded") {
        const radius = 20;
        ctx.beginPath();
        ctx.roundRect(borderWidth / 2, borderWidth / 2, 300, 300, radius);
        ctx.stroke();
      } else if (frameStyle === "square") {
        ctx.strokeRect(borderWidth / 2, borderWidth / 2, 300, 300);
      } else if (frameStyle === "circle") {
        ctx.beginPath();
        ctx.arc(150 + borderWidth / 2, 150 + borderWidth / 2, 150, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      if (caption) {
        ctx.fillStyle = frameColor;
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        if (captionPosition === "bottom") {
          ctx.fillText(caption, size / 2, size + 25);
        } else {
          ctx.fillText(caption, size / 2, -10);
        }
      }
    }
    
    const link = document.createElement("a");
    link.download = "qr-code-frame.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [borderWidth, borderColor, backgroundColor, frameStyle, caption, captionPosition, frameColor]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Square className="w-5 h-5" />
            QR Code Frame & Border Designer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="qrData">QR Code Data (URL/Text)</Label>
              <Textarea
                id="qrData"
                value={qrData}
                onChange={(e) => setQrData(e.target.value)}
                placeholder="Enter URL or text"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frameStyle">Frame Style</Label>
              <select
                id="frameStyle"
                value={frameStyle}
                onChange={(e) => setFrameStyle(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {frameStyles.map((style) => (
                  <option key={style} value={style}>
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="borderWidth">Border Width (px)</Label>
              <Input
                id="borderWidth"
                type="number"
                value={borderWidth}
                onChange={(e) => setBorderWidth(Number(e.target.value))}
                min={0}
                max={50}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="borderColor">Border Color</Label>
              <div className="flex gap-2">
                <Input
                  id="borderColor"
                  type="color"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="backgroundColor"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="foregroundColor">Foreground Color</Label>
              <div className="flex gap-2">
                <Input
                  id="foregroundColor"
                  type="color"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frameColor">Frame Color</Label>
              <div className="flex gap-2">
                <Input
                  id="frameColor"
                  type="color"
                  value={frameColor}
                  onChange={(e) => setFrameColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={frameColor}
                  onChange={(e) => setFrameColor(e.target.value)}
                  placeholder="#333333"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="caption">Caption Text</Label>
              <Input
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Optional caption"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="captionPosition">Caption Position</Label>
              <select
                id="captionPosition"
                value={captionPosition}
                onChange={(e) => setCaptionPosition(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logoUrl">Logo URL (Optional)</Label>
              <Input
                id="logoUrl"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleGenerate}>
              <Palette className="w-4 h-4 mr-2" />
              Generate Preview
            </Button>
            <Button onClick={handleCopy} variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy Config
            </Button>
            <Button onClick={handleDownload} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {generated && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">Preview (Placeholder - integrate QR library for actual generation)</p>
              <div 
                className="mx-auto flex items-center justify-center"
                style={{
                  width: 300 + (borderWidth * 2),
                  height: 300 + (borderWidth * 2) + (caption ? 40 : 0),
                  backgroundColor,
                  border: `${borderWidth}px solid ${borderColor}`,
                  borderRadius: frameStyle === "rounded" ? "20px" : frameStyle === "circle" ? "50%" : "0",
                }}
              >
                <div className="text-center text-gray-400">
                  <Square className="w-32 h-32 mx-auto mb-2" />
                  <p className="text-xs">QR Code Preview</p>
                  <p className="text-xs text-gray-500 mt-1">{qrData.substring(0, 30)}...</p>
                  {caption && (
                    <p className="text-sm mt-2" style={{ color: frameColor }}>{caption}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QrCodeFrameBorderDesigner;
