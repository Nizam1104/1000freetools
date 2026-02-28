"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download, ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function JsonEscapeUnescapePage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [mode, setMode] = useState<"escape" | "unescape">("escape");

  const escapeJson = useCallback((str: string): string => {
    return str
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")
      .replace(/\f/g, "\\f")
      .replace(/\b/g, "\\b");
  }, []);

  const unescapeJson = useCallback((str: string): string => {
    return str
      .replace(/\\"/g, '"')
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\f/g, "\f")
      .replace(/\\b/g, "\b")
      .replace(/\\\\/g, "\\");
  }, []);

  const processJson = useCallback(() => {
    setResult(null);

    if (!input.trim()) {
      toast.error("Please enter text to process");
      return;
    }

    try {
      const output = mode === "escape" ? escapeJson(input) : unescapeJson(input);
      setResult(output);
      toast.success(`Text ${mode}d successfully`);
    } catch (e) {
      toast.error(`Error: ${(e as Error).message}`);
    }
  }, [input, mode, escapeJson, unescapeJson]);

  const clearAll = () => {
    setInput("");
    setResult(null);
  };

  const loadSample = () => {
    if (mode === "escape") {
      setInput('Hello\nWorld\t"Quoted"\nNew line');
    } else {
      setInput('Hello\\nWorld\\t"Quoted"\\nNew line');
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
      a.download = mode === "escape" ? "escaped.txt" : "unescaped.txt";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Result downloaded");
    }
  };

  const swapMode = () => {
    setMode(mode === "escape" ? "unescape" : "escape");
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Escape & Unescape Tool Online</h1>
          <p className="text-muted-foreground">
            Escape or unescape special characters in JSON strings instantly. Our free JSON Escape Unescape Tool ensures your strings are safe for storage, APIs, and code embedding.
          </p>
        </div>

        {/* Mode Tabs */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <Tabs value={mode} onValueChange={(v) => setMode(v as "escape" | "unescape")}>
              <div className="flex items-center justify-between p-4 border-b">
                <TabsList>
                  <TabsTrigger value="escape">Escape</TabsTrigger>
                  <TabsTrigger value="unescape">Unescape</TabsTrigger>
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
                  {mode === "escape" ? "Escape" : "Unescape"}
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
                placeholder={mode === "escape" ? "Enter text with special characters..." : "Enter escaped text..."}
                className="min-h-[200px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardContent className="p-4">
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Output ({mode === "escape" ? "Escaped" : "Unescaped"})
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

        {/* Info */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold mb-2">
              {mode === "escape" ? "Characters that will be escaped:" : "Characters that will be unescaped:"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {mode === "escape" ? (
                <>
                  <code className="px-2 py-1 bg-muted rounded text-sm">\ → \\</code>
                  <code className="px-2 py-1 bg-muted rounded text-sm">" → \"</code>
                  <code className="px-2 py-1 bg-muted rounded text-sm">newline → \n</code>
                  <code className="px-2 py-1 bg-muted rounded text-sm">tab → \t</code>
                  <code className="px-2 py-1 bg-muted rounded text-sm">return → \r</code>
                </>
              ) : (
                <>
                  <code className="px-2 py-1 bg-muted rounded text-sm">\\ → \</code>
                  <code className="px-2 py-1 bg-muted rounded text-sm">\" → "</code>
                  <code className="px-2 py-1 bg-muted rounded text-sm">\n → newline</code>
                  <code className="px-2 py-1 bg-muted rounded text-sm">\t → tab</code>
                  <code className="px-2 py-1 bg-muted rounded text-sm">\r → return</code>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
