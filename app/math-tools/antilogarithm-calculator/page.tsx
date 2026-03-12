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

  const loadExample = (exampleMode: typeof mode, value: string, base?: string) => {
    setMode(exampleMode);
    setLogValue(value);
    setCustomBase(base || "");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
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

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculateAntilog}>Calculate Antilog</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("base-10", "2")}>
            log₁₀(x) = 2
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("base-10", "-3")}>
            log₁₀(x) = -3
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("natural", "1")}>
            ln(x) = 1
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("natural", "2.5")}>
            ln(x) = 2.5
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("base-2", "8")}>
            log₂(x) = 8
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("base-2", "-4")}>
            log₂(x) = -4
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("custom", "3", "5")}>
            log₅(x) = 3
          </Button>
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
        <h2 className="text-2xl font-semibold">Understanding Antilogarithms</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            An antilogarithm – often shortened to "antilog" – is simply the inverse operation of a logarithm. If you know that log₁₀(100) = 2, then the antilog of 2 (base 10) is 100. In other words, antilog asks: "10 raised to what power gives me this number?" The answer is your log value, and the result is the original number.
          </p>
          <p className="text-muted-foreground">
            This relationship shows up constantly in science and engineering. pH calculations flip between logarithmic pH values and actual hydrogen ion concentrations. The Richter scale compresses earthquake energies logarithmically – finding the actual energy requires an antilog. Decibels, stellar magnitudes, and radioactive decay all use this log-antilog pair.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Math Behind Antilogs</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">The Core Relationship</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded mb-3">
              If log_b(x) = y, then antilog_b(y) = x = b^y
            </div>
            <p className="text-sm text-muted-foreground">
              This is the fundamental definition. The antilog undoes the logarithm by raising the base to the power of the log value. Base 10 antilogs use 10^y, natural antilogs use e^y (where e ≈ 2.71828), and base 2 antilogs use 2^y.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Common Bases</h4>
            <div className="space-y-2 text-sm">
              <div className="font-mono bg-muted p-2 rounded">Base 10: antilog₁₀(y) = 10^y</div>
              <p className="text-muted-foreground ml-2">
                Used in scientific notation, pH calculations, and the Richter scale. A log value of 3 means the original number was 1,000.
              </p>
              <div className="font-mono bg-muted p-2 rounded mt-2">Natural (base e): antilogₑ(y) = e^y</div>
              <p className="text-muted-foreground ml-2">
                Appears in continuous growth models, compound interest, and probability distributions. The natural antilog of 1 equals e ≈ 2.718.
              </p>
              <div className="font-mono bg-muted p-2 rounded mt-2">Base 2: antilog₂(y) = 2^y</div>
              <p className="text-muted-foreground ml-2">
                Common in computer science for data sizes and algorithm complexity. An antilog of 10 gives 1,024 – one kilobyte in binary.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Base 10 Antilog</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Find the antilog of 2.5 (base 10).
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>antilog₁₀(2.5) = 10^2.5</div>
              <div>10^2.5 = 10^2 × 10^0.5</div>
              <div>10^2 = 100</div>
              <div>10^0.5 = √10 ≈ 3.162</div>
              <div>100 × 3.162 = 316.2</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Natural Antilog</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Find e^1.5 (the natural antilog of 1.5).
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>antilogₑ(1.5) = e^1.5</div>
              <div>e ≈ 2.71828</div>
              <div>e^1.5 ≈ 2.71828^1.5</div>
              <div>e^1.5 ≈ 4.4817</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Base 2 Antilog</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Find the antilog of 12 (base 2).
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>antilog₂(12) = 2^12</div>
              <div>2^10 = 1,024</div>
              <div>2^12 = 2^10 × 2^2 = 1,024 × 4</div>
              <div>2^12 = 4,096</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Negative Log Value</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Find the antilog of -2 (base 10).
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>antilog₁₀(-2) = 10^(-2)</div>
              <div>10^(-2) = 1 / 10^2</div>
              <div>10^(-2) = 1 / 100</div>
              <div>10^(-2) = 0.01</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Custom Base</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Find the antilog of 3 with base 5.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>antilog₅(3) = 5^3</div>
              <div>5^3 = 5 × 5 × 5</div>
              <div>5^3 = 125</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Quick Fact</h3>
          <p className="text-sm text-muted-foreground">
            Before electronic calculators, mathematicians and engineers used printed antilog tables to reverse logarithmic calculations. These tables listed antilog values for inputs from 0.000 to 0.999, and users would adjust for the integer part by moving the decimal point. A typical 7-place antilog table had over 1,000 pages.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between antilog and inverse log?</h4>
            <p className="text-sm text-muted-foreground">
              They're the same thing. "Antilog" is shorthand for "antilogarithm," which means the inverse function of a logarithm. Some textbooks say "inverse log" or "exponential form" – all refer to raising the base to the power of the log value.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can antilog values be negative?</h4>
            <p className="text-sm text-muted-foreground">
              No. When you raise a positive base to any real power, the result is always positive. Even 10^(-5) = 0.00001, which is small but still positive. The antilog function's range is (0, ∞) for any positive base.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What happens with antilog of zero?</h4>
            <p className="text-sm text-muted-foreground">
              Any base raised to the power of 0 equals 1. So antilog_b(0) = b^0 = 1 for any valid base. This makes sense because log_b(1) = 0 for any base – the logarithm of 1 is always zero.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate antilog without a calculator?</h4>
            <p className="text-sm text-muted-foreground">
              For integer exponents, just multiply the base by itself that many times. For fractional exponents like 10^2.5, break it into 10^2 × 10^0.5, where 10^0.5 is the square root of 10. For more complex values, you'd historically use log tables or a slide rule.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is e used for natural antilogs?</h4>
            <p className="text-sm text-muted-foreground">
              The number e ≈ 2.71828 is the base of natural logarithms because it arises naturally in continuous growth processes. When something grows continuously at 100% per time period, it grows by a factor of e each period. This makes e^x the natural choice for modeling population growth, radioactive decay, and compound interest.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Where do antilogs appear in real applications?</h4>
            <p className="text-sm text-muted-foreground">
              Chemistry uses antilogs to convert pH back to hydrogen ion concentration: [H⁺] = 10^(-pH). Seismology converts Richter magnitudes to energy using antilogs. Finance uses natural antilogs in continuous compounding formulas. Signal processing converts decibel levels back to power ratios. Any field using logarithmic scales needs antilogs to recover actual values.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if my log value is very large?</h4>
            <p className="text-sm text-muted-foreground">
              Large log values produce enormous antilogs. For example, antilog₁₀(100) = 10^100, which is a googol – a 1 followed by 100 zeros. Most calculators overflow around 10^308. This calculator handles large values but may display results in scientific notation for readability.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
