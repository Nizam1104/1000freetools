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

  const examples = [
    { name: "Decimal 42", from: "decimal" as const, value: "42" },
    { name: "Binary 101010", from: "binary" as const, value: "101010" },
    { name: "Hex DEAD", from: "hex" as const, value: "DEAD" },
    { name: "Octal 777", from: "octal" as const, value: "777" },
    { name: "Large Decimal", from: "decimal" as const, value: "65535" },
    { name: "Binary Byte", from: "binary" as const, value: "11111111" },
    { name: "Hex Color", from: "hex" as const, value: "FF5733" }
  ];

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

  const loadExample = (index: number) => {
    const ex = examples[index];
    setFromBase(ex.from);
    setInputValue(ex.value);
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

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Examples:</span>
            {examples.map((ex, idx) => (
              <Button key={idx} variant="outline" size="sm" onClick={() => loadExample(idx)}>{ex.name}</Button>
            ))}
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Number Bases</h2>
        <p className="text-muted-foreground">
          A number base (or radix) determines how many unique digits are used to represent numbers. Our everyday decimal system uses base 10 (digits 0-9). Computers use binary (base 2) because electronic circuits have two states: on and off. Programmers often use hexadecimal (base 16) as a compact way to represent binary data.
        </p>
        <p className="text-muted-foreground">
          The position of each digit matters – it's a positional system. In decimal, the number 345 means 3x100 + 4x10 + 5x1. In binary, 101 means 1x4 + 0x2 + 1x1 = 5 in decimal.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Number Bases</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Binary (Base 2)</h4>
            <p className="text-sm text-muted-foreground mb-2">Digits: 0, 1</p>
            <p className="text-sm text-muted-foreground">
              The language of computers. Every piece of digital data is stored as binary. Eight binary digits form a byte.
            </p>
            <code className="text-xs font-mono block mt-2">1010 = 8+2 = 10 (decimal)</code>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Octal (Base 8)</h4>
            <p className="text-sm text-muted-foreground mb-2">Digits: 0-7</p>
            <p className="text-sm text-muted-foreground">
              Historically used in computing because each octal digit represents exactly 3 binary digits. Still used in Unix file permissions.
            </p>
            <code className="text-xs font-mono block mt-2">777 = rwxrwxrwx permissions</code>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Decimal (Base 10)</h4>
            <p className="text-sm text-muted-foreground mb-2">Digits: 0-9</p>
            <p className="text-sm text-muted-foreground">
              Our everyday number system, likely originating from counting on ten fingers. The standard for human communication of quantities.
            </p>
            <code className="text-xs font-mono block mt-2">345 = 3x100 + 4x10 + 5x1</code>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Hexadecimal (Base 16)</h4>
            <p className="text-sm text-muted-foreground mb-2">Digits: 0-9, A-F</p>
            <p className="text-sm text-muted-foreground">
              Compact representation of binary – each hex digit equals 4 binary digits. Used for memory addresses, colors (RGB), and MAC addresses.
            </p>
            <code className="text-xs font-mono block mt-2">FF = 255 = 11111111 (binary)</code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Conversion Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Decimal to Binary</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Convert 42 to binary</div>
              <div>42 / 2 = 21 remainder 0</div>
              <div>21 / 2 = 10 remainder 1</div>
              <div>10 / 2 = 5 remainder 0</div>
              <div>5 / 2 = 2 remainder 1</div>
              <div>2 / 2 = 1 remainder 0</div>
              <div>1 / 2 = 0 remainder 1</div>
              <div>Read remainders bottom-up: 101010</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Binary to Hex</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Convert 10101100 to hex</div>
              <div>Group by 4: 1010 1100</div>
              <div>1010 = 8+2 = 10 = A</div>
              <div>1100 = 8+4 = 12 = C</div>
              <div>Result: AC (hex)</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Hex to Decimal</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Convert 1A3F to decimal</div>
              <div>1 x 16^3 = 1 x 4096 = 4096</div>
              <div>A x 16^2 = 10 x 256 = 2560</div>
              <div>3 x 16^1 = 3 x 16 = 48</div>
              <div>F x 16^0 = 15 x 1 = 15</div>
              <div>Sum: 4096 + 2560 + 48 + 15 = 6719</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: RGB Color Values</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Color #FF5733 to decimal RGB</div>
              <div>FF (red) = 255</div>
              <div>57 (green) = 5x16 + 7 = 87</div>
              <div>33 (blue) = 3x16 + 3 = 51</div>
              <div>RGB(255, 87, 51) - an orange color</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm">
            The hexadecimal system was introduced by IBM in the 1960s. Before that, some computers used octal. The letters A-F were chosen because they're the first six letters after the digits 0-9, making them easy to distinguish. Some early systems used other symbols for values 10-15!
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do programmers use hexadecimal?</h4>
            <p className="text-sm text-muted-foreground">
              Hex is compact and converts easily to binary. One hex digit = 4 bits (a nibble), two hex digits = 8 bits (a byte). It's much easier to read and write "0xFF" than "11111111" or even "255".
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does 0x mean before a number?</h4>
            <p className="text-sm text-muted-foreground">
              The prefix "0x" indicates a hexadecimal number in programming. So 0xFF means FF in hex = 255 in decimal. Similarly, "0b" prefix indicates binary (0b1010 = 10).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I convert without a calculator?</h4>
            <p className="text-sm text-muted-foreground">
              To convert to decimal: multiply each digit by its place value and add. To convert from decimal: repeatedly divide by the target base and collect remainders. For binary/hex, group bits by 4.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is two's complement?</h4>
            <p className="text-sm text-muted-foreground">
              Two's complement is how computers represent negative numbers in binary. Invert all bits and add 1. For example, -1 in 8-bit is 11111111 (invert 00000000, add 1).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is octal still used?</h4>
            <p className="text-sm text-muted-foreground">
              Unix and Linux file permissions use octal notation. The permission "755" means rwxr-xr-x. Each digit represents read(4) + write(2) + execute(1) permissions for owner, group, and others.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can bases be larger than 16?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! Base 32 and base 64 are used for encoding binary data as text (like in URLs and email). Base 64 uses A-Z, a-z, 0-9, +, and / to represent 6 bits per character.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
