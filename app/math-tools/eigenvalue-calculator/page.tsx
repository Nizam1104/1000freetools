"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EigenvalueCalculator() {
  const [mode, setMode] = useState<"2x2" | "3x3">("2x2");
  const [matrix2x2, setMatrix2x2] = useState([["1", "2"], ["3", "4"]]);
  const [matrix3x3, setMatrix3x3] = useState([["1", "0", "0"], ["0", "2", "0"], ["0", "0", "3"]]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const updateMatrix2x2 = (row: number, col: number, value: string) => {
    const newMatrix = matrix2x2.map((r, ri) => r.map((c, ci) => (ri === row && ci === col ? value : c)));
    setMatrix2x2(newMatrix);
    setResult(null);
  };

  const updateMatrix3x3 = (row: number, col: number, value: string) => {
    const newMatrix = matrix3x3.map((r, ri) => r.map((c, ci) => (ri === row && ci === col ? value : c)));
    setMatrix3x3(newMatrix);
    setResult(null);
  };

  const calculateEigenvalues2x2 = () => {
    const a = parseFloat(matrix2x2[0][0]);
    const b = parseFloat(matrix2x2[0][1]);
    const c = parseFloat(matrix2x2[1][0]);
    const d = parseFloat(matrix2x2[1][1]);

    if ([a, b, c, d].some(isNaN)) {
      setError("Please enter all matrix values");
      return;
    }

    // Characteristic equation: λ² - (a+d)λ + (ad-bc) = 0
    const trace = a + d;
    const det = a * d - b * c;

    // Quadratic formula: λ = (trace ± √(trace² - 4*det)) / 2
    const discriminant = trace * trace - 4 * det;

    let eigenvalues: { real: number; imag: number; display: string }[];
    let steps: string[];

    if (discriminant >= 0) {
      const lambda1 = (trace + Math.sqrt(discriminant)) / 2;
      const lambda2 = (trace - Math.sqrt(discriminant)) / 2;
      eigenvalues = [
        { real: lambda1, imag: 0, display: lambda1.toFixed(4) },
        { real: lambda2, imag: 0, display: lambda2.toFixed(4) }
      ];
      steps = [
        `Matrix A = [[${a}, ${b}], [${c}, ${d}]]`,
        `Characteristic equation: det(A - λI) = 0`,
        `Trace(A) = a + d = ${a} + ${d} = ${trace}`,
        `det(A) = ad - bc = ${a}(${d}) - ${b}(${c}) = ${det}`,
        `Characteristic polynomial: λ² - ${trace}λ + ${det} = 0`,
        `Discriminant: Δ = ${trace}² - 4(${det}) = ${discriminant}`,
        `λ₁ = (${trace} + √${discriminant}) / 2 = ${lambda1.toFixed(6)}`,
        `λ₂ = (${trace} - √${discriminant}) / 2 = ${lambda2.toFixed(6)}`
      ];
    } else {
      const realPart = trace / 2;
      const imagPart = Math.sqrt(-discriminant) / 2;
      eigenvalues = [
        { real: realPart, imag: imagPart, display: `${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i` },
        { real: realPart, imag: -imagPart, display: `${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i` }
      ];
      steps = [
        `Matrix A = [[${a}, ${b}], [${c}, ${d}]]`,
        `Characteristic equation: det(A - λI) = 0`,
        `Trace(A) = ${trace}, det(A) = ${det}`,
        `Discriminant: Δ = ${discriminant} (negative)`,
        `Complex eigenvalues:`,
        `λ₁ = ${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i`,
        `λ₂ = ${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`
      ];
    }

    setResult({
      eigenvalues,
      steps,
      trace,
      determinant: det,
      size: "2×2"
    });
    setError("");
  };

  const calculateEigenvalues3x3 = () => {
    const m = matrix3x3.map(row => row.map(parseFloat));
    if (m.flat().some(isNaN)) {
      setError("Please enter all matrix values");
      return;
    }

    const [[a, b, c], [d, e, f], [g, h, i]] = m;

    // Characteristic polynomial coefficients for 3x3:
    // -λ³ + (a+e+i)λ² - (ae+ai+ei-bf-cg-dh)λ + det(A) = 0
    const trace = a + e + i;
    
    // Sum of 2x2 principal minors
    const minor1 = a * e - b * d;  // top-left 2x2
    const minor2 = a * i - c * g;  // corners 1,3
    const minor3 = e * i - f * h;  // bottom-right 2x2
    const sumMinors = minor1 + minor2 + minor3;

    // Determinant using rule of Sarrus
    const det = a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h;

    // Solve cubic equation: λ³ - trace*λ² + sumMinors*λ - det = 0
    // Using Cardano's formula or numerical methods
    const eigenvalues = solveCubic(1, -trace, sumMinors, -det);
    
    const formattedEigenvalues = eigenvalues.map(ev => ({
      real: ev.real,
      imag: ev.imag,
      display: ev.imag === 0 ? ev.real.toFixed(4) : `${ev.real.toFixed(4)} ${ev.imag >= 0 ? '+' : '-'} ${Math.abs(ev.imag).toFixed(4)}i`
    }));

    const steps = [
      `Matrix A = 3×3 matrix`,
      `Trace(A) = ${trace.toFixed(6)}`,
      `Sum of 2×2 principal minors = ${sumMinors.toFixed(6)}`,
      `det(A) = ${det.toFixed(6)}`,
      `Characteristic polynomial: λ³ - ${trace.toFixed(4)}λ² + ${sumMinors.toFixed(4)}λ - ${det.toFixed(4)} = 0`,
      `Solving cubic equation...`,
      `Eigenvalues: λ₁ = ${formattedEigenvalues[0]?.display}, λ₂ = ${formattedEigenvalues[1]?.display}, λ₃ = ${formattedEigenvalues[2]?.display}`
    ];

    setResult({
      eigenvalues: formattedEigenvalues,
      steps,
      trace,
      determinant: det,
      size: "3×3"
    });
    setError("");
  };

  const solveCubic = (a: number, b: number, c: number, d: number): { real: number; imag: number }[] => {
    // Normalize: x³ + (b/a)x² + (c/a)x + (d/a) = 0
    const p = c / a - (b * b) / (3 * a * a);
    const q = (2 * b * b * b) / (27 * a * a * a) - (b * c) / (3 * a * a) + d / a;

    const discriminant = (q * q) / 4 + (p * p * p) / 27;

    if (discriminant > 0) {
      // One real root, two complex conjugate
      const sqrtDisc = Math.sqrt(discriminant);
      const u = Math.cbrt(-q / 2 + sqrtDisc);
      const v = Math.cbrt(-q / 2 - sqrtDisc);
      const realRoot = u + v - b / (3 * a);
      
      const complexReal = -(u + v) / 2 - b / (3 * a);
      const complexImag = (u - v) * Math.sqrt(3) / 2;

      return [
        { real: realRoot, imag: 0 },
        { real: complexReal, imag: complexImag },
        { real: complexReal, imag: -complexImag }
      ];
    } else if (discriminant < 0) {
      // Three distinct real roots (casus irreducibilis)
      const r = Math.sqrt(-p * p * p / 27);
      const theta = Math.acos(-q / (2 * r));
      const cubeRootR = Math.cbrt(r);

      return [
        { real: 2 * cubeRootR * Math.cos(theta / 3) - b / (3 * a), imag: 0 },
        { real: 2 * cubeRootR * Math.cos((theta + 2 * Math.PI) / 3) - b / (3 * a), imag: 0 },
        { real: 2 * cubeRootR * Math.cos((theta + 4 * Math.PI) / 3) - b / (3 * a), imag: 0 }
      ];
    } else {
      // Multiple roots
      if (p === 0 && q === 0) {
        return [{ real: -b / (3 * a), imag: 0 }, { real: -b / (3 * a), imag: 0 }, { real: -b / (3 * a), imag: 0 }];
      }
      const u = Math.cbrt(-q / 2);
      return [
        { real: 2 * u - b / (3 * a), imag: 0 },
        { real: -u - b / (3 * a), imag: 0 },
        { real: -u - b / (3 * a), imag: 0 }
      ];
    }
  };

  const calculate = () => {
    if (mode === "2x2") {
      calculateEigenvalues2x2();
    } else {
      calculateEigenvalues3x3();
    }
  };

  const reset = () => {
    if (mode === "2x2") {
      setMatrix2x2([["1", "2"], ["3", "4"]]);
    } else {
      setMatrix3x3([["1", "0", "0"], ["0", "2", "0"], ["0", "0", "3"]]);
    }
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Eigenvalue Calculator – Find Eigenvalues of Matrices</h1>
        <p className="text-muted-foreground">
          Calculate eigenvalues of 2×2 and 3×3 matrices with our free online eigenvalue calculator. Get step-by-step solutions using characteristic polynomials.
        </p>
      </div>

      <div className="space-y-4">
        <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
          <TabsList>
            <TabsTrigger value="2x2">2×2 Matrix</TabsTrigger>
            <TabsTrigger value="3x3">3×3 Matrix</TabsTrigger>
          </TabsList>

          <TabsContent value="2x2" className="space-y-4 mt-4">
            <div className="flex justify-center items-center gap-2">
              <span className="text-2xl">[</span>
              <div className="grid grid-cols-2 gap-2">
                {matrix2x2.map((row, ri) => (
                  row.map((cell, ci) => (
                    <Input
                      key={`${ri}-${ci}`}
                      type="number"
                      value={cell}
                      onChange={(e) => updateMatrix2x2(ri, ci, e.target.value)}
                      className="w-20 text-center"
                    />
                  ))
                ))}
              </div>
              <span className="text-2xl">]</span>
            </div>
          </TabsContent>

          <TabsContent value="3x3" className="space-y-4 mt-4">
            <div className="flex justify-center items-center gap-2">
              <span className="text-2xl">[</span>
              <div className="grid grid-cols-3 gap-2">
                {matrix3x3.map((row, ri) => (
                  row.map((cell, ci) => (
                    <Input
                      key={`${ri}-${ci}`}
                      type="number"
                      value={cell}
                      onChange={(e) => updateMatrix3x3(ri, ci, e.target.value)}
                      className="w-16 text-center"
                    />
                  ))
                ))}
              </div>
              <span className="text-2xl">]</span>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Eigenvalues</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-4 text-center">{result.size} Matrix Eigenvalues</h4>
              <div className="flex flex-wrap justify-center gap-4">
                {result.eigenvalues.map((ev: any, i: number) => (
                  <div key={i} className="p-4 bg-background rounded-lg text-center border">
                    <p className="text-sm text-muted-foreground mb-1">λ<sub>{i + 1}</sub></p>
                    <p className="text-xl font-bold font-mono">{ev.display}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Trace</p>
                <p className="text-xl font-semibold">{result.trace.toFixed(4)}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Determinant</p>
                <p className="text-xl font-semibold">{result.determinant.toFixed(4)}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                {result.steps.map((step: string, i: number) => (
                  <div key={i}>{step}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Eigenvalues</h2>
        <p className="text-muted-foreground">
          Eigenvalues are special numbers associated with square matrices. For a matrix A, an eigenvalue λ and its eigenvector v satisfy: Av = λv. This means the matrix transformation scales the eigenvector by λ without changing its direction.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Finding Eigenvalues</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Solve the characteristic equation: det(A - λI) = 0
            </p>
            <code className="text-xs font-mono bg-background px-2 py-1 rounded block">
              For 2×2: λ² - trace(A)λ + det(A) = 0
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Key Properties</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>Sum of eigenvalues = trace of matrix</li>
              <li>Product of eigenvalues = determinant</li>
              <li>Real symmetric matrices have real eigenvalues</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What are eigenvalues?</h3>
          <p className="text-sm text-muted-foreground">
            Eigenvalues are scalars that represent how much an eigenvector is stretched or compressed during a linear transformation. They reveal fundamental properties of the matrix.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What are eigenvalues used for?</h3>
          <p className="text-sm text-muted-foreground">
            Eigenvalues are used in physics (quantum mechanics, vibrations), engineering (stability analysis), computer science (PageRank, PCA), and many other fields.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can eigenvalues be complex?</h3>
          <p className="text-sm text-muted-foreground">
            Yes! When the characteristic polynomial has no real roots, eigenvalues are complex conjugates. This often indicates rotational behavior in the transformation.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is the characteristic polynomial?</h3>
          <p className="text-sm text-muted-foreground">
            It's det(A - λI) = 0, a polynomial in λ whose roots are the eigenvalues. For a 2×2 matrix, it's quadratic; for 3×3, it's cubic.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's the relationship between trace and eigenvalues?</h3>
          <p className="text-sm text-muted-foreground">
            The trace (sum of diagonal elements) equals the sum of all eigenvalues. The determinant equals the product of all eigenvalues.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/matrix-determinant-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Determinant Calculator</p>
            <p className="text-xs text-muted-foreground">Find det(A)</p>
          </a>
          <a href="/math-tools/matrix-inverse-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Inverse</p>
            <p className="text-xs text-muted-foreground">Find A⁻¹</p>
          </a>
          <a href="/math-tools/matrix-trace-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Trace</p>
            <p className="text-xs text-muted-foreground">Calculate trace</p>
          </a>
        </div>
      </section>
    </div>
  );
}
