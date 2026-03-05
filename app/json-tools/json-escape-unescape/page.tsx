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
import { JsonEditor } from "@/components/utils/json-editor";

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
      const output =
        mode === "escape" ? escapeJson(input) : unescapeJson(input);
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Escape & Unescape Tool Online
          </h1>
          <p className="text-muted-foreground">
            Escape or unescape special characters in JSON strings instantly. Our
            free JSON Escape Unescape Tool ensures your strings are safe for
            storage, APIs, and code embedding.
          </p>
        </div>

        {/* Mode Tabs */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <Tabs
              value={mode}
              onValueChange={(v) => setMode(v as "escape" | "unescape")}
            >
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
                  {mode === "escape" ? "Escape" : "Unescape"}
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
                  mode === "escape"
                    ? "Enter text with special characters..."
                    : "Enter escaped text..."
                }
              />
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardContent className="p-4">
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Output ({mode === "escape" ? "Escaped" : "Unescaped"})
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
            About JSON Escape & Unescape Tool
          </h2>
          <p className="text-muted-foreground mb-6">
            Special characters in strings can break JSON syntax if not properly
            escaped. This tool escapes newlines, quotes, tabs, and other special
            characters for safe JSON embedding, or unescapes them back to
            readable text.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Select Escape or Unescape mode using the tabs. Enter your text and
            click the process button. Escaping converts special characters to
            their backslash sequences, while unescaping reverses the process.
          </p>
          <p className="text-muted-foreground mb-8">
            The info card at the bottom shows which characters will be
            processed. Use the Swap button to quickly toggle between modes and
            test round-trip conversion.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You need to include user-generated text with special characters
            inside a JSON string value. Escape it here first to ensure the JSON
            remains valid and parseable.
          </p>
          <p className="text-muted-foreground mb-8">
            This handles common escape sequences but doesn't validate full JSON
            syntax. For complete JSON validation, use a dedicated JSON validator
            tool alongside this one.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">Which characters are escaped?</p>
              <p className="text-muted-foreground">
                Backslash, double quotes, newlines, tabs, carriage returns, form
                feeds, and backspaces are all escaped with backslash sequences.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                When should I escape JSON strings?
              </p>
              <p className="text-muted-foreground">
                Escape strings before embedding them in JSON, JavaScript code,
                or configuration files where special characters could cause
                syntax errors.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I unescape any escaped string?
              </p>
              <p className="text-muted-foreground">
                Yes, strings escaped by this tool can be unescaped back to the
                original. Invalid escape sequences may cause errors during
                unescaping.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What about Unicode characters?</p>
              <p className="text-muted-foreground">
                This tool handles basic escape sequences. Unicode characters are
                preserved as-is unless they require escaping for JSON
                compatibility.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">How do I download the result?</p>
              <p className="text-muted-foreground">
                Use the Download button to save as a text file, or Copy to paste
                directly into your code or configuration.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-encode-decode"
                className="text-primary hover:underline"
              >
                JSON Encode & Decode
              </a>{" "}
              – URI encode/decode
            </li>
            <li>
              <a
                href="/json-tools/json-validator"
                className="text-primary hover:underline"
              >
                JSON Validator
              </a>{" "}
              – Validate JSON syntax
            </li>
            <li>
              <a
                href="/json-tools/json-stringifier"
                className="text-primary hover:underline"
              >
                JSON Stringifier
              </a>{" "}
              – Convert values to JSON strings
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
