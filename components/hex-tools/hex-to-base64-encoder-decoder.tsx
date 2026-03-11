"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function HexToBase64EncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [urlSafe, setUrlSafe] = useState(false);

  const hexToBase64 = (hex: string, urlSafe: boolean) => {
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, "");
    
    if (cleanHex.length % 2 !== 0) {
      return "Error: Invalid hex string (odd length)";
    }
    
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
      bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
    }
    
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    
    let base64 = btoa(binary);
    
    if (urlSafe) {
      base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
    
    return base64;
  };

  const base64ToHex = (base64: string) => {
    try {
      let cleanBase64 = base64.replace(/[^A-Za-z0-9+/=]/g, "");
      
      // Handle URL-safe base64
      cleanBase64 = cleanBase64.replace(/-/g, "+").replace(/_/g, "/");
      
      // Add padding if needed
      const padding = cleanBase64.length % 4;
      if (padding > 0) {
        cleanBase64 += "=".repeat(4 - padding);
      }
      
      const binary = atob(cleanBase64);
      let hex = "";
      for (let i = 0; i < binary.length; i++) {
        const byte = binary.charCodeAt(i).toString(16).padStart(2, "0");
        hex += byte;
      }
      return hex.toUpperCase();
    } catch (e) {
      return "Error: Invalid Base64 input";
    }
  };

  const handleConvert = () => {
    if (mode === "encode") {
      setOutput(hexToBase64(input, urlSafe));
    } else {
      setOutput(base64ToHex(input));
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
        <h2 className="text-2xl font-bold">Hex to Base64 Encoder/Decoder</h2>
        <p className="text-sm text-muted-foreground">
          Encode hexadecimal strings to Base64 and decode Base64 to hex
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-2">
            <Button
              variant={mode === "encode" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("encode")}
            >
              Hex → Base64
            </Button>
            <Button
              variant={mode === "decode" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("decode")}
            >
              Base64 → Hex
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
              <Label htmlFor="urlSafe" className="text-sm">URL-safe Base64</Label>
            </div>
          )}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="input">
            {mode === "encode" ? "Hexadecimal Input" : "Base64 Input"}
          </Label>
          <Input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "48656C6C6F" : "SGVsbG8="}
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
          <Label htmlFor="output">
            {mode === "encode" ? "Base64 Output" : "Hexadecimal Output"}
          </Label>
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
        <h3 className="font-semibold mb-2">Examples</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div className="text-muted-foreground">Hex → Base64</div>
            <div>48656C6C6F → SGVsbG8=</div>
          </div>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div className="text-muted-foreground">Base64 → Hex</div>
            <div>SGVsbG8= → 48656C6C6F</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
