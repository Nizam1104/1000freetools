"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download, ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Encode & Decode Tool Online</h1>
          <p className="text-muted-foreground">
            Safely encode and decode JSON strings for transport or storage. Our free JSON Encode Decode Tool handles special characters and ensures your data survives serialization correctly.
          </p>
        </div>

        {/* Mode Tabs */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <Tabs value={mode} onValueChange={(v) => setMode(v as "encode" | "decode")}>
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
                placeholder={mode === "encode" ? "Enter JSON to encode..." : "Enter encoded text..."}
                className="min-h-[200px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardContent className="p-4">
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Output ({mode === "encode" ? "Encoded" : "Decoded"})
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
