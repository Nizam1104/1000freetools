"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, Type } from "lucide-react";
import { toast } from "sonner";
import JSZip from "jszip";
import FaviconPreview from "./FaviconPreview";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/dist/css/rcp.css";

import GOOGLE_FONTS from "./google-fonts.json";

// Direct favicon generation without workers
export interface FaviconOptions {
  text: string;
  backgroundColor: string;
  fontColor: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  shape: "square" | "circle" | "rounded";
  canvasSize: number;
}

export interface FaviconBundle {
  ico: string;
  png16: string;
  png32: string;
  png64: string;
  png150: string;
  png180: string;
  png192: string;
  png512: string;
}

export class DirectFaviconGenerator {
  private canvas: HTMLCanvasElement;

  constructor() {
    this.canvas = document.createElement("canvas");
  }

  /**
   * Generate favicon bundle directly on the main thread
   */
  async generateFaviconBundle(options: FaviconOptions): Promise<FaviconBundle> {
    // Create the base canvas
    this.createBaseCanvas(options);

    // Use the existing FaviconGenerator class
    const generator = new FaviconGenerator(this.canvas);
    return generator.bundle();
  }

  /**
   * Create the base canvas with text and background
   */
  private createBaseCanvas(options: FaviconOptions): void {
    const {
      canvasSize,
      text,
      backgroundColor,
      fontColor,
      fontFamily,
      fontSize,
      fontWeight,
      shape,
    } = options;

    // Set canvas size (2x for retina displays)
    this.canvas.width = canvasSize;
    this.canvas.height = canvasSize;

    const ctx = this.canvas.getContext("2d")!;

    // Scale for retina displays
    const scale = 1;
    const scaledSize = canvasSize / scale;

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw background
    this.drawBackground(ctx, backgroundColor, shape, scaledSize);

    // Draw text
    if (text && text.trim() !== "") {
      this.drawText(
        ctx,
        text,
        fontColor,
        fontFamily,
        fontSize,
        fontWeight,
        scaledSize,
      );
    }
  }

  /**
   * Draw background shape
   */
  private drawBackground(
    ctx: CanvasRenderingContext2D,
    backgroundColor: string,
    shape: string,
    size: number,
  ): void {
    ctx.fillStyle = backgroundColor;

    switch (shape) {
      case "square":
        ctx.fillRect(0, 0, size, size);
        break;
      case "circle":
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
        ctx.fill();
        break;
      case "rounded":
        const radius = size / 10;
        ctx.beginPath();
        ctx.moveTo(size, size);
        ctx.arcTo(0, size, 0, 0, radius);
        ctx.arcTo(0, 0, size, 0, radius);
        ctx.arcTo(size, 0, size, size, radius);
        ctx.arcTo(size, size, 0, size, radius);
        ctx.fill();
        break;
      default:
        ctx.fillRect(0, 0, size, size);
    }
  }

  /**
   * Draw centered text
   */
  private drawText(
    ctx: CanvasRenderingContext2D,
    text: string,
    fontColor: string,
    fontFamily: string,
    fontSize: number,
    fontWeight: string,
    size: number,
  ): void {
    ctx.fillStyle = fontColor;
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, size / 2, size / 2);
  }
}

/**
 * Generate favicon bundle directly without workers
 */
export async function generateFaviconBundle(
  options: FaviconOptions,
): Promise<FaviconBundle> {
  const generator = new DirectFaviconGenerator();
  return generator.generateFaviconBundle(options);
}

class Resize {
  /**
   * Resize the canvas by halving the width and height. This produces better
   * sampling and the image quality is generally better.
   */
  generate(width: number, height: number) {
    while (this.canvas.width / 2 >= width)
      this._resize(this.canvas.width / 2, this.canvas.height / 2);
    if (this.canvas.width > width) this._resize(width, height);
    return this.canvas;
  }

