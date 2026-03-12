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
                    className={`w-10 h-12 flex items-center justify-center font-mono font-bold rounded ${i === 0 ? 'bg-red-100 border-2 border-red-300' : 'bg-muted'
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

      <div className="mt-16 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How Two's Complement Works</h2>
          <p className="text-muted-foreground mb-4">
            Two's complement is the standard method computers use to represent signed integers in binary. It allows the same hardware circuits to perform addition and subtraction on both positive and negative numbers, making it essential for computer arithmetic.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>To convert a positive number:</strong> Simply write it in binary and pad to the desired bit width. The leftmost bit (sign bit) will be 0.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>To convert a negative number:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
            <li>Start with the absolute value in binary</li>
            <li>Invert all bits (0→1, 1→0) to get the one's complement</li>
            <li>Add 1 to get the two's complement</li>
          </ol>
          <p className="text-muted-foreground mt-4">
            The leftmost bit indicates the sign: 0 for positive, 1 for negative. In an 8-bit system, you can represent numbers from -128 to +127.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Example Conversions</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">Converting +42 to 8-bit Two's Complement</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2">
            <p>Step 1: Convert 42 to binary</p>
            <p>42 ÷ 2 = 21 remainder 0</p>
            <p>21 ÷ 2 = 10 remainder 1</p>
            <p>10 ÷ 2 = 5  remainder 0</p>
            <p>5 ÷ 2 = 2   remainder 1</p>
            <p>2 ÷ 2 = 1   remainder 0</p>
            <p>1 ÷ 2 = 0   remainder 1</p>
            <p className="mt-2">42 in binary = 101010</p>
            <p>Pad to 8 bits: <strong>00101010</strong></p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Converting -42 to 8-bit Two's Complement</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2">
            <p>Step 1: Start with |−42| = 42 = 00101010</p>
            <p>Step 2: Invert all bits (one's complement)</p>
            <p>00101010 → 11010101</p>
            <p>Step 3: Add 1</p>
            <p>11010101 + 1 = <strong>11010110</strong></p>
            <p className="mt-2 text-muted-foreground">So -42 in 8-bit two's complement = 11010110</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Converting Two's Complement Back to Decimal</h3>
          <p className="text-muted-foreground mb-2">
            Decode: 11010110 (8-bit)
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2">
            <p>Step 1: Check sign bit (leftmost)</p>
            <p>1 = negative number</p>
            <p>Step 2: Invert all bits</p>
            <p>11010110 → 00101001</p>
            <p>Step 3: Add 1</p>
            <p>00101001 + 1 = 00101010</p>
            <p>Step 4: Convert to decimal and negate</p>
            <p>00101010 = 42, so result = <strong>-42</strong></p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">16-bit Example: -1000</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>1000 in binary = 1111101000</p>
            <p>Pad to 16 bits: 0000001111101000</p>
            <p>Invert: 1111110000010111</p>
            <p>Add 1: 1111110000011000</p>
            <p className="mt-2">-1000 in 16-bit = <strong>1111110000011000</strong> = 0xFC18</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Fact: Why Two's Complement Won</h2>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
            <p className="text-muted-foreground">
              Early computers used different methods for negative numbers. The IBM 704 (1954) used <strong>one's complement</strong>, which had a strange quirk: it had both +0 (00000000) and -0 (11111111)! This wasted a representation and complicated arithmetic. <strong>Two's complement</strong> was proposed by John von Neumann in 1945 and has only one zero, simpler arithmetic circuits, and the same addition hardware works for both positive and negative numbers. By the 1970s, two's complement became universal. The PDP-8 minicomputer helped popularize it, and today every modern processor uses two's complement for integer arithmetic.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Why do computers use two's complement?</h3>
              <p className="text-muted-foreground">
                Two's complement allows the same addition circuit to handle both positive and negative numbers. For example, 5 + (-3) works the same as regular binary addition. This simplifies hardware design and improves speed. It also avoids the problem of having both +0 and -0.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What's the range of an 8-bit two's complement number?</h3>
              <p className="text-muted-foreground">
                An 8-bit two's complement can represent -128 to +127. Notice the asymmetry: there's one more negative number than positive. This is because 0 takes up one of the "positive" patterns (00000000). For n bits, the range is -2^(n-1) to 2^(n-1)-1.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What does the sign bit tell me?</h3>
              <p className="text-muted-foreground">
                The leftmost bit indicates the sign: 0 means positive (or zero), 1 means negative. In 8-bit, any number starting with 0 (00000000 to 01111111) is 0 to 127. Any number starting with 1 (10000000 to 11111111) is -128 to -1.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I detect overflow in two's complement?</h3>
              <p className="text-muted-foreground">
                Overflow occurs when adding two positives gives a negative, or adding two negatives gives a positive. More precisely: overflow happens when the carry into the sign bit differs from the carry out of the sign bit. For 8-bit: 100 + 50 = 150 overflows because 150 &gt; 127.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is one's complement and why isn't it used?</h3>
              <p className="text-muted-foreground">
                One's complement simply inverts all bits to negate a number. The problem: it has two representations of zero (00000000 and 11111111), which complicates comparisons. Also, addition requires an "end-around carry" step. Two's complement fixes both issues.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I convert two's complement to hexadecimal?</h3>
              <p className="text-muted-foreground">
                Group the binary digits into sets of 4 (starting from the right), then convert each group to hex. For example, 11010110 becomes 1101 0110 = D6 in hex. The hex value 0xD6 represents -42 in 8-bit two's complement.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What happens if I try to represent -129 in 8-bit?</h3>
              <p className="text-muted-foreground">
                You can't—this causes overflow. The minimum 8-bit value is -128 (10000000). Trying to represent -129 would wrap around to +127 due to overflow. This is why choosing the right bit width matters: use 16-bit for values outside -128 to 127.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
