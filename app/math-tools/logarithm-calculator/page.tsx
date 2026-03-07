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
      </section>
    </div>
  );
}