  /**
   * Simple resize of a canvas element.
   */
  private _resize(width: number, height: number) {
    const canvas = document.createElement("canvas");
    const resizedContext = canvas.getContext("2d")!;
    canvas.width = width;
    canvas.height = height;
    resizedContext.drawImage(this.canvas, 0, 0, width, height);
    this.canvas = canvas;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  private canvas: HTMLCanvasElement;
}

class Ico {
  generate(sizes = [16, 32, 48]) {
    const canvasMaster = new Resize(this.canvas).generate(128, 128);
    const iconDirectoryHeader = this.createIconDirectoryHeader(sizes.length);
    let iconDirectoryEntries = "";
    let bitmapData = "";

    for (let i = 0; i < sizes.length; i++) {
      const size = sizes[i];
      const canvas = new Resize(canvasMaster).generate(size, size);
      const context = canvas.getContext("2d")!;
      const width = canvas.width;
      const height = canvas.height;
      // const imageData = context.getImageData(0, 0, width, height);
      const bitmapInfoHeader = this.createBitmapInfoHeader(width, height);
      const bitmapImageData = this.createBitmapImageData(canvas);
      const bitmapSize = bitmapInfoHeader.length + bitmapImageData.length;
      const bitmapOffset = this.calculateBitmapOffset(sizes, i);
      iconDirectoryEntries += this.createIconDirectoryEntry(
        width,
        height,
        bitmapSize,
        bitmapOffset,
      );
      bitmapData += bitmapInfoHeader + bitmapImageData;
    }

    const binary = iconDirectoryHeader + iconDirectoryEntries + bitmapData;
    const base64 = "data:image/x-icon;base64," + btoa(binary);
    return base64;
  }

  /**
   * Calculates the location to the bitmap entry.
   */
  private calculateBitmapOffset(sizes: number[], entry: number) {
    let offset = 6; // icon header size
    offset += 16 * sizes.length; // icon entry header size
    // size of previous bitmaps
    for (let i = 0; i < entry; i++) {
      const size = sizes[i];
      offset += 40; // bitmap header size
      offset += 4 * size * size; // bitmap data size
      offset += (2 * size * size) / 8; // bitmap mask size
    }
    return offset;
  }

  private createBitmapImageData(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const bitmapPixelData = new Uint32Array(imageData.data.buffer);
    // const bitmapBuffer = bitmapPixelData.reverse().buffer;
    const bitmapMask = new Uint8Array((canvas.width * canvas.height * 2) / 8);
    bitmapMask.fill(0);
    let binary = this.arrayBufferToBinary(this.canvasToBitmap(canvas));
    binary += this.Uint8ArrayToBinary(bitmapMask);
    return binary;
  }

  private canvasToBitmap(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const rgbaData8 = imageData.data;
    const bgraData8 = new Uint8ClampedArray(imageData.data.length);

    for (let i = 0; i < rgbaData8.length; i += 4) {
      const r = rgbaData8[i];
      const g = rgbaData8[i + 1];
      const b = rgbaData8[i + 2];
      const a = rgbaData8[i + 3];
      bgraData8[i] = b;
      bgraData8[i + 1] = g;
      bgraData8[i + 2] = r;
      bgraData8[i + 3] = a;
    }

    const bgraData32 = new Uint32Array(bgraData8.buffer);
    const bgraData32Rotated = new Uint32Array(bgraData32.length);

    for (let i1 = 0; i1 < bgraData32.length; i1++) {
      const xPos = i1 % canvas.width;
      const yPos = Math.floor(i1 / canvas.width);
      const xPosRotated = xPos;
      const yPosRotated = canvas.height - 1 - yPos;
      const indexRotated = yPosRotated * canvas.width + xPosRotated;
      const pixel = bgraData32[i1];
      bgraData32Rotated[indexRotated] = pixel;
    }

    return bgraData32Rotated.buffer;
  }

  private createIconDirectoryHeader(numImages: number) {
    const buffer = new ArrayBuffer(6);
    const view = new DataView(buffer);
    view.setUint16(0, 0, true); // Reserved. Must always be 0.
    view.setUint16(2, 1, true); // Specifies type. 1 = ICO.
    view.setUint16(4, numImages, true); // Number of images.
    return this.arrayBufferToBinary(buffer);
  }

