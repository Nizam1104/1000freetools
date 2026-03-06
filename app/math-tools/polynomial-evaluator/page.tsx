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

  const sortedCoefficients = [...coefficients].sort((a, b) => b.power - a.power);
  const polynomialExpression = sortedCoefficients
    .map((c) => {
      const val = parseFloat(c.value) || 0;
      if (c.power === 0) return `${val}`;
      if (c.power === 1) return `${val}x`;
      return `${val}x^${c.power}`;
    })
    .join(" + ");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Polynomial Evaluator – Calculate Polynomial Value at Any x
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

            <div className="flex gap-2 pt-2">
              <Button onClick={evaluate}>Evaluate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
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

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">How to Evaluate Polynomials</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Set Coefficients</h3>
              <p className="text-sm text-muted-foreground">Enter the coefficient for each power of x.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Enter x Value</h3>
              <p className="text-sm text-muted-foreground">Specify the value at which to evaluate.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">Calculate Terms</h3>
              <p className="text-sm text-muted-foreground">Each term is computed: coefficient × x^power.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
              <h3 className="font-semibold mb-2">Sum Results</h3>
              <p className="text-sm text-muted-foreground">Add all term values to get the final result.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Polynomial Evaluator?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Any Degree Support</h3>
              <p className="text-sm text-muted-foreground">Evaluate polynomials of any degree by adding or removing terms.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Step-by-Step Solutions</h3>
              <p className="text-sm text-muted-foreground">See how each term is calculated and summed.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Decimal Support</h3>
              <p className="text-sm text-muted-foreground">Works with integers, decimals, and negative numbers.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Educational Tool</h3>
              <p className="text-sm text-muted-foreground">Perfect for students learning polynomial functions.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Polynomial Definition</h2>
          <div className="p-5 bg-muted rounded-lg mb-6">
            <p className="text-lg font-semibold mb-3 font-mono">P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀</p>
            <p className="text-sm text-muted-foreground">
              A polynomial is a mathematical expression consisting of variables and coefficients,
              combined using only addition, subtraction, multiplication, and non-negative integer exponents.
            </p>
          </div>
          <div className="p-5 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Examples</h3>
            <ul className="space-y-3 text-sm">
              <li className="pb-3 border-b border-border">
                <p className="font-medium">Linear (degree 1): P(x) = 2x + 3</p>
                <p className="text-muted-foreground">P(5) = 2(5) + 3 = 13</p>
              </li>
              <li className="pb-3 border-b border-border">
                <p className="font-medium">Quadratic (degree 2): P(x) = x² - 4x + 4</p>
                <p className="text-muted-foreground">P(3) = 9 - 12 + 4 = 1</p>
              </li>
              <li className="pb-3 border-b border-border">
                <p className="font-medium">Cubic (degree 3): P(x) = x³ - 6x² + 11x - 6</p>
                <p className="text-muted-foreground">P(2) = 8 - 24 + 22 - 6 = 0</p>
              </li>
              <li>
                <p className="font-medium">Quartic (degree 4): P(x) = 2x⁴ - 3x² + 1</p>
                <p className="text-muted-foreground">P(1) = 2 - 3 + 1 = 0</p>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Polynomial Terminology</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Basic Terms</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Coefficient:</strong> The number multiplying a power of x</li>
                <li><strong>Term:</strong> Each part of the polynomial (e.g., 3x²)</li>
                <li><strong>Degree:</strong> The highest power of x in the polynomial</li>
                <li><strong>Constant:</strong> The term with no x (x⁰ term)</li>
              </ul>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Polynomial Types</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Monomial:</strong> One term (e.g., 5x³)</li>
                <li><strong>Binomial:</strong> Two terms (e.g., x + 1)</li>
                <li><strong>Trinomial:</strong> Three terms (e.g., x² + 2x + 1)</li>
                <li><strong>Zero Polynomial:</strong> All coefficients are zero</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is a polynomial?</h3>
              <p className="text-sm text-muted-foreground">A polynomial is an expression made of variables, coefficients, and exponents combined using addition, subtraction, and multiplication. The exponents must be non-negative integers.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How do you evaluate a polynomial?</h3>
              <p className="text-sm text-muted-foreground">Substitute the given value for x in each term, calculate each term's value, then add them all together.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is the degree of a polynomial?</h3>
              <p className="text-sm text-muted-foreground">The degree is the highest exponent in the polynomial. For example, in 3x⁴ + 2x² - 1, the degree is 4.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Can polynomials have negative coefficients?</h3>
              <p className="text-sm text-muted-foreground">Yes. Coefficients can be any real number: positive, negative, zero, integers, or decimals.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is a root of a polynomial?</h3>
              <p className="text-sm text-muted-foreground">A root (or zero) is a value of x that makes the polynomial equal to zero. For example, x = 2 is a root of x² - 4 because 2² - 4 = 0.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Related Math Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/math-tools/quadratic-equation-solver" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Quadratic Equation Solver</h3>
              <p className="text-sm text-muted-foreground">Find roots of quadratic polynomials.</p>
            </a>
            <a href="/math-tools/factor-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Factor Calculator</h3>
              <p className="text-sm text-muted-foreground">Find factors of integers.</p>
            </a>
            <a href="/math-tools/exponent-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Exponent Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate powers and exponents.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
