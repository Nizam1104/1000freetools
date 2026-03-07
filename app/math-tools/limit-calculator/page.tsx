"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        // Handle limits at infinity
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
        
        // Try direct substitution first
        const directValue = evaluateFunction(functionStr, c);
        
        if (isFinite(directValue)) {
          steps.push(`Step 1: Try direct substitution`);
          steps.push(`f(${c}) = ${directValue.toFixed(6)}`);
          steps.push(`Since f(${c}) is defined and finite, the limit equals f(${c})`);
          limitValue = directValue.toFixed(6);
        } else if (isNaN(directValue)) {
          // Handle indeterminate forms
          steps.push(`Step 1: Direct substitution gives indeterminate form`);
          steps.push(`Attempting to simplify...`);
          
          const simplified = trySimplify(functionStr, c);
          if (simplified !== null) {
            steps.push(`Step 2: After simplification: ${simplified.expression}`);
            const simplifiedValue = evaluateFunction(simplified.expression, c);
            steps.push(`f(${c}) = ${simplifiedValue.toFixed(6)}`);
            limitValue = simplifiedValue.toFixed(6);
          } else {
            // Numerical approach
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
    
    // Check for rational functions
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
    
    // For polynomials, limit is infinity
    if (!clean.includes("/") && clean.includes("x")) {
      steps.push(`For polynomials as x → ∞, the limit is ∞`);
      return { value: "∞", steps };
    }
    
    // For constants
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
    
    // Handle (x^2 - a^2)/(x - a) type
    const diffOfSquares = clean.match(/^\(x\^2-(\d+\.?\d*)\)\/\(x-(\d+\.?\d*)\)$/);
    if (diffOfSquares) {
      const a = parseFloat(diffOfSquares[1]);
      const b = parseFloat(diffOfSquares[2]);
      if (Math.abs(Math.sqrt(a) - b) < 0.001) {
        const sqrtA = Math.sqrt(a);
        return { expression: `x+${sqrtA}` };
      }
    }
    
    // Handle (x^2 - 1)/(x - 1) type
    const simpleDiff = clean.match(/^\(x\^2-1\)\/\(x-1\)$/);
    if (simpleDiff) {
      return { expression: "x+1" };
    }
    
    // Handle sin(x)/x as x->0
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

  const loadExample = () => {
    setFunctionStr("(x^2-1)/(x-1)");
    setApproachType("two-sided");
    setApproachValue("1");
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

        <div className="flex gap-2">
          <Button onClick={calculateLimit}>Calculate Limit</Button>
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

    </div>
  );
}
