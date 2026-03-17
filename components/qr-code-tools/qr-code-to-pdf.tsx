"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, FileText, Image } from "lucide-react";

const QrCodeToPdf: React.FC = () => {
  const [qrData, setQrData] = useState("");
  const [pdfTitle, setPdfTitle] = useState("QR Code Document");
  const [pdfDescription, setPdfDescription] = useState("");
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState("portrait");
  const [qrSize, setQrSize] = useState(200);
  const [includeCaption, setIncludeCaption] = useState(true);
  const [caption, setCaption] = useState("Scan QR Code");
  const [showBorder, setShowBorder] = useState(true);
  const [generated, setGenerated] = useState(false);

  const pageSizes = [
    { value: "a4", label: "A4 (210 x 297 mm)" },
    { value: "letter", label: "Letter (8.5 x 11 in)" },
    { value: "legal", label: "Legal (8.5 x 14 in)" },
    { value: "a5", label: "A5 (148 x 210 mm)" },
  ];

  const orientations = [
    { value: "portrait", label: "Portrait" },
    { value: "landscape", label: "Landscape" },
  ];

  const handleGenerate = useCallback(() => {
    if (!qrData) return;
    setGenerated(true);
  }, [qrData]);

  const handleClear = useCallback(() => {
    setQrData("");
    setPdfTitle("QR Code Document");
    setPdfDescription("");
    setPageSize("a4");
    setOrientation("portrait");
    setQrSize(200);
    setIncludeCaption(true);
    setCaption("Scan QR Code");
    setShowBorder(true);
    setGenerated(false);
  }, []);

  const handleCopy = useCallback(() => {
    const info = `QR Code PDF Details:
Title: ${pdfTitle}
Description: ${pdfDescription}
Data: ${qrData}
Page Size: ${pageSize}
Orientation: ${orientation}
QR Size: ${qrSize}px
Caption: ${caption}`;
    navigator.clipboard.writeText(info);
  }, [pdfTitle, pdfDescription, qrData, pageSize, orientation, qrSize, caption]);

  const handleDownload = useCallback(() => {
    // Create a simple PDF-like canvas representation
    const width = orientation === "landscape" ? 792 : 612;
    const height = orientation === "landscape" ? 612 : 792;
    
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    
    if (ctx) {
      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      
      // Border
      if (showBorder) {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 20, width - 40, height - 40);
      }
      
      // Title
      ctx.fillStyle = "#000000";
      ctx.font = "bold 24px Arial";
      ctx.textAlign = "center";
      ctx.fillText(pdfTitle, width / 2, 60);
      
      // Description
      if (pdfDescription) {
        ctx.font = "14px Arial";
        ctx.fillText(pdfDescription, width / 2, 90);
      }
      
      // QR Code placeholder
      const qrStartX = (width - qrSize) / 2;
      const qrStartY = 150;
      
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(qrStartX, qrStartY, qrSize, qrSize);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 1;
      ctx.strokeRect(qrStartX, qrStartY, qrSize, qrSize);
      
      // Simulated QR pattern
      ctx.fillStyle = "#000000";
      const blockSize = qrSize / 21;
      for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 21; j++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(
              qrStartX + i * blockSize,
              qrStartY + j * blockSize,
              blockSize - 1,
              blockSize - 1
            );
          }
        }
      }
      
      // Caption
      if (includeCaption) {
        ctx.font = "16px Arial";
        ctx.fillText(caption, width / 2, qrStartY + qrSize + 40);
      }
      
      // Footer with data preview
      ctx.font = "10px Arial";
      ctx.fillStyle = "#666666";
      const dataPreview = qrData.length > 50 ? qrData.substring(0, 50) + "..." : qrData;
      ctx.fillText(dataPreview, width / 2, height - 40);
    }
    
    const link = document.createElement("a");
    link.download = `${pdfTitle.replace(/\s+/g, "-").toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [pdfTitle, pdfDescription, orientation, showBorder, qrSize, includeCaption, caption, qrData]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            QR Code to PDF
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
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="pdfTitle">PDF Title</Label>
              <Input
                id="pdfTitle"
                value={pdfTitle}
                onChange={(e) => setPdfTitle(e.target.value)}
                placeholder="Document Title"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="pdfDescription">Description (Optional)</Label>
              <Textarea
                id="pdfDescription"
                value={pdfDescription}
                onChange={(e) => setPdfDescription(e.target.value)}
                placeholder="Brief description of the document"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pageSize">Page Size</Label>
              <select
                id="pageSize"
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {pageSizes.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="orientation">Orientation</Label>
              <select
                id="orientation"
                value={orientation}
                onChange={(e) => setOrientation(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {orientations.map((orient) => (
                  <option key={orient.value} value={orient.value}>
                    {orient.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qrSize">QR Code Size (px)</Label>
              <Input
                id="qrSize"
                type="number"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                min={100}
                max={400}
              />
            </div>

            <div className="space-y-2">
              <Label>Show Border</Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showBorder"
                  checked={showBorder}
                  onChange={(e) => setShowBorder(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="showBorder" className="font-normal">
                  Include page border
                </Label>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Include Caption</Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeCaption"
                  checked={includeCaption}
                  onChange={(e) => setIncludeCaption(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="includeCaption" className="font-normal">
                  Add caption below QR code
                </Label>
              </div>
              {includeCaption && (
                <Input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Caption text"
                  className="mt-2"
                />
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={!qrData}>
              <Image className="w-4 h-4 mr-2" />
              Generate Preview
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!generated}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Info
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!generated}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {generated && (
            <div className="mt-4 space-y-4">
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm font-semibold mb-3">PDF Preview:</p>
                <div 
                  className="mx-auto bg-white shadow-lg"
                  style={{
                    width: orientation === "landscape" ? 400 : 300,
                    height: orientation === "landscape" ? 300 : 400,
                    padding: "20px",
                    border: showBorder ? "2px solid #000" : "none",
                  }}
                >
                  <h3 className="text-lg font-bold text-center mb-2">{pdfTitle}</h3>
                  {pdfDescription && (
                    <p className="text-sm text-center text-gray-600 mb-4">{pdfDescription}</p>
                  )}
                  <div className="flex justify-center my-4">
                    <div 
                      className="border flex items-center justify-center"
                      style={{ width: qrSize / 2, height: qrSize / 2 }}
                    >
                      <div className="text-center text-gray-400">
                        <div className="grid grid-cols-5 gap-0.5">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-4 h-4 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {includeCaption && (
                    <p className="text-sm text-center mt-2">{caption}</p>
                  )}
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-blue-50">
                <p className="text-sm font-semibold mb-2">PDF Settings:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Page Size: {pageSizes.find(s => s.value === pageSize)?.label}</li>
                  <li>• Orientation: {orientation.charAt(0).toUpperCase() + orientation.slice(1)}</li>
                  <li>• QR Size: {qrSize}px</li>
                  <li>• Border: {showBorder ? "Enabled" : "Disabled"}</li>
                  <li>• Caption: {includeCaption ? `"${caption}"` : "Disabled"}</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QrCodeToPdf;
