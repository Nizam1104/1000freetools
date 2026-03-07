"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function InequalitySolver() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [operator, setOperator] = useState("<");
  const [result, setResult] = useState<{
    solution: string;
    intervalNotation: string;
    numberLine: string;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const solve = () => {
    const aVal = parseFloat(a);
    const bVal = parseFloat(b);
    const cVal = parseFloat(c);

    if (isNaN(aVal) || isNaN(bVal) || isNaN(cVal)) {
      setError("Please enter valid numbers for all coefficients");
      setResult(null);
      return;
    }

    if (aVal === 0) {
      if (operator === "<" || operator === "<=") {
        if (bVal < cVal) {
          setError("All real numbers are solutions (identity)");
        } else {
          setError("No solution (contradiction)");
        }
      } else {
        if (bVal > cVal) {
          setError("All real numbers are solutions (identity)");
        } else {
          setError("No solution (contradiction)");
        }
      }
      setResult(null);
      return;
    }

    setError("");
    const steps: string[] = [];
    const flipped = aVal < 0;
    let displayOperator = operator;

    steps.push(`Starting inequality: ${aVal}x + ${bVal} ${operator} ${cVal}`);
    steps.push(`Subtract ${bVal} from both sides: ${aVal}x ${operator.includes("=") ? operator : operator} ${cVal - bVal}`);
    steps.push(`${aVal}x ${operator} ${cVal - bVal}`);

    if (flipped) {
      const newOperator = operator === "<" ? ">" : operator === ">" ? "<" : operator === "<=" ? ">=" : operator === ">=" ? "<=" : operator;
      steps.push(`Divide by ${aVal} (negative - flip the inequality): x ${newOperator} ${(cVal - bVal) / aVal}`);
      displayOperator = newOperator;
    } else {
      steps.push(`Divide by ${aVal}: x ${operator} ${(cVal - bVal) / aVal}`);
    }

    const solutionValue = (cVal - bVal) / aVal;
    let solution: string;
    let intervalNotation: string;
    let numberLine: string;

    if (flipped) {
      if (displayOperator === ">") {
        solution = `x > ${solutionValue}`;
        intervalNotation = `(${solutionValue}, ∞)`;
        numberLine = `o--->\n   ${solutionValue}`;
      } else if (displayOperator === ">=") {
        solution = `x ≥ ${solutionValue}`;
        intervalNotation = `[${solutionValue}, ∞)`;
        numberLine = `●--->\n   ${solutionValue}`;
      } else if (displayOperator === "<") {
        solution = `x < ${solutionValue}`;
        intervalNotation = `(-∞, ${solutionValue})`;
        numberLine = `<--o\n   ${solutionValue}`;
      } else {
        solution = `x ≤ ${solutionValue}`;
        intervalNotation = `(-∞, ${solutionValue}]`;
        numberLine = `<--●\n   ${solutionValue}`;
      }
    } else {
      if (displayOperator === "<") {
        solution = `x < ${solutionValue}`;
        intervalNotation = `(-∞, ${solutionValue})`;
        numberLine = `<--o\n   ${solutionValue}`;
      } else if (displayOperator === "<=") {
        solution = `x ≤ ${solutionValue}`;
        intervalNotation = `(-∞, ${solutionValue}]`;
        numberLine = `<--●\n   ${solutionValue}`;
      } else if (displayOperator === ">") {
        solution = `x > ${solutionValue}`;
        intervalNotation = `(${solutionValue}, ∞)`;
        numberLine = `o--->\n   ${solutionValue}`;
      } else {
        solution = `x ≥ ${solutionValue}`;
        intervalNotation = `[${solutionValue}, ∞)`;
        numberLine = `●--->\n   ${solutionValue}`;
      }
    }

    setResult({ solution, intervalNotation, numberLine, steps });
  };

  const reset = () => {
    setA("");
    setB("");
    setC("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Linear Inequality Solver – Solve and Graph Inequalities Online
          </h1>
          <p className="text-xl text-muted-foreground">
            Solve linear inequalities instantly with our free online inequality solver. Get solutions displayed on a number line with clear step-by-step explanations for all inequality types.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium mb-2">Inequality Format:</p>
              <p className="text-lg font-mono">ax + b operator c</p>
            </div>

            <div className="grid grid-cols-4 gap-4 items-end">
              <div>
                <label className="text-sm font-medium mb-2 block">a</label>
                <Input
                  type="number"
                  placeholder="e.g., 2"
                  step="any"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">b</label>
                <Input
                  type="number"
                  placeholder="e.g., 3"
                  step="any"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Operator</label>
                <Select value={operator} onValueChange={setOperator}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="&lt;">&lt;</SelectItem>
                    <SelectItem value="&lt;=">&lt;=</SelectItem>
                    <SelectItem value="&gt;">&gt;</SelectItem>
                    <SelectItem value="&gt;=">&gt;=</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">c</label>
                <Input
                  type="number"
                  placeholder="e.g., 7"
                  step="any"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={solve}>Solve</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-md mt-4">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {result && (
              <>
                <div className="p-4 bg-muted rounded-md mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Solution</p>
                  <p className="text-2xl font-semibold">{result.solution}</p>
                </div>
                <div className="p-4 bg-muted rounded-md mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Interval Notation</p>
                  <p className="text-xl font-semibold font-mono">{result.intervalNotation}</p>
                </div>
                <div className="p-4 bg-muted rounded-md mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Number Line</p>
                  <div className="font-mono text-lg">
                    <pre className="whitespace-pre">{result.numberLine}</pre>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    o = open circle (not included), ● = closed circle (included)
                  </p>
                </div>
              </>
            )}

            {result && result.steps && (
              <div className="p-4 bg-muted rounded-md mt-4">
                <p className="text-sm font-medium mb-3">Step-by-Step Solution</p>
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
