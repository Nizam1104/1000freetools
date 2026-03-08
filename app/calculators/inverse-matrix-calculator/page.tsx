"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function InverseMatrixCalculator() {
  const [size, setSize] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>([[1, 2], [3, 4]]);
  const [result, setResult] = useState<number[][] | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [inputMode, setInputMode] = useState<"textarea" | "row">("textarea");
  const [textareaValue, setTextareaValue] = useState("1, 2\n3, 4");
  const [rowInputs, setRowInputs] = useState<string[]>(["1, 2", "3, 4"]);
  const [textareaError, setTextareaError] = useState("");

  const initializeMatrix = (newSize: number) => {
    setSize(newSize);
    setMatrix(Array(newSize).fill(0).map(() => Array(newSize).fill(0)));
    setResult(null);
    setSteps([]);
    setError("");
    setTextareaValue("");
    setRowInputs(Array(newSize).fill(""));
    setTextareaError("");
  };

  const parseMatrixInput = (text: string): { matrix: number[][]; size: number; error: string } => {
    const trimmed = text.trim();
    if (!trimmed) {
      return { matrix: [], size: 0, error: "" };
    }

    const rows = trimmed.split("\n").filter(row => row.trim());
    if (rows.length === 0) {
      return { matrix: [], size: 0, error: "Please enter matrix values" };
    }

    const parsedRows: number[][] = [];
    for (const row of rows) {
      const values = row.split(/[\s,]+/).filter(v => v.trim());
      const numbers = values.map(v => parseFloat(v));
      if (numbers.some(n => isNaN(n))) {
        return { matrix: [], size: 0, error: "Invalid number detected. Please enter only numeric values." };
      }
      parsedRows.push(numbers);
    }

    const rowCount = parsedRows.length;
    const colCount = parsedRows[0].length;

    if (rowCount > 10) {
      return { matrix: [], size: 0, error: "Maximum supported matrix size is 10×10" };
    }

    if (rowCount !== colCount) {
      return {
        matrix: [],
        size: 0,
        error: `Matrix must be square. Got ${rowCount} rows and ${colCount} columns.`
      };
    }

    for (let i = 1; i < rowCount; i++) {
      if (parsedRows[i].length !== colCount) {
        return {
          matrix: [],
          size: 0,
          error: `All rows must have the same number of elements. Row ${i + 1} has ${parsedRows[i].length} elements.`
        };
      }
    }

    return { matrix: parsedRows, size: rowCount, error: "" };
  };

  const parseRowInput = (rowIndex: number, value: string): { matrix: number[][]; error: string } => {
    const newRowInputs = [...rowInputs];
    newRowInputs[rowIndex] = value;
    setRowInputs(newRowInputs);

    const values = value.split(/[\s,]+/).filter(v => v.trim());
    const numbers = values.map(v => parseFloat(v));

    if (values.length > 0 && numbers.some(n => isNaN(n))) {
      return { matrix: [], error: `Row ${rowIndex + 1} contains invalid numbers` };
    }

    const newMatrix = matrix.map((r, ri) => {
      if (ri === rowIndex) {
        const newRow = Array(size).fill(0);
        for (let i = 0; i < Math.min(numbers.length, size); i++) {
          newRow[i] = numbers[i];
        }
        return newRow;
      }
      return r;
    });

    return { matrix: newMatrix, error: "" };
  };

  const handleTextareaChange = (value: string) => {
    setTextareaValue(value);
    const result = parseMatrixInput(value);
    setTextareaError("");
    if (result.matrix.length > 0) {
      setMatrix(result.matrix);
      setSize(result.size);
    }
  };

  const determinant2x2 = (m: number[][]): number => m[0][0] * m[1][1] - m[0][1] * m[1][0];

  const determinant3x3 = (m: number[][]): number => {
    return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
         - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
         + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  };

  const determinantRecursive = (m: number[][]): number => {
    const n = m.length;
    if (n === 1) return m[0][0];
    if (n === 2) return determinant2x2(m);
    
    let det = 0;
    for (let col = 0; col < n; col++) {
      const subMatrix = m.slice(1).map((row) => [...row.slice(0, col), ...row.slice(col + 1)]);
      det += Math.pow(-1, col) * m[0][col] * determinantRecursive(subMatrix);
    }
    return det;
  };

  const getCofactorMatrix = (m: number[][]): number[][] => {
    const n = m.length;
    const cofactors: number[][] = [];
    
    for (let i = 0; i < n; i++) {
      cofactors[i] = [];
      for (let j = 0; j < n; j++) {
        const minor = m
          .filter((_, row) => row !== i)
          .map((row) => row.filter((_, col) => col !== j));
        const det = determinantRecursive(minor);
        cofactors[i][j] = Math.pow(-1, i + j) * det;
      }
    }
    
    return cofactors;
  };

  const getAdjugateMatrix = (cofactors: number[][]): number[][] => {
    const n = cofactors.length;
    const adjugate: number[][] = [];
    
    for (let i = 0; i < n; i++) {
      adjugate[i] = [];
      for (let j = 0; j < n; j++) {
        adjugate[i][j] = cofactors[j][i];
      }
    }
    
    return adjugate;
  };

  const inverse2x2 = (m: number[][]): { inverse: number[][]; steps: string[] } => {
    const det = determinant2x2(m);
    const [a, b, c, d] = [m[0][0], m[0][1], m[1][0], m[1][1]];
    
    const steps = [
      `For a 2×2 matrix:`,
      `A = [${a}  ${b}]`,
      `    [${c}  ${d}]`,
      ``,
      `Step 1: Calculate determinant`,
      `det(A) = ad - bc = ${a}×${d} - ${b}×${c} = ${a*d} - ${b*c} = ${det}`,
      ``,
      `Step 2: Apply inverse formula`,
      `A⁻¹ = (1/det(A)) × [${d}  ${-b}]`,
      `                   [${-c}  ${a}]`,
      ``,
      `Step 3: Calculate final values`,
      `A⁻¹ = [${(d/det).toFixed(4)}  ${(-b/det).toFixed(4)}]`,
      `      [${(-c/det).toFixed(4)}  ${(a/det).toFixed(4)}]`
    ];
    
    const inverse = [
      [m[1][1] / det, -m[0][1] / det],
      [-m[1][0] / det, m[0][0] / det]
    ];
    
    return { inverse, steps };
  };

  const inverse3x3 = (m: number[][]): { inverse: number[][]; steps: string[] } => {
    const det = determinant3x3(m);
    const cofactors = getCofactorMatrix(m);
    const adjugate = getAdjugateMatrix(cofactors);
    
    const inverse = adjugate.map(row => row.map(val => val / det));
    
    const steps = [
      `For a 3×3 matrix:`,
      ``,
      `Step 1: Calculate determinant`,
      `det(A) = ${det}`,
      ``,
      `Step 2: Find cofactor matrix`,
      `C = [${cofactors[0].map(v => v.toFixed(2)).join("  ")}]`,
      `    [${cofactors[1].map(v => v.toFixed(2)).join("  ")}]`,
      `    [${cofactors[2].map(v => v.toFixed(2)).join("  ")}]`,
      ``,
      `Step 3: Transpose cofactor matrix (adjugate)`,
      `adj(A) = [${adjugate[0].map(v => v.toFixed(2)).join("  ")}]`,
      `         [${adjugate[1].map(v => v.toFixed(2)).join("  ")}]`,
      `         [${adjugate[2].map(v => v.toFixed(2)).join("  ")}]`,
      ``,
      `Step 4: Divide by determinant`,
      `A⁻¹ = (1/${det}) × adj(A)`,
      ``,
      `Step 5: Final result`,
      `A⁻¹ = [${inverse[0].map(v => v.toFixed(4)).join("  ")}]`,
      `      [${inverse[1].map(v => v.toFixed(4)).join("  ")}]`,
      `      [${inverse[2].map(v => v.toFixed(4)).join("  ")}]`
    ];
    
    return { inverse, steps };
  };

  const inverseGeneric = (m: number[][]): { inverse: number[][]; steps: string[] } => {
    const det = determinantRecursive(m);
    const cofactors = getCofactorMatrix(m);
    const adjugate = getAdjugateMatrix(cofactors);
    const inverse = adjugate.map(row => row.map(val => val / det));
    
    const steps = [
      `For a ${m.length}×${m.length} matrix:`,
      ``,
      `Step 1: Calculate determinant`,
      `det(A) = ${det}`,
      ``,
      `Step 2: Find cofactor matrix`,
      `Calculated using minors and cofactors`,
      ``,
      `Step 3: Transpose cofactor matrix (adjugate)`,
      ``,
      `Step 4: Divide by determinant`,
      `A⁻¹ = (1/${det}) × adj(A)`,
      ``,
      `Step 5: Final result`,
      ...inverse.map((row, i) => `Row ${i + 1}: [${row.map(v => v.toFixed(4)).join("  ")}]`)
    ];
    
    return { inverse, steps };
  };

  const calculate = () => {
    if (inputMode === "textarea") {
      const result = parseMatrixInput(textareaValue);
      if (result.error) {
        setTextareaError(result.error);
        return;
      }
      if (result.matrix.length > 0) {
        setMatrix(result.matrix);
        setSize(result.size);
      }
    }

    if (matrix.length === 0 || matrix.some(row => row.length === 0)) {
      setError("Please enter a valid matrix");
      return;
    }

    if (matrix.length !== matrix[0].length) {
      setError("Matrix must be square (same number of rows and columns)");
      return;
    }

    let det: number;
    if (matrix.length === 2) {
      det = determinant2x2(matrix);
    } else if (matrix.length === 3) {
      det = determinant3x3(matrix);
    } else {
      det = determinantRecursive(matrix);
    }

    if (det === 0) {
      setError("Matrix is singular (no inverse exists)");
      return;
    }

    let inverseResult: { inverse: number[][]; steps: string[] };
    if (matrix.length === 2) {
      inverseResult = inverse2x2(matrix);
    } else if (matrix.length === 3) {
      inverseResult = inverse3x3(matrix);
    } else {
      inverseResult = inverseGeneric(matrix);
    }

    setResult(inverseResult.inverse);
    setSteps(inverseResult.steps);
    setError("");
    setTextareaError("");
  };

  const reset = () => {
    setMatrix(Array(size).fill(0).map(() => Array(size).fill(0)));
    setResult(null);
    setSteps([]);
    setError("");
    setTextareaValue("");
    setRowInputs(Array(size).fill(""));
    setTextareaError("");
  };

  const fillExample = () => {
    const exampleMatrix = size === 2 
      ? [[1, 2], [3, 4]]
      : size === 3
        ? [[1, 2, 3], [0, 1, 4], [5, 6, 0]]
        : [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    
    const slicedExample = exampleMatrix.slice(0, size).map(row => row.slice(0, size));
    setMatrix(slicedExample);

    if (inputMode === "textarea") {
      setTextareaValue(slicedExample.map(row => row.join(", ")).join("\n"));
    } else {
      setRowInputs(slicedExample.map(row => row.join(", ")));
    }

    setResult(null);
    setSteps([]);
    setError("");
    setTextareaError("");
  };

  const handleSizeChange = (newSize: number) => {
    const newMatrix = Array(newSize).fill(0).map((_, ri) =>
      Array(newSize).fill(0).map((_, ci) =>
        ri < matrix.length && ci < matrix[ri].length ? matrix[ri][ci] : 0
      )
    );
    setMatrix(newMatrix);
    setSize(newSize);
    setResult(null);
    setSteps([]);
    setError("");
    setTextareaError("");

    if (inputMode === "row") {
      setRowInputs(Array(newSize).fill("").map((_, i) =>
        i < rowInputs.length ? rowInputs[i] : ""
      ));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Matrix Inverse Calculator – Find A⁻¹ of Any Matrix</h1>
        <p className="text-muted-foreground">
          Calculate the inverse of any square matrix up to 10×10 with our free online matrix inverse calculator. Enter values via textarea or row-by-row input with step-by-step solutions.
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <Label>Matrix Size:</Label>
              <div className="flex gap-2">
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <Button
                    key={n}
                    variant={size === n ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSizeChange(n)}
                    className="w-10"
                  >
                    {n}
                  </Button>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={fillExample}>Load Example</Button>
            </div>

            <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as "textarea" | "row")}>
              <TabsList>
                <TabsTrigger value="textarea">Text Area Input</TabsTrigger>
                <TabsTrigger value="row">Row-by-Row Input</TabsTrigger>
              </TabsList>

              <TabsContent value="textarea" className="space-y-4">
                <div>
                  <Label>Enter matrix values (each row on a new line, values separated by spaces or commas)</Label>
                  <Textarea
                    value={textareaValue}
                    onChange={(e) => handleTextareaChange(e.target.value)}
                    placeholder={`Example for 3×3 matrix:\n1 2 3\n4 5 6\n7 8 9\n\nor\n\n1, 2, 3\n4, 5, 6\n7, 8, 9`}
                    className="min-h-[200px] font-mono"
                  />
                  {textareaError && (
                    <p className="text-xs text-destructive mt-2">{textareaError}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Current matrix: {size}×{size} | Detected from your input
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="row" className="space-y-4">
                <div className="space-y-3">
                  <Label>Enter each row (comma or space separated values)</Label>
                  {rowInputs.map((rowValue, rowIndex) => (
                    <div key={rowIndex} className="flex items-center gap-2">
                      <Label className="w-16 text-right">Row {rowIndex + 1}:</Label>
                      <Input
                        value={rowValue}
                        onChange={(e) => {
                          const result = parseRowInput(rowIndex, e.target.value);
                          if (result.matrix.length > 0) {
                            setMatrix(result.matrix);
                          }
                        }}
                        placeholder={`Enter ${size} values for row ${rowIndex + 1}`}
                        className="flex-1 font-mono"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate} disabled={matrix.length === 0}>Calculate Inverse</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
          </CardContent>
        </Card>

        {result !== null && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-4 text-center">Inverse Matrix (A⁻¹)</p>
              <div className="flex justify-center items-center gap-8 flex-wrap">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Original Matrix A</p>
                  <div className="font-mono text-sm">
                    {matrix.map((row, i) => (
                      <div key={i}>{row.join("  ")}</div>
                    ))}
                  </div>
                </div>
                <span className="text-2xl font-bold">→</span>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Inverse A⁻¹</p>
                  <div className="font-mono text-lg font-bold">
                    {result.map((row, i) => (
                      <div key={i}>{row.map(v => v.toFixed(4)).join("  ")}</div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Verification: A × A⁻¹ = I (Identity Matrix)
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                {steps.map((step, i) => (
                  <div key={i} className={step === "" ? "h-4" : ""}>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is a Matrix Inverse?</h2>
        <p className="text-muted-foreground">
          The inverse of a square matrix A, denoted A⁻¹, is a matrix such that when multiplied by A gives the identity matrix: A × A⁻¹ = A⁻¹ × A = I. Not all matrices have inverses – only non-singular (invertible) matrices with non-zero determinants.
        </p>
        <p className="text-muted-foreground">
          A matrix with determinant 0 is called singular and has no inverse.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Matrix Inverse Formulas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">2×2 Matrix Inverse</h3>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              A = [a b]<br />
              &nbsp;&nbsp;&nbsp;&nbsp;[c d]<br />
              <br />
              A⁻¹ = (1/det(A)) × [d  -b]<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[-c  a]
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Swap diagonal elements, negate off-diagonal, divide by determinant
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">General Formula</h3>
            <code className="text-xs font-mono bg-muted px-3 py-2 rounded block">
              A⁻¹ = (1/det(A)) × adj(A)<br />
              <br />
              where adj(A) is the adjugate<br />
              (transpose of cofactor matrix)
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Works for any square matrix
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties of Matrix Inverses</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Key Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• (A⁻¹)⁻¹ = A</li>
              <li>• (AB)⁻¹ = B⁻¹A⁻¹</li>
              <li>• (Aᵀ)⁻¹ = (A⁻¹)ᵀ</li>
              <li>• (kA)⁻¹ = (1/k)A⁻¹</li>
              <li>• A × A⁻¹ = A⁻¹ × A = I</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">When Inverse Exists</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Matrix must be square</li>
              <li>• Determinant must be non-zero</li>
              <li>• Rows/columns must be independent</li>
              <li>• Matrix must be full rank</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What does it mean if a matrix has no inverse?</h3>
            <p className="text-sm text-muted-foreground">
              A matrix with no inverse is called singular. This happens when the determinant is 0, meaning the rows or columns are linearly dependent. Such matrices cannot be used to solve systems of equations uniquely.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do you verify an inverse is correct?</h3>
            <p className="text-sm text-muted-foreground">
              Multiply the original matrix A by the calculated inverse A⁻¹. If the result is the identity matrix (1s on diagonal, 0s elsewhere), the inverse is correct: A × A⁻¹ = I.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can non-square matrices have inverses?</h3>
            <p className="text-sm text-muted-foreground">
              No, only square matrices can have true inverses. However, rectangular matrices can have pseudo-inverses (Moore-Penrose inverse) used in least squares problems.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is the adjugate matrix?</h3>
            <p className="text-sm text-muted-foreground">
              The adjugate (or adjoint) matrix is the transpose of the cofactor matrix. It's used in the formula A⁻¹ = (1/det(A)) × adj(A) to compute the inverse.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
