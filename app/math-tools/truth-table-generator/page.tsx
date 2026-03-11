"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TruthTableGenerator() {
  const [numVariables, setNumVariables] = useState(2);
  const [expression, setExpression] = useState("A AND B");
  const [result, setResult] = useState<{
    table: { inputs: boolean[]; output: boolean }[];
    variables: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const generateTruthTable = () => {
    setError("");
    setResult(null);

    try {
      const variables: string[] = [];
      for (let i = 0; i < numVariables; i++) {
        variables.push(String.fromCharCode(65 + i)); // A, B, C, D
      }

      const totalRows = Math.pow(2, numVariables);
      const table: { inputs: boolean[]; output: boolean }[] = [];

      for (let i = 0; i < totalRows; i++) {
        const inputs: boolean[] = [];
        for (let j = numVariables - 1; j >= 0; j--) {
          inputs.unshift(Math.floor(i / Math.pow(2, j)) % 2 === 1);
        }

        // Evaluate expression
        let evalExpr = expression.toUpperCase();
        for (let j = 0; j < numVariables; j++) {
          const regex = new RegExp(`\\b${variables[j]}\\b`, 'g');
          evalExpr = evalExpr.replace(regex, inputs[j].toString());
        }

        // Replace operators
        evalExpr = evalExpr.replace(/\bAND\b/g, '&&');
        evalExpr = evalExpr.replace(/\bOR\b/g, '||');
        evalExpr = evalExpr.replace(/\bXOR\b/g, '!==');
        evalExpr = evalExpr.replace(/\bNOT\b/g, '!');
        evalExpr = evalExpr.replace(/\bNAND\b/g, '!(&&)');
        evalExpr = evalExpr.replace(/\bNOR\b/g, '!(||)');
        evalExpr = evalExpr.replace(/\bIMPLIES\b/g, 'IMPLIES');
        evalExpr = evalExpr.replace(/\bIFF\b/g, '===');
        
        // Handle IMPLIES (A -> B = !A || B)
        evalExpr = evalExpr.replace(/IMPLIES/g, '||');
        
        // Handle parentheses for NAND/NOR
        evalExpr = evalExpr.replace(/!\(&&\)/g, '&&');
        evalExpr = evalExpr.replace(/!\(\|\|\)/g, '||');

        // Custom evaluation for IMPLIES
        let output: boolean;
        if (expression.toUpperCase().includes('IMPLIES')) {
          const parts = expression.toUpperCase().split('IMPLIES');
          if (parts.length === 2) {
            const leftExpr = parts[0].trim();
            const rightExpr = parts[1].trim();
            
            let leftEval = leftExpr;
            let rightEval = rightExpr;
            
            for (let j = 0; j < numVariables; j++) {
              const regex = new RegExp(`\\b${variables[j]}\\b`, 'g');
              leftEval = leftEval.replace(regex, inputs[j].toString());
              rightEval = rightEval.replace(regex, inputs[j].toString());
            }
            
            leftEval = leftEval.replace(/\bAND\b/g, '&&').replace(/\bOR\b/g, '||').replace(/\bNOT\b/g, '!');
            rightEval = rightEval.replace(/\bAND\b/g, '&&').replace(/\bOR\b/g, '||').replace(/\bNOT\b/g, '!');
            
            const left = eval(leftEval);
            const right = eval(rightEval);
            output = !left || right;
          } else {
            output = eval(evalExpr);
          }
        } else {
          output = eval(evalExpr);
        }

        table.push({ inputs, output: Boolean(output) });
      }

      setResult({ table, variables });
    } catch (e) {
      setError("Invalid expression. Use variables (A, B, C...) and operators (AND, OR, NOT, XOR, NAND, NOR, IMPLIES)");
    }
  };

  const reset = () => {
    setExpression("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    if (numVariables === 2) {
      setExpression("(A AND B) OR (NOT A)");
    } else if (numVariables === 3) {
      setExpression("(A AND B) OR C");
    } else {
      setExpression("A AND (B OR C)");
    }
    setResult(null);
    setError("");
  };

  const insertOperator = (op: string) => {
    setExpression(expression + (expression ? " " : "") + op + " ");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Truth Table Generator – Create Logic Truth Tables Online</h1>
        <p className="text-muted-foreground">
          Generate truth tables for any logical expression with our free online truth table generator. Supports AND, OR, NOT, XOR, NAND, NOR, and implication operators for any number of variables.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Number of Variables:</Label>
            <Select value={String(numVariables)} onValueChange={(v) => {
              setNumVariables(parseInt(v));
              setResult(null);
              setError("");
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 (A, B)</SelectItem>
                <SelectItem value="3">3 (A, B, C)</SelectItem>
                <SelectItem value="4">4 (A, B, C, D)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Quick Insert:</Label>
            <div className="flex flex-wrap gap-1">
              {['AND', 'OR', 'NOT', 'XOR', 'NAND', 'NOR', 'IMPLIES', '(', ')'].map((op) => (
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
        </div>

        <div>
          <Label htmlFor="expression">Logical Expression:</Label>
          <Input
            id="expression"
            placeholder="e.g., (A AND B) OR (NOT C)"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Use variables: {Array.from({ length: numVariables }, (_, i) => String.fromCharCode(65 + i)).join(', ')}
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={generateTruthTable}>Generate Truth Table</Button>
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
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    {result.variables.map((v) => (
                      <th key={v} className="border p-3 text-center font-semibold">{v}</th>
                    ))}
                    <th className="border p-3 text-center font-semibold">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {result.table.map((row, i) => (
                    <tr key={i} className={row.output ? "bg-green-50" : "bg-red-50"}>
                      {row.inputs.map((val, j) => (
                        <td key={j} className="border p-3 text-center">
                          <span className={`font-mono ${val ? 'text-green-600' : 'text-red-600'}`}>
                            {val ? 'T' : 'F'}
                          </span>
                        </td>
                      ))}
                      <td className="border p-3 text-center">
                        <span className={`font-bold font-mono ${row.output ? 'text-green-600' : 'text-red-600'}`}>
                          {row.output ? 'T' : 'F'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Expression</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                {expression}
              </code>
            </div>
          </div>
        )}
      </div>

      <div className="mt-16 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How the Truth Table Generator Works</h2>
          <p className="text-muted-foreground mb-4">
            A truth table systematically lists all possible combinations of input values for a logical expression and shows the resulting output for each combination. This tool evaluates boolean expressions using the fundamental operators of propositional logic.
          </p>
          <p className="text-muted-foreground mb-4">
            For <strong>n variables</strong>, there are 2ⁿ possible combinations. With 2 variables you get 4 rows, with 3 variables you get 8 rows, and with 4 variables you get 16 rows. The generator evaluates your expression for each row and displays T (true) or F (false) for the result.
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Supported operators:</p>
            <p>• AND (∧): True only when both inputs are true</p>
            <p>• OR (∨): True when at least one input is true</p>
            <p>• NOT (¬): Inverts the truth value</p>
            <p>• XOR (⊕): True when exactly one input is true</p>
            <p>• NAND: NOT AND (false only when both are true)</p>
            <p>• NOR: NOT OR (true only when both are false)</p>
            <p>• IMPLIES (→): False only when first is true and second is false</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Example Logical Expressions</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">Basic AND Operation</h3>
          <p className="text-muted-foreground mb-2">
            Expression: A AND B
          </p>
          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-center">A</th>
                  <th className="p-2 text-center">B</th>
                  <th className="p-2 text-center">A AND B</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 text-center">T</td><td className="p-2 text-center">T</td><td className="p-2 text-center">T</td></tr>
                <tr><td className="p-2 text-center">T</td><td className="p-2 text-center">F</td><td className="p-2 text-center">F</td></tr>
                <tr><td className="p-2 text-center">F</td><td className="p-2 text-center">T</td><td className="p-2 text-center">F</td></tr>
                <tr><td className="p-2 text-center">F</td><td className="p-2 text-center">F</td><td className="p-2 text-center">F</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">De Morgan's Law</h3>
          <p className="text-muted-foreground mb-2">
            Expression: NOT (A AND B) = (NOT A) OR (NOT B)
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Test both sides to verify they produce identical results:</p>
            <p>Left:  NOT (A AND B)</p>
            <p>Right: (NOT A) OR (NOT B)</p>
            <p className="mt-2 text-muted-foreground">Both expressions are logically equivalent</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Implication (Conditional)</h3>
          <p className="text-muted-foreground mb-2">
            Expression: A IMPLIES B
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>This is equivalent to: (NOT A) OR B</p>
            <p>Only false when A=T and B=F</p>
            <p>Think: "If it rains, then the ground is wet"</p>
            <p>False only if it rains but ground stays dry</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Complex Expression</h3>
          <p className="text-muted-foreground mb-2">
            Expression: (A AND B) OR (NOT C)
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>True when:</p>
            <p>• Both A and B are true, OR</p>
            <p>• C is false</p>
            <p>• (or both conditions)</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Fact: Boolean Logic Origins</h2>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
            <p className="text-muted-foreground">
              <strong>George Boole</strong> (1815-1864), an English mathematician with no formal university education, created Boolean algebra in his 1854 book "The Laws of Thought." He showed that logic could be expressed using mathematical symbols where variables take only two values: 0 (false) or 1 (true). Nearly 80 years later, <strong>Claude Shannon</strong> realized in his 1937 MIT master's thesis that Boolean algebra could describe electrical switching circuits—laying the foundation for all digital computers. Every processor, memory chip, and digital device today operates on principles Boole established.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What is a truth table used for?</h3>
              <p className="text-muted-foreground">
                Truth tables are used to analyze logical expressions, verify logical equivalences, test argument validity, design digital circuits, and debug boolean conditions in programming. They provide a complete picture of how an expression behaves under all possible input conditions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I know if two expressions are logically equivalent?</h3>
              <p className="text-muted-foreground">
                Two expressions are logically equivalent if their truth tables produce identical output columns for every row. For example, "NOT (A AND B)" and "(NOT A) OR (NOT B)" are equivalent (De Morgan's Law). Generate truth tables for both and compare the result columns.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What does "A IMPLIES B" really mean?</h3>
              <p className="text-muted-foreground">
                "A implies B" (written A → B) is false only when A is true and B is false. It's true in all other cases, including when A is false. This seems odd but makes sense: "If it's raining, then the ground is wet" isn't proven false on a sunny day—the statement only fails if it rains and the ground stays dry.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What's the difference between OR and XOR?</h3>
              <p className="text-muted-foreground">
                Regular OR (inclusive OR) is true when at least one input is true—including when both are true. XOR (exclusive OR) is true only when exactly one input is true, but false when both are true. XOR is like "either/or but not both."
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How are truth tables used in computer science?</h3>
              <p className="text-muted-foreground">
                In programming, truth tables help design complex conditional statements, simplify boolean expressions, and debug logic errors. In hardware design, they specify the behavior of logic gates and digital circuits. Database queries and search filters also rely on boolean logic that can be analyzed with truth tables.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is a tautology?</h3>
              <p className="text-muted-foreground">
                A tautology is an expression that's always true, regardless of input values. For example, "A OR (NOT A)" is a tautology—it's true whether A is true or false. In a truth table, a tautology shows all T values in the result column. The opposite is a contradiction (always false).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can I use parentheses in my expressions?</h3>
              <p className="text-muted-foreground">
                Yes! Parentheses control the order of operations, just like in regular math. "(A AND B) OR C" is different from "A AND (B OR C)". Use parentheses to make your intended grouping clear, especially in complex expressions with multiple operators.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/math-tools/boolean-algebra-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Boolean Algebra Calculator</h3>
              <p className="text-sm text-muted-foreground">Simplify boolean expressions and verify logical equivalences.</p>
            </a>
            <a href="/math-tools/karnaugh-map-solver" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Karnaugh Map Solver</h3>
              <p className="text-sm text-muted-foreground">Minimize boolean expressions using K-map visualization.</p>
            </a>
            <a href="/math-tools/logic-gate-simulator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Logic Gate Simulator</h3>
              <p className="text-sm text-muted-foreground">Build and test digital circuits with logic gates.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
