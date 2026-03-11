"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UrlRedirectChecker() {
  const [input, setInput] = useState("");
  const [redirects, setRedirects] = useState<Array<{ url: string; status: number }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkRedirects = async (url: string, maxRedirects = 10) => {
    const chain: Array<{ url: string; status: number }> = [];
    let currentUrl = url;
    
    for (let i = 0; i < maxRedirects; i++) {
      try {
        const response = await fetch(currentUrl, {
          method: "HEAD",
          redirect: "manual", // Don't follow redirects automatically
        });
        
        chain.push({
          url: currentUrl,
          status: response.status,
        });
        
        // Check if it's a redirect
        if ([301, 302, 303, 307, 308].includes(response.status)) {
          const location = response.headers.get("location");
          if (location) {
            // Handle relative URLs
            currentUrl = new URL(location, currentUrl).toString();
          } else {
            break;
          }
        } else {
          break;
        }
      } catch (e) {
        // If fetch fails, try with GET
        try {
          const response = await fetch(currentUrl, {
            method: "GET",
            redirect: "follow",
          });
          
          chain.push({
            url: currentUrl,
            status: response.status,
          });
          
          if (response.url !== currentUrl) {
            chain.push({
              url: response.url,
              status: 200,
            });
          }
          break;
        } catch {
          setError("Failed to check redirects. The URL may be unreachable or blocked by CORS.");
          break;
        }
      }
    }
    
    return chain;
  };

  const handleCheck = async () => {
    if (!input) return;
    
    setLoading(true);
    setError("");
    setRedirects([]);
    
    const chain = await checkRedirects(input);
    setRedirects(chain);
    
    setLoading(false);
  };

  const handleCopy = async () => {
    const text = redirects.map((r) => `${r.status} ${r.url}`).join("\n");
    await navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setInput("");
    setRedirects([]);
    setError("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL Redirect Checker</h2>
        <p className="text-sm text-muted-foreground">
          Follow a URL through its entire redirect chain displaying each step
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">URL to Check</Label>
            <Input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://example.com"
              className="font-mono"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCheck} disabled={!input || loading} className="flex-1">
              <ArrowRightLeft className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Checking..." : "Check Redirects"}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input && redirects.length === 0}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleCheck} disabled={!input || loading} className="flex-1">
          <ArrowRightLeft className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Checking..." : "Check"}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input && redirects.length === 0}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {error && (
        <Card className="p-4 border-destructive">
          <p className="text-destructive">{error}</p>
        </Card>
      )}

      {redirects.length > 0 && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Redirect Chain ({redirects.length} steps)</h3>
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
                  Copy Chain
                </>
              )}
            </Button>
          </div>
          <div className="space-y-2">
            {redirects.map((redirect, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    redirect.status >= 300 && redirect.status < 400
                      ? "bg-yellow-100 text-yellow-700"
                      : redirect.status >= 200 && redirect.status < 300
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {redirect.status}
                  </div>
                  {i < redirects.length - 1 && (
                    <div className="w-0.5 h-6 bg-border mt-1" />
                  )}
                </div>
                <div className="flex-1 font-mono text-sm break-all py-1">
                  {redirect.url}
                </div>
              </div>
            ))}
          </div>
          {redirects.length > 1 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Final Destination:</span>
                <span className="font-mono">{redirects[redirects.length - 1].url}</span>
              </div>
            </div>
          )}
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">HTTP Redirect Status Codes</h3>
        <div className="grid gap-2 sm:grid-cols-2 text-sm">
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">301 Moved Permanently</div>
            <div className="text-muted-foreground">Permanent redirect, update bookmarks</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">302 Found</div>
            <div className="text-muted-foreground">Temporary redirect</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">307 Temporary Redirect</div>
            <div className="text-muted-foreground">Temporary, preserve method</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">308 Permanent Redirect</div>
            <div className="text-muted-foreground">Permanent, preserve method</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
