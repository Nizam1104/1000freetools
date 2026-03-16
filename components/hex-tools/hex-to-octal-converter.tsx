"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function HexToOctalConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showSteps, setShowSteps] = useState(false);

  const hexToOctal = (hex: string) => {
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, "");
    
    if (cleanHex.length === 0) {
      return "";
    }
    
    // Hex -> Decimal -> Octal
    const decimal = parseInt(cleanHex, 16);
    if (isNaN(decimal)) {
      return "Error: Invalid hex input";
    }
    
    return decimal.toString(8);
  };

  const getConversionSteps = (hex: string) => {
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, "");
    const decimal = parseInt(cleanHex, 16);
    const octal = decimal.toString(8);
    
    return [
      `Hex: ${cleanHex.toUpperCase()}`,
      `Decimal: ${decimal}`,
      `Octal: ${octal}`,
    ];
  };

  const handleConvert = () => {
    setOutput(hexToOctal(input));
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
        <h2 className="text-2xl font-bold">Hex to Octal Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert hexadecimal numbers to octal (base-8) representation
        </p>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showSteps"
            checked={showSteps}
            onChange={(e) => setShowSteps(e.target.checked)}
            className="h-4 w-4"
          />
          <Label htmlFor="showSteps" className="text-sm">Show conversion steps</Label>
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
          <Label htmlFor="output">Octal Output</Label>
          <Input
            id="output"
            value={output}
            readOnly
            placeholder="15077"
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

      {showSteps && input && output && !output.startsWith("Error") && (
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Conversion Steps</h3>
          <div className="space-y-2 font-mono">
            {getConversionSteps(input).map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-muted-foreground">{i + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Common Hex to Octal Conversions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          {[
            { hex: "0", octal: "0" },
            { hex: "7", octal: "7" },
            { hex: "8", octal: "10" },
            { hex: "F", octal: "17" },
            { hex: "10", octal: "20" },
            { hex: "1F", octal: "37" },
            { hex: "FF", octal: "377" },
            { hex: "100", octal: "400" },
          ].map((item) => (
            <div key={item.hex} className="bg-muted p-2 rounded text-center">
              <div className="font-mono font-bold">{item.hex}</div>
              <div className="text-muted-foreground">→ {item.octal}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
