"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PercentageChangeCalculator() {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [result, setResult] = useState<{
    percentageChange: number;
    absoluteChange: number;
    direction: "increase" | "decrease" | "no change";
    explanation: string;
  } | null>(null);
  const [error, setError] = useState("");

  const calculatePercentageChange = (from: number, to: number) => {
    const absoluteChange = to - from;
    const percentageChange = from !== 0 ? ((to - from) / Math.abs(from)) * 100 : 0;

    let direction: "increase" | "decrease" | "no change";
    let explanation: string;

    if (percentageChange > 0) {
      direction = "increase";
      explanation = `${from} increased by ${percentageChange.toFixed(2)}% to reach ${to}`;
    } else if (percentageChange < 0) {
      direction = "decrease";
      explanation = `${from} decreased by ${Math.abs(percentageChange).toFixed(2)}% to reach ${to}`;
    } else {
      direction = "no change";
      explanation = `${from} stayed the same - no change`;
    }

    return { percentageChange, absoluteChange, direction, explanation };
  };

  const calculate = () => {
    const from = parseFloat(fromValue.trim());
    const to = parseFloat(toValue.trim());

    if (isNaN(from) || isNaN(to)) {
      setError("Please enter valid numbers for both values");
      setResult(null);
      return;
    }

    setError("");
    setResult(calculatePercentageChange(from, to));
  };

  const reset = () => {
    setFromValue("");
    setToValue("");
    setResult(null);
    setError("");
  };

  const loadExample = (from: string, to: string) => {
    setFromValue(from);
    setToValue(to);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Percentage Change Calculator - Increase & Decrease</h1>
        <p className="text-muted-foreground">
          Calculate percentage increase or decrease between two numbers with our free online percentage change calculator. Perfect for tracking growth, price changes, and performance metrics.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Original Value (From)</Label>
            <Input
              type="text"
              placeholder="e.g., 100"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
          <div>
            <Label>New Value (To)</Label>
            <Input
              type="text"
              placeholder="e.g., 150"
              value={toValue}
              onChange={(e) => setToValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Calculate Change</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100", "150")}>Price $100 to $150</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("50000", "45000")}>Salary decrease</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("80", "120")}>Test score 80 to 120</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("250", "200")}>Weight loss 250 to 200</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1000", "1000")}>No change</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("75", "100")}>Investment growth</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2.5", "3.75")}>Decimal values</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg text-center ${
              result.direction === "increase" ? "bg-green-500/10 border border-green-500/30" :
              result.direction === "decrease" ? "bg-red-500/10 border border-red-500/30" :
              "bg-muted"
            }`}>
              <p className={`text-5xl font-bold mb-2 ${
                result.direction === "increase" ? "text-green-600" :
                result.direction === "decrease" ? "text-red-600" :
                ""
              }`}>
                {result.direction === "increase" ? "+" : ""}{result.percentageChange.toFixed(2)}%
              </p>
              <p className="text-sm text-muted-foreground">{result.explanation}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Absolute Change</p>
                <p className="text-2xl font-bold">{result.absoluteChange > 0 ? "+" : ""}{result.absoluteChange}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Original Value</p>
                <p className="text-2xl font-bold">{fromValue}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">New Value</p>
                <p className="text-2xl font-bold">{toValue}</p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Visual Representation</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16">From:</span>
                  <div className="flex-1 h-8 bg-background border rounded overflow-hidden">
                    <div
                      className="h-full bg-muted-foreground/30 transition-all duration-300"
                      style={{ width: `${Math.min(100, (parseFloat(fromValue) / Math.max(parseFloat(fromValue), parseFloat(toValue))) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono w-20 text-right">{fromValue}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16">To:</span>
                  <div className="flex-1 h-8 bg-background border rounded overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        result.direction === "increase" ? "bg-green-500/50" :
                        result.direction === "decrease" ? "bg-red-500/50" :
                        "bg-muted-foreground/30"
                      }`}
                      style={{ width: `${Math.min(100, (parseFloat(toValue) / Math.max(parseFloat(fromValue), parseFloat(toValue))) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono w-20 text-right">{toValue}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Percentage Change</h2>
        <p className="text-muted-foreground">
          Percentage change measures how much a value has increased or decreased relative to its original amount. It's one of the most practical math concepts you'll use daily - from tracking investment returns to comparing sale prices to understanding population growth.
        </p>
        <p className="text-muted-foreground">
          What makes percentage change so useful is that it standardizes comparisons. A $10 increase means very different things for a $20 stock versus a $2000 laptop. Expressing changes as percentages puts everything on the same scale.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Percentage Change Formula</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-mono text-center text-lg mb-3">
            Percentage Change = ((New Value - Original Value) / |Original Value|) × 100%
          </p>
          <p className="text-sm text-muted-foreground">
            The absolute value of the original value ensures the formula works correctly even when dealing with negative starting values. A positive result means an increase; negative means a decrease.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-green-600">Percentage Increase</h4>
            <p className="text-sm text-muted-foreground mb-2">When the new value is larger than the original:</p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>Original: 100, New: 150</div>
              <div>((150 - 100) / 100) × 100% = 50%</div>
              <div>Result: 50% increase</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-red-600">Percentage Decrease</h4>
            <p className="text-sm text-muted-foreground mb-2">When the new value is smaller than the original:</p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>Original: 200, New: 150</div>
              <div>((150 - 200) / 200) × 100% = -25%</div>
              <div>Result: 25% decrease</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Stock Price Increase</h4>
            <p className="text-sm text-muted-foreground mb-2">
              You bought shares at $45 each. Today they're worth $63. What's your percentage gain?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Original Value = $45</div>
              <div>New Value = $63</div>
              <div>Absolute Change = $63 - $45 = $18</div>
              <div>Percentage Change = ($18 / $45) × 100% = 0.4 × 100% = 40%</div>
              <div className="text-green-600 font-semibold">Your investment grew by 40%</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Sale Discount</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A jacket originally priced at $120 is now $84. What percentage discount is this?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Original Value = $120</div>
              <div>New Value = $84</div>
              <div>Absolute Change = $84 - $120 = -$36</div>
              <div>Percentage Change = (-$36 / $120) × 100% = -0.3 × 100% = -30%</div>
              <div className="text-green-600 font-semibold">You're saving 30% off the original price</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Population Growth</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A town had 8,500 residents in 2020 and 9,860 in 2024. What was the population growth rate?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Original Value = 8,500</div>
              <div>New Value = 9,860</div>
              <div>Absolute Change = 9,860 - 8,500 = 1,360</div>
              <div>Percentage Change = (1,360 / 8,500) × 100% = 0.16 × 100% = 16%</div>
              <div className="text-green-600 font-semibold">The town grew by 16% over 4 years</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Weight Loss Journey</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Starting at 220 lbs, someone reaches a goal weight of 187 lbs. What percentage of body weight did they lose?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Original Value = 220 lbs</div>
              <div>New Value = 187 lbs</div>
              <div>Absolute Change = 187 - 220 = -33 lbs</div>
              <div>Percentage Change = (-33 / 220) × 100% = -0.15 × 100% = -15%</div>
              <div className="text-green-600 font-semibold">They lost 15% of their starting body weight</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            The percent symbol (%) comes from the Latin "per centum," meaning "by the hundred." Ancient Romans used fractions based on 1/100 for calculations - Emperor Augustus levied a 1% tax on goods sold at auction. The modern % symbol evolved from 17th-century Italian merchants writing "pc" with a line through it, eventually becoming the two circles and slash we use today.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Can percentage change be more than 100%?</h4>
            <p className="text-sm text-muted-foreground">
              Absolutely. If something doubles, that's a 100% increase. If it triples, that's a 200% increase. For example, going from $50 to $200 is a 300% increase because you've added three times the original amount.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between percentage change and percentage point change?</h4>
            <p className="text-sm text-muted-foreground">
              Percentage change is relative (a ratio), while percentage points are absolute differences between percentages. If unemployment goes from 5% to 7%, that's a 2 percentage point increase, but a 40% percentage change ((7-5)/5 × 100%).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate percentage change when the original value is negative?</h4>
            <p className="text-sm text-muted-foreground">
              Use the absolute value of the original in the denominator. If a company goes from -$10,000 loss to $5,000 profit: ((5000 - (-10000)) / |-10000|) × 100% = (15000 / 10000) × 100% = 150% improvement.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is my percentage decrease smaller than the percentage increase for the same absolute change?</h4>
            <p className="text-sm text-muted-foreground">
              Because the base (original value) is different. Going from 100 to 150 is a 50% increase. But going from 150 back to 100 is only a 33.3% decrease. The same $50 change represents different proportions of the starting values.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is percentage change used in real life?</h4>
            <p className="text-sm text-muted-foreground">
              You'll find percentage change everywhere: investment returns (ROI), inflation rates, sales discounts, population growth, website traffic analytics, test score improvements, fitness progress tracking, and economic indicators like GDP growth.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if the original value is zero?</h4>
            <p className="text-sm text-muted-foreground">
              Percentage change from zero is mathematically undefined (division by zero). In practice, if you go from 0 to any positive number, you might describe it as "infinite growth" or simply state the absolute change instead.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
