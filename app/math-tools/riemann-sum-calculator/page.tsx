"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RiemannSumCalculator() {
  const [functionStr, setFunctionStr] = useState("");
  const [lowerBound, setLowerBound] = useState("0");
  const [upperBound, setUpperBound] = useState("1");
  const [intervals, setIntervals] = useState("4");
  const [method, setMethod] = useState<"left" | "right" | "midpoint" | "trapezoidal">("left");
  const [result, setResult] = useState<{
    sum: number;
    rectangles: { x: number; height: number; width: number }[];
    steps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculateRiemannSum = () => {
    setError("");
    setResult(null);

    if (!functionStr.trim()) {
      setError("Please enter a function");
      return;
    }

    const a = parseFloat(lowerBound);
    const b = parseFloat(upperBound);
    const n = parseInt(intervals);

    if (isNaN(a) || isNaN(b)) {
      setError("Please enter valid numbers for bounds");
      return;
    }

    if (isNaN(n) || n < 1) {
      setError("Please enter at least 1 interval");
      return;
    }

    try {
      const width = (b - a) / n;
      const rectangles: { x: number; height: number; width: number }[] = [];
      let sum = 0;
      const steps: string[] = [];

      steps.push(`Using ${method} Riemann Sum with n = ${n} intervals`);
      steps.push(`Interval: [${a}, ${b}]`);
      steps.push(`Width of each rectangle: Δx = (${b} - ${a}) / ${n} = ${width.toFixed(4)}`);
      steps.push(``);

      for (let i = 0; i < n; i++) {
        let xPoint: number;

        if (method === "left") {
          xPoint = a + i * width;
        } else if (method === "right") {
          xPoint = a + (i + 1) * width;
        } else if (method === "midpoint") {
          xPoint = a + (i + 0.5) * width;
        } else {
          xPoint = a + i * width;
        }

        const height = evaluateFunction(functionStr, xPoint);
        const area = height * width;
        sum += area;

        rectangles.push({ x: xPoint, height, width });

        if (method === "trapezoidal") {
          const x1 = a + i * width;
          const x2 = a + (i + 1) * width;
          const h1 = evaluateFunction(functionStr, x1);
          const h2 = evaluateFunction(functionStr, x2);
          const trapArea = (h1 + h2) / 2 * width;

          if (i < n - 1 || n <= 5) {
            steps.push(`Trapezoid ${i + 1}: x ∈ [${x1.toFixed(4)}, ${x2.toFixed(4)}]`);
            steps.push(`  f(${x1.toFixed(4)}) = ${h1.toFixed(4)}, f(${x2.toFixed(4)}) = ${h2.toFixed(4)}`);
            steps.push(`  Area = (${h1.toFixed(4)} + ${h2.toFixed(4)})/2 × ${width.toFixed(4)} = ${trapArea.toFixed(4)}`);
          }
        } else {
          if (n <= 10) {
            steps.push(`Rectangle ${i + 1}: x = ${xPoint.toFixed(4)}`);
            steps.push(`  f(${xPoint.toFixed(4)}) = ${height.toFixed(4)}`);
            steps.push(`  Area = ${height.toFixed(4)} × ${width.toFixed(4)} = ${area.toFixed(4)}`);
          }
        }
      }

      if (method === "trapezoidal") {
        sum = 0;
        for (let i = 0; i < n; i++) {
          const x1 = a + i * width;
          const x2 = a + (i + 1) * width;
          const h1 = evaluateFunction(functionStr, x1);
          const h2 = evaluateFunction(functionStr, x2);
          sum += (h1 + h2) / 2 * width;
        }
      }

      const roundedSum = Math.round(sum * 1000000) / 1000000;

      steps.push(``);
      steps.push(`Total ${method} Riemann Sum: ${roundedSum}`);

      setResult({
        sum: roundedSum,
        rectangles,
        steps
      });
    } catch (e) {
      setError("Unable to evaluate the function. Please check the format.");
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
      return 0;
    }
  };

  const reset = () => {
    setFunctionStr("");
    setLowerBound("0");
    setUpperBound("1");
    setIntervals("4");
    setMethod("left");
    setResult(null);
    setError("");
  };

  const loadExample = (func: string, a: string, b: string, n: string, m: typeof method) => {
    setFunctionStr(func);
    setLowerBound(a);
    setUpperBound(b);
    setIntervals(n);
    setMethod(m);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Riemann Sum Calculator - Approximate Integral with Rectangles</h1>
        <p className="text-muted-foreground">
          Approximate integrals using Riemann sums with our free online Riemann sum calculator. Choose from left, right, midpoint, or trapezoidal methods with detailed step-by-step calculations.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="function">Function f(x):</Label>
            <Input
              id="function"
              placeholder="e.g., x^2, sin(x), x+1"
              value={functionStr}
              onChange={(e) => setFunctionStr(e.target.value)}
            />
          </div>
          <div>
            <Label>Method:</Label>
            <Select value={method} onValueChange={(v) => setMethod(v as typeof method)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left Riemann Sum</SelectItem>
                <SelectItem value="right">Right Riemann Sum</SelectItem>
                <SelectItem value="midpoint">Midpoint Rule</SelectItem>
                <SelectItem value="trapezoidal">Trapezoidal Rule</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Lower Bound (a):</Label>
            <Input
              type="number"
              placeholder="0"
              value={lowerBound}
              onChange={(e) => setLowerBound(e.target.value)}
            />
          </div>
          <div>
            <Label>Upper Bound (b):</Label>
            <Input
              type="number"
              placeholder="1"
              value={upperBound}
              onChange={(e) => setUpperBound(e.target.value)}
            />
          </div>
          <div>
            <Label>Number of Intervals (n):</Label>
            <Input
              type="number"
              placeholder="4"
              value={intervals}
              onChange={(e) => setIntervals(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculateRiemannSum}>Calculate Riemann Sum</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("x^2", "0", "1", "4", "left")}>x² on [0,1]</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("x^2", "0", "1", "4", "right")}>x² right sum</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("x^2", "0", "1", "4", "midpoint")}>x² midpoint</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("x^2", "0", "1", "4", "trapezoidal")}>x² trapezoidal</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("sin(x)", "0", "3.14159", "6", "left")}>sin(x) on [0,π]</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("sqrt(x)", "0", "4", "4", "left")}>√x on [0,4]</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1/x", "1", "2", "4", "trapezoidal")}>1/x on [1,2]</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">{method.charAt(0).toUpperCase() + method.slice(1)} Riemann Sum</p>
              <p className="text-4xl font-bold">Rₙ = {result.sum}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Approximation of ∫ f(x)dx from {lowerBound} to {upperBound}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Calculation</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded max-h-96 overflow-y-auto">
                {result.steps.map((step, i) => (
                  <div key={i} className={step === "" ? "h-4" : ""}>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {result.rectangles.length <= 10 && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-3">Rectangle Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {result.rectangles.map((rect, i) => (
                    <div key={i} className="p-2 bg-muted rounded text-center">
                      <p className="text-xs text-muted-foreground">Rect {i + 1}</p>
                      <p className="text-sm font-mono">h = {rect.height.toFixed(4)}</p>
                      <p className="text-xs text-muted-foreground">A = {(rect.height * rect.width).toFixed(4)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Riemann Sums</h2>
        <p className="text-muted-foreground">
          A Riemann sum approximates the area under a curve by dividing it into rectangles (or trapezoids) and adding up their areas. Named after German mathematician Bernhard Riemann, this method is the foundation of integral calculus.
        </p>
        <p className="text-muted-foreground">
          The more rectangles you use (larger n), the better the approximation. As n approaches infinity, the Riemann sum converges to the exact definite integral. This beautiful connection between sums and integrals is the Fundamental Theorem of Calculus.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Riemann Sum Methods</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Left Riemann Sum</h4>
            <p className="font-mono text-xs mb-2">Uses left endpoint of each subinterval</p>
            <p className="text-xs text-muted-foreground">For increasing functions, left sums underestimate. For decreasing functions, they overestimate.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Right Riemann Sum</h4>
            <p className="font-mono text-xs mb-2">Uses right endpoint of each subinterval</p>
            <p className="text-xs text-muted-foreground">Opposite of left sum - overestimates for increasing functions, underestimates for decreasing.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Midpoint Rule</h4>
            <p className="font-mono text-xs mb-2">Uses midpoint of each subinterval</p>
            <p className="text-xs text-muted-foreground">Generally more accurate than left or right sums. Errors tend to cancel out.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Trapezoidal Rule</h4>
            <p className="font-mono text-xs mb-2">Uses trapezoids instead of rectangles</p>
            <p className="text-xs text-muted-foreground">Average of left and right sums. Often more accurate, especially for smooth curves.</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Left Riemann Sum for f(x) = x²</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Approximate ∫x²dx from 0 to 1 using 4 rectangles (left endpoints).
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Interval: [0, 1], n = 4</div>
              <div>Width: Δx = (1-0)/4 = 0.25</div>
              <div>Left endpoints: 0, 0.25, 0.5, 0.75</div>
              <div>Heights: f(0)=0, f(0.25)=0.0625, f(0.5)=0.25, f(0.75)=0.5625</div>
              <div>Areas: 0×0.25, 0.0625×0.25, 0.25×0.25, 0.5625×0.25</div>
              <div>Sum = 0 + 0.015625 + 0.0625 + 0.140625 = 0.21875</div>
              <div className="text-muted-foreground">Exact integral = 1/3 ≈ 0.333... Left sum underestimates</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Right Riemann Sum for f(x) = x²</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Same function, but using right endpoints.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Right endpoints: 0.25, 0.5, 0.75, 1</div>
              <div>Heights: f(0.25)=0.0625, f(0.5)=0.25, f(0.75)=0.5625, f(1)=1</div>
              <div>Sum = (0.0625 + 0.25 + 0.5625 + 1) × 0.25 = 0.46875</div>
              <div className="text-muted-foreground">Right sum overestimates (0.469 &gt; 0.333)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Trapezoidal Rule</h4>
            <p className="text-sm text-muted-foreground mb-2">
              The trapezoidal rule averages left and right sums.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Trapezoidal = (Left + Right) / 2</div>
              <div>Trapezoidal = (0.21875 + 0.46875) / 2 = 0.34375</div>
              <div className="text-green-600 font-semibold">Much closer to exact value of 0.333!</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Effect of More Intervals</h4>
            <p className="text-sm text-muted-foreground mb-2">
              What happens when we increase n for f(x) = x² on [0,1]?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>n = 4:  Left = 0.21875, Right = 0.46875</div>
              <div>n = 10: Left = 0.2850,  Right = 0.3850</div>
              <div>n = 100: Left = 0.3283, Right = 0.3383</div>
              <div>n = 1000: Left = 0.3328, Right = 0.3338</div>
              <div className="text-green-600 font-semibold">As n increases, both approach 1/3 ≈ 0.3333...</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            Bernhard Riemann (1826-1866) developed his theory of integration in his 1854 habilitation thesis. Tragically, he died of tuberculosis at age 39. Despite his short life, Riemann revolutionized mathematics - his name appears in the Riemann sum, Riemann integral, Riemann hypothesis (the most famous unsolved problem in mathematics), and Riemannian geometry (the foundation of Einstein's general relativity).
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Which Riemann sum method is most accurate?</h4>
            <p className="text-sm text-muted-foreground">
              For the same number of intervals, midpoint and trapezoidal rules are generally more accurate than left or right sums. Simpson's rule (not implemented here) is even more accurate but requires parabolic approximations instead of straight lines.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How many intervals should I use?</h4>
            <p className="text-sm text-muted-foreground">
              More intervals = better accuracy but more computation. For smooth functions, n=10 to n=100 often gives good results. For highly curved functions, you may need more. The error typically decreases proportionally to 1/n (or 1/n² for midpoint/trapezoidal).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When would left sum equal right sum?</h4>
            <p className="text-sm text-muted-foreground">
              Left and right sums are equal only when the function is constant (horizontal line). For any non-constant function, they'll differ. The difference between them equals (f(b) - f(a)) × Δx.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can Riemann sums handle negative function values?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! When f(x) is negative, the rectangle has "negative area" - it's below the x-axis. The Riemann sum calculates the net signed area: area above the axis minus area below the axis.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the relationship between Riemann sums and definite integrals?</h4>
            <p className="text-sm text-muted-foreground">
              The definite integral IS the limit of Riemann sums as n→∞. Formally: ∫[a,b] f(x)dx = lim(n→∞) Σf(xᵢ*)Δx. Riemann sums are how we define and compute integrals.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Where are Riemann sums used in real applications?</h4>
            <p className="text-sm text-muted-foreground">
              Anywhere you need to find area, volume, or accumulated quantities: physics (work, displacement), engineering (stress analysis), economics (consumer surplus), probability (continuous distributions), and computer graphics (rendering).
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
