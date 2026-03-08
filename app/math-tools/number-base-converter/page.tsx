"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NumberBaseConverter() {
  const [inputValue, setInputValue] = useState("");
  const [fromBase, setFromBase] = useState<"binary" | "octal" | "decimal" | "hex">("decimal");
  const [result, setResult] = useState<{
    binary: string;
    octal: string;
    decimal: number;
    hex: string;
  } | null>(null);
  const [error, setError] = useState("");

  const isValidForBase = (value: string, base: string): boolean => {
    const patterns: Record<string, RegExp> = {
      binary: /^[01]+$/,
      octal: /^[0-7]+$/,
      decimal: /^[0-9]+$/,
      hex: /^[0-9A-Fa-f]+$/,
    };
    return patterns[base].test(value);
  };

  const convertToDecimal = (value: string, base: string): number => {
    return parseInt(value, base === "binary" ? 2 : base === "octal" ? 8 : base === "hex" ? 16 : 10);
  };

  const convert = () => {
    const value = inputValue.trim();

    if (!value) {
      setError("Please enter a number");
      setResult(null);
      return;
    }

    if (!isValidForBase(value, fromBase)) {
      const baseNames: Record<string, string> = { binary: "binary (0-1)", octal: "octal (0-7)", decimal: "decimal (0-9)", hex: "hexadecimal (0-9, A-F)" };
      setError(`Please enter a valid ${baseNames[fromBase]} number`);
      setResult(null);
      return;
    }

    setError("");
    const decimalValue = convertToDecimal(value, fromBase);

    setResult({
      decimal: decimalValue,
      binary: decimalValue.toString(2),
      octal: decimalValue.toString(8),
      hex: decimalValue.toString(16).toUpperCase(),
    });
  };

  const reset = () => {
    setInputValue("");
    setFromBase("decimal");
    setResult(null);
    setError("");
  };

  const baseLabels: Record<string, string> = {
    binary: "Binary (Base 2)",
    octal: "Octal (Base 8)",
    decimal: "Decimal (Base 10)",
    hex: "Hexadecimal (Base 16)",
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Number Base Converter – Binary, Octal, Decimal, Hex Converter</h1>
        <p className="text-muted-foreground">
          Convert numbers between binary, octal, decimal, and hexadecimal bases instantly with our free online number base converter. Perfect for computer science students and programmers.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>From Base</Label>
            <Select value={fromBase} onValueChange={(v) => setFromBase(v as typeof fromBase)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="binary">Binary (Base 2)</SelectItem>
                <SelectItem value="octal">Octal (Base 8)</SelectItem>
                <SelectItem value="decimal">Decimal (Base 10)</SelectItem>
                <SelectItem value="hex">Hexadecimal (Base 16)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Number</Label>
            <Input
              type="text"
              placeholder={fromBase === "hex" ? "e.g., 1A3F" : fromBase === "binary" ? "e.g., 1010" : `e.g., ${fromBase === "decimal" ? "123" : "177"}`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={convert}>Convert</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Binary (Base 2)</p>
                <p className="text-2xl font-bold font-mono">{result.binary}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Octal (Base 8)</p>
                <p className="text-2xl font-bold font-mono">{result.octal}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Decimal (Base 10)</p>
                <p className="text-2xl font-bold font-mono">{result.decimal}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Hexadecimal (Base 16)</p>
                <p className="text-2xl font-bold font-mono">{result.hex}</p>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
