"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function Base64EncodeDecode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [urlSafe, setUrlSafe] = useState(false);

  const encode = (text: string, urlSafe: boolean) => {
    try {
      let encoded = btoa(unescape(encodeURIComponent(text)));
      if (urlSafe) {
        encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      }
      return encoded;
    } catch (e) {
      return "Error: Invalid input for encoding";
    }
  };

  const decode = (text: string) => {
    try {
      // Handle URL-safe base64
      let normalized = text.replace(/-/g, "+").replace(/_/g, "/");
      // Add padding if needed
      const padding = normalized.length % 4;
      if (padding > 0) {
        normalized += "=".repeat(4 - padding);
      }
      return decodeURIComponent(escape(atob(normalized)));
    } catch (e) {
      return "Error: Invalid Base64 string";
    }
  };

  const handleConvert = () => {
    if (!input) return;
    
    if (mode === "encode") {
      setOutput(encode(input, urlSafe));
    } else {
      setOutput(decode(input));
    }
  };

  const handleCopy = async () => {
    if (output && !output.startsWith("Error")) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Base64 Encode & Decode</h2>
        <p className="text-sm text-muted-foreground">
          Encode plain text to Base64 and decode Base64 back to text
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={mode === "encode" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("encode")}
            >
              Encode
            </Button>
            <Button
              variant={mode === "decode" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("decode")}
            >
              Decode
            </Button>
          </div>

          {mode === "encode" && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="urlSafe"
                checked={urlSafe}
                onChange={(e) => setUrlSafe(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="urlSafe" className="text-sm">URL-safe Base64 (no + / =)</Label>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="input">
              {mode === "encode" ? "Plain Text" : "Base64 String"}
            </Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Hello World" : "SGVsbG8gV29ybGQ="}
              className="w-full min-h-[150px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              {mode === "encode" ? "Encode" : "Decode"}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleConvert} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          {mode === "encode" ? "Encode" : "Decode"}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <Label className="text-sm text-muted-foreground">
                {mode === "encode" ? "Base64 Output" : "Decoded Text"}
              </Label>
              <pre className={`font-mono mt-2 whitespace-pre-wrap break-all ${output.startsWith("Error") ? "text-destructive" : ""}`}>
                {output}
              </pre>
            </div>
            {!output.startsWith("Error") && (
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
            )}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">About Base64</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Base64 is a binary-to-text encoding scheme that represents binary data 
          in an ASCII string format. It's commonly used for:
        </p>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Embedding images in HTML/CSS</li>
          <li>Email attachments (MIME)</li>
          <li>Data URIs in web development</li>
          <li>Storing complex data in cookies</li>
          <li>Encoding binary data in JSON/XML</li>
        </ul>
      </Card>
    </div>
  );
}
