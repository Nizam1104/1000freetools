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

  const loadExample = () => {
    if (operation === "and") {
      setNum1("12");
      setNum2("10");
    } else if (operation === "or") {
      setNum1("12");
      setNum2("10");
    } else if (operation === "xor") {
      setNum1("12");
      setNum2("10");
    } else if (operation === "not") {
      setNum1("42");
      setNum2("");
    } else if (operation === "lshift") {
      setNum1("5");
      setNum2("2");
    } else {
      setNum1("20");
      setNum2("2");
    }
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
        <div className="flex items-center gap-4">
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
          <Button variant="outline" size="sm" onClick={loadExample}>Load Example</Button>
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

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Bitwise Operations</h2>
        <p className="text-muted-foreground">
          Bitwise operations work on individual bits of binary numbers. They're fundamental to low-level programming, used in graphics, cryptography, data compression, and hardware control.
        </p>
        <p className="text-muted-foreground">
          Unlike regular arithmetic, bitwise operations process each bit position independently, making them extremely fast on modern processors.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Bitwise Operators</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Logical Operators</h3>
            <ul className="space-y-2 text-sm font-mono">
              <li><strong>AND (&)</strong>: 1 only if both bits are 1</li>
              <li><strong>OR (|)</strong>: 1 if either bit is 1</li>
              <li><strong>XOR (^)</strong>: 1 if bits differ</li>
              <li><strong>NOT (~)</strong>: Inverts all bits</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Shift Operators</h3>
            <ul className="space-y-2 text-sm font-mono">
              <li><strong>&lt;&lt; Left</strong>: Multiply by 2^n</li>
              <li><strong>&gt;&gt; Right</strong>: Divide by 2^n</li>
              <li><strong>&gt;&gt;&gt; Unsigned</strong>: Right shift with zero fill</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Truth Tables</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2 text-center">AND</h3>
            <table className="w-full text-sm">
              <tr className="border-b"><td>A</td><td>B</td><td>A&B</td></tr>
              <tr><td>0</td><td>0</td><td>0</td></tr>
              <tr><td>0</td><td>1</td><td>0</td></tr>
              <tr><td>1</td><td>0</td><td>0</td></tr>
              <tr><td>1</td><td>1</td><td>1</td></tr>
            </table>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2 text-center">OR</h3>
            <table className="w-full text-sm">
              <tr className="border-b"><td>A</td><td>B</td><td>A|B</td></tr>
              <tr><td>0</td><td>0</td><td>0</td></tr>
              <tr><td>0</td><td>1</td><td>1</td></tr>
              <tr><td>1</td><td>0</td><td>1</td></tr>
              <tr><td>1</td><td>1</td><td>1</td></tr>
            </table>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2 text-center">XOR</h3>
            <table className="w-full text-sm">
              <tr className="border-b"><td>A</td><td>B</td><td>A^B</td></tr>
              <tr><td>0</td><td>0</td><td>0</td></tr>
              <tr><td>0</td><td>1</td><td>1</td></tr>
              <tr><td>1</td><td>0</td><td>1</td></tr>
              <tr><td>1</td><td>1</td><td>0</td></tr>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Uses</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Programming Applications</h3>
            <ul className="space-y-1 text-sm">
              <li>• Setting/clearing/checking flags</li>
              <li>• Bit masks for permissions</li>
              <li>• Fast multiplication/division by powers of 2</li>
              <li>• Swapping variables without temp</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Real-World Examples</h3>
            <ul className="space-y-1 text-sm">
              <li>• Graphics (alpha blending, color manipulation)</li>
              <li>• Cryptography (encryption algorithms)</li>
              <li>• Error detection (checksums, CRC)</li>
              <li>• Data compression</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between & and &&?</h3>
            <p className="text-sm text-muted-foreground">
              & is bitwise AND (operates on bits), while && is logical AND (operates on boolean values). Use & for bit manipulation, && for conditions.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How does XOR swap work?</h3>
            <p className="text-sm text-muted-foreground">
              a = a ^ b; b = a ^ b; a = a ^ b; swaps two variables without a temporary. Each XOR with the same value twice cancels out.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why use shifts instead of multiply/divide?</h3>
            <p className="text-sm text-muted-foreground">
              Shifts are faster than multiplication/division on most processors. Left shift by n equals multiply by 2^n, right shift equals divide by 2^n.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/number-base-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Number Base Converter</p>
            <p className="text-xs text-muted-foreground">Binary, hex, octal</p>
          </a>
          <a href="/math-tools/twos-complement-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Two's Complement</p>
            <p className="text-xs text-muted-foreground">Signed binary</p>
          </a>
          <a href="/math-tools/binary-arithmetic-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Binary Arithmetic</p>
            <p className="text-xs text-muted-foreground">Binary math</p>
          </a>
        </div>
      </section>
    </div>
  );
}
