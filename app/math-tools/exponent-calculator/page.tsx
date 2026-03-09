"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ExponentCalculator() {
  const [base, setBase] = useState("");
  const [exponent, setExponent] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const calculate = () => {
    const b = parseFloat(base);
    const e = parseFloat(exponent);
    
    if (isNaN(b) || isNaN(e)) {
      setResult(null);
      setSteps([]);
      return;
    }

    const calcSteps: string[] = [];
    calcSteps.push(`Calculating: ${base}^${exponent}`);
    calcSteps.push(``);

    if (e === 0) {
      calcSteps.push(`Any non-zero number raised to the power of 0 equals 1`);
      calcSteps.push(`${base}^0 = 1`);
    } else if (e === 1) {
      calcSteps.push(`Any number raised to the power of 1 equals itself`);
      calcSteps.push(`${base}^1 = ${base}`);
    } else if (e > 0 && Number.isInteger(e) && e <= 10) {
      calcSteps.push(`Expanding: ${base}^${e} = ${Array(e).fill(base).join(' × ')}`);
      let product = 1;
      for (let i = 0; i < e; i++) {
        product *= b;
      }
      calcSteps.push(`Multiplying: ${product}`);
    } else if (e < 0) {
      calcSteps.push(`Negative exponent rule: ${base}^${e} = 1 / ${base}^${Math.abs(e)}`);
      const positiveResult = Math.pow(b, Math.abs(e));
      calcSteps.push(`= 1 / ${positiveResult}`);
      calcSteps.push(`= ${1 / positiveResult}`);
    } else if (!Number.isInteger(e)) {
      calcSteps.push(`Fractional exponent: ${base}^${e}`);
      calcSteps.push(`This equals the ${e}th root of ${base}`);
      calcSteps.push(`Result: ${Math.pow(b, e)}`);
    } else {
      calcSteps.push(`Using exponentiation: ${base}^${e}`);
      calcSteps.push(`Result: ${Math.pow(b, e)}`);
    }

    setResult(Math.pow(b, e));
    setSteps(calcSteps);
  };

  const reset = () => {
    setBase("");
    setExponent("");
    setResult(null);
    setSteps([]);
  };

  const loadExample = (b: string, e: string) => {
    setBase(b);
    setExponent(e);
    setResult(null);
    setSteps([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Exponent Calculator – Calculate Base to the Power of n</h1>
        <p className="text-muted-foreground">
          Easily calculate any number raised to a power with our free exponent calculator. Supports positive, negative, and fractional exponents for fast and accurate results with step-by-step solutions.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Base (b)</Label>
            <Input
              type="number"
              placeholder="Enter base number (e.g., 2)"
              step="any"
              value={base}
              onChange={(e) => setBase(e.target.value)}
            />
          </div>
          <div>
            <Label>Exponent / Power (n)</Label>
            <Input
              type="number"
              placeholder="Enter exponent/power (e.g., 3)"
              step="any"
              value={exponent}
              onChange={(e) => setExponent(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("2", "10")}>2¹⁰</Button>
          <Button variant="outline" onClick={() => loadExample("3", "4")}>3⁴</Button>
          <Button variant="outline" onClick={() => loadExample("5", "-2")}>5⁻²</Button>
          <Button variant="outline" onClick={() => loadExample("10", "6")}>10⁶</Button>
          <Button variant="outline" onClick={() => loadExample("2", "0.5")}>√2</Button>
          <Button variant="outline" onClick={() => loadExample("7", "0")}>7⁰</Button>
          <Button variant="outline" onClick={() => loadExample("1.5", "3")}>1.5³</Button>
        </div>

        {result !== null && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Result</p>
              <p className="text-5xl font-bold">
                {base}<sup>{exponent}</sup> = {result}
              </p>
              {Number.isInteger(result) && result < 1000000 && (
                <p className="text-sm text-muted-foreground mt-2">
                  {result.toLocaleString()}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Base</p>
                <p className="text-2xl font-bold">{base}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Exponent</p>
                <p className="text-2xl font-bold">{exponent}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Result</p>
                <p className="text-2xl font-bold">{result}</p>
              </div>
            </div>

            {steps.length > 0 && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
                <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                  {steps.map((step, i) => (
                    <div key={i} className={step === "" ? "h-4" : ""}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Scientific Notation</h4>
              <p className="text-lg font-mono">{result.toExponential(6)}</p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Exponents</h2>
        <p className="text-muted-foreground">
          An exponent tells you how many times to multiply a number by itself. In 2³, the base is 2 and the exponent is 3, meaning 2 × 2 × 2 = 8. Exponents are a compact way to write repeated multiplication, just as multiplication is a compact way to write repeated addition.
        </p>
        <p className="text-muted-foreground">
          Exponents appear everywhere in math and science. Compound interest uses exponents to calculate growth. Physics uses them for inverse-square laws (gravity, light intensity). Computer science uses powers of 2 for memory sizes. Understanding exponents is essential for algebra and beyond.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Exponent Rules</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Basic Rules</h4>
            <div className="space-y-2 text-sm font-mono">
              <div>a⁰ = 1 (any non-zero base)</div>
              <div>a¹ = a</div>
              <div>aⁿ = a × a × ... × a (n times)</div>
              <div>1ⁿ = 1 (any exponent)</div>
              <div>0ⁿ = 0 (positive n)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Negative Exponents</h4>
            <div className="space-y-2 text-sm font-mono">
              <div>a⁻ⁿ = 1/aⁿ</div>
              <div>2⁻³ = 1/2³ = 1/8</div>
              <div>5⁻² = 1/5² = 1/25</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Negative exponents mean "one over" the positive power.</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Fractional Exponents</h4>
            <div className="space-y-2 text-sm font-mono">
              <div>a^(1/n) = ⁿ√a (nth root)</div>
              <div>a^(m/n) = ⁿ√(aᵐ)</div>
              <div>4^(1/2) = √4 = 2</div>
              <div>8^(1/3) = ³√8 = 2</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Fractional exponents represent roots.</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Power Rules</h4>
            <div className="space-y-2 text-sm font-mono">
              <div>aᵐ × aⁿ = aᵐ⁺ⁿ</div>
              <div>aᵐ ÷ aⁿ = aᵐ⁻ⁿ</div>
              <div>(aᵐ)ⁿ = aᵐⁿ</div>
              <div>(ab)ⁿ = aⁿbⁿ</div>
              <div>(a/b)ⁿ = aⁿ/bⁿ</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: 2¹⁰</h4>
            <div className="text-sm space-y-2">
              <p>Base: 2, Exponent: 10</p>
              <p>Expanding: 2¹⁰ = 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2</p>
              <p>Calculating: 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024</p>
              <p>Result: 1024</p>
              <p className="text-muted-foreground">Powers of 2 are fundamental in computing. 2¹⁰ = 1024 is approximately 1000 (kilo in binary).</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: 3⁴</h4>
            <div className="text-sm space-y-2">
              <p>Base: 3, Exponent: 4</p>
              <p>Expanding: 3⁴ = 3 × 3 × 3 × 3</p>
              <p>Calculating: 3 × 3 = 9, 9 × 3 = 27, 27 × 3 = 81</p>
              <p>Result: 81</p>
              <p className="text-muted-foreground">Three to the fourth power. Each multiplication triples the previous result.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: 5⁻²</h4>
            <div className="text-sm space-y-2">
              <p>Base: 5, Exponent: -2</p>
              <p>Negative exponent rule: 5⁻² = 1/5²</p>
              <p>Calculate positive power: 5² = 25</p>
              <p>Result: 1/25 = 0.04</p>
              <p className="text-muted-foreground">Negative exponents give reciprocals. The result is less than 1.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: 10⁶</h4>
            <div className="text-sm space-y-2">
              <p>Base: 10, Exponent: 6</p>
              <p>10⁶ = 10 × 10 × 10 × 10 × 10 × 10</p>
              <p>Result: 1,000,000 (one million)</p>
              <p className="text-muted-foreground">Powers of 10 are easy: just write 1 followed by that many zeros. 10⁶ is the metric prefix "mega".</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: 2^0.5 (Square Root of 2)</h4>
            <div className="text-sm space-y-2">
              <p>Base: 2, Exponent: 0.5 (or 1/2)</p>
              <p>Fractional exponent: 2^(1/2) = √2</p>
              <p>Result: 1.414213...</p>
              <p className="text-muted-foreground">The square root of 2 is irrational – its decimal never ends or repeats. It's approximately 1.414.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 6: 7⁰</h4>
            <div className="text-sm space-y-2">
              <p>Base: 7, Exponent: 0</p>
              <p>Zero exponent rule: any non-zero number to the power 0 equals 1</p>
              <p>Result: 1</p>
              <p className="text-muted-foreground">Why is a⁰ = 1? Because aⁿ ÷ aⁿ = a⁰ = 1. It keeps the exponent rules consistent.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 7: 1.5³</h4>
            <div className="text-sm space-y-2">
              <p>Base: 1.5, Exponent: 3</p>
              <p>Expanding: 1.5³ = 1.5 × 1.5 × 1.5</p>
              <p>Calculating: 1.5 × 1.5 = 2.25, 2.25 × 1.5 = 3.375</p>
              <p>Result: 3.375</p>
              <p className="text-muted-foreground">Decimal bases work the same way. 1.5³ = (3/2)³ = 27/8 = 3.375.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>The word "exponent" was coined by Michael Stifel in 1544.</strong> It comes from Latin meaning "placed out" – the exponent is placed out (above) the base. Before exponents, mathematicians wrote out repeated multiplication in full. René Descartes introduced the modern notation (like x³) in 1637.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What does an exponent of 0 mean?</h4>
            <p className="text-sm text-muted-foreground">
              Any non-zero number raised to the power 0 equals 1. This keeps the exponent rules consistent: aᵐ ÷ aᵐ = aᵐ⁻ᵐ = a⁰ = 1. Zero to the power 0 is undefined (or defined as 1 in some contexts).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do negative exponents work?</h4>
            <p className="text-sm text-muted-foreground">
              A negative exponent means "one over" the positive power: a⁻ⁿ = 1/aⁿ. So 2⁻³ = 1/2³ = 1/8. Negative exponents give values less than 1 (for bases greater than 1).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a fractional exponent?</h4>
            <p className="text-sm text-muted-foreground">
              Fractional exponents represent roots. a^(1/2) is the square root of a. a^(1/3) is the cube root. a^(3/2) means square root of a, then cube it (or vice versa).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is 0⁰ undefined?</h4>
            <p className="text-sm text-muted-foreground">
              There are conflicting limits: 0ⁿ approaches 0 as n approaches 0, but n⁰ approaches 1 as n approaches 0. In some contexts (like combinatorics), 0⁰ is defined as 1 for convenience.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate large exponents?</h4>
            <p className="text-sm text-muted-foreground">
              For very large exponents, use a calculator or computer. For mental math, break it down: 2¹⁰ = (2⁵)² = 32² = 1024. Use exponent rules to simplify before calculating.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between -2² and (-2)²?</h4>
            <p className="text-sm text-muted-foreground">
              Order of operations matters! -2² = -(2²) = -4. But (-2)² = (-2) × (-2) = 4. Parentheses change everything. Always use parentheses for negative bases.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/square-root-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Square Root Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate square roots</p>
          </a>
          <a href="/math-tools/logarithm-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Logarithm Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate logarithms</p>
          </a>
          <a href="/math-tools/scientific-notation-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Scientific Notation</p>
            <p className="text-xs text-muted-foreground">Convert to/from scientific notation</p>
          </a>
        </div>
      </section>
    </div>
  );
}