  private createIconDirectoryEntry(
    width: number,
    height: number,
    size: number,
    offset: number,
  ) {
    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);
    view.setUint8(0, width); // Pixel width (0..256). 0 = 256 pixels.
    view.setUint8(1, height); // Pixel height (0..256). 0 = 256 pixels.
    view.setUint8(2, 0); // Number of colors in pallet. 0 = no pallet.
    view.setUint8(3, 0); // Reserved. Should be 0.
    view.setUint16(4, 1, true); // Color planes. 0 or 1.
    view.setUint16(6, 32, true); // Specifies bits per pixel.
    view.setUint32(8, size, true); // Image size (bytes).
    view.setUint32(12, offset, true); // Offset to BMP of PNG.
    return this.arrayBufferToBinary(buffer);
  }

  private createBitmapInfoHeader(width: number, height: number) {
    const buffer = new ArrayBuffer(40);
    const view = new DataView(buffer);
    view.setUint32(0, 40, true); // Header size (40 bytes).
    view.setInt32(4, width, true); // BMP width.
    view.setInt32(8, 2 * height, true); // BMP height.
    view.setUint16(12, 1, true); // Number of color planes. Must be 1.
    view.setUint16(14, 32, true); // Bits per pixel
    view.setUint32(16, 0, true); // Compression method. 0 = none.
    view.setUint32(20, 0, true); // Image size (bytes). 0 = no compression.
    view.setUint32(24, 0, true); // Horizontal resolution.
    view.setUint32(28, 0, true); // Vertical resolution.
    view.setUint32(32, 0, true); // Number of colors. 0 = default.
    view.setUint32(36, 0, true); // Number of important colors. 0 =  all
    return this.arrayBufferToBinary(buffer);
  }

  private arrayBufferToBinary(buffer: ArrayBuffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
    return binary;
  }

  private Uint8ArrayToBinary(Uint8Array: Uint8Array) {
    let binary = "";
    const bytes = Uint8Array;
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
    return binary;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  private canvas: HTMLCanvasElement;
}

class Png {
  generate(size: number) {
    return new Resize(this.canvas).generate(size, size).toDataURL();
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  private canvas: HTMLCanvasElement;
}

class Bundle {
  generate() {
    const ico = new Ico(this.canvas);
    const png = new Png(this.canvas);
    return {
      ico: ico.generate([16, 32, 48]),
      png16: png.generate(16),
      png32: png.generate(32),
      png64: png.generate(64),
      png150: png.generate(150),
      png180: png.generate(180),
      png192: png.generate(192),
      png512: png.generate(512),
    };
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  private canvas: HTMLCanvasElement;
}

class FaviconGenerator {
  bundle() {
    return new Bundle(this.canvas).generate();
  }

  ico(sizes?: number[]) {
    return new Ico(this.canvas).generate(sizes);
  }

  png(size: number) {
    return new Png(this.canvas).generate(size);
  }

