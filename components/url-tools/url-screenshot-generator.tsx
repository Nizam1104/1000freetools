"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function UrlScreenshotGenerator() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [screenshot, setScreenshot] = useState("");
  const [options, setOptions] = useState({
    width: 1280,
    height: 800,
    fullPage: true,
  });

  const generateScreenshot = async () => {
    if (!url) return;
    
    setLoading(true);
    
    try {
      // Use a screenshot API service
      const apiUrl = `https://image.thum.io/get/fullpage/${url}`;
      
      // For demo purposes, we'll show a placeholder
      // In production, you would use a real screenshot service
      setScreenshot(apiUrl);
    } catch (e) {
      console.error("Failed to generate screenshot:", e);
    }
    
    setLoading(false);
  };

  const handleDownload = async () => {
    if (!screenshot) return;
    
    try {
      const response = await fetch(screenshot);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `screenshot-${new URL(url).hostname}.png`;
      a.click();
      URL.revokeObjectURL(downloadUrl);
    } catch (e) {
      // Open in new tab as fallback
      window.open(screenshot, "_blank");
    }
  };

  const handleClear = () => {
    setUrl("");
    setScreenshot("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL Screenshot Generator</h2>
        <p className="text-sm text-muted-foreground">
          Capture full-page screenshots of any website URL
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="font-mono"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="width">Width (px)</Label>
              <Input
                id="width"
                type="number"
                value={options.width}
                onChange={(e) => setOptions({ ...options, width: parseInt(e.target.value) || 1280 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (px)</Label>
              <Input
                id="height"
                type="number"
                value={options.height}
                onChange={(e) => setOptions({ ...options, height: parseInt(e.target.value) || 800 })}
              />
            </div>
            <div className="flex items-end">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="fullPage"
                  checked={options.fullPage}
                  onChange={(e) => setOptions({ ...options, fullPage: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="fullPage" className="text-sm">Full page</Label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={generateScreenshot} disabled={!url || loading} className="flex-1">
              <ArrowRightLeft className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Generating..." : "Generate Screenshot"}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!url && !screenshot}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={generateScreenshot} disabled={!url || loading} className="flex-1">
          <ArrowRightLeft className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Generating..." : "Generate"}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!url && !screenshot}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {screenshot && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Screenshot Preview</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={screenshot} target="_blank" rel="noopener noreferrer">
                  Open Full Size
                </a>
              </Button>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <img 
              src={screenshot} 
              alt="Website screenshot" 
              className="w-full"
              onLoad={() => setLoading(false)}
            />
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">How It Works</h3>
        <p className="text-sm text-muted-foreground">
          This tool uses a screenshot API service to capture full-page screenshots of websites.
          The screenshot is rendered in a headless browser and returned as a PNG image.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Note: Some websites may block screenshot services or require authentication.
        </p>
      </Card>
    </div>
  );
}
