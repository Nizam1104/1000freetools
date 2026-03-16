"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function HexToUtf8StringDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showInvalid, setShowInvalid] = useState(false);

  const hexToUtf8 = (hex: string) => {
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, "");
    
    if (cleanHex.length % 2 !== 0) {
      return "Error: Invalid hex string (odd length)";
    }
    
    try {
      const bytes = new Uint8Array(cleanHex.length / 2);
      for (let i = 0; i < cleanHex.length; i += 2) {
        bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
      }
      
      const decoder = new TextDecoder("utf-8");
      const decoded = decoder.decode(bytes);
      
      // Check for replacement character (invalid UTF-8)
      if (decoded.includes("") && showInvalid) {
        return decoded + " (contains invalid UTF-8 sequences)";
      }
      
      return decoded;
    } catch (e) {
      return "Error: Invalid UTF-8 sequence";
    }
  };

  const utf8ToHex = (text: string) => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0").toUpperCase())
      .join("");
  };

  const handleConvert = () => {
    setOutput(hexToUtf8(input));
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
        <h2 className="text-2xl font-bold">Hex to UTF-8 String Decoder</h2>
        <p className="text-sm text-muted-foreground">
          Decode hexadecimal data into UTF-8 encoded text
        </p>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showInvalid"
            checked={showInvalid}
            onChange={(e) => setShowInvalid(e.target.checked)}
            className="h-4 w-4"
          />
          <Label htmlFor="showInvalid" className="text-sm">Show invalid UTF-8 sequences</Label>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="input">Hexadecimal Input</Label>
          <Input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="48656C6C6F20576F726C64"
            className="font-mono"
          />
          <div className="flex gap-2">
            <Button onClick={handleConvert} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Decode
            </Button>
            <Button variant="outline" onClick={handleClear}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="output">UTF-8 Text Output</Label>
          <Input
            id="output"
            value={output}
            readOnly
            placeholder="Hello World"
            className="font-mono bg-muted"
          />
          <Button
            variant="outline"
            onClick={handleCopy}
            disabled={!output || output.startsWith("Error")}
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
        <h3 className="font-semibold mb-2">UTF-8 Encoding Examples</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div className="text-muted-foreground">ASCII</div>
            <div>48656C6C6F → Hello</div>
          </div>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div className="text-muted-foreground">Emoji</div>
            <div>F09F9880 → 😀</div>
          </div>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div className="text-muted-foreground">Chinese</div>
            <div>E4B896E7958C → 世界</div>
          </div>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div className="text-muted-foreground">Arabic</div>
            <div>D8A7D984D8B9D8B1D8A8D98AD8A9 → العربية</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
