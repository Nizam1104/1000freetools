"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UrlParser() {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<{
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
    origin: string;
    href: string;
  } | null>(null);

  const parseUrl = () => {
    if (!input) return;
    
    try {
      let urlStr = input.trim();
      
      // Add protocol if missing
      if (!urlStr.startsWith("http://") && !urlStr.startsWith("https://")) {
        urlStr = "https://" + urlStr;
      }
      
      const url = new URL(urlStr);
      
      setParsed({
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || "(default)",
        pathname: url.pathname,
        search: url.search || "(none)",
        hash: url.hash || "(none)",
        origin: url.origin,
        href: url.href,
      });
    } catch (e) {
      setParsed(null);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setInput("");
    setParsed(null);
  };

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopyWithFeedback = async (text: string, field: string) => {
    await handleCopy(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL Parser</h2>
        <p className="text-sm text-muted-foreground">
          Break down a URL into its constituent parts
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">URL to Parse</Label>
            <Input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://example.com:8080/path/page?query=value#section"
              className="font-mono"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={parseUrl} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Parse URL
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input && !parsed}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={parseUrl} disabled={!input} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Parse
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input && !parsed}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {parsed && (
        <Card className="p-4">
          <h3 className="font-semibold mb-4">URL Components</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted rounded">
              <div>
                <div className="text-sm text-muted-foreground">Protocol</div>
                <div className="font-mono font-semibold">{parsed.protocol}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyWithFeedback(parsed.protocol, "protocol")}
              >
                {copiedField === "protocol" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted rounded">
              <div>
                <div className="text-sm text-muted-foreground">Hostname</div>
                <div className="font-mono font-semibold">{parsed.hostname}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyWithFeedback(parsed.hostname, "hostname")}
              >
                {copiedField === "hostname" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted rounded">
              <div>
                <div className="text-sm text-muted-foreground">Port</div>
                <div className="font-mono font-semibold">{parsed.port}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyWithFeedback(parsed.port, "port")}
              >
                {copiedField === "port" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted rounded">
              <div>
                <div className="text-sm text-muted-foreground">Pathname</div>
                <div className="font-mono font-semibold">{parsed.pathname}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyWithFeedback(parsed.pathname, "pathname")}
              >
                {copiedField === "pathname" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted rounded">
              <div>
                <div className="text-sm text-muted-foreground">Query String</div>
                <div className="font-mono font-semibold">{parsed.search}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyWithFeedback(parsed.search, "search")}
              >
                {copiedField === "search" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted rounded">
              <div>
                <div className="text-sm text-muted-foreground">Hash/Fragment</div>
                <div className="font-mono font-semibold">{parsed.hash}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyWithFeedback(parsed.hash, "hash")}
              >
                {copiedField === "hash" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted rounded">
              <div>
                <div className="text-sm text-muted-foreground">Origin</div>
                <div className="font-mono font-semibold">{parsed.origin}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyWithFeedback(parsed.origin, "origin")}
              >
                {copiedField === "origin" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted rounded">
              <div>
                <div className="text-sm text-muted-foreground">Full URL (href)</div>
                <div className="font-mono font-semibold break-all">{parsed.href}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyWithFeedback(parsed.href, "href")}
              >
                {copiedField === "href" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {input && !parsed && (
        <Card className="p-4 border-destructive">
          <p className="text-destructive">Invalid URL format</p>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">URL Structure</h3>
        <div className="font-mono text-sm p-3 bg-muted rounded">
          <span className="text-blue-600">protocol:</span>//<span className="text-green-600">hostname</span>:<span className="text-yellow-600">port</span>/<span className="text-purple-600">pathname</span>?<span className="text-red-600">search</span>#<span className="text-orange-600">hash</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Example: https://example.com:8080/path/page.html?query=value#section
        </p>
      </Card>
    </div>
  );
}
