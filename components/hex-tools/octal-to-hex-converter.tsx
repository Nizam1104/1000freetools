"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function OctalToHexConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [uppercase, setUppercase] = useState(true);
  const [prefix, setPrefix] = useState<"none" | "0x">("none");

  const octalToHex = (octal: string) => {
    const cleanOctal = octal.replace(/[^0-7]/g, "");
    
    if (cleanOctal.length === 0) {
      return "";
    }
    
    const decimal = parseInt(cleanOctal, 8);
    if (isNaN(decimal)) {
      return "Error: Invalid octal input";
    }
    
    let hex = decimal.toString(16);
    if (uppercase) {
      hex = hex.toUpperCase();
    }
    if (prefix === "0x") {
      hex = "0x" + hex;
    }
    return hex;
  };

  const handleConvert = () => {
    setOutput(octalToHex(input));
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
        <h2 className="text-2xl font-bold">Octal to Hex Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert octal numbers (base-8) to hexadecimal (base-16)
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
          <Label htmlFor="input">Octal Input</Label>
          <Input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="377"
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
            placeholder="FF"
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
        <h3 className="font-semibold mb-2">Common Octal to Hex Conversions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          {[
            { octal: "0", hex: "0" },
            { octal: "7", hex: "7" },
            { octal: "10", hex: "8" },
            { octal: "17", hex: "F" },
            { octal: "20", hex: "10" },
            { octal: "37", hex: "1F" },
            { octal: "377", hex: "FF" },
            { octal: "400", hex: "100" },
          ].map((item) => (
            <div key={item.octal} className="bg-muted p-2 rounded text-center">
              <div className="font-mono font-bold">{item.octal}</div>
              <div className="text-muted-foreground">→ {item.hex}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
