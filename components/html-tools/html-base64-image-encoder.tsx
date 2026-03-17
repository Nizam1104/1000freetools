"use client";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Image, Upload } from "lucide-react";

const HtmlBase64ImageEncoder: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [base64Output, setBase64Output] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [encoded, setEncoded] = useState(false);
  const [format, setFormat] = useState<"original" | "png" | "jpeg" | "webp">("original");
  const [quality, setQuality] = useState(90);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);
    setEncoded(false);
    setBase64Output("");
    setHtmlOutput("");

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleEncode = useCallback(() => {
    if (!selectedImage) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      let base64 = event.target?.result as string;

      // If format conversion is needed
      if (format !== "original") {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            base64 = canvas.toDataURL(`image/${format}`, quality / 100);
            setBase64Output(base64);
            setHtmlOutput(`<img src="${base64}" alt="Encoded image" />`);
            setEncoded(true);
          }
        };
        img.src = base64;
      } else {
        setBase64Output(base64);
        setHtmlOutput(`<img src="${base64}" alt="Encoded image" />`);
        setEncoded(true);
      }
    };
    reader.readAsDataURL(selectedImage);
  }, [selectedImage, format, quality]);

  const handleClear = useCallback(() => {
    setSelectedImage(null);
    setBase64Output("");
    setHtmlOutput("");
    setImagePreview("");
    setEncoded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleCopyBase64 = useCallback(() => {
    if (base64Output) {
      navigator.clipboard.writeText(base64Output);
    }
  }, [base64Output]);

  const handleCopyHtml = useCallback(() => {
    if (htmlOutput) {
      navigator.clipboard.writeText(htmlOutput);
    }
  }, [htmlOutput]);

  const handleDownload = useCallback(() => {
    if (!base64Output) return;
    
    const blob = new Blob([htmlOutput], { type: "text/html" });
    const link = document.createElement("a");
    link.download = "embedded-image.html";
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [base64Output, htmlOutput]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            HTML Base64 Image Encoder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Upload Image</Label>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP</p>
              </div>
              
              {selectedImage && (
                <p className="text-sm text-gray-600">
                  Selected: {selectedImage.name} ({(selectedImage.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Encoding Options</Label>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="format" className="text-xs">Output Format</Label>
                  <select
                    id="format"
                    value={format}
                    onChange={(e) => setFormat(e.target.value as typeof format)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="original">Original Format</option>
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WebP</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="quality" className="text-xs">Quality ({quality}%)</Label>
                  <Input
                    id="quality"
                    type="range"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    min={10}
                    max={100}
                    disabled={format === "png"}
                  />
                </div>
              </div>
            </div>
          </div>

          {imagePreview && (
            <div className="flex justify-center">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-h-48 border rounded"
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleEncode} disabled={!selectedImage}>
              <Image className="w-4 h-4 mr-2" />
              Encode to Base64
            </Button>
            <Button onClick={handleCopyBase64} variant="outline" disabled={!encoded}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Base64
            </Button>
            <Button onClick={handleCopyHtml} variant="outline" disabled={!encoded}>
              <Copy className="w-4 h-4 mr-2" />
              Copy HTML
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!encoded}>
              <Download className="w-4 h-4 mr-2" />
              Download HTML
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {encoded && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">HTML Output</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm font-mono">
                    {htmlOutput}
                  </pre>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label>Base64 Data URI (truncated)</Label>
                <Textarea
                  value={`${base64Output.substring(0, 100)}...`}
                  readOnly
                  rows={3}
                  className="font-mono text-xs"
                />
                <p className="text-xs text-gray-500">
                  Full length: {base64Output.length} characters
                </p>
              </div>

              <div className="p-4 border rounded-lg bg-blue-50">
                <p className="text-sm font-semibold mb-2">Usage Tips:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Base64 images increase file size by ~33%</li>
                  <li>• Best for small icons and inline images</li>
                  <li>• Reduces HTTP requests</li>
                  <li>• Works in all modern browsers</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HtmlBase64ImageEncoder;
