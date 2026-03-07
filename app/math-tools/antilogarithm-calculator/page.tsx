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
      </section>
    </div>
  );
}
