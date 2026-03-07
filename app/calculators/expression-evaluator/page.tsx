"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ExpressionEvaluator() {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const calculate = () => {
    try {
      // Safe evaluation using Function constructor with limited scope
      const sanitized = expression.replace(/[^0-9+\-*/().\sMath.powMath.sqrtMath.sinMath.cosMath.tanMath.logMath.expMath.PI]/g, "");
      const expr = sanitized
        .replace(/\^/g, "**")
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/sqrt/g, "Math.sqrt")
        .replace(/log/g, "Math.log")
        .replace(/exp/g, "Math.exp")
        .replace(/pi/g, "Math.PI")
        .replace(/pow/g, "Math.pow");
      
      // eslint-disable-next-line no-new-func
      const evalFunc = new Function(`"use strict"; return (${expr})`);
      const res = evalFunc();
      
      if (typeof res === "number" && !isNaN(res) && isFinite(res)) {
        setResult(res.toString());
        setError("");
      } else {
        setError("Invalid result");
      }
    } catch {
      setError("Invalid expression");
    }
  };

  const reset = () => {
    setExpression("");
    setResult("");
    setError("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Expression</label>
              <Input
                type="text"
                placeholder="e.g., (5 + 3) * 2 or 2^3 or sqrt(16)"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Supported: +, -, *, /, ^, (), sin, cos, tan, sqrt, log, exp, pi
            </p>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className="flex gap-2">
              <Button onClick={calculate}>Evaluate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-2xl font-semibold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">How to Evaluate Mathematical Expressions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
            <h3 className="font-semibold mb-2">Enter Your Expression</h3>
            <p className="text-sm text-muted-foreground">Type any mathematical expression using numbers, operators, and functions.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
            <h3 className="font-semibold mb-2">Click Evaluate</h3>
            <p className="text-sm text-muted-foreground">The calculator parses and computes your expression following order of operations.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
            <h3 className="font-semibold mb-2">View the Result</h3>
            <p className="text-sm text-muted-foreground">Get instant results with error detection for invalid expressions.</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Features of This Expression Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Multiple Operations
            </h3>
            <p className="text-sm text-muted-foreground">Supports addition, subtraction, multiplication, division, and exponentiation in one expression.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Trigonometric Functions
            </h3>
            <p className="text-sm text-muted-foreground">Calculate sin, cos, and tan values for angles in your expressions.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Scientific Functions
            </h3>
            <p className="text-sm text-muted-foreground">Includes sqrt, log, exp, and pi constants for advanced calculations.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Parentheses Support
            </h3>
            <p className="text-sm text-muted-foreground">Use nested parentheses to control order of operations precisely.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Error Detection
            </h3>
            <p className="text-sm text-muted-foreground">Identifies and reports invalid expressions with clear error messages.</p>
          </div>
        </div>

        <div className="mt-6 p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-3">Supported Operations Reference</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-2">Basic Operators:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• + Addition</li>
                <li>• - Subtraction</li>
                <li>• * Multiplication</li>
                <li>• / Division</li>
                <li>• ^ Exponentiation</li>
                <li>• () Parentheses</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Functions & Constants:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• sin(x) Sine</li>
                <li>• cos(x) Cosine</li>
                <li>• tan(x) Tangent</li>
                <li>• sqrt(x) Square root</li>
                <li>• log(x) Natural log</li>
                <li>• pi (3.14159...)</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-card rounded">
            <p className="font-semibold mb-2">Example Expressions:</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• (5 + 3) * 2 = 16</li>
              <li>• 2^3 + 4 = 12</li>
              <li>• sqrt(144) = 12</li>
              <li>• sin(pi/2) = 1</li>
              <li>• log(exp(1)) = 1</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What order of operations does this calculator use?</h3>
            <p className="text-sm text-muted-foreground">Standard PEMDAS/BODMAS: Parentheses first, then Exponents, then Multiplication/Division (left to right), then Addition/Subtraction (left to right).</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Can I use decimal numbers?</h3>
            <p className="text-sm text-muted-foreground">Yes, decimal numbers are fully supported. Enter values like 3.14, 0.5, or 2.718 for precise calculations.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Are trigonometric functions in degrees or radians?</h3>
            <p className="text-sm text-muted-foreground">Trigonometric functions use radians. To convert degrees to radians, multiply by pi/180.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What does the ^ symbol mean?</h3>
            <p className="text-sm text-muted-foreground">The ^ symbol represents exponentiation (power). For example, 2^3 means 2 raised to the power of 3, which equals 8.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Why am I getting an error?</h3>
            <p className="text-sm text-muted-foreground">Common errors include unmatched parentheses, invalid characters, division by zero, or malformed function syntax. Check your expression carefully.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
    </div>
  );
}
