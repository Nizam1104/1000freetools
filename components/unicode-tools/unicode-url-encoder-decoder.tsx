"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UnicodeUrlEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [spaceAsPlus, setSpaceAsPlus] = useState(false);

  const encode = (text: string, spacePlus: boolean) => {
    if (spacePlus) {
      return encodeURIComponent(text).replace(/%20/g, "+");
    }
    return encodeURIComponent(text);
  };

  const decode = (text: string) => {
    try {
      // Replace + with %20 for proper decoding
      const normalized = text.replace(/\+/g, "%20");
      return decodeURIComponent(normalized);
    } catch (e) {
      return "Error: Invalid percent-encoded string";
    }
  };

  const handleConvert = () => {
    if (!input) return;

    if (mode === "encode") {
      setOutput(encode(input, spaceAsPlus));
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
        <h2 className="text-2xl font-bold">Unicode URL Encoder/Decoder</h2>
        <p className="text-sm text-muted-foreground">
          Encode text to percent-encoded UTF-8 for URLs and decode back
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
                id="spaceAsPlus"
                checked={spaceAsPlus}
                onChange={(e) => setSpaceAsPlus(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="spaceAsPlus" className="text-sm">
                Encode spaces as + (application/x-www-form-urlencoded)
              </Label>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="input">
              {mode === "encode" ? "Text to Encode" : "Percent-Encoded Text"}
            </Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Hello World 世界" : "Hello%20World%20%E4%B8%96%E7%95%8C"}
              className="w-full min-h-[100px] p-3 font-mono text-sm rounded-md border border-input"
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
              <Label className="text-sm text-muted-foreground">Output</Label>
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
        <h3 className="font-semibold mb-2">Examples</h3>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">Simple Text</div>
            <div className="font-mono">Hello World → Hello%20World</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">Unicode Characters</div>
            <div className="font-mono">世界 → %E4%B8%96%E7%95%8C</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">Special Characters</div>
            <div className="font-mono">a&b=c → a%26b%3Dc</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">Emoji</div>
            <div className="font-mono">😀 → %F0%9F%98%80</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
