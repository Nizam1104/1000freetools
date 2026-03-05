"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Percentage Calculator – Find % of Any Number Instantly</h1>
        <p className="text-muted-foreground">
          Calculate any percentage instantly with our free online percentage calculator. Find what percent a number is, calculate percentage increase or decrease, and solve all percent-related problems easily
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Percentage Calculator</CardTitle>
          <CardDescription>
            Calculate percentages, find what percent one number is of another, or compute percentage change.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Percentage Calculator – Find % of Any Number Instantly</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Calculate any percentage instantly with our free online percentage calculator. Find what percent a number is, calculate percentage increase or decrease, and solve all percent-related problems easily.
          </p>
          <p className="text-sm text-muted-foreground">
            Four calculation modes cover every percentage need. Find X% of a number (like calculating a 20% tip). Determine what percent one value is of another (like test scores). Track changes over time with percentage increase/decrease. Or compare two values with percentage difference.
          </p>
          <p className="text-sm text-muted-foreground">
            Shopping discounts, salary raises, population growth, investment returns – percentages show up everywhere. This calculator handles them all with clear formulas so you understand the math behind the answer.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Percentage Calculations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Find X% of Y</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Calculate a portion of a whole. Multiply the percentage (as a decimal) by the total value.
              </p>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                (X / 100) × Y = Result
              </code>
              <div className="mt-2 text-xs text-muted-foreground">
                Example: 25% of 80 = 0.25 × 80 = 20
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">X is What % of Y</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Find what fraction one number is of another, expressed as a percentage.
              </p>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                (X / Y) × 100 = Result%
              </code>
              <div className="mt-2 text-xs text-muted-foreground">
                Example: 15 is what % of 60? (15/60) × 100 = 25%
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Percentage Change</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Measure how much something increased or decreased relative to its original value.
              </p>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                ((New - Old) / Old) × 100 = Result%
              </code>
              <div className="mt-2 text-xs text-muted-foreground">
                Example: 50 to 75 = ((75-50)/50) × 100 = +50%
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Percentage Difference</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Compare two values without designating which is "original" – useful for comparing measurements.
              </p>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                |A - B| / ((A + B)/2) × 100 = Result%
              </code>
              <div className="mt-2 text-xs text-muted-foreground">
                Example: Difference between 40 and 60 = 40%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Real-World Percentage Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Calculate 18% tip on $67.50 bill</div>
              <div className="font-mono text-xs text-muted-foreground">
                0.18 × 67.50 = $12.15<br />
                Total: $79.65
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Score 42 out of 50 on a test</div>
              <div className="font-mono text-xs text-muted-foreground">
                (42 / 50) × 100 = 84%
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Salary increased from $45,000 to $52,000</div>
              <div className="font-mono text-xs text-muted-foreground">
                ((52000 - 45000) / 45000) × 100 = +15.56%
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">30% off a $120 item</div>
              <div className="font-mono text-xs text-muted-foreground">
                Discount: 0.30 × 120 = $36<br />
                Sale price: $120 - $36 = $84
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Population grew from 12,500 to 14,200</div>
              <div className="font-mono text-xs text-muted-foreground">
                ((14200 - 12500) / 12500) × 100 = +13.6%
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Add 8.5% sales tax to $95 purchase</div>
              <div className="font-mono text-xs text-muted-foreground">
                Tax: 0.085 × 95 = $8.08<br />
                Total: $103.08
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Percentage Tricks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">10% Rule</h4>
              <p className="text-xs text-muted-foreground">
                To find 10% of any number, move the decimal point one place left. 10% of 250 = 25. Use this to build other percentages: 20% = double 10%, 5% = half of 10%.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">50% is Half</h4>
              <p className="text-xs text-muted-foreground">
                50% means half. Divide by 2. 50% of 84 = 42. For 25%, divide by 4. For 75%, find 50% + 25%.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Flip Percentages</h4>
              <p className="text-xs text-muted-foreground">
                X% of Y equals Y% of X. So 4% of 25 = 25% of 4 = 1. This trick works for any pair of numbers.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Percentage Change Shortcut</h4>
              <p className="text-xs text-muted-foreground">
                For small changes, approximate: going from 100 to 108 is about 8%. But from 50 to 58 is 16% – the base matters.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate percentage of a number?</h4>
            <p className="text-xs text-muted-foreground">
              Convert the percentage to a decimal by dividing by 100, then multiply. For 35% of 200: 35/100 = 0.35, then 0.35 × 200 = 70.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between percentage change and percentage difference?</h4>
            <p className="text-xs text-muted-foreground">
              Percentage change measures growth or decline from an original value (direction matters). Percentage difference compares two values without designating which came first – it's always positive and uses the average as the reference.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can percentage change be negative?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. A negative percentage change means a decrease. If something goes from 80 to 60, that's ((60-80)/80) × 100 = -25%, a 25% decrease.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I add a percentage to a number?</h4>
            <p className="text-xs text-muted-foreground">
              Multiply by (1 + percentage as decimal). Adding 15% to 200: 200 × 1.15 = 230. For tax or tips: $50 + 20% tip = $50 × 1.20 = $60.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's 0% of a number?</h4>
            <p className="text-xs text-muted-foreground">
              Zero percent of anything is 0. You're taking none of it. Mathematically: 0/100 × any number = 0.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can a percentage be more than 100%?</h4>
            <p className="text-xs text-muted-foreground">
              Absolutely. 100% means "the whole thing." 200% means twice as much. If sales went from 50 units to 150 units, that's 300% of the original (or a 200% increase).
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Math Tools</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
