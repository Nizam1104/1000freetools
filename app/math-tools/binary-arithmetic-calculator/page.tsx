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

  const loadExample = () => {
    if (operation === "add") {
      setBinary1("1011");
      setBinary2("1101");
    } else {
      setBinary1("1101");
      setBinary2("1011");
    }
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
        <div className="flex items-center gap-4">
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
          <Button variant="outline" size="sm" onClick={loadExample}>Load Example</Button>
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

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
