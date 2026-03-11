"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UrlExpander() {
  const [input, setInput] = useState("");
  const [expanded, setExpanded] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const expandUrl = async (shortUrl: string) => {
    try {
      // Try to expand using a HEAD request
      const response = await fetch(shortUrl, { 
        method: "HEAD",
        redirect: "follow",
      });
      
      return response.url;
    } catch (e) {
      // If fetch fails, try using a URL expansion API
      try {
        const apiResponse = await fetch(`https://unshorten.me/json/${shortUrl}`);
        const data = await apiResponse.json();
        return data.resolved_url || shortUrl;
      } catch {
        return shortUrl;
      }
    }
  };

  const handleExpand = async () => {
    if (!input) return;
    
    setLoading(true);
    setError("");
    
    try {
      const result = await expandUrl(input);
      setExpanded(result);
    } catch (e) {
      setError("Failed to expand URL. The URL may be invalid or unreachable.");
    }
    
    setLoading(false);
  };

  const handleCopy = async () => {
    if (expanded) {
      await navigator.clipboard.writeText(expanded);
    }
  };

  const handleClear = () => {
    setInput("");
    setExpanded("");
    setError("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL Expander</h2>
        <p className="text-sm text-muted-foreground">
          Reveal the final destination of shortened URLs without clicking
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">Shortened URL</Label>
            <Input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://bit.ly/xyz123 or https://t.co/abc"
              className="font-mono"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleExpand} disabled={!input || loading} className="flex-1">
              <ArrowRightLeft className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Expanding..." : "Expand URL"}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input && !expanded}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleExpand} disabled={!input || loading} className="flex-1">
          <ArrowRightLeft className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Expanding..." : "Expand"}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input && !expanded}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {error && (
        <Card className="p-4 border-destructive">
          <p className="text-destructive">{error}</p>
        </Card>
      )}

      {expanded && (
        <Card className="p-4">
          <div className="space-y-3">
            <div>
              <Label className="text-sm text-muted-foreground">Original URL</Label>
              <div className="font-mono text-sm mt-1 break-all">{input}</div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Expanded URL</Label>
              <div className="font-mono text-sm mt-1 break-all p-3 bg-muted rounded">{expanded}</div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleCopy();
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Expanded URL
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={expanded} target="_blank" rel="noopener noreferrer">
                  Open in New Tab
                </a>
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Supported URL Shorteners</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          {["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "buff.ly", "short.link"].map((domain) => (
            <span key={domain} className="px-3 py-1 bg-muted rounded-full font-mono text-xs">
              {domain}
            </span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          Works with most URL shortening services. The tool follows redirects to find the final destination.
        </p>
      </Card>
    </div>
  );
}
