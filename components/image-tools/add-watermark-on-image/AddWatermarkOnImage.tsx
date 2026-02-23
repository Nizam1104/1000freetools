"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface WatermarkSettings {
  text: string;
  fontSize: number;
  color: string;
  opacity: number;
  fontFamily: string;
  position:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

export default function AddWatermarkOnImage() {
  const [image, setImage] = useState<string | null>(null);
  const [watermarkedImage, setWatermarkedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [settings, setSettings] = useState<WatermarkSettings>({
    text: "Watermark",
    fontSize: 48,
    color: "#000000",
    opacity: 0.7,
    fontFamily: "Arial",
    position: "center",
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImage(result);
        setWatermarkedImage(null);
        setDragPosition(null);

        // Load image to get dimensions
        const img = new Image();
        img.onload = () => {
          setOriginalSize({ width: img.width, height: img.height });
          setSettings((prev) => ({
            ...prev,
            fontSize: Math.min(48, Math.max(24, img.height / 20)),
          }));
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const updateSettings = useCallback((updates: Partial<WatermarkSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const getWatermarkPosition = useCallback(() => {
    if (
      !canvasRef.current ||
      !canvasRef.current.width ||
      !canvasRef.current.height
    )
      return { x: 0, y: 0 };

    const canvas = canvasRef.current;
    if (dragPosition) {
      return dragPosition;
    }

    const padding = 40;
    let x = 0,
      y = 0;

    switch (settings.position) {
      case "top-left":
        x = padding;
        y = padding;
        break;
      case "top-center":
        x = canvas.width / 2;
        y = padding;
        break;
      case "top-right":
        x = canvas.width - padding;
        y = padding;
        break;
      case "center":
        x = canvas.width / 2;
        y = canvas.height / 2;
        break;
      case "bottom-left":
        x = padding;
        y = canvas.height - padding;
        break;
      case "bottom-center":
        x = canvas.width / 2;
        y = canvas.height - padding;
        break;
      case "bottom-right":
        x = canvas.width - padding;
        y = canvas.height - padding;
        break;
    }

    return { x, y };
  }, [settings.position, dragPosition]);

  const updatePreviewCanvas = useCallback(() => {
    if (!canvasRef.current || !previewCanvasRef.current) return;

    const mainCanvas = canvasRef.current;
    const previewCanvas = previewCanvasRef.current;
    const previewCtx = previewCanvas.getContext("2d");
    if (!previewCtx) return;

    const maxPreviewSize = 600;
    const scale = Math.min(
      maxPreviewSize / mainCanvas.width,
      maxPreviewSize / mainCanvas.height,
      1,
    );

    previewCanvas.width = mainCanvas.width * scale;
    previewCanvas.height = mainCanvas.height * scale;

    previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    previewCtx.drawImage(
      mainCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
    );
  }, []);

  const drawWatermark = useCallback(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create a temporary image to draw the original image
    const img = new Image();
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the original image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      if (settings.text.trim()) {
        const position = getWatermarkPosition();

        // Save current context state
        ctx.save();

        // Set font properties
        ctx.font = `${settings.fontSize}px ${settings.fontFamily}`;
        ctx.fillStyle = settings.color;
        ctx.globalAlpha = settings.opacity;

        // Text alignment based on position
        if (settings.position.includes("center")) {
          ctx.textAlign = "center";
        } else if (settings.position.includes("right")) {
          ctx.textAlign = "right";
        } else {
          ctx.textAlign = "left";
        }

        ctx.textBaseline = settings.position.includes("top")
          ? "top"
          : settings.position.includes("bottom")
            ? "bottom"
            : "middle";

        // Add text shadow for better visibility
        ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        // Draw watermark text
        ctx.fillText(settings.text, position.x, position.y);

        // Restore context state (resets alpha, shadow, etc.)
        ctx.restore();
      }

      // Update preview canvas with scaled down version
      updatePreviewCanvas();
    };
    img.src = image;
  }, [image, settings, getWatermarkPosition]);

  // Function to redraw only the watermark (for real-time updates)
  const redrawWatermark = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear only the area where text was previously drawn (simplified - just redraw everything)
    // For better performance, we could clear only the text area, but for now, redraw everything
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      if (settings.text.trim()) {
        const position = getWatermarkPosition();

        // Save current context state
        ctx.save();

        // Set font properties
        ctx.font = `${settings.fontSize}px ${settings.fontFamily}`;
        ctx.fillStyle = settings.color;
        ctx.globalAlpha = settings.opacity;

        // Text alignment based on position
        if (settings.position.includes("center")) {
          ctx.textAlign = "center";
        } else if (settings.position.includes("right")) {
          ctx.textAlign = "right";
        } else {
          ctx.textAlign = "left";
        }

        ctx.textBaseline = settings.position.includes("top")
          ? "top"
          : settings.position.includes("bottom")
            ? "bottom"
            : "middle";

        // Add text shadow for better visibility
        ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        // Draw watermark text
        ctx.fillText(settings.text, position.x, position.y);

        // Restore context state (resets alpha, shadow, etc.)
        ctx.restore();
      }

      // Update preview canvas with scaled down version
      updatePreviewCanvas();
    };
    img.src = image || "";
  }, [image, settings, getWatermarkPosition, updatePreviewCanvas]);

  const applyWatermark = () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }

    if (!settings.text.trim()) {
      toast.error("Please enter watermark text");
      return;
    }

    drawWatermark();

    // Convert canvas to blob and create URL
    if (canvasRef.current) {
      canvasRef.current.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setWatermarkedImage(url);
            toast.success("Watermark applied successfully!");
          }
        },
        "image/png",
        0.95,
      );
    }
  };

  const downloadImage = () => {
    if (!watermarkedImage) {
      toast.error("No watermarked image to download");
      return;
    }

    const link = document.createElement("a");
    link.href = watermarkedImage;
    link.download = `watermarked-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (
      !previewCanvasRef.current ||
      !canvasRef.current ||
      !canvasRef.current.width ||
      !canvasRef.current.height
    )
      return;

    const rect = previewCanvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * canvasRef.current.width) / rect.width;
    const y = ((e.clientY - rect.top) * canvasRef.current.height) / rect.height;

    setIsDragging(true);
    setDragPosition({ x, y });
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (
      !isDragging ||
      !previewCanvasRef.current ||
      !canvasRef.current ||
      !canvasRef.current.width ||
      !canvasRef.current.height
    )
      return;

    const rect = previewCanvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * canvasRef.current.width) / rect.width;
    const y = ((e.clientY - rect.top) * canvasRef.current.height) / rect.height;

    setDragPosition({ x, y });
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  // Redraw watermark when settings change
  useEffect(() => {
    if (
      image &&
      canvasRef.current &&
      canvasRef.current.width > 0 &&
      canvasRef.current.height > 0
    ) {
      // Only redraw the watermark part (not reload the whole image)
      redrawWatermark();
    } else if (image) {
      // If canvas isn't initialized yet, do full draw
      drawWatermark();
    }
  }, [image, settings, redrawWatermark, drawWatermark]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="image-upload">
            Upload Image (JPG, PNG, WebP, GIF)
          </Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
          />
          <p className="text-sm text-muted-foreground">
            Supports all image formats including JPG, JPEG, PNG, WebP, GIF, BMP,
            and TIFF. Your images are processed locally for privacy.
          </p>
        </div>

        {image && (
          <>
            <Separator />

            {/* Two column layout: Preview on left, Controls on right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left column - Preview */}
              <div className="space-y-4">
                <Label>
                  Watermarked Preview
                  <span className="text-xs text-muted-foreground ml-2">
                    (Click and drag to reposition)
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({originalSize.width} × {originalSize.height}px)
                  </span>
                </Label>
                <div className="border rounded-lg overflow-hidden bg-muted/10 p-6">
                  <canvas
                    ref={previewCanvasRef}
                    onMouseDown={handleCanvasMouseDown}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                    onMouseLeave={handleCanvasMouseUp}
                    className="max-w-full h-auto mx-auto cursor-move"
                    style={{
                      maxHeight: "600px",
                      border: isDragging ? "2px solid blue" : "none",
                    }}
                  />
                  {watermarkedImage && (
                    <Button onClick={downloadImage} className="w-full mt-6">
                      Download Watermarked Image
                    </Button>
                  )}
                </div>
              </div>

              {/* Right column - Controls */}
              <div className="space-y-6">
                {/* Text controls */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Text Settings</h3>

                  <div className="space-y-2">
                    <Label htmlFor="watermark-text">Watermark Text</Label>
                    <Input
                      id="watermark-text"
                      value={settings.text}
                      onChange={(e) => updateSettings({ text: e.target.value })}
                      placeholder="Enter watermark text"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Font Family</Label>
                    <Select
                      value={settings.fontFamily}
                      onValueChange={(value) =>
                        updateSettings({ fontFamily: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Helvetica">Helvetica</SelectItem>
                        <SelectItem value="Times New Roman">
                          Times New Roman
                        </SelectItem>
                        <SelectItem value="Georgia">Georgia</SelectItem>
                        <SelectItem value="Verdana">Verdana</SelectItem>
                        <SelectItem value="Courier New">Courier New</SelectItem>
                        <SelectItem value="Impact">Impact</SelectItem>
                        <SelectItem value="Comic Sans MS">
                          Comic Sans MS
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Font Size: {settings.fontSize}px</Label>
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={([value]) =>
                        updateSettings({ fontSize: value })
                      }
                      max={200}
                      min={12}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="text-color"
                        type="color"
                        value={settings.color}
                        onChange={(e) =>
                          updateSettings({ color: e.target.value })
                        }
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={settings.color}
                        onChange={(e) =>
                          updateSettings({ color: e.target.value })
                        }
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Position and effect controls */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Position & Effects</h3>

                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Select
                      value={settings.position}
                      onValueChange={(value: WatermarkSettings["position"]) =>
                        updateSettings({ position: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top-left">Top Left</SelectItem>
                        <SelectItem value="top-center">Top Center</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="bottom-center">
                          Bottom Center
                        </SelectItem>
                        <SelectItem value="bottom-right">
                          Bottom Right
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Opacity: {Math.round(settings.opacity * 100)}%
                    </Label>
                    <Slider
                      value={[settings.opacity]}
                      onValueChange={([value]) =>
                        updateSettings({ opacity: value })
                      }
                      max={1}
                      min={0}
                      step={0.01}
                      className="w-full"
                    />
                  </div>

                  <Button
                    onClick={applyWatermark}
                    className="w-full"
                    disabled={!image || !settings.text.trim()}
                  >
                    Apply Watermark
                  </Button>

                  {dragPosition && (
                    <Button
                      variant="outline"
                      onClick={() => setDragPosition(null)}
                      className="w-full"
                    >
                      Reset to Preset Position
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium">How to add watermarks:</p>
              <p>• Upload your image using the file input above</p>
              <p>• Enter your custom watermark text</p>
              <p>• Adjust font, size, color, and opacity to match your style</p>
              <p>
                • Choose a preset position or click and drag on the preview for
                custom placement
              </p>
              <p>
                • Click "Apply Watermark" to generate your watermarked image
              </p>
              <p className="pt-2 text-blue-600">
                ✓ Free watermarking with instant results
              </p>
            </div>
          </>
        )}
      </Card>

      {/* Hidden canvas for actual watermark processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
