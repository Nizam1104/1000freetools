"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function HexStringValidatorFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [delimiter, setDelimiter] = useState<"none" | "space" | "colon" | "dash">("none");
  const [lineLength, setLineLength] = useState(0);
  const [caseType, setCaseType] = useState<"upper" | "lower">("upper");

  const validateAndFormat = (hex: string) => {
    const cleanHex = hex.replace(/[^0-9a-fA-FxX]/g, "");
    
    // Check if valid hex
    const isValid = /^[0-9a-fA-F]+$/.test(cleanHex);
    
    if (!isValid) {
      return { valid: false, formatted: "Invalid hexadecimal string" };
    }
    
    let formatted = caseType === "upper" 
      ? cleanHex.toUpperCase() 
      : cleanHex.toLowerCase();
    
    // Apply delimiter
    if (delimiter !== "none" && formatted.length >= 2) {
      const delim = delimiter === "space" ? " " : delimiter === "colon" ? ":" : "-";
      const pairs = formatted.match(/.{1,2}/g) || [];
      formatted = pairs.join(delim);
    }
    
    // Apply line breaks
    if (lineLength > 0) {
      const charsPerLine = delimiter !== "none" 
        ? lineLength * 3 - 1 
        : lineLength;
      const lines = [];
      for (let i = 0; i < formatted.length; i += charsPerLine) {
        lines.push(formatted.substr(i, charsPerLine));
      }
      formatted = lines.join("\n");
    }
    
    return { valid: true, formatted, length: cleanHex.length, bytes: cleanHex.length / 2 };
  };

  const handleFormat = () => {
    const result = validateAndFormat(input);
    if (result.valid) {
      setOutput(result.formatted);
    } else {
      setOutput(result.formatted);
    }
  };

  const handleCopy = async () => {
    if (output && output !== "Invalid hexadecimal string") {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const [copied, setCopied] = useState(false);
  const result = input ? validateAndFormat(input) : null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Hex String Validator & Formatter</h2>
        <p className="text-sm text-muted-foreground">
          Validate and format hexadecimal strings
        </p>
      </div>

      <Card className="p-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label>Delimiter</Label>
            <div className="flex gap-2">
              {(["none", "space", "colon", "dash"] as const).map((d) => (
                <Button
                  key={d}
                  variant={delimiter === d ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDelimiter(d)}
                >
                  {d === "none" ? "None" : d === "space" ? "Space" : d === "colon" ? ":" : "-"}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Case</Label>
            <div className="flex gap-2">
              <Button
                variant={caseType === "upper" ? "default" : "outline"}
                size="sm"
                onClick={() => setCaseType("upper")}
              >
                ABC
              </Button>
              <Button
                variant={caseType === "lower" ? "default" : "outline"}
                size="sm"
                onClick={() => setCaseType("lower")}
              >
                abc
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lineLength">Bytes per line (0 = no wrap)</Label>
            <Input
              id="lineLength"
              type="number"
              min="0"
              value={lineLength}
              onChange={(e) => setLineLength(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="input">Hex Input</Label>
          <Input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="1A2B3C4D5E6F"
            className="font-mono"
          />
          <div className="flex gap-2">
            <Button onClick={handleFormat} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Format
            </Button>
            <Button variant="outline" onClick={handleClear}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="output">Formatted Output</Label>
          <textarea
            id="output"
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="w-full min-h-[100px] p-3 font-mono bg-muted rounded-md border border-input resize-none"
          />
          <Button
            variant="outline"
            onClick={handleCopy}
            disabled={!output || output === "Invalid hexadecimal string"}
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

      {result && result.valid && (
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Validation Result</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Valid</div>
              <div className="text-green-600 font-semibold">✓ Yes</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Hex Length</div>
              <div className="font-mono">{result.length} characters</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Bytes</div>
              <div className="font-mono">{result.bytes ?? 0}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Bits</div>
              <div className="font-mono">{(result.bytes ?? 0) * 8}</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
