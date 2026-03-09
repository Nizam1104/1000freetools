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

  const examples = [
    { name: "Mod Addition", op: "add" as const, a: "17", b: "23", m: "5" },
    { name: "Mod Subtraction", op: "subtract" as const, a: "15", b: "8", m: "7" },
    { name: "Mod Multiplication", op: "multiply" as const, a: "12", b: "15", m: "7" },
    { name: "Mod Exponentiation", op: "power" as const, a: "3", b: "5", m: "7" },
    { name: "Large Numbers", op: "multiply" as const, a: "1234", b: "5678", m: "100" },
    { name: "Clock Math", op: "add" as const, a: "9", b: "5", m: "12" },
    { name: "Crypto Example", op: "power" as const, a: "7", b: "13", m: "17" }
  ];

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
        steps.push(`${numA % m} x ${numB % m} = ${(numA % m) * (numB % m)}`);
        steps.push(``);
        steps.push(`Step 3: Take result mod ${m}`);
        steps.push(`${(numA % m) * (numB % m)} mod ${m} = ${calcResult}`);
      } else {
        calcResult = modularExponentiation(numA, numB, m);
        steps.push(`Step 1: Use modular exponentiation`);
        steps.push(`Calculate ${numA}^${numB} mod ${m}`);
        steps.push(``);
        steps.push(`Step 2: Apply repeated squaring`);
        steps.push(`${numA}^${numB} mod ${m} = ${calcResult}`);
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

  const loadExample = (index: number) => {
    const ex = examples[index];
    setOperation(ex.op);
    setA(ex.a);
    setB(ex.b);
    setModulus(ex.m);
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
        <div className="space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Label>Operation:</Label>
            <Select value={operation} onValueChange={(v) => {
              setOperation(v as typeof operation);
              setResult(null);
              setError("");
            }}>
              <SelectTrigger className="w-52">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Addition (a + b mod m)</SelectItem>
                <SelectItem value="subtract">Subtraction (a - b mod m)</SelectItem>
                <SelectItem value="multiply">Multiplication (a x b mod m)</SelectItem>
                <SelectItem value="power">Exponentiation (a^b mod m)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Examples:</span>
            {examples.map((ex, idx) => (
              <Button key={idx} variant="outline" size="sm" onClick={() => loadExample(idx)}>{ex.name}</Button>
            ))}
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
                  {operation === 'power' ? `${a}^${b}` : `${a} ${operation === 'add' ? '+' : operation === 'subtract' ? '-' : 'x'} ${b}`} mod {modulus} = {result.result}
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
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Modular Arithmetic</h2>
        <p className="text-muted-foreground">
          Modular arithmetic is "clock math" – arithmetic that wraps around after reaching a certain value called the modulus. Just like a 12-hour clock wraps from 12 back to 1, modular arithmetic wraps numbers back to 0 after reaching the modulus.
        </p>
        <p className="text-muted-foreground">
          We write "a mod m" or "a (mod m)" to mean the remainder when a is divided by m. For example, 17 mod 5 = 2 because 17 = 3 x 5 + 2. This simple concept powers modern cryptography, computer science, and number theory.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Modular Operations</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Addition & Subtraction</h4>
            <code className="text-sm font-mono block">(a + b) mod m = ((a mod m) + (b mod m)) mod m</code>
            <p className="text-xs text-muted-foreground mt-2">Reduce first, then operate, then reduce again</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Multiplication</h4>
            <code className="text-sm font-mono block">(a x b) mod m = ((a mod m) x (b mod m)) mod m</code>
            <p className="text-xs text-muted-foreground mt-2">Same pattern as addition</p>
          </div>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Modular Exponentiation</h4>
          <p className="text-sm text-muted-foreground mb-2">
            For a^b mod m, use repeated squaring to avoid huge intermediate numbers:
          </p>
          <code className="text-sm font-mono block">
            a^b mod m = ((a mod m)^b) mod m
          </code>
          <p className="text-xs text-muted-foreground mt-2">Essential for RSA encryption!</p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Clock Addition</h4>
            <div className="font-mono text-sm space-y-2">
              <div>What time is 9 + 5 hours on a 12-hour clock?</div>
              <div>(9 + 5) mod 12 = 14 mod 12 = 2</div>
              <div>Answer: 2 o'clock</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Modular Multiplication</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Calculate (12 x 15) mod 7</div>
              <div>12 mod 7 = 5, 15 mod 7 = 1</div>
              <div>(5 x 1) mod 7 = 5</div>
              <div>Verify: 180 mod 7 = 5 ✓</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Negative Result</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Calculate (3 - 8) mod 5</div>
              <div>3 - 8 = -5</div>
              <div>-5 mod 5 = 0 (add 5 until positive)</div>
              <div>Or: (3 mod 5 - 8 mod 5 + 5) mod 5 = (3 - 3 + 5) mod 5 = 0</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Modular Exponentiation</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Calculate 3^5 mod 7</div>
              <div>3^1 mod 7 = 3</div>
              <div>3^2 mod 7 = 9 mod 7 = 2</div>
              <div>3^4 mod 7 = 2^2 mod 7 = 4</div>
              <div>3^5 = 3^4 x 3^1 = 4 x 3 = 12 mod 7 = 5</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm">
            Modular arithmetic is the foundation of RSA encryption, which secures most internet communications. When you see the padlock icon in your browser, modular exponentiation with huge prime numbers is protecting your data. The security relies on the fact that modular exponentiation is easy, but reversing it (finding discrete logarithms) is computationally infeasible.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is modular arithmetic useful?</h4>
            <p className="text-sm text-muted-foreground">
              Beyond cryptography, modular arithmetic appears in checksums (ISBN numbers, credit cards), hash functions, random number generation, calendar calculations, and music theory (pitch classes form Z₁₂).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the modulus be negative?</h4>
            <p className="text-sm text-muted-foreground">
              By convention, the modulus is always positive. If you encounter negative moduli in programming, the behavior varies by language. Mathematically, we always use positive moduli.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does "congruent modulo m" mean?</h4>
            <p className="text-sm text-muted-foreground">
              Two numbers are congruent mod m if they have the same remainder when divided by m. We write a ≡ b (mod m). For example, 17 ≡ 5 (mod 12) because both leave remainder 5.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I handle negative numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Add the modulus until you get a positive result. For example, -3 mod 7 = (-3 + 7) mod 7 = 4. In programming, some languages return negative remainders – add m to normalize.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is Fermat's Little Theorem?</h4>
            <p className="text-sm text-muted-foreground">
              If p is prime and a is not divisible by p, then a^(p-1) ≡ 1 (mod p). This powerful theorem simplifies modular exponentiation and is key to primality testing and RSA.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I divide in modular arithmetic?</h4>
            <p className="text-sm text-muted-foreground">
              Division means multiplying by the modular inverse. The inverse of a mod m exists only when gcd(a,m) = 1. For prime moduli, every non-zero element has an inverse.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
