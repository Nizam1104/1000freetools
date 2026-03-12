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

  const loadExample = (expr: string, vars: { [key: string]: boolean }) => {
    setExpression(expr);
    setVariables(vars);
    setResult(null);
    setError("");
  };

  const insertOperator = (op: string) => {
    setExpression(expression + (expression ? " " : "") + op + " ");
  };

  return (
    <div className="w-full mx-auto space-y-8">
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

        <div className="flex flex-wrap gap-2">
          <Button onClick={evaluate}>Evaluate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("(A AND B) OR (NOT C)", { A: true, B: false, C: true })}>
            (A AND B) OR (NOT C)
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("A XOR B", { A: true, B: false })}>
            A XOR B
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("NOT (A AND B)", { A: true, B: true })}>
            NOT (A AND B)
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("(A OR B) AND (C OR D)", { A: false, B: true, C: false, D: false })}>
            (A OR B) AND (C OR D)
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("A NAND B", { A: true, B: true })}>
            A NAND B
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("(A AND NOT B) OR (NOT A AND B)", { A: true, B: false })}>
            XOR expanded form
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("A NOR B", { A: false, B: false })}>
            A NOR B
          </Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Boolean Expression Evaluator – Logic Calculator</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Boolean algebra is the mathematics of logic. Developed by George Boole in 1854, it uses variables that can only be TRUE or FALSE, combined with logical operators. This system forms the foundation of all digital circuits – every processor, memory chip, and logic gate operates on Boolean principles.
          </p>
          <p className="text-muted-foreground">
            This evaluator lets you test logical expressions with custom variable values. Whether you're designing digital circuits, writing conditional statements in code, or studying discrete mathematics, you can verify your logic expressions instantly.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Logical Operators</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">AND</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">
              TRUE AND TRUE = TRUE<br />
              Otherwise = FALSE
            </div>
            <p className="text-sm text-muted-foreground">
              Both conditions must be true. Like a series circuit – current flows only if both switches are closed.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">OR</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">
              FALSE OR FALSE = FALSE<br />
              Otherwise = TRUE
            </div>
            <p className="text-sm text-muted-foreground">
              At least one condition must be true. Like a parallel circuit – current flows if either switch is closed.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">NOT</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">
              NOT TRUE = FALSE<br />
              NOT FALSE = TRUE
            </div>
            <p className="text-sm text-muted-foreground">
              Inverts the value. Also called negation or complement. Flips TRUE to FALSE and vice versa.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">XOR (Exclusive OR)</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">
              Same values = FALSE<br />
              Different values = TRUE
            </div>
            <p className="text-sm text-muted-foreground">
              True when exactly one input is true. Used in adders, comparators, and encryption.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">NAND (NOT AND)</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">
              TRUE NAND TRUE = FALSE<br />
              Otherwise = TRUE
            </div>
            <p className="text-sm text-muted-foreground">
              The opposite of AND. NAND gates are "functionally complete" – you can build any logic circuit using only NAND gates.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">NOR (NOT OR)</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">
              FALSE NOR FALSE = TRUE<br />
              Otherwise = FALSE
            </div>
            <p className="text-sm text-muted-foreground">
              The opposite of OR. Like NAND, NOR gates are functionally complete – any circuit can be built from NOR alone.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Truth Tables</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">AND Truth Table</h4>
            <div className="font-mono text-xs bg-muted p-3 rounded">
              <div>A     | B     | A AND B</div>
              <div>------|-------|--------</div>
              <div>FALSE | FALSE | FALSE</div>
              <div>FALSE | TRUE  | FALSE</div>
              <div>TRUE  | FALSE | FALSE</div>
              <div>TRUE  | TRUE  | TRUE</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">OR Truth Table</h4>
            <div className="font-mono text-xs bg-muted p-3 rounded">
              <div>A     | B     | A OR B</div>
              <div>------|-------|-------</div>
              <div>FALSE | FALSE | FALSE</div>
              <div>FALSE | TRUE  | TRUE</div>
              <div>TRUE  | FALSE | TRUE</div>
              <div>TRUE  | TRUE  | TRUE</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">XOR Truth Table</h4>
            <div className="font-mono text-xs bg-muted p-3 rounded">
              <div>A     | B     | A XOR B</div>
              <div>------|-------|--------</div>
              <div>FALSE | FALSE | FALSE</div>
              <div>FALSE | TRUE  | TRUE</div>
              <div>TRUE  | FALSE | TRUE</div>
              <div>TRUE  | TRUE  | FALSE</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Simple AND</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Evaluate: A AND B, where A = TRUE, B = FALSE
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Substitute: TRUE AND FALSE</div>
              <div>AND requires both to be TRUE</div>
              <div>Result: FALSE</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Compound Expression</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Evaluate: (A AND B) OR (NOT C), where A = TRUE, B = FALSE, C = TRUE
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Step 1: Evaluate A AND B</div>
              <div>TRUE AND FALSE = FALSE</div>
              <div>Step 2: Evaluate NOT C</div>
              <div>NOT TRUE = FALSE</div>
              <div>Step 3: Evaluate FALSE OR FALSE</div>
              <div>Result: FALSE</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: XOR Logic</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Evaluate: A XOR B, where A = TRUE, B = FALSE
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>XOR is TRUE when inputs differ</div>
              <div>TRUE XOR FALSE = TRUE</div>
              <div>(One is TRUE, one is FALSE – they differ)</div>
              <div>Result: TRUE</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: NAND Gate</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Evaluate: A NAND B, where A = TRUE, B = TRUE
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>NAND = NOT (A AND B)</div>
              <div>A AND B = TRUE AND TRUE = TRUE</div>
              <div>NOT TRUE = FALSE</div>
              <div>Result: FALSE</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Complex Expression</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Evaluate: (A OR B) AND (NOT A OR C), where A = FALSE, B = TRUE, C = FALSE
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Step 1: A OR B = FALSE OR TRUE = TRUE</div>
              <div>Step 2: NOT A = NOT FALSE = TRUE</div>
              <div>Step 3: NOT A OR C = TRUE OR FALSE = TRUE</div>
              <div>Step 4: TRUE AND TRUE = TRUE</div>
              <div>Result: TRUE</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 6: NOR Gate</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Evaluate: A NOR B, where A = FALSE, B = FALSE
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>NOR = NOT (A OR B)</div>
              <div>A OR B = FALSE OR FALSE = FALSE</div>
              <div>NOT FALSE = TRUE</div>
              <div>Result: TRUE</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Quick Fact</h3>
          <p className="text-sm text-muted-foreground">
            George Boole published "The Laws of Thought" in 1854, creating Boolean algebra. He died in 1864, long before his work became the foundation of digital computing. In 1937, Claude Shannon's master's thesis showed how Boolean algebra could optimize relay circuits – launching the digital age.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is Boolean algebra used for?</h4>
            <p className="text-sm text-muted-foreground">
              Boolean algebra is the mathematical foundation of all digital logic. It's used in circuit design, programming conditionals, database queries, search engines, and anywhere decisions depend on multiple conditions. Every if-statement in code uses Boolean logic.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the order of operations for Boolean expressions?</h4>
            <p className="text-sm text-muted-foreground">
              NOT has highest precedence, then AND, then OR. XOR, NAND, and NOR have varying precedence depending on context. Use parentheses to make your intended order explicit: NOT A AND B means (NOT A) AND B, not NOT (A AND B).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I simplify Boolean expressions?</h4>
            <p className="text-sm text-muted-foreground">
              Use Boolean algebra laws: De Morgan's laws (NOT (A AND B) = NOT A OR NOT B), distributive law (A AND (B OR C) = (A AND B) OR (A AND C)), and absorption (A OR (A AND B) = A). Karnaugh maps help visualize simplifications for complex expressions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between XOR and OR?</h4>
            <p className="text-sm text-muted-foreground">
              OR is TRUE if at least one input is TRUE (including both). XOR is TRUE only if exactly one input is TRUE – not both. XOR means "one or the other, but not both." OR means "one or the other, or both."
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use numbers instead of TRUE/FALSE?</h4>
            <p className="text-sm text-muted-foreground">
              In many programming languages, 0 is FALSE and any non-zero value is TRUE. This calculator uses explicit TRUE/FALSE for clarity. In Boolean algebra, the values are often written as 1 (TRUE) and 0 (FALSE).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What are De Morgan's Laws?</h4>
            <p className="text-sm text-muted-foreground">
              De Morgan's Laws show how to distribute NOT over AND/OR: NOT (A AND B) = NOT A OR NOT B, and NOT (A OR B) = NOT A AND NOT B. These are essential for simplifying expressions and designing circuits with only NAND or only NOR gates.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How many possible Boolean functions exist for n variables?</h4>
            <p className="text-sm text-muted-foreground">
              For n variables, there are 2^n possible input combinations, and each can map to TRUE or FALSE. So there are 2^(2^n) possible Boolean functions. For 2 variables: 2^(2^2) = 16 functions. For 3 variables: 2^(2^3) = 256 functions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
