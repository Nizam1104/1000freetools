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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Number Bases</h2>
        <p className="text-muted-foreground">
          Different number systems use different bases – the number of unique digits they use. Computers use binary (base 2), while humans typically use decimal (base 10).
        </p>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Binary (Base 2)</h3>
            <p className="text-xs text-muted-foreground mb-2">Digits: 0, 1</p>
            <p className="text-xs text-muted-foreground">Used in computers and digital electronics. Each digit is a bit.</p>
            <p className="text-xs font-mono mt-2">1010₂ = 10₁₀</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Octal (Base 8)</h3>
            <p className="text-xs text-muted-foreground mb-2">Digits: 0-7</p>
            <p className="text-xs text-muted-foreground">Used in Unix file permissions. Each octal digit = 3 binary bits.</p>
            <p className="text-xs font-mono mt-2">17₈ = 15₁₀</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Decimal (Base 10)</h3>
            <p className="text-xs text-muted-foreground mb-2">Digits: 0-9</p>
            <p className="text-xs text-muted-foreground">Our everyday number system. Likely based on having 10 fingers.</p>
            <p className="text-xs font-mono mt-2">123₁₀ = 123</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Hexadecimal (Base 16)</h3>
            <p className="text-xs text-muted-foreground mb-2">Digits: 0-9, A-F</p>
            <p className="text-xs text-muted-foreground">Used in programming for memory addresses and colors. Each hex digit = 4 binary bits.</p>
            <p className="text-xs font-mono mt-2">FF₁₆ = 255₁₀</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Conversion Examples</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">Decimal 255 to other bases</p>
            <p className="text-sm font-mono">Binary: 11111111 | Octal: 377 | Hex: FF</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">Binary 1010 to other bases</p>
            <p className="text-sm font-mono">Decimal: 10 | Octal: 12 | Hex: A</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">Hex 1A3 to other bases</p>
            <p className="text-sm font-mono">Decimal: 419 | Binary: 110100011 | Octal: 643</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">Octal 755 to other bases</p>
            <p className="text-sm font-mono">Decimal: 493 | Binary: 111101101 | Hex: 1ED</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Common Conversions Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Decimal</th>
                <th className="text-left p-2">Binary</th>
                <th className="text-left p-2">Octal</th>
                <th className="text-left p-2">Hex</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 16, 32, 64, 100, 255].map((num) => (
                <tr key={num} className="border-b">
                  <td className="p-2 font-mono">{num}</td>
                  <td className="p-2 font-mono">{num.toString(2)}</td>
                  <td className="p-2 font-mono">{num.toString(8)}</td>
                  <td className="p-2 font-mono">{num.toString(16).toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">Why do computers use binary?</h3>
          <p className="text-sm text-muted-foreground">
            Computers use binary because electronic circuits have two stable states: on (1) and off (0). Binary is reliable and easy to implement in hardware.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is hexadecimal used for?</h3>
          <p className="text-sm text-muted-foreground">
            Hexadecimal is used for memory addresses, color codes in web design (#FF0000 for red), and representing binary data in a more compact, readable form.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How do you convert binary to decimal?</h3>
          <p className="text-sm text-muted-foreground">
            Multiply each bit by 2 raised to its position (from right, starting at 0), then sum. Example: 1011 = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What does 0x mean in programming?</h3>
          <p className="text-sm text-muted-foreground">
            The prefix "0x" indicates a hexadecimal number. For example, 0xFF means FF in hex, which equals 255 in decimal.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/scientific-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Scientific Calculator</p>
            <p className="text-xs text-muted-foreground">Advanced calculations</p>
          </a>
          <a href="/math-tools/fibonacci-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Fibonacci Generator</p>
            <p className="text-xs text-muted-foreground">Generate sequences</p>
          </a>
          <a href="/math-tools/prime-number-checker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Prime Number Checker</p>
            <p className="text-xs text-muted-foreground">Test if prime</p>
          </a>
        </div>
      </section>
    </div>
  );
}
