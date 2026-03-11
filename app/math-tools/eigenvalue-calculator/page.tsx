"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EigenvalueCalculator() {
  const [mode, setMode] = useState<"2x2" | "3x3">("2x2");
  const [matrix2x2, setMatrix2x2] = useState([["3", "1"], ["0", "2"]]);
  const [matrix3x3, setMatrix3x3] = useState([["4", "1", "1"], ["1", "4", "1"], ["1", "1", "4"]]);
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

    const trace = a + d;
    const det = a * d - b * c;
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
        `Discriminant: Δ = ${trace}² - 4(${det}) = ${discriminant.toFixed(4)}`,
        `λ₁ = (${trace} + √${discriminant.toFixed(4)}) / 2 = ${lambda1.toFixed(6)}`,
        `λ₂ = (${trace} - √${discriminant.toFixed(4)}) / 2 = ${lambda2.toFixed(6)}`
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
        `Discriminant: Δ = ${discriminant.toFixed(4)} (negative)`,
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

    const trace = a + e + i;

    const minor1 = a * e - b * d;
    const minor2 = a * i - c * g;
    const minor3 = e * i - f * h;
    const sumMinors = minor1 + minor2 + minor3;

    const det = a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h;

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
    const p = c / a - (b * b) / (3 * a * a);
    const q = (2 * b * b * b) / (27 * a * a * a) - (b * c) / (3 * a * a) + d / a;

    const discriminant = (q * q) / 4 + (p * p * p) / 27;

    if (discriminant > 0) {
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
      const r = Math.sqrt(-p * p * p / 27);
      const theta = Math.acos(-q / (2 * r));
      const cubeRootR = Math.cbrt(r);

      return [
        { real: 2 * cubeRootR * Math.cos(theta / 3) - b / (3 * a), imag: 0 },
        { real: 2 * cubeRootR * Math.cos((theta + 2 * Math.PI) / 3) - b / (3 * a), imag: 0 },
        { real: 2 * cubeRootR * Math.cos((theta + 4 * Math.PI) / 3) - b / (3 * a), imag: 0 }
      ];
    } else {
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
      setMatrix2x2([["3", "1"], ["0", "2"]]);
    } else {
      setMatrix3x3([["4", "1", "1"], ["1", "4", "1"], ["1", "1", "4"]]);
    }
    setResult(null);
    setError("");
  };

  const loadExample = (type: "2x2" | "3x3", matrix: string[][]) => {
    if (type === "2x2") {
      setMode("2x2");
      setMatrix2x2(matrix);
    } else {
      setMode("3x3");
      setMatrix3x3(matrix);
    }
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Eigenvalue Calculator – Find Eigenvalues of Matrices</h1>
        <p className="text-muted-foreground">
          Calculate eigenvalues of 2×2 and 3×3 matrices with our free online eigenvalue calculator. Get step-by-step solutions using characteristic polynomials with support for complex eigenvalues.
        </p>
      </div>

      <div className="space-y-4">
        <Tabs value={mode} onValueChange={(v) => { setMode(v as typeof mode); setResult(null); setError(""); }}>
          <TabsList>
            <TabsTrigger value="2x2">2×2 Matrix</TabsTrigger>
            <TabsTrigger value="3x3">3×3 Matrix</TabsTrigger>
          </TabsList>

          <TabsContent value="2x2" className="space-y-4 mt-4">
            <div className="flex justify-center items-center gap-2">
              <span className="text-4xl">[</span>
              <div className="grid grid-cols-2 gap-2">
                {matrix2x2.map((row, ri) => (
                  row.map((cell, ci) => (
                    <Input
                      key={`${ri}-${ci}`}
                      type="number"
                      step="any"
                      value={cell}
                      onChange={(e) => updateMatrix2x2(ri, ci, e.target.value)}
                      className="w-20 text-center"
                    />
                  ))
                ))}
              </div>
              <span className="text-4xl">]</span>
            </div>
          </TabsContent>

          <TabsContent value="3x3" className="space-y-4 mt-4">
            <div className="flex justify-center items-center gap-2">
              <span className="text-4xl">[</span>
              <div className="grid grid-cols-3 gap-2">
                {matrix3x3.map((row, ri) => (
                  row.map((cell, ci) => (
                    <Input
                      key={`${ri}-${ci}`}
                      type="number"
                      step="any"
                      value={cell}
                      onChange={(e) => updateMatrix3x3(ri, ci, e.target.value)}
                      className="w-16 text-center"
                    />
                  ))
                ))}
              </div>
              <span className="text-4xl">]</span>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate Eigenvalues</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="outline" size="sm" onClick={() => loadExample("2x2", [["3", "1"], ["0", "2"]])}>Triangular</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample("2x2", [["0", "-1"], ["1", "0"]])}>Rotation</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample("2x2", [["2", "1"], ["1", "2"]])}>Symmetric</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample("3x3", [["4", "1", "1"], ["1", "4", "1"], ["1", "1", "4"]])}>3×3 Symmetric</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample("3x3", [["1", "0", "0"], ["0", "2", "0"], ["0", "0", "3"]])}>3×3 Diagonal</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample("3x3", [["2", "-1", "0"], ["-1", "2", "-1"], ["0", "-1", "2"]])}>3×3 Tridiagonal</Button>
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
                    {ev.imag !== 0 && (
                      <p className="text-xs text-muted-foreground mt-1">Complex</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Trace</p>
                <p className="text-xl font-semibold">{result.trace.toFixed(4)}</p>
                <p className="text-xs text-muted-foreground">Sum of eigenvalues</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Determinant</p>
                <p className="text-xl font-semibold">{result.determinant.toFixed(4)}</p>
                <p className="text-xs text-muted-foreground">Product of eigenvalues</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded max-h-96 overflow-y-auto">
                {result.steps.map((step: string, i: number) => (
                  <div key={i}>{step}</div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 text-blue-700 dark:text-blue-400">Verification</h4>
              <p className="text-sm text-muted-foreground">
                The sum of eigenvalues equals the trace, and their product equals the determinant. This provides a check on the calculation.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Eigenvalues</h2>
        <p className="text-muted-foreground">
          Eigenvalues are fundamental to linear algebra and appear throughout science and engineering. When a matrix transforms a vector, most vectors change both direction and length. But certain special vectors – called eigenvectors – only get stretched or shrunk, never rotated. The factor by which they're stretched is the eigenvalue.
        </p>
        <p className="text-muted-foreground">
          Think of eigenvalues as the "natural frequencies" of a matrix transformation. They reveal the intrinsic behavior of the system the matrix represents. In physics, eigenvalues might represent energy levels. In data science, they show the importance of principal components. In engineering, they determine system stability.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How Eigenvalue Calculation Works</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Set up the characteristic equation</p>
                <p className="text-muted-foreground">
                  For eigenvalue λ: det(A - λI) = 0, where I is the identity matrix. This creates a polynomial equation.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">For 2×2 matrices: solve quadratic</p>
                <p className="text-muted-foreground">
                  The characteristic polynomial is λ² - trace(A)λ + det(A) = 0. Use the quadratic formula to find both eigenvalues.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">For 3×3 matrices: solve cubic</p>
                <p className="text-muted-foreground">
                  The characteristic polynomial is cubic: λ³ - trace(A)λ² + (sum of 2×2 minors)λ - det(A) = 0. Use Cardano's formula.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Handle complex eigenvalues</p>
                <p className="text-muted-foreground">
                  When the discriminant is negative, eigenvalues are complex conjugates. This happens with rotation matrices and some other transformations.
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
            <h4 className="font-semibold text-sm mb-3">Example 1: Upper Triangular 2×2</h4>
            <div className="text-sm space-y-2">
              <p>Matrix: [[3, 1], [0, 2]]</p>
              <p>Trace: 3 + 2 = 5</p>
              <p>Determinant: 3×2 - 1×0 = 6</p>
              <p>Characteristic: λ² - 5λ + 6 = 0</p>
              <p>Eigenvalues: λ₁ = 3, λ₂ = 2</p>
              <p className="text-muted-foreground">For triangular matrices, eigenvalues are simply the diagonal entries. No calculation needed!</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: 90° Rotation Matrix</h4>
            <div className="text-sm space-y-2">
              <p>Matrix: [[0, -1], [1, 0]]</p>
              <p>Trace: 0 + 0 = 0</p>
              <p>Determinant: 0×0 - (-1)×1 = 1</p>
              <p>Characteristic: λ² + 1 = 0</p>
              <p>Eigenvalues: λ₁ = i, λ₂ = -i</p>
              <p className="text-muted-foreground">Pure rotation has no real eigenvalues – every vector changes direction. The complex eigenvalues indicate rotation.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Symmetric 2×2</h4>
            <div className="text-sm space-y-2">
              <p>Matrix: [[2, 1], [1, 2]]</p>
              <p>Trace: 2 + 2 = 4</p>
              <p>Determinant: 4 - 1 = 3</p>
              <p>Characteristic: λ² - 4λ + 3 = 0</p>
              <p>Eigenvalues: λ₁ = 3, λ₂ = 1</p>
              <p className="text-muted-foreground">Symmetric matrices always have real eigenvalues. They represent stretching along perpendicular axes.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: 3×3 Symmetric Matrix</h4>
            <div className="text-sm space-y-2">
              <p>Matrix: [[4, 1, 1], [1, 4, 1], [1, 1, 4]]</p>
              <p>Trace: 4 + 4 + 4 = 12</p>
              <p>Determinant: 60</p>
              <p>Eigenvalues: λ₁ = 6, λ₂ = 3, λ₃ = 3</p>
              <p className="text-muted-foreground">This matrix has a repeated eigenvalue (3). The eigenspace for λ=3 is two-dimensional.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: 3×3 Diagonal Matrix</h4>
            <div className="text-sm space-y-2">
              <p>Matrix: [[1, 0, 0], [0, 2, 0], [0, 0, 3]]</p>
              <p>Trace: 1 + 2 + 3 = 6</p>
              <p>Determinant: 1×2×3 = 6</p>
              <p>Eigenvalues: λ₁ = 1, λ₂ = 2, λ₃ = 3</p>
              <p className="text-muted-foreground">Diagonal matrices have their diagonal entries as eigenvalues. Each standard basis vector is an eigenvector.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 6: 3×3 Tridiagonal Matrix</h4>
            <div className="text-sm space-y-2">
              <p>Matrix: [[2, -1, 0], [-1, 2, -1], [0, -1, 2]]</p>
              <p>Trace: 2 + 2 + 2 = 6</p>
              <p>Determinant: 4</p>
              <p>Eigenvalues: λ₁ ≈ 3.414, λ₂ = 2, λ₃ ≈ 0.586</p>
              <p className="text-muted-foreground">This tridiagonal matrix appears in finite difference methods. Eigenvalues are 2 - 2cos(kπ/4) for k = 1,2,3.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>The word "eigenvalue" comes from German</strong> – "eigen" means "own" or "characteristic." David Hilbert introduced the term in 1904. In different languages, you'll find "valeur propre" (French, meaning "proper value"), "valor propio" (Spanish), or "固有値" (Japanese, meaning "inherent value"). All capture the idea that eigenvalues are intrinsic to the matrix.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What are eigenvalues used for?</h4>
            <p className="text-sm text-muted-foreground">
              Eigenvalues appear everywhere: quantum mechanics (energy levels), structural engineering (vibration modes), Google's PageRank algorithm, principal component analysis in statistics, stability analysis of differential equations, and facial recognition systems.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can eigenvalues be complex numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Real matrices can have complex eigenvalues, which always come in conjugate pairs. Complex eigenvalues indicate rotational behavior in the transformation. Symmetric matrices always have real eigenvalues.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the relationship between trace and eigenvalues?</h4>
            <p className="text-sm text-muted-foreground">
              The trace (sum of diagonal elements) equals the sum of all eigenvalues. Similarly, the determinant equals the product of all eigenvalues. These provide quick checks on eigenvalue calculations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do triangular matrices have diagonal entries as eigenvalues?</h4>
            <p className="text-sm text-muted-foreground">
              For a triangular matrix, det(A - λI) = (a₁₁ - λ)(a₂₂ - λ)...(aₙₙ - λ). Setting this to zero gives λ = aᵢᵢ. The triangular structure makes the characteristic polynomial factor immediately.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does a repeated eigenvalue mean?</h4>
            <p className="text-sm text-muted-foreground">
              A repeated eigenvalue means multiple linearly independent eigenvectors share the same eigenvalue, or there's a "defect" where there aren't enough eigenvectors. This affects whether the matrix can be diagonalized.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do eigenvalues relate to matrix powers?</h4>
            <p className="text-sm text-muted-foreground">
              If A has eigenvalue λ, then Aⁿ has eigenvalue λⁿ. This makes eigenvalues crucial for computing matrix powers and solving systems of linear differential equations.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/matrix-determinant-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Determinant</p>
            <p className="text-xs text-muted-foreground">Calculate determinants</p>
          </a>
          <a href="/math-tools/matrix-inverse-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Inverse</p>
            <p className="text-xs text-muted-foreground">Find inverse matrices</p>
          </a>
          <a href="/math-tools/eigenvector-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Eigenvector Calculator</p>
            <p className="text-xs text-muted-foreground">Find eigenvectors</p>
          </a>
        </div>
      </section>
    </div>
  );
}
