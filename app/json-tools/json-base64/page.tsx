"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download, ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JsonEditor } from "@/components/ui/json-editor";

export default function JsonBase64Page() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const encodeBase64 = useCallback((str: string): string => {
    try {
      if (typeof window !== "undefined") {
        return btoa(unescape(encodeURIComponent(str)));
      }
      return Buffer.from(str, "utf-8").toString("base64");
    } catch (e) {
      throw new Error("Failed to encode to Base64");
    }
  }, []);

  const decodeBase64 = useCallback((str: string): string => {
    try {
      if (typeof window !== "undefined") {
        return decodeURIComponent(escape(atob(str)));
      }
      return Buffer.from(str, "base64").toString("utf-8");
    } catch (e) {
      throw new Error("Invalid Base64 string");
    }
  }, []);

  const processJson = useCallback(() => {
    setResult(null);

    if (!input.trim()) {
      toast.error("Please enter text to process");
      return;
    }

    try {
      const output = mode === "encode" ? encodeBase64(input) : decodeBase64(input);
      setResult(output);
      toast.success(`Text ${mode}d successfully`);
    } catch (e) {
      toast.error(`Error: ${(e as Error).message}`);
    }
  }, [input, mode, encodeBase64, decodeBase64]);

  const clearAll = () => {
    setInput("");
    setResult(null);
  };

  const loadSample = () => {
    if (mode === "encode") {
      setInput(JSON.stringify({ name: "John", secret: "password123" }, null, 2));
    } else {
      setInput("eyJuYW1lIjoiSm9obiIsInNlY3JldCI6InBhc3N3b3JkMTIzIn0=");
    }
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Result copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = mode === "encode" ? "base64.txt" : "decoded.txt";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Result downloaded");
    }
  };

  const swapMode = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    if (result) {
      setInput(result);
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Base64 Encoder & Decoder Online</h1>
          <p className="text-muted-foreground">
            Encode JSON to Base64 or decode Base64 strings back to JSON instantly. Our free tool is essential for handling JWT tokens, API payloads, and data transport encoding.
          </p>
        </div>

        {/* Why Base64 */}
        <div className="mb-6">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-lg font-semibold mb-2">Why Encode JSON to Base64?</h2>
            <p className="text-muted-foreground mb-4">
              You need to send JSON in a URL parameter or store it in a place that doesn't handle special characters well. Base64 encoding converts your JSON to a safe ASCII string. Decoding it back should give you the original JSON.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">URL parameters</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">JWT tokens</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Email bodies</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Data storage</span>
            </div>
          </div>
        </div>

        {/* Quick Steps */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">E</span>
                Encoding
              </h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. Paste your JSON to encode</li>
                <li>2. Select encode operation</li>
                <li>3. Get Base64 string output</li>
              </ol>
            </CardContent>
          </Card>
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">D</span>
                Decoding
              </h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. Paste Base64 string</li>
                <li>2. Select decode operation</li>
                <li>3. Get readable JSON output</li>
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Mode Tabs */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <Tabs value={mode} onValueChange={(v) => setMode(v as "encode" | "decode")}>
              <div className="flex items-center justify-between p-4 border-b">
                <TabsList>
                  <TabsTrigger value="encode">Encode to Base64</TabsTrigger>
                  <TabsTrigger value="decode">Decode from Base64</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm" onClick={swapMode}>
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  Swap
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Load Sample
                </Button>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {result && (
                  <>
                    <Button variant="outline" size="sm" onClick={copyResult}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadResult}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </>
                )}
                <Button onClick={processJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {mode === "encode" ? "Encode" : "Decode"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input/Output */}
        <div className="grid gap-6">
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
                Input
              </Label>
              <JsonEditor
                value={input}
                onChange={setInput}
                placeholder={mode === "encode" ? "Enter JSON to encode to Base64..." : "Enter Base64 string..."}
              />
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardContent className="p-4">
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Output
                </Label>
                <JsonEditor
                  value={result}
                  readOnly
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON Base64 Encoder/Decoder</h2>
        <p className="text-muted-foreground mb-6">
          Base64 encoding is commonly used to embed binary data in JSON or transmit JSON in URL-safe formats. This tool encodes JSON to Base64 strings and decodes Base64 back to readable JSON. It runs entirely in your browser for privacy.
        </p>

        <h3 className="text-xl font-semibold mb-3">How encoding and decoding works</h3>
        <p className="text-muted-foreground mb-2">
          For encoding, paste your JSON and click Encode. The tool converts your JSON string to Base64 format. For decoding, paste a Base64 string and click Decode. The tool converts it back and validates the result is valid JSON.
        </p>
        <p className="text-muted-foreground mb-8">
          Base64 expands data size by about 33 percent. The encoded output uses standard Base64 characters. Use Copy to grab the result or swap between encode and decode modes with the Swap button.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You need to embed JSON in a URL parameter or HTML attribute. Or your API requires Base64-encoded payloads. This tool also helps when debugging Base64-encoded tokens or config strings.
        </p>
        <p className="text-muted-foreground mb-8">
          Base64 is encoding, not encryption. Anyone can decode the output. Don't use it for sensitive data. For secure transmission, use proper encryption instead.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">What is Base64 encoding?</p>
            <p className="text-muted-foreground">Base64 converts binary data to ASCII text using 64 characters. It's used to safely transmit data in text-only contexts like URLs or email.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Does Base64 make data smaller?</p>
            <p className="text-muted-foreground">No, Base64 increases size by about 33 percent. It's for compatibility, not compression. Use gzip for size reduction.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Is Base64 secure?</p>
            <p className="text-muted-foreground">No, Base64 is easily reversible. It's not encryption. Use HTTPS and proper encryption for sensitive data.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I decode invalid Base64?</p>
            <p className="text-muted-foreground">Invalid Base64 will fail to decode. Make sure your input uses valid Base64 characters and proper padding.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What about URL-safe Base64?</p>
            <p className="text-muted-foreground">This tool uses standard Base64. For URL-safe variants with different characters, you may need a specialized tool.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a href="/json-tools/json-escape-unescape" className="text-primary hover:underline">JSON Escape/Unescape</a> – Escape special characters in JSON strings
          </li>
          <li>
            <a href="/json-tools/json-stringify-parse" className="text-primary hover:underline">JSON Stringify/Parse</a> – Convert between JSON objects and strings
          </li>
          <li>
            <a href="/json-tools/json-jwt-decoder" className="text-primary hover:underline">JSON JWT Decoder</a> – Decode and inspect JWT tokens
          </li>
        </ul>
      </div>
    </div>
  );
}
