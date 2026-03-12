"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Coefficient {
  id: number;
  power: number;
  value: string;
}

export default function PolynomialEvaluator() {
  const [coefficients, setCoefficients] = useState<Coefficient[]>([
    { id: 1, power: 2, value: "" },
    { id: 2, power: 1, value: "" },
    { id: 3, power: 0, value: "" },
  ]);
  const [xValue, setXValue] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const addCoefficient = () => {
    const maxPower = Math.max(...coefficients.map((c) => c.power));
    setCoefficients([
      ...coefficients,
      { id: Date.now(), power: maxPower + 1, value: "" },
    ]);
  };

  const removeCoefficient = (id: number) => {
    if (coefficients.length > 2) {
      setCoefficients(coefficients.filter((c) => c.id !== id));
    }
  };

  const updateCoefficient = (id: number, value: string) => {
    setCoefficients(
      coefficients.map((c) => (c.id === id ? { ...c, value } : c))
    );
  };

  const evaluate = () => {
    const x = parseFloat(xValue);
    if (isNaN(x)) {
      setResult(null);
      setSteps([]);
      return;
    }

    const sortedCoeffs = [...coefficients].sort((a, b) => b.power - a.power);
    let total = 0;
    const calculationSteps: string[] = [];
    const terms: string[] = [];

    sortedCoeffs.forEach((coeff) => {
      const coefVal = parseFloat(coeff.value) || 0;
      const termValue = coefVal * Math.pow(x, coeff.power);
      total += termValue;

      if (coeff.power === 0) {
        terms.push(`${coefVal}`);
        calculationSteps.push(`${coefVal} × ${x}⁰ = ${coefVal} × 1 = ${termValue}`);
      } else if (coeff.power === 1) {
        terms.push(`${coefVal}x`);
        calculationSteps.push(`${coefVal} × ${x}¹ = ${coefVal} × ${x} = ${termValue}`);
      } else {
        terms.push(`${coefVal}x^${coeff.power}`);
        calculationSteps.push(
          `${coefVal} × ${x}^${coeff.power} = ${coefVal} × ${Math.pow(x, coeff.power)} = ${termValue}`
        );
      }
    });

    calculationSteps.push(`Total: ${terms.join(" + ")} = ${total}`);

    setResult(total);
    setSteps(calculationSteps);
  };

  const reset = () => {
    setCoefficients([
      { id: 1, power: 2, value: "" },
      { id: 2, power: 1, value: "" },
      { id: 3, power: 0, value: "" },
    ]);
    setXValue("");
    setResult(null);
    setSteps([]);
  };

  const loadExample = (example: string) => {
    if (example === "quadratic1") {
      setCoefficients([
        { id: 1, power: 2, value: "2" },
        { id: 2, power: 1, value: "-3" },
        { id: 3, power: 0, value: "1" },
      ]);
      setXValue("4");
    } else if (example === "cubic") {
      setCoefficients([
        { id: 1, power: 3, value: "1" },
        { id: 2, power: 2, value: "-6" },
        { id: 3, power: 1, value: "11" },
        { id: 4, power: 0, value: "-6" },
      ]);
      setXValue("2");
    } else if (example === "quartic") {
      setCoefficients([
        { id: 1, power: 4, value: "1" },
        { id: 2, power: 3, value: "0" },
        { id: 3, power: 2, value: "-5" },
        { id: 4, power: 1, value: "0" },
        { id: 5, power: 0, value: "4" },
      ]);
      setXValue("3");
    } else if (example === "linear") {
      setCoefficients([
        { id: 1, power: 1, value: "5" },
        { id: 2, power: 0, value: "-10" },
      ]);
      setXValue("6");
    } else if (example === "complex") {
      setCoefficients([
        { id: 1, power: 5, value: "0.5" },
        { id: 2, power: 4, value: "-2" },
        { id: 3, power: 3, value: "3" },
        { id: 4, power: 2, value: "-1" },
        { id: 5, power: 1, value: "4" },
        { id: 6, power: 0, value: "7" },
      ]);
      setXValue("2");
    }
    setResult(null);
    setSteps([]);
  };

  const sortedCoefficients = [...coefficients].sort((a, b) => b.power - a.power);
  const polynomialExpression = sortedCoefficients
    .map((c) => {
      const val = parseFloat(c.value) || 0;
      if (c.power === 0) return `${val}`;
      if (c.power === 1) return val === 1 ? "x" : val === -1 ? "-x" : `${val}x`;
      return val === 1 ? `x^${c.power}` : val === -1 ? `-x^${c.power}` : `${val}x^${c.power}`;
    })
    .join(" + ").replace(/\+ -/g, "- ");

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Polynomial Evaluator - Calculate Polynomial Value at Any x
          </h1>
          <p className="text-xl text-muted-foreground">
            Evaluate any polynomial expression at a given value of x with our free online polynomial evaluator. Supports polynomials of any degree with instant accurate results.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium mb-2">Polynomial Expression:</p>
              <p className="text-lg font-mono">{polynomialExpression || "Enter coefficients"}</p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Value of x</label>
              <Input
                type="number"
                placeholder="Enter x value (e.g., 2)"
                step="any"
                value={xValue}
                onChange={(e) => setXValue(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Coefficients</label>
                <Button variant="outline" size="sm" onClick={addCoefficient}>
                  Add Term
                </Button>
              </div>
              {sortedCoefficients.map((coeff) => (
                <div key={coeff.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="number"
                      placeholder="0"
                      step="any"
                      value={coeff.value}
                      onChange={(e) => updateCoefficient(coeff.id, e.target.value)}
                      className="w-32"
                    />
                    {coeff.power === 0 ? (
                      <span className="text-muted-foreground">(constant)</span>
                    ) : coeff.power === 1 ? (
                      <span className="text-muted-foreground">· x</span>
                    ) : (
                      <span className="text-muted-foreground">· x^{coeff.power}</span>
                    )}
                  </div>
                  {coefficients.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCoefficient(coeff.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button onClick={evaluate}>Evaluate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground self-center">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample("quadratic1")}>2x² - 3x + 1</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("cubic")}>x³ - 6x² + 11x - 6</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("quartic")}>x⁴ - 5x² + 4</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("linear")}>5x - 10</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("complex")}>0.5x⁵ - 2x⁴ + 3x³ - x² + 4x + 7</Button>
            </div>

            {result !== null && (
              <div className="p-4 bg-muted rounded-md mt-4">
                <p className="text-sm text-muted-foreground mb-2">Result</p>
                <p className="text-2xl font-semibold">
                  P({xValue}) = {result}
                </p>
              </div>
            )}

            {steps.length > 0 && (
              <div className="p-4 bg-muted rounded-md mt-4">
                <p className="text-sm font-medium mb-3">Step-by-Step Calculation</p>
                <ol className="space-y-2 text-sm">
                  {steps.map((step, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-muted-foreground">{index + 1}.</span>
                      <span className="font-mono">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

        <section className="border-t pt-8 space-y-6">
          <h2 className="text-2xl font-semibold">Understanding Polynomials</h2>
          <p className="text-muted-foreground">
            A polynomial is a mathematical expression made up of variables (like x), coefficients (numbers), and exponents (powers), combined using addition, subtraction, and multiplication. The word comes from Greek "poly" (many) and Latin "nomen" (name/term) - literally "many terms."
          </p>
          <p className="text-muted-foreground">
            Polynomials are everywhere in mathematics and science. They describe projectile motion, model economic trends, approximate complex functions, and form the basis of calculus. Evaluating a polynomial means finding its value when the variable equals a specific number.
          </p>
        </section>

        <section className="border-t pt-8 space-y-6">
          <h3 className="text-xl font-semibold">Polynomial Notation</h3>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-3">
              A polynomial in x is written as:
            </p>
            <div className="font-mono text-center text-lg mb-3">
              P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₂x² + a₁x + a₀
            </div>
            <p className="text-sm text-muted-foreground">
              Each aᵢ is a coefficient (can be any real number). The highest power n is called the degree. a₀ is the constant term (x⁰ = 1).
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mt-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Degree 1</h4>
              <p className="text-xs text-muted-foreground mb-1">Linear</p>
              <p className="font-mono text-xs">ax + b</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Degree 2</h4>
              <p className="text-xs text-muted-foreground mb-1">Quadratic</p>
              <p className="font-mono text-xs">ax² + bx + c</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Degree 3</h4>
              <p className="text-xs text-muted-foreground mb-1">Cubic</p>
              <p className="font-mono text-xs">ax³ + bx² + cx + d</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Degree 4</h4>
              <p className="text-xs text-muted-foreground mb-1">Quartic</p>
              <p className="font-mono text-xs">ax⁴ + bx³ + cx² + dx + e</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-8 space-y-6">
          <h3 className="text-xl font-semibold">Worked Examples</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Example 1: Evaluating a Quadratic</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Evaluate P(x) = 2x² - 3x + 1 when x = 4
              </p>
              <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
                <div>P(4) = 2(4)² - 3(4) + 1</div>
                <div>P(4) = 2(16) - 12 + 1</div>
                <div>P(4) = 32 - 12 + 1</div>
                <div className="text-green-600 font-semibold">P(4) = 21</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Example 2: Evaluating a Cubic</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Evaluate P(x) = x³ - 6x² + 11x - 6 when x = 2
              </p>
              <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
                <div>P(2) = (2)³ - 6(2)² + 11(2) - 6</div>
                <div>P(2) = 8 - 6(4) + 22 - 6</div>
                <div>P(2) = 8 - 24 + 22 - 6</div>
                <div className="text-green-600 font-semibold">P(2) = 0</div>
                <div className="text-muted-foreground">x = 2 is a root of this polynomial!</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Example 3: Evaluating a Quartic</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Evaluate P(x) = x⁴ - 5x² + 4 when x = 3
              </p>
              <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
                <div>P(3) = (3)⁴ - 5(3)² + 4</div>
                <div>P(3) = 81 - 5(9) + 4</div>
                <div>P(3) = 81 - 45 + 4</div>
                <div className="text-green-600 font-semibold">P(3) = 40</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Example 4: Real-World Application</h4>
              <p className="text-sm text-muted-foreground mb-2">
                A ball's height (in meters) after t seconds is given by h(t) = -4.9t² + 20t + 1.5. What's the height after 2 seconds?
              </p>
              <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
                <div>h(2) = -4.9(2)² + 20(2) + 1.5</div>
                <div>h(2) = -4.9(4) + 40 + 1.5</div>
                <div>h(2) = -19.6 + 40 + 1.5</div>
                <div className="text-green-600 font-semibold">h(2) = 21.9 meters</div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t pt-8 space-y-6">
          <h3 className="text-xl font-semibold">Quick Fact</h3>
          <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <p className="text-sm">
              The quadratic formula for solving ax² + bx + c = 0 was known to Babylonian mathematicians around 2000 BCE. However, the general solution for cubic equations wasn't discovered until the 16th century in Italy. Mathematicians Tartaglia and Cardano famously fought over credit for the cubic formula, leading to one of history's most famous mathematical disputes.
            </p>
          </div>
        </section>

        <section className="border-t pt-8 space-y-6">
          <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-sm mb-2">What is the degree of a polynomial?</h4>
              <p className="text-sm text-muted-foreground">
                The degree is the highest power of the variable in the polynomial. For example, 3x⁴ + 2x² - 5 has degree 4. The degree determines the polynomial's general shape and maximum number of roots (x-intercepts).
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What's a root or zero of a polynomial?</h4>
              <p className="text-sm text-muted-foreground">
                A root is a value of x that makes the polynomial equal zero. If P(2) = 0, then x = 2 is a root. Roots are also called zeros or solutions. A polynomial of degree n has at most n real roots.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Can polynomials have negative or fractional coefficients?</h4>
              <p className="text-sm text-muted-foreground">
                Yes! Coefficients can be any real numbers: positive, negative, zero, fractions, or decimals. For example, -0.5x³ + (2/3)x² - √2x + π is a valid polynomial.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What is Horner's method?</h4>
              <p className="text-sm text-muted-foreground">
                Horner's method is an efficient algorithm for evaluating polynomials. Instead of computing powers separately, it rewrites P(x) = ((aₙx + aₙ₋₁)x + aₙ₋₂)x + ... This reduces the number of multiplications needed, making it faster for computers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Where are polynomials used in real life?</h4>
              <p className="text-sm text-muted-foreground">
                Polynomials model projectile motion (parabolas), design roller coaster curves, approximate complex functions in calculators, describe economic supply/demand curves, create smooth animations in computer graphics, and form the basis of error-correcting codes in digital communications.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What's the difference between a polynomial and a polynomial function?</h4>
              <p className="text-sm text-muted-foreground">
                A polynomial is the algebraic expression itself. A polynomial function is the rule that assigns each input x to the output P(x). In practice, the terms are often used interchangeably, but technically the function includes the domain and mapping concept.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
