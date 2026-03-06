"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LogarithmCalculator() {
  const [mode, setMode] = useState<"base-10" | "natural" | "base-2" | "custom">("base-10");
  const [number, setNumber] = useState("");
  const [customBase, setCustomBase] = useState("");
  const [result, setResult] = useState<{
    value: number;
    formula: string;
    explanation: string;
  } | null>(null);
  const [error, setError] = useState("");

  const calculateLog = () => {
    const num = parseFloat(number);

    if (isNaN(num) || num <= 0) {
      setError("Please enter a positive number greater than 0");
      setResult(null);
      return;
    }

    if (mode === "custom") {
      const base = parseFloat(customBase);
      if (isNaN(base) || base <= 0 || base === 1) {
        setError("Base must be positive and not equal to 1");
        setResult(null);
        return;
      }
    }

    setError("");
    let logValue: number;
    let formula: string;
    let explanation: string;

    if (mode === "base-10") {
      logValue = Math.log10(num);
      formula = `log₁₀(${num}) = ${logValue.toFixed(6)}`;
      explanation = "Log base 10 (common logarithm) – the power to which 10 must be raised to get the number";
    } else if (mode === "natural") {
      logValue = Math.log(num);
      formula = `ln(${num}) = logₑ(${num}) = ${logValue.toFixed(6)}`;
      explanation = "Natural logarithm (ln) – the power to which e (≈2.718) must be raised to get the number";
    } else if (mode === "base-2") {
      logValue = Math.log2(num);
      formula = `log₂(${num}) = ${logValue.toFixed(6)}`;
      explanation = "Log base 2 (binary logarithm) – the power to which 2 must be raised to get the number";
    } else {
      const base = parseFloat(customBase);
      logValue = Math.log(num) / Math.log(base);
      formula = `log${base}(${num}) = ${logValue.toFixed(6)}`;
      explanation = `Log base ${base} – the power to which ${base} must be raised to get ${num}`;
    }

    setResult({
      value: Math.round(logValue * 1000000) / 1000000,
      formula,
      explanation,
    });
  };

  const reset = () => {
    setNumber("");
    setCustomBase("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Logarithm Calculator – Compute Log of Any Base Online</h1>
        <p className="text-muted-foreground">
          Calculate logarithms of any number for any base with our free online logarithm calculator. Supports log base 10, natural log (ln), and custom base logarithms with instant results.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Logarithm Type</Label>
          <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="base-10">Log Base 10 (Common Log)</SelectItem>
              <SelectItem value="natural">Natural Log (ln)</SelectItem>
              <SelectItem value="base-2">Log Base 2 (Binary Log)</SelectItem>
              <SelectItem value="custom">Custom Base</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Number</Label>
          <Input
            type="number"
            placeholder="Enter a positive number (e.g., 100)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        {mode === "custom" && (
          <div>
            <Label>Base</Label>
            <Input
              type="number"
              placeholder="Enter base (e.g., 3)"
              value={customBase}
              onChange={(e) => setCustomBase(e.target.value)}
            />
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={calculateLog}>Calculate Log</Button>
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
              <p className="text-sm text-muted-foreground mb-2">{result.explanation}</p>
              <p className="text-5xl font-bold">{result.value}</p>
              <p className="text-sm text-muted-foreground mt-2 font-mono">{result.formula}</p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Logarithms</h2>
        <p className="text-muted-foreground">
          A logarithm answers the question: "To what power must I raise the base to get this number?" For example, log₁₀(100) = 2 because 10² = 100.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Common Logarithm (log₁₀)</h3>
            <p className="text-sm text-muted-foreground">
              Base 10 logarithms are used in science and engineering. The Richter scale for earthquakes and pH scale for acidity both use log₁₀.
            </p>
            <p className="text-xs font-mono mt-2">log₁₀(1000) = 3 because 10³ = 1000</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Natural Logarithm (ln)</h3>
            <p className="text-sm text-muted-foreground">
              Base e (≈2.718) logarithms appear in calculus, population growth models, and compound interest calculations.
            </p>
            <p className="text-xs font-mono mt-2">ln(e²) = 2 because e² = e²</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Binary Logarithm (log₂)</h3>
            <p className="text-sm text-muted-foreground">
              Base 2 logarithms are essential in computer science for analyzing algorithms and data structures.
            </p>
            <p className="text-xs font-mono mt-2">log₂(256) = 8 because 2⁸ = 256</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Custom Base</h3>
            <p className="text-sm text-muted-foreground">
              Any positive base (except 1) works. Use the change of base formula: logᵦ(x) = ln(x) / ln(b).
            </p>
            <p className="text-xs font-mono mt-2">log₃(81) = 4 because 3⁴ = 81</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Logarithm Examples</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">log₁₀(1000)</p>
            <p className="text-sm font-mono">10³ = 1000, so log₁₀(1000) = 3</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">ln(7.389)</p>
            <p className="text-sm font-mono">e² ≈ 7.389, so ln(7.389) ≈ 2</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">log₂(64)</p>
            <p className="text-sm font-mono">2⁶ = 64, so log₂(64) = 6</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">log₅(125)</p>
            <p className="text-sm font-mono">5³ = 125, so log₅(125) = 3</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Key Logarithm Properties</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Product Rule</h3>
            <p className="text-xs font-mono">logᵦ(xy) = logᵦ(x) + logᵦ(y)</p>
            <p className="text-xs text-muted-foreground mt-1">log(10 × 100) = log(10) + log(100) = 1 + 2 = 3</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Quotient Rule</h3>
            <p className="text-xs font-mono">logᵦ(x/y) = logᵦ(x) - logᵦ(y)</p>
            <p className="text-xs text-muted-foreground mt-1">log(1000/10) = log(1000) - log(10) = 3 - 1 = 2</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Power Rule</h3>
            <p className="text-xs font-mono">logᵦ(xⁿ) = n × logᵦ(x)</p>
            <p className="text-xs text-muted-foreground mt-1">log(100³) = 3 × log(100) = 3 × 2 = 6</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Change of Base</h3>
            <p className="text-xs font-mono">logᵦ(x) = logₖ(x) / logₖ(b)</p>
            <p className="text-xs text-muted-foreground mt-1">log₃(9) = log(9) / log(3) = 2</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What is a logarithm?</h3>
          <p className="text-sm text-muted-foreground">
            A logarithm is the inverse operation of exponentiation. It tells you what exponent you need to raise a base to get a specific number. If bʸ = x, then logᵦ(x) = y.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is the difference between log and ln?</h3>
          <p className="text-sm text-muted-foreground">
            "log" typically means log base 10 (common logarithm), while "ln" means log base e (natural logarithm). The natural logarithm uses Euler's number e ≈ 2.71828.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can you take the log of a negative number?</h3>
          <p className="text-sm text-muted-foreground">
            No, logarithms are only defined for positive real numbers. There's no real exponent that makes a positive base equal to a negative number.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is log base 1 of a number?</h3>
          <p className="text-sm text-muted-foreground">
            Log base 1 is undefined. Since 1 raised to any power always equals 1, there's no unique solution for log₁(x) when x ≠ 1.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Where are logarithms used in real life?</h3>
          <p className="text-sm text-muted-foreground">
            Logarithms appear in earthquake magnitude (Richter scale), sound intensity (decibels), acidity (pH), star brightness, and data compression algorithms.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/antilogarithm-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Antilogarithm Calculator</p>
            <p className="text-xs text-muted-foreground">Find inverse of logarithm</p>
          </a>
          <a href="/math-tools/exponent-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Exponent Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate powers</p>
          </a>
          <a href="/math-tools/scientific-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Scientific Calculator</p>
            <p className="text-xs text-muted-foreground">Advanced calculations</p>
          </a>
        </div>
      </section>
    </div>
  );
}
