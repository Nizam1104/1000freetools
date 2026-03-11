"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BitwiseOperationsCalculator() {
  const [operation, setOperation] = useState<"and" | "or" | "xor" | "not" | "lshift" | "rshift">("and");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState<{
    decimalResult: number;
    binaryResult: string;
    hexResult: string;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const n1 = parseInt(num1);

    if (isNaN(n1)) {
      setError("Please enter a valid integer");
      return;
    }

    try {
      let calcResult: number;
      const steps: string[] = [];
      const bits = 32;

      steps.push(`Bitwise ${operation === 'and' ? 'AND' : operation === 'or' ? 'OR' : operation === 'xor' ? 'XOR' : operation === 'not' ? 'NOT' : operation === 'lshift' ? 'Left Shift' : 'Right Shift'}`);
      steps.push(``);

      if (operation === "not") {
        calcResult = ~n1;
        steps.push(`Operand: ${n1}`);
        steps.push(`Binary: ${n1.toString(2).padStart(bits, n1 >= 0 ? '0' : '1')}`);
        steps.push(``);
        steps.push(`Step: Invert all bits`);
        steps.push(`~${n1} = ${calcResult}`);
      } else if (operation === "lshift" || operation === "rshift") {
        const shiftAmount = parseInt(num2);
        if (isNaN(shiftAmount) || shiftAmount < 0) {
          setError("Please enter a valid shift amount (non-negative)");
          return;
        }

        if (operation === "lshift") {
          calcResult = n1 << shiftAmount;
          steps.push(`Operand: ${n1}`);
          steps.push(`Shift amount: ${shiftAmount} positions left`);
          steps.push(``);
          steps.push(`Step: Shift bits left by ${shiftAmount}`);
          steps.push(`${n1} << ${shiftAmount} = ${calcResult}`);
          steps.push(``);
          steps.push(`Equivalent to: ${n1} × 2^${shiftAmount} = ${n1 * Math.pow(2, shiftAmount)}`);
        } else {
          calcResult = n1 >> shiftAmount;
          steps.push(`Operand: ${n1}`);
          steps.push(`Shift amount: ${shiftAmount} positions right`);
          steps.push(``);
          steps.push(`Step: Shift bits right by ${shiftAmount}`);
          steps.push(`${n1} >> ${shiftAmount} = ${calcResult}`);
          steps.push(``);
          steps.push(`Equivalent to: floor(${n1} / 2^${shiftAmount}) = ${Math.floor(n1 / Math.pow(2, shiftAmount))}`);
        }
      } else {
        const n2 = parseInt(num2);
        if (isNaN(n2)) {
          setError("Please enter a valid second integer");
          return;
        }

        steps.push(`Operand 1: ${n1}`);
        steps.push(`Binary: ${n1.toString(2)}`);
        steps.push(``);
        steps.push(`Operand 2: ${n2}`);
        steps.push(`Binary: ${n2.toString(2)}`);
        steps.push(``);

        if (operation === "and") {
          calcResult = n1 & n2;
          steps.push(`Step: AND each bit pair`);
          steps.push(`1 AND 1 = 1, otherwise 0`);
          steps.push(`${n1} & ${n2} = ${calcResult}`);
        } else if (operation === "or") {
          calcResult = n1 | n2;
          steps.push(`Step: OR each bit pair`);
          steps.push(`0 OR 0 = 0, otherwise 1`);
          steps.push(`${n1} | ${n2} = ${calcResult}`);
        } else {
          calcResult = n1 ^ n2;
          steps.push(`Step: XOR each bit pair`);
          steps.push(`Same bits = 0, different bits = 1`);
          steps.push(`${n1} ^ ${n2} = ${calcResult}`);
        }
      }

      const binaryWidth = Math.max(
        calcResult.toString(2).length,
        n1.toString(2).length,
        operation !== "not" && operation !== "lshift" && operation !== "rshift" ? parseInt(num2).toString(2).length : 0
      ) + 4;

      setResult({
        decimalResult: calcResult,
        binaryResult: calcResult.toString(2).padStart(binaryWidth, calcResult >= 0 ? '0' : '1'),
        hexResult: (calcResult >>> 0).toString(16).toUpperCase(),
        steps
      });
    } catch (e) {
      setError("Unable to calculate. Please check your inputs.");
    }
  };

  const reset = () => {
    setNum1("");
    setNum2("");
    setResult(null);
    setError("");
  };

  const loadExample = (n1: string, n2: string, op: typeof operation) => {
    setNum1(n1);
    setNum2(n2);
    setOperation(op);
    setResult(null);
    setError("");
  };

  const showBitVisual = operation !== "not" && operation !== "lshift" && operation !== "rshift";

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Bitwise Operations Calculator – Compute AND OR XOR NOT Shifts</h1>
        <p className="text-muted-foreground">
          Perform bitwise operations on integers with our free online calculator. Supports AND, OR, XOR, NOT, left shift, and right shift with binary visualization for programming and computer science.
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
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="and">AND (&)</SelectItem>
              <SelectItem value="or">OR (|)</SelectItem>
              <SelectItem value="xor">XOR (^)</SelectItem>
              <SelectItem value="not">NOT (~)</SelectItem>
              <SelectItem value="lshift">Left Shift (&lt;&lt;)</SelectItem>
              <SelectItem value="rshift">Right Shift (&gt;&gt;)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>First Number:</Label>
            <Input
              type="number"
              placeholder="e.g., 12"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
            />
          </div>
          {operation !== "not" && (
            <div>
              <Label>{operation === 'lshift' || operation === 'rshift' ? 'Shift Amount:' : 'Second Number:'}</Label>
              <Input
                type="number"
                placeholder={operation === 'lshift' || operation === 'rshift' ? "e.g., 2" : "e.g., 10"}
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("12", "10", "and")}>
            12 AND 10
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("12", "10", "or")}>
            12 OR 10
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("12", "10", "xor")}>
            12 XOR 10
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("42", "", "not")}>
            NOT 42
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("5", "2", "lshift")}>
            5 &lt;&lt; 2
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("20", "2", "rshift")}>
            20 &gt;&gt; 2
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("255", "15", "and")}>
            255 AND 15 (mask)
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
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Decimal</p>
                  <p className="text-3xl font-bold">{result.decimalResult}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Binary</p>
                  <p className="text-xl font-bold font-mono">{result.binaryResult}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Hexadecimal</p>
                  <p className="text-2xl font-bold font-mono">0x{result.hexResult}</p>
                </div>
              </div>
            </div>

            {showBitVisual && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-3">Bit Visualization</h4>
                <div className="font-mono text-sm bg-muted p-4 rounded overflow-x-auto">
                  <pre>
{num1.padStart(result.binaryResult.length)}  ({num1})
{operation === 'and' ? '&' : operation === 'or' ? '|' : '^'} {num2.padStart(result.binaryResult.length - 2)}  ({num2})
{'─'.repeat(result.binaryResult.length)}
{result.binaryResult.trim()}  ({result.decimalResult})
                  </pre>
                </div>
              </div>
            )}

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
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Bitwise Operations – Low-Level Binary Manipulation</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Bitwise operations work directly on the binary representation of numbers. Instead of treating numbers as whole values, bitwise operators look at each individual bit (0 or 1) and apply logical rules. These operations are fundamental to programming – used in everything from graphics processing to encryption to data compression.
          </p>
          <p className="text-muted-foreground">
            Programmers use bitwise operations for tasks like setting flags, checking permissions, manipulating colors, optimizing calculations, and working with hardware registers. While high-level code often hides these operations, understanding them gives you insight into how computers actually process data.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Bitwise Operators Explained</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">AND (&)</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">
              1 &amp; 1 = 1, otherwise 0
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Returns 1 only when both bits are 1. Commonly used for masking – extracting specific bits from a number.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              Example: 12 & 10 = 8<br />
              1100 & 1010 = 1000
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">OR (|)</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">
              0 &#124; 0 = 0, otherwise 1
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Returns 1 if either bit is 1. Used for setting bits – turning specific flags on without affecting others.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              Example: 12 | 10 = 14<br />
              1100 | 1010 = 1110
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">XOR (^)</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">
              Same bits = 0, different = 1
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Returns 1 when bits differ. Used for toggling bits, simple encryption, and detecting differences.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              Example: 12 ^ 10 = 6<br />
              1100 ^ 1010 = 0110
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">NOT (~)</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">
              Flips all bits: 0→1, 1→0
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Inverts every bit. In two's complement, ~x = -(x+1). Used for creating masks and inverting flags.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              Example: ~42 = -43<br />
              (in 8-bit: ~00101010 = 11010101)
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Left Shift (&lt;&lt;)</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">
              Shifts bits left, fills with 0
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Moves all bits left by specified positions. Equivalent to multiplying by 2^n. Used for fast multiplication.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              Example: 5 &lt;&lt; 2 = 20<br />
              000101 &lt;&lt; 2 = 010100 (5 × 4 = 20)
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Right Shift (&gt;&gt;)</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">
              Shifts bits right, preserves sign
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Moves all bits right by specified positions. Equivalent to dividing by 2^n (floor division). Used for fast division.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              Example: 20 &gt;&gt; 2 = 5<br />
              010100 &gt;&gt; 2 = 000101 (20 ÷ 4 = 5)
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Use Cases</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Bitmasking with AND</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Extract specific bits using a mask. To get the last 4 bits of any number, AND it with 15 (binary 1111).
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>255 & 15 = 15</div>
              <div>11111111 & 00001111 = 00001111</div>
              <div>Useful for extracting color channels, flags, or nibbles</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Setting Flags with OR</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Turn on specific bits without affecting others. Common in permission systems and configuration flags.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>permissions = permissions | READ_FLAG</div>
              <div>If READ_FLAG = 4 (binary 100)</div>
              <div>5 | 4 = 5 | 100 = 101 | 100 = 101 = 5 (already set)</div>
              <div>1 | 4 = 1 | 100 = 001 | 100 = 101 = 5 (now set)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Toggling with XOR</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Flip specific bits. XOR with 1 toggles, XOR twice returns to original. Used in simple encryption and graphics.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>value ^ mask toggles bits where mask has 1s</div>
              <div>10 ^ 1 = 11, then 11 ^ 1 = 10 (back to original)</div>
              <div>XOR encryption: encrypted = data ^ key</div>
              <div>decrypted = encrypted ^ key = data</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Fast Multiplication/Division</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Left shift multiplies by powers of 2. Right shift divides by powers of 2. Faster than multiplication on many processors.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>x &lt;&lt; 1 = x × 2</div>
              <div>x &lt;&lt; 3 = x × 8</div>
              <div>x &gt;&gt; 1 = x ÷ 2 (floor)</div>
              <div>x &gt;&gt; 4 = x ÷ 16 (floor)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: AND Operation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Calculate 12 AND 10
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>12 in binary: 1100</div>
              <div>10 in binary: 1010</div>
              <div>Bit-by-bit AND:</div>
              <div>1 AND 1 = 1</div>
              <div>1 AND 0 = 0</div>
              <div>0 AND 1 = 0</div>
              <div>0 AND 0 = 0</div>
              <div>Result: 1000 = 8</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: OR Operation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Calculate 12 OR 10
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>12 in binary: 1100</div>
              <div>10 in binary: 1010</div>
              <div>Bit-by-bit OR:</div>
              <div>1 OR 1 = 1</div>
              <div>1 OR 0 = 1</div>
              <div>0 OR 1 = 1</div>
              <div>0 OR 0 = 0</div>
              <div>Result: 1110 = 14</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: XOR Operation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Calculate 12 XOR 10
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>12 in binary: 1100</div>
              <div>10 in binary: 1010</div>
              <div>Bit-by-bit XOR:</div>
              <div>1 XOR 1 = 0 (same)</div>
              <div>1 XOR 0 = 1 (different)</div>
              <div>0 XOR 1 = 1 (different)</div>
              <div>0 XOR 0 = 0 (same)</div>
              <div>Result: 0110 = 6</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Left Shift</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Calculate 5 left-shifted by 2
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>5 in binary: 000101</div>
              <div>Shift left by 2 positions:</div>
              <div>000101 {'<<'} 2 = 010100</div>
              <div>010100 = 16 + 4 = 20</div>
              <div>Verification: 5 × 2^2 = 5 × 4 = 20 ✓</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Right Shift</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Calculate 20 right-shifted by 2
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>20 in binary: 010100</div>
              <div>Shift right by 2 positions:</div>
              <div>010100 {'>>'} 2 = 000101</div>
              <div>000101 = 4 + 1 = 5</div>
              <div>Verification: floor(20 / 2^2) = floor(20/4) = 5 ✓</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 6: NOT Operation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Calculate NOT 42
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>42 in binary (8-bit): 00101010</div>
              <div>Invert all bits: 11010101</div>
              <div>In two's complement, this equals -43</div>
              <div>Rule: ~x = -(x + 1)</div>
              <div>~42 = -(42 + 1) = -43 ✓</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Quick Fact</h3>
          <p className="text-sm text-muted-foreground">
            The XOR operation has a unique property: it's its own inverse. If A XOR B = C, then C XOR B = A. This makes XOR the basis of simple symmetric encryption and is why XOR appears in RAID data recovery, error correction codes, and cryptographic algorithms.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between bitwise and logical operators?</h4>
            <p className="text-sm text-muted-foreground">
              Bitwise operators (&, |, ~, ^) work on each bit of a number. Logical operators (&&, ||, !) work on boolean true/false values. For example, 5 & 3 = 1 (bitwise), but 5 && 3 = true (logical). Use bitwise for number manipulation, logical for conditions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does NOT 42 equal -43?</h4>
            <p className="text-sm text-muted-foreground">
              Computers use two's complement for negative numbers. Inverting all bits of a positive number and adding 1 gives its negative. So ~x = -(x+1). For 42: flip all bits of 00101010 to get 11010101, which represents -43 in two's complement.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I use XOR?</h4>
            <p className="text-sm text-muted-foreground">
              XOR is great for toggling (flip bits where mask has 1s), comparing (result is 0 if values are equal), and simple encryption. It's also used in graphics for XOR cursors that invert whatever they're drawn over, and in checksums for error detection.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What happens with negative numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Negative numbers use two&apos;s complement representation. Bitwise operations work the same way on the bit patterns. Right shift ({'>>'}) preserves the sign bit (arithmetic shift), so negative numbers stay negative. Left shift can overflow and change the sign.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I check if a specific bit is set?</h4>
            <p className="text-sm text-muted-foreground">
              Use AND with a mask that has 1 only at the bit position you care about. To check bit 3 (value 8 or 1000 in binary): if (number & 8) !== 0, then bit 3 is set. For bit n, use (number & (1 {'<<'} n)) !== 0.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What&apos;s the difference between {">>"} and {">>>"}?</h4>
            <p className="text-sm text-muted-foreground">
              {'>>'} is arithmetic right shift – it preserves the sign bit, so negative numbers stay negative. {'>>>'} is logical right shift – it always fills with 0, treating the number as unsigned. In JavaScript, {'>>>'} converts to unsigned 32-bit.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Are bitwise operations faster than regular math?</h4>
            <p className="text-sm text-muted-foreground">
              On most modern processors, bitwise operations are extremely fast – often a single CPU cycle. Shifts can be faster than multiplication/division. However, modern compilers often optimize multiplication by powers of 2 into shifts automatically, so manual optimization is rarely necessary in high-level code.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
