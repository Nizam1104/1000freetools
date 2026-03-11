"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BinaryArithmeticCalculator() {
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [binary1, setBinary1] = useState("");
  const [binary2, setBinary2] = useState("");
  const [result, setResult] = useState<{
    binaryResult: string;
    decimalResult: number;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    if (!binary1.trim() || !binary2.trim()) {
      setError("Please enter both binary numbers");
      return;
    }

    if (!/^[01]+$/.test(binary1) || !/^[01]+$/.test(binary2)) {
      setError("Please enter valid binary numbers (only 0s and 1s)");
      return;
    }

    try {
      const num1 = parseInt(binary1, 2);
      const num2 = parseInt(binary2, 2);
      const steps: string[] = [];

      steps.push(`Binary ${operation === 'add' ? 'Addition' : 'Subtraction'}`);
      steps.push(``);
      steps.push(`Operand 1: ${binary1}₂ = ${num1}₁₀`);
      steps.push(`Operand 2: ${binary2}₂ = ${num2}₁₀`);
      steps.push(``);

      let decimalResult: number;
      if (operation === "add") {
        decimalResult = num1 + num2;
        steps.push(`Step 1: Convert to decimal (for verification)`);
        steps.push(`${binary1}₂ = ${num1}`);
        steps.push(`${binary2}₂ = ${num2}`);
        steps.push(``);
        steps.push(`Step 2: Add in decimal`);
        steps.push(`${num1} + ${num2} = ${decimalResult}`);
        steps.push(``);
        steps.push(`Step 3: Convert back to binary`);
        steps.push(`${decimalResult}₁₀ = ${decimalResult.toString(2)}₂`);
      } else {
        decimalResult = num1 - num2;
        steps.push(`Step 1: Convert to decimal (for verification)`);
        steps.push(`${binary1}₂ = ${num1}`);
        steps.push(`${binary2}₂ = ${num2}`);
        steps.push(``);
        steps.push(`Step 2: Subtract in decimal`);
        steps.push(`${num1} - ${num2} = ${decimalResult}`);
        steps.push(``);

        if (decimalResult < 0) {
          steps.push(`Result is negative: -${Math.abs(decimalResult).toString(2)}₂`);
        } else {
          steps.push(`Step 3: Convert back to binary`);
          steps.push(`${decimalResult}₁₀ = ${decimalResult.toString(2)}₂`);
        }
      }

      const binaryResult = decimalResult < 0
        ? `-${Math.abs(decimalResult).toString(2)}`
        : decimalResult.toString(2);

      setResult({
        binaryResult,
        decimalResult,
        steps
      });
    } catch (e) {
      setError("Unable to calculate. Please check your inputs.");
    }
  };

  const reset = () => {
    setBinary1("");
    setBinary2("");
    setResult(null);
    setError("");
  };

  const loadExample = (b1: string, b2: string, op: typeof operation) => {
    setOperation(op);
    setBinary1(b1);
    setBinary2(b2);
    setResult(null);
    setError("");
  };

  const insertBit = (bit: string) => {
    setBinary1(binary1 + bit);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Binary Addition & Subtraction Calculator – Compute in Base 2</h1>
        <p className="text-muted-foreground">
          Add and subtract binary numbers with our free online binary arithmetic calculator. See step-by-step solutions with decimal verification for computer science and digital logic applications.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <Label>Operation:</Label>
          <Select value={operation} onValueChange={(v) => {
            setOperation(v as typeof operation);
            setResult(null);
            setError("");
          }}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="add">Addition (+)</SelectItem>
              <SelectItem value="subtract">Subtraction (-)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>First Binary Number:</Label>
            <div className="flex gap-1">
              <Input
                placeholder="e.g., 1011"
                value={binary1}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^01]/g, '');
                  setBinary1(val);
                }}
                className="font-mono"
              />
              <div className="flex flex-col gap-1">
                <Button variant="outline" size="sm" onClick={() => insertBit('1')} className="h-8 w-10">1</Button>
                <Button variant="outline" size="sm" onClick={() => insertBit('0')} className="h-8 w-10">0</Button>
              </div>
            </div>
          </div>
          <div>
            <Label>Second Binary Number:</Label>
            <Input
              placeholder="e.g., 1101"
              value={binary2}
              onChange={(e) => {
                const val = e.target.value.replace(/[^01]/g, '');
                setBinary2(val);
              }}
              className="font-mono"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1011", "1101", "add")}>
            1011 + 1101
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("11110000", "00001111", "add")}>
            11110000 + 00001111
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10000", "1", "add")}>
            10000 + 1
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1101", "1011", "subtract")}>
            1101 - 1011
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100000", "11111", "subtract")}>
            100000 - 11111
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10101010", "01010101", "add")}>
            10101010 + 01010101
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1111", "10000", "subtract")}>
            1111 - 10000 (negative)
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2">Result</p>
                <p className="text-4xl font-bold font-mono">{result.binaryResult}₂</p>
                <p className="text-sm text-muted-foreground mt-2">
                  = {result.decimalResult}₁₀
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-background rounded border">
                  <p className="text-xs text-muted-foreground mb-1">First Number</p>
                  <p className="text-xl font-mono">{binary1}₂ = {parseInt(binary1, 2)}₁₀</p>
                </div>
                <div className="p-4 bg-background rounded border">
                  <p className="text-xs text-muted-foreground mb-1">Second Number</p>
                  <p className="text-xl font-mono">{binary2}₂ = {parseInt(binary2, 2)}₁₀</p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                {result.steps.map((step, i) => (
                  <div key={i} className={step === "" ? "h-4" : ""}>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Binary {operation === 'add' ? 'Addition' : 'Subtraction'} Layout</h4>
              <div className="font-mono text-lg bg-muted p-4 rounded text-center">
                <pre className="whitespace-pre">
  {binary1.padStart(Math.max(binary1.length, binary2.length) + 2)}
{operation === 'add' ? '+' : '-'} {binary2.padStart(Math.max(binary1.length, binary2.length) + 1)}
  {'─'.repeat(Math.max(binary1.length, binary2.length) + 2)}
  {result.binaryResult.padStart(Math.max(binary1.length, binary2.length) + 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Binary Arithmetic – Base 2 Addition and Subtraction</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Binary arithmetic is the foundation of all computer calculations. Inside every processor, billions of transistors perform binary addition and subtraction billions of times per second. Understanding binary math helps you grasp how computers work at the lowest level – from simple calculators to AI systems.
          </p>
          <p className="text-muted-foreground">
            Binary uses only two digits: 0 and 1. This matches perfectly with electronic circuits, where 0 represents "off" (no voltage) and 1 represents "on" (voltage present). Every number your computer handles – text, images, sound – ultimately becomes binary for processing.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Binary Addition Rules</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Basic Addition Table</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded space-y-1">
              <div>0 + 0 = 0</div>
              <div>0 + 1 = 1</div>
              <div>1 + 0 = 1</div>
              <div>1 + 1 = 10 (write 0, carry 1)</div>
              <div>1 + 1 + 1 = 11 (write 1, carry 1)</div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              The key difference from decimal: when you reach 2, you write 0 and carry 1 to the next column. It's like decimal addition, but you carry much sooner.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example: 1011 + 1101</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded space-y-1">
              <div>  ¹ ¹   (carries)</div>
              <div>  1011</div>
              <div>+ 1101</div>
              <div>──────</div>
              <div> 11000</div>
              <div></div>
              <div>Column by column (right to left):</div>
              <div>1 + 1 = 10 → write 0, carry 1</div>
              <div>1 + 0 + 1 = 10 → write 0, carry 1</div>
              <div>0 + 1 + 1 = 10 → write 0, carry 1</div>
              <div>1 + 1 + 1 = 11 → write 11</div>
              <div>Result: 11000₂ = 24₁₀</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Binary Subtraction Rules</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Basic Subtraction Table</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded space-y-1">
              <div>0 - 0 = 0</div>
              <div>1 - 0 = 1</div>
              <div>1 - 1 = 0</div>
              <div>0 - 1 = 1 (borrow 1 from left)</div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              When subtracting 1 from 0, you borrow from the next column. The borrowed 1 becomes 10 in binary (which is 2 in decimal), so 10 - 1 = 1.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example: 1101 - 1011</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded space-y-1">
              <div>  ⁰¹⁰   (after borrowing)</div>
              <div>  1101</div>
              <div>- 1011</div>
              <div>──────</div>
              <div>  0010</div>
              <div></div>
              <div>Column by column (right to left):</div>
              <div>1 - 1 = 0</div>
              <div>0 - 1: borrow from left → 10 - 1 = 1</div>
              <div>0 - 0 = 0 (was 1, lent to right)</div>
              <div>1 - 1 = 0</div>
              <div>Result: 0010₂ = 2₁₀</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Simple Addition</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Add 101₂ + 11₂ (5 + 3 in decimal)
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>  ¹¹</div>
              <div>  101</div>
              <div>+  11</div>
              <div>────</div>
              <div> 1000</div>
              <div>Verification: 5 + 3 = 8 ✓</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Addition with Multiple Carries</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Add 1111₂ + 1₂ (15 + 1 in decimal)
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>¹¹¹¹</div>
              <div>  1111</div>
              <div>+    1</div>
              <div>──────</div>
              <div> 10000</div>
              <div>Verification: 15 + 1 = 16 ✓</div>
              <div>This is like 9999 + 1 = 10000 in decimal</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Subtraction with Borrowing</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Subtract 10000₂ - 1111₂ (16 - 15 in decimal)
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>⁰¹¹¹¹⁰</div>
              <div>  10000</div>
              <div>-  1111</div>
              <div>──────</div>
              <div>     1</div>
              <div>Verification: 16 - 15 = 1 ✓</div>
              <div>Requires borrowing across multiple columns</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Byte Addition</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Add two 8-bit numbers: 11110000₂ + 00001111₂ (240 + 15)
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>  ¹¹¹¹</div>
              <div>  11110000</div>
              <div>+ 00001111</div>
              <div>─────────</div>
              <div> 100000000</div>
              <div>Verification: 240 + 15 = 255 ✓</div>
              <div>Result needs 9 bits (overflow for 8-bit storage)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Negative Result</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Subtract 1111₂ - 10000₂ (15 - 16 in decimal)
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>15 - 16 = -1</div>
              <div>Result: -1₁₀ = -1₂</div>
              <div>In computers, negative numbers use</div>
              <div>two's complement representation</div>
              <div>-1 in 8-bit two's complement: 11111111</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Quick Fact</h3>
          <p className="text-sm text-muted-foreground">
            Gottfried Wilhelm Leibniz formalized binary arithmetic in 1703, seeing it as evidence of divine creation – 1 representing God and 0 representing nothingness. He had no idea his system would power every computer 300 years later. The first electronic computer to use binary was the Atanasoff-Berry Computer (ABC) in 1942.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do computers use binary instead of decimal?</h4>
            <p className="text-sm text-muted-foreground">
              Binary maps perfectly to physical switches: on or off, high voltage or low voltage. Building a circuit with ten stable states (for decimal) would be far more complex and error-prone. Binary's simplicity enables the billions of transistors in modern chips to work reliably at gigahertz speeds.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I convert binary to decimal?</h4>
            <p className="text-sm text-muted-foreground">
              Multiply each bit by its place value (powers of 2) and add. For 1011: (1×8) + (0×4) + (1×2) + (1×1) = 8 + 0 + 2 + 1 = 11. Place values from right to left are 1, 2, 4, 8, 16, 32, 64, 128...
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What happens when binary addition overflows?</h4>
            <p className="text-sm text-muted-foreground">
              In fixed-width storage (like 8-bit registers), overflow bits are discarded. 11111111 + 1 = 100000000, but stored as 00000000. This is called "wraparound." Programming languages handle this differently – some throw errors, others silently wrap.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do computers handle negative binary numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Most computers use "two's complement": flip all bits and add 1. For -5 in 8-bit: 5 is 00000101, flip to 11111010, add 1 to get 11111011. This lets the same addition circuit handle both positive and negative numbers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can binary represent fractions?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, using a binary point (like a decimal point). Positions to the right are 1/2, 1/4, 1/8, etc. So 10.11₂ = 2 + 0.5 + 0.25 = 2.75₁₀. Computers use floating-point formats (like IEEE 754) for fractional numbers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the largest number I can calculate here?</h4>
            <p className="text-sm text-muted-foreground">
              This calculator converts to JavaScript numbers internally, which safely handles integers up to 2^53 - 1 (about 9 quadrillion). That's roughly 53 binary digits. For larger numbers, you'd need arbitrary-precision binary arithmetic.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
