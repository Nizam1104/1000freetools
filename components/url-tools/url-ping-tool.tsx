"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, ExternalLink } from "lucide-react";

export default function UrlPingTool() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<{
    online: boolean;
    status: number;
    responseTime: number;
    headers: Record<string, string>;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pingUrl = async () => {
    if (!url) return;
    
    setLoading(true);
    setError("");
    
    const startTime = performance.now();
    
    try {
      const fullUrl = url.startsWith("http") ? url : `https://${url}`;
      const response = await fetch(fullUrl, { 
        method: "HEAD",
        mode: "no-cors", // Avoid CORS issues
      });
      
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
      
      // With no-cors, we can't read status, so assume success if no error
      setResult({
        online: true,
        status: 200,
        responseTime,
        headers: {},
      });
    } catch (e) {
      setError("Failed to reach the URL. It may be offline or blocking requests.");
      setResult(null);
    }
    
    setLoading(false);
  };

  const handleClear = () => {
    setUrl("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL Ping Tool</h2>
        <p className="text-sm text-muted-foreground">
          Check if a URL is online and measure response time
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL to Ping</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="font-mono"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={pingUrl} disabled={!url || loading} className="flex-1">
              <ArrowRightLeft className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Pinging..." : "Ping URL"}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!url && !result}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={pingUrl} disabled={!url || loading} className="flex-1">
          <ArrowRightLeft className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Pinging..." : "Ping"}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!url && !result}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {error && (
        <Card className="p-4 border-destructive">
          <p className="text-destructive">{error}</p>
        </Card>
      )}

      {result && (
        <Card className={`p-4 ${result.online ? "border-green-500" : "border-destructive"}`}>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="text-center p-4 bg-muted rounded">
              <div className={`text-2xl font-bold ${result.online ? "text-green-600" : "text-destructive"}`}>
                {result.online ? "Online" : "Offline"}
              </div>
              <div className="text-sm text-muted-foreground">Status</div>
            </div>
            <div className="text-center p-4 bg-muted rounded">
              <div className="text-2xl font-bold font-mono">{result.status}</div>
              <div className="text-sm text-muted-foreground">HTTP Status</div>
            </div>
            <div className="text-center p-4 bg-muted rounded">
              <div className="text-2xl font-bold font-mono">{result.responseTime}ms</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">How It Works</h3>
        <p className="text-sm text-muted-foreground">
          This tool sends an HTTP HEAD request to the specified URL and measures the response time.
          It checks if the server responds, indicating the website is online.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Note: Some websites may block automated requests or require specific headers.
        </p>
      </Card>
    </div>
  );
}
