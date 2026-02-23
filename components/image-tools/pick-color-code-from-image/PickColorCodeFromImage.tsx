"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Upload,
  Palette,
  Copy,
  Check,
  Eye,
  Zap,
  EyeOff,
  Download,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  convertMarkdownToPDFTextOnly,
  convertMarkdownToPDF,
} from "@/utils/mark-down-to-pdf-render/markdown-to-pdf-render";

export function PickColorCodeFromImage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [currentColor, setCurrentColor] = useState<string>("#000000");
  const [currentColorName, setCurrentColorName] = useState<string>("Black");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [colors, setColors] = useState<
    { hex: string; autoName: string; userName: string }[]
  >([]);
  const [editingColorIndex, setEditingColorIndex] = useState<number | null>(
    null,
  );
  const [tempUserName, setTempUserName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handle image upload
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setImageSrc(imageData);
        setCurrentColor("#000000");
        setCurrentColorName("Black");
        setColors([]);
        toast.success("Image loaded successfully");
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  // Convert RGB to Hex
  const rgbToHex = (r: number, g: number, b: number): string => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  // Convert RGB to HSL for color naming
  const rgbToHsl = (
    r: number,
    g: number,
    b: number,
  ): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max === min) {
      return [h * 360, s * 100, l * 100]; // achromatic
    }

    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;

    return [h * 360, s * 100, l * 100];
  };

  // Get color name based on HSL values
  const getColorName = (r: number, g: number, b: number): string => {
    const [h, s, l] = rgbToHsl(r, g, b);

    if (s < 15) {
      // Grayscale
      if (l > 95) return "White";
      if (l > 70) return "Light Gray";
      if (l > 40) return "Gray";
      if (l > 20) return "Dark Gray";
      return "Black";
    }

    // Determine intensity based on lightness
    let intensity = "";
    if (l < 30) {
      intensity = "Dark ";
    } else if (l > 70) {
      intensity = "Light ";
    }

    // Color names based on hue with more precision
    if (h >= 330 || h < 15) return `${intensity}Red`;
    if (h >= 15 && h < 45) return `${intensity}Orange`;
    if (h >= 45 && h < 75) return `${intensity}Yellow`;
    if (h >= 75 && h < 105) return `${intensity}Yellow-Green`;
    if (h >= 105 && h < 165) return `${intensity}Green`;
    if (h >= 165 && h < 195) return `${intensity}Cyan`;
    if (h >= 195 && h < 255) return `${intensity}Blue`;
    if (h >= 255 && h < 285) return `${intensity}Purple`;
    if (h >= 285 && h < 330) return `${intensity}Pink`;

    return "Color";
  };

  // Get color at mouse position
  const getColorAtPosition = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!imageSrc || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      try {
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const [r, g, b] = pixelData;
        const hex = rgbToHex(r, g, b);
        const colorName = getColorName(r, g, b);

        setCurrentColor(hex);
        setCurrentColorName(colorName);
      } catch (err) {
        // Handle case where image hasn't loaded yet
      }
    },
    [imageSrc],
  );

  // Add current color to the array when clicking on the image
  const addColorToCollection = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!imageSrc || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      try {
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const [r, g, b] = pixelData;
        const hex = rgbToHex(r, g, b);
        const autoColorName = getColorName(r, g, b);

        // Add color to collection if it's not already there
        if (!colors.some((color) => color.hex === hex)) {
          setColors((prev) => [
            ...prev,
            {
              hex,
              autoName: autoColorName,
              userName: "", // Start with empty user name
            },
          ]);
          toast.success("Color added to palette!");
        } else {
          toast.info("Color already in palette");
        }
      } catch (err) {
        // Handle case where image hasn't loaded yet
      }
    },
    [imageSrc, colors],
  );

  // Draw image to canvas when imageSrc changes
  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Copy color to clipboard
  const copyToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setIsCopied(true);
      toast.success("Color code copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy color code");
    }
  };

  // Remove a color from the collection
  const removeColor = (index: number) => {
    setColors((prev) => prev.filter((_, i) => i !== index));
    toast.success("Color removed from palette");
  };

  // Start editing a color name
  const startEditing = (index: number) => {
    setEditingColorIndex(index);
    setTempUserName(colors[index].userName || colors[index].autoName);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingColorIndex(null);
    setTempUserName("");
  };

  // Save the edited name
  const saveColorName = (index: number) => {
    setColors((prev) =>
      prev.map((color, i) =>
        i === index ? { ...color, userName: tempUserName.trim() } : color,
      ),
    );
    setEditingColorIndex(null);
    setTempUserName("");
    toast.success("Color name updated!");
  };

  // Generate and download PDF of all collected colors
  const downloadColorsToPDF = useCallback(async () => {
    if (colors.length === 0) {
      toast.error("No colors to export");
      return;
    }

    const timestamp = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
    const fileName = `color-palette-${timestamp}.pdf`;

    // Generate HTML content for the colors with actual color squares
    let markdownContent = `# Color Palette\n\n`;
    markdownContent += `**Generated on:** ${new Date().toLocaleDateString()}\n`;
    markdownContent += `**Total colors:** ${colors.length}\n\n`;

    markdownContent += `## Collected Colors\n\n`;

    colors.forEach((color, index) => {
      const displayName = color.userName || color.autoName;
      markdownContent += `### <span style="display: inline-block; width: 30px; height: 30px; background-color: ${color.hex}; border: 1px solid #ccc; margin-right: 10px; vertical-align: middle;"></span> **${displayName}** - \`${color.hex}\`\n\n`;

      // Add auto name as subtitle if user has given a custom name
      if (color.userName && color.userName !== color.autoName) {
        markdownContent += `*Auto-detected: ${color.autoName}*\n\n`;
      }
    });

    markdownContent += `---\n\n`;
    markdownContent += `*Generated by 1000freetools Color Picker*\n`;

    // Convert to PDF using the HTML renderer for visual color blocks
    try {
      await convertMarkdownToPDF(markdownContent, fileName, {
        fontSize: 12,
        lineHeight: 1.5,
        margin: [15, 20, 15, 20],
        orientation: "portrait",
      });
      toast.success(`PDF "${fileName}" downloaded successfully!`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    }
  }, [colors]);

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Pick Color Code from Image
            </CardTitle>
            <CardDescription>
              Upload an image and click on pixels to collect colors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
              <Palette className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">
                Upload an image to start
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop or click to select an image file
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Select Image
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Display collected colors */}
          {colors.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Collected Colors ({colors.length})
                  </CardTitle>
                  <Button
                    onClick={downloadColorsToPDF}
                    size="sm"
                    variant="outline"
                    disabled={colors.length === 0}
                    title="Download all colors as PDF"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="border border-border rounded-lg p-3 space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border border-border shadow-sm flex-shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="min-w-0 flex-1">
                          {editingColorIndex === index ? (
                            <div className="flex items-center gap-1">
                              <Input
                                value={tempUserName}
                                onChange={(e) =>
                                  setTempUserName(e.target.value)
                                }
                                className="h-8 text-sm"
                                placeholder="Enter color name..."
                                autoFocus
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => saveColorName(index)}
                                title="Save name"
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={cancelEditing}
                                title="Cancel"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-sm truncate">
                                  {color.userName || color.autoName}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0"
                                  onClick={() => startEditing(index)}
                                  title="Edit name"
                                >
                                  <Edit2 className="h-3 w-3" />
                                </Button>
                              </div>
                              {color.userName && (
                                <span className="text-xs text-muted-foreground">
                                  {color.autoName}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-xs font-mono text-center bg-muted rounded px-2 py-1 break-all">
                        {color.hex}
                      </div>
                      <div className="flex gap-1 justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 w-7 p-0"
                          onClick={() => copyToClipboard(color.hex)}
                          title="Copy color code"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-7 w-7 p-0"
                          onClick={() => removeColor(index)}
                          title="Remove color"
                        >
                          <span className="text-xs">×</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Picker
              </CardTitle>
              <CardDescription>
                Click on the image to add colors to your palette
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div
                  className="w-16 h-16 rounded-md border border-border shadow-sm"
                  style={{ backgroundColor: currentColor }}
                  title={`Current color: ${currentColor}`}
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <code className="px-3 py-1 bg-muted rounded-md font-mono text-sm">
                      {currentColor}
                    </code>
                    <Badge variant="secondary" className="text-sm">
                      {currentColorName}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(currentColor)}
                    size="sm"
                    variant="outline"
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    {isCopied ? "Copied!" : "Copy Code"}
                  </Button>
                </div>
              </div>

              <div className="relative">
                <canvas
                  ref={canvasRef}
                  onMouseMove={getColorAtPosition}
                  onClick={addColorToCollection}
                  className="max-w-full h-auto border border-border rounded-lg cursor-crosshair max-h-[600px]"
                  style={{ maxHeight: "600px", width: "100%", height: "auto" }}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change Image
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setImageSrc(null);
                    setCurrentColor("#000000");
                    setCurrentColorName("Black");
                    setColors([]);
                  }}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Color Picker Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2">Instructions:</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Upload an image using the button above</li>
                <li>Click on any pixel to add its color to your palette</li>
                <li>Hover over image to preview colors</li>
                <li>
                  Use the copy button on each collected color to copy its hex
                  code
                </li>
                <li>Remove colors using the X button on each color</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Features:</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Click to add colors to your palette</li>
                <li>Display all collected colors above the image</li>
                <li>Copy color codes using the copy button on each color</li>
                <li>Remove unwanted colors from palette</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
