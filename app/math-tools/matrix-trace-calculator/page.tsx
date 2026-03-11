"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

  const examples = [
    { name: "Simple 2x2", matrix: [[1, 2], [3, 4]] },
    { name: "3x3 Standard", matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
    { name: "4x4 Pattern", matrix: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]] },
    { name: "Identity 3x3", matrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] },
    { name: "Diagonal Matrix", matrix: [[5, 0, 0], [0, 3, 0], [0, 0, 2]] },
    { name: "With Negatives", matrix: [[-2, 5], [3, -4]] },
    { name: "Large Numbers", matrix: [[100, 50], [25, 200]] }
  ];

  const loadExample = (index: number) => {
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
              <Button key={idx} variant="outline" size="sm" onClick={() => loadExample(idx)}>{ex.name}</Button>
            ))}
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
                  placeholder={`Example for 3x3 matrix:\n1 2 3\n4 5 6\n7 8 9\n\nor\n\n1, 2, 3\n4, 5, 6\n7, 8, 9`}
                  className="min-h-[150px] font-mono"
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
            <Button onClick={calculateTrace} disabled={matrix.length === 0}>Calculate Trace</Button>
            <Button variant="outline" onClick={reset}>Reset</Button>
          </div>
        </div>

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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Matrix Trace</h2>
        <p className="text-muted-foreground">
          The trace of a square matrix is simply the sum of its diagonal elements – those running from the top-left corner to the bottom-right. Despite its simplicity, the trace appears throughout mathematics and physics, from quantum mechanics to differential equations.
        </p>
        <p className="text-muted-foreground">
          The trace has remarkable properties: it's invariant under similarity transformations, equals the sum of eigenvalues, and satisfies tr(AB) = tr(BA) even when AB ≠ BA. These properties make it a powerful tool in theoretical work.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Trace Formula and Properties</h3>
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold text-sm mb-3">Definition</h4>
          <code className="text-sm font-mono block">
            For A = [aᵢⱼ], tr(A) = a₁₁ + a₂₂ + ... + aₙₙ = Σ aᵢᵢ
          </code>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Linearity</h4>
            <p className="text-sm text-muted-foreground">tr(A + B) = tr(A) + tr(B)</p>
            <p className="text-sm text-muted-foreground">tr(cA) = c·tr(A)</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Cyclic Property</h4>
            <p className="text-sm text-muted-foreground">tr(AB) = tr(BA)</p>
            <p className="text-sm text-muted-foreground">tr(ABC) = tr(BCA) = tr(CAB)</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Transpose</h4>
            <p className="text-sm text-muted-foreground">tr(Aᵀ) = tr(A)</p>
            <p className="text-sm text-muted-foreground">Same diagonal elements</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: 2x2 Matrix</h4>
            <div className="font-mono text-sm space-y-2">
              <div>A = [[1, 2], [3, 4]]</div>
              <div>Diagonal elements: 1, 4</div>
              <div>tr(A) = 1 + 4 = 5</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: 3x3 Matrix</h4>
            <div className="font-mono text-sm space-y-2">
              <div>A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]</div>
              <div>Diagonal elements: 1, 5, 9</div>
              <div>tr(A) = 1 + 5 + 9 = 15</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Identity Matrix</h4>
            <div className="font-mono text-sm space-y-2">
              <div>I₃ = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]</div>
              <div>Diagonal elements: 1, 1, 1</div>
              <div>tr(I₃) = 1 + 1 + 1 = 3</div>
              <div className="text-muted-foreground">For any n×n identity: tr(Iₙ) = n</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Diagonal Matrix</h4>
            <div className="font-mono text-sm space-y-2">
              <div>D = [[5, 0, 0], [0, 3, 0], [0, 0, 2]]</div>
              <div>For diagonal matrices, trace = sum of diagonal entries</div>
              <div>tr(D) = 5 + 3 + 2 = 10</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm">
            The trace equals the sum of eigenvalues! This deep connection links a simple arithmetic operation (adding diagonal elements) to the fundamental spectral properties of a matrix. In quantum mechanics, the trace of a density matrix always equals 1, representing total probability.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is it called "trace"?</h4>
            <p className="text-sm text-muted-foreground">
              The term comes from the German "Spur" (track or trace), used by mathematicians in the early 20th century. It suggests the diagonal leaves a "trace" through the matrix from corner to corner.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can non-square matrices have a trace?</h4>
            <p className="text-sm text-muted-foreground">
              No. The trace requires a main diagonal from top-left to bottom-right, which only exists for square matrices. Rectangular matrices don't have this complete diagonal.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the trace of a zero matrix?</h4>
            <p className="text-sm text-muted-foreground">
              Zero! All diagonal elements are 0, so their sum is 0. This holds for any size zero matrix.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is trace used in physics?</h4>
            <p className="text-sm text-muted-foreground">
              In quantum mechanics, the trace gives expectation values and probabilities. The trace of the density matrix equals 1 (total probability). In statistical mechanics, partition functions involve traces of operators.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is trace the same as determinant?</h4>
            <p className="text-sm text-muted-foreground">
              No, they're different. Trace is the sum of diagonal elements (and eigenvalues). Determinant is the product of eigenvalues. Both are important matrix invariants but capture different properties.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the trace of AB vs BA?</h4>
            <p className="text-sm text-muted-foreground">
              They're equal! tr(AB) = tr(BA) even though AB ≠ BA in general. This cyclic property extends: tr(ABC) = tr(BCA) = tr(CAB), but not necessarily tr(ACB).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
