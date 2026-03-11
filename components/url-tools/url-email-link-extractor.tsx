"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download, ExternalLink } from "lucide-react";

export default function UrlEmailLinkExtractor() {
  const [url, setUrl] = useState("");
  const [htmlInput, setHtmlInput] = useState("");
  const [mode, setMode] = useState<"url" | "html">("html");
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const extractEmails = (text: string) => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = text.match(emailRegex) || [];
    return [...new Set(matches)]; // Remove duplicates
  };

  const fetchAndExtract = async () => {
    if (!url) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(url, { mode: "cors" });
      const html = await response.text();
      const extracted = extractEmails(html);
      setEmails(extracted);
      
      if (extracted.length === 0) {
        setError("No email addresses found on this page");
      }
    } catch (err) {
      setError("Failed to fetch the URL. It may have CORS restrictions.");
    }
    
    setLoading(false);
  };

  const extractFromHtml = () => {
    const extracted = extractEmails(htmlInput);
    setEmails(extracted);
    
    if (extracted.length === 0) {
      setError("No email addresses found in the HTML");
    } else {
      setError("");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(emails.join("\n"));
  };

  const handleDownload = () => {
    const blob = new Blob([emails.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emails.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setUrl("");
    setHtmlInput("");
    setEmails([]);
    setError("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL Email Link Extractor</h2>
        <p className="text-sm text-muted-foreground">
          Extract email addresses from webpages or HTML code
        </p>
      </div>

      <Card className="p-4">
        <div className="flex gap-2 mb-4">
          <Button
            variant={mode === "url" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("url")}
          >
            From URL
          </Button>
          <Button
            variant={mode === "html" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("html")}
          >
            From HTML
          </Button>
        </div>

        {mode === "url" ? (
          <div className="space-y-2">
            <Label htmlFor="url">URL to Scan</Label>
            <div className="flex gap-2">
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/contact"
                className="flex-1"
              />
              <Button onClick={fetchAndExtract} disabled={loading || !url}>
                {loading ? "Scanning..." : "Scan"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="html">HTML Input</Label>
            <textarea
              id="html"
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder='<a href="mailto:contact@example.com">Contact Us</a>'
              className="w-full min-h-[150px] p-3 font-mono text-sm rounded-md border border-input"
            />
            <Button onClick={extractFromHtml} disabled={!htmlInput}>
              Extract Emails
            </Button>
          </div>
        )}
      </Card>

      <div className="flex gap-2">
        <Button onClick={mode === "url" ? fetchAndExtract : extractFromHtml} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Extract
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!emails.length}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {error && (
        <Card className="p-4 border-destructive">
          <p className="text-destructive">{error}</p>
        </Card>
      )}

      {emails.length > 0 && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">
              Found {emails.length} email{emails.length !== 1 ? "s" : ""}
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
                    Copy
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            {emails.map((email, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded hover:bg-muted"
              >
                <span className="font-mono">{email}</span>
                <Button variant="ghost" size="sm" asChild>
                  <a href={`mailto:${email}`}>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">How It Works</h3>
        <p className="text-sm text-muted-foreground">
          This tool scans the provided URL or HTML code for email addresses using pattern matching.
          It looks for standard email formats like name@domain.com and extracts unique addresses.
        </p>
      </Card>
    </div>
  );
}
