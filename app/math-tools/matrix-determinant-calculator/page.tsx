"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatrixDeterminantCalculator() {
  const [size, setSize] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>([[0, 0], [0, 0]]);
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [inputMode, setInputMode] = useState<"textarea" | "row">("textarea");
  const [textareaValue, setTextareaValue] = useState("");
  const [rowInputs, setRowInputs] = useState<string[]>(["", ""]);
  const [textareaError, setTextareaError] = useState<string>("");

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

  const updateCell = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? parseFloat(value) || 0 : c))
    );
    setMatrix(newMatrix);
  };

  const parseTextareaInput = (text: string): { matrix: number[][]; size: number; error: string } => {
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

    if (rowCount > 50) {
      return { matrix: [], size: 0, error: "Maximum supported matrix size is 50x50" };
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
    const result = parseTextareaInput(value);
    setTextareaError("");
    if (result.matrix.length > 0) {
      setMatrix(result.matrix);
      setSize(result.size);
    }
  };

  const calculateDeterminantRecursive = (m: number[][]): { det: number; steps: string[] } => {
    const n = m.length;

    if (n === 1) {
      return { det: m[0][0], steps: [`det([${m[0][0]}]) = ${m[0][0]}`] };
    }

    if (n === 2) {
      const a = m[0][0], b = m[0][1], c = m[1][0], d = m[1][1];
      const det = a * d - b * c;
      return {
        det,
        steps: [
          `For a 2x2 matrix:`,
          `det = ad - bc`,
          `det = ${a}x${d} - ${b}x${c} = ${a * d} - ${b * c} = ${det}`
        ]
      };
    }

    const steps: string[] = [`Using cofactor expansion along the first row:`];
    let det = 0;

    for (let j = 0; j < n; j++) {
      const minor = getMinor(m, 0, j);
      const subResult = calculateDeterminantRecursive(minor);
      const cofactor = Math.pow(-1, j) * m[0][j] * subResult.det;
      det += cofactor;

      const sign = j % 2 === 0 ? "+" : "-";
      steps.push(`${sign} a0,${j} x det(M0,${j}) = ${sign} ${m[0][j]} x ${subResult.det.toFixed(4)} = ${cofactor.toFixed(4)}`);
    }

    steps.push(``, `Total determinant: ${det}`);
    return { det, steps };
  };

  const getMinor = (m: number[][], skipRow: number, skipCol: number): number[][] => {
    return m
      .filter((_, ri) => ri !== skipRow)
      .map(row => row.filter((_, ci) => ci !== skipCol));
  };

  const calculate = () => {
    if (inputMode === "textarea") {
      const result = parseTextareaInput(textareaValue);
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

    const calculation = calculateDeterminantRecursive(matrix);
    setResult(calculation.det);
    setSteps(calculation.steps);
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

  const examples = [
    { name: "2x2 Simple", matrix: [[3, 1], [2, 4]] },
    { name: "2x2 With Negatives", matrix: [[-2, 5], [3, -1]] },
    { name: "3x3 Standard", matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
    { name: "3x3 Non-zero", matrix: [[2, 1, 3], [1, 0, 2], [4, 1, 1]] },
    { name: "4x4 Identity", matrix: [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]] },
    { name: "4x4 Complex", matrix: [[4, 3, 2, 1], [2, 5, 3, 2], [1, 2, 6, 3], [3, 1, 2, 7]] },
    { name: "Diagonal Matrix", matrix: [[5, 0, 0], [0, 3, 0], [0, 0, 2]] }
  ];

  const fillExample = (index: number) => {
    const example = examples[index];
    const exampleMatrix = example.matrix;
    const newSize = exampleMatrix.length;

    setSize(newSize);
    setMatrix(exampleMatrix);

    if (inputMode === "textarea") {
      setTextareaValue(exampleMatrix.map(row => row.join(" ")).join("\n"));
    } else {
      setRowInputs(exampleMatrix.map(row => row.join(", ")));
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
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Matrix Determinant Calculator – Compute Det of Any Matrix</h1>
        <p className="text-muted-foreground">
          Calculate the determinant of any square matrix up to 50x50 with our free online determinant calculator. Enter values via textarea or row-by-row input with cofactor expansion steps shown.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Label>Matrix Size:</Label>
            <div className="flex gap-2 flex-wrap">
              {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((n) => (
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
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Examples:</span>
            {examples.map((ex, idx) => (
              <Button key={idx} variant="outline" size="sm" onClick={() => fillExample(idx)}>{ex.name}</Button>
            ))}
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
                  placeholder={`Example for 3x3 matrix:\n1 2 3\n4 5 6\n7 8 9\n\nor\n\n1, 2, 3\n4, 5, 6\n7, 8, 9`}
                  className="min-h-[200px] font-mono"
                />
                {textareaError && (
                  <p className="text-xs text-destructive mt-2">{textareaError}</p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Current matrix: {size}x{size} | Detected from your input
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
                      onChange={(e) => parseRowInput(rowIndex, e.target.value)}
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
            <Button onClick={calculate} disabled={matrix.length === 0}>Calculate Determinant</Button>
            <Button variant="outline" onClick={reset}>Reset</Button>
          </div>
        </div>

        {result !== null && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Determinant</p>
              <p className="text-5xl font-bold">det(A) = {result}</p>
              {result === 0 && (
                <p className="text-sm text-destructive mt-2">
                  This matrix is singular (not invertible)
                </p>
              )}
              {result !== 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  This matrix is invertible
                </p>
              )}
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Matrix Determinants</h2>
        <p className="text-muted-foreground">
          The determinant is a single number that captures essential properties of a square matrix. It tells you whether a matrix has an inverse, how it scales areas or volumes when used as a transformation, and whether a system of linear equations has a unique solution.
        </p>
        <p className="text-muted-foreground">
          For a 2x2 matrix, the determinant is simply ad - bc. For larger matrices, we use cofactor expansion or row reduction. A determinant of zero means the matrix is "singular" – it collapses space and has no inverse.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Determinant Formula and Methods</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">2x2 Matrix</h4>
            <code className="text-sm font-mono block">
              |a b|<br />
              |c d| = ad - bc
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Multiply diagonal elements and subtract
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">3x3 Matrix (Cofactor Expansion)</h4>
            <code className="text-sm font-mono block">
              det(A) = a₁₁C₁₁ + a₁₂C₁₂ + a₁₃C₁₃
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Expand along any row or column
            </p>
          </div>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Key Properties</h4>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>det(AB) = det(A) × det(B)</li>
            <li>det(A⁻¹) = 1/det(A)</li>
            <li>det(Aᵀ) = det(A)</li>
            <li>Swapping two rows changes the sign</li>
            <li>Multiplying a row by k multiplies det by k</li>
          </ul>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: 2x2 Matrix</h4>
            <div className="font-mono text-sm space-y-2">
              <div>A = [[3, 1], [2, 4]]</div>
              <div>det(A) = (3)(4) - (1)(2)</div>
              <div>det(A) = 12 - 2 = 10</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: 2x2 with Negatives</h4>
            <div className="font-mono text-sm space-y-2">
              <div>A = [[-2, 5], [3, -1]]</div>
              <div>det(A) = (-2)(-1) - (5)(3)</div>
              <div>det(A) = 2 - 15 = -13</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: 3x3 Matrix</h4>
            <div className="font-mono text-sm space-y-2">
              <div>A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]</div>
              <div>det(A) = 1(5×9 - 6×8) - 2(4×9 - 6×7) + 3(4×8 - 5×7)</div>
              <div>det(A) = 1(45-48) - 2(36-42) + 3(32-35)</div>
              <div>det(A) = -3 + 12 - 9 = 0</div>
              <div className="text-muted-foreground">This matrix is singular!</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Diagonal Matrix</h4>
            <div className="font-mono text-sm space-y-2">
              <div>A = [[5, 0, 0], [0, 3, 0], [0, 0, 2]]</div>
              <div>For diagonal matrices: det = product of diagonal elements</div>
              <div>det(A) = 5 × 3 × 2 = 30</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm">
            The term "determinant" was coined by Carl Friedrich Gauss in 1801. He chose this name because the value "determines" whether a system of linear equations has a unique solution. Before Gauss, mathematicians like Leibniz and Cramer had already discovered related concepts, but Gauss unified the theory.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What does a determinant of zero mean?</h4>
            <p className="text-sm text-muted-foreground">
              A zero determinant means the matrix is singular – it has no inverse. Geometrically, the matrix collapses space into a lower dimension. For systems of equations, it means either no solution or infinitely many solutions exist.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can determinants be negative?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! Determinants can be positive, negative, or zero. A negative determinant indicates the matrix includes a reflection – it flips the orientation of space. The absolute value tells you the scaling factor.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why are determinants only for square matrices?</h4>
            <p className="text-sm text-muted-foreground">
              The determinant represents how a transformation scales area (2D) or volume (3D+). Only square matrices represent transformations from a space to itself. Non-square matrices change the dimension, so the concept doesn't apply.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I find the determinant of a large matrix?</h4>
            <p className="text-sm text-muted-foreground">
              For large matrices, use row reduction to convert to upper triangular form, then multiply the diagonal elements. This is much faster than cofactor expansion, which becomes computationally expensive for matrices larger than 4x4.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the determinant of an identity matrix?</h4>
            <p className="text-sm text-muted-foreground">
              The identity matrix always has determinant 1, regardless of size. This makes sense because the identity transformation doesn't change anything – it scales space by a factor of exactly 1.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How are determinants used in real applications?</h4>
            <p className="text-sm text-muted-foreground">
              Determinants appear in physics (calculating volumes, cross products), engineering (stability analysis), economics (input-output models), and computer graphics (checking if transformations are invertible). They're fundamental to solving systems of equations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
