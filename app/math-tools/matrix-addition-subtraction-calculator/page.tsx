"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatrixAdditionSubtractionCalculator() {
  const [size, setSize] = useState<number>(2);
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [matrixA, setMatrixA] = useState<number[][]>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<number[][]>([[0, 0], [0, 0]]);
  const [result, setResult] = useState<number[][] | null>(null);
  const [error, setError] = useState("");
  const [inputModeA, setInputModeA] = useState<"textarea" | "row">("textarea");
  const [inputModeB, setInputModeB] = useState<"textarea" | "row">("textarea");
  const [textareaValueA, setTextareaValueA] = useState("");
  const [textareaValueB, setTextareaValueB] = useState("");
  const [rowInputsA, setRowInputsA] = useState<string[]>(["", ""]);
  const [rowInputsB, setRowInputsB] = useState<string[]>(["", ""]);
  const [textareaErrorA, setTextareaErrorA] = useState<string>("");
  const [textareaErrorB, setTextareaErrorB] = useState<string>("");

  const initializeMatrices = (newSize: number) => {
    setSize(newSize);
    setMatrixA(Array(newSize).fill(0).map(() => Array(newSize).fill(0)));
    setMatrixB(Array(newSize).fill(0).map(() => Array(newSize).fill(0)));
    setResult(null);
    setError("");
    setTextareaValueA("");
    setTextareaValueB("");
    setRowInputsA(Array(newSize).fill(""));
    setRowInputsB(Array(newSize).fill(""));
    setTextareaErrorA("");
    setTextareaErrorB("");
  };

  const updateMatrixA = (row: number, col: number, value: string) => {
    const newMatrix = matrixA.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? parseFloat(value) || 0 : c))
    );
    setMatrixA(newMatrix);
  };

  const updateMatrixB = (row: number, col: number, value: string) => {
    const newMatrix = matrixB.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? parseFloat(value) || 0 : c))
    );
    setMatrixB(newMatrix);
  };

  const parseTextareaInput = (text: string, matrixName: string): { matrix: number[][]; size: number; error: string } => {
    const trimmed = text.trim();
    if (!trimmed) {
      return { matrix: [], size: 0, error: "" };
    }

    const rows = trimmed.split("\n").filter(row => row.trim());
    if (rows.length === 0) {
      return { matrix: [], size: 0, error: `Please enter ${matrixName} values` };
    }

    const parsedRows: number[][] = [];
    for (const row of rows) {
      const values = row.split(/[\s,]+/).filter(v => v.trim());
      const numbers = values.map(v => parseFloat(v));
      if (numbers.some(n => isNaN(n))) {
        return { matrix: [], size: 0, error: `Invalid number detected in ${matrixName}. Please enter only numeric values.` };
      }
      parsedRows.push(numbers);
    }

    const rowCount = parsedRows.length;
    const colCount = parsedRows[0].length;

    if (rowCount > 10) {
      return { matrix: [], size: 0, error: `Maximum supported matrix size for ${matrixName} is 10×10` };
    }

    if (rowCount !== colCount) {
      return {
        matrix: [],
        size: 0,
        error: `${matrixName} must be square. Got ${rowCount} rows and ${colCount} columns.`
      };
    }

    for (let i = 1; i < rowCount; i++) {
      if (parsedRows[i].length !== colCount) {
        return {
          matrix: [],
          size: 0,
          error: `All rows in ${matrixName} must have the same number of elements. Row ${i + 1} has ${parsedRows[i].length} elements.`
        };
      }
    }

    return { matrix: parsedRows, size: rowCount, error: "" };
  };

  const parseRowInputA = (rowIndex: number, value: string): { matrix: number[][]; error: string } => {
    const newRowInputs = [...rowInputsA];
    newRowInputs[rowIndex] = value;
    setRowInputsA(newRowInputs);

    const values = value.split(/[\s,]+/).filter(v => v.trim());
    const numbers = values.map(v => parseFloat(v));

    if (values.length > 0 && numbers.some(n => isNaN(n))) {
      return { matrix: [], error: `Row ${rowIndex + 1} in Matrix A contains invalid numbers` };
    }

    const newMatrix = matrixA.map((r, ri) => {
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

  const parseRowInputB = (rowIndex: number, value: string): { matrix: number[][]; error: string } => {
    const newRowInputs = [...rowInputsB];
    newRowInputs[rowIndex] = value;
    setRowInputsB(newRowInputs);

    const values = value.split(/[\s,]+/).filter(v => v.trim());
    const numbers = values.map(v => parseFloat(v));

    if (values.length > 0 && numbers.some(n => isNaN(n))) {
      return { matrix: [], error: `Row ${rowIndex + 1} in Matrix B contains invalid numbers` };
    }

    const newMatrix = matrixB.map((r, ri) => {
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

  const handleTextareaChangeA = (value: string) => {
    setTextareaValueA(value);
    const result = parseTextareaInput(value, "Matrix A");
    setTextareaErrorA("");
    if (result.matrix.length > 0) {
      setMatrixA(result.matrix);
      setSize(result.size);
    }
  };

  const handleTextareaChangeB = (value: string) => {
    setTextareaValueB(value);
    const result = parseTextareaInput(value, "Matrix B");
    setTextareaErrorB("");
    if (result.matrix.length > 0) {
      setMatrixB(result.matrix);
      if (result.size !== size) {
        setSize(result.size);
      }
    }
  };

  const calculate = () => {
    if (inputModeA === "textarea") {
      const result = parseTextareaInput(textareaValueA, "Matrix A");
      if (result.error) {
        setTextareaErrorA(result.error);
        return;
      }
      if (result.matrix.length > 0) {
        setMatrixA(result.matrix);
        setSize(result.size);
      }
    }

    if (inputModeB === "textarea") {
      const result = parseTextareaInput(textareaValueB, "Matrix B");
      if (result.error) {
        setTextareaErrorB(result.error);
        return;
      }
      if (result.matrix.length > 0) {
        setMatrixB(result.matrix);
        if (result.size !== size) {
          setSize(result.size);
        }
      }
    }

    if (matrixA.length === 0 || matrixB.length === 0) {
      setError("Please enter both matrices");
      return;
    }

    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
      setError(`Matrix dimensions must match. A is ${matrixA.length}×${matrixA[0].length}, B is ${matrixB.length}×${matrixB[0].length}`);
      return;
    }

    const n = size;
    const resultMatrix = Array(n).fill(0).map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (operation === "add") {
          resultMatrix[i][j] = matrixA[i][j] + matrixB[i][j];
        } else {
          resultMatrix[i][j] = matrixA[i][j] - matrixB[i][j];
        }
      }
    }

    setResult(resultMatrix);
    setError("");
    setTextareaErrorA("");
    setTextareaErrorB("");
  };

  const reset = () => {
    const n = size;
    setMatrixA(Array(n).fill(0).map(() => Array(n).fill(0)));
    setMatrixB(Array(n).fill(0).map(() => Array(n).fill(0)));
    setResult(null);
    setError("");
    setTextareaValueA("");
    setTextareaValueB("");
    setRowInputsA(Array(n).fill(""));
    setRowInputsB(Array(n).fill(""));
    setTextareaErrorA("");
    setTextareaErrorB("");
  };

  const loadExample = () => {
    let matrixAExample: number[][];
    let matrixBExample: number[][];

    if (size === 2) {
      matrixAExample = [[1, 2], [3, 4]];
      matrixBExample = [[5, 6], [7, 8]];
    } else if (size === 3) {
      matrixAExample = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
      matrixBExample = [[9, 8, 7], [6, 5, 4], [3, 2, 1]];
    } else {
      matrixAExample = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
      matrixBExample = [[16, 15, 14, 13], [12, 11, 10, 9], [8, 7, 6, 5], [4, 3, 2, 1]];
    }

    setMatrixA(matrixAExample);
    setMatrixB(matrixBExample);

    setTextareaValueA(matrixAExample.map(row => row.join(" ")).join("\n"));
    setTextareaValueB(matrixBExample.map(row => row.join(" ")).join("\n"));
    setRowInputsA(matrixAExample.map(row => row.join(", ")));
    setRowInputsB(matrixBExample.map(row => row.join(", ")));

    setResult(null);
    setError("");
    setTextareaErrorA("");
    setTextareaErrorB("");
  };

  const round = (n: number): string => {
    const rounded = Math.round(n * 10000) / 10000;
    return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(4);
  };

  const handleSizeChange = (newSize: number) => {
    const newMatrixA = Array(newSize).fill(0).map((_, ri) =>
      Array(newSize).fill(0).map((_, ci) =>
        ri < matrixA.length && ci < matrixA[ri]?.length ? matrixA[ri][ci] : 0
      )
    );
    const newMatrixB = Array(newSize).fill(0).map((_, ri) =>
      Array(newSize).fill(0).map((_, ci) =>
        ri < matrixB.length && ci < matrixB[ri]?.length ? matrixB[ri][ci] : 0
      )
    );
    setMatrixA(newMatrixA);
    setMatrixB(newMatrixB);
    setSize(newSize);
    setResult(null);
    setError("");
    setTextareaErrorA("");
    setTextareaErrorB("");

    if (inputModeA === "row") {
      setRowInputsA(Array(newSize).fill("").map((_, i) =>
        i < rowInputsA.length ? rowInputsA[i] : ""
      ));
    }
    if (inputModeB === "row") {
      setRowInputsB(Array(newSize).fill("").map((_, i) =>
        i < rowInputsB.length ? rowInputsB[i] : ""
      ));
    }
  };

  const MatrixDisplay = ({ matrix, label, highlight = false }: { matrix: number[][]; label: string; highlight?: boolean }) => (
    <div className="overflow-x-auto">
      <div className="inline-block">
        <div className="flex items-center">
          <span className="text-4xl font-light mr-2">[</span>
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {matrix.map((row, ri) =>
              row.map((cell, ci) => (
                <div
                  key={`${ri}-${ci}`}
                  className={`w-14 h-10 flex items-center justify-center font-mono rounded ${
                    highlight ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {round(cell)}
                </div>
              ))
            )}
          </div>
          <span className="text-4xl font-light ml-2">]</span>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Matrix Addition & Subtraction Calculator – Compute Matrices Online</h1>
        <p className="text-muted-foreground">
          Add or subtract any two matrices with our free online matrix calculator. Supports all matrix sizes with instant results and element-wise computation displayed clearly.
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
            </div>

            <Tabs value={operation} onValueChange={(v) => setOperation(v as "add" | "subtract")}>
              <TabsList>
                <TabsTrigger value="add">Addition (A + B)</TabsTrigger>
                <TabsTrigger value="subtract">Subtraction (A - B)</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Matrix A ({size}×{size})</h3>
                <Tabs value={inputModeA} onValueChange={(v) => setInputModeA(v as "textarea" | "row")}>
                  <TabsList className="w-full">
                    <TabsTrigger value="textarea" className="flex-1">Text Area</TabsTrigger>
                    <TabsTrigger value="row" className="flex-1">Row-by-Row</TabsTrigger>
                  </TabsList>

                  <TabsContent value="textarea" className="space-y-4">
                    <div>
                      <Label>Enter matrix values (each row on a new line)</Label>
                      <Textarea
                        value={textareaValueA}
                        onChange={(e) => handleTextareaChangeA(e.target.value)}
                        placeholder={`Example for 2×2 matrix:\n1 2\n3 4`}
                        className="min-h-[120px] font-mono"
                      />
                      {textareaErrorA && (
                        <p className="text-xs text-destructive mt-2">{textareaErrorA}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Current: {size}×{size} | Detected from input
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="row" className="space-y-4">
                    <div className="space-y-3">
                      <Label>Enter each row (comma or space separated)</Label>
                      {rowInputsA.map((rowValue, rowIndex) => (
                        <div key={rowIndex} className="flex items-center gap-2">
                          <Label className="w-12 text-right text-xs">Row {rowIndex + 1}:</Label>
                          <Input
                            value={rowValue}
                            onChange={(e) => parseRowInputA(rowIndex, e.target.value)}
                            placeholder={`Enter ${size} values`}
                            className="flex-1 font-mono text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Matrix B ({size}×{size})</h3>
                <Tabs value={inputModeB} onValueChange={(v) => setInputModeB(v as "textarea" | "row")}>
                  <TabsList className="w-full">
                    <TabsTrigger value="textarea" className="flex-1">Text Area</TabsTrigger>
                    <TabsTrigger value="row" className="flex-1">Row-by-Row</TabsTrigger>
                  </TabsList>

                  <TabsContent value="textarea" className="space-y-4">
                    <div>
                      <Label>Enter matrix values (each row on a new line)</Label>
                      <Textarea
                        value={textareaValueB}
                        onChange={(e) => handleTextareaChangeB(e.target.value)}
                        placeholder={`Example for 2×2 matrix:\n5 6\n7 8`}
                        className="min-h-[120px] font-mono"
                      />
                      {textareaErrorB && (
                        <p className="text-xs text-destructive mt-2">{textareaErrorB}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Current: {size}×{size} | Detected from input
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="row" className="space-y-4">
                    <div className="space-y-3">
                      <Label>Enter each row (comma or space separated)</Label>
                      {rowInputsB.map((rowValue, rowIndex) => (
                        <div key={rowIndex} className="flex items-center gap-2">
                          <Label className="w-12 text-right text-xs">Row {rowIndex + 1}:</Label>
                          <Input
                            value={rowValue}
                            onChange={(e) => parseRowInputB(rowIndex, e.target.value)}
                            placeholder={`Enter ${size} values`}
                            className="flex-1 font-mono text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate} disabled={matrixA.length === 0 || matrixB.length === 0}>
                {operation === "add" ? "Add Matrices" : "Subtract Matrices"}
              </Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Result: {operation === "add" ? "A + B" : "A - B"}
              </p>
              <MatrixDisplay matrix={result} label="" highlight />
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Element-wise Calculation</h4>
              <p className="text-sm text-muted-foreground mb-2">
                {operation === "add"
                  ? "Each element in the result is the sum of corresponding elements from A and B."
                  : "Each element in the result is the difference of corresponding elements from A and B."}
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                {operation === "add"
                  ? `C[i,j] = A[i,j] + B[i,j]`
                  : `C[i,j] = A[i,j] - B[i,j]`}
              </code>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Matrix Addition and Subtraction</h2>
        <p className="text-muted-foreground">
          Matrix addition and subtraction are performed element-by-element. Both matrices must have the same dimensions. The result is a matrix of the same size where each element is the sum or difference of the corresponding elements.
        </p>
        <p className="text-muted-foreground">
          These operations are fundamental in linear algebra and are used extensively in computer graphics, machine learning, and scientific computing.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Addition Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Commutative: A + B = B + A</li>
              <li>• Associative: (A + B) + C = A + (B + C)</li>
              <li>• Identity: A + 0 = A</li>
              <li>• Inverse: A + (-A) = 0</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Requirements</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Same dimensions required</li>
              <li>• Element-wise operation</li>
              <li>• Result has same size</li>
              <li>• Works with any numbers</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Example Calculation</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-sm font-mono bg-muted px-3 py-2 rounded block whitespace-pre">
{`Addition:
[[1, 2],    [[5, 6],    [[1+5, 2+6],    [[6, 8],
 [3, 4]]  +  [7, 8]]  =  [3+7, 4+8]]  =  [10, 12]]

Subtraction:
[[5, 6],    [[1, 2],    [[5-1, 6-2],    [[4, 4],
 [7, 8]]  -  [3, 4]]  =  [7-3, 8-4]]  =  [4, 4]]`}
          </code>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can I add matrices of different sizes?</h3>
            <p className="text-sm text-muted-foreground">
              No, matrices must have the same dimensions (same number of rows and columns) to be added or subtracted.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Is matrix addition commutative?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, A + B = B + A for any matrices of the same size. However, subtraction is not commutative: A - B ≠ B - A.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is the zero matrix?</h3>
            <p className="text-sm text-muted-foreground">
              The zero matrix has all elements equal to 0. Adding it to any matrix leaves the matrix unchanged, similar to adding 0 to a number.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Where are these operations used?</h3>
            <p className="text-sm text-muted-foreground">
              Matrix addition and subtraction are used in image processing, computer graphics transformations, machine learning algorithms, physics simulations, and solving systems of equations.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/matrix-multiplication-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Multiplication</p>
            <p className="text-xs text-muted-foreground">Multiply A × B</p>
          </a>
          <a href="/math-tools/matrix-transpose-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Transpose</p>
            <p className="text-xs text-muted-foreground">Find Aᵀ</p>
          </a>
          <a href="/math-tools/matrix-determinant-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Matrix Determinant</p>
            <p className="text-xs text-muted-foreground">Calculate det(A)</p>
          </a>
        </div>
      </section>
    </div>
  );
}
