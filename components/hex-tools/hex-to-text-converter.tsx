"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function HexToTextConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState<"auto" | "spaces" | "0x">("auto");

  const hexToText = (hex: string) => {
    // Remove spaces, 0x prefixes, and non-hex characters
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, "");
    
    if (cleanHex.length % 2 !== 0) {
      return "Error: Invalid hex string (odd number of characters)";
    }
    
    let result = "";
    for (let i = 0; i < cleanHex.length; i += 2) {
      const charCode = parseInt(cleanHex.substr(i, 2), 16);
      if (isNaN(charCode)) {
        return "Error: Invalid hex characters";
      }
      result += String.fromCharCode(charCode);
    }
    return result;
  };

  const handleConvert = () => {
    setOutput(hexToText(input));
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
        <h2 className="text-2xl font-bold">Hex to Text Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert hexadecimal strings to readable plain text
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <Label>Input Format:</Label>
          <div className="flex gap-2">
            <Button
              variant={format === "auto" ? "default" : "outline"}
              size="sm"
              onClick={() => setFormat("auto")}
            >
              Auto-detect
            </Button>
            <Button
              variant={format === "spaces" ? "default" : "outline"}
              size="sm"
              onClick={() => setFormat("spaces")}
            >
              With Spaces
            </Button>
            <Button
              variant={format === "0x" ? "default" : "outline"}
              size="sm"
              onClick={() => setFormat("0x")}
            >
              0x Prefix
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="input">Hexadecimal Input</Label>
          <Input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="48 65 6C 6C 6F 20 57 6F 72 6C 64"
            className="font-mono"
          />
          <div className="flex gap-2">
            <Button onClick={handleConvert} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Convert
            </Button>
            <Button variant="outline" onClick={handleClear}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="output">Text Output</Label>
          <Input
            id="output"
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="font-mono bg-muted"
          />
          <Button
            variant="outline"
            onClick={handleCopy}
            disabled={!output}
            className="w-full"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Output
              </>
            )}
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-2">How Hex to Text Conversion Works</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Each pair of hexadecimal digits represents one byte (8 bits), which corresponds to one ASCII character.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          <div className="bg-muted p-2 rounded">
            <div className="font-mono">48</div>
            <div className="text-muted-foreground">→ H</div>
          </div>
          <div className="bg-muted p-2 rounded">
            <div className="font-mono">65</div>
            <div className="text-muted-foreground">→ e</div>
          </div>
          <div className="bg-muted p-2 rounded">
            <div className="font-mono">6C</div>
            <div className="text-muted-foreground">→ l</div>
          </div>
          <div className="bg-muted p-2 rounded">
            <div className="font-mono">6C</div>
            <div className="text-muted-foreground">→ l</div>
          </div>
          <div className="bg-muted p-2 rounded">
            <div className="font-mono">6F</div>
            <div className="text-muted-foreground">→ o</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
