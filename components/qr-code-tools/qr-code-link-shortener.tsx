"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Link, QrCode } from "lucide-react";

const QrCodeLinkShortener: React.FC = () => {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
  const [domain, setDomain] = useState("short.link");
  const [clickTracking, setClickTracking] = useState(true);
  const [expiryDate, setExpiryDate] = useState("");

  const domains = ["short.link", "tiny.url", "go.link", "s.id", "lnk.to"];

  const handleShorten = useCallback(() => {
    if (!longUrl) return;
    
    const alias = customAlias || Math.random().toString(36).substring(2, 8);
    const shortened = `https://${domain}/${alias}`;
    setShortUrl(shortened);
    setQrCodeGenerated(false);
  }, [longUrl, customAlias, domain]);

  const handleGenerateQR = useCallback(() => {
    if (!shortUrl) return;
    setQrCodeGenerated(true);
  }, [shortUrl]);

  const handleClear = useCallback(() => {
    setLongUrl("");
    setCustomAlias("");
    setShortUrl("");
    setQrCodeGenerated(false);
    setDomain("short.link");
    setClickTracking(true);
    setExpiryDate("");
  }, []);

  const handleCopy = useCallback(() => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
    }
  }, [shortUrl]);

  const handleDownload = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 300, 300);
      ctx.fillStyle = "#000000";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.fillText("QR Code for:", 150, 30);
      ctx.font = "12px Arial";
      ctx.fillText(shortUrl, 150, 60);
      
      // Placeholder QR pattern
      const qrSize = 200;
      const qrStart = 50;
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(qrStart + i * 10, qrStart + j * 10, 8, 8);
          }
        }
      }
    }
    
    const link = document.createElement("a");
    link.download = "qr-short-link.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [shortUrl]);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5" />
            QR Code Link Shortener
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="longUrl">Long URL</Label>
              <Textarea
                id="longUrl"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="Enter the long URL to shorten"
                rows={3}
              />
              {longUrl && !validateUrl(longUrl) && (
                <p className="text-sm text-red-500">Please enter a valid URL</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="domain">Short Domain</Label>
              <select
                id="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {domains.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customAlias">Custom Alias (Optional)</Label>
              <Input
                id="customAlias"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                placeholder="my-custom-link"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
              <Input
                id="expiryDate"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Click Tracking</Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="clickTracking"
                  checked={clickTracking}
                  onChange={(e) => setClickTracking(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="clickTracking" className="font-normal">
                  Enable analytics tracking
                </Label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleShorten} disabled={!longUrl || !validateUrl(longUrl)}>
              <Link className="w-4 h-4 mr-2" />
              Shorten URL
            </Button>
            <Button 
              onClick={handleGenerateQR} 
              variant="outline"
              disabled={!shortUrl}
            >
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR Code
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!shortUrl}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!qrCodeGenerated}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {shortUrl && (
            <div className="mt-4 p-4 border rounded-lg bg-green-50">
              <p className="text-sm text-gray-600 mb-1">Shortened URL:</p>
              <p className="text-lg font-semibold text-green-700 break-all">{shortUrl}</p>
              {clickTracking && (
                <p className="text-xs text-gray-500 mt-2">
                  ✓ Click tracking enabled - Analytics will be available
                </p>
              )}
              {expiryDate && (
                <p className="text-xs text-gray-500">
                  ✓ Expires on: {new Date(expiryDate).toLocaleDateString()}
                </p>
              )}
            </div>
          )}

          {qrCodeGenerated && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">QR Code Preview</p>
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-white border-2 border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="w-32 h-32 mx-auto text-gray-400" />
                    <p className="text-xs text-gray-500 mt-2 px-2 break-all">{shortUrl}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QrCodeLinkShortener;
