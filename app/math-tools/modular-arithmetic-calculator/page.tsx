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
      </section>
    </div>
  );
}
