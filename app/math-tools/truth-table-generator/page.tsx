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

    </div>
  );
}
