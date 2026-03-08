"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Coefficient {
  id: number;
  power: number;
  value: string;
}

export default function PolynomialEvaluator() {
  const [coefficients, setCoefficients] = useState<Coefficient[]>([
    { id: 1, power: 2, value: "" },
    { id: 2, power: 1, value: "" },
    { id: 3, power: 0, value: "" },
  ]);
  const [xValue, setXValue] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const addCoefficient = () => {
    const maxPower = Math.max(...coefficients.map((c) => c.power));
    setCoefficients([
      ...coefficients,
      { id: Date.now(), power: maxPower + 1, value: "" },
    ]);
  };

  const removeCoefficient = (id: number) => {
    if (coefficients.length > 2) {
      setCoefficients(coefficients.filter((c) => c.id !== id));
    }
  };

  const updateCoefficient = (id: number, value: string) => {
    setCoefficients(
      coefficients.map((c) => (c.id === id ? { ...c, value } : c))
    );
  };

  const evaluate = () => {
    const x = parseFloat(xValue);
    if (isNaN(x)) {
      setResult(null);
      setSteps([]);
      return;
    }

    const sortedCoeffs = [...coefficients].sort((a, b) => b.power - a.power);
    let total = 0;
    const calculationSteps: string[] = [];
    const terms: string[] = [];

    sortedCoeffs.forEach((coeff) => {
      const coefVal = parseFloat(coeff.value) || 0;
      const termValue = coefVal * Math.pow(x, coeff.power);
      total += termValue;

      if (coeff.power === 0) {
        terms.push(`${coefVal}`);
        calculationSteps.push(`${coefVal} × ${x}⁰ = ${coefVal} × 1 = ${termValue}`);
      } else if (coeff.power === 1) {
        terms.push(`${coefVal}x`);
        calculationSteps.push(`${coefVal} × ${x}¹ = ${coefVal} × ${x} = ${termValue}`);
      } else {
        terms.push(`${coefVal}x^${coeff.power}`);
        calculationSteps.push(
          `${coefVal} × ${x}^${coeff.power} = ${coefVal} × ${Math.pow(x, coeff.power)} = ${termValue}`
        );
      }
    });

    calculationSteps.push(`Total: ${terms.join(" + ")} = ${total}`);

    setResult(total);
    setSteps(calculationSteps);
  };

  const reset = () => {
    setCoefficients([
      { id: 1, power: 2, value: "" },
      { id: 2, power: 1, value: "" },
      { id: 3, power: 0, value: "" },
    ]);
    setXValue("");
    setResult(null);
    setSteps([]);
  };

  const sortedCoefficients = [...coefficients].sort((a, b) => b.power - a.power);
  const polynomialExpression = sortedCoefficients
    .map((c) => {
      const val = parseFloat(c.value) || 0;
      if (c.power === 0) return `${val}`;
      if (c.power === 1) return `${val}x`;
      return `${val}x^${c.power}`;
    })
    .join(" + ");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Polynomial Evaluator – Calculate Polynomial Value at Any x
          </h1>
          <p className="text-xl text-muted-foreground">
            Evaluate any polynomial expression at a given value of x with our free online polynomial evaluator. Supports polynomials of any degree with instant accurate results.
          </p>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium mb-2">Polynomial Expression:</p>
              <p className="text-lg font-mono">{polynomialExpression || "Enter coefficients"}</p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Value of x</label>
              <Input
                type="number"
                placeholder="Enter x value (e.g., 2)"
                step="any"
                value={xValue}
                onChange={(e) => setXValue(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Coefficients</label>
                <Button variant="outline" size="sm" onClick={addCoefficient}>
                  Add Term
                </Button>
              </div>
              {sortedCoefficients.map((coeff) => (
                <div key={coeff.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="number"
                      placeholder="0"
                      step="any"
                      value={coeff.value}
                      onChange={(e) => updateCoefficient(coeff.id, e.target.value)}
                      className="w-32"
                    />
                    {coeff.power === 0 ? (
                      <span className="text-muted-foreground">(constant)</span>
                    ) : coeff.power === 1 ? (
                      <span className="text-muted-foreground">· x</span>
                    ) : (
                      <span className="text-muted-foreground">· x^{coeff.power}</span>
                    )}
                  </div>
                  {coefficients.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCoefficient(coeff.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={evaluate}>Evaluate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result !== null && (
              <div className="p-4 bg-muted rounded-md mt-4">
                <p className="text-sm text-muted-foreground mb-2">Result</p>
                <p className="text-2xl font-semibold">
                  P({xValue}) = {result}
                </p>
              </div>
            )}

            {steps.length > 0 && (
              <div className="p-4 bg-muted rounded-md mt-4">
                <p className="text-sm font-medium mb-3">Step-by-Step Calculation</p>
                <ol className="space-y-2 text-sm">
                  {steps.map((step, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-muted-foreground">{index + 1}.</span>
                      <span className="font-mono">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
