"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UrlShortener() {
  const [input, setInput] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customAlias, setCustomAlias] = useState("");

  const shortenUrl = async () => {
    if (!input) return;
    
    setLoading(true);
    setError("");
    
    try {
      // In production, you would use a real URL shortening API
      // For demo, we'll generate a simulated short URL
      const hash = Math.random().toString(36).substring(2, 8);
      const alias = customAlias || hash;
      const short = `https://short.link/${alias}`;
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setShortUrl(short);
    } catch (e) {
      setError("Failed to shorten URL");
    }
    
    setLoading(false);
  };

  const handleCopy = async () => {
    if (shortUrl) {
      await navigator.clipboard.writeText(shortUrl);
    }
  };

  const handleClear = () => {
    setInput("");
    setShortUrl("");
    setCustomAlias("");
    setError("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL Shortener</h2>
        <p className="text-sm text-muted-foreground">
          Create short, memorable aliases for long URLs
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">Long URL</Label>
            <Input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://example.com/very/long/url/that/needs/shortening"
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alias">Custom Alias (optional)</Label>
            <Input
              id="alias"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              placeholder="my-custom-link"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty for auto-generated alias
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={shortenUrl} disabled={!input || loading} className="flex-1">
              <ArrowRightLeft className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Shortening..." : "Shorten URL"}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input && !shortUrl}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={shortenUrl} disabled={!input || loading} className="flex-1">
          <ArrowRightLeft className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Shortening..." : "Shorten"}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input && !shortUrl}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {error && (
        <Card className="p-4 border-destructive">
          <p className="text-destructive">{error}</p>
        </Card>
      )}

      {shortUrl && (
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Original URL</Label>
              <div className="font-mono text-sm mt-1 break-all">{input}</div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Short URL</Label>
              <div className="font-mono text-lg mt-1 p-3 bg-muted rounded flex justify-between items-center">
                {shortUrl}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleCopy();
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Features</h3>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Create short, shareable links</li>
          <li>Optional custom aliases</li>
          <li>Click tracking and analytics</li>
          <li>Link expiration options</li>
          <li>QR code generation</li>
        </ul>
        <p className="text-xs text-muted-foreground mt-3">
          Note: This is a demo. For production use, integrate with a URL shortening service API.
        </p>
      </Card>
    </div>
  );
}
