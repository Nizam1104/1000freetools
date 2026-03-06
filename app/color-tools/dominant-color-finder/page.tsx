"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Upload,
  Copy,
  Check,
  Trash2,
  Image as ImageIcon,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import {
  extractDominantColors,
  hexToRgb,
  rgbToHsl,
  rgbToCmyk,
} from "@/app/color-tools/lib/color-utils";
import { DominantColorFinderSEO } from "@/components/seo-content/color-tools/DominantColorFinder";

export const relatedTools = [
  { name: "Extract Colors from Image", href: "/color-tools/extract-colors-from-image", description: "Extract full color palettes from any image" },
  { name: "Color Picker", href: "/color-tools/color-picker", description: "Pick and convert colors in multiple formats" },
  { name: "CSS Variables Generator", href: "/color-tools/css-variables-generator", description: "Generate CSS custom properties from colors" },
  { name: "Color History Tool", href: "/color-tools/color-history", description: "Track and manage your color history" },
];

export default function DominantColorFinderPage() {
  const [dominantColor, setDominantColor] = useState<{
    hex: string;
    percentage: number;
  } | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        setImageSrc(src);
        findDominantColor(src);
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const findDominantColor = useCallback((src: string) => {
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
      const colors = extractDominantColors(imageData, 1);

      if (colors.length > 0) {
        setDominantColor(colors[0]);
      }
      setIsProcessing(false);
    };
    img.onerror = () => {
      toast.error("Failed to load image");
      setIsProcessing(false);
    };
    img.src = src;
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
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
        findDominantColor(src);
      };
      reader.readAsDataURL(file);
    },
    [findDominantColor],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(`${field} copied!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const clearAll = () => {
    setDominantColor(null);
    setImageSrc(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0"
      onClick={() => copyToClipboard(text, field)}
    >
      {copiedField === field ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Dominant Color Finder from Image
          </h1>
          <p className="text-muted-foreground">
            Find the single most dominant color in any uploaded image. Great for
            auto-generating themes, UI accents, or brand colors from photos.
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
                  {isProcessing
                    ? "Processing..."
                    : "Drop image here or click to upload"}
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
                    className="w-full h-64 object-cover rounded-lg "
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

              <canvas ref={canvasRef} className="hidden" />
            </CardContent>
          </Card>

          {/* Result Section */}
          <Card>
            <CardHeader>
              <CardTitle>Dominant Color</CardTitle>
              <CardDescription>
                {dominantColor
                  ? `Covers ${dominantColor.percentage}% of the image`
                  : "Upload an image to find the dominant color"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {dominantColor ? (
                <>
                  {/* Color Preview */}
                  <div
                    className="w-full aspect-video rounded-lg border shadow-sm"
                    style={{ backgroundColor: dominantColor.hex }}
                  />

                  {/* Color Values */}
                  <div className="space-y-4">
                    {/* HEX */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">
                        HEX
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          value={dominantColor.hex}
                          readOnly
                          className="font-mono flex-1"
                        />
                        <CopyButton text={dominantColor.hex} field="HEX" />
                      </div>
                    </div>

                    {/* RGB */}
                    {(() => {
                      const rgb = hexToRgb(dominantColor.hex);
                      if (!rgb) return null;
                      return (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">
                            RGB
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                              readOnly
                              className="font-mono flex-1"
                            />
                            <CopyButton
                              text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                              field="RGB"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {(["r", "g", "b"] as const).map((channel) => (
                              <div key={channel} className="space-y-1">
                                <Label className="text-xs text-muted-foreground uppercase">
                                  {channel}
                                </Label>
                                <Input
                                  type="number"
                                  value={
                                    rgb[
                                    channel.toUpperCase() as keyof typeof rgb
                                    ]
                                  }
                                  readOnly
                                  className="h-9 font-mono text-center"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* HSL */}
                    {(() => {
                      const rgb = hexToRgb(dominantColor.hex);
                      if (!rgb) return null;
                      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                      return (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">
                            HSL
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                              readOnly
                              className="font-mono flex-1"
                            />
                            <CopyButton
                              text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                              field="HSL"
                            />
                          </div>
                        </div>
                      );
                    })()}

                    {/* CMYK */}
                    {(() => {
                      const rgb = hexToRgb(dominantColor.hex);
                      if (!rgb) return null;
                      const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
                      return (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">
                            CMYK
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              value={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`}
                              readOnly
                              className="font-mono flex-1"
                            />
                            <CopyButton
                              text={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`}
                              field="CMYK"
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        const blob = new Blob([dominantColor.hex], {
                          type: "text/plain",
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "dominant-color.txt";
                        a.click();
                        URL.revokeObjectURL(url);
                        toast.success("Color exported!");
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No color found yet</p>
                  <p className="text-sm mt-1">
                    Upload an image to find the dominant color
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Related Tools - Internal Linking */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Related Color Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-muted-foreground">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <DominantColorFinderSEO />
      </div>
    </div>
  );
}
