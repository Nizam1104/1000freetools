"use client";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Upload, RotateCcw, Wand2, Type } from "lucide-react";

const FreeIconMakerOnline: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [iconType, setIconType] = useState<"text" | "shape" | "emoji">("text");
  const [text, setText] = useState("A");
  const [emoji, setEmoji] = useState("⭐");
  const [shape, setShape] = useState("circle");
  const [backgroundColor, setBackgroundColor] = useState("#4F46E5");
  const [foregroundColor, setForegroundColor] = useState("#ffffff");
  const [iconSize, setIconSize] = useState(256);
  const [borderRadius, setBorderRadius] = useState(50);
  const [fontSize, setFontSize] = useState(128);
  const [generated, setGenerated] = useState(false);
  const [previewData, setPreviewData] = useState("");

  const shapes = ["circle", "square", "rounded", "triangle", "diamond"];
  
  const popularEmojis = ["⭐", "❤️", "🔥", "✨", "🎯", "🚀", "💡", "🏆", "🎨", "📱", "💻", "📧", "📍", "📞", "✓", "✕"];

  const generateIcon = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.width = iconSize;
    canvas.height = iconSize;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, iconSize, iconSize);

    // Draw background
    ctx.fillStyle = backgroundColor;
    
    if (shape === "circle") {
      ctx.beginPath();
      ctx.arc(iconSize / 2, iconSize / 2, iconSize / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === "rounded") {
      const radius = (borderRadius / 100) * (iconSize / 2);
      ctx.beginPath();
      ctx.roundRect(0, 0, iconSize, iconSize, radius);
      ctx.fill();
    } else if (shape === "triangle") {
      ctx.beginPath();
      ctx.moveTo(iconSize / 2, 20);
      ctx.lineTo(iconSize - 20, iconSize - 20);
      ctx.lineTo(20, iconSize - 20);
      ctx.closePath();
      ctx.fill();
    } else if (shape === "diamond") {
      ctx.beginPath();
      ctx.moveTo(iconSize / 2, 20);
      ctx.lineTo(iconSize - 20, iconSize / 2);
      ctx.lineTo(iconSize / 2, iconSize - 20);
      ctx.lineTo(20, iconSize / 2);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, iconSize, iconSize);
    }

    // Draw foreground
    ctx.fillStyle = foregroundColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (iconType === "text") {
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillText(text, iconSize / 2, iconSize / 2);
    } else if (iconType === "emoji") {
      ctx.font = `${fontSize}px Arial`;
      ctx.fillText(emoji, iconSize / 2, iconSize / 2);
    } else if (iconType === "shape") {
      // Draw inner shape
      ctx.beginPath();
      const innerSize = iconSize * 0.4;
      if (shape === "circle") {
        ctx.arc(iconSize / 2, iconSize / 2, innerSize, 0, Math.PI * 2);
      } else {
        ctx.rect(iconSize / 2 - innerSize, iconSize / 2 - innerSize, innerSize * 2, innerSize * 2);
      }
      ctx.fill();
    }

    const dataUrl = canvas.toDataURL("image/png");
    setPreviewData(dataUrl);
    setGenerated(true);

    // Update preview canvas
    const previewCanvas = canvasRef.current;
    if (previewCanvas) {
      previewCanvas.width = 200;
      previewCanvas.height = 200;
      const previewCtx = previewCanvas.getContext("2d");
      if (previewCtx) {
        const img = new Image();
        img.onload = () => {
          previewCtx.drawImage(img, 0, 0, 200, 200);
        };
        img.src = dataUrl;
      }
    }
  }, [iconType, text, emoji, shape, backgroundColor, foregroundColor, iconSize, borderRadius, fontSize]);

  const handleDownload = useCallback(() => {
    if (!previewData) return;
    
    const link = document.createElement("a");
    link.download = `icon-${Date.now()}.png`;
    link.href = previewData;
    link.click();
  }, [previewData]);

  const handleClear = useCallback(() => {
    setText("A");
    setEmoji("⭐");
    setBackgroundColor("#4F46E5");
    setForegroundColor("#ffffff");
    setGenerated(false);
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
            <Wand2 className="w-5 h-5" />
            Free Icon Maker Online
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Icon Type</Label>
              <div className="flex gap-2">
                <Button
                  variant={iconType === "text" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIconType("text")}
                >
                  <Type className="w-4 h-4 mr-1" />
                  Text
                </Button>
                <Button
                  variant={iconType === "emoji" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIconType("emoji")}
                >
                  Emoji
                </Button>
                <Button
                  variant={iconType === "shape" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIconType("shape")}
                >
                  Shape
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shape">Background Shape</Label>
              <select
                id="shape"
                value={shape}
                onChange={(e) => setShape(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {shapes.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="iconSize">Icon Size (px)</Label>
              <Input
                id="iconSize"
                type="number"
                value={iconSize}
                onChange={(e) => setIconSize(Number(e.target.value))}
                min={16}
                max={1024}
              />
            </div>
          </div>

          {iconType === "text" && (
            <div className="space-y-2">
              <Label htmlFor="text">Text</Label>
              <Input
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text"
                maxLength={3}
              />
            </div>
          )}

          {iconType === "emoji" && (
            <div className="space-y-2">
              <Label>Choose Emoji</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {popularEmojis.map((e) => (
                  <button
                    key={e}
                    className={`text-2xl p-2 border rounded ${emoji === e ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                    onClick={() => setEmoji(e)}
                  >
                    {e}
                  </button>
                ))}
              </div>
              <Input
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                placeholder="Or paste any emoji"
              />
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="backgroundColor"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
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
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fontSize">Font Size (px)</Label>
              <Input
                id="fontSize"
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                min={16}
                max={512}
              />
            </div>

            {shape === "rounded" && (
              <div className="space-y-2">
                <Label htmlFor="borderRadius">Border Radius (%)</Label>
                <Input
                  id="borderRadius"
                  type="number"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(Number(e.target.value))}
                  min={0}
                  max={50}
                />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              className="border border-gray-300"
              width={200}
              height={200}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={generateIcon}>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Icon
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!generated}>
              <Download className="w-4 h-4 mr-2" />
              Download PNG
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {generated && previewData && (
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-sm font-semibold mb-2">Icon Preview:</p>
              <div className="flex justify-center">
                <img
                  src={previewData}
                  alt="Generated icon"
                  className="border rounded"
                  style={{ width: iconSize, height: iconSize }}
                />
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">
                {iconSize}x{iconSize}px - PNG format
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeIconMakerOnline;
