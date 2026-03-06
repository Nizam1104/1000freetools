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
        <h2 className="text-2xl font-semibold">Understanding Derivatives</h2>
        <p className="text-muted-foreground">
          A derivative measures the rate at which a function changes at any given point. It represents the slope of the tangent line to the function's graph and is fundamental to calculus, physics, and engineering.
        </p>
        <p className="text-muted-foreground">
          The derivative of f(x) is denoted as f'(x), df/dx, or d/dx[f(x)]. It tells you how fast the output changes as the input changes.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Differentiation Rules</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Power Rule</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              d/dx(x^n) = n * x^(n-1)
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Example: d/dx(3x^2) = 6x
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Product Rule</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              d/dx(u*v) = u'*v + u*v'
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Example: d/dx(x*sin(x)) = sin(x) + x*cos(x)
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Quotient Rule</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              d/dx(u/v) = (v*u' - u*v') / v^2
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Example: d/dx(1/x) = -1/x^2
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Chain Rule</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              d/dx[f(g(x))] = f'(g(x)) * g'(x)
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Example: d/dx(sin(2x)) = 2*cos(2x)
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Derivatives</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Trigonometric</h3>
            <ul className="space-y-1 text-sm font-mono">
              <li>d/dx(sin x) = cos x</li>
              <li>d/dx(cos x) = -sin x</li>
              <li>d/dx(tan x) = sec^2 x</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Exponential</h3>
            <ul className="space-y-1 text-sm font-mono">
              <li>d/dx(e^x) = e^x</li>
              <li>d/dx(a^x) = a^x * ln(a)</li>
              <li>d/dx(ln x) = 1/x</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Basic Rules</h3>
            <ul className="space-y-1 text-sm font-mono">
              <li>d/dx(c) = 0</li>
              <li>d/dx(x) = 1</li>
              <li>d/dx(cx) = c</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is a derivative?</h3>
            <p className="text-sm text-muted-foreground">
              A derivative measures the instantaneous rate of change of a function. Geometrically, it represents the slope of the tangent line at any point on the function's graph.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">When do I use the chain rule?</h3>
            <p className="text-sm text-muted-foreground">
              Use the chain rule when differentiating a composite function – a function inside another function. Examples include (x^2 + 1)^3, sin(2x), or e^(3x).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between d/dx and dy/dx?</h3>
            <p className="text-sm text-muted-foreground">
              They mean the same thing. d/dx is the operator notation (read as "d by d x"), while dy/dx is Leibniz notation showing the derivative of y with respect to x.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why is the derivative of a constant zero?</h3>
            <p className="text-sm text-muted-foreground">
              A constant doesn't change, so its rate of change is zero. The graph of a constant is a horizontal line with slope 0.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/tangent-line-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Tangent Line Calculator</p>
            <p className="text-xs text-muted-foreground">Find tangent equations</p>
          </a>
          <a href="/math-tools/definite-integral-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Definite Integral Calculator</p>
            <p className="text-xs text-muted-foreground">Compute integrals</p>
          </a>
          <a href="/math-tools/limit-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Limit Calculator</p>
            <p className="text-xs text-muted-foreground">Evaluate limits</p>
          </a>
        </div>
      </section>
    </div>
  );
}
