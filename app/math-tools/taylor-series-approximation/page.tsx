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

    if (orderVal < 0 || orderVal > 20) {
      setError("Please enter order between 0 and 20");
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

    const terms: { n: number; coefficient: number; term: string; value: number }[] = [];

    for (let n = 0; n <= orderVal; n++) {
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

    const approximation = terms.reduce((sum, t) => sum + t.value, 0);
    const actualValue = evaluateFunction(functionType, customFunction, evalVal);
    const absoluteError = actualValue !== null ? Math.abs(actualValue - approximation) : null;
    const relativeError = actualValue !== null && actualValue !== 0 ? (absoluteError! / Math.abs(actualValue)) * 100 : null;

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

  const loadExample = (type: "sin" | "cos" | "exp", c: string, o: string, e: string) => {
    setFunctionType(type);
    setCenter(c);
    setOrder(o);
    setEvalPoint(e);
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
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("sin", "0", "5", "0.5")}>sin(x) at 0, order 5</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("cos", "0", "4", "0.5")}>cos(x) at 0, order 4</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("exp", "0", "4", "0.5")}>eˣ at 0, order 4</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("sin", "0", "7", "1")}>sin(x) at 0, order 7</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("exp", "0", "6", "1")}>eˣ at 0, order 6</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("ln", "1", "4", "1.5")}>ln(x) at 1, order 4</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("cos", "0", "6", "1")}>cos(x) at 0, order 6</Button>
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

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Understanding Taylor Series</h2>
          <p className="text-muted-foreground">
            A Taylor series represents a function as an infinite sum of terms calculated from the function's derivatives at a single point. It's like expressing a complex curve as a polynomial – and polynomials are much easier to work with. The more terms you include, the better the approximation.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Taylor series are the backbone of computational mathematics. Your calculator uses them to compute sin, cos, eˣ, and ln. Physics simulations use them to approximate complex forces. Engineers use them to linearize nonlinear systems. They turn the impossible into the manageable.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Taylor Series</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Sine (centered at 0)</h4>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block mb-2">
              sin(x) = x - x³/3! + x⁵/5! - x⁷/7! + ...
            </code>
            <p className="text-xs text-muted-foreground">
              Only odd powers, alternating signs
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Cosine (centered at 0)</h4>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block mb-2">
              cos(x) = 1 - x²/2! + x⁴/4! - x⁶/6! + ...
            </code>
            <p className="text-xs text-muted-foreground">
              Only even powers, alternating signs
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Exponential (centered at 0)</h4>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block mb-2">
              eˣ = 1 + x + x²/2! + x³/3! + x⁴/4! + ...
            </code>
            <p className="text-xs text-muted-foreground">
              All powers, all positive coefficients
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Natural Log (centered at 1)</h4>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block mb-2">
              ln(x) = (x-1) - (x-1)²/2 + (x-1)³/3 - ...
            </code>
            <p className="text-xs text-muted-foreground">
              Valid for 0 &lt; x ≤ 2
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: sin(x) approximation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Approximate sin(0.5) using Taylor polynomial of order 5 at a=0
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              T₅(x) = x - x³/6 + x⁵/120
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              T₅(0.5) = 0.5 - 0.125/6 + 0.03125/120 = 0.5 - 0.02083 + 0.00026
            </p>
            <p className="text-sm text-muted-foreground">
              T₅(0.5) ≈ 0.47943 (actual: 0.47943, error: 0.000002%)
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: eˣ approximation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Approximate e^0.5 using Taylor polynomial of order 4 at a=0
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              T₄(x) = 1 + x + x²/2 + x³/6 + x⁴/24
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              T₄(0.5) = 1 + 0.5 + 0.125 + 0.02083 + 0.00260
            </p>
            <p className="text-sm text-muted-foreground">
              T₄(0.5) ≈ 1.64844 (actual: 1.64872, error: 0.017%)
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: cos(x) approximation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Approximate cos(1) using Taylor polynomial of order 6 at a=0
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              T₆(x) = 1 - x²/2 + x⁴/24 - x⁶/720
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              T₆(1) = 1 - 0.5 + 0.04167 - 0.00139
            </p>
            <p className="text-sm text-muted-foreground">
              T₆(1) ≈ 0.54028 (actual: 0.54030, error: 0.004%)
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Why center matters</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Approximate sin(3) using order 5 at a=0 vs a=π
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              At a=0: x=3 is far from center, poor approximation
            </p>
            <p className="text-sm text-muted-foreground">
              At a=π: x=3 is close to π≈3.14, excellent approximation. Always center near your evaluation point!
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Order vs accuracy</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: How does order affect e^1 approximation?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Order 2: 1 + 1 + 0.5 = 2.5 (error: 8%)
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Order 4: 2.7083 (error: 0.15%)
            </p>
            <p className="text-sm text-muted-foreground">
              Order 10: 2.71828 (error: 0.00001%). Higher order = better accuracy.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm">
            Brook Taylor published his method in 1715, but the Scottish mathematician James Gregory discovered many special cases 40 years earlier. The Taylor series for sin(x), cos(x), and eˣ were known to Indian mathematicians of the Kerala school in the 14th century – 300 years before Taylor! Mathematics is a global, cumulative enterprise.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">When Taylor Series Work Best</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Near the Center</h4>
            <p className="text-sm text-muted-foreground">
              Taylor series converge fastest near the expansion point a. Error grows as you move away. For best results, center at or near your evaluation point.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Smooth Functions</h4>
            <p className="text-sm text-muted-foreground">
              Functions must be infinitely differentiable at the center. Sharp corners, discontinuities, or vertical tangents break the approximation.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Higher Order</h4>
            <p className="text-sm text-muted-foreground">
              More terms = better accuracy. But diminishing returns set in. Order 5-10 often gives excellent results for common functions.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between Taylor and Maclaurin series?</h4>
            <p className="text-sm text-muted-foreground">
              A Maclaurin series is just a Taylor series centered at a=0. All Maclaurin series are Taylor series, but not vice versa. The term "Maclaurin" honors Colin Maclaurin, who extensively used these 0-centered expansions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How many terms do I need?</h4>
            <p className="text-sm text-muted-foreground">
              It depends on desired accuracy and distance from center. For sin(x) near 0, order 5-7 gives calculator precision. For eˣ, you might need order 10-15. Use the error term to estimate: |Rₙ| ≤ M|x-a|ⁿ⁺¹/(n+1)!
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Do Taylor series always converge?</h4>
            <p className="text-sm text-muted-foreground">
              No! Some functions have Taylor series that converge only within a certain radius. For ln(x) centered at 1, the series only converges for 0 &lt; x ≤ 2. Outside this range, adding more terms makes things worse.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why are factorials in the denominator?</h4>
            <p className="text-sm text-muted-foreground">
              The n! comes from repeatedly differentiating (x-a)ⁿ. Each differentiation brings down a power: d/dx(xⁿ) = nxⁿ⁻¹, then n(n-1)xⁿ⁻², etc. After n derivatives, you get n!. The factorial normalizes the coefficients.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use Taylor series for any function?</h4>
            <p className="text-sm text-muted-foreground">
              The function must be "analytic" – infinitely differentiable with a convergent Taylor series. Most common functions (polynomials, trig, exp, log) are analytic where defined. Functions with discontinuities or sharp corners are not.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do calculators use Taylor series?</h4>
            <p className="text-sm text-muted-foreground">
              Calculators use optimized polynomial approximations (often Taylor-based) combined with range reduction. For sin(x), they reduce x to [0, π/2], then use a carefully chosen polynomial. This is faster than computing infinite series directly.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/derivative-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Derivative Calculator</p>
            <p className="text-xs text-muted-foreground">Find derivatives</p>
          </a>
          <a href="/math-tools/series-convergence" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Series Convergence</p>
            <p className="text-xs text-muted-foreground">Test convergence</p>
          </a>
          <a href="/math-tools/polynomial-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Polynomial Calculator</p>
            <p className="text-xs text-muted-foreground">Polynomial operations</p>
          </a>
        </div>
      </section>
    </div>
  );
}
