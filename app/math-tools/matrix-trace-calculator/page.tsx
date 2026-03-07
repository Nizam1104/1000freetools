"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatrixTraceCalculator() {
  const [size, setSize] = useState<number>(3);
  const [matrix, setMatrix] = useState<number[][]>([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [inputMode, setInputMode] = useState<"textarea" | "row">("textarea");
  const [textareaValue, setTextareaValue] = useState("");
  const [rowInputs, setRowInputs] = useState<string[]>(["", "", ""]);
  const [textareaError, setTextareaError] = useState<string>("");

  const initializeMatrix = (newSize: number) => {
    setSize(newSize);
    setMatrix(Array(newSize).fill(0).map(() => Array(newSize).fill(0)));
    setResult(null);
    setError("");
    setTextareaValue("");
    setRowInputs(Array(newSize).fill(""));
    setTextareaError("");
  };

  const updateMatrix = (row: number, col: number, value: string) => {
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
    const result = parseTextareaInput(value);
    setTextareaError("");
    if (result.matrix.length > 0) {
      setMatrix(result.matrix);
      setSize(result.size);
    }
  };

  const calculateTrace = () => {
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

    try {
      let trace = 0;
      for (let i = 0; i < size; i++) {
        trace += matrix[i][i];
      }
      setResult(trace);
      setError("");
      setTextareaError("");
    } catch (e) {
      setError("Error calculating trace. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setMatrix(Array(size).fill(0).map(() => Array(size).fill(0)));
    setResult(null);
    setError("");
    setTextareaValue("");
    setRowInputs(Array(size).fill(""));
    setTextareaError("");
  };

  const loadExample = () => {
    const examples: Record<number, number[][]> = {
      2: [[1, 2], [3, 4]],
      3: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      4: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
    };
    setMatrix(examples[size]);

    if (inputMode === "textarea") {
      setTextareaValue(examples[size].map(row => row.join(" ")).join("\n"));
    } else {
      setRowInputs(examples[size].map(row => row.join(", ")));
    }

    setResult(null);
    setError("");
    setTextareaError("");
  };

  const loadIdentityMatrix = () => {
    const identity = Array(size).fill(0).map((_, i) =>
      Array(size).fill(0).map((_, j) => (i === j ? 1 : 0))
    );
    setMatrix(identity);

    if (inputMode === "textarea") {
      setTextareaValue(identity.map(row => row.join(" ")).join("\n"));
    } else {
      setRowInputs(identity.map(row => row.join(", ")));
    }

    setResult(null);
    setError("");
    setTextareaError("");
  };

  const loadDiagonalMatrix = () => {
    const diagonal = Array(size).fill(0).map((_, i) =>
      Array(size).fill(0).map((_, j) => (i === j ? (i + 1) * 2 : 0))
    );
    setMatrix(diagonal);

    if (inputMode === "textarea") {
      setTextareaValue(diagonal.map(row => row.join(" ")).join("\n"));
    } else {
      setRowInputs(diagonal.map(row => row.join(", ")));
    }

    setResult(null);
    setError("");
    setTextareaError("");
  };

  const handleSizeChange = (newSize: number) => {
    const newMatrix = Array(newSize).fill(0).map((_, ri) =>
      Array(newSize).fill(0).map((_, ci) =>
        ri < matrix.length && ci < matrix[ri]?.length ? matrix[ri][ci] : 0
      )
    );
    setMatrix(newMatrix);
    setSize(newSize);
    setResult(null);
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
        <h1 className="text-3xl font-semibold mb-2">Matrix Trace Calculator – Find tr(A) Online</h1>
        <p className="text-muted-foreground">
          Calculate the trace of any square matrix with our free online matrix trace calculator. Find the sum of diagonal elements instantly with step-by-step display.
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
              <Button variant="outline" size="sm" onClick={loadExample}>Load Example</Button>
              <Button variant="outline" size="sm" onClick={loadIdentityMatrix}>Identity</Button>
              <Button variant="outline" size="sm" onClick={loadDiagonalMatrix}>Diagonal</Button>
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
                    className="min-h-[150px] font-mono"
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
              <Button onClick={calculateTrace} disabled={matrix.length === 0}>Calculate Trace</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
          </CardContent>
        </Card>

        {result !== null && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                tr(A) = Sum of Diagonal Elements
              </p>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{result}</p>
              </div>
              <div className="mt-4 p-4 bg-background rounded-lg">
                <p className="text-sm font-mono">
                  tr(A) = {matrix.map((_, i) => `a[${i}][${i}]`).join(" + ")} = {matrix.map((_, i) => matrix[i][i]).join(" + ")} = {result}
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Understanding the Trace</h4>
              <p className="text-sm text-muted-foreground">
                The trace is the sum of elements on the main diagonal (top-left to bottom-right).
                Only square matrices have a trace.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is Matrix Trace?</h2>
        <p className="text-muted-foreground">
          The trace of a square matrix A, denoted tr(A), is the sum of the elements on its main diagonal (from top-left to bottom-right). For an n×n matrix A, the trace is: tr(A) = a₁₁ + a₂₂ + ... + aₙₙ.
        </p>
        <p className="text-muted-foreground">
          The trace is an important matrix invariant used in linear algebra, quantum mechanics, and various applications in physics and engineering.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Trace Formula</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
            tr(A) = Σ(i=1 to n) aᵢᵢ
          </code>
          <p className="text-sm text-muted-foreground mt-2">
            Sum all elements where row index equals column index.
          </p>
          <div className="mt-4 p-3 bg-muted rounded">
            <p className="text-sm font-semibold mb-2">Example (3×3 matrix):</p>
            <code className="text-xs font-mono block">
              {`A = [[1, 2, 3],
     [4, 5, 6],
     [7, 8, 9]]

tr(A) = 1 + 5 + 9 = 15`}
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties of Matrix Trace</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Basic Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• tr(A + B) = tr(A) + tr(B)</li>
              <li>• tr(cA) = c × tr(A) (c is scalar)</li>
              <li>• tr(Aᵀ) = tr(A) (trace of transpose)</li>
              <li>• tr(Iₙ) = n (trace of identity matrix)</li>
              <li>• tr(0) = 0 (trace of zero matrix)</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Advanced Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• tr(AB) = tr(BA) (cyclic property)</li>
              <li>• tr(ABC) = tr(BCA) = tr(CAB)</li>
              <li>• tr(A) = sum of eigenvalues</li>
              <li>• tr(Aᵏ) = sum of eigenvaluesᵏ</li>
              <li>• Similar matrices have same trace</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Trace Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">2×2 Matrix</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              {`A = [[3, 1],
     [2, 4]]

tr(A) = 3 + 4 = 7`}
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Identity Matrix</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              {`I₃ = [[1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]]

tr(I₃) = 1 + 1 + 1 = 3`}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Trace of n×n identity matrix always equals n.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Diagonal Matrix</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              {`D = [[5, 0, 0],
     [0, 3, 0],
     [0, 0, 7]]

tr(D) = 5 + 3 + 7 = 15`}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              For diagonal matrices, trace equals sum of diagonal entries.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Applications of Matrix Trace</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Quantum Mechanics</h3>
            <p className="text-sm text-muted-foreground">
              The trace of a density matrix equals 1. Expectation values are calculated using trace operations.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Linear Algebra</h3>
            <p className="text-sm text-muted-foreground">
              The trace equals the sum of eigenvalues, useful for characterizing matrices.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Statistics</h3>
            <p className="text-sm text-muted-foreground">
              Used in multivariate analysis and covariance matrix computations.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Machine Learning</h3>
            <p className="text-sm text-muted-foreground">
              Trace regularization and kernel methods use trace operations.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can non-square matrices have a trace?</h3>
            <p className="text-sm text-muted-foreground">
              No, only square matrices have a trace because the main diagonal is only defined for matrices with equal rows and columns.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is the trace of a zero matrix?</h3>
            <p className="text-sm text-muted-foreground">
              The trace of any zero matrix is 0, since all diagonal elements are 0.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Is trace the same as determinant?</h3>
            <p className="text-sm text-muted-foreground">
              No. Trace is the sum of diagonal elements (and eigenvalues). Determinant is the product of eigenvalues. They are different matrix invariants.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why is tr(AB) = tr(BA)?</h3>
            <p className="text-sm text-muted-foreground">
              This cyclic property holds even when AB ≠ BA. It's a fundamental property used extensively in matrix algebra and physics.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/matrix-determinant-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Determinant</p>
            <p className="text-xs text-muted-foreground">Find det(A)</p>
          </a>
          <a href="/math-tools/matrix-transpose-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Transpose</p>
            <p className="text-xs text-muted-foreground">Find Aᵀ</p>
          </a>
          <a href="/math-tools/eigenvalue-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Eigenvalues</p>
            <p className="text-xs text-muted-foreground">Find λ</p>
          </a>
        </div>
      </section>
    </div>
  );
}
