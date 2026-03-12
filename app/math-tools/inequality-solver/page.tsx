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

  const loadExample = (aVal: string, bVal: string, op: string, cVal: string) => {
    setA(aVal);
    setB(bVal);
    setOperator(op);
    setC(cVal);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
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

            <div className="flex gap-2 pt-2 flex-wrap">
              <Button onClick={solve}>Solve</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-sm text-muted-foreground self-center">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample("2", "3", "<", "7")}>2x+3&lt;7</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("-3", "5", ">=", "11")}>-3x+5≥11</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("4", "-8", "<=", "12")}>4x-8≤12</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("5", "0", ">", "15")}>5x&gt;15</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("-2", "10", "<", "4")}>-2x+10&lt;4</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("3", "-6", ">=", "0")}>3x-6≥0</Button>
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

        <section className="border-t pt-8 space-y-6">
          <h2 className="text-2xl font-semibold">Understanding Linear Inequalities</h2>
          <p className="text-muted-foreground">
            A linear inequality is like a linear equation, but instead of an equals sign, it uses inequality symbols: &lt;, &gt;, ≤, or ≥. The solution to an inequality isn't a single number – it's a range of values that make the inequality true.
          </p>
          <p className="text-muted-foreground">
            Solving inequalities is similar to solving equations: isolate the variable. But there's one crucial difference – when you multiply or divide by a negative number, you must flip the inequality sign. This is the most common mistake students make.
          </p>
        </section>

        <section className="border-t pt-8 space-y-6">
          <h3 className="text-xl font-semibold">How to Solve Linear Inequalities</h3>
          <div className="p-6 bg-muted rounded-lg">
            <ol className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
                <div>
                  <p className="font-semibold mb-1">Simplify both sides</p>
                  <p className="text-muted-foreground">
                    Combine like terms and distribute if needed.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
                <div>
                  <p className="font-semibold mb-1">Move variable terms to one side</p>
                  <p className="text-muted-foreground">
                    Add or subtract to get all x terms on one side, constants on the other.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
                <div>
                  <p className="font-semibold mb-1">Isolate the variable</p>
                  <p className="text-muted-foreground">
                    Divide by the coefficient. If it's negative, FLIP the inequality sign!
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
                <div>
                  <p className="font-semibold mb-1">Express the solution</p>
                  <p className="text-muted-foreground">
                    Write as an inequality, in interval notation, and graph on a number line.
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
              <h4 className="font-semibold text-sm mb-3">Example 1: Simple Inequality</h4>
              <div className="font-mono text-sm space-y-2">
                <div>Solve: 2x + 3 &lt; 7</div>
                <div>Subtract 3: 2x &lt; 4</div>
                <div>Divide by 2: x &lt; 2</div>
                <div className="text-muted-foreground mt-2">Solution: x &lt; 2 or (-∞, 2)</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Example 2: Negative Coefficient (Flip!)</h4>
              <div className="font-mono text-sm space-y-2">
                <div>Solve: -3x + 5 ≥ 11</div>
                <div>Subtract 5: -3x ≥ 6</div>
                <div>Divide by -3: x ≤ -2 ← FLIP!</div>
                <div className="text-muted-foreground mt-2">Solution: x ≤ -2 or (-∞, -2]</div>
                <div className="text-amber-600">Remember: dividing by negative flips the sign!</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Example 3: Variables on Both Sides</h4>
              <div className="font-mono text-sm space-y-2">
                <div>Solve: 5x - 3 &gt; 2x + 9</div>
                <div>Subtract 2x: 3x - 3 &gt; 9</div>
                <div>Add 3: 3x &gt; 12</div>
                <div>Divide by 3: x &gt; 4</div>
                <div className="text-muted-foreground mt-2">Solution: x &gt; 4 or (4, ∞)</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Example 4: Special Cases</h4>
              <div className="text-sm space-y-2">
                <p><strong>No solution:</strong> 2x + 5 &lt; 2x + 1</p>
                <div className="font-mono">Subtract 2x: 5 &lt; 1 ✗ (false)</div>
                <p className="text-muted-foreground">No value of x makes this true.</p>
                <p className="mt-3"><strong>All real numbers:</strong> 3(x+2) ≥ 3x + 6</p>
                <div className="font-mono">3x + 6 ≥ 3x + 6</div>
                <div className="font-mono">6 ≥ 6 ✓ (always true)</div>
                <p className="text-muted-foreground">Every value of x works!</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t pt-8 space-y-6">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
            <p className="text-sm text-amber-700">
              The inequality symbols &lt; and &gt; were introduced by Welsh mathematician Robert Recorde in 1557. He also invented the equals sign (=), saying "no two things can be more equal" than parallel lines. The ≤ and ≥ symbols came later, in the 18th century.
            </p>
          </div>
        </section>

        <section className="border-t pt-8 space-y-6">
          <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-sm mb-2">Why do I flip the sign when dividing by negative?</h4>
              <p className="text-sm text-muted-foreground">
                Think about it: 3 &lt; 5 is true. Multiply both by -1: -3 and -5. Now -3 is GREATER than -5, so -3 &gt; -5. The relationship reverses because negatives flip the order on the number line.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What's the difference between &lt; and ≤?</h4>
              <p className="text-sm text-muted-foreground">
                &lt; means "strictly less than" – the boundary is NOT included. ≤ means "less than or equal to" – the boundary IS included. On a number line, use open circle for &lt; and closed circle for ≤.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">How do I check my solution?</h4>
              <p className="text-sm text-muted-foreground">
                Pick a value in your solution range and plug it into the original inequality. It should make the inequality true. Also test a value outside the range – it should make the inequality false.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What is interval notation?</h4>
              <p className="text-sm text-muted-foreground">
                A compact way to write solution sets. Parentheses ( ) mean the endpoint is excluded. Brackets [ ] mean it's included. ∞ always uses parentheses since infinity isn't a specific number.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Can inequalities have no solution?</h4>
              <p className="text-sm text-muted-foreground">
                Yes. If simplifying leads to a false statement like 5 &lt; 1, there's no solution. The solution set is empty (∅). This happens when the inequality is a contradiction.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What about compound inequalities?</h4>
              <p className="text-sm text-muted-foreground">
                Compound inequalities like 2 &lt; x &lt; 5 mean x is between 2 and 5. Solve by applying operations to all three parts. For "or" inequalities, solve each part separately and combine the solutions.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
