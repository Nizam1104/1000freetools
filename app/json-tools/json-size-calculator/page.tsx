"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  FileJson,
  RotateCcw,
  Trash2,
  HardDrive,
  Copy,
  Check,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { toast } from "sonner";

interface SizeInfo {
  bytes: number;
  kb: number;
  mb: number;
}

export default function JsonSizeCalculatorPage() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState("2");

  const calculateSize = (text: string): SizeInfo => {
    const bytes = new TextEncoder().encode(text).length;
    return {
      bytes,
      kb: bytes / 1024,
      mb: bytes / (1024 * 1024),
    };
  };

  const formatSize = (size: SizeInfo): string => {
    if (size.mb >= 1) {
      return `${size.mb.toFixed(2)} MB`;
    }
    if (size.kb >= 1) {
      return `${size.kb.toFixed(2)} KB`;
    }
    return `${size.bytes} bytes`;
  };

  const sizeInfo = useMemo(() => calculateSize(input), [input]);
  const minifiedSize = useMemo(() => {
    if (!input.trim()) return null;
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      return calculateSize(minified);
    } catch {
      return null;
    }
  }, [input]);

  const formattedSize = useMemo(() => {
    if (!input.trim()) return null;
    try {
      const parsed = JSON.parse(input);
      const indentSize = parseInt(indent, 10);
      const formatted = JSON.stringify(parsed, null, indentSize);
      return calculateSize(formatted);
    } catch {
      return null;
    }
  }, [input, indent]);

  const savings = useMemo(() => {
    if (!minifiedSize || !formattedSize) return null;
    const saved = formattedSize.bytes - minifiedSize.bytes;
    const percentage =
      formattedSize.bytes > 0 ? (saved / formattedSize.bytes) * 100 : 0;
    return { saved, percentage };
  }, [minifiedSize, formattedSize]);

  const minifyJson = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setInput(minified);
      toast.success("JSON minified!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input]);

  const beautifyJson = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const indentSize = parseInt(indent, 10);
      const beautified = JSON.stringify(parsed, null, indentSize);
      setInput(beautified);
      toast.success("JSON beautified!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, indent]);

  const clearAll = () => {
    setInput("");
  };

  const loadSample = () => {
    const sample = {
      users: Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: i % 3 === 0 ? "admin" : "user",
        settings: {
          theme: i % 2 === 0 ? "dark" : "light",
          notifications: true,
          language: "en",
        },
      })),
    };
    setInput(JSON.stringify(sample, null, 2));
  };

  const copySizeReport = async () => {
    if (!input.trim()) return;

    const report = `JSON Size Report
================
Current Size: ${formatSize(sizeInfo)} (${sizeInfo.bytes.toLocaleString()} bytes)
${minifiedSize ? `Minified Size: ${formatSize(minifiedSize)} (${minifiedSize.bytes.toLocaleString()} bytes)` : ""}
${formattedSize ? `Formatted Size: ${formatSize(formattedSize)} (${formattedSize.bytes.toLocaleString()} bytes)` : ""}
${savings ? `Savings: ${savings.saved.toLocaleString()} bytes (${savings.percentage.toFixed(1)}%)` : ""}`;

    await navigator.clipboard.writeText(report);
    setCopied(true);
    toast.success("Size report copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Size Calculator – Check JSON File Size
          </h1>
          <p className="text-muted-foreground">
            Calculate the exact size of your JSON in bytes, KB, and MB. Compare
            minified vs formatted size instantly with our free JSON Size
            Calculator to optimize data transfer.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Sample JSON
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Label
                  htmlFor="indent"
                  className="text-sm text-muted-foreground whitespace-nowrap"
                >
                  Format Indent:
                </Label>
                <select
                  id="indent"
                  value={indent}
                  onChange={(e) => setIndent(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                >
                  <option value="0">Minified</option>
                  <option value="2">2 spaces</option>
                  <option value="4">4 spaces</option>
                  <option value="8">8 spaces</option>
                </select>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={minifyJson}>
                  <Minimize2 className="h-4 w-4 mr-2" />
                  Minify
                </Button>
                <Button variant="outline" size="sm" onClick={beautifyJson}>
                  <Maximize2 className="h-4 w-4 mr-2" />
                  Beautify
                </Button>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Size Cards */}
        {input.trim() && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <HardDrive className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Current Size
                    </p>
                    <p className="text-lg font-semibold">
                      {formatSize(sizeInfo)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {minifiedSize && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-full">
                      <Minimize2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Minified</p>
                      <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                        {formatSize(minifiedSize)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {formattedSize && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                      <Maximize2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Formatted</p>
                      <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        {formatSize(formattedSize)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {savings && savings.saved > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-full">
                      <HardDrive className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Potential Savings
                      </p>
                      <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                        {savings.saved.toLocaleString()} bytes (
                        {savings.percentage.toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="grid gap-6">
          {/* Input */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label
                  htmlFor="input"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Input JSON
                </Label>
                {input.trim() && (
                  <Button variant="ghost" size="sm" onClick={copySizeReport}>
                    {copied ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    {copied ? "Copied" : "Copy Size Report"}
                  </Button>
                )}
              </div>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="min-h-[400px] font-mono text-sm resize-none max-h-[500px] overflow-y-auto"
              />
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>Characters: {input.length.toLocaleString()}</span>
                <span>Lines: {input.split("\n").length.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Size Breakdown */}
          {input.trim() && minifiedSize && formattedSize && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Size Comparison</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-3">
                      <Minimize2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span>Minified JSON</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        {formatSize(minifiedSize)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {minifiedSize.bytes.toLocaleString()} bytes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-3">
                      <Maximize2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span>
                        Formatted JSON (
                        {indent === "0" ? "minified" : `${indent} spaces`})
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600 dark:text-blue-400">
                        {formatSize(formattedSize)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formattedSize.bytes.toLocaleString()} bytes
                      </p>
                    </div>
                  </div>

                  {savings && savings.saved > 0 && (
                    <div className="p-4 bg-primary/10 rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <HardDrive className="h-5 w-5 text-primary" />
                          <span>Size Difference</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">
                            {savings.saved.toLocaleString()} bytes saved
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {savings.percentage.toFixed(1)}% reduction when
                            minified
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON Size Calculator
          </h2>
          <p className="text-muted-foreground mb-6">
            JSON file size affects API response times and bandwidth usage.
            Knowing the exact byte count helps optimize data transfer and
            estimate storage requirements. This JSON Size Calculator shows
            current size, minified size, and potential savings from removing
            whitespace.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your JSON into the input area. The tool instantly displays the
            current size in bytes, KB, or MB. Cards show minified size and
            formatted size side by side so you can compare the impact of
            whitespace.
          </p>
          <p className="text-muted-foreground mb-8">
            Use the Format Indent dropdown to see how different indentation
            levels affect file size. Click Minify to remove all whitespace, or
            Beautify to format with your chosen indent. The Copy Size Report
            button generates a summary you can share.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            API developers optimizing response payloads need to know how much
            size reduction minification provides. Mobile developers working with
            limited bandwidth benefit from understanding the trade-off between
            readable and compact JSON.
          </p>
          <p className="text-muted-foreground mb-8">
            This tool measures raw byte size, not compressed size. In
            production, gzip or brotli compression reduces JSON significantly
            regardless of formatting. Use this calculator for uncompressed
            scenarios like localStorage or database storage.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">How is size calculated?</p>
              <p className="text-muted-foreground">
                Size is measured in bytes using UTF-8 encoding, which accurately
                reflects storage and transfer requirements.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What is the potential savings?</p>
              <p className="text-muted-foreground">
                Savings shows the byte difference between formatted and minified
                JSON, plus the percentage reduction.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Does it count characters or bytes?
              </p>
              <p className="text-muted-foreground">
                Bytes. Multi-byte Unicode characters are counted correctly,
                unlike simple character counts.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I see line and character counts?
              </p>
              <p className="text-muted-foreground">
                Yes. Below the input area, character count and line count are
                displayed for additional context.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Is there a file size limit?</p>
              <p className="text-muted-foreground">
                The tool runs in your browser, so very large files may cause
                slowdowns. Files under 10MB work smoothly.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-minifier"
                className="text-primary hover:underline"
              >
                JSON Minifier
              </a>{" "}
              – Remove whitespace to reduce JSON size
            </li>
            <li>
              <a
                href="/json-tools/json-formatter"
                className="text-primary hover:underline"
              >
                JSON Formatter
              </a>{" "}
              – Beautify JSON with proper indentation
            </li>
            <li>
              <a
                href="/json-tools/json-compressor"
                className="text-primary hover:underline"
              >
                JSON Compressor
              </a>{" "}
              – Estimate gzip compression ratios
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