  resize(size: number) {
    return new Resize(this.canvas).generate(size, size);
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  private canvas: HTMLCanvasElement;
}

// Expanded Google Fonts list - 250+ popular and aesthetically pleasing fonts for favicons

const SHAPES = [
  { value: "square", label: "Square" },
  { value: "circle", label: "Circle" },
  { value: "rounded", label: "Rounded" },
];

export default function FaviconGeneratorComponent() {
  const [text, setText] = useState("A");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSizePercentage, setFontSizePercentage] = useState(70); // percentage-based sizing
  const [fontWeight, setFontWeight] = useState("400");
  const [shape, setShape] = useState("square");
  const [faviconBundle, setFaviconBundle] = useState<FaviconBundle | null>(
    null,
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [fontLoadKey, setFontLoadKey] = useState(0); // Key to force regeneration when fonts change
  const [isFontLoading, setIsFontLoading] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(true);

  // Color picker hooks
  const [backgroundColor, setBackgroundColor] = useColor("#000000");
  const [fontColor, setFontColor] = useColor("#FFFFFF");

  // Calculate font size based on percentage and canvas size
  const calculateFontSize = useCallback(
    (canvasSize: number): number => {
      return Math.round((canvasSize * fontSizePercentage) / 100);
    },
    [fontSizePercentage],
  );

  // Direct favicon generation function
  const generateFavicons = useCallback(async () => {
    // Validate inputs
    if (!text || text.trim() === "") {
      toast.error("Please enter some text for your favicon");
      throw new Error("Text is required");
    }

    try {
      setIsGenerating(true);

      const bundle = await generateFaviconBundle({
        text: text.trim(),
        backgroundColor: backgroundColor.hex,
        fontColor: fontColor.hex,
        fontFamily,
        fontSize: calculateFontSize(512), // Base font size on 512px canvas
        fontWeight,
        shape: shape as "square" | "circle" | "rounded",
        canvasSize: 512,
      });

      setFaviconBundle(bundle);
      return bundle;
    } catch (error) {
      console.error("Error generating favicon:", error);
      toast.error("Failed to generate favicon. Please try different settings.");
      throw error;
    } finally {
      setIsGenerating(false);
    }
  }, [
    text,
    backgroundColor.hex,
    fontColor.hex,
    fontFamily,
    fontWeight,
    shape,
    calculateFontSize,
  ]);

  // Load Google Fonts and handle font changes
  useEffect(() => {
    // Only load the WebFont script once
    if (!document.querySelector('script[src*="webfont.js"]')) {
      const script = document.createElement("script");
      script.src =
        "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
      script.async = true;
      document.head.appendChild(script);
    }

    const loadFontAndRegenerate = () => {
      // @ts-expect-error WebFont is loaded from external script
      if (window.WebFont) {
        // Load the currently selected font if it's a Google font
        const selectedFont = GOOGLE_FONTS.find((f) => f.value === fontFamily);
        if (selectedFont?.google) {
          setIsFontLoading(true);
          setFontLoaded(false);
          // @ts-expect-error WebFont API is not typed
          window.WebFont.load({
            google: {
              families: [fontFamily],
            },
            active: () => {
              // Font loaded successfully - add a small delay to ensure it's fully available
              setTimeout(() => {
                setFontLoaded(true);
                setIsFontLoading(false);
                // Force regeneration by incrementing a key to trigger useEffect
                // This will cause the main favicon generation useEffect to run again
                setFontLoadKey((prev) => prev + 1);
              }, 100); // 100ms delay to ensure font is fully loaded
            },
            inactive: () => {
              console.warn(`Font ${fontFamily} failed to load`);
              // Font failed to load, but we still need to show something
              setFontLoaded(true);
              setIsFontLoading(false);
              setFontLoadKey((prev) => prev + 1);
            },
            timeout: 5000, // 5 second timeout
          });
        } else {
          // System font, no loading needed
          setFontLoaded(true);
          setIsFontLoading(false);
          setFontLoadKey((prev) => prev + 1);
        }
      } else {
        console.warn("WebFont not available");
        // If WebFont is not available, still try to regenerate for system fonts
        const selectedFont = GOOGLE_FONTS.find((f) => f.value === fontFamily);
        if (!selectedFont?.google) {
          setFontLoaded(true);
          setIsFontLoading(false);
          setFontLoadKey((prev) => prev + 1);
        } else {
          // Google font but WebFont not available, still try to proceed
          setFontLoaded(true);
          setIsFontLoading(false);
        }
      }
    };

    // Add a small delay to ensure the WebFont script is loaded
    const timer = setTimeout(loadFontAndRegenerate, 100);

    return () => clearTimeout(timer);
  }, [fontFamily]); // Depend on fontFamily to reload when it changes

  const downloadFile = async (dataUrl: string, filename: string) => {
    try {
      console.log("data url", dataUrl);
      // Use fetch to properly handle the data URL
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Create object URL for the blob
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up object URL
      setTimeout(() => URL.revokeObjectURL(url), 100);

      toast.success(`Downloaded ${filename}`);
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error);
      toast.error(`Failed to download ${filename}`);
    }
  };

