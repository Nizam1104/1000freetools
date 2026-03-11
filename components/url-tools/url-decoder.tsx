"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UrlDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"decode" | "encode">("decode");

  const decode = (text: string) => {
    try {
      return decodeURIComponent(text.replace(/\+/g, " "));
    } catch (e) {
      return "Error: Invalid encoded string";
    }
  };

  const encode = (text: string) => {
    return encodeURIComponent(text).replace(/ /g, "+");
  };

  const handleConvert = () => {
    if (!input) return;
    
    if (mode === "decode") {
      setOutput(decode(input));
    } else {
      setOutput(encode(input));
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
        <h2 className="text-2xl font-bold">URL Decoder</h2>
        <p className="text-sm text-muted-foreground">
          Decode percent-encoded URLs back to original text
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={mode === "decode" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("decode")}
            >
              Decode
            </Button>
            <Button
              variant={mode === "encode" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("encode")}
            >
              Encode
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">
              {mode === "decode" ? "Encoded URL" : "Plain Text"}
            </Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "decode" ? "Hello%20World%21" : "Hello World!"}
              className="w-full min-h-[100px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              {mode === "decode" ? "Decode" : "Encode"}
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
          {mode === "decode" ? "Decode" : "Encode"}
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
                {mode === "decode" ? "Decoded Text" : "Encoded URL"}
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
        <h3 className="font-semibold mb-2">Common URL Encodings</h3>
        <div className="grid gap-2 sm:grid-cols-2 text-sm">
          <div className="p-2 bg-muted rounded">
            <div className="font-mono">%20</div>
            <div className="text-muted-foreground">Space</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-mono">%21</div>
            <div className="text-muted-foreground">Exclamation mark (!)</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-mono">%26</div>
            <div className="text-muted-foreground">Ampersand (&amp;)</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-mono">%3D</div>
            <div className="text-muted-foreground">Equals sign (=)</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-mono">%3F</div>
            <div className="text-muted-foreground">Question mark (?)</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-mono">%2F</div>
            <div className="text-muted-foreground">Forward slash (/)</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
