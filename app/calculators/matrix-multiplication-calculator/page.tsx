"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatrixMultiplicationCalculator() {
  const [sizeA, setSizeA] = useState<{ rows: number; cols: number }>({ rows: 2, cols: 2 });
  const [sizeB, setSizeB] = useState<{ rows: number; cols: number }>({ rows: 2, cols: 2 });
  const [matrixA, setMatrixA] = useState<number[][]>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<number[][]>([[0, 0], [0, 0]]);
  const [result, setResult] = useState<number[][] | null>(null);
  const [error, setError] = useState("");
  const [inputMode, setInputMode] = useState<"textarea" | "row">("textarea");
  
  // Matrix A input states
  const [textareaAValue, setTextareaAValue] = useState("1, 2\n3, 4");
  const [rowInputsA, setRowInputsA] = useState<string[]>(["1, 2", "3, 4"]);
  const [textareaAError, setTextareaAError] = useState("");
  
  // Matrix B input states
  const [textareaBValue, setTextareaBValue] = useState("5, 6\n7, 8");
  const [rowInputsB, setRowInputsB] = useState<string[]>(["5, 6", "7, 8"]);
  const [textareaBError, setTextareaBError] = useState("");

  const parseMatrixInput = (text: string): { matrix: number[][]; rows: number; cols: number; error: string } => {
    const trimmed = text.trim();
    if (!trimmed) {
      return { matrix: [], rows: 0, cols: 0, error: "" };
    }

    const rows = trimmed.split("\n").filter(row => row.trim());
    if (rows.length === 0) {
      return { matrix: [], rows: 0, cols: 0, error: "Please enter matrix values" };
    }

    const parsedRows: number[][] = [];
    let expectedCols: number | null = null;

    for (const row of rows) {
      const values = row.split(/[\s,]+/).filter(v => v.trim());
      const numbers = values.map(v => parseFloat(v));
      
      if (numbers.some(n => isNaN(n))) {
        return { matrix: [], rows: 0, cols: 0, error: "Invalid number detected. Please enter only numeric values." };
      }
      
      if (expectedCols === null) {
        expectedCols = numbers.length;
      } else if (numbers.length !== expectedCols) {
        return {
          matrix: [],
          rows: 0,
          cols: 0,
          error: `All rows must have the same number of elements. Expected ${expectedCols} columns.`
        };
      }
      
      if (numbers.length > 10) {
        return { matrix: [], rows: 0, cols: 0, error: "Maximum supported matrix size is 10×10" };
      }
      
      parsedRows.push(numbers);
    }

    if (parsedRows.length > 10) {
      return { matrix: [], rows: 0, cols: 0, error: "Maximum supported matrix size is 10×10" };
    }

    return { matrix: parsedRows, rows: parsedRows.length, cols: parsedRows[0]?.length || 0, error: "" };
  };

  const handleTextareaChange = (value: string, matrix: "A" | "B") => {
    if (matrix === "A") {
      setTextareaAValue(value);
      const result = parseMatrixInput(value);
      setTextareaAError("");
      if (result.matrix.length > 0 && !result.error) {
        setMatrixA(result.matrix);
        setSizeA({ rows: result.rows, cols: result.cols });
        setResult(null);
      }
    } else {
      setTextareaBValue(value);
      const result = parseMatrixInput(value);
      setTextareaBError("");
      if (result.matrix.length > 0 && !result.error) {
        setMatrixB(result.matrix);
        setSizeB({ rows: result.rows, cols: result.cols });
        setResult(null);
      }
    }
  };

  const parseRowInput = (rowIndex: number, value: string, matrix: "A" | "B"): { matrix: number[][]; error: string } => {
    if (matrix === "A") {
      const newRowInputs = [...rowInputsA];
      newRowInputs[rowIndex] = value;
      setRowInputsA(newRowInputs);

      const values = value.split(/[\s,]+/).filter(v => v.trim());
      const numbers = values.map(v => parseFloat(v));

      if (values.length > 0 && numbers.some(n => isNaN(n))) {
        return { matrix: [], error: `Row ${rowIndex + 1} contains invalid numbers` };
      }

      const newMatrix = matrixA.map((r, ri) => {
        if (ri === rowIndex) {
          const newRow = Array(sizeA.cols).fill(0);
          for (let i = 0; i < Math.min(numbers.length, sizeA.cols); i++) {
            newRow[i] = numbers[i];
          }
          return newRow;
        }
        return r;
      });

      return { matrix: newMatrix, error: "" };
    } else {
      const newRowInputs = [...rowInputsB];
      newRowInputs[rowIndex] = value;
      setRowInputsB(newRowInputs);

      const values = value.split(/[\s,]+/).filter(v => v.trim());
      const numbers = values.map(v => parseFloat(v));

      if (values.length > 0 && numbers.some(n => isNaN(n))) {
        return { matrix: [], error: `Row ${rowIndex + 1} contains invalid numbers` };
      }

      const newMatrix = matrixB.map((r, ri) => {
        if (ri === rowIndex) {
          const newRow = Array(sizeB.cols).fill(0);
          for (let i = 0; i < Math.min(numbers.length, sizeB.cols); i++) {
            newRow[i] = numbers[i];
          }
          return newRow;
        }
        return r;
      });

      return { matrix: newMatrix, error: "" };
    }
  };

  const handleSizeChange = (newRows: number, newCols: number, matrix: "A" | "B") => {
    const newMatrix = Array(newRows).fill(0).map((_, ri) =>
      Array(newCols).fill(0).map((_, ci) => {
        const sourceMatrix = matrix === "A" ? matrixA : matrixB;
        const sourceSize = matrix === "A" ? sizeA : sizeB;
        return ri < sourceSize.rows && ci < sourceSize.cols ? sourceMatrix[ri][ci] : 0;
      })
    );

    if (matrix === "A") {
      setMatrixA(newMatrix);
      setSizeA({ rows: newRows, cols: newCols });
      setRowInputsA(Array(newRows).fill("").map((_, i) =>
        i < rowInputsA.length ? rowInputsA[i] : ""
      ));
    } else {
      setMatrixB(newMatrix);
      setSizeB({ rows: newRows, cols: newCols });
      setRowInputsB(Array(newRows).fill("").map((_, i) =>
        i < rowInputsB.length ? rowInputsB[i] : ""
      ));
    }
    setResult(null);
  };

  const calculate = () => {
    if (inputMode === "textarea") {
      const resultA = parseMatrixInput(textareaAValue);
      const resultB = parseMatrixInput(textareaBValue);
      
      if (resultA.error) {
        setTextareaAError(resultA.error);
        return;
      }
      if (resultB.error) {
        setTextareaBError(resultB.error);
        return;
      }
      
      if (resultA.matrix.length > 0) {
        setMatrixA(resultA.matrix);
        setSizeA({ rows: resultA.rows, cols: resultA.cols });
      }
      if (resultB.matrix.length > 0) {
        setMatrixB(resultB.matrix);
        setSizeB({ rows: resultB.rows, cols: resultB.cols });
      }
    }

    if (matrixA.length === 0 || matrixB.length === 0) {
      setError("Please enter both matrices");
      return;
    }

    if (sizeA.cols !== sizeB.rows) {
      setError(`Columns of A must equal rows of B. Matrix A is ${sizeA.rows}×${sizeA.cols}, Matrix B is ${sizeB.rows}×${sizeB.cols}`);
      return;
    }

    const rows = sizeA.rows;
    const cols = sizeB.cols;
    const inner = sizeA.cols;
    const product: number[][] = [];

    for (let i = 0; i < rows; i++) {
      product[i] = [];
      for (let j = 0; j < cols; j++) {
        let sum = 0;
        for (let k = 0; k < inner; k++) {
          sum += matrixA[i][k] * matrixB[k][j];
        }
        product[i][j] = sum;
      }
    }

    setResult(product);
    setError("");
    setTextareaAError("");
    setTextareaBError("");
  };

  const reset = () => {
    setMatrixA([[0, 0], [0, 0]]);
    setMatrixB([[0, 0], [0, 0]]);
    setSizeA({ rows: 2, cols: 2 });
    setSizeB({ rows: 2, cols: 2 });
    setResult(null);
    setError("");
    setTextareaAValue("1, 2\n3, 4");
    setTextareaBValue("5, 6\n7, 8");
    setRowInputsA(["1, 2", "3, 4"]);
    setRowInputsB(["5, 6", "7, 8"]);
    setTextareaAError("");
    setTextareaBError("");
  };

  const fillExample = () => {
    const exampleA = [[1, 2], [3, 4]];
    const exampleB = [[5, 6], [7, 8]];
    
    setMatrixA(exampleA);
    setMatrixB(exampleB);
    setSizeA({ rows: 2, cols: 2 });
    setSizeB({ rows: 2, cols: 2 });

    if (inputMode === "textarea") {
      setTextareaAValue(exampleA.map(row => row.join(", ")).join("\n"));
      setTextareaBValue(exampleB.map(row => row.join(", ")).join("\n"));
    } else {
      setRowInputsA(exampleA.map(row => row.join(", ")));
      setRowInputsB(exampleB.map(row => row.join(", ")));
    }

    setResult(null);
    setError("");
    setTextareaAError("");
    setTextareaBError("");
  };

  const renderSizeButtons = (matrix: "A" | "B", isSecondMatrix: boolean = false) => {
    const currentSize = matrix === "A" ? sizeA : sizeB;
    const presetSizes = matrix === "A" 
      ? [2, 3, 4].map(n => ({ rows: n, cols: n }))
      : [2, 3, 4].map(n => ({ rows: n, cols: n }));
    
    return (
      <div className="flex gap-2 flex-wrap">
        {presetSizes.map((s) => (
          <Button
            key={`${s.rows}x${s.cols}`}
            variant={currentSize.rows === s.rows && currentSize.cols === s.cols ? "default" : "outline"}
            size="sm"
            onClick={() => handleSizeChange(s.rows, s.cols, matrix)}
            className="w-12"
          >
            {s.rows}×{s.cols}
          </Button>
        ))}
        <span className="text-xs text-muted-foreground self-center">or custom</span>
        <Input
          type="number"
          min="1"
          max="10"
          className="w-16 h-8"
          value={currentSize.rows}
          onChange={(e) => handleSizeChange(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)), currentSize.cols, matrix)}
          placeholder="rows"
        />
        <span className="self-center text-sm">×</span>
        <Input
          type="number"
          min="1"
          max="10"
          className="w-16 h-8"
          value={currentSize.cols}
          onChange={(e) => handleSizeChange(currentSize.rows, Math.max(1, Math.min(10, parseInt(e.target.value) || 1)), matrix)}
          placeholder="cols"
        />
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Matrix Multiplication Calculator – Multiply Two Matrices</h1>
        <p className="text-muted-foreground">
          Multiply two matrices with our free online matrix multiplication calculator. Enter values via textarea or row-by-row input with step-by-step results.
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Matrix A Section */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Label className="font-semibold">Matrix A Size:</Label>
                {renderSizeButtons("A")}
              </div>

              <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as "textarea" | "row")}>
                <TabsList>
                  <TabsTrigger value="textarea">Text Area Input</TabsTrigger>
                  <TabsTrigger value="row">Row-by-Row Input</TabsTrigger>
                </TabsList>

                <TabsContent value="textarea" className="space-y-4">
                  <div>
                    <Label>Enter Matrix A values (each row on a new line, values separated by spaces or commas)</Label>
                    <Textarea
                      value={textareaAValue}
                      onChange={(e) => handleTextareaChange(e.target.value, "A")}
                      placeholder={`Example for 2×2 matrix:\n1 2\n3 4\n\nor\n\n1, 2\n3, 4`}
                      className="min-h-[120px] font-mono"
                    />
                    {textareaAError && (
                      <p className="text-xs text-destructive mt-2">{textareaAError}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Current Matrix A: {sizeA.rows}×{sizeA.cols}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="row" className="space-y-4">
                  <div className="space-y-3">
                    <Label>Enter each row for Matrix A (comma or space separated values)</Label>
                    {rowInputsA.map((rowValue, rowIndex) => (
                      <div key={rowIndex} className="flex items-center gap-2">
                        <Label className="w-16 text-right">Row {rowIndex + 1}:</Label>
                        <Input
                          value={rowValue}
                          onChange={(e) => {
                            const result = parseRowInput(rowIndex, e.target.value, "A");
                            if (result.matrix.length > 0) {
                              setMatrixA(result.matrix);
                            }
                          }}
                          placeholder={`Enter ${sizeA.cols} values for row ${rowIndex + 1}`}
                          className="flex-1 font-mono"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Matrix B Section */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Label className="font-semibold">Matrix B Size:</Label>
                {renderSizeButtons("B", true)}
              </div>

              <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as "textarea" | "row")}>
                <TabsList>
                  <TabsTrigger value="textarea">Text Area Input</TabsTrigger>
                  <TabsTrigger value="row">Row-by-Row Input</TabsTrigger>
                </TabsList>

                <TabsContent value="textarea" className="space-y-4">
                  <div>
                    <Label>Enter Matrix B values (each row on a new line, values separated by spaces or commas)</Label>
                    <Textarea
                      value={textareaBValue}
                      onChange={(e) => handleTextareaChange(e.target.value, "B")}
                      placeholder={`Example for 2×2 matrix:\n5 6\n7 8\n\nor\n\n5, 6\n7, 8`}
                      className="min-h-[120px] font-mono"
                    />
                    {textareaBError && (
                      <p className="text-xs text-destructive mt-2">{textareaBError}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Current Matrix B: {sizeB.rows}×{sizeB.cols}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="row" className="space-y-4">
                  <div className="space-y-3">
                    <Label>Enter each row for Matrix B (comma or space separated values)</Label>
                    {rowInputsB.map((rowValue, rowIndex) => (
                      <div key={rowIndex} className="flex items-center gap-2">
                        <Label className="w-16 text-right">Row {rowIndex + 1}:</Label>
                        <Input
                          value={rowValue}
                          onChange={(e) => {
                            const result = parseRowInput(rowIndex, e.target.value, "B");
                            if (result.matrix.length > 0) {
                              setMatrixB(result.matrix);
                            }
                          }}
                          placeholder={`Enter ${sizeB.cols} values for row ${rowIndex + 1}`}
                          className="flex-1 font-mono"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate} disabled={matrixA.length === 0 || matrixB.length === 0}>Multiply Matrices</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
              <Button variant="outline" onClick={fillExample}>Load Example</Button>
            </div>
          </CardContent>
        </Card>

        {result !== null && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-4 text-center">Result (A × B)</p>
              <div className="flex justify-center items-center gap-4 flex-wrap">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Matrix A ({sizeA.rows}×{sizeA.cols})</p>
                  <div className="font-mono text-sm">
                    {matrixA.map((row, i) => (
                      <div key={i}>{row.join("  ")}</div>
                    ))}
                  </div>
                </div>
                <span className="text-2xl font-bold">×</span>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Matrix B ({sizeB.rows}×{sizeB.cols})</p>
                  <div className="font-mono text-sm">
                    {matrixB.map((row, i) => (
                      <div key={i}>{row.join("  ")}</div>
                    ))}
                  </div>
                </div>
                <span className="text-2xl font-bold">=</span>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Result ({sizeA.rows}×{sizeB.cols})</p>
                  <div className="font-mono text-lg font-bold">
                    {result.map((row, i) => (
                      <div key={i}>{row.join("  ")}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                <div>Multiplying rows of A by columns of B:</div>
                {result.map((row, i) => (
                  <div key={i}>
                    <div className="font-semibold">Row {i + 1} of result:</div>
                    {row.map((_, j) => (
                      <div key={j} className="ml-4">
                        Element ({i + 1},{j + 1}) = [{matrixA[i].map((_, k) => `${matrixA[i][k]}×${matrixB[k][j]}`).join(" + ")}] = {matrixA[i].map((_, k) => matrixA[i][k] * matrixB[k][j]).join(" + ")} = <strong>{result[i][j]}</strong>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is Matrix Multiplication?</h2>
        <p className="text-muted-foreground">
          Matrix multiplication is a binary operation that takes two matrices and produces another matrix. For matrices A (m×n) and B (n×p), the product C = AB has dimensions m×p. Each element cᵢⱼ is computed as the dot product of row i of A and column j of B.
        </p>
        <p className="text-muted-foreground">
          Matrix multiplication requires that the number of columns in the first matrix equals the number of rows in the second matrix.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Matrix Multiplication Formula</h2>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">General Formula</h3>
          <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
            If A is (m×n) and B is (n×p), then C = AB where cᵢⱼ = Σ(k=1 to n) aᵢₖ × bₖⱼ
          </code>
          <p className="text-xs text-muted-foreground mt-2">
            Each element is the dot product of a row from A and a column from B
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">2×2 Example</h3>
            <code className="text-xs font-mono bg-muted px-3 py-2 rounded block">
              [a b]   [e f]   [ae+bg  af+bh]<br />
              [c d] × [g h] = [ce+dg  cf+dh]
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Dimension Rule</h3>
            <code className="text-xs font-mono bg-muted px-3 py-2 rounded block">
              (m×n) × (n×p) = (m×p)<br />
              <br />
              Example: (2×3) × (3×4) = (2×4)
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties of Matrix Multiplication</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Key Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Not Commutative:</strong> AB ≠ BA (generally)</li>
              <li>• <strong>Associative:</strong> (AB)C = A(BC)</li>
              <li>• <strong>Distributive:</strong> A(B+C) = AB + AC</li>
              <li>• <strong>Identity:</strong> AI = IA = A</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Requirements</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Columns of A must equal rows of B</li>
              <li>• Result has rows of A and columns of B</li>
              <li>• Order matters (AB ≠ BA)</li>
              <li>• Can multiply a matrix by itself if square</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why must columns of A equal rows of B?</h3>
            <p className="text-sm text-muted-foreground">
              Each element in the result is a dot product of a row from A and a column from B. Dot products require vectors of equal length. If A has n columns, B must have n rows.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Is matrix multiplication commutative?</h3>
            <p className="text-sm text-muted-foreground">
              Generally no. AB ≠ BA for most matrices. Even when both products are defined, they usually give different results. Exception: multiplying by identity or scalar matrices.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is the identity matrix?</h3>
            <p className="text-sm text-muted-foreground">
              An identity matrix has 1s on the diagonal and 0s elsewhere. Multiplying any matrix by the identity gives the original matrix unchanged. It's the matrix equivalent of multiplying by 1.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can I multiply a matrix by itself?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, if the matrix is square (same rows and columns). A² = A × A is common in Markov chains and computing matrix powers for transformations.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
