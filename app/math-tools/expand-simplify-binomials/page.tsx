"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ExpandSimplifyBinomials() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operation, setOperation] = useState("square");
  const [result, setResult] = useState<{
    expanded: string;
    simplified: string;
    steps: string[];
    formula: string;
  } | null>(null);
  const [error, setError] = useState("");

  const expand = () => {
    if (!a.trim() || !b.trim()) {
      setError("Please enter both terms");
      setResult(null);
      return;
    }

    setError("");
    const steps: string[] = [];
    let expanded = "";
    let simplified = "";
    let formula = "";

    const aTerm = a.trim();
    const bTerm = b.trim();

    if (operation === "square") {
      formula = "(a + b)² = a² + 2ab + b²";
      steps.push(`Expanding: (${aTerm} + ${bTerm})²`);
      steps.push(`Using formula: (a + b)² = a² + 2ab + b²`);
      steps.push(`(${aTerm})² + 2(${aTerm})(${bTerm}) + (${bTerm})²`);
      
      const a2 = simplifyTerm(aTerm, 2);
      const ab = simplifyProduct(aTerm, bTerm, 2);
      const b2 = simplifyTerm(bTerm, 2);
      
      steps.push(`${a2} + ${ab} + ${b2}`);
      expanded = `(${aTerm} + ${bTerm})²`;
      simplified = `${a2} + ${ab} + ${b2}`;
    } else if (operation === "cube") {
      formula = "(a + b)³ = a³ + 3a²b + 3ab² + b³";
      steps.push(`Expanding: (${aTerm} + ${bTerm})³`);
      steps.push(`Using formula: (a + b)³ = a³ + 3a²b + 3ab² + b³`);
      steps.push(`(${aTerm})³ + 3(${aTerm})²(${bTerm}) + 3(${aTerm})(${bTerm})² + (${bTerm})³`);
      
      const a3 = simplifyTerm(aTerm, 3);
      const a2b = simplifyProduct(aTerm, aTerm, 3, bTerm);
      const ab2 = simplifyProduct(aTerm, bTerm, bTerm, 3);
      const b3 = simplifyTerm(bTerm, 3);
      
      steps.push(`${a3} + ${a2b} + ${ab2} + ${b3}`);
      expanded = `(${aTerm} + ${bTerm})³`;
      simplified = `${a3} + ${a2b} + ${ab2} + ${b3}`;
    } else if (operation === "product") {
      formula = "(a + b)(c + d) = ac + ad + bc + bd (FOIL)";
      const [a1, b1] = parseBinomial(aTerm);
      const [a2, b2] = parseBinomial(bTerm);
      
      steps.push(`Expanding: (${aTerm})(${bTerm})`);
      steps.push(`Using FOIL: First + Outer + Inner + Last`);
      
      const first = simplifyProduct(a1, a2);
      const outer = simplifyProduct(a1, b2);
      const inner = simplifyProduct(b1, a2);
      const last = simplifyProduct(b1, b2);
      
      steps.push(`First: ${a1} × ${a2} = ${first}`);
      steps.push(`Outer: ${a1} × ${b2} = ${outer}`);
      steps.push(`Inner: ${b1} × ${a2} = ${inner}`);
      steps.push(`Last: ${b1} × ${b2} = ${last}`);
      
      const combined = combineLikeTerms([first, outer, inner, last]);
      steps.push(`Combine: ${combined}`);
      
      expanded = `(${aTerm})(${bTerm})`;
      simplified = combined;
    } else if (operation === "difference") {
      formula = "(a + b)(a - b) = a² - b²";
      steps.push(`Expanding: (${aTerm} + ${bTerm})(${aTerm} - ${bTerm})`);
      steps.push(`Using formula: (a + b)(a - b) = a² - b²`);
      
      const a2 = simplifyTerm(aTerm, 2);
      const b2 = simplifyTerm(bTerm, 2);
      
      steps.push(`(${aTerm})² - (${bTerm})²`);
      expanded = `(${aTerm} + ${bTerm})(${aTerm} - ${bTerm})`;
      simplified = `${a2} - ${b2}`;
    }

    setResult({ expanded, simplified, steps, formula });
  };

  const parseBinomial = (expr: string): [string, string] => {
    const parts = expr.split(/(?=[+-])/);
    if (parts.length >= 2) {
      return [parts[0].trim(), parts.slice(1).join("").trim()];
    }
    return [parts[0].trim(), "0"];
  };

  const simplifyTerm = (term: string, power: number): string => {
    const numMatch = term.match(/^(-?\d+\.?\d*)$/);
    const varMatch = term.match(/^(-?\d*\.?\d*)([a-zA-Z]+)(?:\^(\d+))?$/);
    
    if (numMatch) {
      const num = parseFloat(numMatch[1]);
      return `${Math.pow(num, power)}`;
    }
    
    if (varMatch) {
      const coef = varMatch[1] === "" || varMatch[1] === "+" ? 1 : varMatch[1] === "-" ? -1 : parseFloat(varMatch[1]);
      const variable = varMatch[2];
      const existingPower = varMatch[3] ? parseInt(varMatch[3]) : 1;
      const newPower = existingPower * power;
      
      const coefPowered = Math.pow(coef, power);
      if (newPower === 1) {
        return coefPowered === 1 ? variable : coefPowered === -1 ? `-${variable}` : `${coefPowered}${variable}`;
      }
      return coefPowered === 1 ? `${variable}^${newPower}` : coefPowered === -1 ? `-${variable}^${newPower}` : `${coefPowered}${variable}^${newPower}`;
    }
    
    return `(${term})^${power}`;
  };

  const simplifyProduct = (...terms: (string | number)[]): string => {
    let coefficient = 1;
    const variables: Map<string, number> = new Map();
    
    terms.forEach((term) => {
      if (typeof term === "number") {
        coefficient *= term;
        return;
      }
      
      const numMatch = term.match(/^(-?\d+\.?\d*)$/);
      const varMatch = term.match(/^(-?\d*\.?\d*)([a-zA-Z]+)(?:\^(\d+))?$/);
      
      if (numMatch) {
        coefficient *= parseFloat(numMatch[1]);
      } else if (varMatch) {
        const coef = varMatch[1] === "" || varMatch[1] === "+" ? 1 : varMatch[1] === "-" ? -1 : parseFloat(varMatch[1]);
        coefficient *= coef;
        const variable = varMatch[2];
        const power = varMatch[3] ? parseInt(varMatch[3]) : 1;
        variables.set(variable, (variables.get(variable) || 0) + power);
      }
    });
    
    let result = "";
    if (coefficient !== 1 || variables.size === 0) {
      result = coefficient.toString();
    }
    
    variables.forEach((power, variable) => {
      if (power === 1) {
        result += variable;
      } else {
        result += `${variable}^${power}`;
      }
    });
    
    return result || "0";
  };

  const combineLikeTerms = (terms: string[]): string => {
    const termMap = new Map<string, number>();
    
    terms.forEach((term) => {
      const varMatch = term.match(/^(-?\d+\.?\d*)([a-zA-Z]+)?(?:\^(\d+))?$/);
      if (varMatch) {
        const coef = parseFloat(varMatch[1]) || (varMatch[1] === "-" ? -1 : 1);
        const variable = varMatch[2] || "";
        const power = varMatch[3] ? parseInt(varMatch[3]) : (variable ? 1 : 0);
        const key = `${variable}${power > 0 ? `^${power}` : ""}`;
        termMap.set(key, (termMap.get(key) || 0) + coef);
      }
    });
    
    const result: string[] = [];
    termMap.forEach((coef, key) => {
      if (coef !== 0) {
        if (key === "") {
          result.push(`${coef}`);
        } else if (coef === 1) {
          result.push(key);
        } else if (coef === -1) {
          result.push(`-${key}`);
        } else {
          result.push(`${coef}${key}`);
        }
      }
    });
    
    return result.join(" + ").replace(/\+ -/g, "- ").replace(/\s+/g, " ") || "0";
  };

  const reset = () => {
    setA("");
    setB("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Binomial Expansion Calculator – Expand & Simplify Binomials
          </h1>
          <p className="text-xl text-muted-foreground">
            Expand and simplify binomial expressions instantly with our free online binomial expansion calculator. Handles products, squares, and cubes of binomials with full step-by-step solutions.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Operation Type</label>
              <Select value={operation} onValueChange={setOperation}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">Square (a + b)²</SelectItem>
                  <SelectItem value="cube">Cube (a + b)³</SelectItem>
                  <SelectItem value="product">Product (a + b)(c + d)</SelectItem>
                  <SelectItem value="difference">Difference (a + b)(a - b)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {operation === "product" ? (
              <div>
                <label className="text-sm font-medium mb-2 block">First Binomial (a + b)</label>
                <Input
                  type="text"
                  placeholder="e.g., x + 3 or 2x - 5"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  className="w-full"
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">First Term (a)</label>
                  <Input
                    type="text"
                    placeholder="e.g., x or 2x"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Second Term (b)</label>
                  <Input
                    type="text"
                    placeholder="e.g., 3 or y"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    className="w-full"
                  />
                </div>
              </>
            )}

            {operation === "product" && (
              <div>
                <label className="text-sm font-medium mb-2 block">Second Binomial (c + d)</label>
                <Input
                  type="text"
                  placeholder="e.g., x - 2 or 3x + 1"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  className="w-full"
                />
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button onClick={expand}>Expand</Button>
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
                  <p className="text-sm text-muted-foreground mb-2">Formula Used</p>
                  <p className="text-lg font-semibold font-mono">{result.formula}</p>
                </div>
                <div className="p-4 bg-muted rounded-md mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Original Expression</p>
                  <p className="text-xl font-semibold font-mono">{result.expanded}</p>
                </div>
                <div className="p-4 bg-muted rounded-md mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Expanded & Simplified</p>
                  <p className="text-2xl font-semibold font-mono">{result.simplified}</p>
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