  const downloadAll = async () => {
    try {
      // Generate favicons on-demand when download is clicked
      const bundle = await generateFavicons();
      if (!bundle) return;

      // Create a zip file
      const zip = new JSZip();

      // Add all favicon files to the zip
      for (const [size, dataUrl] of Object.entries(bundle)) {
        const extension = size.startsWith("png") ? "png" : "ico";
        const filename =
          size === "ico" ? "favicon.ico" : `favicon-${size}.${extension}`;

        try {
          // Convert dataUrl to binary data properly
          const response = await fetch(dataUrl);
          const blob = await response.blob();

          // Convert blob to Uint8Array for zip
          const arrayBuffer = await blob.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);

          zip.file(filename, uint8Array);
        } catch (error) {
          console.error(`Error processing ${filename}:`, error);
          // Skip this file but continue with others
          continue;
        }
      }

      // Add README file
      const readmeContent = `# Favicon Files

These favicon files were generated using the Favicon Generator tool.

## Files Included:
- favicon.ico - Multi-size ICO file for browsers
- favicon-16.png - 16x16 pixels (Tab icons)
- favicon-32.png - 32x32 pixels (Taskbar icons)
- favicon-64.png - 64x64 pixels (High-resolution icons)
- favicon-150.png - 150x150 pixels (Windows tiles)
- favicon-180.png - 180x180 pixels (iOS touch icons)
- favicon-192.png - 192x192 pixels (Android icons)
- favicon-512.png - 512x512 pixels (High-resolution icons)

## HTML Code:
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon-16.png" type="image/png">
<link rel="icon" href="/favicon-32.png" type="image/png">
<link rel="icon" href="/favicon-64.png" type="image/png">
<link rel="apple-touch-icon" href="/favicon-180.png">
<link rel="manifest" href="/sitemap.xml">
`;

      zip.file("README.txt", readmeContent);

      // Generate and download the zip file
      const content = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 },
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "favicon-files.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Revoke the object URL after a short delay to ensure the download starts
      setTimeout(() => URL.revokeObjectURL(link.href), 100);

