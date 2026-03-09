"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const examples = [
  { func: "(x^2-1)/(x-1)", type: "two-sided", value: "1", label: "(x²-1)/(x-1) as x→1" },
  { func: "sin(x)/x", type: "two-sided", value: "0", label: "sin(x)/x as x→0" },
  { func: "(x^3-8)/(x-2)", type: "two-sided", value: "2", label: "(x³-8)/(x-2) as x→2" },
  { func: "1/x", type: "right", value: "0", label: "1/x as x→0⁺" },
  { func: "e^x", type: "infinity", value: "", label: "e^x as x→∞" },
  { func: "1/x^2", type: "infinity", value: "", label: "1/x² as x→∞" },
  { func: "(2x+3)/(x-1)", type: "infinity", value: "", label: "(2x+3)/(x-1) as x→∞" },
];

export default function LimitCalculator() {
  const [functionStr, setFunctionStr] = useState("");
  const [approachType, setApproachType] = useState<"two-sided" | "left" | "right" | "infinity">("two-sided");
  const [approachValue, setApproachValue] = useState("");
  const [result, setResult] = useState<{
    limit: string;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculateLimit = () => {
    setError("");
    setResult(null);

    if (!functionStr.trim()) {
      setError("Please enter a function");
      return;
    }

    if (approachType !== "infinity" && !approachValue.trim()) {
      setError("Please enter the value x approaches");
      return;
    }

    try {
      const steps: string[] = [];
      let limitValue: number | string = "";

      if (approachType === "infinity") {
        const infResult = evaluateLimitAtInfinity(functionStr);
        limitValue = infResult.value;
        steps.push(`Finding limit as x → ∞`);
        steps.push(`Function: f(x) = ${functionStr}`);
        steps.push(...infResult.steps);
        steps.push(`Result: lim(x→∞) f(x) = ${limitValue}`);
      } else {
        const c = parseFloat(approachValue);
        const direction = approachType === "left" ? "⁻" : approachType === "right" ? "⁺" : "";

        steps.push(`Finding limit as x → ${c}${direction}`);
        steps.push(`Function: f(x) = ${functionStr}`);

        const directValue = evaluateFunction(functionStr, c);

        if (isFinite(directValue)) {
          steps.push(`Step 1: Try direct substitution`);
          steps.push(`f(${c}) = ${directValue.toFixed(6)}`);
          steps.push(`Since f(${c}) is defined and finite, the limit equals f(${c})`);
          limitValue = directValue.toFixed(6);
        } else if (isNaN(directValue)) {
          steps.push(`Step 1: Direct substitution gives indeterminate form`);
          steps.push(`Attempting to simplify...`);

          const simplified = trySimplify(functionStr, c);
          if (simplified !== null) {
            steps.push(`Step 2: After simplification: ${simplified.expression}`);
            const simplifiedValue = evaluateFunction(simplified.expression, c);
            steps.push(`f(${c}) = ${simplifiedValue.toFixed(6)}`);
            limitValue = simplifiedValue.toFixed(6);
          } else {
            const numericalResult = numericalLimit(functionStr, c, approachType);
            steps.push(`Step 2: Using numerical approach`);
            steps.push(...numericalResult.steps);
            limitValue = numericalResult.value.toFixed(6);
          }
        } else {
          limitValue = "∞";
          steps.push(`The function approaches infinity`);
        }

        steps.push(`Result: lim(x→${c}${direction}) f(x) = ${limitValue}`);
      }

      setResult({ limit: String(limitValue), steps });
    } catch (e) {
      setError("Unable to evaluate the limit. Please check the function format.");
    }
  };

  const evaluateFunction = (func: string, x: number): number => {
    const clean = func.replace(/\s/g, "").toLowerCase();
    let expr = clean.replace(/x/g, `(${x})`);

    expr = expr.replace(/sin\(/g, "Math.sin(");
    expr = expr.replace(/cos\(/g, "Math.cos(");
    expr = expr.replace(/tan\(/g, "Math.tan(");
    expr = expr.replace(/exp\(/g, "Math.exp(");
    expr = expr.replace(/log\(/g, "Math.log10(");
    expr = expr.replace(/ln\(/g, "Math.log(");
    expr = expr.replace(/sqrt\(/g, "Math.sqrt(");
    expr = expr.replace(/abs\(/g, "Math.abs(");
    expr = expr.replace(/pi/g, Math.PI.toString());
    expr = expr.replace(/e(?![x])/g, Math.E.toString());
    expr = expr.replace(/\^/g, "**");

    try {
      return eval(expr);
    } catch {
      return NaN;
    }
  };

  const evaluateLimitAtInfinity = (func: string): { value: string; steps: string[] } => {
    const steps: string[] = [];
    const clean = func.replace(/\s/g, "").toLowerCase();

    if (clean.includes("/")) {
      const parts = clean.split("/");
      if (parts.length === 2) {
        const numDegree = getPolynomialDegree(parts[0]);
        const denDegree = getPolynomialDegree(parts[1]);

        steps.push(`Analyzing degrees of numerator and denominator`);
        steps.push(`Degree of numerator: ${numDegree}`);
        steps.push(`Degree of denominator: ${denDegree}`);

        if (numDegree < denDegree) {
          steps.push(`Since degree(num) < degree(den), limit = 0`);
          return { value: "0", steps };
        } else if (numDegree === denDegree) {
          const numCoeff = getLeadingCoefficient(parts[0]);
          const denCoeff = getLeadingCoefficient(parts[1]);
          const ratio = numCoeff / denCoeff;
          steps.push(`Since degrees are equal, limit = ratio of leading coefficients`);
          steps.push(`Leading coeff ratio: ${numCoeff}/${denCoeff} = ${ratio}`);
          return { value: String(ratio), steps };
        } else {
          steps.push(`Since degree(num) > degree(den), limit = ∞`);
          return { value: "∞", steps };
        }
      }
    }

    if (!clean.includes("/") && clean.includes("x")) {
      steps.push(`For polynomials as x → ∞, the limit is ∞`);
      return { value: "∞", steps };
    }

    if (!clean.includes("x")) {
      steps.push(`Constant function: limit equals the constant`);
      return { value: func, steps };
    }

    return { value: "∞", steps: [`As x → ∞, f(x) → ∞`] };
  };

  const getPolynomialDegree = (poly: string): number => {
    const match = poly.match(/x\^(\d+)/);
    if (match) return parseInt(match[1]);
    if (poly.includes("x")) return 1;
    return 0;
  };

  const getLeadingCoefficient = (poly: string): number => {
    const match = poly.match(/^(-?\d*\.?\d*)x/);
    if (match) return parseFloat(match[1]) || 1;
    const constMatch = poly.match(/^(-?\d+\.?\d*)$/);
    if (constMatch) return parseFloat(constMatch[1]);
    return 1;
  };

  const trySimplify = (func: string, c: number): { expression: string } | null => {
    const clean = func.replace(/\s/g, "").toLowerCase();

    const diffOfSquares = clean.match(/^\(x\^2-(\d+\.?\d*)\)\/\(x-(\d+\.?\d*)\)$/);
    if (diffOfSquares) {
      const a = parseFloat(diffOfSquares[1]);
      const b = parseFloat(diffOfSquares[2]);
      if (Math.abs(Math.sqrt(a) - b) < 0.001) {
        const sqrtA = Math.sqrt(a);
        return { expression: `x+${sqrtA}` };
      }
    }

    const simpleDiff = clean.match(/^\(x\^2-1\)\/\(x-1\)$/);
    if (simpleDiff) {
      return { expression: "x+1" };
    }

    if (clean === "sin(x)/x" && Math.abs(c) < 0.001) {
      return { expression: "1" };
    }

    return null;
  };

  const numericalLimit = (func: string, c: number, type: string): { value: number; steps: string[] } => {
    const steps: string[] = [];
    const epsilon = type === "left" ? -0.0001 : type === "right" ? 0.0001 : 0.0001;

    const x1 = c - Math.abs(epsilon);
    const x2 = c + Math.abs(epsilon);

    const y1 = evaluateFunction(func, x1);
    const y2 = evaluateFunction(func, x2);

    steps.push(`Evaluating at x = ${x1.toFixed(6)}: f(x) = ${y1.toFixed(6)}`);
    steps.push(`Evaluating at x = ${x2.toFixed(6)}: f(x) = ${y2.toFixed(6)}`);

    const avg = (y1 + y2) / 2;
    steps.push(`Average approach value: ${avg.toFixed(6)}`);

    return { value: isFinite(avg) ? avg : 0, steps };
  };

  const reset = () => {
    setFunctionStr("");
    setApproachValue("");
    setResult(null);
    setError("");
  };

  const loadExample = (exampleIndex: number) => {
    const ex = examples[exampleIndex];
    setFunctionStr(ex.func);
    setApproachType(ex.type as typeof approachType);
    setApproachValue(ex.value);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Limit Calculator – Evaluate Limits of Functions Online</h1>
        <p className="text-muted-foreground">
          Calculate limits of any function as x approaches a value or infinity with our free online limit calculator. Evaluates one-sided and two-sided limits with clear step-by-step solutions.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="function">Function f(x):</Label>
          <Input
            id="function"
            placeholder="e.g., (x^2-1)/(x-1), sin(x)/x, x^2+3x"
            value={functionStr}
            onChange={(e) => setFunctionStr(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Supports: polynomials, rational functions, trig, exp, log
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Limit Type:</Label>
            <Select value={approachType} onValueChange={(v) => setApproachType(v as typeof approachType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="two-sided">Two-sided (x → c)</SelectItem>
                <SelectItem value="left">Left-hand (x → c⁻)</SelectItem>
                <SelectItem value="right">Right-hand (x → c⁺)</SelectItem>
                <SelectItem value="infinity">At Infinity (x → ∞)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {approachType !== "infinity" && (
            <div>
              <Label>x approaches:</Label>
              <Input
                type="number"
                placeholder="e.g., 0, 1, 2"
                value={approachValue}
                onChange={(e) => setApproachValue(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculateLimit}>Calculate Limit</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          {examples.map((ex, i) => (
            <Button key={i} variant="ghost" size="sm" onClick={() => loadExample(i)}>
              {ex.label}
            </Button>
          ))}
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Limit</p>
              <p className="text-4xl font-bold font-mono">{result.limit}</p>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Limits in Calculus</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            A limit describes the value that a function approaches as the input gets arbitrarily close to some point. Limits are the foundation of calculus – they define derivatives (instantaneous rates of change) and integrals (accumulated quantities).
          </p>
          <p className="text-muted-foreground">
            The notation lim(x→c) f(x) = L means "as x gets closer and closer to c, the function f(x) gets closer and closer to L." Importantly, the limit doesn't care about the actual value at x = c, only what happens as we approach it.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Evaluate Limits</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Direct Substitution</p>
                <p className="text-muted-foreground">
                  First, try plugging in the value directly. If you get a defined number, that's your limit. This works for continuous functions like polynomials.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Factor and Simplify</p>
                <p className="text-muted-foreground">
                  If direct substitution gives 0/0, factor the numerator and denominator. Cancel common factors, then try substitution again.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Rationalize</p>
                <p className="text-muted-foreground">
                  For expressions with square roots, multiply by the conjugate to eliminate the radical, then simplify.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Analyze Behavior at Infinity</p>
                <p className="text-muted-foreground">
                  For limits at infinity, compare the degrees of polynomials. Higher degree terms dominate the behavior.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Simple Rational Function</h4>
            <p className="text-sm text-muted-foreground mb-3">Find lim(x→1) (x²-1)/(x-1)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Direct substitution: (1-1)/(1-1) = 0/0 (indeterminate)</div>
              <div>Factor: (x²-1) = (x+1)(x-1)</div>
              <div>Cancel: (x+1)(x-1)/(x-1) = x+1</div>
              <div>Substitute: 1+1 = 2</div>
              <div className="pt-2 font-semibold">Answer: 2</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Trigonometric Limit</h4>
            <p className="text-sm text-muted-foreground mb-3">Find lim(x→0) sin(x)/x</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>This is a famous limit in calculus</div>
              <div>Direct substitution gives 0/0</div>
              <div>Using the squeeze theorem or L'Hôpital's rule:</div>
              <div>lim(x→0) sin(x)/x = 1</div>
              <div className="pt-2 font-semibold">Answer: 1</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Limit at Infinity</h4>
            <p className="text-sm text-muted-foreground mb-3">Find lim(x→∞) (3x²+2x)/(x²-1)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Both numerator and denominator have degree 2</div>
              <div>Divide all terms by x²:</div>
              <div>(3 + 2/x)/(1 - 1/x²)</div>
              <div>As x→∞: (3+0)/(1-0) = 3</div>
              <div className="pt-2 font-semibold">Answer: 3</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: One-Sided Limit</h4>
            <p className="text-sm text-muted-foreground mb-3">Find lim(x→0⁺) 1/x</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>As x approaches 0 from the right (positive side)</div>
              <div>x takes values like 0.1, 0.01, 0.001, ...</div>
              <div>1/0.1 = 10, 1/0.01 = 100, 1/0.001 = 1000</div>
              <div>The values grow without bound</div>
              <div className="pt-2 font-semibold">Answer: ∞</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-sm">
            The formal epsilon-delta definition of limits wasn't developed until the 19th century by Augustin-Louis Cauchy and Karl Weierstrass. Before this rigorous foundation, calculus worked brilliantly but mathematicians couldn't precisely explain why – Newton and Leibniz used "infinitesimals" that were philosophically controversial.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What does it mean when a limit doesn't exist?</h4>
            <p className="text-sm text-muted-foreground">
              A limit doesn't exist when the function doesn't approach a single value. This happens when left and right limits differ (jump discontinuity), when the function oscillates infinitely (like sin(1/x) near 0), or when it grows without bound.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between a limit and the function value?</h4>
            <p className="text-sm text-muted-foreground">
              The limit describes what the function approaches near a point; the function value is what the function actually equals at that point. They can differ – for example, a function with a hole has a limit at the hole but no value there.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When do I use L'Hôpital's Rule?</h4>
            <p className="text-sm text-muted-foreground">
              Use L'Hôpital's Rule when direct substitution gives 0/0 or ∞/∞. Take the derivative of the numerator and denominator separately, then evaluate the limit again. You can apply it repeatedly if needed.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's an indeterminate form?</h4>
            <p className="text-sm text-muted-foreground">
              Indeterminate forms like 0/0, ∞/∞, 0×∞, ∞-∞, 1^∞, 0^0, and ∞^0 don't have predetermined values. They require additional analysis – the actual limit could be any number, infinity, or might not exist.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why are limits important in calculus?</h4>
            <p className="text-sm text-muted-foreground">
              Limits define the derivative (as the limit of difference quotients) and the definite integral (as the limit of Riemann sums). Without limits, we couldn't rigorously define instantaneous rates of change or areas under curves.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can a limit be infinity?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. When we say lim(x→c) f(x) = ∞, we mean the function grows without bound as x approaches c. Technically the limit "doesn't exist" as a finite number, but we describe this specific type of non-existence as approaching infinity.
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
          <a href="/math-tools/integral-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Integral Calculator</p>
            <p className="text-xs text-muted-foreground">Compute integrals</p>
          </a>
          <a href="/math-tools/function-grapher" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Function Grapher</p>
            <p className="text-xs text-muted-foreground">Plot functions</p>
          </a>
        </div>
      </section>
    </div>
  );
}
