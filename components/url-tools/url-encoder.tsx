"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encodeFull" | "encodeComponent" | "encodeURI">("encodeFull");

  const encodeFull = (text: string) => {
    return encodeURIComponent(text);
  };

  const encodeComponent = (text: string) => {
    // Encode but preserve some safe characters
    return text.replace(/[^-_.!~*'()a-zA-Z0-9;/?:@&=+$,\[\]]/g, (c) => {
      return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    });
  };

  const encodeUri = (text: string) => {
    return encodeURI(text);
  };

  const handleConvert = () => {
    if (!input) return;
    
    switch (mode) {
      case "encodeFull":
        setOutput(encodeFull(input));
        break;
      case "encodeComponent":
        setOutput(encodeComponent(input));
        break;
      case "encodeURI":
        setOutput(encodeUri(input));
        break;
    }
  };

  const handleCopy = async () => {
    if (output) {
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
        <h2 className="text-2xl font-bold">URL Encoder</h2>
        <p className="text-sm text-muted-foreground">
          Encode special characters in a URL for internet transmission
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={mode === "encodeFull" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("encodeFull")}
            >
              Full Encode
            </Button>
            <Button
              variant={mode === "encodeComponent" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("encodeComponent")}
            >
              Component
            </Button>
            <Button
              variant={mode === "encodeURI" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("encodeURI")}
            >
              encodeURI
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">Text to Encode</Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hello World! Special chars: <>&"
              className="w-full min-h-[100px] p-3 rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Encode
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
          Encode
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <Label className="text-sm text-muted-foreground">Encoded URL</Label>
              <pre className="font-mono mt-2 whitespace-pre-wrap break-all bg-muted p-3 rounded text-sm">
                {output}
              </pre>
            </div>
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
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Encoding Modes</h3>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">Full Encode (encodeURIComponent)</div>
            <div className="text-muted-foreground">
              Encodes all special characters. Best for encoding query parameter values.
            </div>
            <div className="font-mono text-xs mt-1">"a b" → "a%20b"</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">Component Encode</div>
            <div className="text-muted-foreground">
              Encodes most characters but preserves some safe ones like / and ?.
            </div>
            <div className="font-mono text-xs mt-1">"/path?a=1" → "/path?a=1"</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">encodeURI</div>
            <div className="text-muted-foreground">
              Encodes a full URI but preserves reserved characters like : / ? #.
            </div>
            <div className="font-mono text-xs mt-1">"https://a b.com" → "https://a%20b.com"</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
