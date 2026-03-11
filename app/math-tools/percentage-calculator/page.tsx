"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<"percentage-of" | "what-percent" | "percent-change" | "percentage-difference">("percentage-of");
  const [percentage, setPercentage] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [fromValue, setFromValue] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (mode === "percentage-of") {
      const pct = parseFloat(percentage);
      const val = parseFloat(value);
      if (!isNaN(pct) && !isNaN(val)) {
        const res = (pct / 100) * val;
        setResult({
          value: Math.round(res * 10000) / 10000,
          label: `${pct}% of ${val}`,
          formula: `(${pct} / 100) × ${val} = ${res}`
        });
      }
    } else if (mode === "what-percent") {
      const part = parseFloat(percentage);
      const whole = parseFloat(value);
      if (!isNaN(part) && !isNaN(whole) && whole !== 0) {
        const res = (part / whole) * 100;
        setResult({
          value: Math.round(res * 10000) / 10000,
          label: `${part} is what % of ${whole}`,
          formula: `(${part} / ${whole}) × 100 = ${res}%`
        });
      }
    } else if (mode === "percent-change") {
      const from = parseFloat(fromValue);
      const to = parseFloat(toValue);
      if (!isNaN(from) && !isNaN(to) && from !== 0) {
        const res = ((to - from) / from) * 100;
        setResult({
          value: Math.round(res * 10000) / 10000,
          label: from > to ? "Decrease" : "Increase",
          absoluteChange: to - from,
          formula: `((${to} - ${from}) / ${from}) × 100 = ${res}%`
        });
      }
    } else if (mode === "percentage-difference") {
      const v1 = parseFloat(percentage);
      const v2 = parseFloat(value);
      if (!isNaN(v1) && !isNaN(v2)) {
        const avg = (v1 + v2) / 2;
        const diff = Math.abs(v1 - v2);
        const res = (diff / avg) * 100;
        setResult({
          value: Math.round(res * 10000) / 10000,
          label: `Difference between ${v1} and ${v2}`,
          absoluteDiff: diff,
          average: avg,
          formula: `|${v1} - ${v2}| / ((${v1} + ${v2})/2) × 100 = ${res}%`
        });
      }
    }
  };

  const reset = () => {
    setPercentage("");
    setValue("");
    setFromValue("");
    setToValue("");
    setResult(null);
  };

  const loadExample = (m: typeof mode, vals: Record<string, string>) => {
    setMode(m);
    setPercentage(vals.percentage || "");
    setValue(vals.value || "");
    setFromValue(vals.fromValue || "");
    setToValue(vals.toValue || "");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Percentage Calculator – Find % of Any Number Instantly</h1>
        <p className="text-muted-foreground">
          Calculate any percentage instantly with our free online percentage calculator. Find what percent a number is, calculate percentage increase or decrease, and solve all percent-related problems easily
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Calculation Type</Label>
          <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage-of">What is X% of Y?</SelectItem>
              <SelectItem value="what-percent">X is what % of Y?</SelectItem>
              <SelectItem value="percent-change">Percentage change (increase/decrease)</SelectItem>
              <SelectItem value="percentage-difference">Percentage difference</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {mode === "percentage-of" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Percentage (%)</Label>
              <Input type="number" placeholder="e.g., 20" value={percentage} onChange={(e) => setPercentage(e.target.value)} />
            </div>
            <div>
              <Label>Value</Label>
              <Input type="number" placeholder="e.g., 150" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
          </div>
        )}

        {mode === "what-percent" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Part (X)</Label>
              <Input type="number" placeholder="e.g., 25" value={percentage} onChange={(e) => setPercentage(e.target.value)} />
            </div>
            <div>
              <Label>Whole (Y)</Label>
              <Input type="number" placeholder="e.g., 100" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
          </div>
        )}

        {mode === "percent-change" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Original Value</Label>
              <Input type="number" placeholder="e.g., 50" value={fromValue} onChange={(e) => setFromValue(e.target.value)} />
            </div>
            <div>
              <Label>New Value</Label>
              <Input type="number" placeholder="e.g., 75" value={toValue} onChange={(e) => setToValue(e.target.value)} />
            </div>
          </div>
        )}

        {mode === "percentage-difference" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Value 1</Label>
              <Input type="number" placeholder="e.g., 40" value={percentage} onChange={(e) => setPercentage(e.target.value)} />
            </div>
            <div>
              <Label>Value 2</Label>
              <Input type="number" placeholder="e.g., 60" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("percentage-of", { percentage: "15", value: "200" })}>15% of 200</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("what-percent", { percentage: "45", value: "180" })}>45 of 180</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("percent-change", { fromValue: "80", toValue: "120" })}>80 to 120</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("percentage-difference", { percentage: "30", value: "50" })}>30 vs 50</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("percentage-of", { percentage: "7.5", value: "1250" })}>7.5% of 1250</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("percent-change", { fromValue: "250", toValue: "200" })}>250 to 200</Button>
        </div>

        {result !== null && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">{result.label}</p>
              <p className="text-5xl font-bold">
                {result.value > 0 && mode === "percent-change" ? "+" : ""}{result.value}
                {mode !== "percentage-of" ? "%" : ""}
              </p>
              {mode === "percent-change" && result.absoluteChange !== undefined && (
                <p className="text-sm text-muted-foreground mt-2">
                  Absolute change: {result.absoluteChange > 0 ? "+" : ""}{result.absoluteChange}
                </p>
              )}
              {mode === "percentage-difference" && (
                <p className="text-sm text-muted-foreground mt-2">
                  Absolute difference: {result.absoluteDiff} | Average: {result.average}
                </p>
              )}
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Formula Used</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                {result.formula}
              </code>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Percentage Calculations</h2>
        <p className="text-muted-foreground">
          Percentages are everywhere – from shopping discounts to test scores, interest rates to tax calculations. The word "percent" literally means "per hundred." When you see 25%, think "25 out of every 100" or the fraction 25/100.
        </p>
        <p className="text-muted-foreground">
          This calculator handles four common percentage scenarios. First, finding a portion of a number (what's 20% of 150?). Second, determining what fraction one number is of another (45 is what percent of 180?). Third, tracking changes over time (my salary went from 50k to 65k – what's the increase?). Fourth, comparing two values without a before/after relationship (what's the percentage difference between 30 and 50?).
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Four Percentage Formulas</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Find X% of Y</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Calculate a portion of a whole. Multiply the percentage (as a decimal) by the total value.
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              (X / 100) × Y = Result
            </code>
            <div className="mt-2 text-sm text-muted-foreground">
              Example: 25% of 80 = 0.25 × 80 = 20
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">X is What % of Y</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Find what fraction one number is of another, expressed as a percentage.
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              (X / Y) × 100 = Result%
            </code>
            <div className="mt-2 text-sm text-muted-foreground">
              Example: 15 is what % of 60? (15/60) × 100 = 25%
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Percentage Change</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Measure how much something increased or decreased relative to its original value.
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              ((New - Old) / Old) × 100 = Result%
            </code>
            <div className="mt-2 text-sm text-muted-foreground">
              Example: 50 to 75 = ((75-50)/50) × 100 = +50%
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Percentage Difference</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Compare two values without designating which is "original" – useful for comparing measurements.
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              |A - B| / ((A + B)/2) × 100 = Result%
            </code>
            <div className="mt-2 text-sm text-muted-foreground">
              Example: Difference between 40 and 60 = 40%
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Calculate 18% tip on $67.50 bill</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded space-y-1">
              <div>0.18 × 67.50 = $12.15</div>
              <div>Total with tip: $79.65</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Score 42 out of 50 on a test</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded space-y-1">
              <div>(42 / 50) × 100 = 84%</div>
              <div>Grade: B</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Salary increased from $45,000 to $52,000</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded space-y-1">
              <div>((52000 - 45000) / 45000) × 100</div>
              <div>= (7000 / 45000) × 100</div>
              <div>= 0.1556 × 100 = 15.56% raise</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: 30% off a $120 item</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded space-y-1">
              <div>Discount: 0.30 × 120 = $36</div>
              <div>Sale price: $120 - $36 = $84</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Population grew from 12,500 to 14,200</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded space-y-1">
              <div>((14200 - 12500) / 12500) × 100</div>
              <div>= (1700 / 12500) × 100 = 13.6% growth</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 6: Add 8.5% sales tax to $95 purchase</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded space-y-1">
              <div>Tax: 0.085 × 95 = $8.08</div>
              <div>Total: $103.08</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm">
            The percent symbol % evolved from the Italian "per cento" (per hundred). Medieval scribes wrote "per 100," which gradually contracted to "per 100" with a slash, then to the modern % symbol we use today. The symbol first appeared in print around 1425.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate percentage of a number?</h4>
            <p className="text-sm text-muted-foreground">
              Convert the percentage to a decimal by dividing by 100, then multiply. For 35% of 200: 35/100 = 0.35, then 0.35 × 200 = 70.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between percentage change and percentage difference?</h4>
            <p className="text-sm text-muted-foreground">
              Percentage change measures growth or decline from an original value (direction matters). Percentage difference compares two values without designating which came first – it's always positive and uses the average as the reference.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can percentage change be negative?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. A negative percentage change means a decrease. If something goes from 80 to 60, that's ((60-80)/80) × 100 = -25%, a 25% decrease.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I add a percentage to a number?</h4>
            <p className="text-sm text-muted-foreground">
              Multiply by (1 + percentage as decimal). Adding 15% to 200: 200 × 1.15 = 230. For tax or tips: $50 + 20% tip = $50 × 1.20 = $60.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's 0% of a number?</h4>
            <p className="text-sm text-muted-foreground">
              Zero percent of anything is 0. You're taking none of it. Mathematically: 0/100 × any number = 0.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can a percentage be more than 100%?</h4>
            <p className="text-sm text-muted-foreground">
              Absolutely. 100% means "the whole thing." 200% means twice as much. If sales went from 50 units to 150 units, that's 300% of the original (or a 200% increase).
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/standard-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Standard Calculator</p>
            <p className="text-xs text-muted-foreground">Basic arithmetic</p>
          </a>
          <a href="/math-tools/ratio-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Ratio Calculator</p>
            <p className="text-xs text-muted-foreground">Simplify ratios</p>
          </a>
          <a href="/math-tools/average-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Average Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate mean</p>
          </a>
        </div>
      </section>
    </div>
  );
}
