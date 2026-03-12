"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatrixMultiplicationCalculator() {
  const [rowsA, setRowsA] = useState<number>(2);
  const [colsA, setColsA] = useState<number>(2);
  const [rowsB, setRowsB] = useState<number>(2);
  const [colsB, setColsB] = useState<number>(2);
  const [matrixA, setMatrixA] = useState<number[][]>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<number[][]>([[0, 0], [0, 0]]);
  const [result, setResult] = useState<number[][] | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [error, setError] = useState("");
  const [inputModeA, setInputModeA] = useState<"textarea" | "row">("textarea");
  const [inputModeB, setInputModeB] = useState<"textarea" | "row">("textarea");
  const [textareaValueA, setTextareaValueA] = useState("");
  const [textareaValueB, setTextareaValueB] = useState("");
  const [rowInputsA, setRowInputsA] = useState<string[]>(["", ""]);
  const [rowInputsB, setRowInputsB] = useState<string[]>(["", ""]);
  const [textareaErrorA, setTextareaErrorA] = useState<string>("");
  const [textareaErrorB, setTextareaErrorB] = useState<string>("");

  const initializeMatrixA = (newRows: number, newCols: number) => {
    setRowsA(newRows);
    setColsA(newCols);
    setMatrixA(Array(newRows).fill(0).map(() => Array(newCols).fill(0)));
    setResult(null);
    setError("");
    setTextareaValueA("");
    setRowInputsA(Array(newRows).fill(""));
    setTextareaErrorA("");

    if (newCols !== rowsB) {
      setRowsB(newCols);
      setMatrixB(Array(newCols).fill(0).map(() => Array(colsB).fill(0)));
      setRowInputsB(Array(newCols).fill(""));
    }
  };

  const initializeMatrixB = (newRows: number, newCols: number) => {
    setRowsB(newRows);
    setColsB(newCols);
    setMatrixB(Array(newRows).fill(0).map(() => Array(newCols).fill(0)));
    setResult(null);
    setError("");
    setTextareaValueB("");
    setRowInputsB(Array(newRows).fill(""));
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

  const parseTextareaInput = (text: string, matrixName: string): { matrix: number[][]; rows: number; cols: number; error: string } => {
    const trimmed = text.trim();
    if (!trimmed) {
      return { matrix: [], rows: 0, cols: 0, error: "" };
    }

    const rowLines = trimmed.split("\n").filter(row => row.trim());
    if (rowLines.length === 0) {
      return { matrix: [], rows: 0, cols: 0, error: `Please enter ${matrixName} values` };
    }

    const parsedRows: number[][] = [];
    for (const row of rowLines) {
      const values = row.split(/[\s,]+/).filter(v => v.trim());
      const numbers = values.map(v => parseFloat(v));
      if (numbers.some(n => isNaN(n))) {
        return { matrix: [], rows: 0, cols: 0, error: `Invalid number detected in ${matrixName}. Please enter only numeric values.` };
      }
      parsedRows.push(numbers);
    }

    const rowCount = parsedRows.length;
    const colCount = parsedRows[0].length;

    if (rowCount > 50) {
      return { matrix: [], rows: 0, cols: 0, error: `Maximum supported matrix size for ${matrixName} is 50x50` };
    }

    for (let i = 1; i < rowCount; i++) {
      if (parsedRows[i].length !== colCount) {
        return {
          matrix: [],
          rows: 0,
          cols: 0,
          error: `All rows in ${matrixName} must have the same number of elements. Row ${i + 1} has ${parsedRows[i].length} elements.`
        };
      }
    }

    return { matrix: parsedRows, rows: rowCount, cols: colCount, error: "" };
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
        const newRow = Array(colsA).fill(0);
        for (let i = 0; i < Math.min(numbers.length, colsA); i++) {
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
        const newRow = Array(colsB).fill(0);
        for (let i = 0; i < Math.min(numbers.length, colsB); i++) {
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
      setRowsA(result.rows);
      setColsA(result.cols);

      if (result.cols !== rowsB) {
        setRowsB(result.cols);
        setMatrixB(Array(result.cols).fill(0).map(() => Array(colsB).fill(0)));
        setRowInputsB(Array(result.cols).fill(""));
      }
    }
  };

  const handleTextareaChangeB = (value: string) => {
    setTextareaValueB(value);
    const result = parseTextareaInput(value, "Matrix B");
    setTextareaErrorB("");
    if (result.matrix.length > 0) {
      setMatrixB(result.matrix);
      setRowsB(result.rows);
      setColsB(result.cols);
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
        setRowsA(result.rows);
        setColsA(result.cols);
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
        setRowsB(result.rows);
        setColsB(result.cols);
      }
    }

    if (colsA !== rowsB) {
      setError(`Cannot multiply: columns of A (${colsA}) must equal rows of B (${rowsB})`);
      setResult(null);
      return;
    }

    if (matrixA.length === 0 || matrixA.some(row => row.length === 0) ||
      matrixB.length === 0 || matrixB.some(row => row.length === 0)) {
      setError("Please enter both matrices");
      return;
    }

    const resultMatrix = Array(rowsA).fill(0).map(() => Array(colsB).fill(0));

    for (let i = 0; i < rowsA; i++) {
      for (let j = 0; j < colsB; j++) {
        let sum = 0;
        for (let k = 0; k < colsA; k++) {
          sum += matrixA[i][k] * matrixB[k][j];
        }
        resultMatrix[i][j] = sum;
      }
    }

    setResult(resultMatrix);
    setError("");
    setTextareaErrorA("");
    setTextareaErrorB("");
  };

  const reset = () => {
    setMatrixA(Array(rowsA).fill(0).map(() => Array(colsA).fill(0)));
    setMatrixB(Array(rowsB).fill(0).map(() => Array(colsB).fill(0)));
    setResult(null);
    setError("");
    setShowSteps(false);
    setTextareaValueA("");
    setTextareaValueB("");
    setRowInputsA(Array(rowsA).fill(""));
    setRowInputsB(Array(rowsB).fill(""));
    setTextareaErrorA("");
    setTextareaErrorB("");
  };

  const examples = [
    { name: "2x2 Standard", a: [[1, 2], [3, 4]], b: [[5, 6], [7, 8]] },
    { name: "2x3 times 3x2", a: [[1, 2, 3], [4, 5, 6]], b: [[7, 8], [9, 10], [11, 12]] },
    { name: "3x3 Standard", a: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], b: [[9, 8, 7], [6, 5, 4], [3, 2, 1]] },
    { name: "With Negatives", a: [[-1, 2], [3, -4]], b: [[5, -6], [-7, 8]] },
    { name: "Identity Matrix", a: [[1, 0], [0, 1]], b: [[3, 4], [5, 6]] },
    { name: "Large Numbers", a: [[10, 20], [30, 40]], b: [[5, 15], [25, 35]] },
    { name: "Decimals", a: [[1.5, 2.5], [3.5, 4.5]], b: [[0.5, 1.5], [2.5, 3.5]] }
  ];

  const loadExample = (index: number) => {
    const example = examples[index];
    setRowsA(example.a.length);
    setColsA(example.a[0].length);
    setRowsB(example.b.length);
    setColsB(example.b[0].length);
    setMatrixA(example.a);
    setMatrixB(example.b);
    setResult(null);
    setError("");
    setTextareaValueA(example.a.map(row => row.join(" ")).join("\n"));
    setTextareaValueB(example.b.map(row => row.join(" ")).join("\n"));
    setRowInputsA(example.a.map(row => row.join(", ")));
    setRowInputsB(example.b.map(row => row.join(", ")));
    setTextareaErrorA("");
    setTextareaErrorB("");
  };

  const round = (n: number): string => {
    const rounded = Math.round(n * 10000) / 10000;
    return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(4);
  };

  const getElementCalculation = (row: number, col: number): string => {
    const terms = [];
    for (let k = 0; k < colsA; k++) {
      terms.push(`${matrixA[row][k]}x${matrixB[k][col]}`);
    }
    const products = [];
    for (let k = 0; k < colsA; k++) {
      products.push(matrixA[row][k] * matrixB[k][col]);
    }
    return `${terms.join(" + ")} = ${products.join(" + ")} = ${result![row][col]}`;
  };

  const handleDimensionChangeA = (newRows: number, newCols: number) => {
    const newMatrix = Array(newRows).fill(0).map((_, ri) =>
      Array(newCols).fill(0).map((_, ci) =>
        ri < matrixA.length && ci < matrixA[ri]?.length ? matrixA[ri][ci] : 0
      )
    );
    setMatrixA(newMatrix);
    setRowsA(newRows);
    setColsA(newCols);
    setResult(null);
    setError("");
    setTextareaErrorA("");

    if (newCols !== rowsB) {
      setRowsB(newCols);
      setMatrixB(Array(newCols).fill(0).map(() => Array(colsB).fill(0)));
      setRowInputsB(Array(newCols).fill(""));
    }

    if (inputModeA === "row") {
      setRowInputsA(Array(newRows).fill("").map((_, i) =>
        i < rowInputsA.length ? rowInputsA[i] : ""
      ));
    }
  };

  const handleDimensionChangeB = (newRows: number, newCols: number) => {
    const newMatrix = Array(newRows).fill(0).map((_, ri) =>
      Array(newCols).fill(0).map((_, ci) =>
        ri < matrixB.length && ci < matrixB[ri]?.length ? matrixB[ri][ci] : 0
      )
    );
    setMatrixB(newMatrix);
    setRowsB(newRows);
    setColsB(newCols);
    setResult(null);
    setError("");
    setTextareaErrorB("");

    if (inputModeB === "row") {
      setRowInputsB(Array(newRows).fill("").map((_, i) =>
        i < rowInputsB.length ? rowInputsB[i] : ""
      ));
    }
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Matrix Multiplication Calculator – Multiply Matrices Online</h1>
        <p className="text-muted-foreground">
          Multiply any two compatible matrices with our free online matrix multiplication calculator. See the full product matrix with step-by-step row-by-column computation.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Label>Matrix A Size:</Label>
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Rows:</span>
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((n) => (
                  <Button
                    key={n}
                    variant={rowsA === n ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleDimensionChangeA(n, colsA)}
                    className="w-8 h-8 text-xs"
                  >
                    {n}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Cols:</span>
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((n) => (
                  <Button
                    key={n}
                    variant={colsA === n ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleDimensionChangeA(rowsA, n)}
                    className="w-8 h-8 text-xs"
                  >
                    {n}
                  </Button>
                ))}
              </div>
            </div>
            <span className="text-muted-foreground text-sm">Current: {rowsA}x{colsA}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Label>Matrix B Size:</Label>
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Rows:</span>
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((n) => (
                  <Button
                    key={n}
                    variant={rowsB === n ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleDimensionChangeB(n, colsB)}
                    className="w-8 h-8 text-xs"
                  >
                    {n}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Cols:</span>
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((n) => (
                  <Button
                    key={n}
                    variant={colsB === n ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleDimensionChangeB(rowsB, n)}
                    className="w-8 h-8 text-xs"
                  >
                    {n}
                  </Button>
                ))}
              </div>
            </div>
            <span className="text-muted-foreground text-sm">Current: {rowsB}x{colsB}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Examples:</span>
            {examples.map((ex, idx) => (
              <Button key={idx} variant="outline" size="sm" onClick={() => loadExample(idx)}>{ex.name}</Button>
            ))}
          </div>

          {colsA !== rowsB && (
            <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive text-sm">
              <p className="font-semibold">Dimension Mismatch</p>
              <p>
                Cannot multiply: Matrix A has {colsA} columns but Matrix B has {rowsB} rows.
                For matrix multiplication, columns of A must equal rows of B.
              </p>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Matrix A ({rowsA}x{colsA})</h3>
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
                      placeholder={`Example for 2x3 matrix:\n1 2 3\n4 5 6`}
                      className="min-h-[120px] font-mono"
                    />
                    {textareaErrorA && (
                      <p className="text-xs text-destructive mt-2">{textareaErrorA}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Current: {rowsA}x{colsA} | Detected from input
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
                          placeholder={`Enter ${colsA} values`}
                          className="flex-1 font-mono text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Matrix B ({rowsB}x{colsB})</h3>
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
                      placeholder={`Example for 3x2 matrix:\n7 8\n9 10\n11 12`}
                      className="min-h-[120px] font-mono"
                    />
                    {textareaErrorB && (
                      <p className="text-xs text-destructive mt-2">{textareaErrorB}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Current: {rowsB}x{colsB} | Detected from input
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
                          placeholder={`Enter ${colsB} values`}
                          className="flex-1 font-mono text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculate} disabled={colsA !== rowsB || matrixA.length === 0 || matrixB.length === 0}>
              Multiply Matrices
            </Button>
            <Button variant="outline" onClick={reset}>Reset</Button>
          </div>

          {error && colsA === rowsB && (
            <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}
        </div>

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Result: A x B = {rowsA}x{colsB} Matrix
              </p>
              <div className="overflow-x-auto">
                <div className="inline-block">
                  <div className="flex items-center">
                    <span className="text-4xl font-light mr-2">[</span>
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${colsB}, 1fr)` }}>
                      {result.map((row, ri) =>
                        row.map((cell, ci) => (
                          <div
                            key={`${ri}-${ci}`}
                            className="w-16 h-12 flex items-center justify-center bg-primary text-primary-foreground font-mono rounded"
                          >
                            {round(cell)}
                          </div>
                        ))
                      )}
                    </div>
                    <span className="text-4xl font-light ml-2">]</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowSteps(!showSteps)}>
                {showSteps ? "Hide Steps" : "Show Step-by-Step"}
              </Button>
            </div>

            {showSteps && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-3">Step-by-Step Calculation</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Each element C[i,j] is the dot product of row i from A and column j from B.
                </p>
                <div className="space-y-3 font-mono text-xs bg-muted p-3 rounded overflow-x-auto">
                  {result.map((row, ri) =>
                    row.map((_, ci) => (
                      <div key={`${ri}-${ci}`}>
                        <strong>C[{ri},{ci}]</strong> = {getElementCalculation(ri, ci)}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Matrix Multiplication</h2>
        <p className="text-muted-foreground">
          Matrix multiplication is fundamentally different from matrix addition. Instead of element-wise operations, each entry in the result is computed by taking the dot product of a row from the first matrix with a column from the second matrix.
        </p>
        <p className="text-muted-foreground">
          The key rule: you can only multiply matrix A (m x n) by matrix B (n x p) when the number of columns in A equals the number of rows in B. The result is an m x p matrix.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How Matrix Multiplication Works</h3>
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold text-sm mb-3">The Formula</h4>
          <code className="text-sm font-mono block">
            If A is m x n and B is n x p, then C = AB is m x p<br />
            C[i,j] = sum of (A[i,k] x B[k,j]) for k = 1 to n
          </code>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Not Commutative</h4>
            <p className="text-sm text-muted-foreground">AB is usually not equal to BA. Order matters!</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Associative</h4>
            <p className="text-sm text-muted-foreground">(AB)C = A(BC). Grouping doesn't matter.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Distributive</h4>
            <p className="text-sm text-muted-foreground">A(B + C) = AB + AC. Works like regular algebra.</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: 2x2 Multiplication</h4>
            <div className="font-mono text-sm space-y-2">
              <div>A = [[1, 2], [3, 4]], B = [[5, 6], [7, 8]]</div>
              <div>C[0,0] = 1*5 + 2*7 = 5 + 14 = 19</div>
              <div>C[0,1] = 1*6 + 2*8 = 6 + 16 = 22</div>
              <div>C[1,0] = 3*5 + 4*7 = 15 + 28 = 43</div>
              <div>C[1,1] = 3*6 + 4*8 = 18 + 32 = 50</div>
              <div>AB = [[19, 22], [43, 50]]</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: 2x3 times 3x2</h4>
            <div className="font-mono text-sm space-y-2">
              <div>A = [[1, 2, 3], [4, 5, 6]], B = [[7, 8], [9, 10], [11, 12]]</div>
              <div>C[0,0] = 1*7 + 2*9 + 3*11 = 7 + 18 + 33 = 58</div>
              <div>C[0,1] = 1*8 + 2*10 + 3*12 = 8 + 20 + 36 = 64</div>
              <div>C[1,0] = 4*7 + 5*9 + 6*11 = 28 + 45 + 66 = 139</div>
              <div>C[1,1] = 4*8 + 5*10 + 6*12 = 32 + 50 + 72 = 154</div>
              <div>AB = [[58, 64], [139, 154]]</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Identity Matrix</h4>
            <div className="font-mono text-sm space-y-2">
              <div>I = [[1, 0], [0, 1]], A = [[3, 4], [5, 6]]</div>
              <div>IA = [[1*3+0*5, 1*4+0*6], [0*3+1*5, 0*4+1*6]]</div>
              <div>IA = [[3, 4], [5, 6]] = A</div>
              <div className="text-muted-foreground">Identity matrix leaves A unchanged!</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm">
            Matrix multiplication seems backwards at first – rows times columns. This convention was chosen because it makes matrix multiplication correspond to function composition. When matrices represent linear transformations, AB means "apply B first, then A" – just like f(g(x)) in function notation.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why must columns of A equal rows of B?</h4>
            <p className="text-sm text-muted-foreground">
              Each result element is a dot product of a row from A with a column from B. Dot products require vectors of equal length. The row length from A must match the column length from B.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is matrix multiplication commutative?</h4>
            <p className="text-sm text-muted-foreground">
              Generally no! AB usually does not equal BA. Sometimes one product isn't even defined when the other is. Even for square matrices where both are defined, they typically give different results.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can you multiply a matrix by itself?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, but only if it's square! A square matrix (n x n) can always be multiplied by itself because the columns equal the rows. This is called squaring the matrix: A^2 = AA.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What happens when you multiply by the identity matrix?</h4>
            <p className="text-sm text-muted-foreground">
              The identity matrix acts like the number 1 in regular multiplication. AI = A and IA = A for any compatible matrix A. The identity leaves other matrices unchanged.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What are real-world applications?</h4>
            <p className="text-sm text-muted-foreground">
              Matrix multiplication powers computer graphics (transforming 3D objects), machine learning (neural network layers), physics simulations, economics models, network analysis, and cryptography algorithms.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do you multiply large matrices efficiently?</h4>
            <p className="text-sm text-muted-foreground">
              Standard multiplication is O(n^3) for n x n matrices. Advanced algorithms like Strassen's algorithm can do it faster for very large matrices. GPUs excel at parallel matrix multiplication.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
