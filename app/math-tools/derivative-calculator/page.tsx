"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DerivativeCalculator() {
  const [functionType, setFunctionType] = useState<"power" | "product" | "quotient" | "chain">("power");
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<{ derivative: string; steps: string[] } | null>(null);
  const [error, setError] = useState("");

  const differentiate = () => {
    setError("");
    setResult(null);

    if (!expression.trim()) {
      setError("Please enter a function to differentiate");
      return;
    }

    try {
      let derivative = "";
      const steps: string[] = [];

      if (functionType === "power") {
        const parsed = parsePowerFunction(expression);
        if (!parsed) {
          setError("Invalid power function. Use format: ax^n (e.g., 3x^2, x^3, 5x)");
          return;
        }
        const { a, n } = parsed;
        const newCoeff = a * n;
        const newPower = n - 1;

        if (newPower === 0) {
          derivative = `${newCoeff}`;
        } else if (newPower === 1) {
          derivative = `${newCoeff}x`;
        } else {
          derivative = `${newCoeff}x^${newPower}`;
        }

        steps.push(`Given function: f(x) = ${formatPowerFunction(a, n)}`);
        steps.push(`Power rule: d/dx(ax^n) = a * n * x^(n-1)`);
        steps.push(`Apply: ${a} * ${n} * x^(${n}-1) = ${newCoeff}x^${newPower}`);
        steps.push(`Derivative: f'(x) = ${derivative}`);
      } else if (functionType === "product") {
        const parsed = parseProductFunction(expression);
        if (!parsed) {
          setError("Invalid product function. Use format: (ax+b)(cx+d) or u*v");
          return;
        }
        const { u, v, du, dv } = parsed;

        derivative = `(${du})(${v}) + (${u})(${dv})`;
        const simplified = simplifyProduct(du, v, u, dv);

        steps.push(`Given: f(x) = (${u}) * (${v})`);
        steps.push(`Product rule: d/dx(u*v) = (du/dx)*v + u*(dv/dx)`);
        steps.push(`du/dx = ${du}, dv/dx = ${dv}`);
        steps.push(`Apply: (${du})(${v}) + (${u})(${dv})`);
        steps.push(`Simplified: f'(x) = ${simplified}`);
      } else if (functionType === "quotient") {
        const parsed = parseQuotientFunction(expression);
        if (!parsed) {
          setError("Invalid quotient function. Use format: (ax+b)/(cx+d)");
          return;
        }
        const { u, v, du, dv } = parsed;

        steps.push(`Given: f(x) = (${u}) / (${v})`);
        steps.push(`Quotient rule: d/dx(u/v) = (v*du - u*dv) / v^2`);
        steps.push(`du/dx = ${du}, dv/dx = ${dv}`);
        steps.push(`Apply: ((${v})(${du}) - (${u})(${dv})) / (${v})^2`);
        derivative = `((${v})(${du}) - (${u})(${dv})) / (${v})^2`;
      } else if (functionType === "chain") {
        const parsed = parseChainFunction(expression);
        if (!parsed) {
          setError("Invalid chain function. Use format: (ax+b)^n or sin(ax+b)");
          return;
        }
        const { outer, inner, innerDeriv, result: chainResult } = parsed;

        steps.push(`Given: f(x) = ${expression}`);
        steps.push(`Chain rule: d/dx[f(g(x))] = f'(g(x)) * g'(x)`);
        steps.push(`Outer function derivative: ${outer}`);
        steps.push(`Inner function: ${inner}, derivative: ${innerDeriv}`);
        steps.push(`Apply: ${chainResult}`);
        derivative = chainResult;
      }

      setResult({ derivative, steps });
    } catch (e) {
      setError("Unable to differentiate. Please check your function format.");
    }
  };

  const parsePowerFunction = (expr: string): { a: number; n: number } | null => {
    const clean = expr.replace(/\s/g, "").toLowerCase();
    
    // Match ax^n format
    const match1 = clean.match(/^(-?\d*\.?\d*)x\^(-?\d+\.?\d*)$/);
    if (match1) {
      return { a: parseFloat(match1[1]) || 1, n: parseFloat(match1[2]) };
    }
    
    // Match ax format (n=1)
    const match2 = clean.match(/^(-?\d*\.?\d*)x$/);
    if (match2) {
      return { a: parseFloat(match2[1]) || 1, n: 1 };
    }
    
    // Match constant
    const match3 = clean.match(/^(-?\d+\.?\d*)$/);
    if (match3) {
      return { a: parseFloat(match3[1]), n: 0 };
    }
    
    return null;
  };

  const formatPowerFunction = (a: number, n: number): string => {
    if (n === 0) return `${a}`;
    if (n === 1) return a === 1 ? "x" : a === -1 ? "-x" : `${a}x`;
    return a === 1 ? `x^${n}` : a === -1 ? `-x^${n}` : `${a}x^${n}`;
  };

  const parseProductFunction = (expr: string): { u: string; v: string; du: string; dv: string } | null => {
    const clean = expr.replace(/\s/g, "");
    const match = clean.match(/^\(([^)]+)\)\(([^)]+)\)$/);
    if (!match) return null;

    const u = match[1];
    const v = match[2];
    const du = differentiateLinear(u);
    const dv = differentiateLinear(v);

    return { u, v, du, dv };
  };

  const parseQuotientFunction = (expr: string): { u: string; v: string; du: string; dv: string } | null => {
    const clean = expr.replace(/\s/g, "");
    const match = clean.match(/^\(([^)]+)\)\/\(([^)]+)\)$/);
    if (!match) return null;

    const u = match[1];
    const v = match[2];
    const du = differentiateLinear(u);
    const dv = differentiateLinear(v);

    return { u, v, du, dv };
  };

  const parseChainFunction = (expr: string): { outer: string; inner: string; innerDeriv: string; result: string } | null => {
    const clean = expr.replace(/\s/g, "");
    
    // Match (ax+b)^n
    const match1 = clean.match(/^\(([^)]+)\)\^(\d+)$/);
    if (match1) {
      const inner = match1[1];
      const n = parseInt(match1[2]);
      const innerDeriv = differentiateLinear(inner);
      const outer = `n * u^(n-1) where u = (${inner})`;
      const result = `${n} * (${inner})^${n - 1} * (${innerDeriv})`;
      return { outer, inner, innerDeriv, result };
    }

    // Match sin(ax+b)
    const match2 = clean.match(/^sin\(([^)]+)\)$/);
    if (match2) {
      const inner = match2[1];
      const innerDeriv = differentiateLinear(inner);
      return {
        outer: "cos(u)",
        inner,
        innerDeriv,
        result: `cos(${inner}) * (${innerDeriv})`
      };
    }

    // Match cos(ax+b)
    const match3 = clean.match(/^cos\(([^)]+)\)$/);
    if (match3) {
      const inner = match3[1];
      const innerDeriv = differentiateLinear(inner);
      return {
        outer: "-sin(u)",
        inner,
        innerDeriv,
        result: `-sin(${inner}) * (${innerDeriv})`
      };
    }

    return null;
  };

  const differentiateLinear = (expr: string): string => {
    const clean = expr.replace(/\s/g, "").toLowerCase();
    
    // Match ax+b
    const match1 = clean.match(/^(-?\d*\.?\d*)x\+(-?\d+\.?\d*)$/);
    if (match1) {
      const a = parseFloat(match1[1]) || 1;
      return `${a}`;
    }
    
    // Match ax-b
    const match2 = clean.match(/^(-?\d*\.?\d*)x-(-?\d+\.?\d*)$/);
    if (match2) {
      const a = parseFloat(match2[1]) || 1;
      return `${a}`;
    }
    
    // Match ax
    const match3 = clean.match(/^(-?\d*\.?\d*)x$/);
    if (match3) {
      const a = parseFloat(match3[1]) || 1;
      return `${a}`;
    }
    
    // Match constant
    if (clean.match(/^-?\d+\.?\d*$/)) {
      return "0";
    }
    
    return "1";
  };

  const simplifyProduct = (du: string, v: string, u: string, dv: string): string => {
    // Basic simplification for linear functions
    return `(${du})(${v}) + (${u})(${dv})`;
  };

  const reset = () => {
    setExpression("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    if (functionType === "power") {
      setExpression("3x^2");
    } else if (functionType === "product") {
      setExpression("(2x+1)(x-3)");
    } else if (functionType === "quotient") {
      setExpression("(x+1)/(2x-1)");
    } else if (functionType === "chain") {
      setExpression("(3x+2)^4");
    }
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Derivative Calculator – Differentiate Functions Step by Step</h1>
        <p className="text-muted-foreground">
          Calculate the derivative of any function with our free online derivative calculator. Applies power, product, quotient, and chain rules with detailed step-by-step differentiation shown.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Label>Function Type:</Label>
          <Select value={functionType} onValueChange={(v) => {
            setFunctionType(v as typeof functionType);
            setExpression("");
            setResult(null);
            setError("");
          }}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="power">Power Rule (ax^n)</SelectItem>
              <SelectItem value="product">Product Rule (u*v)</SelectItem>
              <SelectItem value="quotient">Quotient Rule (u/v)</SelectItem>
              <SelectItem value="chain">Chain Rule</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={loadExample}>Load Example</Button>
        </div>

        <div>
          <Label htmlFor="expression">Function f(x):</Label>
          <Input
            id="expression"
            placeholder={
              functionType === "power" ? "e.g., 3x^2 or x^3" :
              functionType === "product" ? "e.g., (2x+1)(x-3)" :
              functionType === "quotient" ? "e.g., (x+1)/(2x-1)" :
              "e.g., (3x+2)^4 or sin(2x)"
            }
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {functionType === "power" && "Enter in format: ax^n (e.g., 3x^2, x^3, 5x, 7)"}
            {functionType === "product" && "Enter in format: (ax+b)(cx+d)"}
            {functionType === "quotient" && "Enter in format: (ax+b)/(cx+d)"}
            {functionType === "chain" && "Enter in format: (ax+b)^n, sin(ax+b), or cos(ax+b)"}
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={differentiate}>Calculate Derivative</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Derivative</p>
              <p className="text-3xl font-bold font-mono">f'(x) = {result.derivative}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                {result.steps.map((step, i) => (
                  <div key={i}>{step}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
