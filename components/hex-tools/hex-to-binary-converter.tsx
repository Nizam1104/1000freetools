"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function HexToBinaryConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [spaced, setSpaced] = useState(true);
  const [uppercase, setUppercase] = useState(false);

  const hexToBinary = (hex: string, spaced: boolean) => {
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, "");
    
    if (cleanHex.length === 0) {
      return "";
    }
    
    let result = "";
    for (let i = 0; i < cleanHex.length; i++) {
      const nibble = parseInt(cleanHex[i], 16);
      if (isNaN(nibble)) {
        return "Error: Invalid hex character";
      }
      const binary = nibble.toString(2).padStart(4, "0");
      if (spaced && i > 0) {
        result += " ";
      }
      result += binary;
    }
    return result;
  };

  const handleConvert = () => {
    setOutput(hexToBinary(input, spaced));
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
        <h2 className="text-2xl font-bold">Hex to Binary Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert hexadecimal digits to their 4-bit binary equivalents
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="spaced"
              checked={spaced}
              onChange={(e) => setSpaced(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="spaced" className="text-sm">Space-separated nibbles</Label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="uppercase"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="uppercase" className="text-sm">Uppercase hex output</Label>
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
            placeholder="1A3F"
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
          <Label htmlFor="output">Binary Output</Label>
          <Input
            id="output"
            value={output}
            readOnly
            placeholder="0001 1010 0011 1111"
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
        <h3 className="font-semibold mb-2">Hex to Binary Reference</h3>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-sm">
          {Array.from({ length: 16 }, (_, i) => {
            const hex = i.toString(16).toUpperCase();
            const binary = i.toString(2).padStart(4, "0");
            return (
              <div key={i} className="bg-muted p-2 rounded text-center">
                <div className="font-mono font-bold">{hex}</div>
                <div className="text-muted-foreground font-mono">{binary}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
