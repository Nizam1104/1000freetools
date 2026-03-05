"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AntilogarithmCalculator() {
  const [mode, setMode] = useState<"base-10" | "natural" | "base-2" | "custom">("base-10");
  const [logValue, setLogValue] = useState("");
  const [customBase, setCustomBase] = useState("");
  const [result, setResult] = useState<{
    value: number;
    formula: string;
    explanation: string;
  } | null>(null);
  const [error, setError] = useState("");

  const calculateAntilog = () => {
    const val = parseFloat(logValue);

    if (isNaN(val)) {
      setError("Please enter a valid number");
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
    let antilogValue: number;
    let formula: string;
    let explanation: string;

    if (mode === "base-10") {
      antilogValue = Math.pow(10, val);
      formula = `antilog₁₀(${val}) = 10^${val} = ${antilogValue.toFixed(6)}`;
      explanation = "Antilog base 10 – raising 10 to the power of the log value";
    } else if (mode === "natural") {
      antilogValue = Math.exp(val);
      formula = `antilogₑ(${val}) = e^${val} = ${antilogValue.toFixed(6)}`;
      explanation = "Natural antilog – raising e (≈2.718) to the power of the log value";
    } else if (mode === "base-2") {
      antilogValue = Math.pow(2, val);
      formula = `antilog₂(${val}) = 2^${val} = ${antilogValue.toFixed(6)}`;
      explanation = "Antilog base 2 – raising 2 to the power of the log value";
    } else {
      const base = parseFloat(customBase);
      antilogValue = Math.pow(base, val);
      formula = `antilog${base}(${val}) = ${base}^${val} = ${antilogValue.toFixed(6)}`;
      explanation = `Antilog base ${base} – raising ${base} to the power of ${val}`;
    }

    setResult({
      value: Math.round(antilogValue * 1000000) / 1000000,
      formula,
      explanation,
    });
  };

  const reset = () => {
    setLogValue("");
    setCustomBase("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Antilogarithm Calculator – Find Antilog of Any Number</h1>
        <p className="text-muted-foreground">
          Calculate the antilogarithm of any value for any base with our free online antilog calculator. Find the inverse of log base 10, natural log, or any custom base instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Antilogarithm Type</Label>
          <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="base-10">Antilog Base 10</SelectItem>
              <SelectItem value="natural">Natural Antilog (eˣ)</SelectItem>
              <SelectItem value="base-2">Antilog Base 2</SelectItem>
              <SelectItem value="custom">Custom Base</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Log Value (x)</Label>
          <Input
            type="number"
            placeholder="Enter log value (e.g., 2)"
            value={logValue}
            onChange={(e) => setLogValue(e.target.value)}
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
          <Button onClick={calculateAntilog}>Calculate Antilog</Button>
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
        <h2 className="text-2xl font-semibold">Understanding Antilogarithms</h2>
        <p className="text-muted-foreground">
          The antilogarithm is the inverse operation of a logarithm. If logᵦ(x) = y, then antilogᵦ(y) = x. In other words, antilog raises the base to the power of the log value.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Common Antilog (10ˣ)</h3>
            <p className="text-sm text-muted-foreground">
              Antilog base 10 reverses the common logarithm. Used to convert from logarithmic scales back to linear values.
            </p>
            <p className="text-xs font-mono mt-2">antilog₁₀(3) = 10³ = 1000</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Natural Antilog (eˣ)</h3>
            <p className="text-sm text-muted-foreground">
              The exponential function eˣ is the inverse of ln(x). Essential in calculus and growth models.
            </p>
            <p className="text-xs font-mono mt-2">antilogₑ(2) = e² ≈ 7.389</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Binary Antilog (2ˣ)</h3>
            <p className="text-sm text-muted-foreground">
              Reverses binary logarithms. Common in computer science for calculating data sizes.
            </p>
            <p className="text-xs font-mono mt-2">antilog₂(8) = 2⁸ = 256</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Custom Base Antilog (bˣ)</h3>
            <p className="text-sm text-muted-foreground">
              Any positive base (except 1) works. Simply raise the base to the power of the log value.
            </p>
            <p className="text-xs font-mono mt-2">antilog₃(4) = 3⁴ = 81</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Antilog Examples</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">antilog₁₀(2)</p>
            <p className="text-sm font-mono">10² = 100</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">antilogₑ(1)</p>
            <p className="text-sm font-mono">e¹ = e ≈ 2.718</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">antilog₂(10)</p>
            <p className="text-sm font-mono">2¹⁰ = 1024</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">antilog₅(3)</p>
            <p className="text-sm font-mono">5³ = 125</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-semibold text-sm mb-1">antilog₁₀(-2)</p>
            <p className="text-sm font-mono">10⁻² = 0.01</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Log and Antilog Relationship</h2>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-3">
            Logarithm and antilogarithm are inverse operations. Applying one after the other returns the original value:
          </p>
          <div className="grid md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-3 bg-background rounded">
              <p className="font-semibold mb-1">Log then Antilog:</p>
              <p>antilog(log(x)) = x</p>
              <p className="text-muted-foreground mt-1">10^(log₁₀(100)) = 10² = 100</p>
            </div>
            <div className="p-3 bg-background rounded">
              <p className="font-semibold mb-1">Antilog then Log:</p>
              <p>log(antilog(y)) = y</p>
              <p className="text-muted-foreground mt-1">log₁₀(10³) = log₁₀(1000) = 3</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What is antilog?</h3>
          <p className="text-sm text-muted-foreground">
            Antilog (antilogarithm) is the inverse of a logarithm. If y = logᵦ(x), then x = antilogᵦ(y) = bʸ. It converts a logarithmic value back to the original number.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How do you calculate antilog?</h3>
          <p className="text-sm text-muted-foreground">
            Raise the base to the power of the log value. For base 10: antilog(x) = 10ˣ. For natural log: antilog(x) = eˣ. For any base b: antilog(x) = bˣ.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is natural antilog?</h3>
          <p className="text-sm text-muted-foreground">
            Natural antilog uses base e (Euler's number ≈ 2.71828). It's written as eˣ or exp(x) and is the inverse of the natural logarithm ln(x).
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can antilog be negative?</h3>
          <p className="text-sm text-muted-foreground">
            The input (log value) can be negative, giving a fractional result. But the output is always positive since any positive base raised to any power gives a positive result.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Where is antilog used?</h3>
          <p className="text-sm text-muted-foreground">
            Antilog converts logarithmic measurements back to linear scale – like converting pH to hydrogen ion concentration, or Richter scale readings to actual earthquake energy.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/logarithm-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Logarithm Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate log of any base</p>
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
