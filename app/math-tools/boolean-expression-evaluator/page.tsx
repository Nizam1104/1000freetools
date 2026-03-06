"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function BooleanExpressionEvaluator() {
  const [expression, setExpression] = useState("A AND B");
  const [variables, setVariables] = useState<{ [key: string]: boolean }>({
    A: true,
    B: false
  });
  const [result, setResult] = useState<{
    output: boolean;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const evaluate = () => {
    setError("");
    setResult(null);

    if (!expression.trim()) {
      setError("Please enter a Boolean expression");
      return;
    }

    try {
      const steps: string[] = [];
      let evalExpr = expression.toUpperCase();
      
      steps.push(`Expression: ${expression}`);
      steps.push(``);
      steps.push(`Variable values:`);
      Object.entries(variables).forEach(([v, val]) => {
        steps.push(`  ${v} = ${val ? 'TRUE' : 'FALSE'}`);
      });
      steps.push(``);

      // Replace variables with their values
      Object.entries(variables).forEach(([v, val]) => {
        const regex = new RegExp(`\\b${v}\\b`, 'g');
        evalExpr = evalExpr.replace(regex, val.toString());
      });

      steps.push(`After substitution: ${evalExpr}`);
      steps.push(``);

      // Replace operators
      evalExpr = evalExpr.replace(/\bAND\b/g, '&&');
      evalExpr = evalExpr.replace(/\bOR\b/g, '||');
      evalExpr = evalExpr.replace(/\bXOR\b/g, '!==');
      evalExpr = evalExpr.replace(/\bNOT\b/g, '!');
      
      // Handle parentheses for complex expressions
      evalExpr = evalExpr.replace(/\bNAND\b/g, '!(');
      evalExpr = evalExpr.replace(/\bNOR\b/g, '!(');

      steps.push(`JavaScript equivalent: ${evalExpr}`);
      steps.push(``);

      const output = eval(evalExpr);
      
      steps.push(`Result: ${Boolean(output) ? 'TRUE' : 'FALSE'}`);

      setResult({
        output: Boolean(output),
        steps
      });
    } catch (e) {
      setError("Invalid expression. Use variables and operators (AND, OR, NOT, XOR, NAND, NOR)");
    }
  };

  const toggleVariable = (v: string) => {
    setVariables({ ...variables, [v]: !variables[v] });
    setResult(null);
  };

  const addVariable = () => {
    const nextVar = String.fromCharCode(65 + Object.keys(variables).length);
    if (nextVar <= 'Z') {
      setVariables({ ...variables, [nextVar]: false });
    }
  };

  const removeVariable = (v: string) => {
    if (Object.keys(variables).length > 2) {
      const { [v]: _, ...rest } = variables;
      setVariables(rest);
    }
  };

  const reset = () => {
    setExpression("A AND B");
    setVariables({ A: true, B: false });
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setExpression("(A AND B) OR (NOT C)");
    setVariables({ A: true, B: false, C: true });
    setResult(null);
    setError("");
  };

  const insertOperator = (op: string) => {
    setExpression(expression + (expression ? " " : "") + op + " ");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Boolean Expression Evaluator – Evaluate Logic Expressions Online</h1>
        <p className="text-muted-foreground">
          Evaluate any Boolean expression for given variable values with our free online Boolean expression evaluator. Supports all logical operators including AND, OR, NOT, XOR, NAND, and NOR.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Variables:</Label>
          <div className="flex flex-wrap gap-4 mt-2 p-4 bg-muted rounded-lg">
            {Object.entries(variables).map(([v, val]) => (
              <div key={v} className="flex items-center gap-2">
                <span className="font-mono font-bold">{v} =</span>
                <Switch
                  checked={val}
                  onCheckedChange={() => toggleVariable(v)}
                />
                <span className={`text-sm ${val ? 'text-green-600' : 'text-red-600'}`}>
                  {val ? 'TRUE' : 'FALSE'}
                </span>
                {Object.keys(variables).length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeVariable(v)}
                    className="h-6 w-6 p-0"
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
            {Object.keys(variables).length < 26 && (
              <Button variant="outline" size="sm" onClick={addVariable}>
                + Add Variable
              </Button>
            )}
          </div>
        </div>

        <div>
          <Label>Quick Insert:</Label>
          <div className="flex flex-wrap gap-1 mt-2">
            {['AND', 'OR', 'NOT', 'XOR', 'NAND', 'NOR', '(', ')'].map((op) => (
              <Button
                key={op}
                variant="outline"
                size="sm"
                onClick={() => insertOperator(op)}
                className="text-xs"
              >
                {op}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="expression">Boolean Expression:</Label>
          <Input
            id="expression"
            placeholder="e.g., (A AND B) OR (NOT C)"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Use variables: {Object.keys(variables).join(', ')}
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={evaluate}>Evaluate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Result</p>
              <p className={`text-5xl font-bold ${result.output ? 'text-green-600' : 'text-red-600'}`}>
                {result.output ? 'TRUE' : 'FALSE'}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Evaluation</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                {result.steps.map((step, i) => (
                  <div key={i} className={step === "" ? "h-4" : ""}>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Boolean Expressions</h2>
        <p className="text-muted-foreground">
          A Boolean expression is a logical statement that evaluates to either TRUE or FALSE. Boolean algebra is the foundation of digital logic, computer programming, and circuit design.
        </p>
        <p className="text-muted-foreground">
          Boolean expressions use variables (which can be true or false) combined with logical operators to create complex conditions.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Boolean Operators</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Basic Operators</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>AND</strong>: True only when both operands are true</li>
              <li><strong>OR</strong>: True when at least one operand is true</li>
              <li><strong>NOT</strong>: Inverts the truth value</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Compound Operators</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>XOR</strong>: True when exactly one operand is true</li>
              <li><strong>NAND</strong>: NOT AND (false only when both true)</li>
              <li><strong>NOR</strong>: NOT OR (true only when both false)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Boolean Algebra Laws</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Identity Laws</h3>
            <ul className="space-y-1 text-sm font-mono">
              <li>A AND TRUE = A</li>
              <li>A OR FALSE = A</li>
              <li>A AND FALSE = FALSE</li>
              <li>A OR TRUE = TRUE</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">De Morgan's Laws</h3>
            <ul className="space-y-1 text-sm font-mono">
              <li>NOT (A AND B) = (NOT A) OR (NOT B)</li>
              <li>NOT (A OR B) = (NOT A) AND (NOT B)</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Commutative Laws</h3>
            <ul className="space-y-1 text-sm font-mono">
              <li>A AND B = B AND A</li>
              <li>A OR B = B OR A</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Distributive Laws</h3>
            <ul className="space-y-1 text-sm font-mono">
              <li>A AND (B OR C) = (A AND B) OR (A AND C)</li>
              <li>A OR (B AND C) = (A OR B) AND (A OR C)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is Boolean algebra?</h3>
            <p className="text-sm text-muted-foreground">
              Boolean algebra is a branch of algebra that deals with binary variables (true/false, 1/0) and logical operations. It's the mathematical foundation of digital circuits and computer logic.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Where are Boolean expressions used?</h3>
            <p className="text-sm text-muted-foreground">
              Boolean expressions are used in programming (if statements, loops), digital circuit design, database queries (SQL WHERE clauses), search engines, and spreadsheet formulas.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is the order of operations?</h3>
            <p className="text-sm text-muted-foreground">
              NOT has highest precedence, followed by AND, then OR. Use parentheses to override the default order, just like in arithmetic.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/truth-table-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Truth Table Generator</p>
            <p className="text-xs text-muted-foreground">Generate truth tables</p>
          </a>
          <a href="/math-tools/binary-arithmetic-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Binary Arithmetic</p>
            <p className="text-xs text-muted-foreground">Binary calculations</p>
          </a>
          <a href="/math-tools/bitwise-operations-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Bitwise Operations</p>
            <p className="text-xs text-muted-foreground">Bit-level operations</p>
          </a>
        </div>
      </section>
    </div>
  );
}
