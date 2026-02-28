"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download, ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "encode" ? "Enter JSON to encode to Base64..." : "Enter Base64 string..."}
                className="min-h-[200px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardContent className="p-4">
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Output
                </Label>
                <Textarea
                  value={result}
                  readOnly
                  className="min-h-[200px] font-mono text-sm resize-none"
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
