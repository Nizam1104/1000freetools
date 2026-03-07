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
        </section>
      </div>
    </div>
  );
}
