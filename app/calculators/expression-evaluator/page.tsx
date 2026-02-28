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
        <CardHeader>
          <CardTitle>Expression Evaluator</CardTitle>
          <CardDescription>Evaluate mathematical expressions</CardDescription>
        </CardHeader>
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
    </div>
  );
}
