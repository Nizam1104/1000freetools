"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function DecimalToHexConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [uppercase, setUppercase] = useState(true);
  const [padding, setPadding] = useState(0);
  const [prefix, setPrefix] = useState<"none" | "0x">("none");

  const decimalToHex = (decimal: string) => {
    const num = parseInt(decimal, 10);
    if (isNaN(num)) {
      return "Error: Invalid decimal number";
    }
    
    let hex = num.toString(16);
    if (uppercase) {
      hex = hex.toUpperCase();
    }
    if (padding > 0) {
      hex = hex.padStart(padding, "0");
    }
    if (prefix === "0x") {
      hex = "0x" + hex;
    }
    return hex;
  };

  const handleConvert = () => {
    setOutput(decimalToHex(input));
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
        <h2 className="text-2xl font-bold">Decimal to Hex Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert decimal numbers (base-10) to hexadecimal (base-16)
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-6">
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
            <Label htmlFor="padding" className="text-sm">Padding:</Label>
            <Input
              id="padding"
              type="number"
              min="0"
              value={padding}
              onChange={(e) => setPadding(parseInt(e.target.value) || 0)}
              className="w-20 h-8"
            />
            <span className="text-sm text-muted-foreground">digits</span>
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
          <Label htmlFor="input">Decimal Input</Label>
          <Input
            id="input"
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="255"
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
        <h3 className="font-semibold mb-2">Conversion Examples</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          <div className="bg-muted p-2 rounded">
            <div className="text-muted-foreground">Decimal: 10</div>
            <div className="font-mono">→ 0xA</div>
          </div>
          <div className="bg-muted p-2 rounded">
            <div className="text-muted-foreground">Decimal: 16</div>
            <div className="font-mono">→ 0x10</div>
          </div>
          <div className="bg-muted p-2 rounded">
            <div className="text-muted-foreground">Decimal: 255</div>
            <div className="font-mono">→ 0xFF</div>
          </div>
          <div className="bg-muted p-2 rounded">
            <div className="text-muted-foreground">Decimal: 1000</div>
            <div className="font-mono">→ 0x3E8</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
