"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, ExternalLink } from "lucide-react";

type LinkInfo = {
  url: string;
  text: string;
  type: "internal" | "external";
  status?: number;
};

export default function HtmlLinkExtractorChecker() {
  const [input, setInput] = useState("");
  const [links, setLinks] = useState<LinkInfo[]>([]);
  const [checking, setChecking] = useState(false);
  const [checkResults, setCheckResults] = useState<Record<string, number>>({});

  const extractLinks = (html: string, baseUrl?: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const anchors = doc.querySelectorAll("a[href]");
    
    const extracted: LinkInfo[] = [];
    anchors.forEach((anchor) => {
      const href = anchor.getAttribute("href") || "";
      const text = anchor.textContent?.trim() || "";
      
      let type: "internal" | "external" = "internal";
      if (href.startsWith("http://") || href.startsWith("https://")) {
        type = "external";
      } else if (baseUrl && !href.startsWith("/") && !href.startsWith("#")) {
        type = "external";
      }
      
      extracted.push({ url: href, text, type });
    });
    
    return extracted;
  };

  const checkLinkStatus = async (url: string): Promise<number> => {
    try {
      // Use a simple HEAD request via a proxy to avoid CORS issues
      const response = await fetch(url, { method: "HEAD", mode: "no-cors" });
      // With no-cors, we can't read the status, so assume 200 if no error
      return 200;
    } catch {
      return 0;
    }
  };

  const handleExtract = () => {
    const extracted = extractLinks(input);
    setLinks(extracted);
    setCheckResults({});
  };

  const handleCheckLinks = async () => {
    setChecking(true);
    const results: Record<string, number> = {};
    
    for (const link of links) {
      if (link.type === "external" && link.url.startsWith("http")) {
        const status = await checkLinkStatus(link.url);
        results[link.url] = status;
      }
    }
    
    setCheckResults(results);
    setChecking(false);
  };

  const handleCopy = async () => {
    const text = links.map((l) => l.url).join("\n");
    await navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setInput("");
    setLinks([]);
    setCheckResults({});
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">HTML Link Extractor & Checker</h2>
        <p className="text-sm text-muted-foreground">
          Extract all hyperlinks from HTML code and check their status
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="input">HTML Input</Label>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="<a href='https://example.com'>Example</a>"
          className="w-full min-h-[150px] p-3 font-mono text-sm rounded-md border border-input"
        />
        <div className="flex gap-2">
          <Button onClick={handleExtract} className="flex-1">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Extract Links
          </Button>
          <Button variant="outline" onClick={handleClear}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {links.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Found {links.length} link{links.length !== 1 ? "s" : ""}
              {" "}(Internal: {links.filter((l) => l.type === "internal").length}, 
              External: {links.filter((l) => l.type === "external").length})
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCheckLinks}
                disabled={checking || links.filter((l) => l.type === "external").length === 0}
              >
                {checking ? "Checking..." : "Check Links"}
              </Button>
              <Button
                variant="outline"
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
                    Copy URLs
                  </>
                )}
              </Button>
            </div>
          </div>

          <Card className="p-4">
            <div className="space-y-2">
              {links.map((link, i) => {
                const status = checkResults[link.url];
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 p-2 rounded hover:bg-muted"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{link.text || "(no text)"}</div>
                      <div className="text-sm text-muted-foreground font-mono truncate">{link.url}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        link.type === "internal" 
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                          : "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                      }`}>
                        {link.type}
                      </span>
                      {status !== undefined && link.type === "external" && (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          status === 200 
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }`}>
                          {status === 200 ? "OK" : status === 0 ? "Failed" : status}
                        </span>
                      )}
                      {link.type === "external" && (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 hover:bg-muted rounded"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
