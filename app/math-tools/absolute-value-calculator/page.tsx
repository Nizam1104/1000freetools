"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AbsoluteValueCalculator() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const num = parseFloat(number);
    if (!isNaN(num)) {
      setResult(Math.abs(num));
    }
  };

  const reset = () => {
    setNumber("");
    setResult(null);
  };

  const loadExample = (exampleNum?: number) => {
    const examples = [
      "-47",
      "23.5",
      "-0.001",
      "1000",
      "-3.14159",
    ];
    const example = examples[exampleNum !== undefined ? exampleNum % examples.length : 0];
    setNumber(example);
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Absolute Value Calculator – Find |x| of Any Number</h1>
        <p className="text-muted-foreground">
          Calculate the absolute value of any number or expression instantly with our free online absolute value calculator. Supports positive, negative, and decimal numbers.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number (x)</Label>
          <Input
            type="number"
            placeholder="Enter any number (e.g., -15)"
            step="any"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Select onValueChange={(v) => loadExample(parseInt(v))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Load Example" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Example 1: -47</SelectItem>
              <SelectItem value="1">Example 2: 23.5</SelectItem>
              <SelectItem value="2">Example 3: -0.001</SelectItem>
              <SelectItem value="3">Example 4: 1000</SelectItem>
              <SelectItem value="4">Example 5: -3.14159</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {result !== null && (
          <div className="p-6 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Result</p>
            <p className="text-4xl font-bold font-mono">
              |{number}| = {result}
            </p>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Absolute Value</h2>
        <p className="text-muted-foreground">
          Absolute value measures distance from zero – nothing more, nothing less. It answers the question: "How far is this number from 0 on the number line?" Since distance can't be negative, absolute value is always zero or positive.
        </p>
        <p className="text-muted-foreground">
          Think of it this way: if you're standing at position -5 on a number line, you're 5 steps away from zero. If you're at position +5, you're also 5 steps away. The direction doesn't matter for distance – that's what absolute value captures.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Absolute Value Rule</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-mono text-center text-lg mb-2">|x| = x if x ≥ 0, and |x| = -x if x &lt; 0</p>
          <p className="text-sm text-muted-foreground text-center">
            In plain English: keep positive numbers as-is, flip the sign of negative numbers
          </p>
        </div>
        <p className="text-muted-foreground">
          The notation uses vertical bars: |x|. You'll see this everywhere in math – from basic algebra to calculus to physics. When you see |−7|, read it as "the absolute value of negative 7" or "the distance of negative 7 from zero."
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        
        <div className="space-y-6">
          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Example 1: Absolute value of a negative integer</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Find |−47|
            </p>
            <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
              <p>−47 is negative, so we flip the sign</p>
              <p>|−47| = −(−47) = 47</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              The absolute value of −47 is 47. It's 47 units away from zero.
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Example 2: Absolute value of a positive decimal</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Find |23.5|
            </p>
            <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
              <p>23.5 is already positive, so it stays the same</p>
              <p>|23.5| = 23.5</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Positive numbers don't change. The absolute value of 23.5 is 23.5.
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Example 3: Absolute value of a small negative number</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Find |−0.001|
            </p>
            <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
              <p>−0.001 is negative, so we flip the sign</p>
              <p>|−0.001| = 0.001</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Even tiny negative numbers become positive. The absolute value is 0.001.
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Example 4: Absolute value with expressions</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Find |5 − 12|
            </p>
            <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
              <p>First simplify inside the bars</p>
              <p>5 − 12 = −7</p>
              <p>Then take the absolute value</p>
              <p>|−7| = 7</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Always simplify the expression first, then apply the absolute value.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-5 bg-accent/10 rounded-lg">
          <p className="text-muted-foreground">
            The vertical bar notation |x| was introduced by German mathematician Karl Weierstrass in 1841. Before that, mathematicians wrote out "abs(x)" or used other notations. The bars are elegant because they visually "trap" the negative sign – like cages that strip away the negativity, leaving only the magnitude.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Can absolute value ever be negative?</h4>
            <p className="text-sm text-muted-foreground">
              No. Absolute value represents distance, and distance is never negative. The smallest possible absolute value is 0 (for the number 0 itself). Every other number – positive or negative – has a positive absolute value.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the absolute value of zero?</h4>
            <p className="text-sm text-muted-foreground">
              |0| = 0. Zero is already at the origin, so its distance from zero is... zero. It's the only number whose absolute value equals itself and is neither positive nor negative.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I handle absolute value in equations?</h4>
            <p className="text-sm text-muted-foreground">
              When you see |x| = 5, there are two solutions: x = 5 or x = −5. Both are 5 units from zero. For more complex equations like |2x − 3| = 7, split it into two cases: 2x − 3 = 7 and 2x − 3 = −7, then solve each separately.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does absolute value work with imaginary numbers?</h4>
            <p className="text-sm text-muted-foreground">
              For complex numbers, we use "modulus" instead of absolute value, but the idea is similar – it's the distance from the origin in the complex plane. For a complex number a + bi, the modulus is √(a² + b²). For real numbers, this reduces to regular absolute value.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is absolute value useful in real life?</h4>
            <p className="text-sm text-muted-foreground">
              Absolute value shows up whenever you care about magnitude, not direction. Examples: calculating how far off a measurement is (error = |actual − expected|), finding the difference between two temperatures regardless of which is higher, or computing distances in physics and engineering.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between absolute value and parentheses?</h4>
            <p className="text-sm text-muted-foreground">
              Parentheses ( ) are for grouping – they tell you what to calculate first. Absolute value bars | | are an operation – they transform the number inside. So (−5) is still −5, but |−5| becomes 5. Don't confuse them!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
