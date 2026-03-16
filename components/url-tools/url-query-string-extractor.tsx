"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UrlQueryQueryStringExtractor() {
  const [input, setInput] = useState("");
  const [params, setParams] = useState<Array<{ key: string; value: string }>>([]);

  const extractParams = () => {
    if (!input) return;
    
    try {
      let urlStr = input.trim();
      
      // If it's not a full URL, make it one
      if (!urlStr.startsWith("http")) {
        urlStr = "https://example.com?" + urlStr;
      }
      
      const url = new URL(urlStr);
      const extracted: Array<{ key: string; value: string }> = [];
      
      url.searchParams.forEach((value, key) => {
        extracted.push({ key, value });
      });
      
      setParams(extracted);
    } catch (e) {
      setParams([]);
    }
  };

  const handleCopy = async () => {
    const text = params.map((p) => `${p.key}=${p.value}`).join("\n");
    await navigator.clipboard.writeText(text);
  };

  const handleCopyJson = async () => {
    const json = JSON.stringify(Object.fromEntries(params.map((p) => [p.key, p.value])), null, 2);
    await navigator.clipboard.writeText(json);
  };

  const handleClear = () => {
    setInput("");
    setParams([]);
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL Query String Extractor</h2>
        <p className="text-sm text-muted-foreground">
          Extract and display all query parameters from a URL
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">URL or Query String</Label>
            <Input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://example.com?name=John&age=30&utm_source=google"
              className="font-mono"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={extractParams} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Extract Parameters
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input && params.length === 0}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={extractParams} disabled={!input} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Extract
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input && params.length === 0}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {params.length > 0 && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Query Parameters ({params.length})</h3>
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
                    Copy List
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleCopyJson();
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
                    Copy JSON
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            {params.map((param, i) => (
              <div key={i} className="flex items-center gap-3 p-2 bg-muted rounded">
                <span className="font-mono text-sm font-semibold text-blue-600 dark:text-blue-400 min-w-[120px]">
                  {param.key}
                </span>
                <span className="text-muted-foreground">=</span>
                <span className="font-mono text-sm break-all">{param.value}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {input && params.length === 0 && (
        <Card className="p-4 border-yellow-500">
          <p className="text-yellow-700 dark:text-yellow-300">
            No query parameters found in the URL
          </p>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Example</h3>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">Input URL</div>
            <div className="font-mono text-xs break-all">
              https://example.com/search?q=hello&page=1&sort=desc
            </div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">Extracted Parameters</div>
            <div className="font-mono text-xs">
              q = hello<br />
              page = 1<br />
              sort = desc
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
