"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const examples = [
  { number: "100", mode: "base-10", customBase: "", label: "log₁₀(100)" },
  { number: "1000", mode: "base-10", customBase: "", label: "log₁₀(1000)" },
  { number: "8", mode: "base-2", customBase: "", label: "log₂(8)" },
  { number: "2.718", mode: "natural", customBase: "", label: "ln(e)" },
  { number: "27", mode: "custom", customBase: "3", label: "log₃(27)" },
  { number: "0.01", mode: "base-10", customBase: "", label: "log₁₀(0.01)" },
  { number: "32", mode: "base-2", customBase: "", label: "log₂(32)" },
];

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

  const loadExample = (exampleIndex: number) => {
    const ex = examples[exampleIndex];
    setNumber(ex.number);
    setMode(ex.mode as typeof mode);
    setCustomBase(ex.customBase);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculateLog}>Calculate Log</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          {examples.map((ex, i) => (
            <Button key={i} variant="ghost" size="sm" onClick={() => loadExample(i)}>
              {ex.label}
            </Button>
          ))}
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Logarithms</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            A logarithm answers the question: "To what power must I raise the base to get this number?" For example, log₁₀(100) = 2 because 10² = 100. Logarithms are the inverse operation of exponentiation, just as division is the inverse of multiplication.
          </p>
          <p className="text-muted-foreground">
            The notation log_b(x) = y means b^y = x. Three bases are especially common: base 10 (common log, used in science and engineering), base e (natural log, used in calculus and growth models), and base 2 (binary log, used in computer science).
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Logarithm Properties</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Product Rule</h4>
            <div className="font-mono text-sm bg-muted p-2 rounded mb-2">log_b(xy) = log_b(x) + log_b(y)</div>
            <p className="text-xs text-muted-foreground">The log of a product equals the sum of the logs</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Quotient Rule</h4>
            <div className="font-mono text-sm bg-muted p-2 rounded mb-2">log_b(x/y) = log_b(x) - log_b(y)</div>
            <p className="text-xs text-muted-foreground">The log of a quotient equals the difference of the logs</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Power Rule</h4>
            <div className="font-mono text-sm bg-muted p-2 rounded mb-2">log_b(x^n) = n × log_b(x)</div>
            <p className="text-xs text-muted-foreground">The log of a power brings the exponent down as a multiplier</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Change of Base</h4>
            <div className="font-mono text-sm bg-muted p-2 rounded mb-2">log_b(x) = log_c(x) / log_c(b)</div>
            <p className="text-xs text-muted-foreground">Convert any log to a different base</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Common Logarithm</h4>
            <p className="text-sm text-muted-foreground mb-3">Find log₁₀(1000)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Question: 10 raised to what power equals 1000?</div>
              <div>10¹ = 10</div>
              <div>10² = 100</div>
              <div>10³ = 1000 ✓</div>
              <div className="pt-2 font-semibold">Answer: log₁₀(1000) = 3</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Natural Logarithm</h4>
            <p className="text-sm text-muted-foreground mb-3">Find ln(e⁵)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>By definition, ln(x) = logₑ(x)</div>
              <div>ln(e⁵) asks: e raised to what power equals e⁵?</div>
              <div>Answer is clearly 5</div>
              <div className="pt-2 font-semibold">Answer: ln(e⁵) = 5</div>
              <div className="text-xs text-muted-foreground">General rule: ln(e^x) = x</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Binary Logarithm</h4>
            <p className="text-sm text-muted-foreground mb-3">Find log₂(64)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Question: 2 raised to what power equals 64?</div>
              <div>2¹ = 2, 2² = 4, 2³ = 8, 2⁴ = 16, 2⁵ = 32, 2⁶ = 64 ✓</div>
              <div className="pt-2 font-semibold">Answer: log₂(64) = 6</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Custom Base</h4>
            <p className="text-sm text-muted-foreground mb-3">Find log₃(81)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Question: 3 raised to what power equals 81?</div>
              <div>3¹ = 3, 3² = 9, 3³ = 27, 3⁴ = 81 ✓</div>
              <div>Or using change of base: log₃(81) = ln(81)/ln(3) = 4.394/1.099 = 4</div>
              <div className="pt-2 font-semibold">Answer: log₃(81) = 4</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Log of a Decimal</h4>
            <p className="text-sm text-muted-foreground mb-3">Find log₁₀(0.01)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>0.01 = 1/100 = 10⁻²</div>
              <div>So log₁₀(0.01) = log₁₀(10⁻²) = -2</div>
              <div className="pt-2 font-semibold">Answer: log₁₀(0.01) = -2</div>
              <div className="text-xs text-muted-foreground">Logs of numbers between 0 and 1 are negative</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-sm">
            John Napier invented logarithms in 1614 to simplify astronomical calculations. Before calculators, scientists used log tables to turn multiplication into addition. The slide rule, based on logarithmic scales, was the primary calculation tool for engineers until electronic calculators arrived in the 1970s.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why can't I take the log of a negative number?</h4>
            <p className="text-sm text-muted-foreground">
              No real number raised to any power gives a negative result. For example, there's no power you can raise 10 to that equals -100. (In complex numbers, logs of negatives exist, but that's advanced mathematics.)
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between log and ln?</h4>
            <p className="text-sm text-muted-foreground">
              "log" without a base usually means log₁₀ (base 10). "ln" always means logₑ (base e, where e ≈ 2.718). In higher mathematics, "log" sometimes means natural log – context matters.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is log(1)?</h4>
            <p className="text-sm text-muted-foreground">
              log_b(1) = 0 for any valid base b. This is because any number raised to the power 0 equals 1. So log₁₀(1) = 0, ln(1) = 0, log₂(1) = 0, etc.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Where are logarithms used in real life?</h4>
            <p className="text-sm text-muted-foreground">
              Logarithms appear everywhere: pH scale (acidity), Richter scale (earthquakes), decibels (sound), musical intervals, compound interest calculations, population growth models, and data compression algorithms.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's special about base e?</h4>
            <p className="text-sm text-muted-foreground">
              The number e (≈2.718) is the base for natural growth. Functions like e^x have the unique property that their derivative equals themselves. This makes natural logs essential in calculus, physics, and modeling continuous growth or decay.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate log without a calculator?</h4>
            <p className="text-sm text-muted-foreground">
              For simple cases, think about powers: log₁₀(1000) = 3 because 10³ = 1000. For other values, use log tables or the change-of-base formula with known values. Memorize key values like log₁₀(2) ≈ 0.301 and log₁₀(3) ≈ 0.477.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
