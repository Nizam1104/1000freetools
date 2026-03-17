"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Image, Upload } from "lucide-react";

const BarcodeToBase64: React.FC = () => {
  const [barcodeData, setBarcodeData] = useState("");
  const [barcodeType, setBarcodeType] = useState("code128");
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [displayValue, setDisplayValue] = useState(true);
  const [base64Output, setBase64Output] = useState("");
  const [generated, setGenerated] = useState(false);

  const barcodeTypes = [
    { value: "code128", label: "Code 128" },
    { value: "code39", label: "Code 39" },
    { value: "ean13", label: "EAN-13" },
    { value: "ean8", label: "EAN-8" },
    { value: "upc", label: "UPC" },
    { value: "itf14", label: "ITF-14" },
    { value: "msi", label: "MSI" },
    { value: "pharmacode", label: "Pharmacode" },
  ];

  const generateBarcode = useCallback(() => {
    if (!barcodeData.trim()) return;

    // Create a canvas and draw a simulated barcode
    const canvas = document.createElement("canvas");
    const barCount = barcodeData.length * 11; // Approximate bars for Code 128
    const totalWidth = barCount * width + 40; // Add padding
    const canvasHeight = height + (displayValue ? 30 : 10);
    
    canvas.width = totalWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");
    
    if (ctx) {
      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, totalWidth, canvasHeight);
      
      // Generate bars based on data (simplified simulation)
      ctx.fillStyle = "#000000";
      let x = 20;
      
      // Start guard pattern
      ctx.fillRect(x, 10, width, height);
      x += width * 2;
      
      // Data bars (simulated)
      for (let i = 0; i < barcodeData.length; i++) {
        const charCode = barcodeData.charCodeAt(i);
        // Generate 3-4 bars per character
        for (let j = 0; j < 4; j++) {
          const barWidth = ((charCode + j) % 3 + 1) * width;
          const gapWidth = ((charCode + j + 1) % 2 + 1) * width;
          ctx.fillRect(x, 10, barWidth, height);
          x += barWidth + gapWidth;
        }
      }
      
      // End guard pattern
      ctx.fillRect(x, 10, width * 2, height);
      
      // Display value
      if (displayValue) {
        ctx.fillStyle = "#000000";
        ctx.font = "12px monospace";
        ctx.textAlign = "center";
        ctx.fillText(barcodeData, totalWidth / 2, height + 25);
      }
    }
    
    const base64 = canvas.toDataURL("image/png");
    setBase64Output(base64);
    setGenerated(true);
  }, [barcodeData, barcodeType, width, height, displayValue]);

  const handleClear = useCallback(() => {
    setBarcodeData("");
    setBase64Output("");
    setGenerated(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (base64Output) {
      navigator.clipboard.writeText(base64Output);
    }
  }, [base64Output]);

  const handleDownload = useCallback(() => {
    if (!base64Output) return;
    
    const link = document.createElement("a");
    link.download = `barcode-${barcodeType}.png`;
    link.href = base64Output;
    link.click();
  }, [base64Output, barcodeType]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Barcode to Base64
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="barcodeData">Barcode Data</Label>
              <Input
                id="barcodeData"
                value={barcodeData}
                onChange={(e) => setBarcodeData(e.target.value)}
                placeholder="Enter data to encode"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="barcodeType">Barcode Type</Label>
              <select
                id="barcodeType"
                value={barcodeType}
                onChange={(e) => setBarcodeType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {barcodeTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="width">Bar Width (px)</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                min={1}
                max={10}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Barcode Height (px)</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                min={50}
                max={200}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Display Value</Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="displayValue"
                  checked={displayValue}
                  onChange={(e) => setDisplayValue(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="displayValue" className="font-normal">
                  Show human-readable text below barcode
                </Label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={generateBarcode} disabled={!barcodeData.trim()}>
              <Image className="w-4 h-4 mr-2" />
              Generate Base64
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!generated}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Base64
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

          {generated && base64Output && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Generated Barcode</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <img src={base64Output} alt="Barcode" className="border" />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label>Base64 Output (truncated)</Label>
                <Textarea
                  value={`${base64Output.substring(0, 100)}...`}
                  readOnly
                  rows={3}
                  className="font-mono text-xs"
                />
                <p className="text-xs text-gray-500">
                  Full Base64: {base64Output.length} characters
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BarcodeToBase64;
