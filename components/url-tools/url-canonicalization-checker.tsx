"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, ExternalLink } from "lucide-react";

export default function UrlCanonicalizationChecker() {
  const [url, setUrl] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{
    input: string;
    canonical: string | null;
    hasCanonical: boolean;
    issues: string[];
  } | null>(null);

  const checkCanonical = async () => {
    if (!url) return;
    
    setChecking(true);
    
    try {
      // In production, you would fetch the actual URL and parse the HTML
      // For demo, we'll simulate the check
      const fullUrl = url.startsWith("http") ? url : `https://${url}`;
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulated result
      setResult({
        input: fullUrl,
        canonical: fullUrl, // In real scenario, this would be extracted from <link rel="canonical">
        hasCanonical: true,
        issues: [],
      });
    } catch (e) {
      setResult({
        input: url,
        canonical: null,
        hasCanonical: false,
        issues: ["Failed to fetch URL"],
      });
    }
    
    setChecking(false);
  };

  const handleClear = () => {
    setUrl("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL Canonicalization Checker</h2>
        <p className="text-sm text-muted-foreground">
          Check a webpage for its canonical URL tag
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL to Check</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="font-mono"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={checkCanonical} disabled={!url || checking} className="flex-1">
              <ArrowRightLeft className={`w-4 h-4 mr-2 ${checking ? "animate-spin" : ""}`} />
              {checking ? "Checking..." : "Check Canonical"}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!url && !result}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={checkCanonical} disabled={!url || checking} className="flex-1">
          <ArrowRightLeft className={`w-4 h-4 mr-2 ${checking ? "animate-spin" : ""}`} />
          {checking ? "Checking..." : "Check"}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!url && !result}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {result && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${result.hasCanonical ? "bg-green-500" : "bg-yellow-500"}`} />
              <div className="font-semibold">
                {result.hasCanonical 
                  ? "Canonical tag found" 
                  : "No canonical tag found"}
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Input URL</Label>
              <div className="font-mono text-sm mt-1 break-all">{result.input}</div>
            </div>

            {result.canonical && (
              <div>
                <Label className="text-sm text-muted-foreground">Canonical URL</Label>
                <div className="font-mono text-sm mt-1 break-all p-2 bg-muted rounded flex justify-between items-center">
                  {result.canonical}
                  <Button variant="ghost" size="sm" asChild>
                    <a href={result.canonical} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            )}

            {result.issues.length > 0 && (
              <div>
                <Label className="text-sm text-muted-foreground">Issues</Label>
                <ul className="list-disc list-inside mt-2 text-sm text-destructive">
                  {result.issues.map((issue, i) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">What is a Canonical URL?</h3>
        <p className="text-sm text-muted-foreground mb-3">
          A canonical URL is specified using the <code className="bg-muted px-1 rounded">&lt;link rel="canonical"&gt;</code> tag 
          in the HTML head. It tells search engines which version of a URL should be considered the primary one, 
          helping to avoid duplicate content issues.
        </p>
        <div className="p-3 bg-muted rounded font-mono text-sm">
          &lt;link rel="canonical" href="https://example.com/preferred-url" /&gt;
        </div>
      </Card>
    </div>
  );
}
