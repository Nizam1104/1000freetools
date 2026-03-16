"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, ExternalLink } from "lucide-react";

export default function UrlSourceCodeViewer() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSource = async () => {
    if (!url) return;
    
    setLoading(true);
    setError("");
    
    try {
      const fullUrl = url.startsWith("http") ? url : `https://${url}`;
      
      // Use a CORS proxy or direct fetch
      const response = await fetch(fullUrl);
      const html = await response.text();
      
      setSource(html);
    } catch (e) {
      setError("Failed to fetch source code. The URL may be blocking requests or CORS may be preventing access.");
    }
    
    setLoading(false);
  };

  const handleCopy = async () => {
    if (source) {
      await navigator.clipboard.writeText(source);
    }
  };

  const handleClear = () => {
    setUrl("");
    setSource("");
    setError("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL Source Code Viewer</h2>
        <p className="text-sm text-muted-foreground">
          View the raw HTML source code of any webpage
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL to View Source</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="font-mono"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={fetchSource} disabled={!url || loading} className="flex-1">
              <ArrowRightLeft className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Fetching..." : "View Source"}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!url && !source}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={fetchSource} disabled={!url || loading} className="flex-1">
          <ArrowRightLeft className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Fetching..." : "View Source"}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!url && !source}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {error && (
        <Card className="p-4 border-destructive">
          <p className="text-destructive">{error}</p>
        </Card>
      )}

      {source && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">HTML Source Code</h3>
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
                    Copy
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`data:text/html;charset=utf-8,${encodeURIComponent(source)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in New Tab
                </a>
              </Button>
            </div>
          </div>
          <pre className="bg-muted p-4 rounded text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-[600px] overflow-y-auto">
            {source}
          </pre>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">What You Can Find</h3>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>HTML structure and semantic elements</li>
          <li>Meta tags for SEO and social media</li>
          <li>Linked CSS and JavaScript files</li>
          <li>Hidden comments from developers</li>
          <li>Schema.org structured data</li>
          <li>Analytics and tracking codes</li>
        </ul>
      </Card>
    </div>
  );
}
