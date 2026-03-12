"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const loadExample = (expr: string) => {
    setExpression(expr);
    setError("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Simplify Expression Calculator – Simplify Algebraic Expressions</h1>
        <p className="text-muted-foreground">
          Simplify any basic algebraic expression instantly with our free online simplify expression calculator. Combine like terms and reduce expressions to their simplest form with ease.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Algebraic Expression</Label>
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

        <div className="flex gap-2">
          <Button onClick={simplify}>Simplify</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("3x + 2x - 5 + 4")}>3x + 2x - 5 + 4</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2x^2 + 3x - x^2 + 5")}>2x² + 3x - x² + 5</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("5a + 3b - 2a + 7b")}>5a + 3b - 2a + 7b</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("4y^2 - 2y + 3y^2 + y - 8")}>4y² - 2y + 3y² + y - 8</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("7m - 3n + 2m - 5n + 10")}>7m - 3n + 2m - 5n + 10</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("x^3 + 2x^2 - x^3 + 4x - 1")}>x³ + 2x² - x³ + 4x - 1</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10 - 3p + 7 - 2p + p^2")}>10 - 3p + 7 - 2p + p²</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md mt-4">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground mb-2">Simplified Expression</p>
              <p className="text-2xl font-semibold font-mono">{result.simplified}</p>
            </div>

            <div className="p-4 bg-muted rounded-md">
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
          </div>
        )}
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Understanding Algebraic Expression Simplification</h2>
          <p className="text-muted-foreground">
            Simplifying algebraic expressions means rewriting them in the most compact form possible without changing their value. The key technique is combining "like terms" – terms that have the same variable raised to the same power.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Think of it like sorting coins: you group all the quarters together, all the dimes together, and count each pile separately. In algebra, you group all the x² terms, all the x terms, and all the constants. This makes expressions easier to work with in equations and calculations.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Simplify Expressions</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Step 1: Identify all terms</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Terms are separated by + or - signs. Each term includes its sign.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              3x + 2y - 5x + 7 → Terms: 3x, 2y, -5x, 7
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Step 2: Group like terms</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Like terms have identical variable parts (same variables, same powers).
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>3x and -5x are like terms (both have x)</div>
              <div>2y has no like terms (only one y term)</div>
              <div>7 is a constant (no variable)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Step 3: Combine coefficients</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Add or subtract the numbers in front of like terms.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              3x + (-5x) = -2x
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Step 4: Write the simplified expression</h4>
            <p className="text-sm text-muted-foreground mb-2">
              List all combined terms, typically highest power first.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              3x + 2y - 5x + 7 = -2x + 2y + 7
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Simple combination</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Simplify 4x + 3y - 2x + 5y
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 1: Group like terms: (4x - 2x) + (3y + 5y)
            </p>
            <p className="text-sm text-muted-foreground">
              Step 2: Combine: 2x + 8y
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: With powers</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Simplify 3x² + 2x - x² + 4x + 7
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 1: Group: (3x² - x²) + (2x + 4x) + 7
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 2: Combine: 2x² + 6x + 7
            </p>
            <p className="text-sm text-muted-foreground">
              Note: x² and x are NOT like terms – different powers can't be combined.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Multiple variables</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Simplify 5a + 3b - 2a + 7b - a
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 1: Group: (5a - 2a - a) + (3b + 7b)
            </p>
            <p className="text-sm text-muted-foreground">
              Step 2: Combine: 2a + 10b
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: With negative coefficients</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Simplify -3m + 7 - 2m - 10 + 5m
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 1: Group: (-3m - 2m + 5m) + (7 - 10)
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 2: Combine: 0m + (-3) = -3
            </p>
            <p className="text-sm text-muted-foreground">
              The variable terms cancel out completely, leaving just a constant.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Higher powers</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Simplify x³ + 2x² - 3x + 4 - x³ + x² + 5x - 2
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 1: Group: (x³ - x³) + (2x² + x²) + (-3x + 5x) + (4 - 2)
            </p>
            <p className="text-sm text-muted-foreground">
              Step 2: Combine: 0 + 3x² + 2x + 2 = 3x² + 2x + 2
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm">
            The word "algebra" comes from the Arabic "al-jabr," meaning "reunion of broken parts." It was introduced by Persian mathematician Al-Khwarizmi in his 820 CE book "Al-Kitab al-Mukhtasar fi Hisab al-Jabr wal-Muqabala." The process of simplifying expressions – combining like terms – is essentially the "reunion" Al-Khwarizmi described, gathering scattered terms into their simplest form.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Mistakes to Avoid</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Mistake: Combining unlike terms</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Wrong: 3x + 2y = 5xy
            </p>
            <p className="text-sm text-muted-foreground">
              Right: 3x + 2y stays as 3x + 2y. You can only combine terms with identical variable parts.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Mistake: Mixing powers</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Wrong: x² + x = x³ or 2x²
            </p>
            <p className="text-sm text-muted-foreground">
              Right: x² + x stays as x² + x. Different exponents mean different terms.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Mistake: Dropping negative signs</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Wrong: 5x - 3x - 2x = 4x
            </p>
            <p className="text-sm text-muted-foreground">
              Right: 5x - 3x - 2x = 0. The signs belong to the terms that follow them.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Mistake: Forgetting coefficients of 1</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Wrong: x + x = x²
            </p>
            <p className="text-sm text-muted-foreground">
              Right: x + x = 2x. Think of it as 1x + 1x = 2x.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What are "like terms" exactly?</h4>
            <p className="text-sm text-muted-foreground">
              Like terms have exactly the same variables raised to exactly the same powers. 3x and 5x are like terms. 3x and 3y are not. 3x² and 5x² are like terms. 3x² and 5x are not. Constants (numbers without variables) are all like terms with each other.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Do I need to arrange terms in a specific order?</h4>
            <p className="text-sm text-muted-foreground">
              Convention says to write terms from highest power to lowest, then constants last. So 3 + 2x + x² becomes x² + 2x + 3. This "standard form" makes it easier to compare expressions and spot patterns.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I simplify expressions with multiplication?</h4>
            <p className="text-sm text-muted-foreground">
              This calculator handles addition and subtraction of terms. For expressions with multiplication like (x+2)(x+3), you'd first need to expand using FOIL or distribution, then combine like terms. That's a separate process called expansion.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if all terms cancel out?</h4>
            <p className="text-sm text-muted-foreground">
              If everything cancels (like 3x - 3x + 5 - 5), the simplified result is 0. This happens when the expression equals zero for all values of the variables – it's called an identity.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I check if my simplification is correct?</h4>
            <p className="text-sm text-muted-foreground">
              Pick a value for each variable and evaluate both the original and simplified expressions. They should give the same result. For example, if you simplified 3x + 2x to 5x, try x = 4: original gives 12 + 8 = 20, simplified gives 5(4) = 20. Match!
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can variables with different letters ever be combined?</h4>
            <p className="text-sm text-muted-foreground">
              No. x and y represent potentially different values, so 3x + 2y cannot be simplified further. The only exception is if you're told the variables are equal (like "if x = y"), but that's a separate constraint, not simplification.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
