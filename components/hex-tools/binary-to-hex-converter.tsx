"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function BinaryToHexConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [uppercase, setUppercase] = useState(true);
  const [prefix, setPrefix] = useState<"none" | "0x">("none");

  const binaryToHex = (binary: string) => {
    const cleanBinary = binary.replace(/[^01]/g, "");
    
    if (cleanBinary.length === 0) {
      return "";
    }
    
    // Pad to multiple of 4
    const paddedLength = Math.ceil(cleanBinary.length / 4) * 4;
    const paddedBinary = cleanBinary.padStart(paddedLength, "0");
    
    let hex = "";
    for (let i = 0; i < paddedBinary.length; i += 4) {
      const nibble = paddedBinary.substr(i, 4);
      const hexDigit = parseInt(nibble, 2).toString(16);
      hex += uppercase ? hexDigit.toUpperCase() : hexDigit;
    }
    
    if (prefix === "0x") {
      hex = "0x" + hex;
    }
    return hex;
  };

  const handleConvert = () => {
    setOutput(binaryToHex(input));
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
        <h2 className="text-2xl font-bold">Binary to Hex Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert binary strings to hexadecimal
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="uppercase"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="uppercase" className="text-sm">Uppercase (A-F)</Label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="noPrefix"
              checked={prefix === "none"}
              onChange={() => setPrefix("none")}
              className="h-4 w-4"
            />
            <Label htmlFor="noPrefix" className="text-sm">No prefix</Label>
            <input
              type="radio"
              id="hexPrefix"
              checked={prefix === "0x"}
              onChange={() => setPrefix("0x")}
              className="h-4 w-4 ml-2"
            />
            <Label htmlFor="hexPrefix" className="text-sm">0x prefix</Label>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="input">Binary Input</Label>
          <Input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="11010011"
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
          <Label htmlFor="output">Hexadecimal Output</Label>
          <Input
            id="output"
            value={output}
            readOnly
            placeholder="D3"
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
        <h3 className="font-semibold mb-2">How Binary to Hex Works</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Group binary digits into sets of 4 (nibbles), then convert each group to its hex equivalent.
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-sm">
          {Array.from({ length: 16 }, (_, i) => {
            const binary = i.toString(2).padStart(4, "0");
            const hex = i.toString(16).toUpperCase();
            return (
              <div key={i} className="bg-muted p-2 rounded text-center">
                <div className="font-mono font-bold">{binary}</div>
                <div className="text-muted-foreground font-mono">→ {hex}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
