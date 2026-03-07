"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TwosComplementCalculator() {
  const [mode, setMode] = useState<"toTwos" | "fromTwos">("toTwos");
  const [bitWidth, setBitWidth] = useState(8);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<{
    binary: string;
    decimal: number;
    hex: string;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    if (!inputValue.trim()) {
      setError("Please enter a value");
      return;
    }

    try {
      let binary: string;
      let decimal: number;
      let hex: string;
      const steps: string[] = [];

      if (mode === "toTwos") {
        // Convert decimal to two's complement
        const num = parseInt(inputValue);
        if (isNaN(num)) {
          setError("Please enter a valid integer");
          return;
        }

        const minVal = -Math.pow(2, bitWidth - 1);
        const maxVal = Math.pow(2, bitWidth - 1) - 1;

        if (num < minVal || num > maxVal) {
          setError(`Value must be between ${minVal} and ${maxVal} for ${bitWidth}-bit representation`);
          return;
        }

        decimal = num;
        
        if (num >= 0) {
          // Positive number: direct binary
          binary = num.toString(2).padStart(bitWidth, '0');
          steps.push(`Converting ${num} to ${bitWidth}-bit two's complement`);
          steps.push(``);
          steps.push(`Step 1: Number is positive`);
          steps.push(`Convert directly to binary`);
          steps.push(`${num} in binary = ${num.toString(2)}`);
          steps.push(``);
          steps.push(`Step 2: Pad to ${bitWidth} bits`);
          steps.push(`${binary}`);
        } else {
          // Negative number: two's complement
          const absNum = Math.abs(num);
          const positiveBinary = absNum.toString(2).padStart(bitWidth, '0');
          
          // Invert bits
          let inverted = '';
          for (const bit of positiveBinary) {
            inverted += bit === '0' ? '1' : '0';
          }
          
          // Add 1
          let carry = 1;
          let twosComplement = '';
          for (let i = inverted.length - 1; i >= 0; i--) {
            const bit = parseInt(inverted[i]);
            const sum = bit + carry;
            twosComplement = (sum % 2) + twosComplement;
            carry = Math.floor(sum / 2);
          }
          
          binary = twosComplement;
          
          steps.push(`Converting ${num} to ${bitWidth}-bit two's complement`);
          steps.push(``);
          steps.push(`Step 1: Start with absolute value`);
          steps.push(`|${num}| = ${absNum}`);
          steps.push(`${absNum} in binary = ${positiveBinary}`);
          steps.push(``);
          steps.push(`Step 2: Invert all bits (one's complement)`);
          steps.push(`${positiveBinary} → ${inverted}`);
          steps.push(``);
          steps.push(`Step 3: Add 1`);
          steps.push(`${inverted} + 1 = ${twosComplement}`);
          steps.push(``);
          steps.push(`Result: ${binary}`);
        }

        hex = parseInt(binary, 2).toString(16).toUpperCase().padStart(Math.ceil(bitWidth / 4), '0');
      } else {
        // Convert two's complement binary to decimal
        binary = inputValue.replace(/[^01]/g, '');
        
        if (binary.length > bitWidth) {
          setError(`Binary value exceeds ${bitWidth} bits`);
          return;
        }
        
        binary = binary.padStart(bitWidth, '0');
        
        steps.push(`Converting ${bitWidth}-bit two's complement to decimal`);
        steps.push(`Input: ${binary}`);
        steps.push(``);

        if (binary[0] === '0') {
          // Positive number
          decimal = parseInt(binary, 2);
          steps.push(`Step 1: First bit is 0 (positive number)`);
          steps.push(`Convert directly to decimal`);
          steps.push(`${binary}₂ = ${decimal}₁₀`);
        } else {
          // Negative number
          steps.push(`Step 1: First bit is 1 (negative number)`);
          steps.push(``);
          steps.push(`Step 2: Invert all bits`);
          let inverted = '';
          for (const bit of binary) {
            inverted += bit === '0' ? '1' : '0';
          }
          steps.push(`${binary} → ${inverted}`);
          steps.push(``);
          steps.push(`Step 3: Add 1`);
          let carry = 1;
          let result = '';
          for (let i = inverted.length - 1; i >= 0; i--) {
            const bit = parseInt(inverted[i]);
            const sum = bit + carry;
            result = (sum % 2) + result;
            carry = Math.floor(sum / 2);
          }
          steps.push(`${inverted} + 1 = ${result}`);
          steps.push(``);
          steps.push(`Step 4: Convert to decimal and negate`);
          const absValue = parseInt(result, 2);
          decimal = -absValue;
          steps.push(`${result}₂ = ${absValue}₁₀`);
          steps.push(`Apply negative sign: ${decimal}`);
        }

        hex = parseInt(binary, 2).toString(16).toUpperCase().padStart(Math.ceil(bitWidth / 4), '0');
      }

      setResult({
        binary,
        decimal,
        hex,
        steps
      });
    } catch (e) {
      setError("Unable to calculate. Please check your input.");
    }
  };

  const reset = () => {
    setInputValue("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    if (mode === "toTwos") {
      setInputValue("-42");
    } else {
      setInputValue("11010110");
    }
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Two's Complement Calculator – Convert to Twos Complement</h1>
        <p className="text-muted-foreground">
          Convert any integer to its two's complement binary form or decode two's complement back to decimal with our free online calculator. Supports 8-bit, 16-bit, and 32-bit representations.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Mode:</Label>
            <Select value={mode} onValueChange={(v) => {
              setMode(v as typeof mode);
              setResult(null);
              setError("");
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toTwos">Decimal → Two's Complement</SelectItem>
                <SelectItem value="fromTwos">Two's Complement → Decimal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Bit Width:</Label>
            <Select value={String(bitWidth)} onValueChange={(v) => {
              setBitWidth(parseInt(v));
              setResult(null);
              setError("");
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8">8-bit (-128 to 127)</SelectItem>
                <SelectItem value="16">16-bit (-32768 to 32767)</SelectItem>
                <SelectItem value="32">32-bit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>{mode === "toTwos" ? 'Decimal Number:' : 'Binary (Two\'s Complement):'}</Label>
          <Input
            placeholder={mode === "toTwos" ? "e.g., -42" : "e.g., 11010110"}
            value={inputValue}
            onChange={(e) => {
              if (mode === "fromTwos") {
                setInputValue(e.target.value.replace(/[^01]/g, ''));
              } else {
                setInputValue(e.target.value);
              }
            }}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Convert</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Binary</p>
                  <p className="text-2xl font-bold font-mono">{result.binary}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Decimal</p>
                  <p className="text-2xl font-bold">{result.decimal}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Hexadecimal</p>
                  <p className="text-2xl font-bold font-mono">0x{result.hex}</p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Conversion</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                {result.steps.map((step, i) => (
                  <div key={i} className={step === "" ? "h-4" : ""}>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Bit Visualization</h4>
              <div className="flex gap-1 justify-center flex-wrap">
                {result.binary.split('').map((bit, i) => (
                  <div
                    key={i}
                    className={`w-10 h-12 flex items-center justify-center font-mono font-bold rounded ${
                      i === 0 ? 'bg-red-100 border-2 border-red-300' : 'bg-muted'
                    }`}
                  >
                    {bit}
                    {i === 0 && <span className="absolute -mt-6 text-xs text-red-600">sign</span>}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                First bit (red) is the sign bit: 0 = positive, 1 = negative
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
