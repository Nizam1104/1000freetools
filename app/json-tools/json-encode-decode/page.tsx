"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  FileJson,
  RotateCcw,
  Trash2,
  Copy,
  Download,
  ArrowRightLeft,
} from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JsonEditor } from "@/components/ui/json-editor";

export default function JsonEncodeDecodePage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const encodeJson = useCallback((str: string): string => {
    return encodeURIComponent(str);
  }, []);

  const decodeJson = useCallback((str: string): string => {
    return decodeURIComponent(str);
  }, []);

  const processJson = useCallback(() => {
    setResult(null);

    if (!input.trim()) {
      toast.error("Please enter text to process");
      return;
    }

    try {
      const output = mode === "encode" ? encodeJson(input) : decodeJson(input);
      setResult(output);
      toast.success(`Text ${mode}d successfully`);
    } catch (e) {
      toast.error(`Error: ${(e as Error).message}`);
    }
  }, [input, mode, encodeJson, decodeJson]);

  const clearAll = () => {
    setInput("");
    setResult(null);
  };

  const loadSample = () => {
    if (mode === "encode") {
      setInput(JSON.stringify({ name: "John", city: "NYC" }));
    } else {
      setInput("%7B%22name%22%3A%22John%22%2C%22city%22%3A%22NYC%22%7D");
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
      a.download = mode === "encode" ? "encoded.txt" : "decoded.txt";
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Encode & Decode Tool Online
          </h1>
          <p className="text-muted-foreground">
            Safely encode and decode JSON strings for transport or storage. Our
            free JSON Encode Decode Tool handles special characters and ensures
            your data survives serialization correctly.
          </p>
        </div>

        {/* Mode Tabs */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <Tabs
              value={mode}
              onValueChange={(v) => setMode(v as "encode" | "decode")}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <TabsList>
                  <TabsTrigger value="encode">Encode</TabsTrigger>
                  <TabsTrigger value="decode">Decode</TabsTrigger>
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadResult}
                    >
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
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <Label
                htmlFor="input"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Input
              </Label>
              <JsonEditor
                value={input}
                onChange={setInput}
                placeholder={
                  mode === "encode"
                    ? "Enter JSON to encode..."
                    : "Enter encoded text..."
                }
              />
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardContent className="p-4">
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Output ({mode === "encode" ? "Encoded" : "Decoded"})
                </Label>
                <JsonEditor
                  value={result}
                  readOnly
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON Encode & Decode Tool
          </h2>
          <p className="text-muted-foreground mb-6">
            JSON data often needs to be encoded for safe transmission in URLs or
            query parameters. This tool encodes JSON strings using URI encoding
            or decodes them back to readable format, handling special characters
            correctly.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Choose Encode or Decode mode using the tabs. Paste your input and
            click the process button. Encoding converts special characters to
            percent-encoded format, while decoding reverses the process.
          </p>
          <p className="text-muted-foreground mb-8">
            The Swap button lets you quickly switch between modes and moves the
            output to input for round-trip testing. Results can be copied or
            downloaded as text files.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You need to pass JSON data in a URL query parameter or store it in a
            place that requires encoding. Encode it here first to ensure special
            characters don't break your URL.
          </p>
          <p className="text-muted-foreground mb-8">
            This uses standard URI encoding (encodeURIComponent), not base64.
            For base64 encoding, you'd need a different tool. URI encoding is
            safer for URLs but produces longer output.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">What encoding method is used?</p>
              <p className="text-muted-foreground">
                The tool uses encodeURIComponent, which percent-encodes special
                characters. This is standard for URL-safe encoding.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">When should I encode JSON?</p>
              <p className="text-muted-foreground">
                Encode JSON when including it in URLs, query parameters, or HTML
                attributes where special characters could cause parsing issues.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I decode any encoded string?
              </p>
              <p className="text-muted-foreground">
                Only strings encoded with encodeURIComponent can be decoded.
                Base64 or other encoding formats require different tools.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Does encoding change the data?</p>
              <p className="text-muted-foreground">
                No, encoding is reversible. Decoding the encoded output gives
                you back the exact original JSON string.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Why is encoded JSON so long?</p>
              <p className="text-muted-foreground">
                Percent encoding expands each special character to three
                characters (like %7B for &#123;). This is normal and ensures
                safe transmission.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-escape-unescape"
                className="text-primary hover:underline"
              >
                JSON Escape & Unescape
              </a>{" "}
              – Escape special characters
            </li>
            <li>
              <a
                href="/json-tools/json-url-encoder"
                className="text-primary hover:underline"
              >
                JSON URL Encoder
              </a>{" "}
              – Encode for URLs
            </li>
            <li>
              <a
                href="/json-tools/json-base64"
                className="text-primary hover:underline"
              >
                JSON Base64
              </a>{" "}
              – Base64 encode/decode JSON
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
