"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ModularArithmeticCalculator() {
  const [operation, setOperation] = useState<"add" | "subtract" | "multiply" | "power">("add");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [modulus, setModulus] = useState("");
  const [result, setResult] = useState<{
    result: number;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const numA = parseInt(a);
    const numB = parseInt(b);
    const m = parseInt(modulus);

    if (isNaN(numA) || isNaN(numB) || isNaN(m)) {
      setError("Please enter valid integers for all fields");
      return;
    }

    if (m <= 0) {
      setError("Modulus must be a positive integer");
      return;
    }

    try {
      let calcResult: number;
      const steps: string[] = [];

      steps.push(`Modular ${operation === 'add' ? 'Addition' : operation === 'subtract' ? 'Subtraction' : operation === 'multiply' ? 'Multiplication' : 'Exponentiation'}`);
      steps.push(``);
      steps.push(`Given: a = ${numA}, b = ${numB}, m = ${m}`);
      steps.push(``);

      if (operation === "add") {
        calcResult = ((numA % m) + (numB % m)) % m;
        steps.push(`Step 1: Reduce each number mod ${m}`);
        steps.push(`${numA} mod ${m} = ${numA % m}`);
        steps.push(`${numB} mod ${m} = ${numB % m}`);
        steps.push(``);
        steps.push(`Step 2: Add the reduced values`);
        steps.push(`${numA % m} + ${numB % m} = ${(numA % m) + (numB % m)}`);
        steps.push(``);
        steps.push(`Step 3: Take result mod ${m}`);
        steps.push(`${(numA % m) + (numB % m)} mod ${m} = ${calcResult}`);
      } else if (operation === "subtract") {
        calcResult = ((numA % m) - (numB % m) + m) % m;
        steps.push(`Step 1: Reduce each number mod ${m}`);
        steps.push(`${numA} mod ${m} = ${numA % m}`);
        steps.push(`${numB} mod ${m} = ${numB % m}`);
        steps.push(``);
        steps.push(`Step 2: Subtract (add m if negative)`);
        steps.push(`${numA % m} - ${numB % m} = ${(numA % m) - (numB % m)}`);
        steps.push(``);
        steps.push(`Step 3: Take result mod ${m}`);
        steps.push(`${(numA % m) - (numB % m)} mod ${m} = ${calcResult}`);
      } else if (operation === "multiply") {
        calcResult = ((numA % m) * (numB % m)) % m;
        steps.push(`Step 1: Reduce each number mod ${m}`);
        steps.push(`${numA} mod ${m} = ${numA % m}`);
        steps.push(`${numB} mod ${m} = ${numB % m}`);
        steps.push(``);
        steps.push(`Step 2: Multiply the reduced values`);
        steps.push(`${numA % m} × ${numB % m} = ${(numA % m) * (numB % m)}`);
        steps.push(``);
        steps.push(`Step 3: Take result mod ${m}`);
        steps.push(`${(numA % m) * (numB % m)} mod ${m} = ${calcResult}`);
      } else {
        // Power operation: a^b mod m
        calcResult = modularExponentiation(numA, numB, m);
        steps.push(`Step 1: Use modular exponentiation`);
        steps.push(`Calculate ${numA}^${numB} mod ${m}`);
        steps.push(``);
        steps.push(`Step 2: Apply repeated squaring`);
        steps.push(`${numA}^${numB} mod ${m} = ${calcResult}`);
        steps.push(``);
        steps.push(`Verification: ${numA}^${numB} = ${Math.pow(numA, numB)}, ${Math.pow(numA, numB)} mod ${m} = ${calcResult}`);
      }

      setResult({
        result: calcResult,
        steps
      });
    } catch (e) {
      setError("Unable to calculate. Please check your inputs.");
    }
  };

  const modularExponentiation = (base: number, exp: number, mod: number): number => {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) {
        result = (result * base) % mod;
      }
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
    }
    return result;
  };

  const reset = () => {
    setA("");
    setB("");
    setModulus("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    if (operation === "add") {
      setA("17");
      setB("23");
      setModulus("5");
    } else if (operation === "subtract") {
      setA("15");
      setB("8");
      setModulus("7");
    } else if (operation === "multiply") {
      setA("12");
      setB("15");
      setModulus("7");
    } else {
      setA("3");
      setB("5");
      setModulus("7");
    }
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Modular Arithmetic Calculator – Compute mod n Operations</h1>
        <p className="text-muted-foreground">
          Perform modular arithmetic operations including addition, subtraction, multiplication, and exponentiation under any modulus with our free online calculator. Essential for cryptography and number theory.
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
              <SelectItem value="add">Addition (a + b mod m)</SelectItem>
              <SelectItem value="subtract">Subtraction (a - b mod m)</SelectItem>
              <SelectItem value="multiply">Multiplication (a × b mod m)</SelectItem>
              <SelectItem value="power">Exponentiation (a^b mod m)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={loadExample}>Load Example</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>First Number (a):</Label>
            <Input
              type="number"
              placeholder="e.g., 17"
              value={a}
              onChange={(e) => setA(e.target.value)}
            />
          </div>
          <div>
            <Label>{operation === 'power' ? 'Exponent (b)' : 'Second Number (b):'}</Label>
            <Input
              type="number"
              placeholder={operation === 'power' ? "e.g., 5" : "e.g., 23"}
              value={b}
              onChange={(e) => setB(e.target.value)}
            />
          </div>
          <div>
            <Label>Modulus (m):</Label>
            <Input
              type="number"
              placeholder="e.g., 7"
              value={modulus}
              onChange={(e) => setModulus(e.target.value)}
            />
          </div>
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
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Result</p>
              <p className="text-4xl font-bold font-mono">
                {operation === 'power' ? `${a}^${b}` : `${a} ${operation === 'add' ? '+' : operation === 'subtract' ? '-' : '×'} ${b}`} mod {modulus} = {result.result}
              </p>
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
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Modular Arithmetic</h2>
        <p className="text-muted-foreground">
          Modular arithmetic is a system of arithmetic for integers where numbers "wrap around" after reaching a certain value called the modulus. It's often called "clock arithmetic" because a 12-hour clock uses mod 12 arithmetic.
        </p>
        <p className="text-muted-foreground">
          In modular arithmetic, we're interested in remainders. Two numbers are congruent mod m if they have the same remainder when divided by m.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Modular Arithmetic Properties</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Basic Properties</h3>
            <ul className="space-y-2 text-sm font-mono">
              <li>(a + b) mod m = ((a mod m) + (b mod m)) mod m</li>
              <li>(a - b) mod m = ((a mod m) - (b mod m) + m) mod m</li>
              <li>(a × b) mod m = ((a mod m) × (b mod m)) mod m</li>
              <li>a^b mod m = (a mod m)^b mod m</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Applications</h3>
            <ul className="space-y-2 text-sm">
              <li>• Cryptography (RSA, Diffie-Hellman)</li>
              <li>• Computer science (hash functions)</li>
              <li>• Checksums and error detection</li>
              <li>• Calendar calculations</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Examples</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example 1: Modular Addition</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Calculate (17 + 23) mod 5
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              17 mod 5 = 2<br/>
              23 mod 5 = 3<br/>
              (2 + 3) mod 5 = 5 mod 5 = 0
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example 2: Modular Multiplication</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Calculate (12 × 15) mod 7
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              12 mod 7 = 5<br/>
              15 mod 7 = 1<br/>
              (5 × 1) mod 7 = 5
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example 3: Modular Exponentiation</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Calculate 3^5 mod 7
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              3^5 = 243<br/>
              243 mod 7 = 5
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is modular arithmetic?</h3>
            <p className="text-sm text-muted-foreground">
              Modular arithmetic is arithmetic with remainders. When we say "a mod m", we mean the remainder when a is divided by m. It's like a clock that wraps around after reaching a certain value.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why is modular exponentiation important?</h3>
            <p className="text-sm text-muted-foreground">
              Modular exponentiation is the foundation of modern cryptography. RSA encryption relies on the fact that a^b mod m is easy to compute, but finding b given a, m, and the result is extremely hard.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can the result be negative?</h3>
            <p className="text-sm text-muted-foreground">
              In mathematics, modular results are typically given as non-negative values from 0 to m-1. If a subtraction gives a negative result, we add m to get the positive equivalent.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/eulers-totient-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Euler's Totient</p>
            <p className="text-xs text-muted-foreground">φ(n) calculator</p>
          </a>
          <a href="/math-tools/modulo-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Modulo Calculator</p>
            <p className="text-xs text-muted-foreground">Basic mod operation</p>
          </a>
          <a href="/math-tools/bitwise-operations-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Bitwise Operations</p>
            <p className="text-xs text-muted-foreground">Binary operations</p>
          </a>
        </div>
      </section>
    </div>
  );
}
