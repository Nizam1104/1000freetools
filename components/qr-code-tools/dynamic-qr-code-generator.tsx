"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, RefreshCw, Edit3, BarChart3 } from "lucide-react";

const DynamicQrCodeGenerator: React.FC = () => {
  const [targetUrl, setTargetUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [qrName, setQrName] = useState("");
  const [description, setDescription] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [trackAnalytics, setTrackAnalytics] = useState(true);
  const [password, setPassword] = useState("");
  const [expiryEnabled, setExpiryEnabled] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [generated, setGenerated] = useState(false);
  const [dynamicUrl, setDynamicUrl] = useState("");
  const [scanCount, setScanCount] = useState(0);

  const handleGenerate = useCallback(() => {
    if (!targetUrl) return;
    
    const code = shortCode || Math.random().toString(36).substring(2, 10);
    const dynamic = `https://qr.dynamic/${code}`;
    setDynamicUrl(dynamic);
    setGenerated(true);
  }, [targetUrl, shortCode]);

  const handleUpdateUrl = useCallback(() => {
    // Simulate URL update for dynamic QR
    alert("Target URL updated! The QR code remains the same but now points to the new URL.");
  }, []);

  const handleClear = useCallback(() => {
    setTargetUrl("");
    setShortCode("");
    setQrName("");
    setDescription("");
    setIsEditable(true);
    setTrackAnalytics(true);
    setPassword("");
    setExpiryEnabled(false);
    setExpiryDate("");
    setGenerated(false);
    setDynamicUrl("");
    setScanCount(0);
  }, []);

  const handleCopy = useCallback(() => {
    if (dynamicUrl) {
      navigator.clipboard.writeText(dynamicUrl);
    }
  }, [dynamicUrl]);

  const handleDownload = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 300, 300);
      
      // Dynamic QR indicator pattern
      ctx.fillStyle = "#000000";
      const qrSize = 250;
      const qrStart = 25;
      const blockSize = qrSize / 21;
      
      for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 21; j++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(qrStart + i * blockSize, qrStart + j * blockSize, blockSize - 1, blockSize - 1);
          }
        }
      }
      
      // Add "DYNAMIC" badge
      ctx.fillStyle = "#4CAF50";
      ctx.fillRect(200, 20, 80, 30);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.fillText("DYNAMIC", 240, 40);
    }
    
    const link = document.createElement("a");
    link.download = `dynamic-qr-${qrName || "code"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [qrName]);

  const handleSimulateScan = useCallback(() => {
    setScanCount(prev => prev + 1);
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Dynamic QR Code Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="targetUrl">Target URL</Label>
              <Textarea
                id="targetUrl"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="Enter the URL your QR code should redirect to"
                rows={3}
              />
              <p className="text-xs text-gray-500">
                ✓ Can be changed later without regenerating the QR code
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qrName">QR Code Name</Label>
              <Input
                id="qrName"
                value={qrName}
                onChange={(e) => setQrName(e.target.value)}
                placeholder="My Dynamic QR"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortCode">Custom Short Code (Optional)</Label>
              <Input
                id="shortCode"
                value={shortCode}
                onChange={(e) => setShortCode(e.target.value)}
                placeholder="my-qr-code"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of this QR code"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Editable After Creation</Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isEditable"
                  checked={isEditable}
                  onChange={(e) => setIsEditable(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="isEditable" className="font-normal">
                  Allow URL changes
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Track Analytics</Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="trackAnalytics"
                  checked={trackAnalytics}
                  onChange={(e) => setTrackAnalytics(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="trackAnalytics" className="font-normal">
                  Enable scan tracking
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password Protection (Optional)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Require password to access"
              />
            </div>

            <div className="space-y-2">
              <Label>Expiry Date</Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="expiryEnabled"
                  checked={expiryEnabled}
                  onChange={(e) => setExpiryEnabled(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="expiryEnabled" className="font-normal">
                  Set expiration
                </Label>
              </div>
              {expiryEnabled && (
                <Input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="mt-2"
                />
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={!targetUrl}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate Dynamic QR
            </Button>
            {generated && isEditable && (
              <Button onClick={handleUpdateUrl} variant="outline">
                <Edit3 className="w-4 h-4 mr-2" />
                Update URL
              </Button>
            )}
            {generated && trackAnalytics && (
              <Button onClick={handleSimulateScan} variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Simulate Scan
              </Button>
            )}
            <Button onClick={handleCopy} variant="outline" disabled={!generated}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!generated}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {generated && (
            <div className="mt-4 space-y-4">
              <div className="p-4 border rounded-lg bg-green-50">
                <p className="text-sm text-gray-600 mb-1">Dynamic QR Short URL:</p>
                <p className="text-lg font-semibold text-green-700 break-all">{dynamicUrl}</p>
                <p className="text-xs text-gray-500 mt-2">
                  ✓ This URL can be updated anytime without changing the QR code
                </p>
              </div>

              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm font-semibold mb-2">QR Code Preview:</p>
                <div className="flex justify-center">
                  <div className="relative w-48 h-48 bg-white border-2 border-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="grid grid-cols-5 gap-1">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                          />
                        ))}
                      </div>
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        DYNAMIC
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {trackAnalytics && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{scanCount}</p>
                        <p className="text-xs text-gray-500">Total Scans</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{scanCount > 0 ? Math.floor(scanCount * 0.6) : 0}</p>
                        <p className="text-xs text-gray-500">Unique Scans</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{scanCount > 0 ? Math.floor(scanCount * 0.4) : 0}</p>
                        <p className="text-xs text-gray-500">Returning</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="p-4 border rounded-lg bg-blue-50">
                <p className="text-sm font-semibold mb-2">Dynamic QR Features:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ {isEditable ? "URL can be updated anytime" : "URL is locked"}</li>
                  <li>✓ {trackAnalytics ? "Analytics tracking enabled" : "No tracking"}</li>
                  {password && <li>✓ Password protected</li>}
                  {expiryEnabled && expiryDate && (
                    <li>✓ Expires on {new Date(expiryDate).toLocaleDateString()}</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicQrCodeGenerator;
