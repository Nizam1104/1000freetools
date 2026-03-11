"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Copy, Check, Download, Upload, RotateCcw } from "lucide-react";

export default function BarcodeColorInverter() {
  const [image, setImage] = useState<string | null>(null);
  const [invertedImage, setInvertedImage] = useState<string | null>(null);
  const [darkBackground, setDarkBackground] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            setImage(canvas.toDataURL());
            invertColors(canvas, ctx, img.width, img.height);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const invertColors = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Check if pixel is mostly transparent
      if (data[i + 3] < 128) continue;

      // Calculate luminance to determine if it's a dark or light pixel
      const luminance = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

      if (luminance < 128) {
        // Dark pixel - make it light
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
      } else {
        // Light pixel - make it dark
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const invertedDataUrl = canvas.toDataURL();
    setInvertedImage(invertedDataUrl);
  };

  const handleCopy = async () => {
    if (invertedImage) {
      try {
        const blob = await (await fetch(invertedImage)).blob();
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const handleDownload = () => {
    if (invertedImage) {
      const link = document.createElement("a");
      link.download = "inverted-barcode.png";
      link.href = invertedImage;
      link.click();
    }
  };

  const handleClear = () => {
    setImage(null);
    setInvertedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Barcode Color Inverter</h2>
        <p className="text-sm text-muted-foreground">
          Invert barcode colors for dark backgrounds or design needs while maintaining scannability
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <Button onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Barcode Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {image && (
            <Button variant="outline" onClick={handleClear}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </Card>

      {image && (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Original Barcode</Label>
              <Card className="p-4 flex items-center justify-center min-h-[200px] bg-background">
                <img src={image} alt="Original barcode" className="max-w-full h-auto" />
              </Card>
            </div>

            <div className="space-y-2">
              <Label>Inverted Barcode</Label>
              <Card
                className={`p-4 flex items-center justify-center min-h-[200px] ${
                  darkBackground ? "bg-gray-900" : "bg-background"
                }`}
              >
                {invertedImage && (
                  <img src={invertedImage} alt="Inverted barcode" className="max-w-full h-auto" />
                )}
              </Card>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="darkBg"
                  checked={darkBackground}
                  onChange={(e) => setDarkBackground(e.target.checked)}
                  className="h-4 w-4"
                />
                <Label htmlFor="darkBg" className="text-sm">
                  Preview on dark background
                </Label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCopy} disabled={!invertedImage} className="flex-1">
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Image
                </>
              )}
            </Button>
            <Button onClick={handleDownload} disabled={!invertedImage} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PNG
            </Button>
          </div>
        </>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">How to Use</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
          <li>Upload a barcode image (PNG, JPG, GIF)</li>
          <li>The tool automatically inverts the colors (black becomes white, white becomes black)</li>
          <li>Preview on dark background to ensure scannability</li>
          <li>Copy or download the inverted barcode</li>
        </ol>
        <p className="mt-3 text-sm text-muted-foreground">
          <strong>Note:</strong> Inverted barcodes work best on dark backgrounds. Test scannability before production use.
        </p>
      </Card>
    </div>
  );
}
