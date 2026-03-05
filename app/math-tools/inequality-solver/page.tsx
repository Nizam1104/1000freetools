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
          <h2 className="text-2xl font-semibold mb-6">How to Solve Linear Inequalities</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Simplify</h3>
              <p className="text-sm text-muted-foreground">Simplify both sides if needed.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Isolate Variable</h3>
              <p className="text-sm text-muted-foreground">Move constants to one side.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">Divide</h3>
              <p className="text-sm text-muted-foreground">Divide by coefficient. Flip sign if negative.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
              <h3 className="font-semibold mb-2">Graph</h3>
              <p className="text-sm text-muted-foreground">Show solution on number line.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Inequality Solver?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">All Inequality Types</h3>
              <p className="text-sm text-muted-foreground">Handles less than, greater than, and their inclusive versions.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Number Line Graph</h3>
              <p className="text-sm text-muted-foreground">Visual representation of the solution set.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Interval Notation</h3>
              <p className="text-sm text-muted-foreground">Shows solution in standard mathematical notation.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Step-by-Step</h3>
              <p className="text-sm text-muted-foreground">Learn the solving process with detailed explanations.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Inequality Symbols</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Strict Inequalities</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><code className="bg-background px-2 py-1 rounded">&lt;</code> Less than (open circle on graph)</li>
                <li><code className="bg-background px-2 py-1 rounded">&gt;</code> Greater than (open circle on graph)</li>
              </ul>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Non-Strict Inequalities</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><code className="bg-background px-2 py-1 rounded">&lt;=</code> Less than or equal (closed circle)</li>
                <li><code className="bg-background px-2 py-1 rounded">&gt;=</code> Greater than or equal (closed circle)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Important Rule</h2>
          <div className="p-5 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Flipping the Inequality</h3>
            <p className="text-sm text-muted-foreground mb-4">
              When you multiply or divide both sides of an inequality by a <strong>negative number</strong>,
              you must <strong>reverse (flip)</strong> the inequality symbol.
            </p>
            <div className="bg-background p-4 rounded-md">
              <p className="text-sm font-medium mb-2">Example:</p>
              <p className="text-sm font-mono">-2x &lt; 6</p>
              <p className="text-sm text-muted-foreground mt-2">Divide by -2 (negative), so flip:</p>
              <p className="text-sm font-mono">x &gt; -3</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Worked Examples</h2>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Example 1: Simple Inequality</h3>
              <p className="text-sm font-mono mb-2">2x + 4 &lt; 10</p>
              <p className="text-sm text-muted-foreground">2x &lt; 6</p>
              <p className="text-sm text-muted-foreground">x &lt; 3</p>
              <p className="text-sm text-muted-foreground">Interval: (-∞, 3)</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Example 2: Negative Coefficient</h3>
              <p className="text-sm font-mono mb-2">-3x + 6 ≥ 15</p>
              <p className="text-sm text-muted-foreground">-3x ≥ 9</p>
              <p className="text-sm text-muted-foreground">x ≤ -3 (flip because dividing by negative)</p>
              <p className="text-sm text-muted-foreground">Interval: (-∞, -3]</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Example 3: Greater Than</h3>
              <p className="text-sm font-mono mb-2">5x - 2 &gt; 8</p>
              <p className="text-sm text-muted-foreground">5x &gt; 10</p>
              <p className="text-sm text-muted-foreground">x &gt; 2</p>
              <p className="text-sm text-muted-foreground">Interval: (2, ∞)</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is a linear inequality?</h3>
              <p className="text-sm text-muted-foreground">A linear inequality is like a linear equation, but uses inequality symbols (&lt;, &gt;, ≤, ≥) instead of equals. The solution is a range of values, not a single number.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">When do you flip the inequality sign?</h3>
              <p className="text-sm text-muted-foreground">Flip the inequality when multiplying or dividing both sides by a negative number. This is the key difference from solving equations.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What does an open circle mean?</h3>
              <p className="text-sm text-muted-foreground">An open circle (o) means that point is NOT included in the solution. Use it for strict inequalities (&lt; or &gt;).</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is interval notation?</h3>
              <p className="text-sm text-muted-foreground">Interval notation uses parentheses and brackets to show solution sets. Parentheses ( ) mean "not included", brackets [ ] mean "included".</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Can inequalities have no solution?</h3>
              <p className="text-sm text-muted-foreground">Yes. If simplifying leads to a contradiction like 5 &lt; 3, there's no solution. If it leads to an identity like 5 &lt; 10, all real numbers are solutions.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Related Math Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/math-tools/linear-equation-solver" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Linear Equation Solver</h3>
              <p className="text-sm text-muted-foreground">Solve equations with equals sign.</p>
            </a>
            <a href="/math-tools/absolute-value-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Absolute Value Calculator</h3>
              <p className="text-sm text-muted-foreground">Find absolute values and solve absolute value inequalities.</p>
            </a>
            <a href="/math-tools/number-line-calculator" className="p-5 bg-muted rounded-lg hover:border-primary transition-colors border">
              <h3 className="font-semibold mb-2">Number Line Tools</h3>
              <p className="text-sm text-muted-foreground">Visualize solutions on a number line.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
