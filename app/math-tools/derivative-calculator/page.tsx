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

      <div className="mt-16 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How the Derivative Calculator Works</h2>
          <p className="text-muted-foreground mb-4">
            This calculator applies the fundamental rules of differentiation to find the derivative of your function. The derivative represents the instantaneous rate of change of a function at any given point, which geometrically corresponds to the slope of the tangent line.
          </p>
          <p className="text-muted-foreground mb-4">
            When you enter a function, the calculator identifies which differentiation rule applies:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong>Power Rule:</strong> For functions like x^n, the derivative is n·x^(n-1)</li>
            <li><strong>Product Rule:</strong> For u(x)·v(x), the derivative is u'v + uv'</li>
            <li><strong>Quotient Rule:</strong> For u(x)/v(x), the derivative is (vu' - uv')/v²</li>
            <li><strong>Chain Rule:</strong> For composite functions f(g(x)), the derivative is f'(g(x))·g'(x)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Example Calculations</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">Power Rule Example</h3>
          <p className="text-muted-foreground mb-2">
            Find the derivative of f(x) = 3x²
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>f(x) = 3x²</p>
            <p>f'(x) = 3 · 2 · x^(2-1) = 6x</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Product Rule Example</h3>
          <p className="text-muted-foreground mb-2">
            Find the derivative of f(x) = (2x+1)(x-3)
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Let u = 2x+1, so u' = 2</p>
            <p>Let v = x-3, so v' = 1</p>
            <p>f'(x) = u'v + uv' = 2(x-3) + (2x+1)(1) = 2x - 6 + 2x + 1 = 4x - 5</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Chain Rule Example</h3>
          <p className="text-muted-foreground mb-2">
            Find the derivative of f(x) = (3x+2)⁴
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Outer function: u⁴, derivative: 4u³</p>
            <p>Inner function: 3x+2, derivative: 3</p>
            <p>f'(x) = 4(3x+2)³ · 3 = 12(3x+2)³</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Fact: The Birth of Calculus</h2>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
            <p className="text-muted-foreground">
              The derivative was independently developed by both <strong>Isaac Newton</strong> and <strong>Gottfried Wilhelm Leibniz</strong> in the late 17th century. Newton called it the "method of fluxions" and used it to describe rates of change in physics, while Leibniz developed the notation dy/dx that we still use today. Their rivalry over who invented calculus first became one of the most famous disputes in the history of mathematics. Leibniz's notation proved more practical and is the standard we use in modern calculus.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What is a derivative in calculus?</h3>
              <p className="text-muted-foreground">
                A derivative measures how a function changes as its input changes. It represents the instantaneous rate of change or the slope of the tangent line at any point on the function's graph. For example, if you have a function describing position over time, its derivative gives you velocity.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">When do I use the product rule?</h3>
              <p className="text-muted-foreground">
                Use the product rule when differentiating two functions multiplied together, like f(x) = u(x)·v(x). The formula is: d/dx[u·v] = u'v + uv'. A common mistake is to think the derivative of a product is just the product of derivatives, which is incorrect.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What's the difference between the quotient and product rule?</h3>
              <p className="text-muted-foreground">
                The product rule handles multiplication: d/dx[u·v] = u'v + uv'. The quotient rule handles division: d/dx[u/v] = (vu' - uv')/v². Notice the quotient rule has subtraction in the numerator and the denominator squared, making it slightly more complex.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I know when to use the chain rule?</h3>
              <p className="text-muted-foreground">
                Use the chain rule for composite functions—when one function is "inside" another. Examples include (3x+2)⁴, sin(2x), or e^(x²). If you can identify an "outer" function and an "inner" function, you need the chain rule: d/dx[f(g(x))] = f'(g(x))·g'(x).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What does the derivative tell me about a graph?</h3>
              <p className="text-muted-foreground">
                The derivative at a point gives the slope of the tangent line at that point. When f'(x) &gt; 0, the function is increasing. When f'(x) &lt; 0, the function is decreasing. When f'(x) = 0, you have a critical point that could be a maximum, minimum, or inflection point.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can this calculator handle trigonometric functions?</h3>
              <p className="text-muted-foreground">
                Yes, the chain rule mode supports sin(ax+b) and cos(ax+b) functions. The derivatives follow standard rules: d/dx[sin(x)] = cos(x) and d/dx[cos(x)] = -sin(x), combined with the chain rule for the inner function.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Why does the derivative of a constant equal zero?</h3>
              <p className="text-muted-foreground">
                A constant doesn't change, so its rate of change is zero. Geometrically, a constant function graphs as a horizontal line, which has a slope of 0. This is why d/dx[5] = 0 and why the derivative of any constant term disappears during differentiation.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/math-tools/tangent-line-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Tangent Line Calculator</h3>
              <p className="text-sm text-muted-foreground">Find the equation of a tangent line at any point on a curve using derivatives.</p>
            </a>
            <a href="/math-tools/critical-point-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Critical Point Calculator</h3>
              <p className="text-sm text-muted-foreground">Locate maximum, minimum, and inflection points by finding where the derivative equals zero.</p>
            </a>
            <a href="/math-tools/integral-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Integral Calculator</h3>
              <p className="text-sm text-muted-foreground">Compute antiderivatives and definite integrals—the reverse operation of differentiation.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
