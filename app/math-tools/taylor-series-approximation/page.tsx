"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TaylorSeriesApproximation() {
  const [functionType, setFunctionType] = useState<"sin" | "cos" | "exp" | "ln" | "custom">("sin");
  const [customFunction, setCustomFunction] = useState("x^2");
  const [center, setCenter] = useState("0");
  const [order, setOrder] = useState("5");
  const [evalPoint, setEvalPoint] = useState("1");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };

  const evaluateFunction = (type: string, custom: string, x: number): number | null => {
    try {
      let expr = "";
      switch (type) {
        case "sin": expr = "Math.sin(x)"; break;
        case "cos": expr = "Math.cos(x)"; break;
        case "exp": expr = "Math.exp(x)"; break;
        case "ln": expr = "Math.log(x)"; break;
        case "custom":
          expr = custom
            .replace(/\^/g, "**")
            .replace(/sin/g, "Math.sin")
            .replace(/cos/g, "Math.cos")
            .replace(/tan/g, "Math.tan")
            .replace(/sqrt/g, "Math.sqrt")
            .replace(/log/g, "Math.log10")
            .replace(/ln/g, "Math.log")
            .replace(/exp/g, "Math.exp")
            .replace(/pi/g, "Math.PI")
            .replace(/e(?![xp])/g, "Math.E");
          break;
        default: return null;
      }
      
      const func = new Function("x", `return ${expr}`);
      const result = func(x);
      return isFinite(result) ? result : null;
    } catch {
      return null;
    }
  };

  const getDerivativeFormula = (type: string, n: number): string => {
    const formulas: Record<string, string[]> = {
      sin: ["sin(x)", "cos(x)", "-sin(x)", "-cos(x)", "sin(x)"],
      cos: ["cos(x)", "-sin(x)", "-cos(x)", "sin(x)", "cos(x)"],
      exp: ["e^x"],
      ln: ["1/x", "-1/x²", "2/x³", "-6/x⁴", "24/x⁵"]
    };
    
    if (type === "sin" || type === "cos") {
      return formulas[type][n % 4];
    } else if (type === "exp") {
      return "e^x";
    } else if (type === "ln" && n < formulas.ln.length) {
      return formulas.ln[n];
    }
    return `f^(${n})(x)`;
  };

  const calculate = () => {
    setError("");
    setResult(null);

    const centerVal = parseFloat(center);
    const orderVal = parseInt(order);
    const evalVal = parseFloat(evalPoint);

    if (isNaN(centerVal) || isNaN(orderVal) || isNaN(evalVal)) {
      setError("Please enter valid numbers");
      return;
    }

    if (orderVal < 0 || orderVal > 15) {
      setError("Please enter order between 0 and 15");
      return;
    }

    if (functionType === "ln" && centerVal <= 0) {
      setError("For ln(x), center must be positive");
      return;
    }

    if (functionType === "ln" && evalVal <= 0) {
      setError("For ln(x), evaluation point must be positive");
      return;
    }

    // Calculate Taylor series coefficients
    const terms: { n: number; coefficient: number; term: string; value: number }[] = [];
    
    for (let n = 0; n <= orderVal; n++) {
      // Calculate nth derivative at center
      let derivativeAtCenter: number;
      
      if (functionType === "sin") {
        const derivValues = [Math.sin, Math.cos, (x: number) => -Math.sin(x), (x: number) => -Math.cos(x)];
        derivativeAtCenter = derivValues[n % 4](centerVal);
      } else if (functionType === "cos") {
        const derivValues = [Math.cos, (x: number) => -Math.sin(x), (x: number) => -Math.cos(x), Math.sin];
        derivativeAtCenter = derivValues[n % 4](centerVal);
      } else if (functionType === "exp") {
        derivativeAtCenter = Math.exp(centerVal);
      } else if (functionType === "ln") {
        if (n === 0) {
          derivativeAtCenter = Math.log(centerVal);
        } else {
          derivativeAtCenter = (factorial(n - 1) * Math.pow(-1, n - 1)) / Math.pow(centerVal, n);
        }
      } else {
        // Numerical differentiation for custom functions
        const h = 0.0001;
        derivativeAtCenter = numericalDerivative(customFunction, centerVal, n, h);
      }

      const coefficient = derivativeAtCenter / factorial(n);
      const termValue = coefficient * Math.pow(evalVal - centerVal, n);
      
      let termStr = "";
      if (n === 0) {
        termStr = `${derivativeAtCenter.toFixed(6)}`;
      } else if (n === 1) {
        termStr = `${derivativeAtCenter.toFixed(6)}(x - ${centerVal})`;
      } else {
        termStr = `${(derivativeAtCenter / factorial(n)).toFixed(6)}(x - ${centerVal})^${n}`;
      }

      terms.push({
        n,
        coefficient: Math.round(coefficient * 1000000) / 1000000,
        term: termStr,
        value: Math.round(termValue * 1000000) / 1000000
      });
    }

    // Calculate approximation
    const approximation = terms.reduce((sum, t) => sum + t.value, 0);
    const actualValue = evaluateFunction(functionType, customFunction, evalVal);
    const absoluteError = actualValue !== null ? Math.abs(actualValue - approximation) : null;
    const relativeError = actualValue !== null && actualValue !== 0 ? (absoluteError! / Math.abs(actualValue)) * 100 : null;

    // Build polynomial string
    let polynomial = terms[0].coefficient.toFixed(6);
    for (let i = 1; i < terms.length; i++) {
      const term = terms[i];
      const sign = term.coefficient >= 0 ? " + " : " - ";
      const absCoeff = Math.abs(term.coefficient);
      if (i === 1) {
        polynomial += `${sign}${absCoeff.toFixed(6)}(x - ${centerVal})`;
      } else {
        polynomial += `${sign}${absCoeff.toFixed(6)}(x - ${centerVal})^${i}`;
      }
    }

    setResult({
      terms,
      approximation: Math.round(approximation * 1000000) / 1000000,
      actualValue: actualValue !== null ? Math.round(actualValue * 1000000) / 1000000 : null,
      absoluteError,
      relativeError,
      polynomial,
      center: centerVal,
      order: orderVal,
      evalPoint: evalVal,
      functionType
    });
  };

  const numericalDerivative = (expr: string, x: number, n: number, h: number = 0.001): number => {
    if (n === 0) {
      return evaluateFunction("custom", expr, x) || 0;
    }
    
    // Use central difference formula recursively
    const derivAtX = (numericalDerivative(expr, x + h, n - 1, h) - numericalDerivative(expr, x - h, n - 1, h)) / (2 * h);
    return derivAtX;
  };

  const reset = () => {
    setFunctionType("sin");
    setCenter("0");
    setOrder("5");
    setEvalPoint("1");
    setResult(null);
    setError("");
  };

  const loadExample = (type: "sin" | "cos" | "exp") => {
    setFunctionType(type);
    setCenter("0");
    setOrder("5");
    setEvalPoint("0.5");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Taylor Series Approximation – Generate Taylor Polynomials</h1>
        <p className="text-muted-foreground">
          Generate Taylor series approximations for common functions with our free online calculator. Get polynomial expansions, coefficients, and error analysis step by step.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <Label>Function:</Label>
          <Select value={functionType} onValueChange={(v) => { setFunctionType(v as typeof functionType); setResult(null); }}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sin">sin(x)</SelectItem>
              <SelectItem value="cos">cos(x)</SelectItem>
              <SelectItem value="exp">e^x</SelectItem>
              <SelectItem value="ln">ln(x)</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          
          {functionType === "custom" && (
            <Input
              placeholder="e.g., x^2 + 3x"
              value={customFunction}
              onChange={(e) => setCustomFunction(e.target.value)}
              className="w-48"
            />
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Center (a)</Label>
            <Input type="number" value={center} onChange={(e) => setCenter(e.target.value)} />
            <p className="text-xs text-muted-foreground mt-1">Expansion point</p>
          </div>
          <div>
            <Label>Order (n)</Label>
            <Input type="number" value={order} onChange={(e) => setOrder(e.target.value)} />
            <p className="text-xs text-muted-foreground mt-1">Degree of polynomial</p>
          </div>
          <div>
            <Label>Evaluate at x</Label>
            <Input type="number" value={evalPoint} onChange={(e) => setEvalPoint(e.target.value)} />
            <p className="text-xs text-muted-foreground mt-1">Point to approximate</p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate Taylor Series</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("sin")}>sin(x)</Button>
          <Button variant="outline" onClick={() => loadExample("cos")}>cos(x)</Button>
          <Button variant="outline" onClick={() => loadExample("exp")}>e^x</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-4 text-center">Taylor Polynomial T<sub>{result.order}</sub>(x)</h4>
              <code className="text-sm md:text-base font-mono bg-background px-4 py-3 rounded block break-all">
                {result.polynomial}
              </code>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Approximation</p>
                <p className="text-xl font-bold">{result.approximation}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Actual Value</p>
                <p className="text-xl font-bold">{result.actualValue !== null ? result.actualValue : "N/A"}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Absolute Error</p>
                <p className="text-xl font-bold">{result.absoluteError !== null ? result.absoluteError : "N/A"}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Relative Error</p>
                <p className="text-xl font-bold">{result.relativeError !== null ? `${result.relativeError.toFixed(6)}%` : "N/A"}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Term-by-Term Breakdown</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">n</th>
                      <th className="p-2 text-left">f^(n)(a)</th>
                      <th className="p-2 text-left">n!</th>
                      <th className="p-2 text-left">Coefficient</th>
                      <th className="p-2 text-left">Term Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.terms.map((term: any) => (
                      <tr key={term.n} className="border-b">
                        <td className="p-2">{term.n}</td>
                        <td className="p-2 font-mono">{(functionType === "exp" ? Math.exp(result.center) : term.coefficient * factorial(term.n)).toFixed(6)}</td>
                        <td className="p-2">{factorial(term.n)}</td>
                        <td className="p-2 font-mono">{term.coefficient}</td>
                        <td className="p-2 font-mono">{term.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Taylor Series Formula</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                f(x) = Σ(n=0 to ∞) [f^(n)(a) / n!] × (x - a)^n
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                Where f^(n)(a) is the nth derivative evaluated at x = a
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Taylor Series</h2>
        <p className="text-muted-foreground">
          A Taylor series represents a function as an infinite sum of terms calculated from the function's derivatives at a single point. Taylor polynomials provide increasingly accurate approximations as more terms are included.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Common Taylor Series</h3>
            <ul className="space-y-2 text-sm font-mono">
              <li>sin(x) = x - x³/3! + x⁵/5! - x⁷/7! + ...</li>
              <li>cos(x) = 1 - x²/2! + x⁴/4! - x⁶/6! + ...</li>
              <li>e^x = 1 + x + x²/2! + x³/3! + ...</li>
              <li>ln(1+x) = x - x²/2 + x³/3 - x⁴/4 + ...</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Applications</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Approximating complex functions</li>
              <li>• Solving differential equations</li>
              <li>• Physics and engineering calculations</li>
              <li>• Computer function implementations</li>
              <li>• Error analysis and bounds</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What is a Taylor series?</h3>
          <p className="text-sm text-muted-foreground">
            A Taylor series is an infinite sum of terms that approximates a function near a point. Each term uses higher-order derivatives to improve accuracy.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's the difference between Taylor and Maclaurin series?</h3>
          <p className="text-sm text-muted-foreground">
            A Maclaurin series is a Taylor series centered at a = 0. All Maclaurin series are Taylor series, but not all Taylor series are Maclaurin series.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How many terms do I need?</h3>
          <p className="text-sm text-muted-foreground">
            More terms give better accuracy. For most practical purposes, 5-10 terms provide good approximations near the center point.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">When does Taylor series fail?</h3>
          <p className="text-sm text-muted-foreground">
            Taylor series may diverge or converge slowly far from the center point. Functions with discontinuities or singularities may not have valid Taylor expansions everywhere.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is the remainder term?</h3>
          <p className="text-sm text-muted-foreground">
            The remainder (error) term quantifies the difference between the function and its Taylor polynomial. Lagrange's form: Rₙ(x) = f^(n+1)(c) × (x-a)^(n+1) / (n+1)! for some c between a and x.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/derivative-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Derivative Calculator</p>
            <p className="text-xs text-muted-foreground">Find derivatives</p>
          </a>
          <a href="/math-tools/2d-function-plotter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Function Plotter</p>
            <p className="text-xs text-muted-foreground">Graph functions</p>
          </a>
          <a href="/math-tools/factorial-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Factorial Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate n!</p>
          </a>
        </div>
      </section>
    </div>
  );
}
