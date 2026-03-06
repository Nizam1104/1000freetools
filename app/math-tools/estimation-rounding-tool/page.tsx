"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EstimationRoundingTool() {
  const [number, setNumber] = useState("");
  const [place, setPlace] = useState<string>("10");
  const [result, setResult] = useState<{
    original: number;
    rounded: number;
    place: string;
    explanation: string;
    difference: number;
  } | null>(null);
  const [error, setError] = useState("");

  const roundNumber = (num: number, placeValue: string) => {
    let rounded: number;
    let placeName: string;
    let divisor: number;

    switch (placeValue) {
      case "0.01":
        rounded = Math.round(num * 100) / 100;
        placeName = "nearest hundredth (0.01)";
        divisor = 100;
        break;
      case "0.1":
        rounded = Math.round(num * 10) / 10;
        placeName = "nearest tenth (0.1)";
        divisor = 10;
        break;
      case "1":
        rounded = Math.round(num);
        placeName = "nearest whole number";
        divisor = 1;
        break;
      case "10":
        rounded = Math.round(num / 10) * 10;
        placeName = "nearest ten";
        divisor = 10;
        break;
      case "100":
        rounded = Math.round(num / 100) * 100;
        placeName = "nearest hundred";
        divisor = 100;
        break;
      case "1000":
        rounded = Math.round(num / 1000) * 1000;
        placeName = "nearest thousand";
        divisor = 1000;
        break;
      case "10000":
        rounded = Math.round(num / 10000) * 10000;
        placeName = "nearest ten thousand";
        divisor = 10000;
        break;
      case "100000":
        rounded = Math.round(num / 100000) * 100000;
        placeName = "nearest hundred thousand";
        divisor = 100000;
        break;
      default:
        rounded = Math.round(num);
        placeName = "nearest whole number";
        divisor = 1;
    }

    const explanation = `${num} rounded to ${placeName} is ${rounded}`;
    const difference = Math.abs(num - rounded);

    return { original: num, rounded, place: placeName, explanation, difference };
  };

  const calculate = () => {
    const num = parseFloat(number.trim());

    if (isNaN(num)) {
      setError("Please enter a valid number");
      setResult(null);
      return;
    }

    setError("");
    setResult(roundNumber(num, place));
  };

  const reset = () => {
    setNumber("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Estimation & Rounding Tool – Round to Any Place Value</h1>
        <p className="text-muted-foreground">
          Round numbers to the nearest ten, hundred, thousand, or decimal place with our free online estimation tool. Perfect for quick estimates and mental math.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Number to Round</Label>
            <Input
              type="text"
              placeholder="e.g., 1234.567"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
          <div>
            <Label>Round To</Label>
            <Select value={place} onValueChange={setPlace}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.01">Hundredth (0.01)</SelectItem>
                <SelectItem value="0.1">Tenth (0.1)</SelectItem>
                <SelectItem value="1">Whole Number (1)</SelectItem>
                <SelectItem value="10">Ten (10)</SelectItem>
                <SelectItem value="100">Hundred (100)</SelectItem>
                <SelectItem value="1000">Thousand (1,000)</SelectItem>
                <SelectItem value="10000">Ten Thousand (10,000)</SelectItem>
                <SelectItem value="100000">Hundred Thousand (100,000)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Round Number</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Rounded Result</p>
              <p className="text-4xl font-bold">{result.rounded}</p>
              <p className="text-sm text-muted-foreground mt-2">{result.explanation}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Original Number</p>
                <p className="text-2xl font-mono">{result.original}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Rounded To</p>
                <p className="text-2xl font-bold">{result.rounded}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Difference</p>
                <p className="text-2xl font-mono">{result.difference}</p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Number Line Visualization</p>
              <div className="relative h-16 bg-background border rounded">
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-0.5 bg-muted-foreground/30" />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-0.5 h-4 bg-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-1 font-mono">{Math.floor(result.original / parseFloat(place)) * parseFloat(place)}</span>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-0.5 h-4 bg-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-1 font-mono">{Math.ceil(result.original / parseFloat(place)) * parseFloat(place)}</span>
                </div>
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-background shadow"
                  style={{ 
                    left: `${Math.min(90, Math.max(10, ((result.original - Math.floor(result.original / parseFloat(place)) * parseFloat(place)) / parseFloat(place)) * 80 + 10))}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full border-2 border-background shadow flex items-center justify-center"
                  style={{ 
                    left: `${Math.min(90, Math.max(10, ((result.rounded - Math.floor(result.original / parseFloat(place)) * parseFloat(place)) / parseFloat(place)) * 80 + 10))}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <span className="text-xs text-white font-bold">✓</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Blue dot shows original number, green shows rounded result
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What Is Rounding?</h2>
        <p className="text-muted-foreground">
          Rounding means replacing a number with a simpler, nearby value. We round to make numbers easier to work with, estimate quickly, or match the precision of our measurements.
        </p>
        <p className="text-muted-foreground">
          When you round, you're finding the closest multiple of your target place value. For example, rounding 47 to the nearest ten gives 50, because 50 is closer to 47 than 40 is.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-sm mb-2">Rounding Rule</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Look at the digit to the right of your target place:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
              <p className="text-sm font-semibold text-green-700">0, 1, 2, 3, or 4</p>
              <p className="text-xs text-muted-foreground mt-1">Round down (keep the digit)</p>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded">
              <p className="text-sm font-semibold text-blue-700">5, 6, 7, 8, or 9</p>
              <p className="text-xs text-muted-foreground mt-1">Round up (add 1 to the digit)</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Memory trick: "5 or more, raise the score; 4 or less, let it rest"
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Rounding Examples</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Rounding to Nearest Ten</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="p-2 bg-background rounded">
                <span className="text-muted-foreground">23 → </span>
                <span className="font-mono font-bold">20</span>
              </div>
              <div className="p-2 bg-background rounded">
                <span className="text-muted-foreground">57 → </span>
                <span className="font-mono font-bold">60</span>
              </div>
              <div className="p-2 bg-background rounded">
                <span className="text-muted-foreground">95 → </span>
                <span className="font-mono font-bold">100</span>
              </div>
              <div className="p-2 bg-background rounded">
                <span className="text-muted-foreground">142 → </span>
                <span className="font-mono font-bold">140</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Rounding to Nearest Hundred</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="p-2 bg-background rounded">
                <span className="text-muted-foreground">345 → </span>
                <span className="font-mono font-bold">300</span>
              </div>
              <div className="p-2 bg-background rounded">
                <span className="text-muted-foreground">782 → </span>
                <span className="font-mono font-bold">800</span>
              </div>
              <div className="p-2 bg-background rounded">
                <span className="text-muted-foreground">1,500 → </span>
                <span className="font-mono font-bold">2,000</span>
              </div>
              <div className="p-2 bg-background rounded">
                <span className="text-muted-foreground">2,499 → </span>
                <span className="font-mono font-bold">2,500</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Rounding Decimals</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="p-2 bg-background rounded">
                <span className="text-muted-foreground">3.14159 → </span>
                <span className="font-mono font-bold">3.14</span>
                <span className="text-xs text-muted-foreground"> (2 dp)</span>
              </div>
              <div className="p-2 bg-background rounded">
                <span className="text-muted-foreground">2.718 → </span>
                <span className="font-mono font-bold">2.7</span>
                <span className="text-xs text-muted-foreground"> (1 dp)</span>
              </div>
              <div className="p-2 bg-background rounded">
                <span className="text-muted-foreground">0.999 → </span>
                <span className="font-mono font-bold">1</span>
                <span className="text-xs text-muted-foreground"> (whole)</span>
              </div>
              <div className="p-2 bg-background rounded">
                <span className="text-muted-foreground">5.5 → </span>
                <span className="font-mono font-bold">6</span>
                <span className="text-xs text-muted-foreground"> (whole)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Why We Round Numbers</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Quick Estimates</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Rounding helps you calculate mentally. Need to add 47 + 52? Round to 50 + 50 = 100. Close enough for a quick estimate.
            </p>
            <p className="text-xs font-mono">
              Actual: 47 + 52 = 99<br />
              Estimated: 50 + 50 = 100
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Measurement Precision</h3>
            <p className="text-sm text-muted-foreground mb-2">
              If your ruler measures to the nearest millimeter, reporting 12.34567 cm is misleading. Round to 12.3 cm instead.
            </p>
            <p className="text-xs text-muted-foreground">
              Match your precision to your measuring tool.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Money Matters</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Prices round to cents. A calculation giving $19.997 becomes $20.00. Tax calculations always round to the nearest cent.
            </p>
            <p className="text-xs font-mono">
              $19.997 → $20.00<br />
              $15.234 → $15.23
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Large Numbers</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Population figures round to thousands or millions. Saying "8.1 billion" is clearer than "8,123,456,789".
            </p>
            <p className="text-xs font-mono">
              8,123,456,789 → 8.1 billion<br />
              331,452,109 → 331 million
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Estimation Strategies</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Front-End Estimation</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Keep only the leftmost digit, replace others with zeros:
            </p>
            <p className="text-sm font-mono">
              4,567 + 2,341 ≈ 4,000 + 2,000 = 6,000<br />
              Actual sum: 6,908
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Clustering</h3>
            <p className="text-sm text-muted-foreground mb-2">
              When numbers are close together, use a common value:
            </p>
            <p className="text-sm font-mono">
              48 + 52 + 47 + 53 ≈ 50 × 4 = 200<br />
              Actual sum: 200 (exact in this case!)
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Compatible Numbers</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Adjust to numbers that work well together:
            </p>
            <p className="text-sm font-mono">
              19 × 5 ≈ 20 × 5 = 100<br />
              Actual: 19 × 5 = 95
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What do I do when the digit is exactly 5?</h3>
          <p className="text-sm text-muted-foreground">
            By convention, round up when the digit is 5 or greater. So 35 rounds to 40, and 3.5 rounds to 4. Some scientific contexts use "round half to even" to reduce bias, but for everyday use, round up.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How do I round negative numbers?</h3>
          <p className="text-sm text-muted-foreground">
            Round based on the absolute value, then reapply the negative sign. For example, -47 rounded to the nearest ten is -50 (because 47 rounds to 50).
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's the difference between rounding and truncating?</h3>
          <p className="text-sm text-muted-foreground">
            Rounding finds the nearest value. Truncating just cuts off digits. For example, 3.7 truncated to a whole number is 3, but rounded it's 4.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Why is rounding important?</h3>
          <p className="text-sm text-muted-foreground">
            Rounding helps with mental math, checking if answers are reasonable, and communicating numbers clearly. It's essential for estimation and understanding the scale of quantities.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can rounding introduce errors?</h3>
          <p className="text-sm text-muted-foreground">
            Yes, rounding loses precision. Rounding intermediate results in a multi-step calculation can compound errors. Keep extra digits during calculations, round only the final answer.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/rounding-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Rounding Calculator</p>
            <p className="text-xs text-muted-foreground">Round to decimal places</p>
          </a>
          <a href="/math-tools/significant-figures-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Significant Figures</p>
            <p className="text-xs text-muted-foreground">Round to sig figs</p>
          </a>
          <a href="/math-tools/standard-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Standard Calculator</p>
            <p className="text-xs text-muted-foreground">Basic arithmetic</p>
          </a>
        </div>
      </section>
    </div>
  );
}
