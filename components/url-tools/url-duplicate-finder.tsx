"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UrlDuplicateFinder() {
  const [input, setInput] = useState("");
  const [duplicates, setDuplicates] = useState<Array<{ url: string; count: number; indices: number[] }>>([]);
  const [normalize, setNormalize] = useState({
    removeTrailingSlash: true,
    lowercase: true,
    removeWWW: true,
    removeFragments: true,
    removeQueryParams: false,
  });

  const normalizeUrl = (url: string) => {
    let normalized = url.trim();
    
    if (normalize.lowercase) {
      normalized = normalized.toLowerCase();
    }
    
    if (normalize.removeWWW && normalized.startsWith("http://www.")) {
      normalized = normalized.replace("http://www.", "http://");
    } else if (normalize.removeWWW && normalized.startsWith("https://www.")) {
      normalized = normalized.replace("https://www.", "https://");
    }
    
    if (normalize.removeFragments) {
      normalized = normalized.split("#")[0];
    }
    
    if (normalize.removeQueryParams) {
      normalized = normalized.split("?")[0];
    }
    
    if (normalize.removeTrailingSlash && normalized.endsWith("/") && !normalized.split("//")[1]?.includes("/")) {
      normalized = normalized.slice(0, -1);
    } else if (normalize.removeTrailingSlash && normalized.length > 8 && normalized.endsWith("/")) {
      // Only remove trailing slash if not the only slash after protocol
      const pathPart = normalized.split("//")[1];
      if (pathPart && pathPart.split("/").length > 2) {
        normalized = normalized.slice(0, -1);
      }
    }
    
    return normalized;
  };

  const findDuplicates = () => {
    const lines = input.split("\n").filter((l) => l.trim());
    const urlMap = new Map<string, { count: number; indices: number[] }>();
    
    lines.forEach((url, index) => {
      const normalized = normalizeUrl(url);
      const existing = urlMap.get(normalized);
      
      if (existing) {
        existing.count++;
        existing.indices.push(index + 1);
      } else {
        urlMap.set(normalized, { count: 1, indices: [index + 1] });
      }
    });
    
    const dupes: typeof duplicates = [];
    urlMap.forEach((data, url) => {
      if (data.count > 1) {
        dupes.push({ url, count: data.count, indices: data.indices });
      }
    });
    
    setDuplicates(dupes);
  };

  const handleClear = () => {
    setInput("");
    setDuplicates([]);
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = duplicates.map((d) => `${d.url} (${d.count} occurrences)`).join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL Duplicate Finder</h2>
        <p className="text-sm text-muted-foreground">
          Find duplicate URLs in a list with normalization options
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="trailingSlash"
                checked={normalize.removeTrailingSlash}
                onChange={(e) => setNormalize({ ...normalize, removeTrailingSlash: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="trailingSlash" className="text-sm">Ignore trailing slash</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="lowercase"
                checked={normalize.lowercase}
                onChange={(e) => setNormalize({ ...normalize, lowercase: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="lowercase" className="text-sm">Case insensitive</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="www"
                checked={normalize.removeWWW}
                onChange={(e) => setNormalize({ ...normalize, removeWWW: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="www" className="text-sm">Ignore www prefix</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="fragments"
                checked={normalize.removeFragments}
                onChange={(e) => setNormalize({ ...normalize, removeFragments: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="fragments" className="text-sm">Ignore fragments (#)</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="queryParams"
                checked={normalize.removeQueryParams}
                onChange={(e) => setNormalize({ ...normalize, removeQueryParams: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="queryParams" className="text-sm">Ignore query params (?)</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">URL List (one per line)</Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://example.com
https://example.com/
http://www.example.com
https://example.com#section"
              className="w-full min-h-[200px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={findDuplicates} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Find Duplicates
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={findDuplicates} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Find
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {duplicates.length > 0 && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Found {duplicates.length} duplicate groups</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleCopy();
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
                  Copy Summary
                </>
              )}
            </Button>
          </div>
          <div className="space-y-3">
            {duplicates.map((dup, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="font-mono text-sm break-all">{dup.url}</div>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium whitespace-nowrap ml-2">
                    {dup.count} occurrences
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Lines: {dup.indices.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {input && duplicates.length === 0 && (
        <Card className="p-4 border-green-500">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            <p className="text-green-700 dark:text-green-300">
              No duplicates found in {input.split("\n").filter((l) => l.trim()).length} URLs
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
