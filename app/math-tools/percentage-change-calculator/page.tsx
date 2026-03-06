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
      explanation = `${from} stayed the same – no change`;
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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Percentage Change Calculator – Increase & Decrease</h1>
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

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Change</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What Is Percentage Change?</h2>
        <p className="text-muted-foreground">
          Percentage change measures how much a value has increased or decreased relative to its original amount. It expresses the change as a percentage of the starting value, making it easy to compare changes across different scales.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-sm mb-2">The Formula</h3>
          <p className="text-sm font-mono mb-3">
            Percentage Change = ((New Value - Original Value) / |Original Value|) × 100%
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-background rounded">
              <span>Positive result:</span>
              <span className="text-green-600 font-semibold">Increase</span>
            </div>
            <div className="flex justify-between p-2 bg-background rounded">
              <span>Negative result:</span>
              <span className="text-red-600 font-semibold">Decrease</span>
            </div>
            <div className="flex justify-between p-2 bg-background rounded">
              <span>Zero:</span>
              <span className="font-semibold">No change</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Step-by-Step Calculation</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Example 1: Price Increase</h3>
            <p className="text-sm text-muted-foreground mb-2">A stock goes from $50 to $75. What's the percentage change?</p>
            <ol className="space-y-1 text-sm font-mono">
              <li>Step 1: Find the difference: 75 - 50 = 25</li>
              <li>Step 2: Divide by original: 25 / 50 = 0.5</li>
              <li>Step 3: Multiply by 100: 0.5 × 100 = 50%</li>
              <li className="text-green-600">Answer: 50% increase</li>
            </ol>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Example 2: Price Decrease</h3>
            <p className="text-sm text-muted-foreground mb-2">A shirt goes from $80 to $60. What's the percentage change?</p>
            <ol className="space-y-1 text-sm font-mono">
              <li>Step 1: Find the difference: 60 - 80 = -20</li>
              <li>Step 2: Divide by original: -20 / 80 = -0.25</li>
              <li>Step 3: Multiply by 100: -0.25 × 100 = -25%</li>
              <li className="text-red-600">Answer: 25% decrease</li>
            </ol>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Example 3: Population Growth</h3>
            <p className="text-sm text-muted-foreground mb-2">A city grows from 100,000 to 120,000 residents.</p>
            <ol className="space-y-1 text-sm font-mono">
              <li>Step 1: Difference: 120,000 - 100,000 = 20,000</li>
              <li>Step 2: Divide: 20,000 / 100,000 = 0.2</li>
              <li>Step 3: Percentage: 0.2 × 100 = 20%</li>
              <li className="text-green-600">Answer: 20% population increase</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Real-World Applications</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Finance & Investing</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Stock price changes</li>
              <li>• Investment returns</li>
              <li>• Currency exchange rate shifts</li>
              <li>• Interest rate changes</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Business & Sales</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Revenue growth</li>
              <li>• Sales performance</li>
              <li>• Profit margin changes</li>
              <li>• Market share shifts</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Shopping & Discounts</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Sale discounts</li>
              <li>• Price comparisons</li>
              <li>• Inflation impact</li>
              <li>• Coupon savings</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Science & Data</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Experimental results</li>
              <li>• Population changes</li>
              <li>• Performance metrics</li>
              <li>• Survey results</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Common Percentage Changes</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Doubling and Halving</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-2 bg-background rounded">
                <span className="text-muted-foreground">100 → 200:</span>
                <span className="font-mono font-bold text-green-600 ml-2">+100%</span>
              </div>
              <div className="p-2 bg-background rounded">
                <span className="text-muted-foreground">100 → 50:</span>
                <span className="font-mono font-bold text-red-600 ml-2">-50%</span>
              </div>
              <div className="p-2 bg-background rounded">
                <span className="text-muted-foreground">50 → 100:</span>
                <span className="font-mono font-bold text-green-600 ml-2">+100%</span>
              </div>
              <div className="p-2 bg-background rounded">
                <span className="text-muted-foreground">200 → 100:</span>
                <span className="font-mono font-bold text-red-600 ml-2">-50%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Note: Doubling is +100%, but halving is only -50%. Percentage changes aren't symmetric.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Common Discounts</h3>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="p-2 bg-background rounded text-center">
                <span className="font-mono font-bold text-red-600">-10%</span>
                <p className="text-xs text-muted-foreground mt-1">90% of original</p>
              </div>
              <div className="p-2 bg-background rounded text-center">
                <span className="font-mono font-bold text-red-600">-20%</span>
                <p className="text-xs text-muted-foreground mt-1">80% of original</p>
              </div>
              <div className="p-2 bg-background rounded text-center">
                <span className="font-mono font-bold text-red-600">-25%</span>
                <p className="text-xs text-muted-foreground mt-1">75% of original</p>
              </div>
              <div className="p-2 bg-background rounded text-center">
                <span className="font-mono font-bold text-red-600">-50%</span>
                <p className="text-xs text-muted-foreground mt-1">Half price</p>
              </div>
              <div className="p-2 bg-background rounded text-center">
                <span className="font-mono font-bold text-red-600">-75%</span>
                <p className="text-xs text-muted-foreground mt-1">Quarter price</p>
              </div>
              <div className="p-2 bg-background rounded text-center">
                <span className="font-mono font-bold text-red-600">-100%</span>
                <p className="text-xs text-muted-foreground mt-1">Free</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">How do I calculate percentage increase?</h3>
          <p className="text-sm text-muted-foreground">
            Subtract the original value from the new value, divide by the original value, then multiply by 100. For example, from 50 to 75: (75 - 50) / 50 × 100 = 50% increase.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How do I calculate percentage decrease?</h3>
          <p className="text-sm text-muted-foreground">
            Use the same formula. A decrease will give you a negative result. For example, from 80 to 60: (60 - 80) / 80 × 100 = -25%, which means a 25% decrease.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What if the original value is zero?</h3>
          <p className="text-sm text-muted-foreground">
            Percentage change from zero is undefined mathematically (you can't divide by zero). In practice, going from 0 to any positive number represents infinite percentage growth.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Why isn't a 50% increase followed by 50% decrease back to the original?</h3>
          <p className="text-sm text-muted-foreground">
            Because the base changes. Starting at 100, a 50% increase gives 150. Then a 50% decrease of 150 is 75, not 100. The second percentage applies to the new, larger base.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can percentage change be more than 100%?</h3>
          <p className="text-sm text-muted-foreground">
            Yes. If a value more than doubles, the percentage increase exceeds 100%. For example, going from 50 to 200 is a 300% increase (the value quadrupled).
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/percentage-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Percentage Calculator</p>
            <p className="text-xs text-muted-foreground">Find percentages of numbers</p>
          </a>
          <a href="/math-tools/discount-markup-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Discount & Markup Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate sale prices</p>
          </a>
          <a href="/math-tools/profit-loss-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Profit & Loss Calculator</p>
            <p className="text-xs text-muted-foreground">Business profit calculations</p>
          </a>
        </div>
      </section>
    </div>
  );
}