      toast.success("Downloaded favicon files as ZIP");
    } catch (error) {
      console.error("Error generating favicons:", error);
      toast.error("Failed to generate or download favicon files.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Favicon Generator</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Create professional favicons from text. Customize colors, fonts, and
          shapes to generate perfect icons for your website.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column - Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Combined Design Controls */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Favicon Design
              </CardTitle>
              <CardDescription>
                Customize text, typography, colors, and shape
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Text Input */}
              <div className="space-y-2">
                <Label htmlFor="favicon-text">Text Content</Label>
                <Input
                  id="favicon-text"
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, 3))}
                  placeholder=""
                  maxLength={3}
                  className="text-lg font-semibold"
                />
                <div className="text-xs text-muted-foreground">
                  Enter 1-3 characters
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Colors</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="bg-color" className="text-xs">
                      Background
                    </Label>
                    <ColorPicker
                      color={backgroundColor}
                      onChange={setBackgroundColor}
                      height={100}
                    />
                    <div className="text-xs text-muted-foreground text-center">
                      {backgroundColor.hex}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="text-color" className="text-xs">
                      Text
                    </Label>
                    <ColorPicker
                      color={fontColor}
                      onChange={setFontColor}
                      height={100}
                    />
                    <div className="text-xs text-muted-foreground text-center">
                      {fontColor.hex}
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography Settings */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Typography</Label>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="font-family" className="text-xs">
                      Font Family
                    </Label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        {GOOGLE_FONTS.map((font, index) => (
                          <SelectItem
                            key={`${font.value}-${index}`}
                            value={font.value}
                          >
                            {font.name}
                            {font.google && (
                              <Badge
                                variant="secondary"
                                className="ml-2 text-xs"
                              >
                                G
                              </Badge>
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="font-weight" className="text-xs">
                        Weight
                      </Label>
                      <Select value={fontWeight} onValueChange={setFontWeight}>
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100">Thin</SelectItem>
                          <SelectItem value="300">Light</SelectItem>
                          <SelectItem value="400">Normal</SelectItem>
                          <SelectItem value="500">Medium</SelectItem>
                          <SelectItem value="600">Semi Bold</SelectItem>
                          <SelectItem value="700">Bold</SelectItem>
                          <SelectItem value="900">Black</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="font-size" className="text-xs">
                        Size: {fontSizePercentage}%
                      </Label>
                      <Input
                        id="font-size"
                        type="range"
                        min="10"
                        max="150"
                        value={fontSizePercentage}
                        onChange={(e) =>
                          setFontSizePercentage(Number(e.target.value))
                        }
                        className="w-full h-8"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shape */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Shape</Label>
                <div className="grid grid-cols-3 gap-2">
                  {SHAPES.map((shapeOption) => (
                    <Button
                      key={shapeOption.value}
                      variant={
                        shape === shapeOption.value ? "default" : "outline"
                      }
                      onClick={() => setShape(shapeOption.value)}
                      className="h-8 text-sm"
                    >
                      {shapeOption.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preview and Downloads */}
        <div className="lg:col-span-4 space-y-6">
          {/* Preview */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Preview</CardTitle>
              <CardDescription>Live preview of your favicon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preview for different sizes */}
              <div className="grid grid-cols-1 gap-4">
                <div className="text-center">
                  <div className="mb-2 text-sm font-medium">16×16</div>
                  <div className="flex justify-center items-center bg-muted/50 rounded-lg p-3">
                    <div className="border border-border rounded shadow-lg ">
                      <FaviconPreview
                        text={text}
                        backgroundColor={backgroundColor.hex}
                        fontColor={fontColor.hex}
                        fontFamily={fontFamily}
                        fontSize={calculateFontSize(16)}
                        fontWeight={fontWeight}
                        shape={shape}
                        size={16}
                        isFontReady={fontLoaded && !isFontLoading}
                        isFontLoading={isFontLoading}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Tab icon</div>
                </div>

                <div className="text-center">
                  <div className="mb-2 text-sm font-medium">32×32</div>
                  <div className="flex justify-center items-center bg-muted/50 rounded-lg p-3">
                    <div className="border border-border rounded shadow-lg ">
                      <FaviconPreview
                        text={text}
                        backgroundColor={backgroundColor.hex}
                        fontColor={fontColor.hex}
                        fontFamily={fontFamily}
                        fontSize={calculateFontSize(32)}
                        fontWeight={fontWeight}
                        shape={shape}
                        size={32}
                        isFontReady={fontLoaded && !isFontLoading}
                        isFontLoading={isFontLoading}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Taskbar</div>
                </div>

                <div className="text-center">
                  <div className="mb-2 text-sm font-medium">64×64</div>
                  <div className="flex justify-center items-center bg-muted/50 rounded-lg p-3">
                    <div className="border border-border rounded shadow-lg ">
                      <FaviconPreview
                        text={text}
                        backgroundColor={backgroundColor.hex}
                        fontColor={fontColor.hex}
                        fontFamily={fontFamily}
                        fontSize={calculateFontSize(64)}
                        fontWeight={fontWeight}
                        shape={shape}
                        size={64}
                        isFontReady={fontLoaded && !isFontLoading}
                        isFontLoading={isFontLoading}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    High resolution
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Downloads */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download
              </CardTitle>
              <CardDescription>
                Download your favicon in multiple formats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={downloadAll}
                className="w-full"
                size="lg"
                disabled={isGenerating}
              >
                <Download className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Download All as ZIP"}
              </Button>

              <Tabs defaultValue="code" className="w-full">
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="code">HTML Code</TabsTrigger>
                </TabsList>

                <TabsContent value="code" className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2 text-sm">HTML Code:</h4>
                    <pre className="text-xs text-muted-foreground overflow-x-auto">
                      {`<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon-16.png" type="image/png">
<link rel="icon" href="/favicon-32.png" type="image/png">
<link rel="icon" href="/favicon-64.png" type="image/png">
<link rel="apple-touch-icon" href="/favicon-180.png">
<link rel="manifest" href="/sitemap.xml">`}
                    </pre>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2 text-sm">
                      site.webmanifest:
                    </h4>
                    <pre className="text-xs text-muted-foreground overflow-x-auto">
                      {`{
  "name": "Your Website Name",
  "icons": [
    {
      "src": "/favicon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/favicon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}`}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How to Use Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
          <CardDescription>
            Simple steps to create and implement your favicon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm">
            <li>
              <strong>1. Enter your text:</strong> Add 1-3 characters that
              represent your brand
            </li>
            <li>
              <strong>2. Customize appearance:</strong> Choose colors, fonts,
              and shapes that match your brand
            </li>
            <li>
              <strong>3. Download files:</strong> Get all the necessary formats
              for different devices and browsers
            </li>
            <li>
              <strong>4. Upload to your website:</strong> Place the files in
              your website&apos;s root directory
            </li>
            <li>
              <strong>5. Add HTML code:</strong> Include the provided HTML code
              in your website&apos;s head section
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
