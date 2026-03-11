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
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const roundNumber = (num: number, placeValue: string) => {
    let rounded: number;
    let placeName: string;
    let divisor: number;
    const steps: string[] = [];

    steps.push(`Original number: ${num}`);

    switch (placeValue) {
      case "0.01":
        rounded = Math.round(num * 100) / 100;
        placeName = "nearest hundredth (0.01)";
        divisor = 100;
        steps.push(`Multiply by 100: ${num * 100}`);
        steps.push(`Round to nearest whole number: ${Math.round(num * 100)}`);
        steps.push(`Divide by 100: ${rounded}`);
        break;
      case "0.1":
        rounded = Math.round(num * 10) / 10;
        placeName = "nearest tenth (0.1)";
        divisor = 10;
        steps.push(`Multiply by 10: ${num * 10}`);
        steps.push(`Round to nearest whole number: ${Math.round(num * 10)}`);
        steps.push(`Divide by 10: ${rounded}`);
        break;
      case "1":
        rounded = Math.round(num);
        placeName = "nearest whole number";
        divisor = 1;
        steps.push(`Round to nearest integer: ${rounded}`);
        break;
      case "10":
        rounded = Math.round(num / 10) * 10;
        placeName = "nearest ten";
        divisor = 10;
        steps.push(`Divide by 10: ${num / 10}`);
        steps.push(`Round to nearest whole number: ${Math.round(num / 10)}`);
        steps.push(`Multiply by 10: ${rounded}`);
        break;
      case "100":
        rounded = Math.round(num / 100) * 100;
        placeName = "nearest hundred";
        divisor = 100;
        steps.push(`Divide by 100: ${num / 100}`);
        steps.push(`Round to nearest whole number: ${Math.round(num / 100)}`);
        steps.push(`Multiply by 100: ${rounded}`);
        break;
      case "1000":
        rounded = Math.round(num / 1000) * 1000;
        placeName = "nearest thousand";
        divisor = 1000;
        steps.push(`Divide by 1000: ${num / 1000}`);
        steps.push(`Round to nearest whole number: ${Math.round(num / 1000)}`);
        steps.push(`Multiply by 1000: ${rounded}`);
        break;
      case "10000":
        rounded = Math.round(num / 10000) * 10000;
        placeName = "nearest ten thousand";
        divisor = 10000;
        steps.push(`Divide by 10000: ${num / 10000}`);
        steps.push(`Round to nearest whole number: ${Math.round(num / 10000)}`);
        steps.push(`Multiply by 10000: ${rounded}`);
        break;
      case "100000":
        rounded = Math.round(num / 100000) * 100000;
        placeName = "nearest hundred thousand";
        divisor = 100000;
        steps.push(`Divide by 100000: ${num / 100000}`);
        steps.push(`Round to nearest whole number: ${Math.round(num / 100000)}`);
        steps.push(`Multiply by 100000: ${rounded}`);
        break;
      default:
        rounded = Math.round(num);
        placeName = "nearest whole number";
        divisor = 1;
        steps.push(`Round to nearest integer: ${rounded}`);
    }

    const explanation = `${num} rounded to ${placeName} is ${rounded}`;
    const difference = Math.abs(num - rounded);
    steps.push(`\nFinal result: ${rounded}`);
    steps.push(`Difference from original: ${difference}`);

    return { original: num, rounded, place: placeName, explanation, difference, steps };
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

  const loadExample = (num: string, placeValue: string) => {
    setNumber(num);
    setPlace(placeValue);
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Estimation & Rounding Tool – Round to Any Place Value</h1>
        <p className="text-muted-foreground">
          Round numbers to the nearest ten, hundred, thousand, or decimal place with our free online estimation tool. Perfect for quick estimates, mental math, and understanding significant figures with step-by-step solutions.
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Round Number</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("1234.567", "10")}>1234.567 to 10s</Button>
          <Button variant="outline" onClick={() => loadExample("98765", "100")}>98765 to 100s</Button>
          <Button variant="outline" onClick={() => loadExample("3.14159", "0.01")}>π to hundredths</Button>
          <Button variant="outline" onClick={() => loadExample("1567890", "1000")}>1,567,890 to 1000s</Button>
          <Button variant="outline" onClick={() => loadExample("2.71828", "0.1")}>e to tenths</Button>
          <Button variant="outline" onClick={() => loadExample("456", "100")}>456 to 100s</Button>
          <Button variant="outline" onClick={() => loadExample("0.999", "1")}>0.999 to whole</Button>
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

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                {result.steps.map((step, i) => (
                  <div key={i} className={step.startsWith("\n") ? "mt-4 font-semibold" : ""}>
                    {step.startsWith("\n") ? step.slice(1) : step}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Rounding Rule Applied</h4>
              <p className="text-sm text-muted-foreground">
                Look at the digit immediately after the place you're rounding to. If it's 5 or greater, round up. If it's 4 or less, round down (keep the digit the same).
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Rounding and Estimation</h2>
        <p className="text-muted-foreground">
          Rounding simplifies numbers while keeping them close to their original value. We round to make numbers easier to work with, communicate, or remember. When you say a movie is "about 2 hours" instead of "1 hour 47 minutes," you're rounding. When a news report says "nearly 50,000 people attended," that's rounding too.
        </p>
        <p className="text-muted-foreground">
          The basic rule is simple: look at the digit after the place you're rounding to. If it's 5, 6, 7, 8, or 9, round up. If it's 0, 1, 2, 3, or 4, round down (keep the digit). This "round half up" method is what most people learn in school and use in everyday life.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Rounding Rules Explained</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Identify the rounding place</p>
                <p className="text-muted-foreground">
                  Decide which place value you're rounding to: tens, hundreds, tenths, etc. This determines your target precision.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Look at the next digit</p>
                <p className="text-muted-foreground">
                  Check the digit immediately to the right of your rounding place. This digit determines whether you round up or down.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Apply the rounding rule</p>
                <p className="text-muted-foreground">
                  5 or higher: round up (add 1 to the rounding place digit). 4 or lower: round down (keep the digit the same).
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Replace remaining digits</p>
                <p className="text-muted-foreground">
                  For whole number rounding, replace all digits to the right with zeros. For decimal rounding, simply drop the extra digits.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Round 1234.567 to Nearest Ten</h4>
            <div className="text-sm space-y-2">
              <p>Original: 1234.567</p>
              <p>Rounding place: tens (the 3)</p>
              <p>Next digit: 4 (in the ones place)</p>
              <p>4 is less than 5, so round down</p>
              <p>Result: 1230</p>
              <p className="text-muted-foreground">The 4 tells us 1234 is closer to 1230 than to 1240.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Round 98765 to Nearest Hundred</h4>
            <div className="text-sm space-y-2">
              <p>Original: 98765</p>
              <p>Rounding place: hundreds (the 7)</p>
              <p>Next digit: 6 (in the tens place)</p>
              <p>6 is 5 or greater, so round up</p>
              <p>Result: 98800</p>
              <p className="text-muted-foreground">The 6 tells us 98765 is closer to 98800 than to 98700.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Round π (3.14159) to Hundredths</h4>
            <div className="text-sm space-y-2">
              <p>Original: 3.14159...</p>
              <p>Rounding place: hundredths (the 4)</p>
              <p>Next digit: 1 (in the thousandths place)</p>
              <p>1 is less than 5, so round down</p>
              <p>Result: 3.14</p>
              <p className="text-muted-foreground">This is the familiar approximation of pi used in many calculations.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Round 1,567,890 to Nearest Thousand</h4>
            <div className="text-sm space-y-2">
              <p>Original: 1,567,890</p>
              <p>Rounding place: thousands (the 7)</p>
              <p>Next digit: 8 (in the hundreds place)</p>
              <p>8 is 5 or greater, so round up</p>
              <p>Result: 1,568,000</p>
              <p className="text-muted-foreground">Large numbers are often rounded to thousands or millions for easier communication.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: Round e (2.71828) to Tenths</h4>
            <div className="text-sm space-y-2">
              <p>Original: 2.71828...</p>
              <p>Rounding place: tenths (the 7)</p>
              <p>Next digit: 1 (in the hundredths place)</p>
              <p>1 is less than 5, so round down</p>
              <p>Result: 2.7</p>
              <p className="text-muted-foreground">Euler's number e rounded to one decimal place. Useful for quick estimates.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 6: Round 456 to Nearest Hundred</h4>
            <div className="text-sm space-y-2">
              <p>Original: 456</p>
              <p>Rounding place: hundreds (the 4)</p>
              <p>Next digit: 5 (in the tens place)</p>
              <p>5 means round up (round half up rule)</p>
              <p>Result: 500</p>
              <p className="text-muted-foreground">When the next digit is exactly 5, we round up by convention.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 7: Round 0.999 to Whole Number</h4>
            <div className="text-sm space-y-2">
              <p>Original: 0.999</p>
              <p>Rounding place: ones (the 0)</p>
              <p>Next digit: 9 (in the tenths place)</p>
              <p>9 is 5 or greater, so round up</p>
              <p>Result: 1</p>
              <p className="text-muted-foreground">0.999 is very close to 1. In fact, 0.999... (repeating) equals exactly 1.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>NASA uses different rounding for space missions.</strong> For critical calculations, NASA often uses "round half to even" (banker's rounding) instead of "round half up." This reduces cumulative rounding errors in long calculations. With banker's rounding, 2.5 rounds to 2 and 3.5 rounds to 4 – always to the nearest even number.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do we round up when the digit is 5?</h4>
            <p className="text-sm text-muted-foreground">
              It's a convention that simplifies things. The digit 5 is exactly halfway between rounding up and down. By always rounding 5 up, we have a consistent rule. Some systems use "round half to even" to reduce bias in large datasets.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I round during calculations?</h4>
            <p className="text-sm text-muted-foreground">
              Keep full precision during intermediate steps. Only round the final answer. Rounding too early introduces errors that compound. For example, don't round 1/3 to 0.33 in the middle of a calculation – wait until the end.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between rounding and truncating?</h4>
            <p className="text-sm text-muted-foreground">
              Rounding finds the nearest value. Truncating just cuts off digits. 3.7 rounded to whole is 4; truncated it's 3. Truncating is faster but less accurate. Computers often truncate for integer conversion.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I round negative numbers?</h4>
            <p className="text-sm text-muted-foreground">
              The same rules apply. -3.7 rounded to whole is -4 (it's closer to -4 than -3). Think of it on a number line: which integer is the number closer to?
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What are significant figures?</h4>
            <p className="text-sm text-muted-foreground">
              Significant figures are the meaningful digits in a measurement. They indicate precision. 123 has 3 sig figs; 0.00123 also has 3 (leading zeros don't count). Results should be rounded to match the least precise measurement.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is estimation useful?</h4>
            <p className="text-sm text-muted-foreground">
              Estimation helps you quickly check if answers make sense. Before using a calculator, estimate to catch input errors. In real life, exact numbers often aren't needed – "about $50" is more useful than "$47.83" for budgeting.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/significant-figures-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Significant Figures</p>
            <p className="text-xs text-muted-foreground">Sig fig calculator</p>
          </a>
          <a href="/math-tools/arithmetic-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Arithmetic Calculator</p>
            <p className="text-xs text-muted-foreground">Basic calculations</p>
          </a>
          <a href="/math-tools/percentage-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Percentage Calculator</p>
            <p className="text-xs text-muted-foreground">Percent calculations</p>
          </a>
        </div>
      </section>
    </div>
  );
}
