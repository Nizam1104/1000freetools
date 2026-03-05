"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Term {
  coefficient: number;
  variable: string;
  power: number;
}

export default function SimplifyExpressionCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<{
    simplified: string;
    steps: string[];
    terms: Term[];
  } | null>(null);
  const [error, setError] = useState("");

  const parseAndSimplify = (expr: string) => {
    const steps: string[] = [];
    steps.push(`Original expression: ${expr}`);

    const normalized = expr.replace(/\s+/g, "").replace(/-/g, "+-");
    const terms = normalized.split("+").filter((t) => t !== "");

    steps.push(`Split into terms: ${terms.join(" + ")}`);

    const termMap = new Map<string, number>();

    terms.forEach((term) => {
      let coefficient = 1;
      let variable = "";
      let power = 0;

      const varMatch = term.match(/^(-?\d*\.?\d*)?([a-zA-Z]+)(?:\^(\d+))?$/);
      const constMatch = term.match(/^(-?\d+\.?\d*)$/);

      if (constMatch) {
        coefficient = parseFloat(constMatch[1]);
        variable = "";
        power = 0;
      } else if (varMatch) {
        const coefStr = varMatch[1];
        coefficient = coefStr === "" || coefStr === "+" ? 1 : coefStr === "-" ? -1 : parseFloat(coefStr);
        variable = varMatch[2];
        power = varMatch[3] ? parseInt(varMatch[3]) : 1;
      } else {
        const simpleVarMatch = term.match(/^(-?)([a-zA-Z])(?:\^(\d+))?$/);
        if (simpleVarMatch) {
          coefficient = simpleVarMatch[1] === "-" ? -1 : 1;
          variable = simpleVarMatch[2];
          power = simpleVarMatch[3] ? parseInt(simpleVarMatch[3]) : 1;
        } else {
          setError(`Unable to parse term: ${term}`);
          return;
        }
      }

      const key = `${variable}${power > 0 ? `^${power}` : ""}`;
      const existing = termMap.get(key) || 0;
      termMap.set(key, existing + coefficient);
    });

    if (error) return null;

    steps.push(`Group like terms:`);
    const resultTerms: Term[] = [];
    const sortedKeys = Array.from(termMap.keys()).sort((a, b) => {
      const aPower = a.includes("^") ? parseInt(a.split("^")[1]) : a ? 1 : 0;
      const bPower = b.includes("^") ? parseInt(b.split("^")[1]) : b ? 1 : 0;
      return bPower - aPower;
    });

    sortedKeys.forEach((key) => {
      const coef = termMap.get(key)!;
      if (coef !== 0) {
        const power = key.includes("^") ? parseInt(key.split("^")[1]) : key ? 1 : 0;
        const variable = key.replace(/\^\d+/, "");
        resultTerms.push({ coefficient: coef, variable, power });
        steps.push(`  ${key}: ${coef}`);
      }
    });

    const simplified = resultTerms
      .map((term) => {
        if (term.power === 0) return `${term.coefficient}`;
        if (term.coefficient === 1) return term.power === 1 ? term.variable : `${term.variable}^${term.power}`;
        if (term.coefficient === -1) return term.power === 1 ? `-${term.variable}` : `-${term.variable}^${term.power}`;
        return term.power === 1 ? `${term.coefficient}${term.variable}` : `${term.coefficient}${term.variable}^${term.power}`;
      })
      .join(" + ")
      .replace(/\+ -/g, "- ")
      .replace(/\s+/g, " ");

    steps.push(`Simplified: ${simplified}`);

    return { simplified, steps, terms: resultTerms };
  };

  const simplify = () => {
    if (!expression.trim()) {
      setError("Please enter an expression");
      setResult(null);
      return;
    }

    setError("");
    const simplified = parseAndSimplify(expression);
    if (simplified && !error) {
      setResult(simplified);
    }
  };

  const reset = () => {
    setExpression("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Simplify Expression Calculator – Simplify Algebraic Expressions
          </h1>
          <p className="text-xl text-muted-foreground">
            Simplify any basic algebraic expression instantly with our free online simplify expression calculator. Combine like terms and reduce expressions to their simplest form with ease.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Algebraic Expression</label>
              <Input
                type="text"
                placeholder="e.g., 3x + 2x - 5 + 4 or 2x^2 + 3x - x^2 + 5"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Supported: variables (x, y, etc.), powers (x^2), coefficients, and constants
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={simplify}>Simplify</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-md mt-4">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {result && (
              <div className="p-4 bg-muted rounded-md mt-4">
                <p className="text-sm text-muted-foreground mb-2">Simplified Expression</p>
                <p className="text-2xl font-semibold font-mono">{result.simplified}</p>
              </div>
            )}

            {result && result.steps && (
              <div className="p-4 bg-muted rounded-md mt-4">
                <p className="text-sm font-medium mb-3">Step-by-Step Simplification</p>
                <ol className="space-y-2 text-sm">
                  {result.steps.map((step, index) => (
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
          <h2 className="text-2xl font-semibold mb-6">How to Simplify Algebraic Expressions</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Identify Terms</h3>
              <p className="text-sm text-muted-foreground">Break the expression into individual terms.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Find Like Terms</h3>
              <p className="text-sm text-muted-foreground">Group terms with the same variable and power.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">Combine Coefficients</h3>
              <p className="text-sm text-muted-foreground">Add or subtract coefficients of like terms.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
              <h3 className="font-semibold mb-2">Write Result</h3>
              <p className="text-sm text-muted-foreground">Write the simplified expression in standard form.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Simplify Calculator?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Combine Like Terms</h3>
              <p className="text-sm text-muted-foreground">Automatically identifies and combines terms with the same variables and powers.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Step-by-Step</h3>
              <p className="text-sm text-muted-foreground">Shows each step of the simplification process for learning.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Multiple Variables</h3>
              <p className="text-sm text-muted-foreground">Handles expressions with different variables (x, y, z, etc.).</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Educational Tool</h3>
              <p className="text-sm text-muted-foreground">Perfect for students learning algebra fundamentals.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Like Terms Rules</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">What Are Like Terms?</h3>
              <p className="text-sm text-muted-foreground mb-3">Like terms have the same variables raised to the same powers. Only the coefficients can be different.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>3x and 5x are like terms</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>2x² and -7x² are like terms</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>4 and -9 are like terms (constants)</span>
                </li>
              </ul>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Unlike Terms</h3>
              <p className="text-sm text-muted-foreground mb-3">Unlike terms cannot be combined because they have different variables or powers.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-destructive">✗</span>
                  <span>3x and 3y (different variables)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-destructive">✗</span>
                  <span>2x and 2x² (different powers)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-destructive">✗</span>
                  <span>5xy and 5x (different variable combinations)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Worked Examples</h2>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Example 1: Simple Combination</h3>
              <p className="text-sm font-mono mb-2">3x + 2x - 5 + 4</p>
              <p className="text-sm text-muted-foreground">Combine x terms: 3x + 2x = 5x</p>
              <p className="text-sm text-muted-foreground">Combine constants: -5 + 4 = -1</p>
              <p className="text-sm font-medium">Result: 5x - 1</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Example 2: With Powers</h3>
              <p className="text-sm font-mono mb-2">2x² + 3x - x² + 5</p>
              <p className="text-sm text-muted-foreground">Combine x² terms: 2x² - x² = x²</p>
              <p className="text-sm text-muted-foreground">x term stays: 3x</p>
              <p className="text-sm text-muted-foreground">Constant stays: 5</p>
              <p className="text-sm font-medium">Result: x² + 3x + 5</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Example 3: Multiple Variables</h3>
              <p className="text-sm font-mono mb-2">2x + 3y - x + 4y</p>
              <p className="text-sm text-muted-foreground">Combine x terms: 2x - x = x</p>
              <p className="text-sm text-muted-foreground">Combine y terms: 3y + 4y = 7y</p>
              <p className="text-sm font-medium">Result: x + 7y</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What does it mean to simplify an expression?</h3>
              <p className="text-sm text-muted-foreground">Simplifying means combining like terms and performing all possible operations to write the expression in its most compact form.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What are like terms?</h3>
              <p className="text-sm text-muted-foreground">Like terms are terms that have the same variables raised to the same powers. You can add or subtract their coefficients.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Can I simplify unlike terms?</h3>
              <p className="text-sm text-muted-foreground">No. Unlike terms (different variables or powers) cannot be combined. They must stay separate in the final expression.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What order should terms be written in?</h3>
              <p className="text-sm text-muted-foreground">Standard form writes terms from highest power to lowest power, followed by the constant term.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How do I handle negative coefficients?</h3>
              <p className="text-sm text-muted-foreground">Treat the negative sign as part of the coefficient. When combining, add the coefficients (which may involve subtraction).</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Related Math Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/math-tools/expand-simplify-binomials" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Expand & Simplify Binomials</h3>
              <p className="text-sm text-muted-foreground">Expand products of binomials.</p>
            </a>
            <a href="/math-tools/factor-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Factor Calculator</h3>
              <p className="text-sm text-muted-foreground">Factor expressions and integers.</p>
            </a>
            <a href="/math-tools/polynomial-evaluator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Polynomial Evaluator</h3>
              <p className="text-sm text-muted-foreground">Evaluate polynomials at any x.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
